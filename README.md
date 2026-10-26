# Lia — Palavra Geradora
<img width="3840" height="2160" alt="Lia — Educação e aprendizagem - slide 1" src="https://github.com/user-attachments/assets/229b358c-c950-4fb6-ae8a-e1c2024cd471" />

<br>App de alfabetização para adultos. Ler, escrever e falar no seu ritmo, com a voz da Lia e com as palavras da vida de cada pessoa. Sem e-mail, senha ou CPF: os dados ficam só no aparelho.

## Como rodar
Arquivo único, sem build e sem npm. Abra `index.html` no navegador, ou use `make serve` (http://localhost:8000). Para publicar: GitHub Pages (Settings → Pages → branch `main`, raiz).

## A primeira lição: escrever o próprio nome
Depois do cadastro, a primeira lição é o nome da pessoa, letra por letra.
1. A Lia explica e diz o nome de cada letra (ême, a, érre…).
2. A **letra-modelo** fica em cima; embaixo está a **folha** para traçar.
3. Ao tocar em "Pronto", a Lia confere quanto da letra foi coberto e responde por voz: elogia, ou pede para tentar de novo uma vez. Depois deixa seguir, sem travar ninguém.
4. Na última letra: confete, e a jornada segue com as palavras do objetivo.

> **Sobre a "IA":** hoje a ajuda é local, com cobertura da letra e voz do navegador. Não é um modelo de linguagem. Uma IA de verdade exigiria um backend próprio, porque a chave da API não pode ficar no navegador.

## Traçado: mouse, toque e caneta
Funciona com Pointer Events, então o mesmo código atende dedo, mouse e caneta.

| Controle | O que faz |
|---|---|
| **Desfazer** | apaga só o último traço |
| **Apagar tudo** | limpa a folha |
| **Guia ligada/desligada** | desligando, a pessoa escreve de memória, olhando só o modelo de cima |
| **Esconder modelo** | tira também a letra de cima |

Tocar na letra-modelo faz a Lia dizer o nome dela.

**O que se escreve vai mudando:** o nome (letra por letra) → as primeiras palavras, sílaba por sílaba → a palavra inteira → a partir da 5ª palavra, sem guia, de memória.

## Stack
HTML, CSS e JS vanilla · voz do navegador (pt-BR) · [Motion](https://motion.dev) 11.11.17 via CDN (`animate`, `inView`, `stagger`). Com "reduzir movimento" ou sem o Motion, tudo aparece parado e funciona.

## Desenvolvimento
`make test` roda o teste de fumaça (Playwright): card do objetivo, rolagem, marca LIA e o traçado. O CI roda a cada push. Convenções em [`CLAUDE.md`](CLAUDE.md).

## Mapa do projeto (Obsidian + graphify)
Abra `docs/vault/` como cofre no Obsidian para ver o grafo de notas: [`Lia.md`](docs/vault/Lia.md) é a nota central. O [graphify](https://github.com/safishamsi/graphify) mapeou o código (42 funções, 6 comunidades) e apontou a lógica duplicada, já unificada em `bump()`. Detalhes em [`Arquitetura.md`](docs/vault/Arquitetura.md).

## Design
[`docs/design-system.md`](docs/design-system.md). Inspirações: componentes do [21st.dev](https://21st.dev) e o guia `prompting_for_frontend_aesthetics` do [claude-cookbooks](https://github.com/anthropics/claude-cookbooks).
