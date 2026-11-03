// Everyday hand of "Sign Here! The Cursive Course for Adults": a direct port of layout/proto/joins.py (lay) to JavaScript.
// Design units: x-height 1, unslanted; slant applied at the end.
(function(root){
const E={};
let G={},SLANT=0.15838444032453627;
E.init=function(data){G=data.G;SLANT=data.SLANT;E.SLANT0=data.SLANT;};
E.setSlant=function(s){SLANT=s;};
const LIFT_AFTER=new Set('bfgjpqsxyz'),LIFT_BEFORE=new Set('fz'),WAIST_EXIT=new Set('orvw'),OVAL=new Set('acdgoqs'),STEMJOIN=new Set('thk');
const ANG=52*Math.PI/180, SPACE=0.95; let LIFT_GAP=0.30;
const isLower=c=>c>='a'&&c<='z';
function bez(s,n){const o=[];for(let k=0;k<n;k++){const t=n==1?0:k/(n-1),u=1-t;
  o.push([u*u*u*s[0][0]+3*u*u*t*s[1][0]+3*u*t*t*s[2][0]+t*t*t*s[3][0],u*u*u*s[0][1]+3*u*u*t*s[1][1]+3*u*t*t*s[2][1]+t*t*t*s[3][1]]);}return o;}
E.bez=bez;
const sl=P=>P.map(p=>[p[0]+p[1]*SLANT,p[1]]);
E.slant=sl;
function bbox(st){let lo=[1e9,1e9],hi=[-1e9,-1e9];for(const s of st)for(const g of s)for(const p of bez(g,12)){lo[0]=Math.min(lo[0],p[0]);lo[1]=Math.min(lo[1],p[1]);hi[0]=Math.max(hi[0],p[0]);hi[1]=Math.max(hi[1],p[1]);}return [lo,hi];}
function split(seg,t){const P=seg;const a=[0,1,2].map(k=>[P[k][0]+(P[k+1][0]-P[k][0])*t,P[k][1]+(P[k+1][1]-P[k][1])*t]);
  const b=[0,1].map(k=>[a[k][0]+(a[k+1][0]-a[k][0])*t,a[k][1]+(a[k+1][1]-a[k][1])*t]);const m=[b[0][0]+(b[1][0]-b[0][0])*t,b[0][1]+(b[1][1]-b[0][1])*t];
  return [[P[0],a[0],b[0],m],[m,b[1],a[2],P[3]]];}
function tAtY(seg,y){const P=bez(seg,200);let bi=0,bv=1e9;P.forEach((p,i)=>{const v=Math.abs(p[1]-y);if(v<bv){bv=v;bi=i;}});return bi/199;}
const copy=st=>st.map(s=>s.slice());
function glyph(c,i,CUR){if(CUR.has(i))return CUR.get(i);if(!(c in G))return null;return G[c];}
function exitCut(c,st){const s=st[0].slice(),last=s[s.length-1];
  if(WAIST_EXIT.has(c)){s.pop();return [[s].concat(st.slice(1).map(x=>x.slice())),s[s.length-1][3].slice(),'waist'];}
  if(!'ce'.includes(c)&&last[0][1]<0.07&&last[3][1]>0.15&&last[3][0]>last[0][0]){s.pop();return [[s].concat(st.slice(1).map(x=>x.slice())),s[s.length-1][3].slice(),'base'];}
  return [copy(st),last[3].slice(),'base'];}
function entryKind(c){if(OVAL.has(c))return 'oval';if('lb'.includes(c))return 'rise';if(c=='e')return 'e';return 'stem';}
const L_=(a,b)=>[a,[a[0]+(b[0]-a[0])/3,a[1]+(b[1]-a[1])/3],[a[0]+2*(b[0]-a[0])/3,a[1]+2*(b[1]-a[1])/3],b];
const line=(P0,T,n)=>bez(L_(P0,T),n||30);
const add=(P,d)=>P.map(p=>[p[0]+d[0],p[1]+d[1]]);
function minDist(A,B){let m=1e9;for(const a of A)for(const b of B){const dx=a[0]-b[0],dy=a[1]-b[1],d=dx*dx+dy*dy;if(d<m)m=d;}return Math.sqrt(m);}
function inkPts(st,ox){const o=[];for(const s of st)for(const g of s)for(const p of sl(bez(g,16)))o.push([p[0]+ox,p[1]]);return o;}
// lay one word (no digits mixing rules here): returns {place:[[c,ox,i]], conns:[[pts design]], x, CUR}
function lay(word,x){
  const CUR=new Map(),place=[],conns=[];let prev=null;
  for(let i=0;i<word.length;i++){const c=word[i];
    if(c==' '){x+=SPACE;prev=null;continue;}
    let st=glyph(c,i,CUR);if(!st)continue;let [lo,hi]=bbox(st);
    if(!prev){const ox=x-lo[0];place.push([c,ox,i]);prev=[c,ox,i];x=ox+hi[0];continue;}
    const [pc,px,pi]=prev,pst=glyph(pc,pi,CUR);
    if(!((!LIFT_AFTER.has(pc)&&!LIFT_BEFORE.has(c))&&isLower(pc)&&isLower(c))){const ox=x+LIFT_GAP-lo[0];place.push([c,ox,i]);prev=[c,ox,i];x=ox+hi[0];continue;}
    let [pst2,P0,kind]=exitCut(pc,pst);CUR.set(pi,pst2);P0=[P0[0]+px,P0[1]];
    const ek=entryKind(c),s0=st[0][0],stIn=st;
    const build=sh=>{let st=stIn,ox,Q;
      if(kind=='base'){
        if(ek=='oval'){ox=sh+P0[0]+0.22-lo[0];const arc=add(bez(s0,40).slice(0,22).reverse(),[ox,0]);const M=arc[0];let d=[arc[1][0]-M[0],arc[1][1]-M[1]];const n=Math.hypot(d[0],d[1]);d=[d[0]/n,d[1]/n];
          Q=bez([P0,[P0[0]+0.06,P0[1]+(M[1]-P0[1])*0.55],[M[0]-d[0]*0.25,M[1]-d[1]*0.25],M],24).concat(arc.slice(1));}
        else if(ek=='e'){ox=sh+P0[0]+0.36-s0[0][0];Q=line(P0,[s0[0][0]+ox,s0[0][1]]);}
        else if(ek=='rise'){const ty=0.62,t=tAtY(s0,ty),tail=split(s0,t)[1];st=[[tail].concat(stIn[0].slice(1))].concat(stIn.slice(1).map(z=>z.slice()));
          const dy=ty-P0[1],dx=dy/Math.tan(ANG)-dy*SLANT;ox=sh+P0[0]+dx-tail[0][0];Q=line(P0,[tail[0][0]+ox,tail[0][1]]);}
        else if(STEMJOIN.has(c)){const Tl=s0[0],Ym=0.95,dy=Ym-P0[1],dx=dy/Math.tan(ANG)-dy*SLANT;ox=sh+P0[0]+dx-Tl[0];const T1=[Tl[0]+ox,Ym],T=[Tl[0]+ox,Tl[1]];Q=line(P0,T1,22).concat(line(T1,T,10));}
        else{const Tl=s0[0],dy=Tl[1]-P0[1],dx=dy/Math.tan(ANG)-dy*SLANT;ox=sh+P0[0]+dx-Tl[0];Q=line(P0,[Tl[0]+ox,Tl[1]]);}
      }else{const Y=1.0,A=[P0[0]+0.10,Y],rise=bez([P0,[P0[0]+0.04,P0[1]+(Y-P0[1])*0.8],[A[0]-0.04,A[1]],A],8);
        if(ek=='oval'){ox=sh+P0[0]+0.16-lo[0];const arc=add(bez(s0,40).slice(0,22).reverse(),[ox,0]);const M=arc[0];let d=[arc[1][0]-M[0],arc[1][1]-M[1]];const n=Math.hypot(d[0],d[1]);d=[d[0]/n,d[1]/n];
          Q=rise.concat(bez([A,[A[0]+0.12,A[1]],[M[0]-d[0]*0.12,M[1]-d[1]*0.12],M],14),arc.slice(1));}
        else if(ek=='rise'){const t=tAtY(s0,Y),tail=split(s0,t)[1];st=[[tail].concat(stIn[0].slice(1))].concat(stIn.slice(1).map(z=>z.slice()));
          ox=sh+P0[0]+0.42-tail[0][0];Q=rise.concat(line(A,[tail[0][0]+ox,tail[0][1]],16));}
        else if(ek=='e'){ox=sh+P0[0]+0.45-s0[0][0];const T=[s0[0][0]+ox,s0[0][1]];Q=rise.concat(bez([A,[A[0]+0.14,A[1]],[T[0]-0.14,T[1]-0.06],T],20));}
        else if(STEMJOIN.has(c)){const Tl=s0[0];ox=sh+P0[0]+0.42-Tl[0];const T1=[Tl[0]+ox,Y],T=[Tl[0]+ox,Tl[1]];Q=rise.concat(line(A,T1,14),line(T1,T,8));}
        else{const Tl=s0[0];ox=sh+P0[0]+0.42-Tl[0];Q=rise.concat(line(A,[Tl[0]+ox,Tl[1]],16));}
      }
      return [ox,Q,st];};
    let sh=0,ox,Q;
    for(let k=0;k<10;k++){[ox,Q,st]=build(sh);const dmin=minDist(inkPts(pst2,px),inkPts(st,ox));if(dmin>=0.30)break;sh+=Math.max(0.04,0.30-dmin);}
    if(st!==stIn)CUR.set(i,st);
    if(c=='t'&&kind=='waist'&&st.length>1){const bar=st[1][0],xs=st[0][0][0][0];st=[st[0],[L_([xs,bar[0][1]],bar[3])]].concat(st.slice(2).map(z=>z.slice()));CUR.set(i,st);}
    place.push([c,ox,i]);conns.push(Q);prev=[c,ox,i];const bb=bbox(st);x=ox+bb[1][0];
  }
  place.forEach(([c,px,i],k)=>{const nx=place[k+1];const jn=nx&&nx[2]==i+1&&!LIFT_AFTER.has(c)&&!LIFT_BEFORE.has(nx[0])&&isLower(c)&&isLower(nx[0]);
    if(c=='o'&&!jn&&!CUR.has(i))CUR.set(i,exitCut('o',G['o'])[0]);});
  return {place,conns,x,CUR};
}
// a whole line as in fig_ch11.eline: digit groups unjoined with a 0.25 gap, words joined, spaces SPACE.
// returns {strokes:[[pts on page]], dots:[[x,y]], starts:[[x,y]], x1} in design units, origin at baseline x=0
E.line=function(text){
  const toks=text.match(/[0-9]+|[^0-9 ]+| /g)||[];let x=0;const out={strokes:[],dots:[],starts:[],x1:0};
  for(const tok of toks){if(tok==' '){x+=SPACE;continue;}
    const keep=LIFT_GAP;if(/^[0-9]+$/.test(tok))LIFT_GAP=0.25;
    const r=lay(tok,0);LIFT_GAP=keep;
    let xmax=-1e9;
    r.place.forEach(([c,px,i],k)=>{const st=glyph(c,i,r.CUR);
      const joinedPrev=k>0&&r.place[k-1][2]==i-1&&!LIFT_AFTER.has(r.place[k-1][0])&&!LIFT_BEFORE.has(c)&&isLower(r.place[k-1][0])&&isLower(c);
      st.forEach((s,si)=>{let P=[];s.forEach(g=>P=P.concat(sl(bez(g,40))));P=P.map(p=>[p[0]+px+x,p[1]]);
        let ax=0,ay=0;for(const p of P){ax=Math.max(ax,Math.abs(p[0]-P[0][0]));ay=Math.max(ay,Math.abs(p[1]-P[0][1]));}
        if(ax+ay<0.1)out.dots.push(P[0]);else out.strokes.push(P);
        for(const p of P)xmax=Math.max(xmax,p[0]);
        if(si==0&&!joinedPrev&&!',.'.includes(c))out.starts.push(P[0]);});});
    r.conns.forEach(Q=>{const P=sl(Q).map(p=>[p[0]+x,p[1]]);out.strokes.push(P);for(const p of P)xmax=Math.max(xmax,p[0]);});
    x=xmax;
  }
  out.x1=x;return out;
};
E._lay=lay;
root.HWS=E;
if(typeof module!=='undefined')module.exports=E;
})(typeof window!=='undefined'?window:globalThis);
