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
# ---- Trilha adaptativa: o foco decide a primeira lição; escrever fica sempre disponível ----
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL)
    pg.wait_for_timeout(500)
    casos = [
        ("receitas", "writing", True),    # escrever: começa pelo nome
        ("assinar", "reading", True),     # objetivo de assinar: começa pelo nome
        ("whatsapp", "reading", False),   # ler: começa pela palavra
        ("onibus", "speaking", False),    # falar: começa pela palavra
    ]
    for goal, focus, nome_primeiro in casos:
        pg.evaluate(f"S={{...S0,nick:'Maria',av:3,goal:'{goal}',focus:'{focus}',key:'LIA-X'}};save();go(lesson,2)")
        pg.wait_for_timeout(700)
        tem_traco = pg.evaluate("!!document.querySelector('#cv')")
        if tem_traco != nome_primeiro:
            fails.append(f"trilha {goal}/{focus}: nome primeiro deveria ser {nome_primeiro}")
        if not nome_primeiro:
            if not pg.evaluate("!!document.querySelector('#wr')&&!!document.querySelector('#nm')"):
                fails.append(f"trilha {goal}/{focus}: faltam atalhos de escrever palavra/nome")
    # atalhos levam ao traçado e a escrita conta como palavra conquistada
    pg.evaluate("S={...S0,nick:'Maria',av:3,goal:'whatsapp',focus:'reading',key:'LIA-X'};save();go(lesson,2)")
    pg.wait_for_timeout(700)
    pg.click("#wr"); pg.wait_for_timeout(500)
    if pg.evaluate("tr&&tr.mode") != "word" or not pg.evaluate("!!document.querySelector('#cv')"):
        fails.append("atalho 'escrever esta palavra' não abriu o traçado")
    pg.evaluate("go(lesson,2)"); pg.wait_for_timeout(500)
    pg.click("#nm"); pg.wait_for_timeout(500)
    if pg.evaluate("tr&&tr.mode") != "name":
        fails.append("atalho 'escrever o meu nome' não abriu a lição do nome")
    pg.evaluate("go(journey,1)"); pg.wait_for_timeout(500)
    if not pg.evaluate("!!document.querySelector('#nm2')"):
        fails.append("jornada sem atalho do nome para quem começou por ler")
    if errs:
        fails.append(f"erros JS na trilha adaptativa {errs}")
    b.close()
# ---- Voz: Web Speech API, sempre pt-BR e preferindo uma voz feminina ----
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL)
    pg.wait_for_timeout(500)
    def escolhe(lista):
        return pg.evaluate("""(v) => {
          speechSynthesis.getVoices = () => v.map(([name, lang]) => ({name, lang}));
          pick(); return [voice && voice.name, femVoice];
        }""", lista)
    r = escolhe([["Microsoft Felipe", "pt-BR"], ["Luciana", "pt-BR"], ["Joana", "pt-PT"]])
    if r != ["Luciana", True]: fails.append(f"voz: deveria escolher a Luciana, veio {r}")
    r = escolhe([["Daniel", "pt-BR"], ["Google português do Brasil", "pt-BR"]])
    if r != ["Google português do Brasil", True]: fails.append(f"voz: deveria escolher a voz do Google, veio {r}")
    r = escolhe([["Microsoft Antonio", "pt-BR"], ["Voz Qualquer", "pt-BR"]])
    if r[0] != "Voz Qualquer" or r[1]: fails.append(f"voz: sem nome feminino deveria evitar a masculina, veio {r}")
    r = escolhe([["Samantha", "en-US"]])
    if r[0] is not None: fails.append(f"voz: não deveria escolher voz que não é português, veio {r}")
    if errs: fails.append(f"erros JS na voz {errs}")
    b.close()
# ---- Voz mais humana: ranking, frases, pitch, troca de voz e logo em arquivo ----
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 390, "height": 844})
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(URL)
    pg.wait_for_timeout(500)
    def escolhe(lista):
        return pg.evaluate("""(v) => {
          localStorage.removeItem('lia-voz');
          speechSynthesis.getVoices = () => v.map(([name, lang]) => ({name, lang}));
          pick(); return [voice && voice.name, voiceTier(voice)];
        }""", lista)
    r = escolhe([["Google português do Brasil", "pt-BR"], ["Microsoft Francisca Online (Natural) - Portuguese (Brazil)", "pt-BR"], ["Microsoft Antonio Online (Natural) - Portuguese (Brazil)", "pt-BR"]])
    if r[0] != "Microsoft Francisca Online (Natural) - Portuguese (Brazil)" or r[1] != "natural":
        fails.append(f"voz: a Francisca natural deveria vencer, veio {r}")
    r = escolhe([["Portuguese (Brazil) espeak", "pt-BR"], ["Google português do Brasil", "pt-BR"]])
    if r[0] != "Google português do Brasil": fails.append(f"voz: deveria evitar a espeak, veio {r}")
    r = escolhe([["Luciana", "pt-BR"], ["Google português do Brasil", "pt-BR"]])
    if r[0] != "Google português do Brasil": fails.append(f"voz: Google deveria vencer a Luciana comum, veio {r}")
    # escolha da pessoa vale mais que o ranking
    r = pg.evaluate("""() => { localStorage.setItem('lia-voz','Luciana');
      speechSynthesis.getVoices = () => [{name:'Luciana',lang:'pt-BR'},{name:'Google português do Brasil',lang:'pt-BR'}];
      pick(); const n = voice.name; localStorage.removeItem('lia-voz'); return n }""")
    if r != "Luciana": fails.append(f"voz: a escolha salva deveria valer, veio {r}")
    # frases viram falas separadas; pitch moderado; cancelar libera a promessa
    r = pg.evaluate("""async () => {
      speechSynthesis.getVoices = () => [{name:'Luciana',lang:'pt-BR'}]; pick();
      const falas = []; speechSynthesis.speak = u => { falas.push([u.text, u.rate, u.pitch]); setTimeout(() => u.onend && u.onend(), 5) };
      await say('Oi! Eu sou a Lia. Vamos aprender juntas?', .88);
      let preso = true; const q = say('Primeira. Segunda.', .8).then(() => preso = false);
      speechSynthesis.speak = () => {}; stopVoice(); await q;
      return [falas, preso, chunks('fo'), chunks('')] }""")
    falas, preso, c1, c0 = r
    if [f[0] for f in falas[:3]] != ["Oi!", "Eu sou a Lia.", "Vamos aprender juntas?"]: fails.append(f"voz: frases mal divididas {falas}")
    if any(f[2] > 1.1 for f in falas[:3]): fails.append(f"voz: pitch alto demais {falas}")
    if preso: fails.append("voz: stopVoice não liberou a fala pendente")
    if c1 != ["fo."] or c0 != []: fails.append(f"voz: chunks de sílaba/vazio {c1} {c0}")
    # painel de voz no perfil + logo carregando do arquivo
    pg.evaluate(SEED + "speechSynthesis.getVoices=()=>[{name:'Luciana',lang:'pt-BR'},{name:'Google português do Brasil',lang:'pt-BR'}];go(bookScr,3)")
    pg.wait_for_timeout(900)
    if pg.evaluate("document.querySelectorAll('#vsel option').length") != 2: fails.append("painel 'Voz da Lia' sem as 2 vozes")
    pg.evaluate("go(welcome,-1)"); pg.wait_for_timeout(900)
    if not pg.evaluate("(()=>{const i=document.querySelector('.wlogo');return !!i&&i.complete&&i.naturalWidth>0})()"):
        fails.append("logo (assets/logo.webp) não carregou")
    if errs: fails.append(f"erros JS na voz nova {errs}")
    b.close()
print("FALHAS:", fails) if fails else print("OK")
sys.exit(1 if fails else 0)
