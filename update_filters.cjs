const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Resources filters logic is already partly in main.js, let's replace it to point to renderResources
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

fs.writeFileSync('src/main.js', js);
console.log('Fixed resource filter logic');
