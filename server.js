const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load the private key
const privateKey = fs.readFileSync('private.pem', 'utf8');

// Add your POST route for /decrypt
app.post('/decrypt', (req, res) => {
  console.log('Received encrypted payload');

  try {
    const encryptedBase64 = req.body.encrypted;
    const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');

    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      encryptedBuffer
    );

    res.json({ decrypted: decrypted.toString('utf8') });
  } catch (err) {
    console.error('Decryption error:', err.message);
    res.status(500).json({ error: 'Decryption failed' });
  }
});

// Start the API server
app.listen(PORT, () => {
  console.log(`Decryption API running on http://localhost:${PORT}`);
});
