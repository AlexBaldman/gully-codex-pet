import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { drawFrame,createAtlas,ROWS,WIDTH,HEIGHT } from '../scripts/build-gully.mjs';
test('Codex atlas dimensions and nine animation states',()=>{
  assert.equal(WIDTH,1536);assert.equal(HEIGHT,1872);
  assert.deepEqual(ROWS.map(([,frames])=>frames),[6,8,8,4,5,8,6,6,6]);
});
test('each row has visible animation changes and each frame contains pixels',()=>{
  for(let row=0;row<ROWS.length;row++){
    const hashes=[];
    for(let f=0;f<ROWS[row][1];f++){
      const frame=drawFrame(row,f);
      assert.ok(frame.some((v,i)=>i%4===3&&v===255),`${ROWS[row][0]} frame ${f} blank`);
      hashes.push(createHash('sha256').update(frame).digest('hex'));
    }
    assert.ok(new Set(hashes).size>=2,`${ROWS[row][0]} is static`);
  }
});
test('generated sheet is a PNG with correctly encoded dimensions',()=>{
  const {png,pixels}=createAtlas();
  assert.deepEqual([...png.subarray(0,8)],[137,80,78,71,13,10,26,10]);
  assert.equal(png.readUInt32BE(16),1536);assert.equal(png.readUInt32BE(20),1872);
  assert.equal(pixels.length,WIDTH*HEIGHT*4);
  assert.equal(pixels[(HEIGHT-1)*WIDTH*4+3],0);
});
