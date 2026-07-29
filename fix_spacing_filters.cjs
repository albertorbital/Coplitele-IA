const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move filters up by adding margin-top: -15px
html = html.replace('margin-bottom: 30px;"', 'margin-bottom: 30px; margin-top: -15px;"'); // Actividades
html = html.replace('margin-bottom: 40px; width: 100%; gap: 16px;"', 'margin-bottom: 40px; margin-top: -15px; width: 100%; gap: 16px;"'); // Produccion Cientifica

// 2. Add Filters to Recursos right after the subtitle div
const recursosFiltersHTML = `
        <div class="filters" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; margin-top: -15px;">
          <button class="rec-filter-btn active" data-filter="all">Todos</button>
          <button class="rec-filter-btn" data-filter="guias">Guías</button>
          <button class="rec-filter-btn" data-filter="protocolos">Protocolos</button>
          <button class="rec-filter-btn" data-filter="materiales">Materiales</button>
        </div>
`;
html = html.replace(
  '</div>\\n        \\n        <div class="resources-grid">',
  '</div>\\n        ' + recursosFiltersHTML + '\\n        <div class="resources-grid">'
);

fs.writeFileSync('index.html', html);
console.log('Fixed filters and spacings in index.html');

let css = fs.readFileSync('src/style.css', 'utf8');
// Fix page-submenu-wrapper margin
css = css.replace('margin-top: 20px;', 'margin-top: 5px;');
fs.writeFileSync('src/style.css', css);
console.log('Fixed style.css margin');
