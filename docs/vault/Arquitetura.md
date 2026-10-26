#qualidade
Mapa gerado com o graphify (`graphify update .`, só AST, sem custo) em 26/10/2026, depois de separar o JS em arquivos. Ver [[Estrutura de arquivos]].

**Números:** 158 nós, 296 relações, 16 comunidades (a maioria dos nós ainda são seções dos `.md`, que o graphify também lê).

**Funções mais conectadas:** `lesson()` 13, `home()` 9, `fillVoicePanel()` 8, `drawTrace()` 7, `pick()` 7, `bookScr()` 6, `journey()` 6, `drawWrite()` 6.

**Comunidades de código:**
- `voice.js`: `pick()`, `say()`, `chunks()`, `liaSays()`, `ptVoices()`, painel de voz. Ver [[Vozes]].
- `lesson` e `home`: `lesson()`, `karaoke()`, `drawWrite/Read/Speak()`, `home()`, `bookScr()`, `badge()`, `onboarding()`.
- `trace.js`: `drawTrace()`, `nameLesson()`, `bump()`, `canName()`, `nameFirst()`. Ver [[Traçado]].
- `state.js`: `S`, `go()`, `NAV`, `AV`. `data.js`: `GOALS`, `FOCI`, `S0`.

**Fatos que valem lembrar**
- `go()` troca de tela e dispara a entrada em [[Design]] (Motion).
- `lesson()` decide entre [[Lição do nome]] e a palavra do objetivo ([[Trilha adaptativa]]).
- `win()` e `nameWin()` usam `bump()` para vitórias e dias (o graphify tinha apontado a duplicação).
- Antes da separação o grafo só via a configuração (CI, pre-commit). Agora vê as ~40 funções do app.

**Manutenção:** o graphify respeita o `.graphifyignore` da raiz (ignora cópias antigas de `graph.json` e `GRAPH_REPORT.md` na raiz e a pasta `tools/`). A versão oficial fica em `graphify-out/`. Rode `graphify update .` depois de mexer em código.
