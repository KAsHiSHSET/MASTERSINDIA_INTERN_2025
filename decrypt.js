const { privateDecrypt, constants } = require('crypto');
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem', 'utf8');
const encrypted = fs.readFileSync('encrypted.txt', 'utf8');

const decrypted = privateDecrypt(
  {
    key: privateKey,
    padding: constants.RSA_PKCS1_PADDING, // 🛑 Blocked in Node 20+ without flag
  },
  Buffer.from(encrypted, 'base64')
).toString();

console.log('🔓 Decrypted message:', decrypted);
