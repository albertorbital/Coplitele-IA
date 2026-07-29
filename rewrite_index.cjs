const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGridHTML = `
        <div class="section-nav-grid">
          <a href="#/impacto#actividades" class="section-nav-card card-actividades" data-cursor-color="blue">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/stxfyhky.json" trigger="loop" delay="500" colors="primary:#1D5BFE,secondary:#7ce4e0" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Actividades</h3>
              <p>Demos, talleres, seminarios y programas de formación.</p>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#transferencia" class="section-nav-card card-transferencia" data-cursor-color="turquoise">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/qwwuyobh.json" trigger="loop" delay="500" colors="primary:#0f766e,secondary:#14b8a6" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Transferencia</h3>
              <p>Experiencias aplicando las estrategias del proyecto</p>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#publicaciones" class="section-nav-card card-publicaciones" data-cursor-color="purple">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/nobciafz.json" trigger="loop" delay="1000" colors="primary:#8b5cf6,secondary:#c4b5fd" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Producción Científica</h3>
              <p>Artículos en revistas, libros, ponencias y actas de congreso.</p>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
          
          <a href="#/impacto#recursos" class="section-nav-card card-recursos" data-cursor-color="green">
            <div class="nav-card-icon">
              <lord-icon src="https://cdn.lordicon.com/vlycxjwx.json" trigger="loop" delay="1500" colors="primary:#10b981,secondary:#6ee7b7" style="width:80px;height:80px"></lord-icon>
            </div>
            <div class="nav-card-content">
              <h3>Recursos y Artefactos</h3>
              <p>Acceso a software, corpus, guías didácticas y herramientas.</p>
            </div>
            <span class="nav-card-arrow">&rarr;</span>
          </a>
        </div>`;

// 1. Replace the first section-nav-grid (Inicio)
const firstGridStart = html.indexOf('<div class="section-nav-grid">');
const firstGridEnd = html.indexOf('</div>', html.indexOf('card-recursos', firstGridStart) + 20) + 6;
html = html.substring(0, firstGridStart) + newGridHTML.trim() + html.substring(firstGridEnd);

// 2. Replace the second section-nav-grid (Impacto y difusión)
const secondGridStart = html.indexOf('<div class="section-nav-grid">');
const secondGridEnd = html.indexOf('</div>', html.indexOf('card-recursos', secondGridStart) + 20) + 6;
html = html.substring(0, secondGridStart) + newGridHTML.trim() + html.substring(secondGridEnd);

// 3. Fix the Transferencia section to split it into Actividades and Transferencia
const transSectionStart = html.indexOf('<section id="transferencia"');
const transSectionEnd = html.indexOf('</section>', transSectionStart) + 10;
const newTransAndActSection = `
    <!-- Section 1.5: Actividades -->
    <section id="actividades" class="page-section scientific-section" style="padding-top: 40px; padding-bottom: 40px;">
      <div class="section-container">
        <div class="section-title-wrapper">
          <h2 class="section-title"><span class="blue-highlight">Actividades</span></h2>
        </div>

        <!-- Filters for Actividades -->
        <div class="filters" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; margin-top: -15px;">
          <button class="act-filter-btn active" data-filter="all">Todos</button>
          <button class="act-filter-btn" data-filter="formacion">Formaciones</button>
          <button class="act-filter-btn" data-filter="jornada">Jornadas</button>
          <button class="act-filter-btn" data-filter="colaboracion">Colaboraciones</button>
          <button class="act-filter-btn" data-filter="seminario">Seminarios</button>
          <button class="act-filter-btn" data-filter="taller">Talleres</button>
        </div>

        <div class="activities-grid" id="activities-grid">
          <!-- Injected by JS -->
        </div>
      </div>
    </section>

    <!-- Section 2: Transferencia -->
    <section id="transferencia" class="page-section scientific-section" style="padding-top: 40px; padding-bottom: 40px;">
      <div class="section-container">
        <div class="section-title-wrapper">
          <h2 class="section-title"><span class="turquoise-highlight">Transferencia</span></h2>
        </div>
        <!-- Activities Grid (Dynamically rendered via JS) -->
        <div class="transferencia-grid" id="transferencia-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;"></div>
      </div>
    </section>`;
html = html.substring(0, transSectionStart) + newTransAndActSection.trim() + html.substring(transSectionEnd);

// 4. Fix Publicaciones Section
html = html.replace('<span class="section-pretitle" data-i18n="pub_pretitle">Biblioteca Científica</span>\n          <h2 class="section-title" data-i18n="pub_title">Producción Científica</h2>\n          <p class="section-subtitle" data-i18n="pub_subtitle">Accede a las publicaciones del proyecto sincronizadas con nuestra biblioteca de referencias de Zotero.</p>', '<h2 class="section-title" data-i18n="pub_title">Producción Científica</h2>');
html = html.replace('margin-bottom: 40px; width: 100%; gap: 16px;', 'margin-bottom: 40px; margin-top: -15px; width: 100%; gap: 16px;');

// 5. Fix Recursos Section
const recSectionStart = html.indexOf('<section id="recursos"');
const recSectionEnd = html.indexOf('</section>', recSectionStart) + 10;
const newRecSection = `
    <!-- Section 4: Recursos -->
    <section id="recursos" class="page-section scientific-section" style="padding-top: 40px; padding-bottom: 40px;">
      <div class="section-container">
        <div class="section-title-wrapper">
          <h2 class="section-title" data-i18n="rec_title">Recursos del Proyecto</h2>
        </div>
        
        <div class="filters" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; margin-top: -15px;">
          <button class="rec-filter-btn active" data-filter="all">Todos</button>
          <button class="rec-filter-btn" data-filter="guia">Guías</button>
          <button class="rec-filter-btn" data-filter="protocolo">Protocolos</button>
          <button class="rec-filter-btn" data-filter="agente">Agentes</button>
          <button class="rec-filter-btn" data-filter="informe">Informes</button>
        </div>
        
        <div class="resources-grid" id="resources-grid"></div>
      </div>
    </section>`;
html = html.substring(0, recSectionStart) + newRecSection.trim() + html.substring(recSectionEnd);

// 6. Add Modal
const recModal = `
  <!-- Resource Detail Modal -->
  <div id="recModal" class="modal-overlay">
    <div class="modal-content rec-modal-content">
      <div class="modal-header">
        <h3 id="recModalTitle" style="padding-right: 40px;"></h3>
        <button id="recModalClose" class="modal-close">&times;</button>
      </div>
      <div class="modal-body" id="recModalBody"></div>
      <div class="modal-footer" id="recModalFooter"></div>
    </div>
  </div>
`;
if (!html.includes('id="recModal"')) {
    html = html.replace('</body>', recModal + '\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('Fixed index.html structure carefully');
