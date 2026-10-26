# Lia — Palavra Geradora
<img width="3840" height="2160" alt="Lia — Educação e aprendizagem - slide 1" src="https://github.com/user-attachments/assets/6194f174-bb5f-4c59-b613-73c4c737e6f0" />

<br>App de alfabetização para adultos. Ler, escrever e falar no seu ritmo, com a voz da Lia e com as palavras da vida de cada pessoa. Sem e-mail, senha ou CPF: os dados ficam só no aparelho.

## Como rodar
Arquivo único, sem build e sem npm. Abra `index.html` no navegador, ou publique no GitHub Pages (Settings → Pages → Branch `main` / root).

## Stack
- HTML, CSS e JS vanilla
- Síntese e reconhecimento de voz do navegador (pt-BR)
- [Motion](https://motion.dev) 11.11.17 via CDN (`animate`, `inView`, `stagger`)

## Animações (Motion)
| Onde | O que anima |
|---|---|
| Toda troca de tela | Entrada em sequência (stagger) dos blocos |
| Início / Jornada | Barra de progresso (scaleX) e estrada que se desenha |
| Jornada / Conquistas | Nós, medalhas e carimbos entram ao rolar (`inView`) |
| Acerto da palavra | Figura em mola e sílabas em sequência |
| Rodapé de Conquistas | Marca LIA: toque na letra, ela vira e a Lia diz o nome |

Se o Motion não carregar, ou se a pessoa pedir "reduzir movimento", tudo aparece parado e o app segue funcionando.

## Desenvolvimento
`make serve` roda local e `make test` roda o teste de fumaça. Convenções em [`CLAUDE.md`](CLAUDE.md) (práticas adaptadas do [claude-cookbooks](https://github.com/anthropics/claude-cookbooks): CLAUDE.md, `.env.example`, pre-commit, CI, commits convencionais).

## Design
Veja [`docs/design-system.md`](docs/design-system.md).

## Créditos de inspiração
Componentes do [21st.dev](https://21st.dev): *Shutter Glyph Footer* (marca desenhada em SVG, letra que vira ao toque) e *Dune Haul Footer* (revelação em camadas e estrada que se pavimenta). Ideias portadas para vanilla; nenhum código React foi incluído.
