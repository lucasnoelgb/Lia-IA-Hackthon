/* Estado (S, localStorage), helpers, avatares, navegação e go() */
let S={...S0},step=0,other=false,cur=null,ex=null,cancel=0;
try{const r=localStorage.getItem('lia');if(r)S={...S0,...JSON.parse(r)}}catch(e){}
const save=()=>{try{localStorage.setItem('lia',JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),scr=$('#scr'),app=$('#app');
const name=()=>S.nick||'amigo';
const level=()=>Math.min(5,1+Math.floor(S.mastered.length/2));
const reason=()=>S.goal=='outros'&&S.custom?S.custom:GOALS[S.goal].m;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const genKey=()=>'LIA-'+Array.from({length:5},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
const AV=[['sprout','#1763AE'],['star','#B4500A'],['flame','#B8352A'],['target','#0B8283'],['heart','#B03A6C'],['sun','#6B4FB5']];
const avatar=(i,sz=48)=>`<span class="av" style="width:${sz}px;height:${sz}px;background:${AV[i][1]}">${ic(AV[i][0]).replace('class="ic ','style="width:'+Math.round(sz*.55)+'px;height:'+Math.round(sz*.55)+'px" class="ic ')}</span>`;
const NAV=[['home','Início',()=>go(home,0)],['route','Jornada',()=>go(journey,1)],['learn','Aprender',()=>go(lesson,2)],['trophy','Conquistas',()=>go(bookScr,3)]];
$('#nav').innerHTML=NAV.map((n,i)=>`<button data-n="${i}">${ic(n[0])}<span>${n[1]}</span></button>`).join('');
document.querySelectorAll('#nav button').forEach(b=>{b.onclick=NAV[b.dataset.n][2]});
function go(fn,t=-1){stopVoice();app.classList.toggle('nonav',t<0);document.querySelectorAll('#nav button').forEach((b,i)=>{b.classList.toggle('on',i==t);i==t?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});fn();scr.scrollTop=0}
