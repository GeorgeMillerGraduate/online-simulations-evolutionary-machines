/* Bounded local plasticity, with optional reward modulation. No claim of backpropagation. */
(function(L){'use strict';const C=L.Contracts;
function update(weights,state,rule,rate,reward){let k=0,delta=0;const layers=[[state.inputs,state.hidden],[state.hidden,state.outputs]];for(const[pre,post]of layers)for(const y of post)for(const x of pre.concat(1)){const before=weights[k],change=rate*(rule[0]*x*y+rule[1]*x+rule[2]*y+rule[3])*C.clamp(reward,-1,1);weights[k]=Math.fround(C.clamp(before+change,-8,8));delta+=Math.abs(weights[k]-before);k++;}return delta;}
L.Plasticity={update};
})(Lab);
