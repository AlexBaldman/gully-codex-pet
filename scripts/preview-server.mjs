import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build-gully.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
await build(resolve(root,'prototypes/procedural-v1/spritesheet.png'));
const routes = {
  '/': ['preview/index.html','text/html; charset=utf-8'],
  '/spritesheet.png':['prototypes/procedural-v1/spritesheet.png','image/png'],
  '/pet.json':['prototypes/procedural-v1/pet.json','application/json'],
};
const port=Number(process.env.PORT || 4173);
const server=createServer(async(req,res)=>{
  const pathname=(req.url||'').split('?')[0];
  if(req.method!=='GET'||!Object.hasOwn(routes,pathname)){res.writeHead(404);res.end('Not found');return;}
  const [path,mime]=routes[pathname];
  try {const data=await readFile(resolve(root,path));res.writeHead(200,{'content-type':mime,'cache-control':'no-store','x-content-type-options':'nosniff'});res.end(data);}
  catch{res.writeHead(500);res.end('Preview asset missing');}
});
server.listen(port,'127.0.0.1',()=>console.log(`🏄 Gully preview → http://127.0.0.1:${port}`));
