import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for(const file of ['index.html','styles.css','data.js','app.js','manifest.webmanifest','icon.svg','sw.js'])fs.copyFileSync(path.join(root,file),path.join(out,file));
fs.copyFileSync(path.join(root,'public/manus-routes.json'),path.join(out,'manus-routes.json'));
console.log(`Static output written to ${path.relative(root,out)}`);
