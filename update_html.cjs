const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const navGridStart = html.indexOf('<div class="section-nav-grid">');
if (navGridStart > -1) {
  let sectionContent = html.substring(navGridStart, html.indexOf('</div>', html.indexOf('card-recursos') + 50) + 20);
  let actualNavGrid = sectionContent.substring(0, sectionContent.lastIndexOf('</div>') + 6);

  const targetSubmenu = '<ul class="page-submenu">';
  const newHeaderHTML = `
        <div id="impacto-hero-cards" class="impacto-hero-cards" style="display: block; transition: all 0.4s ease; padding: 20px;">
          ${actualNavGrid}
        </div>
        ${targetSubmenu}`;
  
  if (!html.includes('id="impacto-hero-cards"')) {
    html = html.replace(targetSubmenu, newHeaderHTML);
    fs.writeFileSync('index.html', html);
    console.log('Injected Impacto Hero Cards');
  } else {
    console.log('Impacto Hero Cards already present');
  }
}
