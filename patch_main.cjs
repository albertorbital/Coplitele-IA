const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// 1. Add final_act.js array at the top
const acts = fs.readFileSync('final_act.js', 'utf8');
js = js.replace('const publications = [', acts + '\n\nconst publications = [');

// 2. Add resources array before filter buttons logic
const resourcesArray = `
// ------------------------------------------------
// 2.2 RESOURCES ARRAY
// ------------------------------------------------
const projectResources = [
  {
    id: "rec-guia-evaluacion",
    title: {
      es: "Guía de Evaluación de IA",
      ca: "Guia d'Avaluació d'IA",
      en: "AI Evaluation Guide"
    },
    desc: {
      es: "Marco metodológico para evaluar el impacto de agentes conversacionales.",
      ca: "Marc metodològic per avaluar l'impacte d'agents conversacionals.",
      en: "Methodological framework to evaluate the impact of conversational agents."
    },
    filterType: "guia",
    link: "#",
    tag: {
      es: "Guía metodológica",
      ca: "Guia metodològica",
      en: "Methodological guide"
    }
  },
  {
    id: "rec-agente-tutor",
    title: {
      es: "Agente Tutor Coplitele",
      ca: "Agent Tutor Coplitele",
      en: "Coplitele Tutor Agent"
    },
    desc: {
      es: "Prototipo de agente pedagógico para acompañamiento de estudiantes.",
      ca: "Prototip d'agent pedagògic per a acompanyament d'estudiants.",
      en: "Pedagogical agent prototype for student accompaniment."
    },
    filterType: "agente",
    link: "#",
    tag: {
      es: "Software / Agente",
      ca: "Programari / Agent",
      en: "Software / Agent"
    }
  },
  {
    id: "rec-protocolo-datos",
    title: {
      es: "Protocolo de Privacidad",
      ca: "Protocol de Privacitat",
      en: "Privacy Protocol"
    },
    desc: {
      es: "Estándares éticos para la recopilación de datos de interacción.",
      ca: "Estàndards ètics per a la recopilació de dades d'interacció.",
      en: "Ethical standards for interaction data collection."
    },
    filterType: "protocolo",
    link: "#",
    tag: {
      es: "Documento de políticas",
      ca: "Document de polítiques",
      en: "Policy document"
    }
  },
  {
    id: "rec-informe-2025",
    title: {
      es: "Informe Preliminar 2025",
      ca: "Informe Preliminar 2025",
      en: "Preliminary Report 2025"
    },
    desc: {
      es: "Resultados de la primera fase de implementación en aulas.",
      ca: "Resultats de la primera fase d'implementació a les aules.",
      en: "Results from the first phase of classroom implementation."
    },
    filterType: "informe",
    link: "#",
    tag: {
      es: "Reporte de investigación",
      ca: "Report d'investigació",
      en: "Research report"
    }
  }
];

// ------------------------------------------------
// 2.3 RENDER RESOURCES
// ------------------------------------------------
function renderResources(filter = 'all') {
  const container = document.getElementById('resources-grid');
  if (!container) return;
  const filtered = filter === 'all' ? projectResources : projectResources.filter(r => r.filterType === filter);
  
  if (filtered.length === 0) {
    container.innerHTML = \`<p style="text-align:center; color: var(--color-text-muted); padding: 40px;">No hay recursos en esta categoría.</p>\`;
    return;
  }

  container.innerHTML = filtered.map(r => {
    return \`
      <div class="resource-card hover-scale-title" data-cursor-color="green" style="background:#ffffff; border-radius:16px; padding:24px; box-shadow:0 4px 15px rgba(0,0,0,0.05); transition:all 0.3s ease; border: 1px solid #e2e8f0; cursor:none;" onclick="openRecModal('\${r.id}')">
        <span style="font-size:12px; font-weight:700; color:#10b981; background:rgba(16,185,129,0.1); padding:4px 10px; border-radius:20px; display:inline-block; margin-bottom:12px;">\${r.tag[currentLang] || r.tag.es}</span>
        <h3 style="font-size:18px; margin-bottom:10px; color:#1e293b;">\${r.title[currentLang] || r.title.es}</h3>
        <p style="font-size:14px; color:#64748b; margin-bottom:20px; line-height:1.5;">\${r.desc[currentLang] || r.desc.es}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn-secondary" style="font-size:13px; padding:6px 16px; background:#f1f5f9; color:#10b981; border:none; border-radius:20px; font-weight:600; cursor:none;">Ver Detalles &rarr;</button>
        </div>
      </div>
    \`;
  }).join('');
  
  if(window.updateCursorEvents) window.updateCursorEvents();
}

window.openRecModal = function(id) {
  const rec = projectResources.find(r => r.id === id);
  if(!rec) return;
  document.getElementById('recModalTitle').textContent = rec.title[currentLang] || rec.title.es;
  document.getElementById('recModalBody').innerHTML = \`
    <p style="margin-bottom: 15px; color: var(--color-text-light);">\${rec.desc[currentLang] || rec.desc.es}</p>
    <div style="background: rgba(16,185,129,0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(16,185,129,0.2);">
      <strong>Categoría:</strong> \${rec.tag[currentLang] || rec.tag.es}
    </div>
  \`;
  document.getElementById('recModalFooter').innerHTML = \`
    <a href="\${rec.link}" class="btn-primary" style="background:#10b981; color:#fff;" target="_blank">Descargar / Acceder</a>
  \`;
  document.getElementById('recModal').classList.add('show');
};

document.addEventListener('DOMContentLoaded', () => {
  const closeModalBtn = document.getElementById('recModalClose');
  if(closeModalBtn) closeModalBtn.addEventListener('click', () => document.getElementById('recModal').classList.remove('show'));
  const recModal = document.getElementById('recModal');
  if(recModal) recModal.addEventListener('click', (e) => { if (e.target === recModal) recModal.classList.remove('show'); });
});

`;
js = js.replace('// --- 3. FILTER BUTTONS LOGIC ---', resourcesArray + '\n// --- 3. FILTER BUTTONS LOGIC ---');


// 3. Fix filter buttons logic to handle actividades and recursos
js = js.replace(/document\.querySelectorAll\('\.filter-btn'\)/g, "document.querySelectorAll('.filter-btn, .act-filter-btn, .rec-filter-btn')");
js = js.replace(/document\.querySelectorAll\('\.filter-btn'\)\.forEach/g, "document.querySelectorAll('.filter-btn, .act-filter-btn, .rec-filter-btn').forEach");

const renderCardsLogic = `
        const filterValue = this.getAttribute('data-filter');
        
        if (this.classList.contains('act-filter-btn')) {
          document.querySelectorAll('.act-filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          renderActivities(filterValue);
        } else if (this.classList.contains('rec-filter-btn')) {
          document.querySelectorAll('.rec-filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          renderResources(filterValue);
        } else {
          renderPublications(filterValue);
        }
`;
js = js.replace("renderPublications(filterValue);", renderCardsLogic);


// 4. Implement renderActivities and remove static activities setup
const renderActLogic = `
function renderActivities(filter = 'all') {
  const actContainer = document.getElementById('activities-grid');
  const transContainer = document.getElementById('transferencia-grid');
  
  if (actContainer) {
    const acts = filter === 'all' ? transferActivities.filter(a => a.section === 'actividades') : transferActivities.filter(a => a.section === 'actividades' && a.filterType === filter);
    actContainer.innerHTML = acts.map(a => generateCardHTML(a, 'blue')).join('');
  }
  
  if (transContainer && filter === 'all') {
    const trans = transferActivities.filter(a => a.section === 'transferencia');
    transContainer.innerHTML = trans.map(a => generateCardHTML(a, 'turquoise')).join('');
  }
  
  if(window.updateCursorEvents) window.updateCursorEvents();
}
`;
js = js.replace("function renderPublications(filter = 'all') {", renderActLogic + "\nfunction renderPublications(filter = 'all') {");

const genCardOriginal = `function generateCardHTML(activity) {`;
const genCardNew = `function generateCardHTML(activity, color = 'blue') {
    const title = activity.title[currentLang] || activity.title.es;
    const desc = activity.desc[currentLang] || activity.desc.es;
    const date = activity.date[currentLang] || activity.date.es;
    const modality = activity.modality[currentLang] || activity.modality.es;
    const type = activity.type[currentLang] || activity.type.es;
    const linkText = translations[currentLang]?.learn_more || 'Saber más';
    
    // Convert to new styling requested by user
    // Idle: background white, top: date, center: title. Hidden: keywords, type, modality, "ver+"
    // Hover: intense color, icon+type top, ver+ colored
    return \`
      <div class="activity-card act-card hover-scale-title" data-id="\${activity.id}" data-cursor-color="\${color}">
        <!-- Idle State content -->
        <div class="act-idle-content">
          <span class="act-date">\${date}</span>
          <h3 class="act-title">\${title}</h3>
        </div>
        
        <!-- Hover State content (revealed via CSS) -->
        <div class="act-hover-content">
          <div class="act-top-row">
            <span class="act-icon">📌</span>
            <span class="act-type">\${type}</span>
            <span class="act-modality">\${modality}</span>
          </div>
          <p class="act-desc">\${desc}</p>
        </div>
      </div>
    \`;
`;
// Replace the entire generateCardHTML function up to its closing brace
js = js.replace(/function generateCardHTML\(activity\) \{[\s\S]*?return `[\s\S]*?`;\n  \}/, genCardNew);

// 5. Update mapPubHTML to inject data-cursor-color="purple" and remove link wrap
js = js.replace(/<a href="\${pub\.link}" target="_blank" class="pub-card" data-pub-id="\${pub\.id}">/g, '<div class="pub-card" data-cursor-color="purple" data-pub-id="${pub.id}" onclick="window.open(\'${pub.link}\', \'_blank\')">');
js = js.replace(/<\/a>\n    `;/g, '</div>\n    `;');

// 6. Fix renderNewsFeed to add data-cursor-color="green" to .news-card
js = js.replace(/<div class="news-card"/g, '<div class="news-card" data-cursor-color="green"');


// 7. Inject initial render calls at the bottom of the file inside DOMContentLoaded
js = js.replace("renderNewsFeed();\n  renderPublications();", "renderNewsFeed();\n  renderPublications();\n  renderActivities();\n  renderResources();");


// 8. Add updateCursorEvents globally and call it during initialization
const cursorLogic = `
window.updateCursorEvents = () => {
  const cursor = document.getElementById('custom-cursor');
  if(!cursor) return;

  document.querySelectorAll('a, button, [role="button"], .activity-card, .news-card, .resource-card, .pub-card, .section-nav-card').forEach(el => {
    // remove old listeners if we re-render
    const newEl = el.cloneNode(true);
    if(el.parentNode) el.parentNode.replaceChild(newEl, el);
  });

  document.querySelectorAll('a:not([data-cursor-color]), button:not([data-cursor-color]), [role="button"]:not([data-cursor-color])').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover-button'); cursor.textContent = ''; });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover-button'); });
  });

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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if(window.updateCursorEvents) window.updateCursorEvents();
  }, 500);
});
`;

js = js + '\n' + cursorLogic;

fs.writeFileSync('src/main.js', js);
console.log('Successfully patched main.js');
