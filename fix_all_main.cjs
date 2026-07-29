const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Inject transferActivities array
let acts = fs.readFileSync('final_act.js', 'utf8');
js = js.replace('const publications = [', acts + '\n\nconst publications = [');

// 2. Inject Resources logic
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

js = js.replace('renderTransferActivities();', 'renderTransferActivities();\n  if (typeof renderResources === "function") renderResources();');

// 3. Update filter handlers
const oldRecFilter = `
    document.querySelectorAll('.rec-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rec-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        recFilterType = btn.getAttribute('data-filter');
        // Simple DOM filtering for recursos
        document.querySelectorAll('.resource-card').forEach(card => {
          if (recFilterType === 'all' || card.getAttribute('data-type') === recFilterType) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });`;
const newRecFilter = `
    document.querySelectorAll('.rec-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rec-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        recFilterType = btn.getAttribute('data-filter');
        if (typeof renderResources === "function") renderResources();
      });
    });`;
js = js.replace(oldRecFilter, newRecFilter);

// 4. Update generateCardHTML
const oldGenerateCardHTML = js.substring(js.indexOf('const generateCardHTML = (act, isTrans) => {'), js.indexOf('function renderActivityDetail(id) {'));
const newGenerateCardHTML = `const generateCardHTML = (act, isTrans) => {
    let imgPath = act.image || act.coverImage;
    if (imgPath && imgPath.endsWith('.mp4')) {
      imgPath = \`
        <video autoplay loop muted playsinline class="activity-image" style="object-fit: cover; width: 100%; height: 100%;">
          <source src="\${imgPath}" type="video/mp4">
        </video>\`;
    } else if (imgPath) {
      imgPath = \`<img src="\${imgPath}" alt="\${act.title[currentLang]}" class="activity-image">\`;
    } else {
      imgPath = \`<div class="activity-image-placeholder"></div>\`;
    }

    const hoverColor = isTrans ? '20, 184, 166' : '29, 91, 254'; // Turquoise or Blue
    const isotypeColor = isTrans ? '#6ee7b7' : '#93c5fd'; // Light Turquoise or Light Blue
    const cursorColor = isTrans ? 'turquoise' : 'blue';
    const tagText = act.type || (isTrans ? 'Transferencia' : 'Actividad');
    
    // Rotating isotype without center circles, plus a cross in the middle
    const isotypeHTML = \`
      <div style="position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
        <svg class="isotype-spin" viewBox="0 0 100 100" style="position: absolute; width: 100%; height: 100%; animation: rotateCursor 10s linear infinite;">
          <!-- Outer circles and lines of the isotype -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 5" />
        </svg>
        <div style="font-size: 32px; font-weight: 300; line-height: 1; color: \${isotypeColor};">+</div>
      </div>
    \`;

    const actClass = \`activity-card \${isTrans ? 'trans-card' : 'act-card'}\`;

    if (isTrans) {
      // TRANSFERENCIA
      return \`
        <article class="\${actClass}" data-id="\${act.id}" data-type="\${act.type || 'transferencia'}" data-cursor-color="\${cursorColor}">
          <div class="activity-image-wrapper">
            \${imgPath}
            <div class="hover-overlay-bg" style="background: rgba(\${hoverColor}, 0.85);"></div>
            <div class="hover-icon-wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; opacity: 0; transition: opacity 0.3s;">
              <div class="hover-icon-cross" style="color: \${isotypeColor};">
                \${isotypeHTML}
              </div>
            </div>
          </div>
          <div class="activity-card-body" style="text-align: center;">
            <div class="activity-footer-item" style="justify-content: center; margin-bottom: 8px; color: var(--color-text-muted);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              <span style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">\${act.date}</span>
            </div>
            <h3 class="hover-scale-title" style="margin-bottom: 12px;">\${act.title[currentLang]}</h3>
          </div>
        </article>
      \`;
    } else {
      // ACTIVIDADES
      const keywords = act.tags && act.tags.length > 0 ? act.tags.join(' &middot; ') : '';
      return \`
        <article class="\${actClass}" data-id="\${act.id}" data-type="\${act.type || 'actividad'}" data-cursor-color="\${cursorColor}">
          <div class="activity-image-wrapper">
            \${imgPath}
            <div class="hover-overlay-bg" style="background: rgba(\${hoverColor}, 0.85);"></div>

            <div class="hover-icon-wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; opacity: 0; transition: opacity 0.3s;">
              <div style="color: \${isotypeColor}; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>
                \${tagText} \${keywords ? '&mdash; ' + keywords : ''}
              </div>
              <div class="hover-icon-cross" style="color: \${isotypeColor};">
                \${isotypeHTML}
              </div>
            </div>
          </div>
          <div class="activity-card-body" style="text-align: center;">
            <div class="activity-footer-item" style="justify-content: center; margin-bottom: 8px; color: var(--color-blue);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              <span style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">\${act.date}</span>
            </div>
            <h3 class="hover-scale-title">\${act.title[currentLang]}</h3>
          </div>
        </article>
      \`;
    }
  };

`;
js = js.replace(oldGenerateCardHTML, newGenerateCardHTML);

// 5. Update Cursor Logic
const oldCursorEvents = js.substring(js.indexOf('const updateCursorEvents = () => {'), js.indexOf('updateCursorEvents();', js.indexOf('const updateCursorEvents = () => {')) + 21);

const newCursorEvents = `window.updateCursorEvents = () => {
      document.querySelectorAll('a, button, [role="button"], .activity-card, .news-card, .resource-card, .pub-card, .section-nav-card').forEach(el => {
        el.onmouseenter = null;
        el.onmouseleave = null;
      });

      // All interactable elements that don't have a specific cursor color should get the default grey rotating isotype
      document.querySelectorAll('a:not([data-cursor-color]), button:not([data-cursor-color]), [role="button"]:not([data-cursor-color])').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover-button'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover-button'));
      });

      // Elements that have a specific data-cursor-color
      document.querySelectorAll('[data-cursor-color]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover-post');
          cursor.setAttribute('data-color', el.getAttribute('data-cursor-color'));
          cursor.textContent = 'VER';
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover-post');
          cursor.removeAttribute('data-color');
          cursor.textContent = '';
        });
      });
    };
    window.updateCursorEvents();
`;
js = js.replace(oldCursorEvents, newCursorEvents);


// 6. Fix mapPubHTML but only the ONE inside renderPublications!
// We find it by looking inside function renderPublications() {
const renderPubStart = js.indexOf('function renderPublications() {');
if (renderPubStart > -1) {
  const mapPubStart = js.indexOf('const mapPubHTML = pub => {', renderPubStart);
  if (mapPubStart > -1) {
    const mapPubEnd = js.indexOf("if (pubFilterType === 'all') {", mapPubStart);
    const oldMapPubHTML = js.substring(mapPubStart, mapPubEnd);
    
    const newMapPubHTML = `const mapPubHTML = pub => {
    // Hover icon: rotating outer isotype + cross
    const isotypeHTML = \`
      <div style="position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
        <svg class="isotype-spin" viewBox="0 0 100 100" style="position: absolute; width: 100%; height: 100%; animation: rotateCursor 10s linear infinite;">
          <!-- Outer circles and lines of the isotype -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 5" />
        </svg>
        <div style="font-size: 32px; font-weight: 300; line-height: 1; color: #c4b5fd;">+</div>
      </div>
    \`;

    return \`
      <article class="pub-card" data-id="\${pub.id}" data-cursor-color="purple">
        <div class="pub-cover activity-image-wrapper" style="position: relative; overflow: hidden; border-radius: 12px 12px 0 0;">
          <img src="\${pub.coverImage}" alt="\${pub.title[currentLang]}" style="width: 100%; height: 200px; object-fit: cover;">
          <div class="hover-overlay-bg" style="background: rgba(139, 92, 246, 0.85); position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;"></div>
          <div class="hover-icon-wrapper" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;">
            <div class="hover-icon-cross" style="color: #c4b5fd;">
              \${isotypeHTML}
            </div>
            <div class="hover-text-top" style="color: #c4b5fd; margin-top: 20px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">\${pub.type === 'revista' ? 'Artículo' : pub.type === 'congreso' ? 'Congreso' : 'Libro'}</div>
          </div>
        </div>
        <div class="pub-info" style="padding: 20px;">
          <h3 class="pub-title" style="font-size: 1.1rem; line-height: 1.4; margin-bottom: 12px;">\${pub.title[currentLang]}</h3>
          <p class="pub-citation" style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">\${pub.citation}</p>
        </div>
      </article>
    \`;
  };

  `;
    js = js.substring(0, mapPubStart) + newMapPubHTML + js.substring(mapPubEnd);
  }
}

fs.writeFileSync('src/main.js', js);
console.log('All JS changes applied correctly');
