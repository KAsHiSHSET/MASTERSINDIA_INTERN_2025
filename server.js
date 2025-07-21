// server.js
const crypto = require('crypto');
const fs = require('fs');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Save public and private keys
fs.writeFileSync('public.pem', publicKey.export({ type: 'pkcs1', format: 'pem' }));
fs.writeFileSync('private.pem', privateKey.export({ type: 'pkcs1', format: 'pem' }));

// Simulate client message encryption
const message = "Top Secret: Node.js RSA Encryption!";
const encrypted = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  },
  Buffer.from(message)
);

fs.writeFileSync('intercepted.bin', encrypted); // Intercepted by attacker

console.log('✅ Message encrypted and "sent" (written to intercepted.bin)');
