import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wire fixture', () => {
  assert.equal(api.encodeOctal(new Uint8Array([0, 65, 255])), '000101377');
});
test('decode fixture', () => {
  assert.deepEqual([...api.decodeOctal('000101377')], [0, 65, 255]);
});
test('byte roundtrips', () => {
  for (let n = 0; n < 100; n++) {
    const v = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) % 256);
    assert.deepEqual(api.decodeOctal(api.encodeOctal(v)), v);
  }
});
test('invalid grammar', () => {
  assert.throws(() => api.decodeOctal('400'));
});
test('extra convention', () => {
  assert.equal(api.decodeOctal('').length, 0);
});
test('type contract', () => {
  assert.throws(() => api.encodeOctal([]));
  assert.throws(() => api.decodeOctal(1));
});
