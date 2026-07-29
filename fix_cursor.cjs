const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

const oldCursorEvents = js.substring(js.indexOf('const updateCursorEvents = () => {'), js.indexOf('updateCursorEvents();', js.indexOf('const updateCursorEvents = () => {')) + 21);

const newCursorEvents = `const updateCursorEvents = () => {
      document.querySelectorAll('a, button, [role="button"], .activity-card, .news-card, .resource-card, .pub-card').forEach(el => {
        el.onmouseenter = null;
        el.onmouseleave = null;
        
        // Remove previous listeners using a clone technique or just add safe ones if needed
        // Simpler: Just rely on CSS hover state removal or re-adding cleanly
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
    updateCursorEvents();
`;
js = js.replace(oldCursorEvents, newCursorEvents);
fs.writeFileSync('src/main.js', js);
console.log('Cursor logic updated');
