/* Boas-vindas, cadastro em 3 passos e cartão da Lia */
/* Boas-vindas */
function welcome(){go(()=>{scr.innerHTML=`<img class="wlogo" src="${LOGO}" alt="Lia">
 <div class="wp"><b>Ler.</b><b>Escrever.</b><b>Falar.</b><p style="margin-top:12px;font-size:20px">No seu ritmo, com a ajuda da Lia e com as palavras da sua vida.</p></div>
 <div style="display:flex;flex-direction:column;gap:14px">${[['shield','Sem e-mail, senha ou CPF'],['phone','Seus dados ficam só neste aparelho'],['vol','A Lia fala e ouve você']].map(a=>`<div class="ben"><span class="chip">${ic(a[0])}</span>${a[1]}</div>`).join('')}</div>
 <button class="cta" id="st" style="margin-top:auto">Criar meu perfil${ic('go')}</button>`;$('#st').onclick=()=>{step=0;other=false;go(onboarding)}},-1)}

/* Cadastro */
const Q=['Como você quer ser chamado?','Qual é o seu maior objetivo?','O que é mais difícil hoje?'];
function onboarding(){
 if(step==3)return card();
 const title=other?'Qual é o seu objetivo?':Q[step];let body='';
 if(step==0)body=`<label class="lab" for="nick">Seu nome ou apelido</label><input class="field" id="nick" autocomplete="off" value="${S.nick}"><button class="ghost" id="mic">${ic('mic')}Falar o meu nome</button><span class="lab">Escolha o seu símbolo</span><div class="avs">${AV.map((a,i)=>`<button data-a="${i}" class="${i==S.av?'on':''}" style="background:${a[1]}" aria-label="Símbolo ${i+1}">${ic(a[0]).replace('class="ic','style="color:#fff" class="ic')}</button>`).join('')}</div><button class="cta" id="ok">Continuar${ic('go')}</button>`;
 if(step==1&&!other)body=Object.entries(GOALS).map(([k,g])=>`<button class="opt" data-g="${k}"><span class="chip">${ic(g.i)}</span>${g.t}</button>`).join('');
 if(step==1&&other)body=`<label class="lab" for="oth">Conte com as suas palavras</label><input class="field" id="oth" autocomplete="off" placeholder="Ex.: ler cartas da minha irmã" value="${S.custom}"><button class="ghost" id="mic">${ic('mic')}Falar o meu objetivo</button><button class="cta" id="ok">Continuar${ic('go')}</button><button class="ghost" id="bk2">Voltar às opções</button>`;
 if(step==2)body=Object.entries(FOCI).map(([k,f])=>`<button class="opt" data-f="${k}"><span class="chip">${ic(f[0])}</span>${f[1]}</button>`).join('');
 scr.innerHTML=`<div class="top"><img class="logo" src="${LOGO}" alt="Lia"><span class="pill">Passo ${step+1} de 3</span></div>
 <div class="bar" aria-hidden="true">${[0,1,2].map(i=>`<i class="${i<=step?'on':''}"></i>`).join('')}</div>
 <h1>${title}</h1><button class="ghost" id="rep">${ic('vol')}Ouvir a pergunta</button>${body}`;
 const ask=()=>liaSays(step==0?'Oi! Eu sou a Lia. Como você quer ser chamado?':title,.85);
 $('#rep').onclick=ask;setTimeout(ask,350);
 const tgt=step==0?'#nick':'#oth';
 if($('#mic'))$('#mic').onclick=()=>listen(t=>{if(t)$(tgt).value=step==0?cap(t.split(' ')[0]):t;else liaSays('Não consegui ouvir. Você pode escrever.')});
 if(step==0){scr.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{S.av=+b.dataset.a;scr.querySelectorAll('[data-a]').forEach(x=>x.classList.toggle('on',x==b))});$('#ok').onclick=()=>{S.nick=$('#nick').value.trim();step=1;go(onboarding)}}
 if(step==1&&other){$('#ok').onclick=()=>{S.goal='outros';S.custom=$('#oth').value.trim();step=2;go(onboarding)};$('#bk2').onclick=()=>{other=false;go(onboarding)}}
 scr.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{if(b.dataset.g=='outros'){other=true;go(onboarding)}else{S.goal=b.dataset.g;S.custom='';step=2;go(onboarding)}});
 scr.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{S.focus=b.dataset.f;if(!S.key)S.key=genKey();save();step=3;go(onboarding)});
}
function card(){
 scr.innerHTML=`<div class="top"><img class="logo" src="${LOGO}" alt="Lia"><span class="pill">Perfil criado</span></div><h1>Seu cartão da Lia está pronto</h1>
 <div class="idc"><div class="row">${avatar(S.av,64)}<div><small>Aluno(a)</small><b style="font-size:28px;font-family:'Bricolage Grotesque'">${name()}</b></div></div>
 <div class="r"><small>Objetivo</small><b>${S.goal=='outros'&&S.custom?cap(S.custom):GOALS[S.goal].t}</b></div><div class="r"><small>Foco</small><b>${FOCI[S.focus][1]}</b></div><div class="r"><small>Chave anônima</small><span class="key">${S.key}</span></div></div>
 <p class="soft" style="font-size:17px">Essa chave identifica você neste aparelho. Não existe senha para esquecer.</p>
 <button class="cta" id="fin">Começar minha jornada${ic('go')}</button>`;
 $('#fin').onclick=()=>go(home,0);setTimeout(()=>liaSays(`Pronto, ${name()}! Seu cartão está criado. Vamos começar?`),300);
}
