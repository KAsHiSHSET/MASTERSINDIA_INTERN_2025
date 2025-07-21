const { publicEncrypt, constants } = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('public.pem', 'utf8');
const message = 'Secret123!';

const encrypted = publicEncrypt(
  {
    key: publicKey,
    padding: constants.RSA_PKCS1_PADDING,
  },
  Buffer.from(message)
).toString('base64');

fs.writeFileSync('encrypted.txt', encrypted);
console.log('🔐 Encrypted string saved to encrypted.txt');
