const{parentPort}=require('node:worker_threads'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx=vm.createContext({console,setTimeout,clearTimeout,performance,postMessage:x=>parentPort.postMessage(x)});
ctx.importScripts=(...files)=>files.forEach(file=>{const absolute=path.resolve(__dirname,file.split('?')[0]);vm.runInContext(fs.readFileSync(absolute,'utf8'),ctx,{filename:absolute});});
vm.runInContext(fs.readFileSync(path.join(__dirname,'worker.js'),'utf8'),ctx,{filename:'worker.js'});parentPort.on('message',data=>ctx.onmessage({data}));
