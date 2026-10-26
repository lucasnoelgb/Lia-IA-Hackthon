#qualidade
`make test` abre o app e confere: trilha adaptativa (nome primeiro só em Escrever/Assinar), voz ([[Vozes]]: ranking natural > Google > padrão, evita eSpeak, escolha salva vence, frases separadas, pitch moderado, `stopVoice()` libera a fala, painel de voz e logo em arquivo), card do objetivo, rolagem, letras LIA e o [[Traçado]] (desfazer, apagar, guia, modelo). Roda no CI a cada push.
`make check` roda `node --check` em cada arquivo de `js/`.
`make test` também roda `tests/falar-resposta.test.js` (Node): limpeza de Markdown, escolha de voz feminina, erros e interrupção de `falar_resposta()`, com voz simulada ([[Vozes]]).
