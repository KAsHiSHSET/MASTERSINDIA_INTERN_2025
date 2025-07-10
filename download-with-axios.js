// download-with-axios.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadFile(url, folder = 'downloads', filename = null) {
  const response = await axios.get(url, { responseType: 'stream' });

  const name = filename || path.basename(url);
  const filePath = path.join(__dirname, folder, name);

  // Make sure folder exists
  fs.mkdirSync(folder, { recursive: true });

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  writer.on('finish', () => {
    console.log('✅ File downloaded:', filePath);
  });

  writer.on('error', (err) => {
    console.error('❌ Error writing file:', err);
  });
}

// Example:
downloadFile('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
