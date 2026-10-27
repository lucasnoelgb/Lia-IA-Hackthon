# Lia — Palavra Geradora

**Aprender a ler e escrever começa pelo seu próprio nome.**

<img width="3840" height="2160" alt="Lia — Educação e aprendizagem - slide 1" src="https://github.com/user-attachments/assets/229b358c-c950-4fb6-ae8a-e1c2024cd471" />

![CI](https://github.com/lucasnoelgb/Lia-IA-Hackthon/actions/workflows/ci.yml/badge.svg)

| | |
|---|---|
| **Para quem** | adultos que estão aprendendo a ler e a escrever |
| **Repositório** | <https://github.com/lucasnoelgb/Lia-IA-Hackthon> |
| **Demo** | <https://liahackthon.vercel.app/> |
| **Video** | <https://lucasnoelgb.github.io/Video-de-exibicao/> |
| **Equipe** | Lucas ([@lucasnoelgb](https://github.com/lucasnoelgb)) |
> 📱 **Observação:** As funcionalidades de **voz e microfone** da Lia são **exclusivas para acesso via celular** (ou dispositivos móveis), aproveitando os recursos nativos do navegador do aparelho.

---

## O problema

Quem aprende a ler já adulto muitas vezes esbarra em material feito para criança, em cadastros longos e na
vergonha de errar diante dos outros. E as palavras que importam na vida da pessoa (o próprio nome, uma
placa de ônibus, a receita da família) raramente são o ponto de partida.

## A solução

A Lia é uma professora de bolso que fala português. A pessoa escolhe **um objetivo** e **um foco**, e a
primeira lição é **escrever o próprio nome**, letra por letra, traçando com o dedo. A Lia fala cada
sílaba, ouve a pessoa, comemora cada passo e, quando algo não sai, diz "vamos juntas de novo". Sem e-mail,
senha ou CPF: os dados ficam só no aparelho.

## Objetivos: o que a gente quer provar

| Para quem | O objetivo |
|---|---|
| **Quem está aprendendo** | ler e escrever o que importa na própria vida, começando pelo nome, sem vergonha: errar vira tentar de novo, nunca reprovação |
| **Quem apoia** (família, voluntários, turmas de jovens e adultos) | uma ferramenta gratuita, sem instalação, sem cadastro e sem coleta de dados, que abre em qualquer celular |
| **O projeto** | provar que dá para ensinar com um app 100% no navegador, sem servidor e sem depender de IA no núcleo |

## Como funciona

### O ciclo

1. **Cadastro em 3 passos:** o nome (digitando ou falando) e um símbolo; o objetivo; o foco.
2. **Trilha adaptativa:** o foco e o objetivo escolhidos no cadastro decidem por onde começar. Quem escolhe **Escrever** (ou o objetivo **Assinar o meu nome**) começa pelo **nome**, letra por letra, com a Lia dizendo o nome de cada letra. Quem escolhe **Ler** ou **Falar e entender** começa direto pela **palavra do objetivo**, sem precisar escrever primeiro. A escrita nunca some: em toda palavra há o botão "Quero escrever esta palavra" e, enquanto o nome não foi escrito, "Escrever o meu nome" (também na Jornada).
3. **Palavra de hoje:** a Lia fala a palavra e destaca cada sílaba.
4. **Oficina,** conforme o foco:
   - **Ler:** a pessoa toca em cada pedacinho para ouvir, ou lê junto com a Lia.
   - **Escrever:** monta a palavra com as sílabas e depois a escreve (veja abaixo).
   - **Falar e entender:** a Lia fala primeiro; depois é a vez da pessoa, e o app confere o que ela disse.
5. **Vitória:** confete, parabéns da Lia e o jardim cresce. A cada **2 palavras novas** sobe de nível (do 1 ao 5).

### Objetivos disponíveis

São 6 objetivos, com 5 palavras cada. O último aceita um objetivo escrito pela própria pessoa.

| Objetivo | Palavras |
|---|---|
| Ler mensagens no WhatsApp | FOTO · NETO · BEIJO · ÁUDIO · MENSAGEM |
| Ler placas de ônibus | RUA · PONTO · LINHA · VOLTA · CENTRO |
| Assinar o meu nome | NOME · LETRA · CANETA · DOCUMENTO · ASSINATURA |
| Ler a Bíblia | VIDA · AMOR · LIVRO · GRAÇA · ESPERANÇA |
| Escrever minhas receitas | OVO · BOLO · FARINHA · RECEITA · TEMPERO |
| Outro objetivo | CASA · MESA · AMIGO · FAMÍLIA · TRABALHO |

### A escrita com traçado

A **letra-modelo** fica em cima e a **folha** para traçar fica embaixo. Funciona com dedo, mouse e caneta.

| Controle | O que faz |
|---|---|
| **Desfazer** | apaga só o último traço |
| **Apagar tudo** | limpa a folha |
| **Guia ligada/desligada** | desligando, a pessoa escreve de memória, olhando só o modelo de cima |
| **Esconder modelo** | tira também a letra de cima |

Tocar na letra-modelo faz a Lia dizer o nome dela.

**O que se escreve vai mudando:**

| Etapa | O que a pessoa escreve |
|---|---|
| 1 | o **nome**, letra por letra (primeiro no foco Escrever; opcional nos outros) |
| 2 | as **duas primeiras palavras**, sílaba por sílaba, com guia |
| 3 | a **palavra inteira** |
| 4 | a partir da **5ª palavra**, sem guia, **de memória** |

Ao tocar em "Pronto", a Lia confere quanto do desenho foi coberto e responde por voz. Se ficou longe, pede
uma nova tentativa **uma vez** e depois deixa seguir: a avaliação é incentivo, nunca trava ninguém.

### Conquistas

Seis medalhas (Primeira palavra, Três palavras, Jornada completa, Três dias, Coragem e Nível 3), a
sequência de dias de prática e o **Jardim da Vitória**, que cresce em 5 estágios. Na tela Conquistas fica a
marca **LIA**: ao tocar numa letra, ela vira e a Lia diz o nome dela.

### Sobre a IA

A ajuda da Lia é **local**: ela mede a cobertura do traço e usa a voz do navegador (síntese e
reconhecimento em pt-BR). **Não é um modelo de linguagem.** Uma IA generativa exigiria um backend próprio,
porque a chave da API não pode ficar no navegador.

## O que está pronto e verificado

Verificado em 26/10/2026:

| Item | Estado |
|---|---|
| Sintaxe do JS | `node --check` limpo |
| Teste de fumaça | passa em navegador headless (375 px e 1280 px): card do objetivo, rolagem, marca LIA, traçado (desfazer, apagar, guia, modelo) e a progressão letras → sílabas → palavra |
| Mouse | testado: arrastar na folha desenha o traço |
| Toque | testado com **eventos de toque simulados** no Chromium |
| Animações | testadas com o bundle do Motion 11.11.17; sem Motion, tudo aparece parado e funciona |
| CI | workflow em `.github/workflows/ci.yml`, roda a cada push |

**Ainda não verificado:** celular real (toque e voz), Safari no iPhone, texto do sistema no maior tamanho e
leitor de tela de verdade. O reconhecimento de voz depende do navegador; onde não existe, a pessoa usa o
botão "Já falei".

### A voz da Lia

A Lia fala com a **Web Speech API** do navegador, sempre em português do Brasil e com preferência por uma
**voz feminina e natural**. O código (`js/voice.js`) pontua as vozes do aparelho: vozes neurais/online
(Edge, ex.: Francisca Online) vencem a voz do Google em português, que vence as vozes padrão (Luciana,
Maria, Fernanda…); vozes masculinas e robóticas (eSpeak) são evitadas. Ela fala **frase por frase**, com
velocidade e tom moderados (o tom só sobe um pouco quando não há voz com nome feminino).

A qualidade final depende das vozes que o aparelho tem: no Linux o padrão costuma ser o eSpeak, que é
robótico; no Google Chrome ou no Microsoft Edge aparecem vozes bem mais humanas. Em **Conquistas → Meu
perfil → Voz da Lia** dá para escolher outra voz, ouvir uma amostra e guardar a escolha no aparelho.

Para ler em voz alta o texto de uma IA, use `falar_resposta(texto)` (`js/falar-resposta.js`): ela remove
Markdown, links e emojis, fala com voz feminina pt-BR e, se algo falhar, devolve `{ok:false, motivo}` sem
mostrar alerta. Detalhes em [`docs/vault/Vozes.md`](docs/vault/Vozes.md).
Tudo roda no aparelho, sem chave e sem enviar texto para fora.

## Tecnologia e arquitetura

HTML, CSS e JavaScript puros, sem framework. [Motion](https://motion.dev) 11.11.17 via CDN (`animate`,
`inView`, `stagger`) e a voz do navegador (Web Speech API, pt-BR). O estado da pessoa fica em
`localStorage`. Cada tela é uma função que escreve em `#scr`, e `go()` troca de tela e anima a entrada.

```
.
├── index.html            a casca: carrega os css/ e js/ na ordem
├── css/                  tokens · base · components · screens · effects · trace
├── js/                   icons · data · state · voice · falar-resposta · utils · onboarding · home · journey
│                         lesson · achievements · trace · brand · motion · main
├── assets/logo.webp      logo da Lia
├── tools/gerador-de-vozes.html  gera áudios fixos (ElevenLabs) no navegador, sem terminal
├── tests/smoke.py        teste de fumaça (Playwright)
├── docs/
│   ├── design-system.md  estilo, cores, tipografia e regras de movimento
│   └── vault/            cofre do Obsidian: mapa do projeto
├── graphify-out/         mapa do código (graph.json, graph.html, GRAPH_REPORT.md)
├── .github/              CI e modelo de pull request
├── CLAUDE.md             convenções do projeto
├── Makefile              make serve · make check · make test · make graph
└── .env.example          sem chaves hoje
```
### Por que usamos o Graphify com o Claude?

* **Contexto Preciso (GraphRAG):** Em vez de fazer o Claude "adivinhar" ou ler arquivos isolados, o Graphify gera um mapa completo de nós (funções, variáveis e arquivos) e arestas (chamadas e dependências).
* **Análise de Arquitetura:** O mapa atual em `js/` conta com **158 nós organizados em 16 comunidades**, ajudando o Claude a identificar lógicas duplicadas (como a função unificada `bump()`) e planejar refatorações sem quebrar dependências.
* **Navegação Eficiente:** Permite que a IA navegue diretamente pelo `graph.json` ou consulte a documentação no cofre do Obsidian (`docs/vault/Arquitetura.md`), garantindo edições seguras e respostas rápidas.

<img width="1761" height="934" alt="image" src="https://github.com/user-attachments/assets/32ef269f-6140-48f3-beea-d1ef62d823ff" />


---
Funções centrais: `go()` (troca de tela), `lesson()` (decide entre o nome e a palavra do dia),
`drawTrace()` (a folha de traçado), `win()` e `bump()` (vitória, sequência de dias e jardim). O
[graphify](https://github.com/Graphify-Labs/graphify) mapeia o código (agora em `js/`: 158 nós, 16
comunidades) e apontou a lógica duplicada que virou `bump()`. Os arquivos são scripts clássicos carregados
em ordem (sem módulos ES), então abrir o `index.html` direto no navegador continua funcionando.



## Decisões de projeto

- **A trilha se adapta ao que a pessoa responde no início.** Para quem quer escrever (ou assinar), a primeira lição é o nome: a palavra mais importante e a que mais motiva. Para quem quer ler ou falar, a trilha vai direto às palavras do objetivo, e o nome e a escrita ficam sempre à mão, nunca obrigatórios.
- **Voz do próprio navegador (Web Speech API).** Sem servidor, sem chave e sem mandar o texto da pessoa para um serviço externo.
- **Sem cadastro e sem coleta.** Nada de e-mail, senha ou CPF. Os dados ficam no aparelho e podem ser
  apagados em "Começar de novo".
- **O núcleo roda sem IA, de propósito.** A avaliação é regra local, então funciona mesmo com internet
  ruim e não expõe chave nenhuma.
- **Errar não trava.** A Lia avisa uma vez e deixa seguir.
- **Um só código para dedo, mouse e caneta** (Pointer Events).
- **Acessibilidade:** texto do corpo em 20 px, contraste mínimo de 4.5:1 nos temas claro e escuro, alvos de
  toque a partir de 48 px, foco visível por teclado, `aria-pressed` e `aria-live`, e `prefers-reduced-motion`
  desliga as animações.
- **Sem letras embaralhando.** O efeito do componente de referência do 21st foi descartado porque atrapalha
  quem está aprendendo a ler.

## Próximos passos

- [ ] Testar em celulares reais e no Safari do iPhone
- [x] Separar o JS e o CSS em arquivos próprios, para o graphify enxergar todo o código
- [ ] Ouvir a voz em aparelhos reais (Chrome e Edge no PC, Android, iPhone) e ajustar o ranking de vozes
- [ ] Traçar também as palavras do objetivo nos focos Ler e Falar
- [ ] Feedback de escrita com IA generativa, via backend próprio (a chave nunca vai no navegador)

## Equipe

| Nome | GitHub |
|---|---|
| Lucas | [@lucasnoelgb](https://github.com/lucasnoelgb) |

## Documentação

| Documento | O que tem |
|---|---|
| [`docs/design-system.md`](docs/design-system.md) | estilo, cores, tipografia e regras de movimento |
| [`docs/vault/Lia.md`](docs/vault/Lia.md) | nota central do cofre do Obsidian (abra `docs/vault/` como cofre) |
| [`docs/vault/Arquitetura.md`](docs/vault/Arquitetura.md) | o mapa do código gerado pelo graphify |
| [`docs/vault/Estrutura de arquivos.md`](docs/vault/Estrutura%20de%20arquivos.md) | o que tem em cada arquivo de `css/` e `js/` |
| [`docs/vault/Vozes.md`](docs/vault/Vozes.md) | como a voz da Lia é escolhida e falada |
| [`docs/vault/Próximos passos.md`](docs/vault/Próximos%20passos.md) | pendências |
| [`CLAUDE.md`](CLAUDE.md) | regras para quem contribui, inclusive com o Claude Code |

---

Inspirações de interface: componentes do [21st.dev](https://21st.dev) e o guia
`prompting_for_frontend_aesthetics` do [claude-cookbooks](https://github.com/anthropics/claude-cookbooks).

