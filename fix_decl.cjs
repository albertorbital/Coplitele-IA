const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const actStart = js.lastIndexOf('const transferActivities = [');
if (actStart > -1) {
  const actEnd = js.indexOf('];', actStart) + 2;
  js = js.substring(0, actStart) + js.substring(actEnd);
}

fs.writeFileSync('src/main.js', js);
console.log('Removed duplicate transferActivities');
