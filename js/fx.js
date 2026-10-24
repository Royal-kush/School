/* الحركات: سلايدر الواجهة، الظهور عند التمرير، العدّادات، الانتقال بين الصفحات */
(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var C=window.SITE_CONFIG||{};
/* شريط التقدم + الرأس */
var sp=$('#sp'),top=$('.top');
function onScroll(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;if(sp)sp.style.width=(m>0?h.scrollTop/m*100:0)+'%';if(top)top.classList.toggle('scrolled',h.scrollTop>20)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* السلايدر */
var hero=$('.hero');
if(hero){
  (window.HERO_EXTRA||[]).forEach(function(x,i){var s=document.createElement('div');s.className='slide';s.setAttribute('role','group');s.setAttribute('aria-roledescription','slide');
    var bg=document.createElement('div');bg.className='bg';bg.style.backgroundImage='url("'+x.src+'")';bg.style.backgroundSize='cover';bg.style.backgroundPosition='center';s.appendChild(bg);
    var sh=document.createElement('div');sh.className='shade';s.appendChild(sh);
    if(x.title){var c=document.createElement('div');c.className='cap';[['span','eb',x.eyebrow],['h2','',x.title],['p','',x.text]].forEach(function(a){if(a[2]){var n=document.createElement(a[0]);if(a[1])n.className=a[1];n.textContent=a[2];c.appendChild(n)}});if(x.link){var l=document.createElement('a');l.className='btn gold';l.href=x.link;l.textContent=x.linkText||'اعرف المزيد';c.appendChild(l)}s.appendChild(c)}
    hero.appendChild(s)});
  var slides=$$('.slide',hero),cur=0,timer=null,D=6500,paused=false;
  var prog=document.createElement('div');prog.className='hprog';prog.innerHTML='<i></i>';hero.appendChild(prog);var bar=$('i',prog);bar.style.setProperty('--d',D+'ms');
  var dots=document.createElement('div');dots.className='dots';slides.forEach(function(s,i){var b=document.createElement('button');b.setAttribute('aria-label','الشريحة '+(i+1));b.onclick=function(){go(i,true)};dots.appendChild(b);s.setAttribute('aria-label',(i+1)+' من '+slides.length)});hero.appendChild(dots);
  function mk(c,t,f){var b=document.createElement('button');b.className='hbtn '+c;b.setAttribute('aria-label',t);b.textContent=c==='nx'?'‹':'›';b.onclick=f;hero.appendChild(b)}
  mk('pv','الشريحة السابقة',function(){go(cur-1,true)});mk('nx','الشريحة التالية',function(){go(cur+1,true)});
  function run(){bar.classList.remove('run');void bar.offsetWidth;if(!reduce&&!paused)bar.classList.add('run');clearTimeout(timer);if(!reduce&&!paused)timer=setTimeout(function(){go(cur+1)},D)}
  function go(i,user){cur=(i+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('on',k===cur);s.setAttribute('aria-hidden',k===cur?'false':'true')});$$('button',dots).forEach(function(b,k){b.setAttribute('aria-current',k===cur?'true':'false')});run()}
  function pause(v){paused=v;if(v){clearTimeout(timer);bar.classList.remove('run')}else run()}
  hero.addEventListener('mouseenter',function(){pause(true)});hero.addEventListener('mouseleave',function(){pause(false)});hero.addEventListener('focusin',function(){pause(true)});hero.addEventListener('focusout',function(){pause(false)});
  document.addEventListener('visibilitychange',function(){pause(document.hidden)});
  var x0=null;hero.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});hero.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(cur+(d>0?1:-1),true);x0=null});
  hero.setAttribute('tabindex','0');hero.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(cur+1,true);if(e.key==='ArrowRight')go(cur-1,true)});
  go(0);
}
/* إحصاءات إضافية من الإعدادات (أرقام حقيقية تضيفها المدرسة) */
var sg=$('#sgrid');
if(sg)(C.STATS||[]).forEach(function(x){var d=document.createElement('div');d.className='stat';var b=document.createElement('b');b.setAttribute('data-count',x.n);b.setAttribute('data-suffix',x.suffix||'');b.textContent=x.n+(x.suffix||'');var s=document.createElement('span');s.textContent=x.label;d.appendChild(b);d.appendChild(s);sg.appendChild(d)});
/* الظهور عند التمرير */
var sel='.sec .eyebrow,.sec h2,.sec .lead,.prose p,.vm>div,.vm2>div,.stages article,.pcard,.stage,.values li,.goals li,.ticks li,.card,.ph,.stat,.quote,.contact li,.form,.empty,.cta-band .wrap>*,.more,.search';
var els=$$(sel);els.forEach(function(el){var sib=el.parentNode?[].slice.call(el.parentNode.children).indexOf(el):0;el.style.setProperty('--d',Math.min(sib,8)*0.07+'s');el.classList.add('rv')});
window.RK_reveal=function(nodes){nodes.forEach(function(el,i){el.style.setProperty('--d',Math.min(i,10)*0.05+'s');el.classList.add('rv');if('IntersectionObserver' in window){io.observe(el)}else el.classList.add('in')})};
var io;
function count(b){var t=+b.getAttribute('data-count'),suf=b.getAttribute('data-suffix')||'',st=null,dur=1600;if(reduce||!t){b.textContent=t+suf;return}
  (function f(ts){st=st||ts;var p=Math.min((ts-st)/dur,1),e=1-Math.pow(1-p,3);b.textContent=Math.round(t*e)+suf;if(p<1)requestAnimationFrame(f)})(performance.now())}
if('IntersectionObserver' in window){
  io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add('in');io.unobserve(x.target)})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){io.observe(e)});
  var io2=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){$$('b[data-count]',x.target).forEach(count);io2.unobserve(x.target)}})},{threshold:.3});
  $$('.stats').forEach(function(e){io2.observe(e)});$$('b[data-count]').forEach(function(b){b.textContent='0'+(b.getAttribute('data-suffix')||'')});
}else{els.forEach(function(e){e.classList.add('in')})}
/* الانتقال بين الصفحات */
document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute('download'))return;
  var h=a.getAttribute('href');if(!/^[\w\-]+\.html(\?[^#]*)?(#.*)?$/.test(h)||a.classList.contains('ph')||reduce)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(function(){location.href=a.href},230)});
addEventListener('pageshow',function(e){if(e.persisted)document.body.classList.remove('leaving')});
})();
