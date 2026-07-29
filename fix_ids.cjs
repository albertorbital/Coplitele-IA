const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the ID in actividades section
html = html.replace('id="activities-list"', 'id="activities-grid"');

// Fix the ID in transferencia section
html = html.replace('<div class="activities-grid" id="activities-grid"></div>', '<div class="transferencia-grid" id="transferencia-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;"></div>');

// Remove any remaining pretitles
const regex = new RegExp('<span class="section-pretitle"[^>]*>.*?</span>', 'g');
html = html.replace(regex, '');

fs.writeFileSync('index.html', html);
console.log('Fixed IDs');
