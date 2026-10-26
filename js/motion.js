/* Animações com Motion (opcional) e toque nas letras da marca */
/* ===== Motion (vanilla, via CDN). Sem Motion ou com "reduzir movimento": tudo aparece parado ===== */
scr.addEventListener('mousedown',e=>{if(e.target.closest&&e.target.closest('.gl'))e.preventDefault()});
const MO=window.Motion;
if(MO&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
const { animate, inView, stagger } = MO;
document.documentElement.classList.add('mo');
const E=[.16,.84,.2,1];let cur_a=null;
const reveal=(sel,withY=true)=>scr.querySelectorAll(sel).forEach(el=>{
 el.classList.add('rv');
 inView(el,()=>{animate(el,withY?{opacity:[0,1],y:[18,0]}:{opacity:[0,1]},{duration:.55,ease:E}).then(()=>{el.classList.remove('rv');el.style.opacity='';el.style.transform=''})},{root:scr,amount:.3})});
function enter(){
 try{cur_a&&cur_a.cancel()}catch(e){}
 scr.classList.add('pre');const kids=[...scr.children];
 cur_a=animate(kids,{opacity:[0,1],y:[22,0]},{delay:stagger(.07),duration:.6,ease:E});
 cur_a.then(()=>{scr.classList.remove('pre');kids.forEach(k=>{k.style.opacity='';k.style.transform=''})});
 scr.querySelectorAll('.meter i').forEach(i=>animate(i,{scaleX:[0,1]},{duration:.9,delay:.35,ease:E}));
 const p=scr.querySelector('.road path:nth-of-type(2)');
 if(p){const x=parseFloat(p.getAttribute('stroke-dasharray'))||0;p.setAttribute('stroke-dasharray','0 200');animate(0,x,{duration:1.1,delay:.3,ease:E,onUpdate:v=>p.setAttribute('stroke-dasharray',v.toFixed(1)+' 200')})}
 reveal('.nd');reveal('.bd');reveal('.gd');reveal('.stamp',false);
 const mk=scr.querySelector('.mk');
 if(mk)inView(mk,()=>{mk.querySelectorAll('.gl').forEach((g,i)=>animate(0,1,{delay:i*.12,duration:.8,ease:E,onUpdate:v=>{g.style.opacity=v;g.style.transform='translateY('+(1-v)*50+'px)'}}).then(()=>{g.style.transform=''}))},{root:scr,amount:.5});
}
const _go=go;go=function(fn,t){_go(fn,t);enter()};
const _win=win;win=function(){const r=_win.apply(this,arguments);
 animate(scr.querySelector('.tile'),{scale:[.4,1],rotate:[-8,0]},{type:'spring',stiffness:260,damping:14});
 animate(scr.querySelectorAll('.word span'),{opacity:[0,1],y:[24,0]},{delay:stagger(.06),duration:.5,ease:E});
 animate(scr.querySelector('h1'),{opacity:[0,1],y:[16,0]},{delay:.3,duration:.5,ease:E});return r};
const flipL=g=>{animate(0,1,{duration:.7,ease:E,onUpdate:v=>{g.style.transform='scaleY('+Math.cos(v*Math.PI*2)+')'}}).then(()=>{g.style.transform=''});say(g.dataset.s,.6)};
scr.addEventListener('click',e=>{const g=e.target.closest('.gl');g&&flipL(g)});
scr.addEventListener('keydown',e=>{const g=e.target.closest&&e.target.closest('.gl');if(g&&(e.key=='Enter'||e.key==' ')){e.preventDefault();flipL(g)}});
}else{
const f=g=>say(g.dataset.s,.6);
scr.addEventListener('click',e=>{const g=e.target.closest('.gl');g&&f(g)});
scr.addEventListener('keydown',e=>{const g=e.target.closest&&e.target.closest('.gl');if(g&&(e.key=='Enter'||e.key==' ')){e.preventDefault();f(g)}});
}
