function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function bytes(v: Uint8Array, max = 1048576): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > max) throw new RangeError('Byte budget exceeded');
}
export function encodeOctal(input: Uint8Array): string {
  bytes(input);
  return Array.from(input, (v) => v.toString(8).padStart(3, '0')).join('');
}
export function decodeOctal(text: string): Uint8Array {
  strictText(text, 3145728);
  if (text.length % 3 || !/^[0-7]*$/.test(text))
    throw new RangeError('Canonical octal triples required');
  const out = new Uint8Array(text.length / 3);
  for (let i = 0; i < out.length; i++) {
    const n = parseInt(text.slice(i * 3, i * 3 + 3), 8);
    if (n > 255) throw new RangeError('Octal byte overflow');
    out[i] = n;
  }
  return out;
}
