/* ============================================================================
   falar-resposta.js
   Lê em voz alta a resposta de uma IA, em português do Brasil e com voz feminina.

   O que faz
     1. limparMarkdown(texto)   tira **, *, #, links, código, tabelas e emojis
     2. falar_resposta(texto)   limpa, escolhe a voz feminina pt-BR e fala frase por frase
     3. pararResposta()         interrompe a fala

   Como entra no projeto (scripts clássicos, sem módulos ES, como o resto do app)
     - Carregue DEPOIS de js/voice.js, que fornece a lista e a pontuação de vozes:
         <script src="js/voice.js"></script>
         <script src="js/falar-resposta.js"></script>
     - Tudo roda no aparelho: nenhum texto sai do navegador e não há chave de API.

   Uso
     const r = await falar_resposta('**Parabéns!** 🎉 Você escreveu o seu nome.');
     if (!r.ok) console.warn(r.motivo, r.mensagem);
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. LIMPEZA DO TEXTO
     ------------------------------------------------------------------------ */

  /* Emojis, bandeiras, tons de pele e os caracteres invisíveis que os compõem */
  const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}\u{E0020}-\u{E007F}\u{FE0E}\u{FE0F}\u{200D}\u{20E3}]/gu;

  /* Termina em pontuação? (aceita fechar aspas/parênteses depois) */
  const TERMINA_COM_PONTO = /[.!?…:;,]["')\]]*$/;

  /* Remove a sintaxe Markdown e devolve só o que deve ser falado. */
  function limparMarkdown(entrada) {
    let t = String(entrada == null ? '' : entrada).replace(/\r\n?/g, '\n');

    /* Blocos que não fazem sentido ouvidos: código, comentários e tags HTML.
       (inclui bloco de código que a IA deixou sem fechar) */
    t = t
      .replace(/```[\s\S]*?(?:```|$)/g, '\n')
      .replace(/~~~[\s\S]*?(?:~~~|$)/g, '\n')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<\/?[a-z][^>]*>/gi, ' '); /* também remove <https://autolink> */

    /* Links e imagens: fica só o texto visível; URLs soltas somem.
       O trecho (?:[^()]|\([^()]*\))* aceita um nível de parênteses dentro da URL. */
    const PAREN = '\\((?:[^()]|\\([^()]*\\))*\\)';
    t = t
      .replace(new RegExp('!\\[([^\\]]*)\\]' + PAREN, 'g'), '$1') /* ![alt](url)   -> alt   */
      .replace(new RegExp('\\[([^\\]]+)\\]' + PAREN, 'g'), '$1')  /* [texto](url)  -> texto */
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')                   /* [texto][ref]  -> texto */
      .replace(/^\s*\[[^\]]+\]:\s*\S+.*$/gm, '')                  /* [ref]: url             */
      .replace(/\b(?:https?:\/\/|ftp:\/\/|www\.)\S+/gi, ' ');     /* url solta              */

    /* Linha por linha: títulos, citações, listas e tabelas.
       Itens de lista, títulos e linhas de tabela ganham ponto final, para a voz
       fazer uma pausa entre eles em vez de emendar tudo numa frase só. */
    const linhas = t.split('\n').map((l) => ({ txt: l, pausa: false }));
    const saida = [];
    for (const item of linhas) {
      let l = item.txt;
      let pausa = false;

      if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(l)) continue;             /* --- *** ___ */
      if (/^\s*=+\s*$/.test(l)) continue;                                   /* ===== (título setext) */
      if (/^\s*\|?(?:\s*:?-+:?\s*\|)+(?:\s*:?-+:?\s*)?$/.test(l)) continue; /* |---|---| */

      l = l.replace(/^(?:\s*>\s?)+/, '');                                   /* > citação */

      if (/^\s{0,3}#{1,6}(?:\s+|$)/.test(l)) {                              /* # Título */
        l = l.replace(/^\s{0,3}#{1,6}\s*/, '').replace(/\s+#+\s*$/, '');
        pausa = true;
      } else if (/^\s*(?:[-*+•]|\d{1,3}[.)])\s+/.test(l)) {                 /* - item  1. item */
        l = l.replace(/^\s*(?:[-*+•]|\d{1,3}[.)])\s+/, '').replace(/^\[[ xX]\]\s*/, '');
        pausa = true;
      } else if (/^\s*\|.*\|\s*$/.test(l)) {                                /* | a | b | */
        l = l.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
             .split('|').map((c) => c.trim()).filter(Boolean).join(', ');
        pausa = true;
      }
      saida.push({ txt: l, pausa });
    }

    /* Limpeza dentro da linha: ênfase, crases, entidades HTML, hashtags e emojis */
    const limpaLinha = (s) => s
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, ' e ')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/[*`~\\]+/g, '')                                    /* **negrito** *itálico* `código` ~~tachado~~ */
      .replace(/(^|[^\p{L}\p{N}])_+|_+(?![\p{L}\p{N}])/gu, '$1')   /* _itálico_ __negrito__ (preserva snake_case) */
      .replace(/_/g, ' ')                                          /* sublinhado que sobrou dentro de palavra */
      .replace(/\|/g, ' ')
      .replace(/(^|\s)#+(?=\S)/g, '$1')                            /* #hashtag */
      .replace(EMOJI, '')
      .replace(/[ \t]+/g, ' ')
      .replace(/\s+([.,!?;:…])/g, '$1')                            /* "Olá ." (sobrou de um emoji) -> "Olá." */
      .trim();

    /* Junta tudo. Fim de parágrafo também ganha ponto final se faltar. */
    const partes = [];
    for (let i = 0; i < saida.length; i++) {
      let f = limpaLinha(saida[i].txt);
      if (!f) continue;
      const proxima = saida[i + 1];
      const fimDeParagrafo = !proxima || !proxima.txt.trim();
      if ((saida[i].pausa || fimDeParagrafo) && !TERMINA_COM_PONTO.test(f)) f += '.';
      partes.push(f);
    }
    return partes.join(' ').replace(/\s{2,}/g, ' ').trim();
  }

  /* ------------------------------------------------------------------------
     2. FRASES
     Falar frase por frase dá entonação própria a cada uma e evita o corte de
     fala longa que o Chrome faz depois de uns 15 segundos.
     (Sem lookbehind no regex: o Safari antigo do iPhone não entende.)
     ------------------------------------------------------------------------ */
  function dividirEmFrases(texto, max) {
    max = max || 200;
    const frases = [];
    const re = /[.!?…]+(?:\s+|$)/g; /* "3.5" não divide: depois do ponto não há espaço */
    let ini = 0, m;
    while ((m = re.exec(texto))) {
      frases.push(texto.slice(ini, m.index + m[0].length).trim());
      ini = m.index + m[0].length;
    }
    if (ini < texto.length) frases.push(texto.slice(ini).trim());

    /* Frase muito longa: quebra na última vírgula/espaço antes do limite */
    const saida = [];
    for (let f of frases.filter(Boolean)) {
      while (f.length > max) {
        let corte = Math.max(f.lastIndexOf(', ', max), f.lastIndexOf('; ', max));
        if (corte < max * 0.4) corte = f.lastIndexOf(' ', max);
        if (corte < 1) corte = max;
        saida.push(f.slice(0, corte + 1).trim());
        f = f.slice(corte + 1).trim();
      }
      if (f) saida.push(f);
    }
    return saida;
  }

  /* ------------------------------------------------------------------------
     3. ESCOLHA DA VOZ FEMININA pt-BR
     Reaproveita de js/voice.js: ptVoices(), voiceScore(), FEM, MASC, pick(), voice.
     "Feminina" aqui significa nome conhecido como feminino (Francisca, Thalita,
     Luciana, Google português do Brasil...) e que não esteja na lista de masculinas.
     ------------------------------------------------------------------------ */
  function escolherVoz(exigirFeminina) {
    try { pick(); } catch (e) { /* relê a voz que a pessoa salvou em "Voz da Lia" */ }

    const todas = ptVoices(); /* pt-BR; só cai para pt-* se o aparelho não tiver nenhuma pt-BR */
    if (!todas.length) return { voz: null, motivo: 'sem-voz' };

    const ordenar = (lista) => lista.slice().sort((a, b) => voiceScore(b) - voiceScore(a));
    const ehFeminina = (v) => FEM.test(v.name) && !MASC.test(v.name);

    /* 1) a voz que a Lia já usa (inclui a escolha da pessoa), se for feminina */
    if (typeof voice !== 'undefined' && voice && ehFeminina(voice)) return { voz: voice, feminina: true };

    /* 2) a melhor voz explicitamente feminina (neural/online > Google > padrão) */
    const femininas = ordenar(todas.filter(ehFeminina));
    if (femininas.length) return { voz: femininas[0], feminina: true };

    if (exigirFeminina) return { voz: null, motivo: 'sem-voz-feminina' };

    /* 3) sem nome feminino reconhecível (comum no Android: "pt-br-x-abc-local"):
          usa a melhor voz que não seja conhecidamente masculina */
    const neutras = ordenar(todas.filter((v) => !MASC.test(v.name)));
    if (neutras.length) return { voz: neutras[0], feminina: false };

    return { voz: null, motivo: 'sem-voz-feminina' };
  }

  /* As vozes do navegador carregam de forma assíncrona: espera o evento (com limite) */
  function aguardarVozes(limiteMs) {
    return new Promise((resolve) => {
      if (speechSynthesis.getVoices().length) return resolve();
      let feito = false;
      const fim = () => {
        if (feito) return;
        feito = true;
        speechSynthesis.removeEventListener('voiceschanged', fim);
        resolve();
      };
      speechSynthesis.addEventListener('voiceschanged', fim);
      setTimeout(fim, limiteMs || 1500);
    });
  }

  /* ------------------------------------------------------------------------
     4. FALA
     ------------------------------------------------------------------------ */
  const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
  let sessao = 0; /* cada chamada de falar_resposta ganha um número; a mais nova vence */

  /* Fala UM trecho e resolve quando termina. Rejeita se o áudio falhar. */
  function falarTrecho(texto, voz, rate, aoIniciar) {
    return new Promise((resolve, reject) => {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = (voz && voz.lang) || 'pt-BR';
      try { if (voz) u.voice = voz; } catch (e) { /* mantém só o lang */ }
      u.rate = rate;
      u.pitch = 1; /* tom natural: não sobe o pitch para "disfarçar" a voz (regra do CLAUDE.md) */
      u.volume = 1;

      let fim = false, vigia;
      const terminar = (resultado) => { if (fim) return; fim = true; clearTimeout(vigia); resolve(resultado); };
      const falhar = (erro) => { if (fim) return; fim = true; clearTimeout(vigia); reject(erro); };

      u.onstart = () => aoIniciar && aoIniciar();
      u.onend = () => terminar('fim');
      u.onerror = (ev) => {
        const codigo = (ev && ev.error) || 'desconhecido';
        if (codigo === 'canceled' || codigo === 'interrupted') return terminar('interrompida'); /* parada normal */
        const e = new Error('Falha de áudio: ' + codigo);
        e.codigo = codigo;
        falhar(e);
      };

      /* Alguns navegadores nunca disparam onend; sem isto a Promise ficaria pendurada */
      vigia = setTimeout(() => {
        try { speechSynthesis.cancel(); } catch (e) { /* nada a fazer */ }
        terminar('tempo');
      }, 8000 + (texto.length * 150) / Math.max(rate, 0.3));

      try { speechSynthesis.speak(u); } catch (e) { falhar(e); }
    });
  }

  function falha(motivo, mensagem) {
    console.warn('[falar_resposta]', motivo + ':', mensagem);
    return { ok: false, motivo, mensagem };
  }

  /* Interrompe a fala atual (e qualquer falar_resposta em andamento) */
  function pararResposta() {
    sessao++;
    try {
      if (typeof stopVoice === 'function') stopVoice(); /* também zera aura e promessas pendentes */
      else if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    } catch (e) { /* nada a fazer */ }
  }

  /* ------------------------------------------------------------------------
     5. FUNÇÃO PÚBLICA
     Nunca lança exceção: devolve sempre um objeto.
       { ok:true,  voz, feminina, interrompida? }
       { ok:false, motivo, mensagem }
         motivos: dependencia | sem-suporte | texto-vazio | sem-voz |
                  sem-voz-feminina | bloqueado | erro-audio

     opcoes (todas opcionais)
       rate            velocidade, 0.5 a 1.5 (padrão 0.92: bom para quem está aprendendo)
       exigirFeminina  true = não fala se não houver voz com nome feminino conhecido.
                       Padrão false, porque muitas vozes de Android não revelam o gênero
                       no nome; nesse caso usa a melhor voz que não seja masculina.
       aoComecar       função chamada quando a primeira frase começa a soar
     ------------------------------------------------------------------------ */
  async function falar_resposta(texto, opcoes) {
    const cfg = opcoes || {};
    const rate = typeof cfg.rate === 'number' ? cfg.rate : 0.92;
    const minha = ++sessao;

    try {
      if (typeof HAS_TTS === 'undefined' || typeof ptVoices !== 'function') {
        return falha('dependencia', 'Carregue js/voice.js antes de js/falar-resposta.js.');
      }
      if (!HAS_TTS || typeof SpeechSynthesisUtterance === 'undefined') {
        return falha('sem-suporte', 'Este navegador não tem voz sintetizada. Abra no Google Chrome ou no Microsoft Edge.');
      }

      const limpo = limparMarkdown(texto);
      if (!limpo) return falha('texto-vazio', 'Não sobrou nada para falar depois da limpeza.');

      await aguardarVozes();
      const escolha = escolherVoz(!!cfg.exigirFeminina);
      if (!escolha.voz) {
        return escolha.motivo === 'sem-voz'
          ? falha('sem-voz', 'Este aparelho não tem voz em português. Abra no Google Chrome ou no Microsoft Edge.')
          : falha('sem-voz-feminina', 'Não há voz feminina em português neste aparelho.');
      }

      /* A resposta nova substitui a anterior */
      pararResposta();
      sessao = minha; /* pararResposta() somou 1; devolve o número desta chamada */
      await pausa(80); /* o Chrome descarta speak() logo depois de cancel() */
      if (minha !== sessao) return { ok: true, interrompida: true };
      if (speechSynthesis.paused) speechSynthesis.resume();

      let comecou = false;
      const aoIniciar = () => {
        if (comecou) return;
        comecou = true;
        if (typeof cfg.aoComecar === 'function') { try { cfg.aoComecar(); } catch (e) { /* callback do chamador */ } }
      };

      for (const frase of dividirEmFrases(limpo)) {
        if (minha !== sessao) return { ok: true, interrompida: true };
        const r = await falarTrecho(frase, escolha.voz, rate, aoIniciar);
        if (r === 'interrompida') return { ok: true, interrompida: true };
        if (r === 'tempo') break; /* o navegador travou: não insiste nas próximas frases */
      }
      return { ok: true, voz: escolha.voz.name, feminina: escolha.feminina };
    } catch (e) {
      if (e && e.codigo === 'not-allowed') {
        return falha('bloqueado', 'O navegador só libera o áudio depois de um toque ou clique na página.');
      }
      return falha('erro-audio', (e && e.message) || 'Não foi possível reproduzir o áudio.');
    }
  }

  window.limparMarkdown = limparMarkdown;
  window.falar_resposta = falar_resposta;
  window.pararResposta = pararResposta;
})();
