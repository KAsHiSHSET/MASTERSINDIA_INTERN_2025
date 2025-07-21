// attacker.js
const crypto = require('crypto');
const fs = require('fs');

// Load intercepted encrypted data
const intercepted = fs.readFileSync('intercepted.bin');

// ⚠️ Attacker DOES NOT HAVE the private key
try {
  const fakePrivateKey = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 }).privateKey;

  const decrypted = crypto.privateDecrypt(
    {
      key: fakePrivateKey, // <- Wrong key!
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    intercepted
  );

  console.log('🔓 Decrypted (unexpectedly!):', decrypted.toString());
} catch (err) {
  console.log('❌ Decryption failed: You do NOT have the private key');
}
