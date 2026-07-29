const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');
let acts = fs.readFileSync('final_act.js', 'utf8');

// Insert it right before publications array
js = js.replace('const publications = [', acts + '\n\nconst publications = [');
fs.writeFileSync('src/main.js', js);
console.log('Injected transferActivities');
