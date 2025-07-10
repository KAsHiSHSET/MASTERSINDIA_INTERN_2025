const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadCSV() {
  const url = 'https://people.sc.fsu.edu/~jburkardt/data/csv/airtravel.csv';
  const filePath = path.join(__dirname, 'airtravel.csv');

  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  writer.on('finish', () => console.log('✅ CSV downloaded:', filePath));
  writer.on('error', (err) => console.error('❌ Write error:', err));
}

downloadCSV();
