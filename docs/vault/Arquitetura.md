#qualidade
Gerado com o graphify (AST) sobre o JS do `index.html`: 42 funções, 6 comunidades.
Funções mais conectadas: `home()` 16, `lesson()` 14, `go()` 13, `bookScr()` 13, `win()` 12, `liaSays()` 11.
- `go()` troca de tela e dispara a entrada em [[Design]] (Motion).
- `lesson()` decide entre [[Lição do nome]] e a palavra do objetivo.
- Achado: `win()` e `nameWin()` repetiam a conta de vitórias e dias; agora usam `bump()`.
- Limitação: o graphify só enxerga o JS se ele estiver em arquivo `.js`. Com tudo dentro do HTML, o grafo vê só a configuração. Ver [[Próximos passos]].
