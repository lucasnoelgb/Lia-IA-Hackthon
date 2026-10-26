/* Lição e oficina (ler, escrever, falar) e tela de vitória win() */
/* Lição */
async function karaoke(w,sel){const my=++cancel;const els=[...document.querySelectorAll(sel)];
 for(let i=0;i<els.length;i++){if(my!==cancel)return;await say(w[1][i].toLowerCase(),.65,()=>els[i].classList.add('on'));await wait(120);els[i].classList.remove('on')}
 if(my===cancel)await say(w[0].toLowerCase(),.8)}
function lesson(){if(nameFirst())return nameLesson();cur=nextWord();const f=S.focus;
 scr.innerHTML=`<div class="top"><h1>Palavra de hoje</h1><span class="pill">Nível ${level()}</span></div>
 <div class="tile" aria-hidden="true">${cur[2]}</div><div class="word">${cur[1].map(s=>`<span class="k">${s}</span>`).join('')}</div>
 <p class="msg soft">Esta é a palavra <b>${cur[0]}</b>. Toque para ouvir.</p>
 <button class="ghost" id="hear">${ic('vol')}Ouvir com a Lia</button>
 <button class="cta" id="pr">${f=='writing'?'Montar e escrever a palavra':f=='reading'?'Treinar a leitura':'Falar a palavra'}${ic('go')}</button>
 ${f!='writing'?`<button class="ghost" id="wr">${ic('pen')}Quero escrever esta palavra</button>`:''}${canName()&&!nameFirst()?`<button class="ghost" id="nm">${ic('pen')}Escrever o meu nome</button>`:''}`;
 $('#hear').onclick=()=>karaoke(cur,'.k');$('#pr').onclick=()=>go(workshop,2);
 if($('#wr'))$('#wr').onclick=()=>go(wordTrace,2);if($('#nm'))$('#nm').onclick=()=>go(nameLesson,2);setTimeout(()=>karaoke(cur,'.k'),400);
}

/* Oficina */
function workshop(){const f=S.focus;
 if(f=='writing'){ex={placed:[],pool:[...cur[1]].map((t,i)=>({t,i})).sort(()=>Math.random()-.5)};return drawWrite()}
 return f=='reading'?drawRead():drawSpeak()}
const head=t=>`<div class="top"><button class="back" id="bk" aria-label="Voltar para a palavra">${ic('back')}</button><h2>${t}</h2><span style="width:52px"></span></div>`;
const lbk=()=>{$('#bk').onclick=()=>go(lesson,2)};
function drawWrite(){const w=cur[1];
 scr.innerHTML=`${head('Monte a palavra')}<div class="tile sm" aria-hidden="true">${cur[2]}</div>
 <div class="slots">${w.map((s,i)=>`<div class="slot ${ex.placed[i]?'f':''}">${ex.placed[i]||''}</div>`).join('')}</div>
 <p class="msg" id="m" aria-live="polite">Toque nas peças na ordem certa.</p>
 <div class="pool">${ex.pool.map(p=>`<button class="piece" data-i="${p.i}">${p.t}</button>`).join('')}</div>
 <button class="ghost" id="hear">${ic('vol')}Ouvir a palavra</button>`;
 lbk();$('#hear').onclick=()=>liaSays(cur[0].toLowerCase(),.75);
 scr.querySelectorAll('.piece').forEach(b=>b.onclick=()=>{const p=ex.pool.find(x=>x.i==b.dataset.i);
  if(p.t===w[ex.placed.length]){navigator.vibrate&&navigator.vibrate(20);ex.placed.push(p.t);ex.pool=ex.pool.filter(x=>x!==p);say(p.t.toLowerCase(),.7);ex.placed.length==w.length?wordTrace():drawWrite()}
  else{b.classList.add('shake');navigator.vibrate&&navigator.vibrate([10,40,10]);$('#m').textContent='Quase lá! Vamos juntas de novo?';liaSays('Quase lá! Vamos juntas de novo?');setTimeout(()=>b.classList.remove('shake'),450)}});
}
function drawRead(){
 scr.innerHTML=`${head('Vamos ler')}<div class="tile sm" aria-hidden="true">${cur[2]}</div>
 <div class="row" style="justify-content:center;flex-wrap:wrap">${cur[1].map((s,i)=>`<button class="syl" data-i="${i}">${s}</button>`).join('')}</div>
 <p class="msg soft">Toque em cada pedacinho para ouvir.</p>
 <button class="ghost" id="hear">${ic('vol')}Ler junto com a Lia</button><button class="cta" id="done">Eu li a palavra!</button>`;
 lbk();$('#hear').onclick=()=>karaoke(cur,'.syl');$('#done').onclick=win;
 scr.querySelectorAll('.syl').forEach(b=>b.onclick=()=>{b.classList.add('on');say(cur[1][b.dataset.i].toLowerCase(),.65).then(()=>b.classList.remove('on'))});
}
function drawSpeak(){
 scr.innerHTML=`${head('Vamos falar')}<div class="tile sm" aria-hidden="true">${cur[2]}</div><div class="word"><span>${cur[0]}</span></div>
 <p class="msg" id="m" aria-live="polite">A Lia fala primeiro. Depois é a sua vez.</p>
 <button class="cta" id="mic">${ic('mic')}Toque e fale</button>
 <button class="ghost" id="hear">${ic('vol')}Ouvir a Lia devagar</button><button class="ghost" id="done">Já falei</button>`;
 lbk();$('#hear').onclick=()=>liaSays(cur[1].join(' ').toLowerCase()+'. '+cur[0].toLowerCase(),.6);$('#done').onclick=win;setTimeout(()=>$('#hear').click(),300);
 $('#mic').onclick=()=>listen(t=>{if(t&&norm(t).includes(norm(cur[0])))win();else{$('#m').textContent='Quase lá! Vamos juntas de novo?';liaSays('Quase lá! Vamos juntas de novo?')}});
}
async function win(){stopVoice();confetti();navigator.vibrate&&navigator.vibrate([30,60,30]);
 const first=!S.mastered.includes(cur[0]);if(first)S.mastered.push(cur[0]);bump();save();
 const up=first&&S.mastered.length%2==0&&level()<5;
 scr.innerHTML=`<div class="tile" style="margin-top:24px" aria-hidden="true">${cur[2]}</div><div class="word"><span>${cur[0]}</span></div>
 <h1 style="text-align:center">Você conseguiu!</h1><p class="msg">${up?`Você subiu para o nível ${level()}.`:'Seu jardim cresceu um pouquinho.'}</p>
 <button class="cta" id="nx">Próxima palavra${ic('go')}</button><button class="ghost" id="hm">Ver minha jornada</button>`;
 $('#nx').onclick=()=>go(lesson,2);$('#hm').onclick=()=>go(journey,1);
 await liaSays(`${name()}, você conseguiu! Estou muito orgulhosa de você.`);
}
