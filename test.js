const fs = require('fs');

const files = fs.readdirSync('./libs');

console.log(files);