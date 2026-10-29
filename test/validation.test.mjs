import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createAtlas, crc32 } from '../scripts/build-gully.mjs';

test('CRC32 matches the standard check vector', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
});

test('validator accepts the atlas and rejects checksum-only corruption and truncated files', () => {
  const root = mkdtempSync(resolve(tmpdir(), 'gully-validation-'));
  try {
    mkdirSync(resolve(root, 'scripts'));
    mkdirSync(resolve(root, 'pets/gully'), { recursive: true });
    for (const name of ['build-gully.mjs', 'validate-pet.mjs']) {
      copyFileSync(fileURLToPath(new URL('../scripts/' + name, import.meta.url)), resolve(root, 'scripts', name));
    }
    writeFileSync(resolve(root, 'pets/gully/pet.json'), JSON.stringify({
      id: 'gully', displayName: 'Gully', description: 'Test', spritesheetPath: 'spritesheet.png'
    }));
    const { png } = createAtlas();
    const validate = bytes => {
      writeFileSync(resolve(root, 'pets/gully/spritesheet.png'), bytes);
      return spawnSync(process.execPath, [resolve(root, 'scripts/validate-pet.mjs')], { encoding: 'utf8' });
    };
    assert.equal(validate(png).status, 0);
    const corrupt = Buffer.from(png);
    let offset = 8;
    while (corrupt.toString('ascii', offset + 4, offset + 8) !== 'IDAT') offset += corrupt.readUInt32BE(offset) + 12;
    corrupt[offset + 8 + corrupt.readUInt32BE(offset)] ^= 1;
    const result = validate(corrupt);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Invalid IDAT CRC/);
    for (const bytes of [png.subarray(0, 10), png.subarray(0, -12), Buffer.concat([png, Buffer.from([1])])]) {
      assert.notEqual(validate(bytes).status, 0);
    }
  } finally { rmSync(root, { recursive: true, force: true }); }
});
