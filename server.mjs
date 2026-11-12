import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,`http://${req.headers.host}`);
  let file=url.pathname==='/'?'/index.html':url.pathname;
  if(file==='/manus-routes.json') file='/public/manus-routes.json';
  let target=path.join(root,file.replace(/^\/+/,''));
  if(!target.startsWith(root)||!fs.existsSync(target)||fs.statSync(target).isDirectory()){
    if(!path.extname(file)) target=path.join(root,'index.html');
    else {res.writeHead(404);res.end('Not found');return}
  }
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(target).pipe(res);
});
server.listen(port,'0.0.0.0',()=>console.log(`مرشد المباراة يعمل على المنفذ ${port}`));
