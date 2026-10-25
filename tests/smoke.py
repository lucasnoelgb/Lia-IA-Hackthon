"""Teste de fumaça: abre o app, vai ao Início e confere o bug do card esmagado."""
import pathlib
import sys

from playwright.sync_api import sync_playwright

URL = (pathlib.Path(__file__).parent.parent / "index.html").resolve().as_uri()
SEED = "S={...S0,nick:'Maria',av:3,goal:'receitas',focus:'writing',key:'LIA-X'};save();"

fails = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h in [(375, 700), (1280, 720)]:
        pg = b.new_page(viewport={"width": w, "height": h})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(URL)
        pg.wait_for_timeout(600)
        pg.evaluate(SEED + "go(home,0)")
        pg.wait_for_timeout(1500)
        hero = pg.evaluate("(()=>{const e=document.querySelector('.hero');return [e.scrollHeight,e.clientHeight]})()")
        scroll = pg.evaluate("[scr.scrollHeight,scr.clientHeight]")
        if hero[0] > hero[1] + 1:
            fails.append(f"{w}px: card de objetivo cortado {hero}")
        if scroll[0] <= scroll[1]:
            fails.append(f"{w}px: tela Início não rola {scroll}")
        if errs:
            fails.append(f"{w}px: erros JS {errs}")
        pg.evaluate("go(bookScr,3)")
        pg.wait_for_timeout(800)
        pg.evaluate("scr.scrollTop=scr.scrollHeight")
        pg.wait_for_timeout(1500)
        ops = pg.evaluate("[...document.querySelectorAll('.gl')].map(e=>getComputedStyle(e).opacity)")
        if ops != ["1", "1", "1"]:
            fails.append(f"{w}px: letras LIA invisíveis {ops}")
    b.close()
print("FALHAS:", fails) if fails else print("OK")
sys.exit(1 if fails else 0)
