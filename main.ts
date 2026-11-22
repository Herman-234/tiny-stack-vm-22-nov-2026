import {readdirSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T=new TextEncoder();
for(const id of readdirSync(I).sort()){
const g=readFileSync(join(I,id,'program.bin')),u=readFileSync(join(I,id,'input.bin')),n=g.length;
const D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256);
const o=new Uint8Array(65536);let l=0,p=0,t=0,x=0,e=0;
L:for(;;){
if(t===1e6){e=10;break}
if(x<0||x>=n){e=9;break}
const b=g[x];
if(!(b<8||b>=16&&b<=34||b>=48&&b<=52||b===64||b===65||b>=80&&b<=83)){e=5;break}
const m=b===1?1:b===2?4:b>=48&&b<=51?2:0;
if(x+m>=n){e=9;break}
t++;const w=x+1+m;
let q=0,r=0;
if(b===7)q=3;else if(b===5||b===6||b===65||b>=16&&b<=22||b>=24&&b<=26||b>=28&&b<=30||b>=32&&b<=34)q=2;else if(b&&b!==1&&b!==2&&b!==48&&b!==51&&b!==52&&b!==82)q=1;
if(b===4||b===5)r=2;else if(b===6||b===7)r=3;else if(b===1||b===2||b>=16&&b<=34||b===64||b===82)r=1;
if(s<q){e=2;break}
if(s-q+r>256){e=3;break}
x=w;
switch(b){
case 0:e=0;break L;
case 1:D[s++]=(g[w-1]<<24)>>24;break;
case 2:D[s++]=g[w-4]|g[w-3]<<8|g[w-2]<<16|g[w-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const y=D[s-1],a=D[s-2];let v;
if(b===16)v=a+y|0;else if(b===17)v=a-y|0;else if(b===18)v=Math.imul(a,y);
else if(b===19){if(!y){e=4;break L}v=a===-2147483648&&y===-1?a:(a/y)|0}
else if(b===20){if(!y){e=4;break L}v=y===-1?0:a%y|0}
else if(b===21){if(!y){e=4;break L}v=Math.floor((a>>>0)/(y>>>0))|0}
else if(b===22){if(!y){e=4;break L}v=(a>>>0)%(y>>>0)|0}
else if(b===24)v=a&y;else if(b===25)v=a|y;else if(b===26)v=a^y;
else if(b===28)v=a<<(y&31);else if(b===29)v=a>>(y&31);else if(b===30)v=(a>>>(y&31))|0;
else if(b===32)v=a===y?1:0;else if(b===33)v=a<y?1:0;else v=(a>>>0)<(y>>>0)?1:0;
s-=2;D[s++]=v;break}
case 48:case 49:case 50:{
const j=((g[w-2]|g[w-1]<<8)<<16)>>16;let k=1;
if(b!==48){const v=D[--s];k=b===49?v===0:v!==0}
if(k)x=w+j;break}
case 51:if(c===64){e=7;break L}C[c++]=w;x=g[w-2]|g[w-1]<<8;break;
case 52:if(!c){e=8;break L}x=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255){e=6;break L}D[s-1]=M[a];break}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255){e=6;break L}s-=2;M[a]=v;break}
case 80:{const y=T.encode(String(D[s-1]));if(l+y.length>65536){e=11;break L}s--;o.set(y,l);l+=y.length;break}
case 81:if(l+1>65536){e=11;break L}o[l++]=D[--s]&255;break;
case 82:D[s++]=p<u.length?u[p++]:-1;break;
case 83:e=D[--s]&255;break L;
}
}
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),o.subarray(0,l));
writeFileSync(join(O,id,'exit.txt'),e+'\n');
}
