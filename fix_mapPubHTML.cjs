const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const oldMapPubHTML = js.substring(js.indexOf('const mapPubHTML = pub => {'), js.indexOf('if (pubFilterType === \'all\') {'));

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
js = js.replace(oldMapPubHTML, newMapPubHTML);
fs.writeFileSync('src/main.js', js);
console.log('mapPubHTML updated');
