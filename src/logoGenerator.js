/**
 * COPLITELE-IA Logo Generator (High Fidelity)
 * Generates a dynamic, interactive SVG logo based on project design rules.
 */

// Helper: Convert polar coordinates to Cartesian coordinates
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// Helper: Describe an SVG arc path (Clockwise)
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ");
}

/**
 * Generates logo configuration parameters.
 * @returns {Object} Config object with arc lengths and angles
 */
export function generateLogoConfig() {
  const totalGap = 45; // 3 gaps of 15 degrees
  const availableAngle = 360 - totalGap; // 315 degrees
  const minAngle = 45; // Minimum angle for any arc (ensure it doesn't disappear)
  
  // Distribute 180 (315 - 3 * 45) randomly into 3 parts
  const remainingToDistribute = availableAngle - (3 * minAngle); // 180
  
  const p1 = Math.random() * remainingToDistribute;
  const p2 = Math.random() * remainingToDistribute;
  
  const split1 = Math.min(p1, p2);
  const split2 = Math.max(p1, p2);
  
  const d1 = split1;
  const d2 = split2 - split1;
  const d3 = remainingToDistribute - split2;
  
  // Assign lengths
  const lenBlue = minAngle + d1;
  const lenTeal = minAngle + d2;
  const lenGreen = minAngle + d3;
  
  // Random start angle for the whole system (0 to 360)
  const startAngle = Math.random() * 360;
  const gap = 15;
  
  // Calculate spans
  const blueStart = startAngle;
  const blueEnd = blueStart + lenBlue;
  
  const tealStart = blueEnd + gap;
  const tealEnd = tealStart + lenTeal;
  
  const greenStart = tealEnd + gap;
  const greenEnd = greenStart + lenGreen;
  
  // Position of dots along the arcs (located at the start intersection)
  const dotPosBlue = blueStart;
  const dotPosTeal = tealStart;
  const dotPosGreen = greenStart;
  
  return {
    arcs: [
      { 
        id: "blue", 
        label: "Azul", 
        start: blueStart, 
        end: blueEnd, 
        length: lenBlue, 
        color: "hsl(224, 98%, 56%)", 
        dotPos: dotPosBlue, 
        centerOffsetAngle: 210,
        words: ["Codesign", "Learning", "Itineraries"]
      },
      { 
        id: "teal", 
        label: "Celeste", 
        start: tealStart, 
        end: tealEnd, 
        length: lenTeal, 
        color: "hsl(175, 65%, 65%)", 
        dotPos: dotPosTeal, 
        centerOffsetAngle: 330,
        words: ["Enhance", "Personalized", "Environments"]
      },
      { 
        id: "green", 
        label: "Verde", 
        start: greenStart, 
        end: greenEnd, 
        length: lenGreen, 
        color: "hsl(155, 55%, 58%)", 
        dotPos: dotPosGreen, 
        centerOffsetAngle: 150,
        words: ["Technology", "Inteligencia", "Artificial"]
      }
    ]
  };
}

/**
 * Creates SVG code string for the logo.
 * @param {Object} config Logo configuration returned by generateLogoConfig
 * @param {number} size Size of the logo square container
 * @param {boolean} isLarge Set true for the home hero details (orbits, dynamic words)
 * @returns {string} SVG HTML markup
 */
export function renderLogoSVG(config, size = 200, isLarge = false) {
  const center = size / 2;
  
  // Outer circle path for arcs (middle orbit for large version)
  const outerRadius = isLarge ? size * 0.30 : size * 0.35;
  const strokeWidth = isLarge ? size * 0.045 : size * 0.08;
  const perimDotRadius = strokeWidth * 0.65;
  const perimNotchRadius = perimDotRadius + (isLarge ? size * 0.012 : size * 0.02);
  
  const minArcLen = 45;
  const maxArcLen = 225;
  
  // Calculate center dots coordinates and sizes
  const centerDots = config.arcs.map(arc => {
    // Fraction of maximum arc length (0 to 1)
    const f = (arc.length - minArcLen) / (maxArcLen - minArcLen);
    
    // Size: larger if arc is longer
    const rMin = isLarge ? size * 0.045 : size * 0.06;
    const rMax = isLarge ? size * 0.08 : size * 0.11;
    const radius = rMin + (f * (rMax - rMin));
    
    // Centeredness: closer to center if arc is longer
    const maxOffset = isLarge ? size * 0.08 : size * 0.11;
    const minOffset = isLarge ? size * 0.01 : size * 0.015;
    const offset = maxOffset - (f * (maxOffset - minOffset));
    
    const pos = polarToCartesian(center, center, offset, arc.centerOffsetAngle);
    
    // Base equilateral triangle coordinates
    const R_equi = isLarge ? size * 0.065 : size * 0.09;
    let baseAngle = 0;
    if (arc.id === "blue") baseAngle = 240;
    else if (arc.id === "teal") baseAngle = 120;
    else if (arc.id === "green") baseAngle = 0;
    
    const basePos = polarToCartesian(center, center, R_equi, baseAngle);
    const dx = pos.x - basePos.x;
    const dy = pos.y - basePos.y;
    
    return {
      id: arc.id,
      color: arc.color,
      x: pos.x,
      y: pos.y,
      baseX: basePos.x,
      baseY: basePos.y,
      dx: dx,
      dy: dy,
      radius: radius
    };
  });
  
  // Sort center dots by radius so the largest is drawn on top (last)
  centerDots.sort((a, b) => a.radius - b.radius);
  
  // Generate SVG markup
  let svg = `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" style="overflow: visible;" xmlns="http://www.w3.org/2000/svg" class="coplitele-logo ${isLarge ? 'logo-large' : 'logo-small'}">`;
  
  // Definitions (Masks for the notches)
  svg += `<defs>`;
  config.arcs.forEach(arc => {
    const dotPos = polarToCartesian(center, center, outerRadius, arc.dotPos);
    svg += `
      <mask id="mask-${arc.id}-${isLarge ? 'lg' : 'sm'}" maskUnits="userSpaceOnUse">
        <rect x="0" y="0" width="${size}" height="${size}" fill="white" />
        <circle cx="${dotPos.x}" cy="${dotPos.y}" r="${perimNotchRadius}" fill="black" />
      </mask>
    `;
  });
  svg += `</defs>`;
  
  if (isLarge) {
    svg += `<g class="logo-rotating-group" style="transform-origin: ${center}px ${center}px;">`;
  }
  
  // 1. Orbits and Labels (Large Logo only)
  if (isLarge) {
    const innerOrbitRadius = size * 0.16;
    const middleOrbitRadius = outerRadius;
    const outerOrbitRadius = size * 0.40;
    
    // Grid Lines / Orbits in Background
    svg += `<circle cx="${center}" cy="${center}" r="${innerOrbitRadius}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.05" />`;
    svg += `<circle cx="${center}" cy="${center}" r="${middleOrbitRadius}" fill="none" stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.8" opacity="0.08" />`;
    svg += `<circle cx="${center}" cy="${center}" r="${outerOrbitRadius}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.06" />`;
  }
  
  // 2. Arcs (drawn with masks & dasharray for draw-in ease-out)
  config.arcs.forEach(arc => {
    const d = describeArc(center, center, outerRadius, arc.start, arc.end);
    
    // Math: Path length of arc in pixels = 2 * PI * R * (LengthInDegrees / 360)
    const pathLength = 2 * Math.PI * outerRadius * (arc.length / 360);
    
    // SVG Path with dashoffset style for ease-out drawing animation
    svg += `
      <path 
        d="${d}" 
        fill="none" 
        stroke="${arc.color}" 
        stroke-width="${strokeWidth}" 
        stroke-linecap="round" 
        mask="url(#mask-${arc.id}-${isLarge ? 'lg' : 'sm'})"
        class="logo-arc-path"
        style="
          stroke-dasharray: ${pathLength}; 
          stroke-dashoffset: ${pathLength}; 
          transition: stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        "
      />
    `;
  });
  
  // 3. Dots on the circumference
  config.arcs.forEach(arc => {
    const dotPos = polarToCartesian(center, center, outerRadius, arc.dotPos);
    svg += `
      <circle 
        cx="${dotPos.x}" 
        cy="${dotPos.y}" 
        r="${perimDotRadius}" 
        fill="${arc.color}" 
        class="logo-perim-dot perim-${arc.id}"
        style="opacity: 0; transform-origin: ${dotPos.x}px ${dotPos.y}px; transition: opacity 0.5s ease-out 1.2s;"
      />
    `;
  });
  
  // 4. Center dots (sorted by size, overlapping)
  svg += `<g class="logo-inner-rotating-group" style="transform-origin: ${center}px ${center}px; transition: transform 0.8s ease-out;">`;
  centerDots.forEach(dot => {
    svg += `
      <g 
        class="logo-center-dot-group center-group-${dot.id}" 
        data-dx="${dot.dx}" 
        data-dy="${dot.dy}"
        style="
          transform: translate(0px, 0px);
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        "
      >
        <circle 
          cx="${dot.baseX}" 
          cy="${dot.baseY}" 
          r="${dot.radius}" 
          fill="var(--logo-gray-dots)" 
          class="logo-center-dot center-${dot.id}"
          data-color="${dot.color}"
          style="
            transform-origin: ${dot.baseX}px ${dot.baseY}px;
            opacity: 0; 
            transform: scale(0.5);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), fill 0.8s ease;
          "
        />
      </g>
    `;
  });
  svg += `</g>`;
  
  if (isLarge) {
    svg += `</g>`;
  }
  
  svg += `</svg>`;
  return svg;
}
