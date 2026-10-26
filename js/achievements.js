/* Conquistas: medalhas, álbum e perfil */
/* Conquistas */
function badges(){const g=GOALS[S.goal],d=g.w.filter(w=>S.mastered.includes(w[0])).length,hl=(S.hist||[]).length;
 return [['Primeira palavra','sprout',S.mastered.length,1],['Três palavras','medal',S.mastered.length,3],['Jornada completa','trophy',d,g.w.length],['Três dias','flame',hl,3],['Coragem','star',S.wins,5],['Nível 3','target',level(),3]]}
function badge(b){const p=Math.min(1,b[2]/b[3]),ok=p>=1,c=2*Math.PI*40,st=ok?'ok':b[2]>1&&p>0&&b[2]>0&&b[2]>=1&&p>0?'pr':'lk';const k=ok?'ok':b[2]>0?'pr':'lk';
 return `<div class="bd ${k}"><div class="bw"><svg viewBox="0 0 92 92" aria-hidden="true"><circle cx="46" cy="46" r="40" class="tr"/><circle cx="46" cy="46" r="40" class="ar" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c*(1-p)).toFixed(1)}" transform="rotate(-90 46 46)"/></svg><span class="seal">${ic(k=='lk'?'lock':b[1])}</span></div><b>${b[0]}</b><small>${ok?'Conquistada':k=='lk'?'Bloqueada':`${b[2]} de ${b[3]}`}</small></div>`}
function bookScr(){const g=GOALS[S.goal],all=Object.values(GOALS).flatMap(x=>x.w);const items=S.mastered.map(m=>all.find(w=>w[0]==m)).filter(Boolean);
 const B=badges(),got=B.filter(b=>b[2]>=b[3]).length,empty=Math.max(0,g.w.filter(w=>!S.mastered.includes(w[0])).length);
 scr.innerHTML=`<div class="sum"><div><h1>Minhas conquistas</h1><span class="soft">${got} de ${B.length} medalhas</span></div><div class="n pf">${items.length}<small> ${items.length==1?'palavra':'palavras'}</small></div></div>
 <section><h2 style="margin-bottom:14px">Medalhas</h2><div class="grid">${B.map(badge).join('')}</div></section>
 <section><div class="hdr" style="margin-bottom:14px"><h2>Álbum de palavras</h2><span class="soft" style="font-size:16px">Toque para ouvir</span></div>
  <div class="album">${items.map(w=>`<button class="stamp" data-w="${w[0]}" aria-label="Ouvir ${w[0]}">${ic('check')}<b>${w[0]}</b><small>${w[1].join(' · ')}</small></button>`).join('')}${Array.from({length:empty},()=>`<div class="stamp e">${ic('lock')}<small>Próxima palavra</small></div>`).join('')}</div>
  ${items.length?'':`<button class="cta" id="fw" style="margin-top:16px">Aprender a primeira palavra${ic('go')}</button>`}</section>
 <section><h2 style="margin-bottom:6px">Meu perfil</h2><div class="row" style="margin:10px 0">${avatar(S.av,56)}<div><b class="pf" style="font-size:24px">${name()}</b><div class="soft" style="font-size:16px">${S.key}</div></div></div>
  <div class="kv"><small>Objetivo</small><b>${S.goal=='outros'&&S.custom?cap(S.custom):g.t}</b></div><div class="kv"><small>Foco</small><b>${FOCI[S.focus][1]}</b></div>
  <p class="soft" style="font-size:16px;margin:10px 0 14px">Seus dados ficam só neste aparelho. Sem e-mail e sem senha.</p>
  ${voicePanel()}
  <div style="display:flex;flex-direction:column;gap:10px"><button class="ghost" id="ed">${ic('pen')}Editar meu perfil</button><button class="ghost" id="sum">${ic('vol')}Ouvir meu resumo</button><button class="ghost" id="rst">Começar de novo</button></div></section>${MK}`;
 scr.querySelectorAll('.stamp[data-w]').forEach(b=>b.onclick=()=>say(b.dataset.w.toLowerCase(),.8));
 bindVoicePanel();
 const fw=$('#fw');if(fw)fw.onclick=()=>go(lesson,2);
 $('#ed').onclick=()=>{step=0;other=false;go(onboarding)};
 $('#sum').onclick=()=>liaSays(items.length?`${name()}, você já conquistou ${items.length} ${items.length==1?'palavra':'palavras'} e ${got} ${got==1?'medalha':'medalhas'}. Cada uma delas é um passo seu.`:`${name()}, vamos começar juntas. Sua primeira palavra está esperando.`);
 $('#rst').onclick=()=>{if(confirm('Apagar tudo e começar de novo?')){S={...S0};step=0;other=false;save();welcome()}};
}
