const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

// 1. Remove aspect-ratio and justify-content from original section-nav-card
css = css.replace(/aspect-ratio:\s*1;\s*/g, '');
css = css.replace(/justify-content:\s*center;\s*display:\s*flex;/g, 'display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: flex-start;');

// 2. Remove the duplicated .section-nav-card at the bottom
const duplicateCardStart = css.lastIndexOf('.section-nav-card {\n  padding: 24px;');
if (duplicateCardStart > -1) {
  const duplicateCardEnd = css.indexOf('}', duplicateCardStart) + 1;
  css = css.substring(0, duplicateCardStart) + css.substring(duplicateCardEnd);
}

// 3. Update the padding and max-width on the primary .section-nav-card
css = css.replace('padding: 42px 36px;', 'padding: 32px 24px;\n  max-width: 320px;\n  margin: 0 auto;\n  height: 100%;');

// 4. Ensure hover states color the arrow properly
// The colors are: blue, turquoise, purple, green
const hoverColorOverrides = `
/* Hover Colors for Arrows and Text */
.card-actividades:hover .nav-card-arrow, .card-actividades:hover h3, .card-actividades:hover p { color: #1D5BFE !important; }
.card-transferencia:hover .nav-card-arrow, .card-transferencia:hover h3, .card-transferencia:hover p { color: #14b8a6 !important; }
.card-publicaciones:hover .nav-card-arrow, .card-publicaciones:hover h3, .card-publicaciones:hover p { color: #8b5cf6 !important; }
.card-recursos:hover .nav-card-arrow, .card-recursos:hover h3, .card-recursos:hover p { color: #10b981 !important; }

/* In idle, text and arrow must be white since background is colored */
.card-actividades .nav-card-arrow, .card-actividades h3, .card-actividades p { color: #ffffff !important; }
.card-transferencia .nav-card-arrow, .card-transferencia h3, .card-transferencia p { color: #ffffff !important; }
.card-publicaciones .nav-card-arrow, .card-publicaciones h3, .card-publicaciones p { color: #ffffff !important; }
.card-recursos .nav-card-arrow, .card-recursos h3, .card-recursos p { color: #ffffff !important; }

.card-publicaciones { background: #8b5cf6; border: none; }
.card-publicaciones:hover { background: #ffffff; box-shadow: 0 15px 35px rgba(139, 92, 246, 0.3); }

.card-recursos { background: #10b981; border: none; }
.card-recursos:hover { background: #ffffff; box-shadow: 0 15px 35px rgba(16, 185, 129, 0.3); }
`;
css = css + '\\n' + hoverColorOverrides;

fs.writeFileSync('src/style.css', css);
console.log('Fixed CSS for section-nav-card');
