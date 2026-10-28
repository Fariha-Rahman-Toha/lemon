// SECTION 1 - HELPERS
const $=s=>document.querySelector(s),cv=$('#cv');
let g=cv.getContext('2d');
g.imageSmoothingEnabled=false;
const W=400,H=225,OX=60,OY=40,RM=matchMedia('(prefers-reduced-motion: reduce)');
const R=(x,y,w,h,c)=>{
    g.fillStyle=c;
    g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))
};
const E=(cx,cy,rx,ry,c)=>{
    g.fillStyle=c;
    cx=Math.round(cx);
    cy=Math.round(cy);
    for(let j=-ry;j<=ry;j++)for(let i=-rx;i<=rx;i++)if(i*i/(rx*rx)+j*j/(ry*ry)<=1.05)g.fillRect(cx+i,cy+j,1,1)
    };
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lp=(a,b,k)=>a+(b-a)*k,ez=k=>k*k*(3-2*k),rnd=Math.random;
// AUDIO
let muted=true,ac=null;
function beep(f,d=.09,ty='square',v=.04){
    if(muted||!ac)return;
    const o=ac.createOscillator(),n=ac.createGain();
    o.type=ty;o.frequency.value=f;
    n.gain.value=v;o.connect(n);
    n.connect(ac.destination);
    o.start();
    n.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);
    o.stop(ac.currentTime+d)
}
$('#mute').onclick=e=>{
    muted=!muted;
    if(!muted)
        {
        ac=ac||new(window.AudioContext||window.webkitAudioContext)();
        ac.resume();
        beep(660)
    }e.target.textContent=muted?'🔇 Sound off':'🔊 Sound on';
    e.target.setAttribute('aria-pressed',!muted)
};
//FRUITS 
const F=[{id:'straw',n:'Strawberry',d:'a little sweetness',j:'#ff5d73',j2:'#ffc2cc'},{id:'lemon',n:'Lemon',d:'a fresh twist on a sour day',j:'#ffe347',j2:'#fff9b8'},{id:'orange',n:'Orange',d:'a burst of sunshine',j:'#ff9f1c',j2:'#ffd699'},{id:'mango',n:'Mango',d:'a little golden warmth',j:'#ffb627',j2:'#ff8a4c'}];
const spr={};
F.forEach(f=>{
    const c=document.createElement('canvas');
    c.width=c.height=16;
    const og=g;g=c.getContext('2d');
if(f.id=='straw'){
    E(8,9,5,5,'#d62839');
    E(8,12,3,3,'#d62839');
    E(6,7,2,2,'#ef6f7e');
    R(5,3,6,2,'#2d9d4a');
    R(7,2,2,2,'#2d9d4a');
    [[6,8],[9,8],[8,11],[5,11],[11,10],[7,13]].forEach(a=>R(a[0],a[1],1,1,'#ffe9a8'))
}
if(f.id=='lemon'){
    E(8,8,6,4,'#ffe033');
    R(14,7,2,2,'#f2c200');
    R(0,8,2,1,'#f2c200');
    E(6,6,2,1,'#fff7a0');
    R(10,3,3,2,'#2d9d4a')
}
if(f.id=='orange'){
    E(8,9,5,5,'#ff8c1a');
    E(6,7,2,2,'#ffbe6b');
    R(7,3,2,2,'#6b4423');
    R(9,2,4,2,'#2d9d4a')
}
if(f.id=='mango'){
    E(8,9,5,6,'#f6b21d');
    E(10,11,3,4,'#f0642e');
    E(6,7,2,2,'#ffe27a');
    R(7,2,2,2,'#6b4423');
    R(9,2,4,2,'#2d9d4a')
}
g=og;spr[f.id]=c});
// CHARACTERS AND VENDORS 
const dk=(h,k)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.substr(i,2),16)*k).toString(16).padStart(2,'0')).join('');
const mix=(a,b,k)=>'#'+[1,3,5].map(i=>Math.round(lp(parseInt(a.substr(i,2),16),parseInt(b.substr(i,2),16),k)).toString(16).padStart(2,'0')).join('');
const C=[
// Woman 1  
{sk:'#f3cfa6',hair:'#2b1b17',shirt:'#2b3a67',sl:1,pants:'#1f2433',shoe:'#161616',lip:'#c0394d',
 hb:P=>P(-8,-47,16,17,'#2b1b17'),
 hr:P=>{P(-7,-49,14,5,'#2b1b17');P(-7,-44,3,5,'#2b1b17');P(4,-44,3,5,'#2b1b17');P(-3,-48,5,1,'#5a4038')},
 fx:P=>{P(-3,-31,6,9,'#fff');P(-4,-31,1,10,'#1b2648');P(3,-31,1,10,'#1b2648');P(0,-21,1,1,'#d9c27a');P(-3,-33,6,1,'#f4f4f4');P(-2,-32,4,1,'#f4f4f4');P(-7,-39,1,2,'#fff');P(-10,-20,3,1,'#fff')}},
// Woman 2 
{sk:'#c68642',hair:'#6b3a1e',shirt:'#ff8fab',sl:0,pants:'#4a6fa5',shoe:'#ffffff',lip:'#b5524f',
 hb:P=>{
    P(-8,-47,16,22,'#6b3a1e');
    P(-9,-32,3,3,'#6b3a1e');
    P(6,-32,3,3,'#6b3a1e')
},
 hr:P=>{P(-7,-49,14,5,'#6b3a1e');P(-7,-44,2,9,'#6b3a1e');P(5,-44,2,9,'#6b3a1e');P(-6,-44,7,2,'#6b3a1e');P(-3,-49,4,1,'#9a5b32')},
 fx:P=>{P(-2,-27,2,2,'#fff');P(0,-27,2,2,'#fff');P(-1,-25,2,1,'#fff');P(-5,-16,3,2,'#3b5b8c');P(2,-16,3,2,'#3b5b8c')}},
// Woman 3  
{sk:'#8d5524',hair:'#1a0d0a',shirt:'#c2185b',sl:0,dress:1,pants:'#000',shoe:'#d4af37',lip:'#d90429',
 hb:P=>{P(-10,-48,20,30,'#1a0d0a');P(-11,-40,22,14,'#1a0d0a')},
 hr:P=>{const H='#1a0d0a';P(-8,-51,16,7,H);P(-8,-45,3,9,H);P(5,-45,3,9,H);P(-4,-50,2,1,'#6b3b2a');P(2,-49,3,1,'#6b3b2a');P(-11,-26,3,3,H);P(8,-26,3,3,H)},
 fx:P=>{P(-4,-43,3,1,'#c77dff');P(1,-43,3,1,'#c77dff');P(-5,-42,1,1,'#111');P(4,-42,1,1,'#111');P(-5,-38,2,2,'#ff7aa8');P(3,-38,2,2,'#ff7aa8');P(-2,-36,4,2,'#d90429');P(-1,-36,1,1,'#ff5a76');P(-7,-39,1,3,'#ffd166');P(6,-39,1,3,'#ffd166');P(-3,-33,6,1,'#ffd166');P(-7,-22,14,1,'#ffd166');P(-3,-28,1,1,'#fff');P(2,-26,1,1,'#fff');P(-1,-19,1,1,'#fff');P(5,-18,1,1,'#fff');P(-6,-14,1,1,'#fff')}},
// Woman 4
{sk:'#ffdbac',hair:'#4a2c1d',shirt:'#f2b134',sl:1,pants:'#3d3d4e',shoe:'#e9e2d0',lip:'#c4756e',
 hr:P=>{const H='#4a2c1d';P(-7,-48,14,4,H);P(-7,-44,2,7,H);P(5,-44,2,6,H);P(-4,-57,8,8,H);P(-6,-56,2,1,H);P(5,-55,2,1,H);P(-2,-59,1,2,H);P(1,-58,2,1,H);P(-4,-50,8,1,'#e63946');P(-5,-45,1,6,H);P(4,-45,1,4,H);P(-3,-56,3,1,'#6e4630');P(3,-62,1,7,'#3a86ff');P(-6,-35,1,3,H)},
 fx:P=>{P(-5,-31,10,2,'#c98d17');P(-3,-28,1,10,'#c98d17');P(1,-28,1,10,'#c98d17');P(-7,-17,14,1,'#c98d17')}},
// Man 1 
{sk:'#e0ac69',hair:'#1a1410',shirt:'#1c1f2b',sl:1,pants:'#1c1f2b',shoe:'#0d0d0d',lip:'#a5584f',
 hr:P=>{P(-7,-49,14,5,'#1a1410');P(-7,-44,2,5,'#1a1410');P(5,-44,2,4,'#1a1410');P(-3,-48,6,1,'#4d433a')},
 fx:P=>{P(-3,-31,6,10,'#fff');P(-1,-31,2,12,'#c1121f');P(-1,-31,2,2,'#7d0c14');P(-4,-31,1,13,'#0b0d14');P(3,-31,1,13,'#0b0d14');P(3,-26,3,1,'#fff');P(0,-18,1,1,'#555');P(-10,-20,3,1,'#fff')}},
// Man 2
{sk:'#5c3a21',hair:'#0f0a08',shirt:'#2a9d8f',sl:0,pants:'#5a7184',shoe:'#ffffff',lip:'#8d4a3a',
 hr:P=>{P(-6,-47,12,2,'#0f0a08');P(-7,-51,14,6,'#f4a261');P(-8,-45,16,2,'#c97a3d');P(-2,-49,4,2,'#fff')},
 fx:P=>{P(-3,-27,6,1,'#fff');P(-3,-25,4,1,'#fff');P(-5,-16,3,2,'#46596b');P(2,-16,3,2,'#46596b')}},
// Man 3 
{sk:'#f6d5b8',hair:'#ff3d81',br:'#3a2a2a',shirt:'#141414',sl:1,pants:'#262626',shoe:'#2b2b2b',lip:'#9c4a55',
 hr:P=>{P(-6,-47,4,3,'#6b3a4a');P(2,-47,4,3,'#6b3a4a');P(-2,-52,4,6,'#ff3d81');P(-2,-56,4,4,'#2d9cff');P(-2,-58,4,2,'#ffe135');P(-1,-60,2,2,'#ffe135');P(-3,-54,1,5,'#2d9cff');P(2,-54,1,5,'#ffe135');P(-3,-50,1,3,'#ff3d81');P(2,-50,1,3,'#ff3d81')},
 fx:P=>{P(-3,-31,6,6,'#8a1c2b');P(-1,-30,1,1,'#fff');P(-5,-31,3,5,'#262626');P(2,-31,3,5,'#262626');P(0,-31,1,15,'#bbb');P(-6,-30,1,1,'#ddd');P(5,-30,1,1,'#ddd');P(-5,-27,1,1,'#ddd');P(4,-27,1,1,'#ddd');P(-4,-43,3,1,'#000');P(1,-43,3,1,'#000');P(-7,-40,1,1,'#ddd');P(-7,-38,1,1,'#ddd');P(-5,-11,3,2,'#f6d5b8');P(-7,-17,3,1,'#ddd');P(-7,-16,1,6,'#ddd');P(-10,-21,3,1,'#ddd')}},
// Man 4 
{sk:'#b97a4b',hair:'#1a1410',shirt:'#1d4ed8',sl:1,pants:'#111827',shoe:'#f8fafc',lip:'#8d4a3a',
 hr:P=>{P(-7,-49,14,5,'#1a1410');P(-7,-44,2,4,'#1a1410');P(5,-44,2,4,'#1a1410');P(-7,-46,14,2,'#ef4444')},
 fx:P=>{P(-4,-32,8,2,'#1e40af');P(0,-31,1,15,'#e5e7eb');P(-10,-30,1,12,'#fff');P(9,-30,1,12,'#fff');P(3,-27,3,2,'#fff');P(-6,-17,1,14,'#fff');P(5,-17,1,14,'#fff')},
 bx:P=>{P(-10,-30,1,12,'#fff');P(9,-30,1,12,'#fff');P(-3,-28,6,2,'#fff');P(-6,-17,1,14,'#fff');P(5,-17,1,14,'#fff')}}];
// apron 
const apr=P=>{P(-6,-30,12,19,'#fff');P(-5,-33,1,4,'#fff');P(4,-33,1,4,'#fff');P(-3,-22,6,4,'#f1f1f1');P(-3,-22,6,1,'#cfd8dc')};
// VS = 4 vendors
const VS=[
// Vendor 1
{sk:'#c98a5a',hair:'#111',br:'#111',shirt:'#ffd23f',sl:0,pants:'#5b4636',shoe:'#3a2a20',lip:'#a64b3f',
 hr:P=>{P(-6,-47,2,5,'#111');P(4,-47,2,5,'#111');P(-6,-55,12,6,'#fff');P(-7,-50,14,3,'#fff');P(-6,-49,12,1,'#d9d9d9')},
 fx:P=>{apr(P);P(-4,-38,8,1,'#111');P(-5,-37,1,2,'#111');P(4,-37,1,2,'#111');P(-3,-37,2,1,'#111');P(1,-37,2,1,'#111')}},
// Vendor 2
{sk:'#a86b3c',hair:'#14110f',br:'#14110f',shirt:'#ff8fab',sl:0,pants:'#5b4636',shoe:'#3a2a20',lip:'#c0392b',
 hr:P=>{const H='#14110f';P(-7,-49,14,5,H);P(-7,-44,2,6,H);P(5,-44,2,6,H);P(-4,-48,6,1,'#4a3a33');P(6,-50,3,3,H);P(7,-47,3,13,H);P(7,-47,3,1,'#e63946')},
 fx:P=>{apr(P);[-9,6].forEach(x=>{P(x+1,-40,1,1,'#ffd166');P(x,-39,1,2,'#ffd166');P(x+1,-37,1,1,'#ffd166');P(x+2,-39,1,2,'#ffd166')})}},
// Vendor 3
{sk:'#e0ac69',hair:'#8b4513',br:'#6b3410',shirt:'#ff9f1c',sl:0,pants:'#5b4636',shoe:'#3a2a20',lip:'#b5524f',lively:1,
 hr:P=>{const H='#8b4513';P(-6,-48,12,3,H);P(-7,-45,2,3,H);P(5,-45,2,3,H);P(-5,-56,11,7,'#fff');P(-4,-58,8,3,'#fff');P(-5,-50,11,1,'#d9d9d9');P(-6,-48,3,2,H);P(4,-48,2,2,H)},
 fx:P=>{apr(P);P(-1,-36,2,1,'#fff');P(-5,-38,2,1,'#f4978e');P(3,-38,2,1,'#f4978e');P(-4,-39,1,1,'#a0522d');P(3,-39,1,1,'#a0522d');P(-3,-38,1,1,'#a0522d');P(1,-38,1,1,'#a0522d')}},
// Vendor 4 
{sk:'#f1c9a0',hair:'#3b2417',br:'#3b2417',shirt:'#4dabf7',sl:0,pants:'#5b4636',shoe:'#3a2a20',lip:'#c0394d',
 hr:P=>{const H='#3b2417';P(-7,-48,14,4,H);P(-7,-44,2,6,H);P(5,-44,2,6,H);P(7,-46,5,5,H);P(8,-45,3,1,'#6e4630');P(-6,-54,12,6,'#fff');P(-6,-50,12,1,'#d9d9d9');P(-1,-47,1,3,'#5a4038')},
 fx:P=>{apr(P);P(-7,-39,1,1,'#ffd166');P(6,-39,1,1,'#ffd166')}}];

// glass()
const glass=(x,y,s,col,lv)=>{
    R(x,y,3*s,4*s,'#e8f8ff');
    if(lv>.02)R(x,y+4*s-lv*4*s,3*s,lv*4*s,col);
    R(x,y,s,4*s,'rgba(255,255,255,.55)');
    R(x+2*s,y-2*s,s,4*s,'#e63946')
};
//vendor face,arms
function char(c,x,y,o={}){const P=(a,b,w,h,k)=>R(x+a,y+b,w,h,k),sk=c.sk,ss=dk(sk,.8),gl=o.glass,sh=dk(c.shirt,.78),slc=c.sl?c.shirt:sk;
if(!o.back)c.hb&&c.hb(P);
// Legs  
const lg=c.dress?sk:c.pants,L=o.step>0?3:0,Q=o.step<0?3:0;P(-6,-17,5,14-L,lg);P(1,-17,5,14-Q,lg);P(1,-17,1,14-Q,c.dress?ss:dk(c.pants,.75));
P(-7,-3-L,6,3,c.shoe);P(1,-3-Q,6,3,c.shoe);P(-7,-1-L,6,1,dk(c.shoe,.55));P(1,-1-Q,6,1,dk(c.shoe,.55));
// Torso for characters wearing a dress/skirt 
if(c.dress){P(-7,-31,14,10,c.shirt);P(-8,-21,16,5,c.shirt);P(-9,-16,18,5,c.shirt);P(4,-31,3,10,sh);P(5,-21,3,5,sh);P(6,-16,3,5,sh)}
else{P(-7,-31,14,15,c.shirt);P(4,-31,3,15,sh);if(c.tun){P(-8,-17,16,c.tun,c.shirt);P(4,-17,4,c.tun,sh)}}
const arm=ax=>{P(ax,-30,3,c.sl?12:6,c.shirt);if(!c.sl)P(ax,-24,3,6,sk);P(ax,-18,3,3,sk)};
arm(-10);
// Right arm:
if(o.arm=='wave'){P(7,-30,3,5,c.shirt);P(8,-43,3,13,sk);P(8+(o.w?1:0),-47,3,4,sk)}
else if(o.arm=='lift'){P(7,-30,3,5,c.shirt);P(8,-38,3,9,sk);P(8,-41,3,3,sk)}
else if(gl){const gy=lp(-27,-44,gl.l)-(o.sip?1:0),hy=gy+8;P(7,-30,3,8,c.shirt);if(hy<-22)P(8,hy,3,-22-hy,slc);P(8,Math.min(hy,-21),3,3,sk)}
else arm(7);
// Neck + head 
P(-2,-34,4,4,ss);
if(o.back&&c.hb)c.hb(P);
if(o.back){
    P(-6,-47,12,13,c.bh||c.hair);P(-7,-42,1,3,sk);P(6,-42,1,3,sk)
}
else{
    P(-6,-47,12,13,sk);P(-7,-42,1,3,sk);P(6,-42,1,3,sk);P(5,-41,1,7,ss);

if(o.blink){
    P(-4,-41,3,1,'#2a2a3a');P(1,-41,3,1,'#2a2a3a')
}
else{
    P(-4,-42,3,2,'#fff');P(1,-42,3,2,'#fff');P(-3,-42,2,2,'#2a2a3a');P(2,-42,2,2,'#2a2a3a')
}
P(-4,-44,3,1,c.br||c.hair);P(1,-44,3,1,c.br||c.hair);P(0,-39,1,2,ss);P(-2,-36,4,1,c.lip);
if(o.smile){P(-3,-37,1,1,c.lip);P(2,-37,1,1,c.lip);P(-5,-38,2,1,'#f4978e');P(3,-38,2,1,'#f4978e')}}
// Hair / hats 
c.hr&&c.hr(P);if(o.back){c.bx&&c.bx(P)}else c.fx&&c.fx(P);
// glass-hold 
if(gl)glass(x+lp(10,6,gl.l),y+lp(-27,-44,gl.l)-(o.sip?1:0),2,gl.col,gl.lv)}

C[2].bx=P=>{P(-7,-22,14,1,'#ffd166');P(0,-31,1,10,'#ffd166');P(-4,-30,1,1,'#fff')};
C[4].bx=P=>P(0,-16,1,5,'#0b0d14');
C[6].bh='#6b3a4a';C[6].bx=P=>{P(-2,-47,4,4,'#ffe135');P(-2,-43,4,4,'#2d9cff');P(-2,-39,4,4,'#ff3d81');P(-5,-29,10,2,'#c1121f');P(-3,-26,6,1,'#c1121f');P(-6,-30,1,1,'#ddd');P(5,-30,1,1,'#ddd')};
//mountain and roof
const tri=(cx,by,h,hw,c)=>{for(let j=0;j<h;j++){const w=Math.round(hw*j/h);R(cx-w,by-h+j,w*2+1,1,c)}};
// flower
const out=f=>!(f[0]>14&&f[0]<112&&f[1]>108&&f[1]<150)&&!(f[0]>165&&f[0]<350&&f[1]<182)&&!(f[0]>12&&f[0]<108&&f[1]>142&&f[1]<178);
// flw2 = positions/colours of the meadow flowers 
const flw2=[...Array(60)].map((_,i)=>[(i*67+13)%W,124+(i*37)%52,['#ff6b9d','#fff','#ffd93d','#c77dff','#ff9f1c'][i%5]]).filter(out);
// grass blade pos
const bld2=[...Array(220)].map((_,i)=>[(i*41+7)%W,124+(i*67)%54]).filter(out);

function world(T,A){
// Sky gradient 
for(let i=0;i<22;i++)R(0,i*5,W,5,mix('#4fb0f5','#d6f2ff',i/21));
// Sun  
const p=Math.round(A*Math.sin(T*2));E(350,34,18+p,18+p,'#cfe9ff');E(350,34,14,14,'#fff2a8');E(350,34,11,11,'#ffd93d');E(346,30,3,3,'#fff7c2');
// Sun rays 
for(let i=0;i<8;i++){const a=i*Math.PI/4+T*.3*A;R(350+Math.cos(a)*22,34+Math.sin(a)*22,2,2,'#fff2a8')}
// Mountains 
tri(70,112,52,64,'#8aa3c6');tri(150,112,38,50,'#9bb3d3');tri(290,112,56,72,'#8aa3c6');tri(370,112,40,50,'#9bb3d3');
// Snowy mountain caps 
tri(70,72,12,14.8,'#f4f8ff');tri(290,68,12,15.4,'#f4f8ff');
// Drifting clouds 
[[30,24,1],[150,40,.7],[260,18,.5],[340,62,.8]].forEach(c=>{const x=((c[0]+T*A*c[2]*7)%(W+90))-45,y=c[1];[[2,'#cfe3f2'],[0,'#fff']].forEach(l=>{E(x,y+l[0],15,5,l[1]);E(x-9,y+1+l[0],10,4,l[1]);E(x+10,y+1+l[0],11,4,l[1]);E(x+1,y-3+l[0],8,4,l[1])})});
// Hot-air balloon 
const bx=((T*4*A+200)%(W+80))-40,by=50+Math.round(Math.sin(T*.8)*3*A);E(bx,by,9,11,'#e63946');E(bx,by,4,11,'#ffd23f');R(bx-4,by+9,1,5,'#555');R(bx+3,by+9,1,5,'#555');R(bx-3,by+14,7,4,'#b9843f');
// Flying birds 
[[60,56],[90,48],[250,40]].forEach((b,i)=>{const x=((b[0]+T*14*A+i*30)%(W+40))-20,y=b[1]+Math.round(Math.sin(T*3+i)*2*A),f=Math.floor(T*6)%2;R(x,y+f,3,1,'#2b3a4a');R(x+3,y+1-f,3,1,'#2b3a4a')});
// Rolling hills 
E(80,124,110,20,'#8ccf7c');E(320,126,130,22,'#78c46f');E(200,130,120,14,'#6bb866');
// Village houses with chimney smoke 
[96,122,150,352,376].forEach(x=>{R(x,102,11,9,'#f5e6c8');tri(x+5,103,7,8,'#c0392b');R(x+4,106,3,5,'#7a4a21');R(x+8,105,2,2,'#7ec8e3');R(x+8,97,2,4,'#a33');if(A)R(x+8+Math.round(Math.sin(T+x)*2),93-Math.round((T*6)%10),2,2,'#f3f3f3')});
// Windmill tower 
R(25,90,10,22,'#e8d5b0');tri(30,92,6,7,'#c0392b');R(28,104,4,8,'#7a4a21');
// Windmill blades
for(let k=0;k<4;k++){const a=T*.9*A+k*Math.PI/2+.3;for(let s=2;s<15;s++)R(30+Math.cos(a)*s,88+Math.sin(a)*s,2,2,'#8a5a2b')}
// Meadow 
R(0,112,W,113,'#5cbf5f');for(let y=118;y<180;y+=12)R(0,y,W,6,'#55b659');
// Wooden back fence 
for(let x=0;x<W;x+=10){R(x,104,3,14,'#c9a066');R(x,104,3,1,'#e6c590')}R(0,108,W,2,'#b88a50');R(0,113,W,2,'#b88a50');
// Two big trees on the left 
[[10,130],[84,120]].forEach(t=>{const x=t[0],b=t[1],s=Math.sin(T*1.5+x)*1.4*A;R(x-2,b-30,5,30,'#7a4a21');R(x+1,b-30,2,30,'#5e3718');E(x+s,b-38,14,12,'#2b8a3e');E(x-7+s,b-34,9,8,'#2f9e44');E(x+8+s,b-34,9,8,'#2f9e44');E(x-3+s,b-43,7,4,'#51cf66');E(x+5+s,b-40,4,3,'#69db7c')});
// Pond 
E(60,160,44,14,'#4a9fd4');E(60,159,41,11,'#6ec1f0');E(48,155,14,2,'#9ad8f8');
// Reeds 
[[22,152],[100,157]].forEach(r=>{R(r[0],r[1]-6,1,8,'#3f8a3a');R(r[0]+2,r[1]-4,1,6,'#3f8a3a');R(r[0],r[1]-8,2,3,'#8a5a2b')});
// Lily pads 
E(72,164,3,1,'#3c9a4a');E(50,166,3,1,'#3c9a4a');R(72,163,1,1,'#ff9fc4');
// Water sparkles 
for(let i=0;i<4;i++)if(Math.floor(T*2+i)%2)R(40+i*14,157+i%2*4,2,1,'#fff');
// Swimming duck 
const dx=Math.round(60+Math.sin(T*.6)*22*A),fd=Math.cos(T*.6)>=0?1:-1,dy=Math.round(Math.sin(T*3)*.5*A);
// Duck face direction
const DK=(ox,oy,w,h,c)=>R(fd>0?dx+ox:dx+11-ox-w,oy+dy,w,h,c);
DK(0,158,7,3,'#fff');DK(0,156,2,2,'#fff');DK(2,157,3,1,'#e5e7eb');DK(6,155,3,3,'#fff');DK(9,156,2,1,'#f59e0b');DK(7,155,1,1,'#222');
R(fd>0?dx-4:dx+12,161,4,1,'#cfeeff');R(fd>0?dx-7:dx+16,162,3,1,'#b5e3fb');
// Grass blades 
bld2.forEach(b=>{const s=Math.round(Math.sin(T*2+b[0])*A*.6);R(b[0]+s,b[1],1,2,'#3f9e4a');R(b[0]+s,b[1]-1,1,1,'#86dc7a')});
// Meadow flowers 
flw2.forEach(f=>{const s=Math.round(Math.sin(T*2+f[0])*A*.8);R(f[0],f[1],1,5,'#2d8a3a');R(f[0]+1,f[1]+3,2,1,'#2d8a3a');R(f[0]-1+s,f[1]-2,3,3,f[2]);R(f[0]-2+s,f[1]-1,5,1,f[2]);R(f[0]+s,f[1]-3,1,5,f[2]);R(f[0]+s,f[1]-1,1,1,'#ffb703')});
// --- SMALL GARDEN (left background) --- 
{const sw=i=>Math.round(Math.sin(T*2+i)*A*.8);
// Soil bed 
R(20,128,76,14,'#7a4e2d');R(20,128,76,2,'#93603a');for(let i=0;i<3;i++)R(20,132+i*3,76,1,'#5e3a20');
// Plants in the bed: lettuce, staked tomatoes, sunflowers 
for(let i=0;i<8;i++){const x=25+i*9,k=i%3;
if(k==0){E(x,135,3,2,'#43a047');E(x,134,2,1,'#7cc96f')}
else if(k==1){R(x,121,1,15,'#8a5a2b');R(x-1,124+(i%2)*3,3,2,'#e53935');R(x-2,129,3,3,'#43a047');R(x+1,127,3,3,'#43a047')}
else{R(x,118,1,18,'#2d8a3a');E(x+sw(i),116,4,4,'#ffd23f');E(x+sw(i),116,2,2,'#6b3a1e')}}
// Picket fence 
R(18,142,82,1,'#e5e7eb');for(let x=18;x<98;x+=4){R(x,138,2,8,'#fff');R(x,138,2,1,'#e5e7eb')}R(18,128,2,18,'#fff');R(96,128,2,18,'#fff');
// Scarecrow 
R(102,116,1,26,'#8a5a2b');R(96,122,13,1,'#8a5a2b');E(102,118,3,3,'#f2d29b');R(99,113,7,2,'#7a4a21');R(100,111,5,2,'#7a4a21');R(99,123,7,7,'#c0392b');R(101,125,2,2,'#ffe135');R(94,121,2,2,'#e9c46a');R(107,121+sw(3),2,2,'#e9c46a');
// Watering can 
R(22,145,7,4,'#4dabf7');R(29,144,3,1,'#4dabf7');R(21,143,1,4,'#4dabf7');R(22,145,7,1,'#8ccaf9')}

// GARDEN FLOWERS 
{const cs=['#ff6b9d','#fff','#ffd93d','#c77dff','#ff9f1c','#ff4d4d','#4dabf7','#ff8fab'];
const fl=(x,y,c,i,h)=>{const s=Math.round(Math.sin(T*2+i)*A*.8);R(x,y,1,h,'#2d8a3a');R(x-1+s,y-2,3,3,c);R(x-2+s,y-1,5,1,c);R(x+s,y-3,1,5,c);R(x+s,y-1,1,1,i%2?'#ffb703':'#fff3b0')};
// Flowers inside the bed 
for(let i=0;i<19;i++)fl(22+i*4,131+(i%3)*3,cs[i%8],i,4);
// Flower border in front of the fence 
for(let i=0;i<27;i++)fl(19+i*3,148,cs[(i*3)%8],i+7,3);
// Flower patches left and right of the garden 
for(let i=0;i<8;i++){fl(9+(i%4)*3,126+(i>>2)*9+(i%2)*3,cs[(i+2)%8],i+3,4);fl(102+(i%4)*3,128+(i>>2)*8+(i%2)*3,cs[(i+5)%8],i+9,4)}
// Tiny blossoms scattered on the soil 
for(let i=0;i<10;i++){const x=19+i*8;R(x,133+(i%2)*5,2,2,cs[(i+1)%8]);R(x+1,139,1,1,cs[(i+4)%8])}
// More coloured dots on the soil 
for(let x=18;x<98;x+=6){R(x,135+(x%3),1,1,'#ff6b9d');R(x+2,139-(x%2),1,1,'#c77dff')}
// Flowering vines on the fence posts 
R(18,128,2,16,'#43a047');R(96,128,2,16,'#43a047');for(let i=0;i<5;i++){R(18,130+i*3,2,2,cs[i]);R(96,131+i*3,2,2,cs[i+2])}
// Buzzing bee 
if(A){const bx=58+Math.sin(T*1.1)*30,by=124+Math.sin(T*1.7)*6;R(bx,by,2,2,'#ffd23f');R(bx,by,1,1,'#222');R(bx-1,by-1+Math.floor(T*20)%2,1,1,'#e5f4ff')}}
// Bushes 
E(140,158,12,7,'#3a9a4a');E(134,155,7,5,'#4dba5e');E(396,152,12,7,'#3a9a4a');
// Cobblestone path 
R(0,180,W,45,'#e6cf9c');R(0,180,W,2,'#d3b97f');R(0,182,W,1,'#f2e3bd');
// Cobblestones 
for(let r=0;r<5;r++)for(let cx=-6;cx<W;cx+=12){const x=cx+(r%2)*6;R(x,185+r*8,10,6,'#dcc48f');R(x,190+r*8,10,1,'#c9ad73')}
// Lamp post 
R(379,138,2,42,'#444');R(375,134,10,5,'#444');E(380,136,7,7,'rgba(255,240,160,.3)');E(380,136,3,3,'#ffe066');
// Bench 
R(346,166,24,2,'#8a5a2b');R(346,170,24,2,'#8a5a2b');R(346,174,24,3,'#a8692f');R(347,177,2,4,'#5e3718');R(367,177,2,4,'#5e3718');
// Potted plant 
R(336,172,7,7,'#c2410c');E(339,170,4,4,'#3f9b4f');R(338,168,1,1,'#ff6b9d')}

const flw=[...Array(14)].map((_,i)=>[(i*53+9)%W,128+(i*31)%22,['#ff6b9d','#fff','#ffd93d','#c77dff','#ff9f1c'][i%5]]);
const bld=[...Array(90)].map((_,i)=>[(i*41+7)%W,124+(i*67)%28]);
// scene(): the STALL back (drawn in stall coordinates) 
function scene(T,A){
// Tree beside the stall
const sw=Math.sin(T*1.5)*1.6*A;
R(296,70,8,56,'#7a4a21');R(296,70,2,56,'#94602d');R(301,70,3,56,'#5e3718');R(293,122,14,4,'#7a4a21');
E(300+sw,58,22,17,'#2b8a3e');E(292+sw,62,15,11,'#2f9e44');E(310+sw,64,12,10,'#2f9e44');E(296+sw,52,10,6,'#51cf66');E(306+sw,58,5,3,'#69db7c');R(289+sw,66,2,2,'#e03131');R(308+sw,70,2,2,'#e03131');
if(A){const l=(T*.15)%1;R(292-l*34,58+l*66,2,1,'#69db7c')}
// Small bushes by the stall 
E(300,128,12,7,'#3a9a4a');E(294,125,7,5,'#4dba5e');R(298,127,1,1,'#e03131');R(304,129,1,1,'#e03131');E(76,127,8,4,'#3a9a4a');E(73,125,5,3,'#4dba5e');
// Butterfly 
const bx=150+Math.sin(T*.7)*60*A,by=142+Math.sin(T*1.3)*8*A,bf=Math.floor(T*8)%2;R(bx,by,2,2,'#ff6b9d');R(bx+3,by,2,2,'#ff6b9d');if(bf)R(bx+1,by-1,3,1,'#ffb3cf');
// Back wall of the stall 
R(120,58,152,54,'#e9cf9a');for(let i=0;i<19;i++)R(120+i*8,58,1,54,'#d9b878');R(120,92,152,3,'#8a5a2b');R(120,95,152,1,'#6e4521');
// Juice bottles on the shelf 
for(let i=0;i<7;i++){const x=126+i*17,c=['#ff5d73','#ffe347','#ff9f1c','#ffb627','#7bd88f','#c77dff','#ff5d73'][i];R(x,82,5,10,c);R(x+1,79,3,3,'#dff4ff');R(x+1,78,3,1,'#8a5a2b');R(x,82,1,10,'rgba(255,255,255,.4)')}
// Chalkboard 
R(254,64,16,18,'#8a5a2b');R(255,65,14,16,'#26352f');R(257,68,10,1,'#fff');R(257,72,7,1,'#ffe066');R(257,76,9,1,'#fff');
// Wooden posts 
R(114,44,5,92,'#8a5a2b');R(114,44,2,92,'#a8742f');R(273,44,5,92,'#8a5a2b');R(273,44,2,92,'#a8742f')}
// front(): awning, bunting, counter and items drawn IN FRONT of the vendor 
function front(T,A){
// Striped awning 
for(let i=0;i<21;i++){const x=112+i*8,c=i%2?'#fff':'#e63946',d=i%2?'#dfe6ee':'#b81d2c';R(x,40,8,18,c);R(x,40,8,2,d);R(x,58,8,3,c);R(x+1,61,6,1,c);R(x+7,42,1,16,d)}
// Awning ridge 
R(112,38,168,3,'#8a1c2b');
// Bunting string (sagging curve) 
const sg=x=>63+Math.round(Math.sin((x-114)/164*Math.PI)*3);
for(let x=114;x<278;x++)R(x,sg(x)+0,1,1,'#4a4a4a');
// Bunting flags (flutter) 
for(let i=0;i<14;i++){const x=118+i*11,y=sg(x)+1,c=['#ffd23f','#4dabf7','#ff6b9d','#69db7c'][i%4],w=Math.round(Math.sin(T*3+i)*A);R(x,y,6,1,c);R(x+1,y+1,4,1,c);R(x+2,y+2,2,1,c);R(x+2+w,y+3,1,1,c)}
// Counter top and front 
R(110,112,172,6,'#e3aa6a');R(110,112,172,1,'#f6c98a');R(110,117,172,1,'#b9793a');R(110,118,172,20,'#a8692f');R(110,118,172,2,'#ffd23f');
// Counter planks 
for(let i=0;i<14;i++)R(110+i*12,120,1,18,'#8a5a2b');R(110,136,172,2,'#6e4521');
// Painted lemons on the counter front 
[140,200,260].forEach(x=>g.drawImage(spr.lemon,x,122,12,12));
// Fruit baskets 
[122,150].forEach(x=>{R(x,105,24,7,'#b9843f');R(x,105,24,1,'#d9a45a');for(let i=0;i<6;i++)R(x+1+i*4,107,2,1,'#8a5a2b')});
// Fruit in the baskets 
[['straw',124],['orange',134],['lemon',152],['mango',162]].forEach(a=>g.drawImage(spr[a[0]],a[1],96,11,11));
// Glasses on the counter 
glass(176,104,2,'#ff8fab',1);glass(186,104,2,'#ffe066',1)}
// blender 
function blender(sh,lv,c1,c2){const x=238+sh;R(x,104,14,8,'#3a3a46');R(x,104,14,1,'#5a5a6a');R(x+3,107,2,2,'#e63946');R(x+7,107,2,2,'#4dabf7');R(x+10,107,2,2,'#69db7c');R(x+2,84,10,2,'#555');R(x+5,82,4,2,'#777');R(x+1,86,12,18,'#dff4ff');R(x+13,90,2,8,'#8a8a99');
if(lv>0){const h=Math.round(16*lv);R(x+2,104-h,10,h,c1);R(x+2,104-h,10,2,c2)}R(x+1,86,2,18,'rgba(255,255,255,.55)');for(let i=0;i<3;i++)R(x+10,90+i*4,2,1,'#9aa7b2')}
// vendor position
let vX=207,vTx=207,vWait=2,vWalk=false,vi=0,arr=false,wt=0,S='select',t0=0,ch=0,fr=-1,worry='',dis=false,P=[],last=0,lastSay='',lastSp=0,lastBeep=0;
// Predefined encouragement messages
const MSG=["You don't have to figure everything out today.","One little sip, one little step. That's enough for now.","Not every day has to be a good day for you to be doing okay.","Even the smallest moments of joy are worth keeping.","Life can be sour sometimes. Doesn't mean the whole story will be.","Be a little kinder to yourself today. You've made it this far."];
// vendor's dialogue
const say=(t,w='Vendor')=>{$('#who').textContent=w;$('#txt').textContent=t};
const sayOnce=t=>{if(t!=lastSay){lastSay=t;say(t)}};

const SEC={select:'sel',write:'wr',fruit:'fru',blend:'ctl',serve:'ctl',end:'fin'},note=$('#note'),ta=$('#ta');
 
function clearWorry(){worry='';ta.value='';$('#cnt').textContent='0/800';note.hidden=true;note.textContent=''}
function go(n){S=n;t0=performance.now()/1000;lastSay='';
Object.values(SEC).forEach(k=>$('#'+k).hidden=k!=SEC[n]);
if(n=='select'){vi=Math.floor(rnd()*VS.length);arr=false;clearWorry();say("Who's stopping by the juice stand today?",'Pick a character')}
if(n=='write'&&!arr)wt=performance.now()/1000;if(n=='write')say("Hey, there. It's a beautiful day to let something heavy grow a little lighter. What's on your mind?");
if(n=='fruit'){fr=-1;document.querySelectorAll('.fruit').forEach(b=>b.setAttribute('aria-pressed',false));$('#blend').disabled=true;say("Choose you fruit~")}
if(n=='end'){say(MSG[Math.floor(rnd()*MSG.length)]+"\n\nTake a little sweetness with you. The world can wait a moment.");beep(880,.2,'triangle');beep(1175,.3,'triangle')}
const fo={write:'#ta',fruit:'.fruit',end:'#again'}[n];if(fo)setTimeout(()=>{const el=$(fo);el&&el.focus({preventScroll:true})},60)}
// UI
C.forEach((c,i)=>{const b=document.createElement('button');b.className='card';b.setAttribute('aria-pressed',i==ch);b.setAttribute('aria-label','Choose character '+(i+1));b.innerHTML='<canvas width="32" height="64"></canvas>';
const og=g;g=b.firstChild.getContext('2d');char(c,16,62);g=og;
b.onclick=()=>{ch=i;document.querySelectorAll('#chars .card').forEach((x,j)=>x.setAttribute('aria-pressed',j==i));beep(520+i*60)};$('#chars').append(b)});
// Fruit picker cards 
F.forEach((f,i)=>{const b=document.createElement('button');b.className='card fruit';b.setAttribute('aria-pressed',false);b.innerHTML='<canvas width="16" height="16"></canvas>'+f.n+'<small>'+f.d+'</small>';
b.firstChild.getContext('2d').drawImage(spr[f.id],0,0);
b.onclick=()=>{fr=i;document.querySelectorAll('.fruit').forEach((x,j)=>x.setAttribute('aria-pressed',j==i));$('#blend').disabled=false;beep(600+i*90)};$('#fruits').append(b)});
// 'Walk to the Stand' button 
$('#go').onclick=()=>go('write');
// worry box
ta.oninput=()=>$('#cnt').textContent=ta.value.length+'/800';
ta.onkeydown=e=>{if(e.key=='Enter'&&(e.ctrlKey||e.metaKey))$('#pour').click()};
// 'Pour It Out'
$('#pour').onclick=()=>{worry=ta.value;ta.value='';$('#cnt').textContent='0/800';go('fruit')};
// 'Blend My Worries'
$('#blend').onclick=()=>{if(fr<0)return;const w=worry.trim()?worry:'(just a quiet moment)';note.textContent='';
w.split(/(\s+)/).forEach(tk=>{if(!tk)return;if(/^\s+$/.test(tk))note.append(tk);else{const s=document.createElement('span');s.textContent=tk;note.append(s)}});
note.className=w.length>260?'long':'';note.style.opacity=1;note.hidden=false;dis=false;go('blend')};
// Skip animation 
$('#skip').onclick=()=>{t0=performance.now()/1000-(S=='blend'?4.8:7.1)};
// 'Make Another Juice': clears everything, new random vendor, new round 
$('#again').onclick=()=>{clearWorry();vi=Math.floor(rnd()*VS.length);go('write')};
// 'Head Back Into the Sunshine': back to character select (everything cleared) 
$('#exit').onclick=()=>{go('select');say("Thanks for stopping by. The sun's still shining for you. ☀️",'Vendor')};
new ResizeObserver(()=>$('#stage').style.setProperty('--u',$('#stage').clientWidth/320+'px')).observe($('#stage'));
function dissolve(){dis=true;const r=cv.getBoundingClientRect(),tx=r.left+r.width*(245+OX)/W,ty=r.top+r.height*(92+OY)/H,rm=RM.matches;note.classList.add('gone');
note.querySelectorAll('span').forEach(s=>{const b=s.getBoundingClientRect(),d=rnd()*900;
if(rm){s.style.transition='opacity .6s';s.style.opacity=0}else{s.style.transition=`transform 1s ${d}ms ease-in,opacity .8s ${d+250}ms,filter 1s ${d}ms`;
s.style.transform=`translate(${tx-b.left-b.width/2}px,${ty-b.top-b.height/2}px) scale(.15) rotate(${rnd()*360-180}deg)`;s.style.opacity=0;s.style.filter='blur(1.5px)'}});
const f=F[fr];for(let i=0;i<(rm?12:70);i++)P.push({x:245+(rnd()-.5)*80,y:64+(rnd()-.5)*36,tx:245,ty:92,l:1.1,m:1.1,c:i%2?'#3b2a1a':f.j})}
 
function frame(){
const T=performance.now()/1000,e=T-t0,A=RM.matches?0:1,dt=Math.min(.05,T-last||.016);last=T;
world(T,A);g.save();g.translate(OX,OY);scene(T,A);
const f=F[fr]||F[1];let lv=0,vo={},fx=null,sh=0,g2=null,stream=false,pg=null,sip=false,sm=false;
const bl=(T%3.4)<.12;
if(S=='blend'){const p0=[160,102],top=[245,64];let x=p0[0],y=p0[1]+Math.sin(T*3)*A,nx=160,ny=60;
if(e>=1&&e<1.7){const k=ez((e-1)/.7);x=lp(p0[0],top[0],k);y=lp(p0[1],top[1],k)-Math.sin(k*Math.PI)*14;vo.arm='lift'}
if(e>=1.7){x=top[0];y=lp(top[1],92,cl((e-1.7)/.35))}
if(e>=1)nx=x,ny=Math.min(y,64)-0;
nx=e>=1?(e<1.7?x:245):160;ny=e>=1?(e<1.7?y-4:60):60;

note.style.left=(nx+OX)/W*100+'%';note.style.top=(ny+OY)/H*100+'%';
if(e<2.05)fx=[x,y];
// Words dissolve into the blender 
if(e>=1.9&&!dis)dissolve();

if(e>=2.1&&e<4.4){lv=cl((e-2.1)/2.2);if(!A)sh=0;else sh=Math.round(Math.sin(T*50)*1.5);
const n=A?3:(Math.floor(T*10)!=lastSp?1:0);lastSp=Math.floor(T*10);
for(let i=0;i<n&&P.length<300;i++){const a=T*9+rnd()*6.28;P.push({x:245+Math.cos(a)*4,y:90+rnd()*13,vx:-Math.sin(a)*30,vy:-8,l:.5,m:.5,c:[f.j,f.j2,'#fff'][i%3]})}
if(rnd()<(A?.18:.04))P.push({x:240+rnd()*10,y:84,vy:-25,vx:(rnd()-.5)*20,l:.9,m:.9,s:1,c:f.j2})}
if(e>=2.9&&!note.hidden){note.hidden=true;note.textContent='';note.classList.remove('gone');worry=''}
if(e>=2.1&&T-lastBeep>.13){lastBeep=T;beep(110+rnd()*60,.1,'sawtooth',.03)}
if(e>=4.4)lv=1;
sayOnce(e<2.1?'Giving that worry a little whirl~':e<3.4?'Adding a pinch of sugar~':'Almost there!!!');
if(e>=4.8){if(!note.hidden){note.hidden=true;note.textContent='';note.classList.remove('gone')}worry='';go('serve')}}

if(S=='serve'){lv=1-.85*cl(e/1.2);
if(e<1.2){stream=true;g2=[229,104,cl(e/1.2)];sayOnce('Pouring out~')}
else if(e<2.8){g2=[lp(229,140,ez((e-1.2)/1.6)),104,1];sayOnce('And here you go.')}
else if(e<3.5){const k=ez((e-2.8)/.7);g2=[lp(140,160,k),lp(104,145,k),1]}
else{const l=ez(cl((e-3.5)/.6));pg={l,col:f.j,lv:cl(1-.85*(e-3.5)/3)};sip=A&&Math.sin(e*4)>.6;sm=e>4.6;sayOnce('Take your time. No rush.');
if(A&&rnd()<.12)P.push({x:138+rnd()*24,y:120+rnd()*16,vy:-14,l:1.2,m:1.2,s:1,c:'#fff7a8'})}
if(e>=7)go('end')}

if(S=='end'){lv=.1;vo={arm:'wave',w:Math.sin(T*8)>0};pg={l:0,col:f.j,lv:.12};sm=true;if(A&&rnd()<.08)P.push({x:20+rnd()*280,y:60+rnd()*60,vy:-6,l:1.4,m:1.4,s:1,c:'#fff7a8'})}
let ppx=110,ppy=184,back=false,step=0;
if(S=='end'){ppx=150;ppy=172}else if(S!='select'){back=true;const k=cl((T-wt)/2.6);if(!arr&&k<1){ppx=lp(110,150,ez(k));ppy=lp(184,172,ez(k));step=Math.floor(T*7)%2?1:-1}else{arr=true;ppx=150;ppy=172}}
if(S=='blend'||S=='serve'){vTx=222;vWalk=Math.abs(vTx-vX)>.5}
else if((S=='select'||S=='write'||S=='fruit')&&!vWalk){vWait-=dt;if(vWait<=0&&A){vTx=188+rnd()*36;if(Math.abs(vTx-vX)<14)vTx=vX>206?190:222;vWalk=true}}
if(vWalk){const d=vTx-vX,sp=A?Math.min(Math.abs(d),dt*26):Math.abs(d);vX+=Math.sign(d)*sp;if(Math.abs(vTx-vX)<.5){vWalk=false;vWait=2.5+rnd()*4.5}}

const vx=Math.round(vX),vb=vWalk&&A&&Math.floor(T*8)%2?-1:(VS[vi].lively&&A&&!vWalk&&Math.floor(T*3.5)%2?-1:0);
char(VS[vi],vx,124+vb,{...vo,blink:bl,smile:1});front(T,A);
if(fx)g.drawImage(spr[f.id],fx[0]-12,fx[1]-12,24,24);

blender(sh,lv,f.j,f.j2);
if(stream){R(230,99,8,1,f.j);R(230,99,1,5,f.j)}
if(g2)glass(g2[0],g2[1],2,f.j,g2[2]);
char(C[ch],ppx,ppy+(step?0:Math.round(Math.sin(T*2)*.5*A)),{glass:pg,sip,smile:sm,blink:bl,back,step});

for(let i=P.length-1;i>=0;i--){const p=P[i];p.l-=dt;if(p.l<=0){P.splice(i,1);continue}
if(p.tx!=null){p.x+=(p.tx-p.x)*Math.min(1,dt*4);p.y+=(p.ty-p.y)*Math.min(1,dt*4)}else{p.x+=(p.vx||0)*dt;p.y+=(p.vy||0)*dt}
g.globalAlpha=cl(p.l/p.m*1.5);if(p.s){R(p.x,p.y-1,1,3,p.c);R(p.x-1,p.y,3,1,p.c)}else R(p.x,p.y,2,2,p.tx!=null&&p.l<.55?f.j:p.c);g.globalAlpha=1}

g.restore();requestAnimationFrame(frame)}
go('select');requestAnimationFrame(frame);