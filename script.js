(function(){
  "use strict";
  // Mobile navigation
  var btn=document.querySelector(".menu-btn"), list=document.getElementById("nav-list");
  if(btn&&list){
    btn.addEventListener("click",function(){
      var open=list.classList.toggle("open");
      btn.setAttribute("aria-expanded",open);
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"&&list.classList.contains("open")){list.classList.remove("open");btn.setAttribute("aria-expanded","false");btn.focus();}
    });
  }
  var yr=document.getElementById("year"); if(yr) yr.textContent=new Date().getFullYear();

  // Decorative radar sweep (hero)
  var c=document.getElementById("radar"); if(!c||!c.getContext) return;
  var ctx=c.getContext("2d"), reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W,H,angle=0,blips=[];
  for(var i=0;i<7;i++) blips.push({a:Math.random()*Math.PI,r:.25+Math.random()*.7});
  function size(){
    var d=window.devicePixelRatio||1,r=c.getBoundingClientRect();
    W=c.width=r.width*d; H=c.height=r.height*d;
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var cx=W/2, cy=H*.96, R=Math.min(W/2,H*.92);
    ctx.lineWidth=Math.max(1,W/700);
    ctx.strokeStyle="rgba(59,130,255,.25)";
    for(var k=1;k<=4;k++){ctx.beginPath();ctx.arc(cx,cy,R*k/4,Math.PI,2*Math.PI);ctx.stroke();}
    for(var d=0;d<=4;d++){var t=Math.PI+d*Math.PI/4;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(t),cy+R*Math.sin(t));ctx.stroke();}
    // sweep trail
    for(var s=0;s<40;s++){
      var a=Math.PI+((angle-s*.012)%Math.PI+Math.PI)%Math.PI;
      ctx.strokeStyle="rgba(139,92,246,"+(.5*(1-s/40))+")";
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));ctx.stroke();
    }
    // blips
    blips.forEach(function(b){
      var diff=((angle-b.a)%Math.PI+Math.PI)%Math.PI, o=Math.max(0,1-diff/1.2);
      if(reduce) o=.6;
      ctx.fillStyle="rgba(59,130,255,"+o+")";
      var t=Math.PI+b.a;
      ctx.beginPath();ctx.arc(cx+R*b.r*Math.cos(t),cy+R*b.r*Math.sin(t),Math.max(2,W/220),0,6.283);ctx.fill();
    });
  }
  function loop(){angle=(angle+.012)%Math.PI;draw();requestAnimationFrame(loop);}
  size(); window.addEventListener("resize",function(){size();draw();});
  if(reduce) draw(); else loop();
})();
