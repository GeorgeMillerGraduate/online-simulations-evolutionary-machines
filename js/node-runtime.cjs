/* Headless tests and CPU research runner use the same scientific browser modules. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const context=vm.createContext({console,performance,setTimeout,clearTimeout});
const files=['js/build-info.js','vendor/planck.min.js','js/physics/legacy.js','js/physics/core.js','js/contracts.js','js/brains/network.js','js/simulation/sensors.js','js/simulation/environment.js','js/evolution/genetics.js','js/evaluation/statistics.js'];
for(const file of files)vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context,{filename:file});
module.exports={...context.Lab,Core:context.MachineLab,Legacy:context.LegacyMachineLab};
