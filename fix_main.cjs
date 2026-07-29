const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Add Resources Array and Render Logic
const resourcesLogic = `
const resources = [
  {
    id: "res-1",
    type: "guia",
    title: { es: "Guía de Codiseño en Tecnología Educativa", en: "Co-design Guide in EdTech", ca: "Guia de Codisseny en Tecnologia Educativa" },
    desc: { es: "Un compendio de dinámicas, fichas imprimibles y directrices prácticas para planificar y llevar a cabo talleres de codiseño tecnológico con profesorado y estudiantes.", en: "A compendium of dynamics, printable worksheets, and practical guidelines for planning and carrying out technology co-design workshops with teachers and students.", ca: "Un compendi de dinàmiques, fitxes imprimibles i directrius pràctiques per planificar i dur a terme tallers de codisseny tecnològic amb professorat i estudiants." },
    image: "./images/recursos.png",
    date: "Sep 2025"
  },
  {
    id: "res-2",
    type: "protocolo",
    title: { es: "Fichas de Explicabilidad Algorítmica", en: "Algorithmic Explainability Worksheets", ca: "Fitxes d'Explicabilitat Algorítmica" },
    desc: { es: "Materiales didácticos de apoyo para trabajar la soberanía y comprensión del dato escolar con alumnos de secundaria y bachillerato en sesiones presenciales.", en: "Educational support materials to work on school data sovereignty and comprehension with middle and high school students in face-to-face sessions.", ca: "Materials didàctics de suport per treballar la sobirania i comprensió de la dada escolar amb alumnes de secundària i batxillerat en sessions presencials." },
    image: "./images/transferencia.png",
    date: "Nov 2025"
  },
  {
    id: "res-3",
    type: "informe",
    title: { es: "Módulo de Personalización Soberana", en: "Sovereign Personalization Module", ca: "Mòdul de Personalització Sobirana" },
    desc: { es: "Accede al repositorio público del prototipo funcional que integra las librerías de personalización algorítmica parametrizable con interfaces web adaptables.", en: "Access the public repository of the functional prototype that integrates customizable algorithmic personalization libraries with adaptive web interfaces.", ca: "Accedeix al repositori públic del prototip funcional que integra les llibreries de personalització algorítmica parametritzable amb interfícies web adaptables." },
    image: "./images/congresos.png",
    date: "Ene 2026"
  }
];

let recFilterType = 'all';

function renderResources() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;
  
  const filtered = resources.filter(res => recFilterType === 'all' || res.type === recFilterType);
  
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">No hay recursos para este filtro.</p>';
    return;
  }
  
  // Hover icon: rotating outer isotype + cross
  const isotypeHTML = \`
    <div style="position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
      <svg class="isotype-spin" viewBox="0 0 100 100" style="position: absolute; width: 100%; height: 100%; animation: rotateCursor 10s linear infinite;">
        <!-- Outer circles and lines of the isotype -->
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 5" />
      </svg>
      <div style="font-size: 32px; font-weight: 300; line-height: 1;">+</div>
    </div>
  \`;

  grid.innerHTML = filtered.map(res => \`
    <article class="resource-card" data-cursor-color="green" data-id="\${res.id}" style="cursor: pointer;">
      <div class="resource-image activity-image-wrapper">
        <img src="\${res.image}" alt="\${res.title[currentLang]}">
        <div class="hover-overlay-bg" style="background: rgba(16, 185, 129, 0.7);"></div>
        <div class="hover-icon-wrapper" style="opacity: 0; transition: opacity 0.3s; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
          <div class="hover-icon-cross" style="color: #6ee7b7;">\${isotypeHTML}</div>
          <div class="hover-text-top" style="color: #6ee7b7; margin-top: 20px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">\${res.type}</div>
        </div>
      </div>
      <div class="resource-info activity-card-body" style="text-align: center;">
        <h3 class="resource-title hover-scale-title">\${res.title[currentLang]}</h3>
      </div>
    </article>
  \`).join('');

  // Re-bind cursor events for new elements
  if (window.updateCursorEvents) window.updateCursorEvents();

  // Bind click for modal
  grid.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('click', () => {
      const res = resources.find(r => r.id === card.dataset.id);
      if (res) openRecModal(res);
    });
  });
}

function openRecModal(res) {
  const modal = document.getElementById('recModal');
  const title = document.getElementById('recModalTitle');
  const body = document.getElementById('recModalBody');
  const footer = document.getElementById('recModalFooter');
  
  if (!modal || !title || !body || !footer) return;
  
  title.textContent = res.title[currentLang];
  body.innerHTML = \`<p style="font-size: 16px; line-height: 1.6; color: var(--color-text-light); margin-bottom: 24px;">\${res.desc[currentLang]}</p>\`;
  footer.innerHTML = \`<button class="btn-primary" style="background: var(--color-green); border-color: var(--color-green);">Descargar (PDF)</button>\`;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Add close event for RecModal
document.addEventListener('DOMContentLoaded', () => {
  const recModal = document.getElementById('recModal');
  const closeBtn = document.getElementById('recModalClose');
  if (recModal && closeBtn) {
    closeBtn.addEventListener('click', () => {
      recModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    recModal.addEventListener('click', (e) => {
      if (e.target === recModal) {
        recModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
`;
js = js.replace('const publications = [', resourcesLogic + '\nconst publications = [');

// 2. Map renderResources in main execution
js = js.replace('renderTransferActivities();', 'renderTransferActivities();\n  if (typeof renderResources === "function") renderResources();');

fs.writeFileSync('src/main.js', js);
console.log('Added resource logic');
