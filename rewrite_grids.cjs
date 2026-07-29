const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const correctGridHTML = `
        <div class="section-nav-grid">
          <a href="#/impacto#actividades" class="section-nav-card card-actividades">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/stxfyhky.json" trigger="loop" delay="500" colors="primary:#1D5BFE,secondary:#7ce4e0" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Actividades</h3>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#transferencia" class="section-nav-card card-transferencia">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/qwwuyobh.json" trigger="loop" delay="500" colors="primary:#0f766e,secondary:#14b8a6" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Transferencia</h3>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#publicaciones" class="section-nav-card card-publicaciones">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/nobciafz.json" trigger="loop" delay="1000" colors="primary:#1D5BFE,secondary:#7ce4e0" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Producción Científica</h3>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#recursos" class="section-nav-card card-recursos">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/vlycxjwx.json" trigger="loop" delay="1500" colors="primary:#1D5BFE,secondary:#7ce4e0" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Recursos y Materiales</h3>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
        </div>
`;

// Find first <div class="section-nav-grid"> and replace to matching </div>
let idx1 = html.indexOf('<div class="section-nav-grid">');
if (idx1 > -1) {
  let end1 = html.indexOf('</div>', html.indexOf('card-recursos', idx1) + 20) + 6;
  if (end1 < idx1 + 200) {
      end1 = html.indexOf('</div>', html.indexOf('card-publicaciones', idx1) + 20) + 6;
  }
  html = html.substring(0, idx1) + correctGridHTML.trim() + html.substring(end1);
}

// Find second <div class="section-nav-grid"> and replace
let idx2 = html.indexOf('<div class="section-nav-grid">', idx1 + correctGridHTML.length);
if (idx2 > -1) {
  let end2 = html.indexOf('</div>', html.indexOf('card-recursos', idx2) + 20) + 6;
  if (end2 < idx2 + 200) {
      end2 = html.indexOf('</div>', html.indexOf('card-publicaciones', idx2) + 20) + 6;
  }
  html = html.substring(0, idx2) + correctGridHTML.trim() + html.substring(end2);
}

fs.writeFileSync('index.html', html);
console.log('Forcibly rewrote grids!');
