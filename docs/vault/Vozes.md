#tela
A voz da Lia usa a **Web Speech API** do navegador, sempre em pt-BR, com preferência por voz feminina e o máximo de naturalidade que o aparelho permitir. Código em `js/voice.js` (ver [[Estrutura de arquivos]]).

**Por que podia soar robótica:** a Web Speech API só fala com as vozes que o aparelho tem. No Linux, o padrão costuma ser o eSpeak (muito robótico); no Chrome e no Edge existem vozes de rede/neurais bem mais humanas. O código não cria voz nova: escolhe a melhor disponível e fala de um jeito mais natural.

**O que o código faz**
- `pick()` pontua cada voz pt-BR com `voiceScore()`: natural/neural/online (Edge, ex.: Francisca Online) > Google português do Brasil > Premium/Enhanced > voz feminina padrão (Luciana, Maria…) > outras. Vozes masculinas conhecidas são descartadas; eSpeak/robô perde pontos.
- `voiceTier()` classifica em `natural`, `padrao`, `basica` ou `none` (usado na dica do painel e no ajuste de velocidade).
- `chunks()` quebra o texto em frases e `say()` fala uma frase por vez, com a entonação e a pausa natural de cada uma.
- `tune()`: frases em voz natural sobem um pouco a velocidade (+0,08, máx. 1); sílabas e palavras continuam lentas de propósito.
- Pitch moderado: 1,0 em voz natural, 1,04 em voz feminina padrão, 1,12 só se não houver nome feminino (antes era 1,25, que soava como robô de desenho).
- `stopVoice()` cancela a fala e libera as promessas pendentes (ninguém fica esperando uma fala que não vem).
- Painel **Voz da Lia** em Conquistas > Meu perfil (`voicePanel()`, `fillVoicePanel()`, `bindVoicePanel()`): lista as vozes pt-BR do aparelho, toca uma amostra e guarda a escolha em `localStorage` (`lia-voz`). A escolha da pessoa vale mais que o ranking. Se a voz for básica, mostra a dica de abrir no Chrome ou no Edge.

**Limites:** em aparelho que só tem eSpeak, nenhum código deixa a voz natural; é preciso outro navegador ou uma voz instalada. Tudo é local: nenhum texto ou áudio sai do aparelho. Ver [[Acessibilidade]], [[Arquitetura]] e [[Testes]].

**Falar a resposta de uma IA (`js/falar-resposta.js`)**
Carrega depois de `voice.js` e reaproveita `ptVoices()`, `voiceScore()`, `FEM` e `MASC`.
- `falar_resposta(texto, {rate, exigirFeminina, aoComecar})` é assíncrona e **nunca lança erro nem mostra `alert()`**. Devolve `{ok:true, voz, feminina}` ou `{ok:false, motivo, mensagem}` (`sem-suporte`, `sem-voz`, `sem-voz-feminina`, `texto-vazio`, `bloqueado`, `erro-audio`); a falha só aparece no console.
- `limparMarkdown(texto)` tira `**`, `*`, `_`, `#`, links, URLs, código, tabelas, HTML e emojis antes de falar; títulos e itens de lista ganham ponto final para a pausa.
- Voz: usa a voz atual da Lia se for feminina; senão a melhor com nome feminino. Sem nome feminino, usa a melhor que não seja masculina (muitas vozes de Android não revelam o gênero); com `exigirFeminina:true` não fala.
- Fala frase por frase (frase longa é quebrada em 200 caracteres) e a resposta nova substitui a anterior. `pararResposta()` interrompe.
- O Chrome só libera áudio depois de um toque na página: chame a partir de um botão.
- Teste: `tests/falar-resposta.test.js` (Node, voz simulada). Não substitui ouvir em aparelho real.
