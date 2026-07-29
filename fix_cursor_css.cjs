const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

// Replace the cursor data-colors logic to use SVG
const cursorColorsRegex = /#custom-cursor\.hover-post\[data-color="blue"\] \{ background-color: #1D5BFE !important; \}[\s\S]*?#custom-cursor\.hover-post\[data-color="green"\] \{ background-color: #10b981 !important; \}/;

const newCursorColors = `
#custom-cursor.hover-post[data-color="blue"] {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%231D5BFE"/><path d="M50 25v50M25 50h50" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/></svg>');
  background-color: transparent !important;
  background-size: cover;
  border-radius: 50%;
}
#custom-cursor.hover-post[data-color="turquoise"] {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%2314b8a6"/><path d="M50 25v50M25 50h50" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/></svg>');
  background-color: transparent !important;
  background-size: cover;
  border-radius: 50%;
}
#custom-cursor.hover-post[data-color="purple"] {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%238b5cf6"/><path d="M50 25v50M25 50h50" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/></svg>');
  background-color: transparent !important;
  background-size: cover;
  border-radius: 50%;
}
#custom-cursor.hover-post[data-color="green"] {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%2310b981"/><path d="M50 25v50M25 50h50" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/></svg>');
  background-color: transparent !important;
  background-size: cover;
  border-radius: 50%;
}
`;

if (cursorColorsRegex.test(css)) {
  css = css.replace(cursorColorsRegex, newCursorColors);
} else {
  css += '\n' + newCursorColors;
}

// Remove "VER" text from hover-post
css = css.replace(/#custom-cursor\.hover-post \{[\s\S]*?\}/, `
#custom-cursor.hover-post {
  width: 70px; height: 70px;
  color: transparent !important;
  border: none;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
`);

fs.writeFileSync('src/style.css', css);
console.log('Fixed cursor SVG background');
