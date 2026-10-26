/* Voz da Lia: Web Speech API (síntese e reconhecimento), sempre pt-BR.
   Meta: soar o mais humana e feminina possível com o que o aparelho oferece.
   Como: (1) escolhe a melhor voz por pontuação (natural > Google > padrão > básica),
   (2) fala frase por frase, (3) pitch/velocidade moderados e (4) deixa a pessoa trocar a voz. */
const HAS_TTS='speechSynthesis' in window;
const VOICE_KEY='lia-voz';
const IS_LINUX=/linux/i.test(navigator.userAgent)&&!/android/i.test(navigator.userAgent);

/* Nomes conhecidos (Edge/Azure, Google, Apple, Windows, Android) */
const FEM=/francisca|luciana|fernanda|vit[oó]ria|camila|thalita|giovanna|let[ií]cia|brenda|elza|leila|manuela|yara|maria|helo[ií]sa|raquel|google portugu[eê]s do brasil|female|feminin/i;
const MASC=/felipe|daniel|ant[oô]nio|ricardo|jorge|donato|val[eé]rio|f[aá]bio|humberto|j[uú]lio|nicolau|eddy|reed|rocko|luciano|\bmale\b|masculin/i;
const NATURAL=/natural|neural|online|premium|enhanced|aprimorad|google/i; /* vozes de rede/neurais: bem mais humanas */
const ROBO=/espeak|mbrola|festival|flite|pico|speech-dispatcher|klatt|robot/i;

let voice=null,femVoice=false;

function voiceTier(v){if(!v)return'none';const n=v.name;
 if(ROBO.test(n))return'basica';
 if(NATURAL.test(n))return'natural';
 return IS_LINUX&&v.localService!==false?'basica':'padrao'}
function voiceScore(v){const n=v.name;let s=0;
 if(/^pt[-_]BR$/i.test(v.lang))s+=20;
 if(MASC.test(n))s-=500;else if(FEM.test(n))s+=60;
 if(/natural|neural|online/i.test(n))s+=120;else if(/google/i.test(n))s+=80;else if(/premium|enhanced|aprimorad/i.test(n))s+=70;
 if(ROBO.test(n))s-=200;
 return s}
function ptVoices(){if(!HAS_TTS)return[];const all=speechSynthesis.getVoices(),br=all.filter(x=>/^pt[-_]BR$/i.test(x.lang));
 return br.length?br:all.filter(x=>/^pt/i.test(x.lang))}
function pick(){if(!HAS_TTS)return;const pt=ptVoices();let saved=null;try{saved=localStorage.getItem(VOICE_KEY)}catch(e){}
 const ok=pt.filter(x=>!MASC.test(x.name)),pool=ok.length?ok:pt;
 const best=[...pool].sort((a,b)=>voiceScore(b)-voiceScore(a))[0]||null;
 voice=(saved&&pt.find(x=>x.name===saved))||best;
 femVoice=!!voice&&!MASC.test(voice.name)&&FEM.test(voice.name)}
if(HAS_TTS){pick();speechSynthesis.onvoiceschanged=()=>{pick();if(document.getElementById('vsel'))fillVoicePanel()}}

const wait=ms=>new Promise(r=>setTimeout(r,ms));

/* Frase por frase: cada frase ganha entonação própria e uma pausa natural entre elas */
function chunks(t){const s=String(t).replace(/\s+/g,' ').trim();if(!s)return[];
 return(s.match(/[^.!?…]+[.!?…]*/g)||[s]).map(p=>p.trim()).filter(Boolean).map(p=>/[.!?…,;:]$/.test(p)?p:p+'.')}
/* Falas curtas (sílabas, palavras) ficam lentas de propósito; frases ficam mais próximas do ritmo humano */
function tune(rate,tier){return tier=='natural'&&rate>=.85?Math.min(1,rate+.08):rate}
function utter(t,rate){const u=new SpeechSynthesisUtterance(t);if(!voice)pick();
 u.lang=(voice&&voice.lang)||'pt-BR';if(voice){try{u.voice=voice}catch(e){}}
 const tier=voiceTier(voice);u.rate=tune(rate,tier);u.pitch=tier=='natural'?1:femVoice?1.04:1.12;u.volume=1;return u}

const pending=new Set();
function say(text,rate=.88,onstart){return new Promise(res=>{const parts=chunks(text);
 if(!HAS_TTS||!parts.length){onstart&&onstart();return wait(600).then(res)}
 let left=parts.length,done=false;const fin=()=>{if(done)return;done=true;pending.delete(fin);res()};pending.add(fin);
 parts.forEach((p,i)=>{const u=utter(p,rate);if(i==0)u.onstart=()=>onstart&&onstart();
  const one=()=>{if(--left<=0)fin()};u.onend=one;u.onerror=one;
  try{speechSynthesis.speak(u)}catch(e){one()}})})}
function stopVoice(){cancel++;try{speechSynthesis.cancel()}catch(e){}[...pending].forEach(f=>f());document.querySelectorAll('.aura').forEach(a=>a.classList.remove('on'))}
async function liaSays(text,rate){const a=$('.aura');a&&a.classList.add('on');await say(text,rate);a&&a.classList.remove('on')}

function listen(cb){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){cb(null);return}
 const r=new R();r.lang='pt-BR';r.onresult=e=>cb(e.results[0][0].transcript);r.onerror=()=>cb(null);r.onnomatch=()=>cb(null);try{r.start()}catch(e){cb(null)}}

/* ===== Painel "Voz da Lia" (Conquistas > Meu perfil): trocar e ouvir outra voz ===== */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const voiceLabel=v=>v.name.replace(/^Microsoft\s+/i,'').replace(/\s*-\s*Portuguese.*$/i,'')+(voiceTier(v)=='natural'?' · natural':'');
function voicePanel(){return `<div class="vz"><label class="lab" for="vsel">Voz da Lia</label><select class="field vsel" id="vsel"></select><button class="ghost" id="vtest">${ic('vol')}Ouvir esta voz</button><p class="soft vhint" id="vhint" aria-live="polite"></p></div>`}
function fillVoicePanel(){const sel=$('#vsel');if(!sel)return;pick();
 const all=ptVoices(),ok=all.filter(x=>!MASC.test(x.name)),L=(ok.length?ok:all).sort((a,b)=>voiceScore(b)-voiceScore(a));
 sel.disabled=$('#vtest').disabled=!L.length;
 sel.innerHTML=L.length?L.map(v=>`<option value="${esc(v.name)}"${voice&&v.name===voice.name?' selected':''}>${esc(voiceLabel(v))}</option>`).join(''):'<option>Nenhuma voz em português neste aparelho</option>';
 const t=voiceTier(voice);
 $('#vhint').textContent=t=='none'?'Este aparelho não tem voz em português. Abra a Lia no Google Chrome ou no Microsoft Edge.':t=='basica'?'Esta voz é básica e soa robótica. Para uma voz bem mais natural, abra a Lia no Google Chrome ou no Microsoft Edge e escolha uma voz "natural" nesta lista.':''}
function bindVoicePanel(){fillVoicePanel();const sel=$('#vsel');if(!sel)return;
 const demo=()=>{stopVoice();liaSays('Oi! Eu sou a Lia. Vamos aprender juntas?')};
 sel.onchange=()=>{try{localStorage.setItem(VOICE_KEY,sel.value)}catch(e){}pick();fillVoicePanel();demo()};
 $('#vtest').onclick=demo}
