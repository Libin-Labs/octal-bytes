import { encodeOctal, decodeOctal } from '@lp-labs/octal-bytes';
const bytes = new Uint8Array([0, 65, 255]);
if (decodeOctal(encodeOctal(bytes))[0] !== bytes[0]) throw new Error('Codec');
// @ts-expect-error invalid argument must be rejected by declarations
encodeOctal([1]);
