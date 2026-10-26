/* Utilitários: norm(), nextWord(), confetti() */
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z]/g,'');
function nextWord(){const l=GOALS[S.goal].w;return l.find(w=>!S.mastered.includes(w[0]))||l[S.mastered.length%l.length]}
function confetti(){const c=['#1479B5','#5DBB6E','#F58A3C','#0E8A8F'];for(let i=0;i<26;i++){const d=document.createElement('i');d.className='conf';d.style.left=Math.random()*100+'%';d.style.background=c[i%4];d.style.setProperty('--dx',(Math.random()*120-60)+'px');d.style.animationDuration=(3+Math.random()*3)+'s';d.style.animationDelay=Math.random()*.6+'s';app.appendChild(d);setTimeout(()=>d.remove(),7000)}}
