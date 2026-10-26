/* Tela Início: jardim, semana e painel */
/* Início */
function garden(){const st=Math.min(5,Math.floor(S.wins/2));const h=14+st*14;const y=100-h;
 let lv='';for(let i=0;i<Math.min(st+1,5);i++){const ly=98-(i+1)*(h/(Math.min(st+1,5)+.4));const s=i%2?1:-1;lv+=`<ellipse cx="${100+s*16}" cy="${ly}" rx="16" ry="8" fill="${i%2?'var(--leaf)':'var(--teal)'}" transform="rotate(${s*-25} ${100+s*16} ${ly})"/>`}
 let fl=st>=3?`<circle cx="100" cy="${y}" r="${st>=5?15:11}" fill="var(--orange)"/><circle cx="100" cy="${y}" r="5" fill="#FFD36B"/>`:`<circle cx="100" cy="${y}" r="${st?6:4}" fill="var(--leaf)"/>`;
 return `<svg viewBox="0 20 200 110" role="img" aria-label="Jardim da vitória, fase ${st+1} de 6"><ellipse cx="100" cy="104" rx="56" ry="8" fill="var(--line)"/><path d="M100 102 L100 ${y}" stroke="var(--green)" stroke-width="6" stroke-linecap="round"/>${lv}${fl}</svg>`}
function week(){const h=S.hist||[],L='DSTQQSS';let o='';for(let k=6;k>=0;k--){const d=new Date();d.setDate(d.getDate()-k);const on=h.includes(d.toDateString());o+=`<div class="dy ${on?'on':''} ${k==0?'td':''}"><span>${L[d.getDay()]}</span><i>${on?ic('check'):''}</i></div>`}return o}
function home(){
 const g=GOALS[S.goal],done=g.w.filter(w=>S.mastered.includes(w[0])).length,n=g.w.length,cu=nextWord()[0],hl=(S.hist||[]).length;
 scr.innerHTML=`<div class="top"><div class="who">${avatar(S.av,52)}<div><small>Olá,</small><b class="pf">${name()}</b></div></div><span class="streak">${ic('flame')}${hl} ${hl==1?'dia':'dias'}</span></div>
 <section class="hero"><div><small>Seu objetivo</small><div class="goalh pf">${cap(reason())}</div></div>
  <div class="lia"><button class="play" id="vz" aria-label="Ouvir a mensagem da Lia">${ic('vol')}</button><div><b>Mensagem da Lia</b><span class="aura" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div></div>
  <button class="cta white" id="go">Continuar minha jornada${ic('go')}</button></section>
 <section><div class="hdr"><h2>Sua semana</h2><span class="soft" style="font-size:16px">${hl} ${hl==1?'dia':'dias'} de prática</span></div><div class="wk">${week()}</div></section>
 <section><div class="line"><h2>Sua jornada</h2><span class="pill">Nível ${level()}</span></div><div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${done}"><i style="width:${done/n*100}%"></i></div>
  <div class="line"><span class="soft">${done} de ${n} palavras${done<n?` · próxima: <b style="color:var(--ink)">${nameFirst()?'o seu nome':cu}</b>`:''}</span><button class="tx" id="jn">Ver trilha${ic('go','')}</button></div></section>
 <div class="gd">${garden()}<div><b>Jardim da Vitória</b><p class="soft" style="font-size:16px">Cresce a cada tentativa, não só a cada acerto.</p></div></div>`;
 const msgs=[`${name()}, você apareceu hoje, e isso já é uma vitória. Vamos juntas: ${reason()}.`,`Cada tentativa faz o seu jardim crescer, ${name()}. Estou orgulhosa de você.`,`Devagar a gente chega longe, ${name()}. Hoje é mais um passo para ${reason()}.`];
 $('#vz').onclick=()=>liaSays(msgs[Math.floor(Math.random()*3)]);$('#go').onclick=()=>go(lesson,2);$('#jn').onclick=()=>go(journey,1);
}
