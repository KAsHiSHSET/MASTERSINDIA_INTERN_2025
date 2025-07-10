const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

function testRSA() {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
  });

  const message = 'Secret123!';
  const encrypted = publicEncrypt(publicKey, Buffer.from(message));
  const decrypted = privateDecrypt(privateKey, encrypted);

  console.log('✅ Encrypted:', encrypted.toString('base64'));
  console.log('✅ Decrypted:', decrypted.toString());
}

testRSA();
