const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

// Find the start and end of transferActivities
const start = js.indexOf('const transferActivities = [');
const end = js.indexOf('];', start) + 2;

let actsStr = js.substring(start, end);
// Manually add section properties based on id or type
actsStr = actsStr.replace(/id: "act-new",/g, 'id: "act-new",\n    section: "actividades",\n    filterType: "seminario",');
actsStr = actsStr.replace(/id: "act-posidonia",/g, 'id: "act-posidonia",\n    section: "transferencia",\n    filterType: "taller",');
actsStr = actsStr.replace(/id: "act-workshop2",/g, 'id: "act-workshop2",\n    section: "actividades",\n    filterType: "formacion",');
actsStr = actsStr.replace(/id: "act-seminario-ia",/g, 'id: "act-seminario-ia",\n    section: "actividades",\n    filterType: "jornada",');
actsStr = actsStr.replace(/id: "act-colab-escuelas",/g, 'id: "act-colab-escuelas",\n    section: "transferencia",\n    filterType: "colaboracion",');
actsStr = actsStr.replace(/id: "act-demo-herramientas",/g, 'id: "act-demo-herramientas",\n    section: "actividades",\n    filterType: "taller",');

js = js.substring(0, start) + actsStr + js.substring(end);
fs.writeFileSync('src/main.js', js);
console.log('Fixed transferActivities properties');
