var Q="#111",k="#888",F="#222",A="#333",x="#fff",X="#000",Z="#ddd",K="#f80",J="#ff0",w="hsl(180deg,100%,50%)",ee="hsl(90deg,100%,50%)",te="hsl(45deg,100%,50%)";var j=(t,e,i)=>{let h=i*.8660254037844386,r=i/2,a=new Path2D;return a.moveTo(t,e-i),a.lineTo(t+h,e-r),a.lineTo(t+h,e+r),a.lineTo(t,e+i),a.lineTo(t-h,e+r),a.lineTo(t-h,e-r),a.closePath(),a},M=(t,e,i)=>{let h=i*.8660254037844386;return t<0&&(t*=-1),e<0&&(e*=-1),h<t?!1:(e-i)*h+t*i/2<=0};function N(t,e=""){if(!t)throw e}function oe(t=""){throw t}var{add:$,sub:R,mul:I}=(await WebAssembly.instantiate(Uint8Array.from(atob("AGFzbQEAAAABBwFgAn9/AX8DBAMAAAAHEwMDYWRkAAADc3ViAAEDbXVsAAIKPwMXACAAIABBhwFqQfl+IABrIAFLGyABagsTACAAQYcBayAAIAAgAUkbIAFrCxEAIAGtIACtfkL5/v//D4KnCwAOBG5hbWUCBwMAAAEAAgA="),t=>t.charCodeAt(0)))).instance.exports,z=104,ne=104,re=[[0,1],[1,0],[1,-1],[0,-1],[-1,0],[-1,1]],ie=t=>{N(t.width<z&&t.height<ne);let e="";for(let i=0;i<t.d.length;i++){let h=t.d[i];for(let r=0;r<h.length;r++){let a=h[r];a[0]===3&&(e+=String.fromCharCode((i*z+r)*6+a[2]))}}return[[e],[Int32Array.of(1)],[Float64Array.of(1)]]},se=([t,e,i],h)=>{N(h.width<z&&h.height<ne);let r=new Map;for(let l=0;l<t.length;l++){let s=[],u=t[l];for(let g=0;g<u.length;g++){let b=u.charCodeAt(g),P=b%6;s.push([(b/(6*z)>>>0)+re[P][0],(b/6%z>>>0)+re[P][1],P])}let n=[s],m=[1],f=[1],C=[1],v=[0];for(let g=0;g<s.length;g++){let b=s[g][0],P=s[g][1],q=s[g][2],H=h.d[b]?.[P];if(H==null)return;switch(H[0]){case 2:case 3:case 4:break;case 5:{let d=(H[2]+6-q)%6;if(q===d)return;s[g][2]=d;break}case 6:{let d=(H[2]+6-q)%6;if(q===d)return;let T=[b,P,d],y=n.length;for(let S=0;S<y;S++){n.push(n[S].with(g,T));let V=(C[S]+v[S])/2,O=(C[S]-v[S])/2;m.push(I(m[S],-18083855)),f.push(I(f[S],18083721)),C.push(V),v.push(0-O),m[S]=I(m[S],18083721),f[S]=I(f[S],-18083855),C[S]=O,v[S]=V}break}case 10:{let d=(H[2]+6-q)%6;if(q===d)break;s.some(T=>T[0]===b&&T[1]===P&&T[2]*2%6===H[2])&&(s[g][2]=d);break}case 7:{if(!H[2])break;for(let d=0;d<m.length;d++)m[d]=R(0,m[d]),f[d]=R(0,f[d]),C[d]*=-1,v[d]*=-1;break}case 8:{if(!H[2])break;for(let d=0;d<m.length;d++){m[d]=I(m[d],36167441),f[d]=I(f[d],-36167576);let T=C[d];C[d]=0-v[d],v[d]=T}break}case 9:{if(!H[2])break;for(let d=0;d<m.length;d++){m[d]=I(m[d],-2123366712),f[d]=I(f[d],-452840752);let T=(C[d]+v[d])*Math.SQRT1_2;C[d]=(C[d]-v[d])*Math.SQRT1_2,v[d]=T}break}default:return}}e:for(let g=0;g<n.length;g++){let b=n[g].map(T=>String.fromCharCode((T[0]*z+T[1])*6+T[2])),P=0;for(let T=0;T<b.length;T++)for(let y=T+1;y<b.length;y++){if(b[T]===b[y])continue e;if(b[T]>b[y]){let S=b[T];b[T]=b[y],b[y]=S,P^=1}}let q=P?[l,R(0,m[g]),R(0,f[g]),0-C[g],0-v[g]]:[l,m[g],f[g],C[g],v[g]],H=b.join(""),d=r.get(H);d?d.push(q):r.set(H,[q])}}let a=[],c=[];for(let l of r.entries()){let s=l[1],u=0;for(let n=0;n<s.length;n++){let m=s[n][0],f=0;for(let C=0;C<s.length;C++)f=$(f,I(e[m][s[C][0]],s[C][2]));u=$(u,I(s[n][1],f))}u!==0&&(a.push(l[0]),c.push(s))}let p=[],o=[];for(let l=0;l<c.length;l++){let s=c[l],u=new Int32Array(c.length),n=new Float64Array(c.length);for(let m=0;m<c.length;m++){let f=c[m],C=0,v=0;for(let g=0;g<s.length;g++){let b=s[g][0],P=e[b],q=i[b],H=0,d=0,T=0;for(let y=0;y<f.length;y++){let S=f[y][0];H=$(H,I(P[S],f[y][2])),d+=q[S]*f[y][3]-i[S][b]*f[y][4],T+=i[S][b]*f[y][3]+q[S]*f[y][4]}C=$(C,I(s[g][1],H)),v+=d*s[g][3]+T*s[g][4]}u[m]=C,n[m]=v}p.push(u),o.push(n)}return[a,p,o]},le=([t],e)=>{for(let i=0;i<t.length;i++){let h=t[i];for(let r=0;r<h.length;r++){let a=h.charCodeAt(r),c=a/(6*z)>>>0,p=a/6%z>>>0,o=a%6,l=e.d[c][p];if(l[0]!==4||l[2]!==o)return!1}}return!0};var _=t=>{let e=1/0;for(let h=0;h<t.length;h++){if(!t[h])continue;let r=t[h].match(/\S/).index-h;r<e&&(e=r)}let i=[];for(let h=0;h<t.length;h++){let r=[];if(i.push(r),!t[h])continue;let a=e+h;for(;a<0;)r.push([0]),a+=2;for(;a<t[h].length;a+=2){let c=t[h][a],p=Number(t[h][a+1]);switch(c){case" ":r.push([0]);break;case"_":r.push([1]);break;case".":r.push([2]);break;case"p":r.push([3,0,p]);break;case"q":r.push([4,0,p]);break;case"m":r.push([5,0,p]);break;case"M":r.push([5,1,p]);break;case"h":r.push([6,0,p]);break;case"H":r.push([6,1,p]);break;case"c":r.push([10,0,p]);break;case"C":r.push([10,1,p]);break;case"z":r.push([7,0,p]);break;case"Z":r.push([7,1,p]);break;case"s":r.push([8,0,p]);break;case"S":r.push([8,1,p]);break;case"t":r.push([9,0,p]);break;case"T":r.push([9,1,p]);break;default:oe()}}}return i},Y=class{d;#t;#e;#o;constructor(e){this.d=structuredClone(e),this.#t=Math.max(...e.map(i=>i.length));{let i=-1/0,h=1/0;for(let r=0;r<e.length;r++){let a=e[r];for(let c=0;c<a.length;c++){if(a[c][0]===0)continue;let o=c*2+r;o>i&&(i=o),o<h&&(h=o)}}this.#e=(h+i)*.4330127018922193}this.#o=(this.height-1)*.75}get width(){return this.#t}get height(){return this.d.length}draw(e,i,h,r=0){let{ctx:a,r:c}=e,p=c*.8660254037844386,o=e.width/2-this.#e*c,l=e.height/2-this.#o*c;for(let s=0;s<this.d.length;s++){let u=this.d[s];for(let n=0;n<u.length;n++){let m=u[n];e.drawCell((n*2+s)*p+o,s*c*1.5+l,m,m[1]&&i===m?5:1)}}if(h){let s=new Float64Array(65536);for(let n=0;n<h[0].length;n++){let m=h[2][n][n],f=h[0][n];for(let C=0;C<f.length;C++)s[f.charCodeAt(C)]+=m}let u=[[0,p*2],[c*1.5,p],[c*1.5,0-p],[0,p*-2],[c*-1.5,0-p],[c*-1.5,p]];for(let n=0;n<this.d.length;n++){let m=this.d[n];for(let f=0;f<m.length;f++){let C=(f*2+n)*p+o,v=n*c*1.5+l;for(let g=0;g<6;g++){let b=s[(n*z+f)*6+g];b!==0&&(a.beginPath(),a.arc(C+u[g][1]*r,v+u[g][0]*r,c/7,0,Math.PI*2),a.fillStyle=`rgb(255,255,0,${b*.75+.25})`,a.fill())}}}}for(let s=0;s<this.d.length;s++){let u=this.d[s];for(let n=0;n<u.length;n++){let m=u[n];e.drawCell((n*2+s)*p+o,s*c*1.5+l,m,i===m?6:2)}}}mouseTouching(e){let{mouseX:i,mouseY:h}=e,{r}=e,a=r*.8660254037844386,c=e.width/2-this.#e*r,p=e.height/2-this.#o*r;for(let o=0;o<this.d.length;o++){let l=this.d[o];for(let s=0;s<l.length;s++){let u=l[s],n=(s*2+o)*a+c,m=o*r*1.5+p;if(u[0]!==0&&M(i-n,h-m,r*.875))return u}}}run(e){return new Promise(i=>{let h=ie(this),r=Date.now(),a=()=>{e.clear(),this.draw(e,void 0,h,(Date.now()-r)/300);let{r:o,ctx:l}=e,s=e.width-o*1.2,u=e.height-o*1.2,n=M(e.mouseX-s,e.mouseY-u,o*.875);return e.ophex(n?A:F,n?x:k,s,u),l.beginPath(),l.moveTo(s+o/3,u+o/3),l.lineTo(s-o/3,u-o/3),l.moveTo(s+o/3,u-o/3),l.lineTo(s-o/3,u+o/3),l.strokeStyle=x,l.lineWidth=o/15,l.stroke(),n};e.onclick=()=>{a()&&(clearInterval(c),clearInterval(p),e.onclick=void 0,i(!1))};let c=setInterval(a),p=setInterval(()=>{let o=se(h,this);o?h=o:(clearInterval(c),clearInterval(p),e.onclick=void 0,i(!1)),le(h,this)&&(clearInterval(c),clearInterval(p),e.onclick=void 0,i(!0)),r=Date.now()},300)})}play(e){return new Promise(i=>{let h=Date.now(),r=0,a=()=>{let l=this.mouseTouching(e);e.clear(),this.draw(e,l);let{ctx:s,r:u}=e;{let n=e.width-u*1.2,m=e.height-u*1.2;e.ophex(M(e.mouseX-n,e.mouseY-m,u*.875)?"#252":"#232","#0f0",n,m),s.fillStyle="#0c0",s.beginPath(),s.moveTo(n+u/2,m),s.lineTo(n-u/4,m-u*.4330127018922193),s.lineTo(n-u/4,m+u*.4330127018922193),s.closePath(),s.fill()}{let n=u*1.2,m=e.height-u*1.2,f=M(e.mouseX-n,e.mouseY-m,u*.875);e.ophex(f?A:F,f?x:k,n,m),s.beginPath(),s.moveTo(n+u/3,m+u/3),s.lineTo(n-u/3,m-u/3),s.moveTo(n+u/3,m-u/3),s.lineTo(n-u/3,m+u/3),s.strokeStyle=x,s.lineWidth=u/15,s.stroke()}};a();let c=a,p=a,o=async()=>{let l=Date.now(),s=this.mouseTouching(e);if(!s){M(e.width-e.r*1.2-e.mouseX,e.height-e.r*1.2-e.mouseY,e.r*.875)&&(r+=1,e.onresize=void 0,e.onclick=void 0,e.onmousemove=void 0,await this.run(e)?(await this.accepted(e,l-h,r),i()):(e.onresize=c,e.onclick=o,e.onmousemove=p,a())),M(e.r*1.2-e.mouseX,e.height-e.r*1.2-e.mouseY,e.r*.875)&&(e.onresize=void 0,e.onclick=void 0,e.onmousemove=void 0,i());return}if(s[1]){switch(r+=1,s[0]){case 5:case 6:case 10:s[2]=(s[2]+1)%6;break;case 7:case 8:case 9:s[2]^=1;break}a()}};e.onresize=c,e.onclick=o,e.onmousemove=p})}accepted(e,i,h){return new Promise(r=>{let a=()=>{e.clear(),e.text("Accepted",e.width/2,e.height/4,x,`300 ${e.r}px monospace`),e.ctx.beginPath(),e.ctx.moveTo(e.width*.38,e.height/4+e.r*.6),e.ctx.lineTo(e.width*.62,e.height/4+e.r*.6),e.ctx.strokeStyle=x,e.ctx.lineWidth=e.r/20,e.ctx.stroke(),e.text(`Time  ${String(Math.floor(i/6e4)).padStart(5," ")}:${String(Math.floor(i/1e3)).padStart(2,"0")}`,e.width/2,e.height/2,x,`300 ${e.r*.75}px monospace`),e.text(`Click ${String(h).padStart(8," ")}`,e.width/2,e.height/2+e.r,x,`300 ${e.r*.75}px monospace`)};a(),e.onresize=a;let c=()=>{e.onresize=void 0,e.elem.removeEventListener("click",c),r()};e.elem.addEventListener("click",c)})}};var L=class{constructor(e=document.createElement("canvas")){this.elem=e;this.ctx=e.getContext("2d"),e.addEventListener("mousemove",i=>{this.#t=i.offsetX,this.#e=i.offsetY,this.onmousemove?.(i)}),new ResizeObserver(()=>this.onresize?.()).observe(e),e.addEventListener("click",i=>this.onclick?.(i))}ctx;onresize;onclick;onmousemove;#t=0;#e=0;get width(){return this.elem.width}get height(){return this.elem.height}get mouseX(){return this.#t}get mouseY(){return this.#e}get r(){return this.width/30}text(e,i,h,r,a){this.ctx.font=a,this.ctx.fillStyle=r;let{actualBoundingBoxLeft:c,actualBoundingBoxRight:p,actualBoundingBoxAscent:o,actualBoundingBoxDescent:l}=this.ctx.measureText(e);this.ctx.fillText(e,i+(c-p)/2,h+(o-l)/2)}ophex(e,i,h,r,a=this.r){let c=j(h,r,a*.875);this.ctx.fillStyle=e,this.ctx.strokeStyle=i,this.ctx.lineWidth=a/20,this.ctx.fill(c),this.ctx.stroke(c)}hex(e,i,h=this.r){let r=j(e,i,h*.875);this.ctx.fillStyle=F,this.ctx.strokeStyle=k,this.ctx.lineWidth=h/20,this.ctx.fill(r),this.ctx.stroke(r)}clear(){this.ctx.reset(),this.ctx.fillStyle=Q,this.ctx.fillRect(0,0,this.width,this.height)}drawCell(e,i,h,r=3){if(r&1){if(h[0]===0)return;if(h[0]===1){let a=j(e,i,this.r*.875);this.ctx.fillStyle=F,this.ctx.fill(a)}else r&4?this.ophex(A,x,e,i):h[1]?this.ophex(F,x,e,i):this.hex(e,i);if(h[0]===3||h[0]===4){let a=this.r*Math.sin(h[2]*Math.PI/3)/2,c=this.r*Math.cos(h[2]*Math.PI/3)/2;this.ctx.beginPath(),this.ctx.moveTo(e+a,i-c),this.ctx.lineTo(e+c,i+a),this.ctx.lineTo(e-a,i+c),this.ctx.moveTo(e+c,i+a),this.ctx.lineTo(e-c,i-a),this.ctx.strokeStyle=h[0]===3?K:J,this.ctx.lineWidth=this.r/15,this.ctx.stroke()}}if(r&2)switch(h[0]){case 5:{let a=this.r*Math.sin(h[2]*Math.PI/6)/2,c=this.r*Math.cos(h[2]*Math.PI/6)/2;this.ctx.beginPath(),this.ctx.moveTo(e+c,i+a),this.ctx.lineTo(e-c,i-a),this.ctx.strokeStyle=Z,this.ctx.lineWidth=this.r/15,this.ctx.stroke();break}case 6:{let a=this.r*Math.sin(h[2]*Math.PI/6)/2,c=this.r*Math.cos(h[2]*Math.PI/6)/2;this.ctx.beginPath(),this.ctx.moveTo(e+c,i+a),this.ctx.lineTo(e+c/6,i+a/6),this.ctx.moveTo(e-c,i-a),this.ctx.lineTo(e-c/6,i-a/6),this.ctx.strokeStyle=Z,this.ctx.lineWidth=this.r/15,this.ctx.stroke();break}case 10:{let a=this.r*Math.sin(h[2]*Math.PI/6)/2,c=this.r*Math.cos(h[2]*Math.PI/6)/2;this.ctx.beginPath(),this.ctx.moveTo(e+c+a/5,i+a-c/5),this.ctx.lineTo(e-c+a/5,i-a-c/5),this.ctx.moveTo(e+c-a/5,i+a+c/5),this.ctx.lineTo(e-c-a/5,i-a+c/5),this.ctx.strokeStyle=Z,this.ctx.lineWidth=this.r/15,this.ctx.stroke();break}case 7:{this.ctx.fillStyle=h[2]?w:k,this.ctx.fill(j(e,i,this.r/2)),this.text("Z",e,i,X,`300 ${this.r/2}px monospace`);break}case 8:{this.ctx.fillStyle=h[2]?ee:k,this.ctx.fill(j(e,i,this.r/2)),this.text("S",e,i,X,`300 ${this.r/2}px monospace`);break}case 9:{this.ctx.fillStyle=h[2]?te:k,this.ctx.fill(j(e,i,this.r/2)),this.text("T",e,i,X,`300 ${this.r/2}px monospace`);break}}}};var G=[{name:"Tutorial 1",field:["p0....m2","     ..","    M5....q0"]},{name:"Tutorial 2",field:["M1..M3"," ....","  q3..M5"," ......","p5  M4"]},{name:"Snow",field:["   m0","m4M5m1m2"," p4m0q4","m2m1m5m4","   m0"]},{name:"Half Mirror",field:["p1  q5"," ....","  H3","   ..","    q1"]},{name:"Michelson Imitation",field:["  p1","   ..","q3..H3..m3","     ..","      m5"]},{name:"Mach-Zehnder Imitation",field:["p0..h2..m2","   ..  ..","  M0..H3..q0"]},{name:"Feint",field:["p0..h2..M3","   ..  ..","  m2......m2","     ..  ..","    M1..H4","       ..","      q2"]},{name:"Butterfly",field:["    m0","   ....","  H1  .."," ..    ..","m2..q3p0H1......m2","         ..    ..","          q1  H1","           ....","            m0"]},{name:"Three Half Mirrors",field:["m4p0H5m1"," ..  m1H3m1","  ..    m1H3","   h4......m4","    q1"]},{name:"Z Gate",field:["p0..h2Z0m2","   ..  ..","  M0z1h2..q0"]},{name:"S Gate",field:["p0..h2S0S0m2  m5S1h5..q0","   ..    S0  s1  ..","  m2z1..h2..h5Z0m5"]},{name:"T Gate",field:["q3p0..h2..t1m2","     t1    ..","    T0    Z1","   m2t1S0h2..m3"]},{name:"Infinity",field:["  m5p0m1  m5S1m1"," T1    h5h1    ..","m3      ..      m3"," Z1    ....    t1","  m1s1m5  m1q3m5"]},{name:"Counting Backwards",field:["p0..h2..h2s1m2","   ..  S1  z1","  h2S1..Z1h2"," S1  Z1  ..","m2Z1h2..h2..q0"]},{name:"Cousin",field:["p1  m0  m1"," ..T1..T1","  h0  h0"," ..S1..S1","q2  m0  m5"]},{name:"Double",field:[" p0..M3","q4    .."," ..    q1","  M4..p3"]},{name:"Time Lag",field:["      q5","     ..","p0..M5....p3","   ..","  .."," q2"]},{name:"CMirror",field:["  M3  p2","   ....","p0..c4","   ....","  M5..q1..q0"]},{name:"Redelivery",field:["   M3","    p1"," M3  ..","M3p0..c2....q0","     ..q4","    ..  ..","   M5    M1"]},{name:"Puffer",field:["          M5........M3"," q3....p1M2..m1m5..M1M1","    q3p0c0m1m5c0m1m5c0m3","       p5m1c0m5m1c0m5m5","      q2"]},{name:"Entanglement",field:["  p0q3m1  M5........q0","       ....","p0q3h2..c0..m3","   ..    ..","  S0      M1........q0"," T0","m1"]},{name:"Pauli Exclusion Principle",field:["  p1","   ..","p0..H3..m1  q5","     ..  ....","      m1..C2..q0"]},{name:"Shu",field:[" q4","  p1q5M3","   ..T1S1","p0h2C2..M1"," ..  ..","M0t1..M1"]},{name:"Mie",field:["        q5","   m5q5p2","    T1.."," p0H1c0t1m3","  z1S0"," t1m1","m1"]},{name:"Daphnia",field:["      m5","       s1","    M5t1H1S1m3","     ..  ..","q3p0..c2..C2","   q3p0h4..m4","    m2z1h2..m3","       S1","      m1"]},{name:"SOY",field:["    m0  p2m0"," M4Z1S1t1z1s1","m3c0..c0h2p3M4","   ..q5..","    m0q2"]}];var ae=t=>new Promise(e=>{let i,h=()=>{i=void 0,t.clear(),t.text("- Unphoton -",t.width/2,t.width/15,x,`300 ${t.r*1.2}px monospace`);let r=t.r,a=r*.8660254037844386,c=t.width/2-a*7.5,p=t.height/3;for(let o=0;o<4;o++)for(let l=0;l<8;l++){let s=o*8+l,u=(l*2+o%2)*a+c,n=o*r*1.5+p,m=M(t.mouseX-u,t.mouseY-n,r*.875);s===30?(m?t.ophex(A,x,u,n):t.hex(u,n),t.text("?",u,n,m?x:k,`300 ${r}px monospace`),m&&(i=-2,t.text("About",t.width/2,t.width/2,x,`300 ${r*.7}px monospace`))):s===31?(m?t.ophex(A,x,u,n):t.hex(u,n),t.ctx.fillStyle="#fff",t.ctx.beginPath(),t.ctx.moveTo(u,n+r/2),t.ctx.lineTo(u+a/2,n-r/4),t.ctx.lineTo(u-a/2,n-r/4),t.ctx.closePath(),t.ctx.stroke(),m&&(i=-1,t.text("Stage Editor",t.width/2,t.width/2,x,`300 ${r*.7}px monospace`))):s>=G.length?t.hex(u,n):m?(t.ophex(A,x,u,n),t.text(String(s+1),u,n,x,`300 ${r*.7}px monospace`),t.text(G[s]?.name,t.width/2,t.width/2,x,`300 ${r*.7}px monospace`),i=s):(t.hex(u,n),t.text(String(s+1),u,n,k,`300 ${r*.7}px monospace`))}};h(),t.onresize=h,t.onclick=()=>{h(),i===-2?window.open("https://github.com/Yukkku/Unphoton/blob/main/about.md"):i!=null&&(t.onresize=void 0,t.onclick=void 0,t.onmousemove=void 0,e(i))},t.onmousemove=h});var E=[[2],[3,0,0],[4,0,0],[5,0,4],[6,0,4],[10,0,4],[7,0,1],[8,0,1],[9,0,1]],U=(t,e)=>new Promise(i=>{let h=[];if(e){let o=pe(e);o&&(h=o)}if(h.length===0)for(let o=0;o<10;o++){let l=[];for(let s=o;s<10;s+=2)l.push([0]);for(let s=0;s<12;s++)l.push([1]);h.push(l)}let r=0,a=new Y(h),c=()=>{t.clear();let{ctx:o,r:l}=t,s=l*.4330127018922193,u=t.height/2-l*6;for(let n=0;n<E.length;n++)t.drawCell(n&1?u+s:u-s,u+l*1.5*n,E[n],r===n?7:3);a.draw(t);{let n=t.width-l*1.2,m=t.height-l*1.2;t.ophex(M(t.mouseX-n,t.mouseY-m,l*.875)?"#252":"#232","#0f0",n,m),o.fillStyle="#0c0",o.beginPath(),o.moveTo(n+l/2,m),o.lineTo(n-l/4,m-s),o.lineTo(n-l/4,m+s),o.closePath(),o.fill()}{let n=t.width-l*1.2-s*2,m=t.height-l*2.7,f=M(t.mouseX-n,t.mouseY-m,l*.875);t.ophex(f?A:F,f?x:k,n,m),o.beginPath(),o.moveTo(n+l/5,m+s*.8),o.lineTo(n-l*.4,m),o.lineTo(n+l/5,m-s*.8),o.strokeStyle=f?x:k,o.lineWidth=l/20,o.stroke(),o.fillStyle=f?x:k,o.beginPath(),o.arc(n+l/5,m+s*.8,l/10,0,Math.PI*2),o.fill(),o.beginPath(),o.arc(n-l*.4,m,l/10,0,Math.PI*2),o.fill(),o.beginPath(),o.arc(n+l/5,m-s*.8,l/10,0,Math.PI*2),o.fill()}{let n=t.width-l*1.2,m=t.height-l*4.2,f=M(t.mouseX-n,t.mouseY-m,l*.875);t.ophex(f?A:F,f?x:k,n,m),o.strokeStyle=f?x:k,o.lineWidth=l/20,o.beginPath(),o.moveTo(n+l/3,m+l/3),o.lineTo(n-l/3,m-l/3),o.moveTo(n+l/3,m-l/3),o.lineTo(n-l/3,m+l/3),o.stroke()}{let n=t.width-l*1.2-s*2,m=t.height-l*5.7,f=M(t.mouseX-n,t.mouseY-m,l*.875);t.ophex(f?A:F,f?x:k,n,m),f?t.ophex(A,x,n,m):t.hex(n,m),t.text("?",n,m,f?x:k,`300 ${l}px monospace`)}};c(),t.onresize=c,t.onmousemove=c;let p=async()=>{let o=a.mouseTouching(t);if(!o){let l=t.r,s=l*.4330127018922193,u=t.height/2-l*6;for(let n=0;n<E.length;n++)M((n&1?u+s:u-s)-t.mouseX,u+l*1.5*n-t.mouseY,l*.875)&&(r=n,c());M(t.width-l*1.2-t.mouseX,t.height-l*1.2-t.mouseY,l*.875)?(t.onresize=void 0,t.onmousemove=void 0,t.onclick=void 0,await a.run(t),t.onresize=c,t.onmousemove=c,t.onclick=p,c()):M(t.width-l*1.2-s*2-t.mouseX,t.height-l*2.7-t.mouseY,l*.875)?(t.onresize=()=>{c(),t.ctx.fillStyle="rgba(0 0 0/0.5)",t.ctx.fillRect(0,0,t.width,t.height)},t.onmousemove=void 0,t.onclick=void 0,t.onresize(),await ue(a),t.onresize=c,t.onmousemove=c,t.onclick=p,c()):M(t.width-l*1.2-t.mouseX,t.height-l*4.2-t.mouseY,l*.875)?(t.onresize=void 0,t.onmousemove=void 0,t.onclick=void 0,i()):M(t.width-l*1.2-s*2-t.mouseX,t.height-l*5.7-t.mouseY,l*.875)&&window.open("https://github.com/Yukkku/unphoton/blob/main/editor.md");return}r===0?o[0]===1?o[0]=2:(o[0]=1,o.length=1):r===1||r===2?(o[0]===3||o[0]===4?o[0]===E[r][0]&&(o[2]=(o[2]+1)%6):(o.length=3,o[1]=0,o[2]=0),o[0]=E[r][0]):2<r&&r<6?(o[0]===5||o[0]===6||o[0]===10?o[0]===E[r][0]&&(o[2]=(o[2]+1)%6):(o.length=3,o[1]=o[1]??0,o[2]=0),o[0]=E[r][0]):5<r&&(o[0]===7||o[0]===8||o[0]===9?o[0]===E[r][0]&&(o[2]=o[2]^1):(o.length=3,o[1]=o[1]??0,o[2]=1),o[0]=E[r][0]),c()};t.onclick=p}),ue=t=>new Promise(e=>{let i=new URL(location.href);i.searchParams.set("m",fe(t));let h=i.href,r=document.createElement("dialog");r.id="share",r.appendChild(document.createElement("h2")).innerText="- Share -";{let a=document.createElement("textarea");Object.assign(a,{onclick:a.select,readOnly:!0,value:h}),r.appendChild(a)}{let a=document.createElement("a");Object.assign(a,{innerText:"X (Twitter) \u3067\u5171\u6709",href:"https://twitter.com/share?hashtags=Unphoton&url="+h,target:"_blank",rel:"noopener"}),r.appendChild(a)}{let a=document.createElement("span");Object.assign(a,{innerText:"Close",onclick(){r.remove(),e()}}),r.appendChild(a)}document.body.appendChild(r),r.show()}),fe=t=>t.d.map(e=>e.slice(-12).map(i=>{switch(i[0]){case 0:return"  ";case 1:return"__";case 2:return"..";case 3:return"p"+String(i[2]);case 4:return"q"+String(i[2]);case 5:return"m"+String(i[2]);case 6:return"h"+String(i[2]);case 10:return"c"+String(i[2]);case 7:return"z"+String(i[2]);case 8:return"s"+String(i[2]);case 9:return"t"+String(i[2])}}).join("")).join("").replace(/.(_*)$/,e=>e[0]).replace(/_{2,20}/g,e=>"_"+String(e.length/2-1)).replace(/\.{2,20}/g,e=>"."+String(e.length/2-1)),pe=t=>{let e=t.replace(/[_\.]\d/g,h=>h[0].repeat(Number(h[1])*2+2));e+="_".repeat(240-e.length);let i=e.match(/.{24}/g);for(let h=1;h<10;h+=2)i[h]=" "+i[h];try{return _(i)}catch{return null}};var W=new L;{let t=()=>{let e=Math.floor(Math.min(window.innerHeight/9,window.innerWidth/16));W.elem.width/16!==e&&(W.elem.width=e*16,W.elem.height=e*9,W.clear())};window.addEventListener("resize",t),t()}document.body.appendChild(W.elem);var me=new URL(location.href).searchParams.get("m");me&&(await U(W,me),history.replaceState(null,"","/"));for(;;){let t=await ae(W);t===-1?await U(W):await new Y(_(G[t].field)).play(W)}