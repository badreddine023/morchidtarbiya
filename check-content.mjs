import fs from 'node:fs';
const source=fs.readFileSync('data.js','utf8');
const required=[['QCM bank','D.qcm='],['professional situations','D.situations='],['flashcards','D.flashcards=']];
for(const [label,needle] of required)if(!source.includes(needle))throw new Error(`Missing ${label}`);
const app=fs.readFileSync('app.js','utf8');
for(const needle of ['slice(0,25)','60*60*1000','D.situations','D.flashcards'])if(!app.includes(needle))throw new Error(`Missing app contract: ${needle}`);
const routes=JSON.parse(fs.readFileSync('public/manus-routes.json','utf8'));
if(!routes.routes.some(x=>x.path==='/#qcm'))throw new Error('Hash route manifest missing #qcm');
console.log('content contract source checks ok');
