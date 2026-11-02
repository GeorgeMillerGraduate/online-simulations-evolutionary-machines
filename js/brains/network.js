/* Small feedforward controller: tanh(W2 tanh(W1 x+b1)+b2). Float32 weights, no external runtime. */
(function(L){'use strict';const C=L.Contracts;
const count=(h,o)=>(C.INPUTS+1)*h+(h+1)*o;
function initialise(h,o,r){return Array.from({length:count(h,o)},(_,i)=>Math.fround(C.normal(r)*(i<(C.INPUTS+1)*h?Math.sqrt(2/(C.INPUTS+h)):Math.sqrt(2/(h+o)))));}
function forward(weights,h,o,inputs,knockout=-1){if(weights.length!==count(h,o)||inputs.length!==24)throw Error('Neural shape mismatch.');const x=Float32Array.from(inputs),hidden=new Float32Array(h),out=new Float32Array(o);let k=0;for(let j=0;j<h;j++){let sum=0;for(let i=0;i<24;i++){sum+=(k===knockout?0:weights[k])*x[i];k++;}sum+=(k===knockout?0:weights[k]);k++;hidden[j]=Math.tanh(sum);}for(let j=0;j<o;j++){let sum=0;for(let i=0;i<h;i++){const w=k===knockout?0:weights[k];sum+=w*hidden[i];k++;}sum+=(k===knockout?0:weights[k]);k++;out[j]=Math.tanh(sum);}return{inputs:Array.from(x),hidden:Array.from(hidden),outputs:Array.from(out)};}
function valid(w,h,o){return Array.isArray(w)&&w.length===count(h,o)&&w.every(v=>typeof v==='number'&&Number.isFinite(v)&&Math.abs(v)<=8);}
L.Brain={count,initialise,forward,valid};
})(Lab);
