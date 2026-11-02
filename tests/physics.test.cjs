const assert=require('node:assert/strict'),M=require('../js/engine.js');
for(const mode of Object.keys(M.MODES)){
 const genes=M.MODES[mode].starter,opt={terrain:'rolling',seed:42};const first=M.evaluate(mode,genes,opt),repeat=M.evaluate(mode,genes,opt);assert.deepEqual(first,repeat,'deterministic replay: '+mode);assert(first.success,'tested starter must complete its task: '+mode);assert(first.energy>0,'motor work must be measured');console.log(mode,first.status,'fitness',first.fitness.toFixed(2));
 let population=M.population(mode,12,42),previous=-Infinity;
 for(let generation=0;generation<4;generation++){const ranked=population.map(genes=>({genes,result:M.evaluate(mode,genes,opt)})).sort((a,b)=>b.result.fitness-a.result.fitness);assert(ranked.every(x=>Number.isFinite(x.result.fitness)));assert(ranked[0].result.fitness>=previous-1e-8,'elitism must retain best result');previous=ranked[0].result.fitness;const children=M.breed(ranked,12,100+generation,.2);assert.deepEqual(children[0],ranked[0].genes);assert(children.every(g=>M.validGenome(mode,g)));population=children;}console.log(mode,'four generations: finite scores, valid offspring and elite retention');
}
const free=M.create('car',M.MODES.car.starter,{terrain:'flat'});free.joints.forEach(j=>j.enableMotor(false));while(!free.done)M.step(free);assert(M.result(free).distance<.2,'unpowered car must not follow a scripted route');
const bal=M.create('balancer',M.MODES.balancer.starter,{terrain:'rolling',seed:42});while(!bal.done)M.step(bal);assert.equal(bal.pushes,3,'balance trial must apply all three disturbances');
assert(!M.validGenome('car',[1,2]));assert(!M.validGenome('car',Array(8).fill(NaN)));assert(!M.validGenome('alien',[]));
const jump=M.create('jumper',M.MODES.jumper.starter,{terrain:'rolling',seed:42});while(!jump.done)M.step(jump);assert(jump.landed>.25&&jump.foot.getPosition().x>jump.gap[1],'successful jump must hold far-platform contact');
console.log('Physics, deterministic evaluation, genuine motors, breeding and landing checks passed.');
