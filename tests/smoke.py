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

# ---- Lição do nome: traçado com mouse, desfazer, apagar, guia e modelo ----
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1100, "height": 800})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL)
    pg.wait_for_timeout(500)
    pg.evaluate(SEED + "go(lesson,2)")
    pg.wait_for_timeout(1300)
    if not pg.evaluate("!!document.querySelector('#cv')"):
        fails.append("primeira lição não é o traçado do nome")
    else:
        x, y, w, h = pg.evaluate("(()=>{const r=cv.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})()")
        def stroke(a, c):
            pg.mouse.move(x + w * a[0], y + h * a[1]); pg.mouse.down()
            pg.mouse.move(x + w * c[0], y + h * c[1], steps=6); pg.mouse.up()
        stroke((.3, .8), (.3, .2)); stroke((.7, .2), (.7, .8))
        n2 = pg.evaluate("tr.strokes.length")
        pg.click("#un")
        n1 = pg.evaluate("tr.strokes.length")
        pg.click("#cl")
        n0 = pg.evaluate("tr.strokes.length")
        if (n2, n1, n0) != (2, 1, 0):
            fails.append(f"traçado/desfazer/apagar: {(n2, n1, n0)}")
        pg.click("#gd"); pg.click("#md")
        if "desligada" not in pg.inner_text("#gd") or not pg.evaluate("tm.classList.contains('hid')"):
            fails.append("guia/modelo não alternam")
    if errs:
        fails.append(f"erros JS no traçado {errs}")
    b.close()

# ---- Marca LIA sem quadrado de foco + progressão letras -> sílabas -> palavra ----
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL)
    pg.wait_for_timeout(500)
    pg.evaluate(SEED + "go(bookScr,3)")
    pg.wait_for_timeout(900)
    pg.evaluate("scr.scrollTop=scr.scrollHeight")
    pg.wait_for_timeout(1400)
    pg.click(".gl >> nth=2", force=True)
    if pg.evaluate("document.activeElement.classList.contains('gl')"):
        fails.append("marca LIA ficou com foco (quadrado ao clicar)")
    for mastered, esperado in [("[]", "sílabas"), ("['OVO','FOTO']", "palavra inteira")]:
        pg.evaluate(SEED.replace("key:'LIA-X'", "key:'LIA-X',nameDone:true,mastered:" + mastered) + "cur=nextWord();wordTrace()")
        pg.wait_for_timeout(900)
        units = pg.evaluate("tr.L")
        if (esperado == "sílabas") != (len(units) > 1):
            fails.append(f"progressão errada com {mastered}: {units}")
    if errs:
        fails.append(f"erros JS {errs}")
    b.close()
print("FALHAS:", fails) if fails else print("OK")
sys.exit(1 if fails else 0)
