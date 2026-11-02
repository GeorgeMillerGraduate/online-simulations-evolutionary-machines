/* Generation records and checkpoints are committed atomically. No network storage. */
(function(L){'use strict';let dbPromise;
function db(){if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const r=indexedDB.open('jenga-evolution-build1',1);r.onupgradeneeded=()=>{const d=r.result;d.createObjectStore('sessions',{keyPath:'id'});d.createObjectStore('generations',{keyPath:['session','generation']});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return dbPromise;}
async function save(session,checkpoint,record){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction(['sessions','generations'],'readwrite');tx.objectStore('sessions').put({id:session,updated:Date.now(),checkpoint});if(record)tx.objectStore('generations').put({session,generation:record.generation,record});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Local save aborted.'));});}
async function latest(){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction('sessions').objectStore('sessions').getAll();r.onsuccess=()=>resolve(r.result.sort((a,b)=>b.updated-a.updated)[0]||null);r.onerror=()=>reject(r.error);});}
async function records(session){const d=await db();return new Promise((resolve,reject)=>{const r=d.transaction('generations').objectStore('generations').getAll(IDBKeyRange.bound([session,0],[session,Number.MAX_SAFE_INTEGER]));r.onsuccess=()=>resolve(r.result.map(x=>x.record));r.onerror=()=>reject(r.error);});}
L.Storage={save,latest,records};
})(Lab);
