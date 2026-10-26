#qualidade
O app deixou de ser um HTML único. Continua **sem build e sem módulos ES**: são scripts clássicos carregados em ordem pelo `index.html`, então abrir o arquivo direto no navegador ainda funciona (`make serve` também).

```
index.html      só a casca: <link> dos CSS e <script> dos JS, na ordem
assets/         logo.webp (antes era base64 dentro do JS)
css/            tokens · base · components · screens · effects · trace
js/             icons · data · state · voice · falar-resposta · utils · onboarding · home
                journey · lesson · achievements · trace · brand · motion · main
```

| Arquivo JS | O que tem |
|---|---|
| `icons.js` | `IC`, `ic()` |
| `data.js` | `LOGO`, `GOALS`, `FOCI`, `S0` |
| `state.js` | `S` (localStorage), `save()`, `go()`, avatares, navegação |
| `voice.js` | voz da Lia e painel de voz. Ver [[Vozes]] |
| `falar-resposta.js` | `falar_resposta()`, `limparMarkdown()`, `pararResposta()`: lê respostas de IA em voz feminina pt-BR. Ver [[Vozes]] |
| `utils.js` | `norm()`, `nextWord()`, `confetti()` |
| `onboarding.js` | `welcome()`, `onboarding()`, `card()` |
| `home.js` | `home()`, `garden()`, `week()` |
| `journey.js` | `journey()` |
| `lesson.js` | `lesson()`, oficina, `karaoke()`, `win()` |
| `achievements.js` | `bookScr()`, medalhas |
| `trace.js` | [[Traçado]], [[Trilha adaptativa]], `bump()`, `nameWin()` |
| `brand.js`, `motion.js`, `main.js` | marca LIA, animações ([[Design]]) e inicialização |

**Regra importante:** a ordem dos `<script>` importa. Eles compartilham o escopo global (`S`, `go`, `scr`, `say`…), como antes. Quem mexe em `go()` ou `win()` (o `motion.js` envolve os dois) precisa ficar depois de `state.js` e `lesson.js`. A ordem dos CSS também importa (a cascata foi preservada).

Com isso o graphify passou a enxergar todo o código. Ver [[Arquitetura]].
