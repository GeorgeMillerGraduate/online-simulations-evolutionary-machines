#!/usr/bin/env node
/* Local reference measurement, not a universal browser/device performance claim. */
const {performance}=require('node:perf_hooks'),os=require('node:os'),L=require('../js/node-runtime.cjs');
const c=L.Contracts.config({mode:'walker',controller:'cpg',algorithm:'cmaes',terrain:'flat',duration:12,trainCount:3}),pop=L.Search.initial(c,L.Search.fresh());
let physicsMs=0,physicsSteps=0,observationMs=0,observations=0,controllerMs=0,controllers=0;
const step=L.WalkerV3.step,observe=L.WalkerV3.observe,control=L.CPG.targets;
// The environment dispatch calls MachineLab.step; wrap the actual Planck world's step per episode instead.
function episode(individual,seed){const e=L.Environment.create(c,individual,seed);e.recordTrace=false;const worldStep=e.sim.world.step.bind(e.sim.world);e.sim.world.step=(...args)=>{const start=performance.now();const result=worldStep(...args);physicsMs+=performance.now()-start;physicsSteps++;return result;};while(!e.sim.done)L.Environment.step(e);}
L.WalkerV3.observe=(...args)=>{const start=performance.now(),result=observe(...args);observationMs+=performance.now()-start;observations++;return result;};
L.CPG.targets=(...args)=>{const start=performance.now(),result=control(...args);controllerMs+=performance.now()-start;controllers++;return result;};
// Warm JIT before recording the reference interval.
for(let i=0;i<6;i++)episode(pop[i],c.seedSets.train[0]);physicsMs=observationMs=controllerMs=physicsSteps=observations=controllers=0;
const start=performance.now();for(let i=0;i<18;i++)for(const seed of c.seedSets.train)episode(pop[i],seed);const wallMs=performance.now()-start;
console.log(JSON.stringify({format:'jem-v3-profile',runtime:process.version,platform:process.platform,architecture:process.arch,cpu:os.cpus()[0]?.model,logicalCPUs:os.cpus().length,concurrency:'single Node process; other workloads may be active',sourceSHA256:L.Contracts.manifest(c).sourceSHA256,physicsSteps,wallMs,physicsMs,observationMs,controllerMs,unclassifiedMs:wallMs-physicsMs-observationMs-controllerMs,observations,controllers,stepsPerSecond:physicsSteps/(wallMs/1000),aggregateRealtime:physicsSteps/(wallMs/1000)/60,note:'Instrumented CPU measurement on this host. Not a browser replay FPS measurement or a reference-laptop guarantee.'},null,2));
