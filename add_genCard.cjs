const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const genCardNew = `
function generateCardHTML(activity, color = 'blue') {
    const title = activity.title[currentLang] || activity.title.es;
    const desc = activity.desc[currentLang] || activity.desc.es;
    const date = activity.date[currentLang] || activity.date.es;
    const modality = activity.modality[currentLang] || activity.modality.es;
    const type = activity.type[currentLang] || activity.type.es;
    const linkText = translations[currentLang]?.learn_more || 'Saber más';
    
    // Idle: background white, top: date, center: title. Hidden: keywords, type, modality, "ver+"
    // Hover: intense color, icon+type top, ver+ colored
    return \`
      <div class="activity-card act-card hover-scale-title" data-id="\${activity.id}" data-cursor-color="\${color}" onclick="openActivityModal('\${activity.id}')">
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
}
`;

js = js.replace('function renderActivities(filter = \'all\') {', genCardNew + '\nfunction renderActivities(filter = \'all\') {');
fs.writeFileSync('src/main.js', js);
console.log('Added generateCardHTML');
