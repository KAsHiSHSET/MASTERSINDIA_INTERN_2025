const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const a = JSON.parse(fs.readFileSync(path.join(__dirname, 'a.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, 'b.json'), 'utf8'));

const mergedDeep = _.merge({}, a, b);

console.log('✅ Deep Merge with lodash:\n', JSON.stringify(mergedDeep, null, 2));
