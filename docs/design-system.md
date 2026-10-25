# Design system — Lia

Gerado com a metodologia ui-ux-pro-max (`--design-system`, motion 5, density 3).

- **Estilo:** Accessible & Ethical — alto contraste, texto grande, foco visível, alvos de toque grandes.
- **Tipografia:** Atkinson Hyperlegible (corpo) + Bricolage Grotesque (títulos). Corpo em 20px.
- **Cor:** azul calmo + verde de acolhimento, laranja só para foco e ação do dia. Tokens em `:root`, com tema escuro próprio.
- **Evitar:** texto pequeno, navegação complexa, gradientes roxo/rosa de IA.

## Decisões de movimento
1. Animar 1–2 coisas por vista; a entrada em sequência conta como uma coreografia só.
2. Durações curtas (0,5–0,9 s) e a mesma curva `cubic-bezier(.16,.84,.2,1)`.
3. Nada de texto embaralhando ao passar o mouse (o *scramble* do Shutter Glyph foi **descartado**: atrapalha quem está aprendendo a ler).
4. `prefers-reduced-motion` desliga tudo; estado inicial `opacity:0` só existe quando o Motion carregou.
5. Animar `transform` e `opacity`, nunca `width`/`height`.

## Checklist de entrega
- [x] Sem emoji como ícone estrutural (ícones SVG; os emojis das palavras são conteúdo pedagógico)
- [x] Foco visível de 4px, alvos ≥ 48px
- [x] Contraste de texto ≥ 4.5:1 nos dois temas
- [x] Reduzir movimento respeitado
- [ ] Testar em 375px com texto do sistema no maior tamanho
