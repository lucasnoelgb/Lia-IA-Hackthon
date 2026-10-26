/* Tela Jornada: trilha com nós */
/* Jornada */
function journey(){const g=GOALS[S.goal],cu=nextWord()[0],n=g.w.length,done=g.w.filter(w=>S.mastered.includes(w[0])).length,fin=done==n;
 const N=n+1,XS=[80,250,100,245,115,200],P=Array.from({length:N},(_,i)=>[XS[i%XS.length],70+i*120]),H=P[N-1][1]+70;
 let d=`M${P[0][0]} ${P[0][1]}`;for(let i=1;i<N;i++){const[a,b]=P[i-1],[c,e]=P[i];d+=` C${a} ${b+60} ${c} ${e-60} ${c} ${e}`}
 const cur_=g.w.find(w=>!S.mastered.includes(w[0]));
 const nodes=P.map((p,i)=>{const w=g.w[i],t=i==n,dn=!t&&S.mastered.includes(w[0]),c=!t&&!dn&&w[0]==cu&&!fin;const cls=t?'t':dn?'d':c?'c':'l';
  const inner=t?ic('trophy'):dn?ic('check'):c?i+1:ic('lock');const side=p[0]<170?'r':'lf';
  const lab=t?'Jornada concluída':w[0];const sub=t?(fin?'Parabéns!':'Meta final'):dn?'Conquistada':c?'Palavra de hoje':'Em breve';
  return `<div class="nd" style="left:${p[0]/340*100}%;top:${p[1]/H*100}%"><button class="dt ${cls}" data-i="${i}" aria-label="${lab}, ${sub}" ${cls=='l'||cls=='t'?'aria-disabled="true"':''}>${inner}</button><div class="lb ${side} ${cls=='l'?'l1':''}">${lab}<small>${sub}</small></div></div>`}).join('');
 scr.innerHTML=`<div class="sum"><div><h1>Minha jornada</h1><span class="soft">Para ${reason()}</span></div><div class="n pf">${done}<small>/${n}</small></div></div>
 <div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${done}"><i style="width:${done/n*100}%"></i></div>
 ${fin?`<button class="ghost" id="cn">${ic('go')}Treinar de novo</button>`:`<div class="today"><div><small>${nameFirst()?'Para começar':'Palavra de hoje'} · Nível ${level()}</small><b>${nameFirst()?'O seu nome':cur_[0]}</b></div><button id="cn">Começar</button></div>`}
 ${canName()&&!nameFirst()?`<button class="ghost" id="nm2">${ic('pen')}Escrever o meu nome (quando quiser)</button>`:''}
 <div class="road"><svg viewBox="0 0 340 ${H}" aria-hidden="true"><defs><linearGradient id="rg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}"><stop offset="0" stop-color="#1763AE"/><stop offset=".6" stop-color="#0B8283"/><stop offset="1" stop-color="#2D8F57"/></linearGradient></defs>
  <path d="${d}" fill="none" stroke="var(--line)" stroke-width="12" stroke-linecap="round" pathLength="100"/><path d="${d}" fill="none" stroke="url(#rg)" stroke-width="12" stroke-linecap="round" pathLength="100" stroke-dasharray="${(done/(N-1)*100).toFixed(1)} 200"/></svg>${nodes}</div>`;
 const c=$('#cn');if(c)c.onclick=()=>go(lesson,2);if($('#nm2'))$('#nm2').onclick=()=>go(nameLesson,2);
 scr.querySelectorAll('.dt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(i>=n)return;const w=g.w[i];if(b.classList.contains('c'))go(lesson,2);else if(b.classList.contains('d'))say(w[0].toLowerCase(),.8)});
}
