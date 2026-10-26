/* Traçado (nome e palavras), trilha adaptativa, bump() e nameWin() */
/* ===== Traçado: letra-modelo em cima, folha embaixo. Mouse, toque e caneta (Pointer Events) ===== */
const LN={A:'a',B:'bê',C:'cê',D:'dê',E:'é',F:'éfe',G:'gê',H:'agá',I:'i',J:'jóta',K:'cá',L:'éle',M:'ême',N:'ene',O:'ó',P:'pê',Q:'quê',R:'érre',S:'ésse',T:'tê',U:'u',V:'vê',W:'dáblio',X:'xis',Y:'ípsilon',Z:'zê'};
const letterName=c=>(LN[c.normalize('NFD').replace(/[\u0300-\u036f]/g,'')]||c.toLowerCase())+(c=='Ç'?' cedilha':'');
const nameLetters=()=>[...((S.nick||'').trim().split(/\s+/)[0]||'').toUpperCase()].filter(c=>/\p{L}/u.test(c)).slice(0,12);
/* sequência diária + vitórias (usado por win e nameWin; apontado pelo graphify como lógica duplicada) */
/* Trilha adaptativa: foco e objetivo do cadastro decidem por onde começar. Escrever o nome e escrever palavras ficam sempre disponíveis. */
const canName=()=>!S.nameDone&&nameLetters().length>0;
const nameFirst=()=>canName()&&(S.focus=='writing'||S.goal=='assinar');
const wlevel=()=>S.focus=='writing'?S.mastered.length:(S.wrote||0);
function bump(){S.wins++;const t=new Date().toDateString();if(!(S.hist||[]).includes(t))S.hist=[...(S.hist||[]),t]}
let tr=null;
function nameLesson(){const L=nameLetters();tr={mode:'name',L,i:0,strokes:[],guide:true,model:true,warned:false,say:`${name()}, ${S.mastered.length?'vamos escrever o seu nome':'vamos começar pelo seu nome'}. Ele tem ${L.length} ${L.length==1?'letra':'letras'}. Vamos escrever uma de cada vez. A primeira letra é ${letterName(L[0])}. Passe o dedo por cima.`};drawTrace()}
/* Progressão: 1-2 palavras por sílaba (com guia) · depois palavra inteira · a partir da 5ª, sem guia (de memória) */
function wordTrace(){const syl=wlevel()<2&&cur[1].length>1,U=syl?cur[1].map(t=>t.toUpperCase()):[cur[0]];
 tr={mode:'word',L:U,i:0,strokes:[],guide:wlevel()<4,model:true,warned:false,say:`Agora vamos escrever a palavra ${cur[0].toLowerCase()}. ${syl?'Uma sílaba de cada vez. Primeiro: '+U[0].toLowerCase()+'.':'Escreva a palavra inteira, do seu jeito.'}`};drawTrace()}
function drawTrace(){const L=tr.L[tr.i],n=tr.L.length;
 scr.innerHTML=`${head(tr.mode=='name'?'Escreva o seu nome':'Escreva a palavra')}<div class="tdots" role="img" aria-label="Parte ${tr.i+1} de ${n}">${tr.L.map((l,k)=>`<i class="${k<tr.i?'ok':k==tr.i?'on':''}"></i>`).join('')}</div>
 <button class="tm" id="tm" aria-label="Ouvir ${L}"><span aria-hidden="true" style="font-size:calc(clamp(72px,10.5vh,100px) * ${Math.min(1,5/L.length).toFixed(2)})">${L}</span></button>
 <div class="tp" id="tp"><canvas id="cv" role="img" aria-label="Espaço para escrever ${L}. Use o dedo, o mouse ou a caneta."></canvas></div>
 <p class="msg" id="m" aria-live="polite">Passe o dedo por cima do desenho.</p>
 <div class="tc"><button class="ghost tb" id="un">Desfazer</button><button class="ghost tb" id="cl">Apagar tudo</button><button class="ghost tb" id="gd"></button><button class="ghost tb" id="md"></button></div>
 <button class="cta" id="ok">${tr.i==n-1?(tr.mode=='name'?'Terminei meu nome!':'Terminei a palavra!'):'Pronto, próxima '+(tr.mode=='name'?'letra':'sílaba')}${ic('go')}</button>`;
 $('#bk').onclick=()=>go(home,0);
 const cv=$('#cv'),x=cv.getContext('2d'),pad=$('#tp'),FAM='"Bricolage Grotesque","Atkinson Hyperlegible",system-ui,sans-serif';let zz=0;const size=(c,w,h)=>{c.font='800 100px '+FAM;return Math.min(h*.78,100*w*.86/(c.measureText(L).width||100))};
 const lw=()=>Math.max(8,zz*.09);
 const gl=(c,w,h)=>{c.font='800 '+Math.round(size(c,w,h))+'px '+FAM;c.textAlign='center';c.textBaseline='middle';c.fillText(L,w/2,h*.54)};
 const paint=(c,w,h,k)=>{c.lineCap=c.lineJoin='round';c.lineWidth=lw()*k;tr.strokes.forEach(q=>{if(q.length==1){c.beginPath();c.arc(q[0][0]*w,q[0][1]*h,c.lineWidth/2,0,7);c.fill();return}c.beginPath();c.moveTo(q[0][0]*w,q[0][1]*h);for(let i=1;i<q.length-1;i++)c.quadraticCurveTo(q[i][0]*w,q[i][1]*h,(q[i][0]+q[i+1][0])/2*w,(q[i][1]+q[i+1][1])/2*h);const e=q[q.length-1];c.lineTo(e[0]*w,e[1]*h);c.stroke()})};
 const render=()=>{const w=cv.width,h=cv.height;x.clearRect(0,0,w,h);x.fillStyle=x.strokeStyle=getComputedStyle(cv).color;
  if(tr.guide){x.globalAlpha=.16;gl(x,w,h);x.globalAlpha=.6;x.setLineDash([8,10]);x.lineWidth=3;x.strokeText(L,w/2,h*.54);x.setLineDash([]);x.globalAlpha=1}
  paint(x,w,h,1)};
 const labels=()=>{$('#gd').textContent='Guia: '+(tr.guide?'ligada':'desligada');$('#gd').classList.toggle('on',tr.guide);$('#gd').setAttribute('aria-pressed',tr.guide);
  $('#md').textContent=tr.model?'Esconder modelo':'Mostrar modelo';$('#md').classList.toggle('on',!tr.model);$('#md').setAttribute('aria-pressed',!tr.model);$('#tm').classList.toggle('hid',!tr.model);
  $('#un').disabled=$('#cl').disabled=!tr.strokes.length};
 const fit=()=>{const d=Math.min(2,devicePixelRatio||1);cv.width=Math.max(1,Math.round(pad.clientWidth*d));cv.height=Math.max(1,Math.round(pad.clientHeight*d));zz=size(x,cv.width,cv.height);render()};
 new ResizeObserver(fit).observe(pad);document.fonts&&document.fonts.ready.then(fit);
 let live=null;const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]};
 cv.onpointerdown=e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);live=[pt(e)];tr.strokes.push(live);render();labels()};
 cv.onpointermove=e=>{if(!live)return;const a=e.getCoalescedEvents&&e.getCoalescedEvents();(a&&a.length?a:[e]).forEach(v=>live.push(pt(v)));render()};
 cv.onpointerup=cv.onpointercancel=()=>{live=null};cv.oncontextmenu=e=>e.preventDefault();
 $('#un').onclick=()=>{tr.strokes.pop();render();labels()};
 $('#cl').onclick=()=>{tr.strokes=[];render();labels()};
 $('#gd').onclick=()=>{tr.guide=!tr.guide;render();labels()};
 $('#md').onclick=()=>{tr.model=!tr.model;labels()};
 $('#tm').onclick=()=>say(L.length==1?letterName(L):L.toLowerCase(),.7);
 $('#ok').onclick=()=>{const w=cv.width,h=cv.height;let cov=0,out=1;
  if(tr.strokes.length){const g=document.createElement('canvas'),k=document.createElement('canvas');g.width=k.width=w;g.height=k.height=h;const gc=g.getContext('2d'),kc=k.getContext('2d');gc.fillStyle=kc.fillStyle=kc.strokeStyle='#000';gl(gc,w,h);paint(kc,w,h,1.8);
   const a=gc.getImageData(0,0,w,h).data,b=kc.getImageData(0,0,w,h).data;let G=0,H=0,B=0,O=0;
   for(let i=3;i<a.length;i+=16){const ig=a[i]>100,is=b[i]>100;if(ig){G++;if(is)H++}if(is){B++;if(!ig)O++}}cov=G?H/G:0;out=B?O/B:1}
  const good=cov>=.5&&out<=.6;
  if(!good&&!tr.warned){tr.warned=true;const t=!tr.strokes.length?'Passe o dedo por cima do desenho. Pode começar!':cov<.5?'Quase! Tente passar por cima de tudo.':'Boa! Tente ficar mais perto do desenho.';$('#m').textContent=t;liaSays(t);navigator.vibrate&&navigator.vibrate([10,40,10]);return}
  navigator.vibrate&&navigator.vibrate(20);
  if(tr.i==n-1){if(tr.mode=='word'&&S.focus!='writing')S.wrote=(S.wrote||0)+1;return tr.mode=='name'?nameWin():win()}
  tr.i++;tr.strokes=[];tr.warned=false;tr.say=`${good?['Muito bem!','Isso mesmo!','Ficou lindo!'][tr.i%3]:'Tudo bem, vamos para a próxima.'} Agora ${tr.mode=='name'?'a letra '+letterName(tr.L[tr.i]):'a sílaba '+tr.L[tr.i].toLowerCase()}.`;go(drawTrace,2)};
 labels();setTimeout(()=>liaSays(tr.say),350);
}
async function nameWin(){stopVoice();confetti();navigator.vibrate&&navigator.vibrate([30,60,30]);S.nameDone=true;bump();save();
 scr.innerHTML=`<div class="word" style="margin-top:32px"><span>${tr.L.join('')}</span></div><h1 style="text-align:center">Você escreveu o seu nome!</h1><p class="msg">Esta é a sua primeira palavra, ${name()}.</p>
 <button class="cta" id="nx">Próxima palavra${ic('go')}</button><button class="ghost" id="hm">Ver minha jornada</button>`;
 $('#nx').onclick=()=>go(lesson,2);$('#hm').onclick=()=>go(journey,1);
 await liaSays(`${name()}, você escreveu o seu nome! Esta é a sua primeira palavra. Estou muito orgulhosa de você.`)}
