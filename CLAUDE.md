# Lia — guia do projeto

App de alfabetização para adultos (HTML único, JS vanilla, sem build).

## Comandos
```bash
make serve   # http://localhost:8000
make test    # teste de fumaça (Playwright)
```

## Estrutura
```
index.html        # app inteiro (CSS + JS)
tests/smoke.py    # teste de fumaça
docs/             # design system e decisões
.github/          # CI e templates
```

## Regras principais
1. **Segredos:** nunca commitar `.env`. Chave de API nunca vai no front-end; se um dia houver IA, ela passa por um backend próprio.
2. **Acessibilidade primeiro:** texto do corpo 20px, contraste 4.5:1 nos dois temas, alvos de toque ≥ 48px, foco visível de 4px.
3. **Movimento:** Motion fixado em `11.11.17` via CDN. Sem Motion ou com `prefers-reduced-motion`, tudo aparece parado. Animar só `transform` e `opacity`.
4. **Sem emoji como ícone estrutural.** Emojis das palavras são conteúdo pedagógico.
5. **Layout:** `.screen` é flex com rolagem; filhos usam `flex-shrink:0` para não serem esmagados (bug do card de objetivo).
6. **Dados:** só `localStorage`, sem e-mail/senha/CPF.
7. **Antes de commitar:** `make test`.

## Git
Branch: `<usuario>/<descricao>`. Commits convencionais:
```
feat(home): ...    fix(home): ...    docs: ...    chore: ...
```

## Estética do front-end (do claude-cookbooks, `coding/prompting_for_frontend_aesthetics`)
Ao criar ou mudar UI, trabalhe estas dimensões e evite o visual genérico de IA:
- **Tipografia:** fontes com caráter (Bricolage Grotesque nos títulos). Atkinson Hyperlegible no corpo é exceção justificada: legibilidade para quem está aprendendo a ler vale mais que originalidade.
- **Cor e tema:** variáveis CSS, uma cor dominante (azul-verde) com acento forte (laranja). Tema "solarpunk": caloroso, orgânico, esperançoso. Sem gradiente roxo sobre branco.
- **Movimento:** uma entrada bem orquestrada com stagger vale mais que micro-animações espalhadas.
- **Fundo:** atmosfera e profundidade (brilhos em gradiente, colinas, anéis), nunca cor chapada.
- **Evitar:** Inter/Roboto/Arial, layouts previsíveis, componentes "de prateleira".

## Traçado e lição do nome
- Use **Pointer Events** (nunca `touch*`/`mouse*` separados) e `touch-action:none` no canvas.
- Guarde os pontos em coordenadas 0–1 (sobrevive a redimensionar/girar).
- A avaliação é só incentivo: avisa uma vez e deixa seguir. Nunca bloquear o aprendizado.
- Lógica de vitória/dia passa por `bump()`.
- Mapa de código: `graphify` roda sobre `.js`; hoje o JS está dentro do HTML (ver `docs/vault/Próximos passos.md`).
