const fs = require('fs');
const js = fs.readFileSync('src/main.js', 'utf8');
try {
  // We can't fully run it, but we can check if it throws immediately if we mock window/document
  const mockDOM = `
    const window = { location: { hash: '' }, addEventListener: () => {}, updateCursorEvents: () => {} };
    const document = { 
      querySelectorAll: () => [], 
      getElementById: () => ({ innerHTML: '', classList: { add: ()=>{}, remove: ()=>{} }, addEventListener: ()=>{} }),
      addEventListener: () => {}
    };
    const navigator = { language: 'es' };
    const localStorage = { getItem: () => null, setItem: () => {} };
  `;
  eval(mockDOM + js);
  console.log("No top-level runtime errors.");
} catch (e) {
  console.error("Runtime Error:", e);
}
