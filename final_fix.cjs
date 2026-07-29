const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Clean up the garbage left after the first section-nav-grid
const badHTML = `        </div>
            <div class="nav-card-content">
              <h3>Recursos y Materiales</h3>
              
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
        </div>
        </div>
        <ul class="page-submenu">`;
        
const goodHTML = `        </div>
        </div>
        <ul class="page-submenu">`;
html = html.replace(badHTML, goodHTML);


// Clean up the garbage left after the second section-nav-grid (in view-impacto)
const badHTML2 = `        </div>
            <div class="nav-card-content">
              <h3>Recursos y Materiales</h3>
              
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
        </div>
        </div>
        <ul class="page-submenu">`;
html = html.replace(badHTML2, goodHTML);


// 2. Add section Actividades if missing, right before Transferencia
if (!html.includes('<section id="actividades"')) {
    const transferenciaSection = `<section id="transferencia" class="page-section scientific-section" style="padding-top: 40px; padding-bottom: 40px;">`;
    const actividadesSection = `
    <!-- Section 1.5: Actividades -->
    <section id="actividades" class="page-section scientific-section" style="padding-top: 40px; padding-bottom: 40px;">
      <div class="section-container">
        <div class="section-title-wrapper">
          <h2 class="section-title">Actividades de <span class="blue-highlight">Formación</span></h2>
          <p class="section-subtitle">Demos, talleres, seminarios y programas de formación diseñados para la capacitación docente y académica.</p>
        </div>

        <!-- Filters for Actividades -->
        <div class="filters" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px;">
          <button class="act-filter-btn active" data-filter="all">Todos</button>
          <button class="act-filter-btn" data-filter="formacion">Formaciones</button>
          <button class="act-filter-btn" data-filter="jornada">Jornadas</button>
          <button class="act-filter-btn" data-filter="colaboracion">Colaboraciones</button>
        </div>

        <div class="activities-grid" id="activities-list">
          <!-- Injected by JS -->
        </div>
      </div>
    </section>

    `;
    html = html.replace(transferenciaSection, actividadesSection + transferenciaSection);
}

fs.writeFileSync('index.html', html);
console.log('Fixed HTML structure and added Actividades section');
