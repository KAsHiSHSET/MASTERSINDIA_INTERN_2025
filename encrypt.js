const fs = require('fs');
const crypto = require('crypto');

const publicKey = fs.readFileSync('./public.pem', 'utf8');

const data = 'DONE BY KASHISH SETH';
const encrypted = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING
  },
  Buffer.from(data)
);

console.log('Encrypted (base64):', encrypted.toString('base64'));
