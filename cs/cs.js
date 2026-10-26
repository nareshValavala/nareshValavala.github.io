(function(){
try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
if(!location.hash)window.scrollTo(0,0);
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var pr=document.querySelector('.cprog');
function pg(){var h=document.documentElement.scrollHeight-innerHeight;if(pr)pr.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'}
addEventListener('scroll',pg,{passive:true});pg();
if(rm)return;
/* reveal */
var els=[].slice.call(document.querySelectorAll('.csx header>*,.csx section .wrap>*,.csx section>.wrap>div>*'));
els.forEach(function(e,i){e.classList.add('cr')});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
els.forEach(function(e){io.observe(e)});
/* flow diagrams: packets along solid edges, nodes light up in order */
[].forEach.call(document.querySelectorAll('.flow-svg'),function(svg){
 var NS='http://www.w3.org/2000/svg';
 var edges=[].slice.call(svg.querySelectorAll('.flow-edge')).filter(function(p){return !p.classList.contains('dashed')});
 edges.forEach(function(p,i){var c=document.createElementNS(NS,'circle');c.setAttribute('r','3');c.setAttribute('class','pkt');
  var a=document.createElementNS(NS,'animateMotion');a.setAttribute('dur','1.6s');a.setAttribute('begin',(i*0.35)+'s');a.setAttribute('repeatCount','indefinite');a.setAttribute('path',p.getAttribute('d'));c.setAttribute('opacity','0');var o=document.createElementNS(NS,'animate');o.setAttribute('attributeName','opacity');o.setAttribute('values','0;1;1;0');o.setAttribute('keyTimes','0;.15;.85;1');o.setAttribute('dur','1.6s');o.setAttribute('begin',(i*0.35)+'s');o.setAttribute('repeatCount','indefinite');c.appendChild(a);c.appendChild(o);svg.appendChild(c)});
 var nodes=[].slice.call(svg.querySelectorAll('.flow-node-rect'));
 var k=0;if(nodes.length){setInterval(function(){nodes.forEach(function(n){n.classList.remove('lit')});nodes[k%nodes.length].classList.add('lit');k++},700)}
 var panel=svg.closest('.panel');if(panel&&!panel.querySelector('.cnote')){var n=document.createElement('div');n.className='cnote';n.textContent='Animation shows the direction of data flow, not live run status.';svg.parentNode.insertBefore(n,svg.nextSibling)}
});
[].forEach.call(document.querySelectorAll('.bars .bar,.waveform .wbar'),function(b,i){b.style.setProperty('--i',(i%24))});
})();
