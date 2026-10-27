import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';
import { ROWS, WIDTH, HEIGHT, CELL } from './build-gully.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(readFileSync(resolve(root,'pets/gully/pet.json'),'utf8'));
const file=resolve(root,'pets/gully',config.spritesheetPath ?? '');
function ensure(ok,message){if(!ok)throw Error(`❌ ${message}`);}
ensure(config.id==='gully','pet ID must be gully');
ensure(config.displayName && config.description,'displayName and description required');
ensure(config.spritesheetPath==='spritesheet.png','manifest must point to generated sprite');
const png=readFileSync(file);
ensure(png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),'PNG signature invalid');
ensure(png.readUInt32BE(16)===WIDTH && png.readUInt32BE(20)===HEIGHT,'Incorrect dimensions');
ensure(png[24]===8 && png[25]===6,'RGBA8 PNG required');
let offset=8;const idat=[];
while(offset<png.length){
  const len=png.readUInt32BE(offset),type=png.toString('ascii',offset+4,offset+8);
  ensure(offset+12+len<=png.length,'Truncated PNG chunk');
  if(type==='IDAT')idat.push(png.subarray(offset+8,offset+8+len));
  offset+=len+12;
  if(type==='IEND')break;
}
ensure(idat.length>0,'Missing PNG pixel data');
const raw=inflateSync(Buffer.concat(idat));const pitch=WIDTH*4+1;
ensure(raw.length===HEIGHT*pitch,'Invalid decoded pixel count');
const occupied=ROWS.map(()=>Array(8).fill(false));
for(let y=0;y<HEIGHT;y++){
  ensure(raw[y*pitch]===0,'Unsupported PNG row filter (expected 0)');
  for(let x=0;x<WIDTH;x++){
    const i=y*pitch+1+x*4;
    if(raw[i+3]===0){ensure(raw[i]===0&&raw[i+1]===0&&raw[i+2]===0,'Transparent pixel has RGB residue');continue;}
    occupied[Math.floor(y/CELL.height)][Math.floor(x/CELL.width)]=true;
  }
}
for(let row=0;row<ROWS.length;row++)for(let col=0;col<8;col++){
  ensure(occupied[row][col]===(col<ROWS[row][1]),`Row ${row} cell ${col}: incorrect opacity`);
}
console.log(`✅ Codex-ready Gully: ${WIDTH}x${HEIGHT}, ${ROWS.reduce((n,row)=>n+row[1],0)} animated cells across 9 states, transparent empty slots`);
