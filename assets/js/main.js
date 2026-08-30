(function(){
  var header=document.querySelector('.site-top')||document.querySelector('.site-header');
  function onScroll(){ if(!header) return; header.classList.toggle('scrolled', window.scrollY>40); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var burger=document.querySelector('.burger'), nav=document.querySelector('.nav');
  if(burger&&nav){ burger.addEventListener('click',function(){ nav.classList.toggle('open'); }); }

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

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
