const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

const actCss = `
/* --- ACTIVIDADES & TRANSFERENCIA CARDS REDESIGN --- */
.act-card {
  position: relative;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: 20px;
  padding: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  text-decoration: none;
  color: var(--color-text-light);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

body.dark-mode .act-card {
  background: var(--color-bg-card-dark);
  border-color: var(--color-border-dark);
  color: var(--color-text-dark);
}

/* Idle Content: Date top, Title bottom */
.act-idle-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: opacity 0.3s ease;
}

.act-date {
  font-size: 13px;
  color: var(--color-text-muted-light);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.act-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: auto; /* Push to bottom */
}

/* Hover Content: Hidden by default */
.act-hover-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  opacity: 0;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  transform: translateY(20px);
}

.act-top-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
}

.act-desc {
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255,255,255,0.9);
}

/* Hover States based on cursor color (blue/turquoise) */
.act-card[data-cursor-color="blue"]:hover {
  background: #0d2873 !important; /* Tono azul oscuro */
  border-color: transparent;
  box-shadow: 0 15px 35px rgba(29, 91, 254, 0.2);
}

.act-card[data-cursor-color="turquoise"]:hover {
  background: #095048 !important; /* Tono turquesa oscuro */
  border-color: transparent;
  box-shadow: 0 15px 35px rgba(20, 184, 166, 0.2);
}

.act-card:hover .act-idle-content {
  opacity: 0;
  visibility: hidden;
}

.act-card:hover .act-hover-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Modal specific fixes */
.rec-modal-content {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
body.dark-mode .rec-modal-content {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
}
`;

css = css + '\n' + actCss;
fs.writeFileSync('src/style.css', css);
console.log('Added .act-card CSS');
