const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Replace generateCardHTML
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
fs.writeFileSync('src/main.js', js);
console.log('generateCardHTML updated');
