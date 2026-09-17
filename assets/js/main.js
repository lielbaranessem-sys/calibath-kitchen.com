(function(){
  var header=document.querySelector('.site-top')||document.querySelector('.site-header');
  function onScroll(){ if(!header) return; header.classList.toggle('scrolled', window.scrollY>40); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var burger=document.querySelector('.burger'),
      mobileMenu=document.getElementById('mobileMenu')||document.querySelector('.nav');
  if(burger&&mobileMenu){ burger.addEventListener('click',function(){ mobileMenu.classList.toggle('open'); }); }

  // animated stat counters (data-count)
  var counters=document.querySelectorAll('[data-count]');
  if(counters.length){
    var cio=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el=e.target, end=parseFloat(el.getAttribute('data-count'))||0,
            suf=el.getAttribute('data-suffix')||'', t0=null, dur=1600;
        function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1);
          el.textContent=Math.floor(p*end)+suf; if(p<1) requestAnimationFrame(step); }
        requestAnimationFrame(step); cio.unobserve(el);
      });
    },{threshold:.4});
    counters.forEach(function(el){ cio.observe(el); });
  }

  var modal=document.getElementById('leadModal');
  if(modal){
    var kwEls=modal.querySelectorAll('[data-cta-kw-target]');
    function openModal(kw){
      if(kw){ kwEls.forEach(function(el){ el.textContent=kw; }); }
      modal.hidden=false; document.body.classList.add('modal-open');
    }
    function closeModal(){ modal.hidden=true; document.body.classList.remove('modal-open'); }
    document.querySelectorAll('[data-cta-open]').forEach(function(b){
      b.addEventListener('click',function(){ openModal(b.getAttribute('data-cta-kw')); });
    });
    modal.addEventListener('click',function(e){ if(e.target===modal||e.target.hasAttribute('data-cta-close')) closeModal(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!modal.hidden) closeModal(); });
  }

  // reviews carousel (prev/next scroll)
  document.querySelectorAll('[data-rv-carousel]').forEach(function(car){
    var track=car.querySelector('.rv-track'),
        prev=car.querySelector('.rv-prev'),
        next=car.querySelector('.rv-next');
    if(!track) return;
    function step(){ var card=track.querySelector('.rv-card'); return card?card.getBoundingClientRect().width+24:320; }
    if(prev) prev.addEventListener('click',function(){ track.scrollBy({left:-step(),behavior:'smooth'}); });
    if(next) next.addEventListener('click',function(){ track.scrollBy({left:step(),behavior:'smooth'}); });
  });

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // click-to-play overlay for content videos (not the hero background)
  var vids=[].slice.call(document.querySelectorAll('video:not(.hero-media-video)'));
  vids.forEach(function(v){
    v.removeAttribute('autoplay');
    if(!v.getAttribute('preload')) v.preload='metadata';
    var wrap=document.createElement('div');
    wrap.className='video-wrap';
    v.parentNode.insertBefore(wrap,v);
    wrap.appendChild(v);
    var btn=document.createElement('button');
    btn.type='button'; btn.className='video-play-btn';
    btn.setAttribute('aria-label','Play video');
    wrap.appendChild(btn);
    btn.addEventListener('click',function(){ var p=v.play(); if(p&&p.catch) p.catch(function(){}); });
    v.addEventListener('play',function(){
      wrap.classList.add('playing');
      vids.forEach(function(o){ if(o!==v) o.pause(); });
    });
    v.addEventListener('pause',function(){ wrap.classList.remove('playing'); });
    v.addEventListener('ended',function(){ wrap.classList.remove('playing'); });
  });
})();
