/* Teste de falar-resposta.js em Node, sem navegador: usa o voice.js real e um speechSynthesis simulado.
   Cobre limpeza de Markdown/emojis, escolha de voz feminina pt-BR, erros e interrupção.
   Rodar: node tests/falar-resposta.test.js (faz parte de `make test`). */
const vm=require('vm'),fs=require('fs'),assert=require('assert');
const R=require('path').join(__dirname,'..','js')+'/';
function ambiente(vozes, {semTTS=false, erroNaFala=null}={}){
  const falado=[];
  const synth={paused:false,_l:{},getVoices:()=>vozes,
    addEventListener(e,f){this._l[e]=f},removeEventListener(){},
    cancel(){ if(this._cur){const u=this._cur;this._cur=null;setTimeout(()=>u.onerror&&u.onerror({error:'canceled'}),1)} },
    speak(u){ if(erroNaFala){setTimeout(()=>u.onerror({error:erroNaFala}),1);return}
      this._cur=u; falado.push({t:u.text,voz:u.voice&&u.voice.name,lang:u.lang,pitch:u.pitch,rate:u.rate});
      setTimeout(()=>{u.onstart&&u.onstart(); setTimeout(()=>{ if(this._cur===u){this._cur=null;u.onend&&u.onend()}},60)},1)}};
  class Utt{constructor(t){this.text=t}}
  const win={}; if(!semTTS)win.speechSynthesis=synth;
  const ctx={window:win,navigator:{userAgent:'Mozilla Chrome Windows'},
    localStorage:{getItem:()=>null,setItem(){}},document:{querySelectorAll:()=>[],getElementById:()=>null},
    setTimeout,clearTimeout,console:{...console,warn:()=>{}}};
  if(!semTTS){ctx.speechSynthesis=synth;ctx.SpeechSynthesisUtterance=Utt}
  win.window=win; Object.assign(win,ctx); ctx.window=ctx; // window.* == globais
  vm.createContext(ctx);
  vm.runInContext('let cancel=0;',ctx);
  vm.runInContext(fs.readFileSync(R+'voice.js','utf8'),ctx);
  vm.runInContext(fs.readFileSync(R+'falar-resposta.js','utf8'),ctx);
  return {ctx,falado};
}
const V=(name,lang='pt-BR')=>({name,lang,localService:true});

(async()=>{
  /* ---------- limpeza ---------- */
  const {ctx}=ambiente([V('x')]);
  const L=ctx.limparMarkdown;
  const casos=[
   ['**Parabéns!** Você escreveu o *seu* nome 🎉','Parabéns! Você escreveu o seu nome.'],
   ['# Título\n\nTexto normal.','Título. Texto normal.'],
   ['Veja [este link](https://exemplo.com/a_(b)) agora.','Veja este link agora.'],
   ['Acesse https://exemplo.com/x e www.site.com.br para mais.','Acesse e para mais.'],
   ['![logo](a.png) Olá','logo Olá.'],
   ['- um\n- dois\n- três','um. dois. três.'],
   ['1. Abra\n2. Feche','Abra. Feche.'],
   ['Use `console.log` aqui','Use console.log aqui.'],
   ['Antes\n```js\nconst a = 1;\n```\nDepois','Antes. Depois.'],
   ['Bloco aberto\n```py\nprint(1)','Bloco aberto.'],
   ['> Citação importante','Citação importante.'],
   ['---\nTexto\n***','Texto.'],
   ['| a | b |\n|---|---|\n| 1 | 2 |','a, b. 1, 2.'],
   ['snake_case e _itálico_ e __negrito__','snake case e itálico e negrito.'],
   ['Muito bem! 😀👍🏽🇧🇷 Continue.','Muito bem! Continue.'],
   ['Olá 😊.','Olá.'],
   ['~~riscado~~ ok','riscado ok.'],
   ['Pi vale 3.5 aproximadamente.','Pi vale 3.5 aproximadamente.'],
   ['<b>negrito html</b> &amp; mais','negrito html e mais.'],
   ['- [x] feito\n- [ ] falta','feito. falta.'],
   ['#hashtag e C# ficam','hashtag e C# ficam.'],
   ['','' ],[null,''],[undefined,''],['   \n\n  ',''],['🎉🎉',''],
  ];
  let ok=0;
  for(const [i,o] of casos){const r=L(i); try{assert.strictEqual(r,o);ok++}catch(e){console.log('FALHOU:',JSON.stringify(i),'=>',JSON.stringify(r),'esperado',JSON.stringify(o))}}
  console.log(`limpeza: ${ok}/${casos.length}`);

  /* ---------- frases (via fala) ---------- */
  /* ---------- seleção de voz ---------- */
  let {ctx:c1,falado:f1}=ambiente([V('Microsoft Daniel - Portuguese (Brazil)'),V('eSpeak pt-br'),V('Microsoft Francisca Online (Natural) - Portuguese (Brazil)'),V('Google português do Brasil'),V('Microsoft Helia - Portuguese (Portugal)','pt-PT')]);
  let r=await c1.falar_resposta('**Olá!** Tudo bem? 😊 Vamos aprender.');
  console.log('1)',JSON.stringify(r),JSON.stringify(f1.map(x=>[x.t,x.voz,x.pitch,x.lang])));
  assert(r.ok&&r.feminina&&/Francisca/.test(r.voz)); assert(f1.length===3);

  let {ctx:c2,falado:f2}=ambiente([V('Microsoft Daniel - Portuguese (Brazil)'),V('pt-br-x-abc-local')]);
  r=await c2.falar_resposta('Oi.',{exigirFeminina:true}); console.log('2 estrita)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='sem-voz-feminina'&&f2.length===0);
  r=await c2.falar_resposta('Oi.'); console.log('2 padrão)',JSON.stringify(r)); assert(r.ok&&!r.feminina&&f2[0].voz==='pt-br-x-abc-local');

  let {ctx:c3}=ambiente([V('Microsoft Daniel - Portuguese (Brazil)')]);
  r=await c3.falar_resposta('Oi.'); console.log('3 só masculina)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='sem-voz-feminina');

  let {ctx:c4}=ambiente([V('Samantha','en-US')]);
  r=await c4.falar_resposta('Oi.'); console.log('4 sem pt)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='sem-voz');

  let {ctx:c5}=ambiente([],{semTTS:true});
  r=await c5.falar_resposta('Oi.'); console.log('5 sem suporte)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='sem-suporte');

  let {ctx:c6}=ambiente([V('Microsoft Francisca Online (Natural)')]);
  r=await c6.falar_resposta('😀 **'); console.log('6 vazio)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='texto-vazio');

  let {ctx:c7}=ambiente([V('Microsoft Francisca Online (Natural)')],{erroNaFala:'not-allowed'});
  r=await c7.falar_resposta('Oi.'); console.log('7 bloqueado)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='bloqueado');
  let {ctx:c8}=ambiente([V('Microsoft Francisca Online (Natural)')],{erroNaFala:'synthesis-failed'});
  r=await c8.falar_resposta('Oi.'); console.log('8 falha)',JSON.stringify(r)); assert(!r.ok&&r.motivo==='erro-audio');

  /* nova resposta substitui a anterior; pararResposta interrompe */
  let {ctx:c9,falado:f9}=ambiente([V('Microsoft Francisca Online (Natural)')]);
  const a=c9.falar_resposta('Primeira frase longa. Segunda frase. Terceira frase.');
  await new Promise(r=>setTimeout(r,200));
  const b=c9.falar_resposta('Resposta nova.');
  const [ra,rb]=await Promise.all([a,b]); console.log('9)',JSON.stringify(ra),JSON.stringify(rb),f9.map(x=>x.t));
  assert(ra.interrompida&&rb.ok&&f9[f9.length-1].t==='Resposta nova.');
  const p=c9.falar_resposta('Uma. Duas. Três. Quatro.'); await new Promise(r=>setTimeout(r,200)); c9.pararResposta(); const rp=await p; console.log('10 parar)',JSON.stringify(rp)); assert(rp.interrompida);

  /* frase longa é quebrada */
  let {ctx:c11,falado:f11}=ambiente([V('Microsoft Francisca Online (Natural)')]);
  await c11.falar_resposta(('palavra '.repeat(15)+', ').repeat(6)+'fim.'); console.log('11) trechos:',f11.length,'maior:',Math.max(...f11.map(x=>x.t.length))); assert(Math.max(...f11.map(x=>x.t.length))<=201);
  console.log('falar-resposta: tudo ok');
})().catch(e=>{console.error('ERRO NO TESTE',e);process.exit(1)});
