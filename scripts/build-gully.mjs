/** Deterministic, dependency-free pixel artist and PNG atlas encoder for Gully. */
import { deflateSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export const SCALE = 4;
export const CELL = { width: 192, height: 208 };
export const ROWS = [
  ['idle', 6], ['running-right', 8], ['running-left', 8],
  ['waving', 4], ['jumping', 5], ['failed', 8],
  ['waiting', 6], ['running', 6], ['review', 6],
];
export const WIDTH = CELL.width * 8;
export const HEIGHT = CELL.height * ROWS.length;
const W = 48, H = 52;
const C = {
  ink: '#182145', deep: '#0e1737', feather: '#fdf7e7', light: '#ffffff',
  shadow: '#b9c9d8', wing: '#879daf', gold: '#ffd75d', darkGold: '#c98830',
  orange: '#ff9e40', beak: '#ffc063', pink: '#fe46b6', cyan: '#74eddc',
  glass: '#67bbd9', rum: '#8a463e', lens: '#1b1945',
};
const rgb = Object.fromEntries(Object.entries(C).map(([k,hex]) => [k, [1,3,5].map(i => parseInt(hex.slice(i,i+2),16))]));
const variants = ['idle','running-right','running-left','waving','jumping','failed','waiting','running','review'];

function painter(flip = false) {
  const px = new Uint8Array(W * H * 4);
  function dot(x,y,color) {
    x=Math.round(x); y=Math.round(y);
    if (flip) x=W-1-x;
    if(x<0 || x>=W || y<0 || y>=H) return;
    const n=(y*W+x)*4, c=rgb[color];
    if(!c) throw Error(`Unknown palette color: ${color}`);
    px[n]=c[0]; px[n+1]=c[1]; px[n+2]=c[2]; px[n+3]=255;
  }
  function box(x,y,w,h,color){for(let yy=Math.round(y);yy<y+h;yy++)for(let xx=Math.round(x);xx<x+w;xx++)dot(xx,yy,color);}
  function oval(cx,cy,rx,ry,color){
    for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++)
      if(((x-cx)/rx)**2+((y-cy)/ry)**2<=1)dot(x,y,color);
  }
  function poly(points,color) {
    const ys=points.map(p=>p[1]);
    for(let y=Math.floor(Math.min(...ys)); y<=Math.ceil(Math.max(...ys));y++){
      let xs=[];
      for(let i=0;i<points.length;i++){
        const [ax,ay]=points[i],[bx,by]=points[(i+1)%points.length];
        if(ay===by)continue;
        if(y+.5>=Math.min(ay,by)&&y+.5<Math.max(ay,by))xs.push(ax+(y+.5-ay)*(bx-ax)/(by-ay));
      }
      xs.sort((a,b)=>a-b);
      for(let j=0;j+1<xs.length;j+=2)for(let x=Math.ceil(xs[j]-.5);x<xs[j+1]-.5;x++)dot(x,y,color);
    }
  }
  function line(x0,y0,x1,y1,color,thick=1){
    const steps=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);
    for(let i=0;i<=steps;i++){
      const x=x0+(x1-x0)*i/steps,y=y0+(y1-y0)*i/steps;
      box(Math.round(x)-Math.floor(thick/2),Math.round(y)-Math.floor(thick/2),thick,thick,color);
    }
  }
  return {px,dot,box,oval,poly,line};
}

export function drawFrame(row, frame) {
  if (!Number.isInteger(row)||row<0||row>=ROWS.length||!Number.isInteger(frame)||frame<0||frame>=ROWS[row][1]) throw Error('Frame out of range');
  const state=variants[row], n=ROWS[row][1], phase=frame/n*Math.PI*2;
  const flip=state==='running-left';
  const p=painter(flip),{box,oval,poly,line,dot}=p;
  const walking=state==='running-left'||state==='running-right';
  const failed=state==='failed', busy=state==='running', wait=state==='waiting';
  const jump=state==='jumping';
  const dx=walking?Math.round(Math.sin(phase)*2):0;
  const dy=jump?-[0,3,7,4,0][frame]:failed?2+Math.round(Math.sin(phase)):Math.round(Math.sin(phase));
  const bobY=y=>y+dy;
  const accentSwing=Math.sin(phase);
  // Attached little forelock; keep a consistent silhouette in every row.
  poly([[19+dx,bobY(12)],[16+dx,bobY(6)],[24+dx,bobY(10)],[27+dx,bobY(5)],[30+dx,bobY(12)]],'ink');
  poly([[20+dx,bobY(11)],[19+dx,bobY(8)],[24+dx,bobY(12)],[27+dx,bobY(8)],[28+dx,bobY(13)]],'feather');
  // Feet and floppy orange toes animate independently on travel frames.
  const stride=walking?Math.round(accentSwing*3):0;
  line(20+dx,bobY(42),18+dx-stride,bobY(46),'ink',4);
  line(31+dx,bobY(42),33+dx+stride,bobY(46),'ink',4);
  line(18+dx-stride,bobY(46),12+dx-stride,bobY(47),'orange',3);
  line(33+dx+stride,bobY(46),38+dx+stride,bobY(47),'orange',3);
  // Grey back wing and outlined pear-shaped body.
  oval(13+dx,bobY(32),8,13,'ink');
  oval(13+dx,bobY(32),6,11,'wing');
  poly([[8+dx,bobY(35)],[5+dx,bobY(40)],[15+dx,bobY(41)]],'shadow');
  oval(25+dx,bobY(33),13,14,'ink');
  oval(25+dx,bobY(32),11,12,'feather');
  oval(29+dx,bobY(35),6,8,'shadow');
  oval(24+dx,bobY(33),7,8,'feather');
  // Head and gently feathered jowl.
  oval(25+dx,bobY(20),15,12,'ink');
  oval(25+dx,bobY(19),13,10,'feather');
  oval(17+dx,bobY(23),5,5,'light');
  // Beak profile, permanently pointing the character toward the action.
  poly([[34+dx,bobY(21)],[44+dx,bobY(24)],[36+dx,bobY(28)],[31+dx,bobY(26)]],'ink');
  poly([[35+dx,bobY(22)],[42+dx,bobY(24)],[35+dx,bobY(26)],[32+dx,bobY(24)]],'orange');
  line(36+dx,bobY(25),41+dx,bobY(25),'darkGold');
  // Sunglasses: when waiting / reviewing, an eye peeks over the rim.
  if(wait||state==='review'){
    box(20+dx,bobY(15),4,2,'light'); box(30+dx,bobY(15),3,2,'light');
    dot(22+dx,bobY(16),'pink'); dot(31+dx,bobY(16),'pink');
  }
  box(17+dx,bobY(17),10,7,'ink');
  box(28+dx,bobY(17),8,7,'ink');
  box(19+dx,bobY(19),7,4,'lens');
  box(29+dx,bobY(19),6,4,'lens');
  box(20+dx,bobY(19),3,1,'cyan');
  box(30+dx,bobY(19),2,1,'cyan');
  box(26+dx,bobY(19),3,2,'ink');
  // Eyebrow-ish glint, permanent smug little grin.
  line(33+dx,bobY(27),37+dx,bobY(27),'ink');
  // Chain and triangular eye-of-Gully pendant.
  line(17+dx,bobY(28),25+dx,bobY(37),'darkGold',3);
  line(34+dx,bobY(28),25+dx,bobY(37),'darkGold',3);
  line(17+dx,bobY(27),25+dx,bobY(35),'gold',2);
  line(34+dx,bobY(27),25+dx,bobY(35),'gold',2);
  poly([[25+dx,bobY(32)],[20+dx,bobY(39)],[30+dx,bobY(39)]],'darkGold');
  poly([[25+dx,bobY(33)],[22+dx,bobY(38)],[28+dx,bobY(38)]],'gold');
  box(24+dx,bobY(36),3,1,'ink'); dot(25+dx,bobY(36),'cyan');
  // Front wing. Different animations have clearly distinct wing poses.
  const handRaise=state==='waving'?[0,8,10,4][frame]:state==='review'?2:wait?2:failed?-4:busy?Math.round((accentSwing+1)*2):0;
  if(handRaise>5){
    line(35+dx,bobY(31),39+dx,bobY(22-handRaise/2),'ink',6);
    line(35+dx,bobY(31),39+dx,bobY(22-handRaise/2),'wing',4);
    box(37+dx,bobY(18-handRaise/2),5,5,'feather');
  } else {
    line(36+dx,bobY(30),38+dx,bobY(36-handRaise),'ink',7);
    line(35+dx,bobY(30),37+dx,bobY(36-handRaise),'wing',5);
  }
  // Legendary beverage; attached to his wing, no detached particles or UI effects.
  const gy=bobY(33-(wait?1:0)-(state==='review'?2:0)-(state==='waving'?handRaise:0));
  if (gy>=0 && gy<45) {
    poly([[37+dx,gy],[43+dx,gy],[42+dx,gy+9],[38+dx,gy+9]],'ink');
    poly([[38+dx,gy+1],[42+dx,gy+1],[41+dx,gy+8],[39+dx,gy+8]],'glass');
    box(39+dx,gy+4,3,3,'rum');
    line(41+dx,gy+1,43+dx,gy-4,'pink',1);
    box(38+dx,gy+1,2,2,'light');
  }
  if(failed){
    box(16+dx,bobY(17),10,2,'ink');
    box(29+dx,bobY(17),7,2,'ink');
  }
  if(busy){ // tucked-in concentration; accessory stays attached
    box(30+dx,bobY(13),2,1,'pink');
  }
  // Static transparent background, including the rest of each 192x208 cell.
  return p.px;
}

export function crc32(data){
  let crc=0xffffffff;
  for(const byte of data){crc^=byte;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
  return (crc^0xffffffff)>>>0;
}
function chunk(type,data){
  const name=Buffer.from(type),len=Buffer.alloc(4),end=Buffer.alloc(4);
  len.writeUInt32BE(data.length);end.writeUInt32BE(crc32(Buffer.concat([name,data])));
  return Buffer.concat([len,name,data,end]);
}
export function createAtlas(){
  const pixels=Buffer.alloc(WIDTH*HEIGHT*4);
  for(let row=0;row<ROWS.length;row++)for(let frame=0;frame<ROWS[row][1];frame++){
    const small=drawFrame(row,frame);
    const originX=frame*CELL.width,originY=row*CELL.height;
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){
      const si=(y*W+x)*4;
      if(!small[si+3])continue;
      for(let yy=0;yy<SCALE;yy++)for(let xx=0;xx<SCALE;xx++){
        const di=((originY+y*SCALE+yy)*WIDTH+(originX+x*SCALE+xx))*4;
        pixels[di]=small[si];pixels[di+1]=small[si+1];pixels[di+2]=small[si+2];pixels[di+3]=255;
      }
    }
  }
  const scanline=Buffer.alloc(HEIGHT*(WIDTH*4+1));
  for(let y=0;y<HEIGHT;y++)pixels.copy(scanline,y*(WIDTH*4+1)+1,y*WIDTH*4,(y+1)*WIDTH*4);
  const header=Buffer.alloc(13);header.writeUInt32BE(WIDTH,0);header.writeUInt32BE(HEIGHT,4);header[8]=8;header[9]=6;
  const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(scanline,{level:9})),chunk('IEND',Buffer.alloc(0))]);
  return {png,pixels};
}
export async function build(dest){
  const {png}=createAtlas();
  await mkdir(dirname(dest),{recursive:true});await writeFile(dest,png);
  return {dest,bytes:png.length};
}
const self=fileURLToPath(import.meta.url);
if(process.argv[1] && resolve(process.argv[1])===self){
  const dest=resolve(dirname(self),'../prototypes/procedural-v1/spritesheet.png');
  const result=await build(dest);console.log(`🐦 Gully hatched: ${result.dest} (${result.bytes} bytes, ${WIDTH}x${HEIGHT}, 9 states)`);
}
