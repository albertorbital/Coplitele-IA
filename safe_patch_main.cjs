const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const actStr = fs.readFileSync('final_act.js', 'utf8');

// 1. Remove the old transferActivities declaration completely.
const oldActStart = js.indexOf('const transferActivities = [');
const oldActEnd = js.indexOf('];', oldActStart) + 2;
js = js.substring(0, oldActStart) + actStr + '\n\n' + js.substring(oldActEnd);

// Ensure the new actStr contains section properties (using real newlines in replacement)
js = js.replace(/id: "act-new",/g, 'id: "act-new",\n    section: "actividades",\n    filterType: "seminario",');
js = js.replace(/id: "act-posidonia",/g, 'id: "act-posidonia",\n    section: "transferencia",\n    filterType: "taller",');
js = js.replace(/id: "act-workshop2",/g, 'id: "act-workshop2",\n    section: "actividades",\n    filterType: "formacion",');
js = js.replace(/id: "act-seminario-ia",/g, 'id: "act-seminario-ia",\n    section: "actividades",\n    filterType: "jornada",');
js = js.replace(/id: "act-colab-escuelas",/g, 'id: "act-colab-escuelas",\n    section: "transferencia",\n    filterType: "colaboracion",');
js = js.replace(/id: "act-demo-herramientas",/g, 'id: "act-demo-herramientas",\n    section: "actividades",\n    filterType: "taller",');

// 2. Add Project Resources
const recCode = `
const projectResources = [
  { id: "rec-guia-evaluacion", title: {es:"Guía de Evaluación de IA",ca:"Guia d'Avaluació d'IA",en:"AI Evaluation Guide"}, desc: {es:"Marco metodológico para evaluar el impacto de agentes conversacionales.",ca:"Marc metodològic per avaluar l'impacte d'agents conversacionals.",en:"Methodological framework to evaluate the impact of conversational agents."}, filterType: "guia", link: "#", tag: {es:"Guía metodológica",ca:"Guia metodològica",en:"Methodological guide"} },
  { id: "rec-agente-tutor", title: {es:"Agente Tutor Coplitele",ca:"Agent Tutor Coplitele",en:"Coplitele Tutor Agent"}, desc: {es:"Prototipo de agente pedagógico para acompañamiento de estudiantes.",ca:"Prototip d'agent pedagògic per a acompanyament d'estudiants.",en:"Pedagogical agent prototype for student accompaniment."}, filterType: "agente", link: "#", tag: {es:"Software / Agente",ca:"Programari / Agent",en:"Software / Agent"} },
  { id: "rec-protocolo-datos", title: {es:"Protocolo de Privacidad",ca:"Protocol de Privacitat",en:"Privacy Protocol"}, desc: {es:"Estándares éticos para la recopilación de datos de interacción.",ca:"Estàndards ètics per a la recopilació de dades d'interacció.",en:"Ethical standards for interaction data collection."}, filterType: "protocolo", link: "#", tag: {es:"Documento de políticas",ca:"Document de polítiques",en:"Policy document"} },
  { id: "rec-informe-2025", title: {es:"Informe Preliminar 2025",ca:"Informe Preliminar 2025",en:"Preliminary Report 2025"}, desc: {es:"Resultados de la primera fase de implementación en aulas.",ca:"Resultats de la primera fase d'implementació a les aules.",en:"Results from the first phase of classroom implementation."}, filterType: "informe", link: "#", tag: {es:"Reporte de investigación",ca:"Report d'investigació",en:"Research report"} }
];

function renderResources(filter = 'all') {
  const container = document.getElementById('resources-grid');
  if (!container) return;
  const filtered = filter === 'all' ? projectResources : projectResources.filter(r => r.filterType === filter);
  if (filtered.length === 0) { container.innerHTML = '<p style="text-align:center; color: var(--color-text-muted); padding: 40px;">No hay recursos en esta categoría.</p>'; return; }

  container.innerHTML = filtered.map(r => {
    return \`
      <div class="resource-card hover-scale-title" data-cursor-color="green" style="background:#ffffff; border-radius:16px; padding:24px; box-shadow:0 4px 15px rgba(0,0,0,0.05); transition:all 0.3s ease; border: 1px solid #e2e8f0; cursor:none;" onclick="openRecModal('\${r.id}')">
        <h3 style="font-size:18px; margin-bottom:10px; color:#1e293b;">\${r.title[currentLang] || r.title.es}</h3>
        <p style="font-size:14px; color:#64748b; margin-bottom:20px; line-height:1.5;">\${r.desc[currentLang] || r.desc.es}</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn-secondary" style="font-size:13px; padding:6px 16px; background:#f1f5f9; color:#10b981; border:none; border-radius:20px; font-weight:600; pointer-events:none;">Ver Detalles &rarr;</button>
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
  document.getElementById('recModalBody').innerHTML = \`<p style="margin-bottom: 15px; color: var(--color-text-light);">\${rec.desc[currentLang] || rec.desc.es}</p><div style="background: rgba(16,185,129,0.05); padding: 15px; border-radius: 8px; border: 1px solid rgba(16,185,129,0.2);"><strong>Categoría:</strong> \${rec.tag[currentLang] || rec.tag.es}</div>\`;
  document.getElementById('recModalFooter').innerHTML = \`<a href="\${rec.link}" class="btn-primary" style="background:#10b981; color:#fff;" target="_blank">Descargar / Acceder</a>\`;
  document.getElementById('recModal').classList.add('show');
};

document.addEventListener('DOMContentLoaded', () => {
  const closeModalBtn = document.getElementById('recModalClose');
  if(closeModalBtn) closeModalBtn.addEventListener('click', () => document.getElementById('recModal').classList.remove('show'));
  const recModal = document.getElementById('recModal');
  if(recModal) recModal.addEventListener('click', (e) => { if (e.target === recModal) recModal.classList.remove('show'); });
});
`;
js = js.replace('// Function to get icon based on type', recCode + '\n\n// Function to get icon based on type');

// 3. Replace renderTransferActivities
const actReplacement = `
function renderTransferActivities(filter = 'all') {
  const actContainer = document.getElementById('activities-grid');
  const transContainer = document.getElementById('transferencia-grid');
  
  if (actContainer) {
    const acts = filter === 'all' ? transferActivities.filter(a => a.section === 'actividades') : transferActivities.filter(a => a.section === 'actividades' && a.filterType === filter);
    actContainer.innerHTML = acts.map(a => generateCardHTML(a, 'blue')).join('');
  }
  
  if (transContainer && filter === 'all') {
    const trans = transferActivities.filter(a => a.section === 'transferencia');
    transContainer.innerHTML = trans.map(a => generateCardHTML(a, 'turquoise')).join('');
  } else if (transContainer) {
    const trans = transferActivities.filter(a => a.section === 'transferencia' && a.filterType === filter);
    transContainer.innerHTML = trans.map(a => generateCardHTML(a, 'turquoise')).join('');
  }
  if(window.updateCursorEvents) window.updateCursorEvents();
}

function generateCardHTML(activity, color = 'blue') {
    const title = activity.title[currentLang] || activity.title.es;
    const desc = activity.desc[currentLang] || activity.desc.es;
    const date = activity.date || "11 Marzo";
    const modality = activity.modality ? (activity.modality[currentLang] || activity.modality.es) : '';
    const type = activity.tag ? (activity.tag[currentLang] || activity.tag.es) : '';
    
    return \`
      <div class="activity-card act-card hover-scale-title" data-id="\${activity.id}" data-cursor-color="\${color}" onclick="window.location.hash = '#/actividad/\${activity.id}'">
        <div class="act-idle-content">
          <span class="act-date">\${date}</span>
          <h3 class="act-title">\${title}</h3>
        </div>
        <div class="act-hover-content">
          <div class="act-top-row">
            <span class="act-icon">📌</span>
            <span class="act-type">\${type}</span>
            \${modality ? \`<span class="act-modality">\${modality}</span>\` : ''}
          </div>
          <p class="act-desc">\${desc}</p>
        </div>
      </div>
    \`;
}
`;
js = js.replace(/function renderTransferActivities\(\) \{[\s\S]*?function renderActivityDetail/m, actReplacement + '\n\nfunction renderActivityDetail');

// 4. Update mapPubHTML
js = js.replace(/<a href="\${pub\.link}" target="_blank" class="pub-card" data-pub-id="\${pub\.id}">/g, '<div class="pub-card" data-cursor-color="purple" data-pub-id="${pub.id}" onclick="window.open(\'${pub.link}\', \'_blank\')">');
js = js.replace(/<\/a>\s*`;/g, '</div>\n    `;');

// 5. Update renderNewsFeed
js = js.replace(/<div class="news-card"/g, '<div class="news-card" data-cursor-color="green"');

// 6. Update filter buttons logic
js = js.replace(/document\.querySelectorAll\('\.pub-filter-btn'\)/g, "document.querySelectorAll('.pub-filter-btn, .act-filter-btn, .rec-filter-btn')");
js = js.replace(/document\.querySelectorAll\('\.pub-filter-btn'\)\.forEach/g, "document.querySelectorAll('.pub-filter-btn, .act-filter-btn, .rec-filter-btn').forEach");

const filterLogic = `
        const filterValue = this.getAttribute('data-filter');
        
        if (this.classList.contains('act-filter-btn')) {
          document.querySelectorAll('.act-filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          renderTransferActivities(filterValue);
        } else if (this.classList.contains('rec-filter-btn')) {
          document.querySelectorAll('.rec-filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          renderResources(filterValue);
        } else {
          document.querySelectorAll('.pub-filter-btn').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          pubFilterType = filterValue;
          renderPublications();
        }
`;
js = js.replace(/const filterValue = this\.getAttribute\('data-filter'\);[\s\S]*?renderPublications\(\);/m, filterLogic);


// 7. Inject updateCursorEvents globally and render initial calls
const cursorLogic = `
window.updateCursorEvents = () => {
  const cursor = document.getElementById('custom-cursor');
  if(!cursor) return;

  document.querySelectorAll('a, button, [role="button"], .activity-card, .news-card, .resource-card, .pub-card, .section-nav-card').forEach(el => {
    // remove old listeners
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
      cursor.textContent = ''; // NO "VER" text, just the isotype background!
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
    renderTransferActivities();
    renderResources();
    if(window.updateCursorEvents) window.updateCursorEvents();
  }, 300);
});
`;
js = js + '\n' + cursorLogic;

fs.writeFileSync('src/main.js', js);
console.log('Successfully applied ALL patches perfectly');
