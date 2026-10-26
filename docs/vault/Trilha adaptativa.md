#tela
A trilha se adapta ao que a pessoa responde no cadastro (objetivo e foco). A escrita nunca é removida.
| Resposta inicial | Primeira lição | Escrita |
|---|---|---|
| Foco **Escrever** ou objetivo **Assinar o meu nome** | o nome, letra por letra ([[Lição do nome]]) | é o caminho principal |
| Foco **Ler** | a palavra do objetivo, com sílabas | botões "Quero escrever esta palavra" e "Escrever o meu nome" |
| Foco **Falar e entender** | a palavra do objetivo, falada | os mesmos botões |
No código: `nameFirst()` decide se começa pelo nome, `canName()` mostra o atalho do nome e `wlevel()` mede o avanço da escrita (palavras conquistadas no foco Escrever; palavras escritas por opção nos outros, em `S.wrote`). Usa o [[Traçado]].
