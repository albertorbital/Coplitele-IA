const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');
js = js.replace(/\\n/g, '\n');
fs.writeFileSync('src/main.js', js);
console.log('Fixed literal newlines');
