(function(){
var C=window.SITE_CONFIG||{},NEWS=(window.NEWS||[]).slice().sort(function(a,b){return a.date<b.date?1:-1}),GAL=window.GALLERY||[];
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return (r||document).querySelectorAll(s)};
function el(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n}
/* القائمة */
var b=$('.menu-btn'),n=$('#nav');
if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
/* بطاقات الأخبار */
function card(x){var a=el('article','card');if(x.image){var i=el('img');i.src=x.image;i.alt='';i.loading='lazy';a.appendChild(i)}
var d=el('div');d.appendChild(el('time','',x.date));var h=el('h3'),l=el('a','',x.title);l.href='news.html?id='+x.id;h.appendChild(l);d.appendChild(h);
d.appendChild(el('p','',x.body.length>140?x.body.slice(0,140)+'…':x.body));a.appendChild(d);return a}
function thumb(g,k){var a=el('a','ph');a.href=g.src;a.setAttribute('data-cap',g.caption||'');a.setAttribute('data-album',g.album||'');var i=el('img');i.src=g.thumb||g.src;i.alt=g.caption||'صورة من المدرسة';i.loading='lazy';i.decoding='async';if(g.w&&g.h){i.width=g.w;i.height=g.h}a.appendChild(i);
if(g.caption){var c=el('span','cap2');c.appendChild(el('b','',g.caption));if(g.album)c.appendChild(el('em','',g.album));a.appendChild(c)}a.appendChild(el('span','zm','+'));return a}
var hn=$('#home-news');if(hn){NEWS.slice(0,3).forEach(function(x){hn.appendChild(card(x))});if(NEWS.length)$('#home-news-empty').hidden=true}
var hg=$('#home-gallery-grid');if(hg&&GAL.length){hg.className='masonry';GAL.slice(0,8).forEach(function(g){hg.appendChild(thumb(g))});$('#home-gallery').hidden=false}
/* المعرض */
var gg=$('#gallery-grid');if(gg){gg.className='masonry';var cur='';
function showAlbum(a){cur=a;gg.textContent='';var nodes=[];GAL.filter(function(g){return !a||(g.album||'عام')===a}).forEach(function(g){var t=thumb(g);gg.appendChild(t);nodes.push(t)});
 [].forEach.call($$('#albums button'),function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-a')===a))});var c=$('#gcount');if(c)c.textContent=nodes.length+' صورة';if(window.RK_reveal)window.RK_reveal(nodes)}
if(GAL.length){$('#gallery-empty').hidden=true;var albums=[];GAL.forEach(function(g){var a=g.album||'عام';if(albums.indexOf(a)<0)albums.push(a)});
 if(albums.length>1){var t=$('#albums');t.hidden=false;t.className='chips';[''].concat(albums).forEach(function(a){var n=a?GAL.filter(function(g){return (g.album||'عام')===a}).length:GAL.length;var b=el('button','',a||'الكل');b.type='button';b.setAttribute('data-a',a);b.appendChild(el('i','',String(n)));b.onclick=function(){showAlbum(a)};t.appendChild(b)})}
 var cnt=el('p','gcount');cnt.id='gcount';gg.parentNode.insertBefore(cnt,gg);showAlbum('')}}
/* الأخبار */
var nl=$('#news-list');if(nl){var id=(location.search.match(/[?&]id=(\d+)/)||[])[1];
if(id){var x=NEWS.filter(function(n){return String(n.id)===id})[0],one=$('#news-one');nl.hidden=true;$('#news-search').hidden=true;$('#news-empty').hidden=true;$('.pagehead h1').textContent=x?x.title:'الخبر غير موجود';
one.hidden=false;if(x){document.title=x.title+' | مدارس رويال كوش';if(x.image){var im=el('img','hero-img');im.src=x.image;im.alt='';one.appendChild(im)}one.appendChild(el('time','',x.date));x.body.split(/\n\s*\n/).forEach(function(p){one.appendChild(el('p','',p))})}
var back=el('a','more','العودة إلى الأخبار');back.href='news.html';one.appendChild(back)}
else{var render=function(q){nl.textContent='';var r=NEWS.filter(function(n){return !q||(n.title+n.body).indexOf(q)>-1});r.forEach(function(x){nl.appendChild(card(x))});var em=$('#news-empty');em.hidden=!!r.length;em.textContent=q?'لا توجد نتائج مطابقة.':'لا توجد أخبار منشورة حاليًا.'};
render('');$('#news-search').addEventListener('submit',function(e){e.preventDefault();render($('#q').value.trim())})}}
/* المعرض المنبثق */
var lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','عرض الصورة');
lb.innerHTML='<button class="x" aria-label="إغلاق">×</button><button class="pv" aria-label="السابقة">›</button><button class="nx" aria-label="التالية">‹</button><span class="no"></span><figure><img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"><figcaption></figcaption></figure>';
document.body.appendChild(lb);var im=$('img',lb),cp=$('figcaption',lb),no=$('.no',lb),k=0,last=null,links=[];
function show(j){k=(j+links.length)%links.length;im.classList.remove('in');var u=links[k].href,cap=links[k].getAttribute('data-cap')||'';var n=new Image();n.onload=function(){if(links[k].href!==u)return;im.src=u;im.alt=cap;cp.textContent=cap;im.classList.add('in')};n.src=u;no.textContent=(k+1)+' / '+links.length;
 [1,-1].forEach(function(d){var q=links[(k+d+links.length)%links.length];if(q){var p=new Image();p.src=q.href}})}
function close(){lb.classList.remove('open');setTimeout(function(){lb.hidden=true},250);document.body.style.overflow='';if(last)last.focus()}
document.addEventListener('click',function(e){var a=e.target.closest('a.ph');if(!a)return;e.preventDefault();links=[].slice.call(document.querySelectorAll('a.ph'));last=a;lb.hidden=false;void lb.offsetWidth;lb.classList.add('open');document.body.style.overflow='hidden';show(links.indexOf(a));$('.x',lb).focus()});
$('.x',lb).onclick=close;$('.pv',lb).onclick=function(){show(k+1)};$('.nx',lb).onclick=function(){show(k-1)};lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')close()});
var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(k+(d>0?1:-1));tx=null});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(k+1);if(e.key==='ArrowRight')show(k-1)});
/* النماذج */
var form=$('#adm-form')||$('#con-form'),msg=$('#form-msg');
if(form){var adm=form.id==='adm-form';
function say(t,ok){msg.hidden=false;msg.className='notice '+(ok?'ok':'bad');msg.textContent=t;msg.scrollIntoView({block:'center'})}
form.addEventListener('submit',function(e){e.preventDefault();var v={};[].forEach.call(form.elements,function(f){if(f.name)v[f.name]=f.value.trim()});
form.querySelectorAll('.err').forEach(function(s){s.textContent=''});var er={};
function bad(n,t){er[n]=t;var s=form.querySelector('[name='+n+']').parentNode.querySelector('.err');if(s)s.textContent=t}
if(v.name.length<2||v.name.length>80)bad('name','الرجاء إدخال الاسم.');
if(v.phone&&!/^[0-9+\-\s()]{7,20}$/.test(v.phone))bad('phone','رقم الهاتف غير صالح.');
if(v.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))bad('email','البريد الإلكتروني غير صالح.');
if(adm){if(!v.phone&&!er.phone)bad('phone','رقم التواصل مطلوب.');if(v.guardian.length<2)bad('guardian','الرجاء إدخال اسم ولي الأمر.');if(!v.stage)bad('stage','الرجاء اختيار المرحلة.')}
else{if(!v.phone&&!v.email)bad('phone','أدخل رقم هاتف أو بريدًا للرد عليك.');if(v.message.length<5)bad('message','الرجاء كتابة رسالتك.')}
if(Object.keys(er).length){say('يرجى تصحيح الحقول المشار إليها.',false);return}
if(v.website_url){say('تم الإرسال.',true);return}
var text=form.getAttribute('data-kind')+'\nالاسم: '+v.name+(adm?'\nولي الأمر: '+v.guardian+'\nالمرحلة: '+v.stage:'')+'\nالهاتف: '+(v.phone||'-')+'\nالبريد: '+(v.email||'-')+'\nالرسالة: '+(v.message||'-');
var okMsg=adm?'تم تجهيز طلبك. (إرسال الطلب لا يعني القبول النهائي.)':'تم تجهيز رسالتك. شكرًا لتواصلك.';
if(C.FORM_ENDPOINT){fetch(C.FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(v)}).then(function(r){if(!r.ok)throw 0;form.reset();say(okMsg.replace('تجهيز','إرسال'),true)}).catch(function(){say('تعذر الإرسال، حاول لاحقًا أو اتصل بالمدرسة.',false)})}
else if(C.WHATSAPP){window.open('https://wa.me/'+C.WHATSAPP.replace(/\D/g,'')+'?text='+encodeURIComponent(text),'_blank','noopener');say('تم فتح واتساب برسالتك جاهزة؛ اضغط إرسال هناك لإكمال الطلب.',true)}
else if(C.EMAIL){location.href='mailto:'+C.EMAIL+'?subject='+encodeURIComponent(form.getAttribute('data-kind'))+'&body='+encodeURIComponent(text);say('تم فتح برنامج البريد برسالتك جاهزة؛ اضغط إرسال لإكمال الطلب.',true)}
else say('خدمة استقبال النماذج غير مفعّلة بعد. يرجى التواصل مع المدرسة هاتفيًا على الأرقام الظاهرة في الصفحة.',false)})}
})();
