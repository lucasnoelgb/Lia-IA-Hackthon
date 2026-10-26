# Graph Report - repo  (2026-10-26)

## Corpus Check
- 32 files · ~7,977 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .css 5, (none) 4, .example 1)

## Summary
- 158 nodes · 296 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 85 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `045c60b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ci.yml
- voice.js
- repos
- Lia — Palavra Geradora
- Arquitetura.md
- Design system — Lia
- state.js
- lesson
- home
- trace.js
- Lia — guia do projeto
- data.js
- pull_request_template.md

## God Nodes (most connected - your core abstractions)
1. `lesson()` - 14 edges
2. `Lia — Palavra Geradora` - 12 edges
3. `home()` - 10 edges
4. `fillVoicePanel()` - 10 edges
5. `say()` - 9 edges
6. `journey()` - 8 edges
7. `win()` - 8 edges
8. `drawTrace()` - 8 edges
9. `pick()` - 8 edges
10. `bookScr()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Traçado e lição do nome` --references--> `bump()`  [INFERRED]
  CLAUDE.md → js/trace.js
- `Tecnologia e arquitetura` --references--> `lesson()`  [INFERRED]
  README.md → js/lesson.js
- `Regras principais` --references--> `win()`  [INFERRED]
  CLAUDE.md → js/lesson.js
- `Tecnologia e arquitetura` --references--> `win()`  [INFERRED]
  README.md → js/lesson.js
- `Tecnologia e arquitetura` --references--> `go()`  [INFERRED]
  README.md → js/state.js

## Import Cycles
- None detected.

## Communities (16 total, 4 thin omitted)

### Community 0 - "ci.yml"
Cohesion: 0.17
Nodes (11): jobs, smoke, name, runs-on, steps, run, uses, with (+3 more)

### Community 1 - "voice.js"
Cohesion: 0.24
Nodes (17): bindVoicePanel(), chunks(), esc(), fillVoicePanel(), liaSays(), pending, pick(), ptVoices() (+9 more)

### Community 3 - "repos"
Cohesion: 0.25
Nodes (7): args, exclude, id, repos, hooks, repo, rev

### Community 4 - "Lia — Palavra Geradora"
Cohesion: 0.12
Nodes (17): A escrita com traçado, A solução, A voz da Lia, Como funciona, Como rodar, Conquistas, Decisões de projeto, Documentação (+9 more)

### Community 5 - "Arquitetura.md"
Cohesion: 0.39
Nodes (3): Lia, canName(), nameFirst()

### Community 6 - "Design system — Lia"
Cohesion: 0.40
Nodes (4): Checklist de entrega, Decisões de movimento, Design system — Lia, Estética (claude-cookbooks)

### Community 8 - "state.js"
Cohesion: 0.15
Nodes (6): app, AV, NAV, S, save(), scr

### Community 9 - "lesson"
Cohesion: 0.53
Nodes (9): drawRead(), drawSpeak(), drawWrite(), head(), karaoke(), lbk(), lesson(), win() (+1 more)

### Community 10 - "home"
Cohesion: 0.16
Nodes (14): badge(), badges(), bookScr(), garden(), home(), week(), IC, card() (+6 more)

### Community 11 - "trace.js"
Cohesion: 0.28
Nodes (11): journey(), bump(), drawTrace(), letterName(), LN, nameLesson(), nameLetters(), nameWin() (+3 more)

### Community 12 - "Lia — guia do projeto"
Cohesion: 0.22
Nodes (8): Comandos, Estrutura, Estética do front-end (do claude-cookbooks, `coding/prompting_for_frontend_aesthetics`), Git, Lia — guia do projeto, Regras principais, Traçado e lição do nome, go()

### Community 13 - "data.js"
Cohesion: 0.50
Nodes (3): FOCI, GOALS, S0

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Lia — Palavra Geradora` connect `Lia — Palavra Geradora` to `trace.js`, `Arquitetura.md`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `lesson()` (e.g. with `Arquitetura.md` and `Estrutura de arquivos.md`) actually correct?**
  _`lesson()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Should `Lia — Palavra Geradora` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Why does `go()` connect `Lia — guia do projeto` to `state.js`, `home`, `trace.js`, `Arquitetura.md`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `home()` (e.g. with `Arquitetura.md` and `Estrutura de arquivos.md`) actually correct?**
  _`home()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Why does `Tecnologia e arquitetura` connect `trace.js` to `lesson`, `Lia — Palavra Geradora`, `Lia — guia do projeto`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `fillVoicePanel()` (e.g. with `Arquitetura.md` and `Vozes.md`) actually correct?**
  _`fillVoicePanel()` has 2 INFERRED edges - model-reasoned connections that need verification._