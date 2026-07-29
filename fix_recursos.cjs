const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');
js = js.replace(/<span style="font-size:12px; font-weight:700; color:#10b981; background:rgba\(16,185,129,0\.1\); padding:4px 10px; border-radius:20px; display:inline-block; margin-bottom:12px;">\$\{r\.tag\[currentLang\] \|\| r\.tag\.es\}<\/span>/, '');
fs.writeFileSync('src/main.js', js);
console.log('Removed tag from Recursos');
