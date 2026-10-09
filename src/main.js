// WordPress Browser-Compatible Initialization
const getAssetUrl = (path) => {
  if (!path) return '';
  let strPath = String(path).trim();

  // If it's a data URI
  if (strPath.startsWith('data:')) return strPath;

  const currentOrigin = (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : '';
  const base = (typeof window !== 'undefined' && window.CopliteleData && window.CopliteleData.assetsUrl) 
    ? window.CopliteleData.assetsUrl 
    : 'assets/';

  // If it contains /wp-content/uploads/
  if (strPath.includes('/wp-content/uploads/')) {
    const uploadPath = strPath.substring(strPath.indexOf('/wp-content/uploads/'));
    return currentOrigin ? (currentOrigin + uploadPath) : uploadPath;
  }

  // If it contains /wp-content/themes/
  if (strPath.includes('/wp-content/themes/')) {
    const themePath = strPath.substring(strPath.indexOf('/wp-content/themes/'));
    return currentOrigin ? (currentOrigin + themePath) : themePath;
  }

  if (strPath.startsWith('http://') || strPath.startsWith('https://')) {
    return strPath;
  }
  
  let clean = strPath.replace(/^\.\//, '');
  if (clean.startsWith('assets/')) clean = clean.slice(7);
  const finalUrl = base + clean;
  return finalUrl.includes('?') ? finalUrl : finalUrl + '?v=2';
};

const getI18nText = (val) => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
    return val[lang] || val.es || val.ca || val.en || Object.values(val)[0] || '';
  }
  return String(val);
};

window.handleImgLoad = function(img) {
  if (!img) return;
  img.classList.add('is-loaded');
  const parent = img.closest('.img-loader-wrapper, .modal-member-photo-wrapper, .team-photo, .collab-avatar-wrapper');
  if (parent) {
    parent.classList.add('is-loaded');
  }
};

const MEMBER_KNOWN_ALIASES = {
  'adolfina-perez': [
    'Adolfina Pérez Garcías', 'Adolfina Pérez Garcias', 'Adolfina Pérez', 'Adolfina Perez',
    'Dra. Adolfina Pérez Garcías', 'Dra. Adolfina Pérez', 'Dra. Adolfina Pérez Garcias',
    'Pérez Garcias, Adolfina', 'Perez Garcias, Adolfina', 'Pérez Garcias, A.', 'Perez Garcias, A.',
    'Pérez, Adolfina', 'Perez, Adolfina',
    'Pérez, Fina', 'Perez, Fina', 'Fina Pérez', 'Fina Perez', 'Fina', 'Adolfina'
  ],
  'barbara-de-benito': [
    'Bárbara de Benito Crosetti', 'Bàrbara de Benito Crosetti', 'Barbara de Benito Crosetti',
    'Bárbara de Benito', 'Bàrbara de Benito', 'Barbara de Benito',
    'de Benito Crosetti, Bárbara', 'de Benito Crosetti, Bàrbara', 'de Benito Crosetti, Barbara', 'de Benito Crosetti, B.',
    'de Benito, Bárbara', 'de Benito, Bàrbara', 'de Benito, Barbara', 'de Benito, B.',
    'de Benito', 'Bárbara', 'Bàrbara', 'Barbara'
  ],
  'antonia-darder': [
    'Antonia Darder', 'Antònia Darder', 'Antonia Darder Mesquida', 'Antònia Darder Mesquida',
    'Darder Mesquida, Antonia', 'Darder Mesquida, Antònia', 'Darder Mesquida, A.',
    'Darder, Antonia', 'Darder, Antònia', 'Darder, A.',
    'Darder', 'Antònia', 'Antonia'
  ],
  'gemma-tur': [
    'Gemma Tur Ferrer', 'Gemma Tur',
    'Tur Ferrer, Gemma', 'Tur Ferrer, G.',
    'Tur, Gemma', 'Tur, G.', 'Gemma'
  ],
  'jesus-salinas': [
    'Jesús Salinas Ibáñez', 'Jesus Salinas Ibanez', 'Jesús Salinas', 'Jesus Salinas', 'Jesús María Salinas',
    'Salinas Ibáñez, Jesús', 'Salinas Ibanez, Jesus', 'Salinas Ibáñez, J. M.', 'Salinas Ibanez, J. M.', 'Salinas, Jesús', 'Salinas, Jesus'
  ],
  'santos-urbina': [
    'Santos Urbina Ramírez', 'Santos Urbina Ramirez', 'Santos Urbina',
    'Urbina Ramírez, Santos', 'Urbina Ramirez, Santos', 'Urbina Ramírez, S.', 'Urbina Ramirez, S.',
    'Urbina, Santos', 'Urbina, S.'
  ],
  'francisca-negre': [
    'Francisca Negre Bennasar', 'Francisca Negre Bennásar', 'Francisca Negre', 'Xisca Negre',
    'Negre Bennasar, Francisca', 'Negre Bennásar, Francisca', 'Negre Bennasar, F.', 'Negre Bennásar, X.',
    'Negre, Francisca', 'Negre, Xisca'
  ],
  'francisco-lirola': [
    'Francisco Ramon Lirola Sabater', 'Francisco Lirola', 'Xisco Lirola',
    'Lirola Sabater, Francisco', 'Lirola Sabater, F. R.', 'Lirola, Francisco', 'Lirola, Xisco'
  ],
  'linda-castaneda': [
    'Linda Castañeda', 'Linda Castaneda',
    'Castañeda, Linda', 'Castaneda, Linda', 'Castañeda, L.', 'Castaneda, L.', 'Linda'
  ],
  'enric-bresco': [
    'Enric Brescó Baiges', 'Enric Bresco Baiges', 'Enric Brescó', 'Enric Bresco',
    'Brescó Baiges, Enric', 'Bresco Baiges, Enric', 'Brescó Baiges, E.', 'Bresco Baiges, E.',
    'Brescó, Enric', 'Bresco, Enric'
  ],
  'gustavo-angulo': [
    'Gustavo Angulo', 'Gustavo Adolfo Angulo Mendoza', 'Gustavo Angulo Mendoza',
    'Angulo Mendoza, Gustavo', 'Angulo Mendoza, G. A.', 'Angulo, Gustavo'
  ],
  'virginia-larraz': [
    'Virginia Larraz Rada', 'Virginia Larraz',
    'Larraz Rada, Virginia', 'Larraz Rada, V.', 'Larraz, Virginia', 'Virginia'
  ],
  'dra-sofia-villatoro-moral': [
    'Sofia Villatoro Moral', 'Sofía Villatoro Moral', 'Sofia Villatoro', 'Sofía Villatoro',
    'Villatoro Moral, Sofia', 'Villatoro Moral, Sofía', 'Villatoro Moral, S. F.', 'Villatoro Moral, S.',
    'Villatoro, Sofia', 'Villatoro, Sofía'
  ],
  'dr-juan-moreno-garcia': [
    'Juan Moreno García', 'Juan Moreno Garcia', 'Juan Moreno',
    'Moreno García, Juan', 'Moreno Garcia, Juan', 'Moreno García, J.', 'Moreno Garcia, J.',
    'Moreno, Juan'
  ],
  'alberto-rodriguez': [
    'Alberto Rodriguez Garcia', 'Alberto Rodríguez García', 'Alberto Rodriguez', 'Alberto Rodríguez',
    'Rodriguez Garcia, Alberto', 'Rodríguez García, Alberto', 'Rodriguez Garcia, A.', 'Rodríguez García, A.',
    'Rodriguez, Alberto', 'Rodríguez, Alberto'
  ],
  'dr-juan-silva-quiroz': [
    'Juan Silva Quiroz', 'Juan Silva',
    'Silva Quiroz, Juan', 'Silva Quiroz, J.', 'Silva, Juan'
  ],
  'jacoba-munar-garau': [
    'Jacoba Munar Garau', 'Jacoba Munar',
    'Munar Garau, Jacoba', 'Munar Garau, J.', 'Munar, Jacoba'
  ],
  'olga-lucia-agudelo-velasquez': [
    'Olga Lucía Agudelo Velásquez', 'Olga Lucia Agudelo Velasquez', 'Olga Agudelo',
    'Agudelo Velásquez, Olga', 'Agudelo Velasquez, Olga', 'Agudelo, Olga'
  ],
  'jennifer-saray-santana-martel': [
    'Jennifer Saray Santana Martel', 'Jennifer Santana',
    'Santana Martel, Jennifer', 'Santana Martel, J.', 'Santana, Jennifer'
  ],
  'dra-alba-r-pinto': [
    'Alba R. Pinto', 'Alba Pinto', 'Pinto, Alba'
  ],
  'laia-riera-negre': [
    'Laia Riera Negre', 'Laia Riera',
    'Riera Negre, Laia', 'Riera Negre, L.', 'Riera, Laia'
  ],
  'dra-maria-dolores-forteza-forteza': [
    'María Dolores Forteza Forteza', 'Maria Dolores Forteza Forteza', 'Lola Forteza',
    'Forteza Forteza, María Dolores', 'Forteza Forteza, Maria Dolores', 'Forteza, María Dolores', 'Forteza, Maria Dolores'
  ],
  'dra-vanessa-esteve': [
    'Vanessa Esteve', 'Esteve, Vanessa', 'Esteve, V.'
  ],
  'dra-alexandra-lizana': [
    'Alexandra Lizana', 'Lizana, Alexandra', 'Lizana, A.'
  ]
};

const ALL_TEAM_MEMBERS_MAP = [
  {
    id: "adolfina-perez",
    displayName: "Dra. Adolfina Pérez Garcías",
    name: "Adolfina Pérez",
    thumb: "miembros/color/adolfina_perez.png",
    image: "miembros/color/adolfina_perez.png",
    color: "miembros/color/adolfina_perez.png",
    keys: MEMBER_KNOWN_ALIASES['adolfina-perez']
  },
  {
    id: "barbara-de-benito",
    displayName: "Dra. Bàrbara de Benito Crosetti",
    name: "Bàrbara de Benito",
    thumb: "miembros/color/barbara_de_benito.png",
    image: "miembros/color/barbara_de_benito.png",
    color: "miembros/color/barbara_de_benito.png",
    keys: MEMBER_KNOWN_ALIASES['barbara-de-benito']
  },
  {
    id: "jesus-salinas",
    displayName: "Dr. Jesús Salinas Ibáñez",
    name: "Jesús Salinas",
    thumb: "miembros/color/jesus_salinas.png",
    image: "miembros/color/jesus_salinas.png",
    color: "miembros/color/jesus_salinas.png",
    keys: MEMBER_KNOWN_ALIASES['jesus-salinas']
  },
  {
    id: "santos-urbina",
    displayName: "Dr. Santos Urbina Ramírez",
    name: "Santos Urbina",
    thumb: "miembros/color/santos_urbina.png",
    image: "miembros/color/santos_urbina.png",
    color: "miembros/color/santos_urbina.png",
    keys: MEMBER_KNOWN_ALIASES['santos-urbina']
  },
  {
    id: "francisca-negre",
    displayName: "Dra. Francisca Negre Bennasar",
    name: "Francisca Negre",
    thumb: "miembros/color/francisca_negre.png",
    image: "miembros/color/francisca_negre.png",
    color: "miembros/color/francisca_negre.png",
    keys: MEMBER_KNOWN_ALIASES['francisca-negre']
  },
  {
    id: "gemma-tur",
    displayName: "Dra. Gemma Tur Ferrer",
    name: "Gemma Tur",
    thumb: "miembros/color/gemma_tur.png",
    image: "miembros/color/gemma_tur.png",
    color: "miembros/color/gemma_tur.png",
    keys: MEMBER_KNOWN_ALIASES['gemma-tur']
  },
  {
    id: "francisco-lirola",
    displayName: "Dr. Francisco Lirola",
    name: "Francisco Lirola",
    thumb: "miembros/color/francisco_lirola.png",
    image: "miembros/color/francisco_lirola.png",
    color: "miembros/color/francisco_lirola.png",
    keys: MEMBER_KNOWN_ALIASES['francisco-lirola']
  },
  {
    id: "linda-castaneda",
    displayName: "Dra. Linda Castañeda",
    name: "Linda Castañeda",
    thumb: "miembros/color/linda_castaneda.png",
    image: "miembros/color/linda_castaneda.png",
    color: "miembros/color/linda_castaneda.png",
    keys: MEMBER_KNOWN_ALIASES['linda-castaneda']
  },
  {
    id: "enric-bresco",
    displayName: "Dr. Enric Brescó",
    name: "Enric Brescó",
    thumb: "miembros/color/enric_bresco.png",
    image: "miembros/color/enric_bresco.png",
    color: "miembros/color/enric_bresco.png",
    keys: MEMBER_KNOWN_ALIASES['enric-bresco']
  },
  {
    id: "antonia-darder",
    displayName: "Dra. Antonia Darder",
    name: "Antonia Darder",
    thumb: "miembros/color/antonia_darder.png",
    image: "miembros/color/antonia_darder.png",
    color: "miembros/color/antonia_darder.png",
    keys: MEMBER_KNOWN_ALIASES['antonia-darder']
  },
  {
    id: "gustavo-angulo",
    displayName: "Dr. Gustavo Angulo",
    name: "Gustavo Angulo",
    thumb: "miembros/color/gustavo_angulo.png",
    image: "miembros/color/gustavo_angulo.png",
    color: "miembros/color/gustavo_angulo.png",
    keys: MEMBER_KNOWN_ALIASES['gustavo-angulo']
  },
  {
    id: "virginia-larraz",
    displayName: "Dra. Virginia Larraz Rada",
    name: "Virginia Larraz",
    thumb: "miembros/color/virginia_larraz.png",
    image: "miembros/color/virginia_larraz.png",
    color: "miembros/color/virginia_larraz.png",
    keys: MEMBER_KNOWN_ALIASES['virginia-larraz']
  },
  {
    id: "dra-sofia-villatoro-moral",
    displayName: "Dra. Sofia Villatoro Moral",
    name: "Sofia Villatoro",
    thumb: "miembros/color/sofia_villatoro.png",
    image: "miembros/color/sofia_villatoro.png",
    color: "miembros/color/sofia_villatoro.png",
    keys: MEMBER_KNOWN_ALIASES['dra-sofia-villatoro-moral']
  },
  {
    id: "dr-juan-moreno-garcia",
    displayName: "Dr. Juan Moreno García",
    name: "Juan Moreno",
    thumb: "miembros/color/juan_moreno.png",
    image: "miembros/color/juan_moreno.png",
    color: "miembros/color/juan_moreno.png",
    keys: MEMBER_KNOWN_ALIASES['dr-juan-moreno-garcia']
  },
  {
    id: "alberto-rodriguez",
    displayName: "Alberto Rodriguez Garcia",
    name: "Alberto Rodriguez",
    thumb: "miembros/color/alberto_rodriguez.png",
    image: "miembros/color/alberto_rodriguez.png",
    color: "miembros/color/alberto_rodriguez.png",
    keys: MEMBER_KNOWN_ALIASES['alberto-rodriguez']
  },
  {
    id: "dr-juan-silva-quiroz",
    displayName: "Dr. Juan Silva Quiroz",
    name: "Juan Silva",
    thumb: "miembros/color/juan_silva.png",
    image: "miembros/color/juan_silva.png",
    color: "miembros/color/juan_silva.png",
    keys: MEMBER_KNOWN_ALIASES['dr-juan-silva-quiroz']
  },
  {
    id: "jacoba-munar-garau",
    displayName: "Jacoba Munar Garau",
    name: "Jacoba Munar",
    thumb: "miembros/color/jacoba_munar.png",
    image: "miembros/color/jacoba_munar.png",
    color: "miembros/color/jacoba_munar.png",
    keys: MEMBER_KNOWN_ALIASES['jacoba-munar-garau']
  },
  {
    id: "olga-lucia-agudelo-velasquez",
    displayName: "Dra. Olga Lucía Agudelo Velásquez",
    name: "Olga Agudelo",
    thumb: "miembros/color/olga_agudelo.png",
    image: "miembros/color/olga_agudelo.png",
    color: "miembros/color/olga_agudelo.png",
    keys: MEMBER_KNOWN_ALIASES['olga-lucia-agudelo-velasquez']
  },
  {
    id: "jennifer-saray-santana-martel",
    displayName: "Dra. Jennifer Saray Santana Martel",
    name: "Jennifer Santana",
    thumb: "miembros/color/jennifer_santana.png",
    image: "miembros/color/jennifer_santana.png",
    color: "miembros/color/jennifer_santana.png",
    keys: MEMBER_KNOWN_ALIASES['jennifer-saray-santana-martel']
  },
  {
    id: "dra-alba-r-pinto",
    displayName: "Dra. Alba R. Pinto",
    name: "Alba Pinto",
    thumb: "miembros/color/alba_pinto.png",
    image: "miembros/color/alba_pinto.png",
    color: "miembros/color/alba_pinto.png",
    keys: MEMBER_KNOWN_ALIASES['dra-alba-r-pinto']
  },
  {
    id: "laia-riera-negre",
    displayName: "Dra. Laia Riera Negre",
    name: "Laia Riera",
    thumb: "miembros/color/laia_riera.png",
    image: "miembros/color/laia_riera.png",
    color: "miembros/color/laia_riera.png",
    keys: MEMBER_KNOWN_ALIASES['laia-riera-negre']
  },
  {
    id: "dra-maria-dolores-forteza-forteza",
    displayName: "Dra. María Dolores Forteza Forteza",
    name: "María Dolores Forteza",
    thumb: "miembros/color/maria_dolores_forteza.png",
    image: "miembros/color/maria_dolores_forteza.png",
    color: "miembros/color/maria_dolores_forteza.png",
    keys: MEMBER_KNOWN_ALIASES['dra-maria-dolores-forteza-forteza']
  },
  {
    id: "dra-vanessa-esteve",
    displayName: "Dra. Vanessa Esteve",
    name: "Vanessa Esteve",
    thumb: "miembros/color/vanessa_esteve.png",
    image: "miembros/color/vanessa_esteve.png",
    color: "miembros/color/vanessa_esteve.png",
    keys: MEMBER_KNOWN_ALIASES['dra-vanessa-esteve']
  },
  {
    id: "dra-alexandra-lizana",
    displayName: "Dra. Alexandra Lizana",
    name: "Alexandra Lizana",
    thumb: "miembros/color/alexandra_lizana.png",
    image: "miembros/color/alexandra_lizana.png",
    color: "miembros/color/alexandra_lizana.png",
    keys: MEMBER_KNOWN_ALIASES['dra-alexandra-lizana']
  }
];

function normalizeTextForMatching(str) {
  if (!str) return '';
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function formatUnmatchedName(str) {
  if (!str) return '';
  let clean = String(str).trim().replace(/^[\s,;.-]+|[\s,;.-]+$/g, '');
  if (clean.includes(',')) {
    const parts = clean.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length === 2) {
      return `${parts[1]} ${parts[0]}`.trim();
    }
  }
  return clean;
}

function matchCandidateToTeamMember(candidateStr, team) {
  if (!candidateStr) return null;
  const normCand = normalizeTextForMatching(candidateStr);
  if (!normCand || normCand.length < 3) return null;

  for (const m of team) {
    if (!m) continue;
    const aliases = (typeof MEMBER_KNOWN_ALIASES !== 'undefined' && (MEMBER_KNOWN_ALIASES[m.id] || MEMBER_KNOWN_ALIASES[m.slug] || MEMBER_KNOWN_ALIASES[m.member_id])) || [];
    const keysToCheck = Array.from(new Set([...(m.keys || []), ...aliases, m.displayName, m.name].filter(Boolean)));
    
    for (const k of keysToCheck) {
      if (!k) continue;
      const normK = normalizeTextForMatching(k);
      if (normK === normCand) return m;
      if (normK.length >= 6 && normCand.length >= 6) {
        if (normK.includes(normCand) || normCand.includes(normK)) return m;
      }
    }
  }
  return null;
}

function parseAuthorNamesList(rawStr, team) {
  if (!rawStr) return [];
  let str = String(rawStr)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, ' ')
    .replace(/\r?\n/g, ', ')
    .replace(/;/g, ', ')
    .replace(/\s+y\s+|\s+and\s+|\s+&\s+/gi, ', ');

  const rawSegments = str.split(',').map(s => s.trim()).filter(Boolean);
  const result = [];
  const prepositions = ['de', 'del', 'de la', 'de los', 'de las', 'da', 'dos', 'von', 'van', 'di'];

  let i = 0;
  while (i < rawSegments.length) {
    const seg = rawSegments[i];
    const nextSeg = rawSegments[i + 1];

    // Ignore segments that are clearly dates, years, URLs, DOI, ISBN, numbers, links or long sentences (> 4 words)
    if (!seg || seg.length > 45 || seg.split(/\s+/).length > 4 || /^(https?:\/\/|www\.|\d{4}|doi:|isbn:|vol\.|pp\.|\d+)/i.test(seg) || seg.includes('http') || seg.includes('www.')) {
      i++;
      continue;
    }

    // Check if seg + nextSeg forms a compound name (e.g. "de Benito, Bárbara" or "Moreno, Juan" or "Darder, Antonia")
    if (nextSeg && nextSeg.split(/\s+/).length <= 2 && nextSeg.length <= 25 && !/^(https?:\/\/|www\.|\d{4}|\d+)/i.test(nextSeg) && !nextSeg.includes('http')) {
      const combined = `${seg}, ${nextSeg}`;
      result.push(combined);
      i += 2;
      continue;
    }

    result.push(seg);
    i++;
  }

  return result;
}

function getMatchedCollaboratorsHTML(text, customTitle, extraCollabs, explicitAuthorsStr, postType = 'general') {
  const team = (typeof ALL_TEAM_MEMBERS_MAP !== 'undefined' && Array.isArray(ALL_TEAM_MEMBERS_MAP))
    ? ALL_TEAM_MEMBERS_MAP
    : ((typeof teamMembers !== 'undefined' && Array.isArray(teamMembers)) ? teamMembers : []);

  const matchedWithOrder = [];
  const matchedMemberIds = new Set();
  const unmatchedResearchers = [];

  // 1. If explicitAuthorsStr is provided, parse explicit candidates
  const explicitCandidates = explicitAuthorsStr ? parseAuthorNamesList(explicitAuthorsStr, team) : [];

  if (explicitCandidates.length > 0) {
    explicitCandidates.forEach(cand => {
      const mem = matchCandidateToTeamMember(cand, team);
      if (mem) {
        if (!matchedMemberIds.has(mem.id)) {
          matchedMemberIds.add(mem.id);
          matchedWithOrder.push(mem);
        }
      } else {
        const formatted = formatUnmatchedName(cand);
        if (formatted && formatted.length >= 3 && !unmatchedResearchers.some(u => normalizeTextForMatching(u.name) === normalizeTextForMatching(formatted))) {
          unmatchedResearchers.push({ name: formatted, image: '' });
        }
      }
    });
  } else if (text && String(text).trim().length > 0) {
    // If no explicit author string, parse from text
    const textCandidates = parseAuthorNamesList(text, team);
    textCandidates.forEach(cand => {
      const mem = matchCandidateToTeamMember(cand, team);
      if (mem && !matchedMemberIds.has(mem.id)) {
        matchedMemberIds.add(mem.id);
        matchedWithOrder.push(mem);
      }
    });
  }

  const extras = (Array.isArray(extraCollabs) ? extraCollabs : []).filter(e => e && (e.name || e.image));
  const allExtras = [...extras];
  unmatchedResearchers.forEach(u => {
    const uNorm = normalizeTextForMatching(u.name);
    if (!allExtras.some(e => normalizeTextForMatching(e.name) === uNorm)) {
      allExtras.push(u);
    }
  });

  if (matchedWithOrder.length === 0 && allExtras.length === 0) return '';

  // Determine title based on post type:
  // Actividad or Transferencia -> Coordinadores
  // Producción Científica or Recursos -> Autores
  const isActOrTrans = (postType === 'actividad' || postType === 'transferencia' || postType === 'activities' || postType === 'transfer');
  const isPubOrRec = (postType === 'publicacion' || postType === 'recurso' || postType === 'publicaciones' || postType === 'recursos' || postType === 'publication' || postType === 'resource');

  let defaultTitle = '';
  if (isActOrTrans) {
    defaultTitle = currentLang === 'en' ? 'Coordinators' : (currentLang === 'ca' ? 'Coordinadors' : 'Coordinadores');
  } else if (isPubOrRec) {
    defaultTitle = currentLang === 'en' ? 'Authors' : (currentLang === 'ca' ? 'Autors' : 'Autores');
  } else {
    defaultTitle = currentLang === 'en' ? 'Participating Researchers' : (currentLang === 'ca' ? 'Investigadors Participants' : 'Investigadores Participantes');
  }

  let headingTitle = defaultTitle;
  if (customTitle && typeof customTitle === 'string' && customTitle.trim().length > 0) {
    const lowerCustom = customTitle.toLowerCase();
    // If custom title was just the generic default "investigador...", override with our role-based title
    if (!lowerCustom.includes('investigador')) {
      headingTitle = customTitle;
    }
  }

  const totalCount = matchedWithOrder.length + allExtras.length;
  const countClass = `collaborators-count-${totalCount}`;

  return `
    <div class="post-collaborators-showcase" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.08);">
      <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 16px; color: var(--color-text-light); opacity: 0.85;">${headingTitle}</h4>
      <div class="collaborators-grid ${countClass}">
        ${matchedWithOrder.map(m => `
          <div class="collab-member-card" onclick="openMemberModal('${m.id}')" style="cursor: pointer;">
            <div class="collab-avatar-wrapper img-loader-wrapper is-loaded">
              <img src="${getAssetUrl(m.thumb || m.color || m.image)}" alt="${m.displayName || m.name}" class="collab-avatar-img fade-in-img is-loaded" onload="handleImgLoad(this)" onerror="this.closest('.collab-avatar-wrapper').classList.add('is-loaded')">
            </div>
            <div class="collab-member-name">${m.displayName || m.name}</div>
          </div>
        `).join('')}
        ${allExtras.map(e => `
          <div class="collab-member-card">
            <div class="collab-avatar-wrapper img-loader-wrapper is-loaded">
              ${e.image ? `
                <img src="${getAssetUrl(e.image)}" alt="${e.name || 'Investigador'}" class="collab-avatar-img fade-in-img is-loaded" onload="handleImgLoad(this)" onerror="this.closest('.collab-avatar-wrapper').classList.add('is-loaded')">
              ` : `
                <div class="collab-avatar-neutral-icon" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%); display: flex; align-items: center; justify-content: center; color: #475569;">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              `}
            </div>
            <div class="collab-member-name">${e.name || (currentLang === 'en' ? 'Collaborator' : (currentLang === 'ca' ? 'Col·laborador' : 'Colaborador'))}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getCollaborationWithHTML(collabWithText, customTitle) {
  if (!collabWithText || !String(collabWithText).trim()) return '';
  let cleanText = String(collabWithText).trim();
  
  // Convert Markdown links [Text](https://...) to HTML <a href="..." target="_blank" rel="noopener noreferrer">Text</a>
  cleanText = cleanText.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert bare URLs (https?://...) that are not already inside href="..." to clickable links
  cleanText = cleanText.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (match, prefix, url) => {
    return `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  // Ensure any existing <a> tags have target="_blank" rel="noopener noreferrer"
  cleanText = cleanText.replace(/<a\s+(?![^>]*\btarget=)([^>]*href=["'][^"']+["'][^>]*)>/gi, '<a $1 target="_blank" rel="noopener noreferrer">');

  const defaultTitle = currentLang === 'en'
    ? 'Collaboration with:'
    : (currentLang === 'ca' ? 'Col·laboració amb:' : 'Colaboración con:');
  const headingTitle = (customTitle && String(customTitle).trim()) ? customTitle : defaultTitle;

  return `
    <div class="post-collaboration-with-showcase">
      <h4 class="collab-with-heading">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        ${headingTitle}
      </h4>
      <div class="collab-with-content">${cleanText}</div>
    </div>
  `;
}

const getLogoConfig = () => {
  if (typeof window !== 'undefined' && typeof window.generateLogoConfig === 'function') {
    return window.generateLogoConfig();
  }
  return null;
};

const getLogoSVG = (config, size, isLarge) => {
  if (!config) return '';
  if (typeof window !== 'undefined' && typeof window.renderLogoSVG === 'function') {
    return window.renderLogoSVG(config, size, isLarge);
  }
  return '';
};

const investigadoresImg = getAssetUrl('images/investigadores.png');
const transferenciaImg = getAssetUrl('images/transferencia.png');
const congresosImg = getAssetUrl('images/congresos.png');
const recursosImg = getAssetUrl('images/recursos.png');
const posterWorkshop1Img = getAssetUrl('images/poster_workshop1.png');
const posidonia1Img = getAssetUrl('images/posidonia_1.png');
const posidonia2Img = getAssetUrl('images/posidonia_2.png');
const posidonia3Img = getAssetUrl('images/posidonia_3.png');
const posidonia4Img = getAssetUrl('images/posidonia_4.png');

// ----------------------------------------------------
// 1. DATA DEFINITIONS (Mock databases in 3 languages)
// ----------------------------------------------------

let currentLang = (typeof CopliteleData !== 'undefined' && CopliteleData.currentLang) ? CopliteleData.currentLang : 'es'; // 'es', 'ca', 'en'

const getRoleI18n = (role, lang = currentLang) => {
  if (!role) return lang === 'en' ? 'Researcher' : (lang === 'ca' ? 'Investigador' : 'Investigador');
  
  if (typeof role === 'object') {
    const text = role[lang] || role.es || role.ca || role.en || Object.values(role)[0] || '';
    if (text) {
      if (lang === 'en' && text === role.es) {
        // Fallthrough to string translation if object had untranslated Spanish string
      } else {
        return text;
      }
    }
  }
  
  const r = String(typeof role === 'object' ? (role.es || Object.values(role)[0] || '') : role).trim();
  const rLower = r.toLowerCase();
  
  if (rLower.includes('principal') || rLower.includes(' ip') || rLower === 'ip') {
    const isFem = rLower.includes('investigadora') || rLower.includes('directora');
    if (lang === 'en') return 'Principal Investigator';
    if (lang === 'ca') return isFem ? 'Investigadora Principal' : 'Investigador Principal';
    return isFem ? 'Investigadora Principal' : 'Investigador Principal';
  }
  if (rLower.includes('formación') || rLower.includes('formació') || rLower.includes('predoctoral') || rLower.includes('doctorand')) {
    const isFem = rLower.includes('investigadora') || rLower.includes('doctoranda');
    if (lang === 'en') return 'Doctoral Researcher';
    if (lang === 'ca') return isFem ? 'Investigadora en formació' : 'Investigador en formació';
    return isFem ? 'Investigadora en formación' : 'Investigador en formación';
  }
  if (rLower.includes('colaborador') || rLower.includes('col·laborador')) {
    const isFem = rLower.includes('colaboradora') || rLower.includes('col·laboradora');
    if (lang === 'en') return 'Collaborating Researcher';
    if (lang === 'ca') return isFem ? 'Investigadora Col·laboradora' : 'Investigador Col·laborador';
    return isFem ? 'Investigadora Colaboradora' : 'Investigador Colaborador';
  }
  if (rLower.includes('técnic') || rLower.includes('tecnic')) {
    const isFem = rLower.includes('técnica') || rLower.includes('tecnica');
    if (lang === 'en') return 'Research Technician';
    if (lang === 'ca') return isFem ? 'Tècnica d\'Investigació' : 'Tècnic d\'Investigació';
    return isFem ? 'Técnica de Investigación' : 'Técnico de Investigación';
  }
  if (rLower.includes('investigador')) {
    const isFem = rLower.includes('investigadora');
    if (lang === 'en') return 'Researcher';
    if (lang === 'ca') return isFem ? 'Investigadora' : 'Investigador';
    return isFem ? 'Investigadora' : 'Investigador';
  }
  
  return r;
};

const teamMembers = [
  {
    id: "adolfina-perez",
    name: "Dra. Adolfina Pérez Garcías",
    pubIds: ["pub-1", "pub-4"],
    role: {
      es: "Investigadora Principal",
      ca: "Investigadora Principal",
      en: "Principal Investigator"
    },
    title: {
      es: "Profesora Titular de Tecnología Educativa, UIB",
      ca: "Professora Titular de Tecnologia Educativa, UIB",
      en: "Associate Professor of Educational Technology, UIB"
    },
    bio: {
      es: "Doctora en Filosofía y Ciencias de la Educación. Profesora titular en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Codirectora del Grupo de Tecnología Educativa (GTE).\n\nSu investigación se centra en el codiseño educativo, entornos virtuales y la innovación docente.",
      ca: "Doctora en Filosofia i Ciències de l'Educació. Professora titular al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Codirectora del Grup de Tecnologia Educativa (GTE).\n\nLa seva recerca se centra en el codisseny educatiu, entorns virtuals i la innovació docent.",
      en: "PhD in Philosophy and Educational Sciences. Associate Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Co-director of the Educational Technology Group (GTE).\n\nHer research focuses on educational co-design, virtual environments, and teaching innovation."
    },
    email: "adolfina.perez@uib.es",
    orcid: "0000-0001-9721-6548",
    researchgate: "https://www.researchgate.net/profile/Adolfina-Perez-Garcias",
    photo: "miembros/Hover/adolfina_perez.png",
    photoHover: "miembros/color/adolfina_perez.png"
  },
  {
    id: "barbara-de-benito",
    name: "Dra. Bárbara de Benito Crosetti",
    pubIds: ["pub-1", "pub-2", "pub-3"],
    role: {
      es: "Investigadora Principal",
      ca: "Investigadora Principal",
      en: "Principal Investigator"
    },
    title: {
      es: "Catedrática de Tecnología Educativa, UIB",
      ca: "Catedràtica de Tecnologia Educativa, UIB",
      en: "Professor of Educational Technology, UIB"
    },
    bio: {
      es: "Doctora en Tecnología Educativa y profesora en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Miembro activo del Grupo de Tecnología Educativa (GTE).\n\nEspecializada en el diseño de recursos virtuales, integración de TIC y metodologías activas.",
      ca: "Doctora en Tecnologia Educativa i professora al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Membre actiu del Grup de Tecnologia Educativa (GTE).\n\nEspecialitzada en el disseny de recursos virtuals, integració de TIC i metodologies actives.",
      en: "PhD in Educational Technology and Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Active member of the Educational Technology Group (GTE).\n\nSpecialized in the design of virtual resources, ICT integration, and active methodologies."
    },
    email: "barbara.debenito@uib.es",
    orcid: "0000-0002-4589-9812",
    researchgate: "https://www.researchgate.net/profile/Barbara-De-Benito-Crosetti",
    photo: "miembros/Hover/barbara_de_benito.png",
    photoHover: "miembros/color/barbara_de_benito.png"
  },
  {
    id: "jesus-salinas",
    name: "Dr. Jesús María Salinas Ibáñez",
    pubIds: ["pub-2"],
    role: {
      es: "Investigador",
      ca: "Investigador",
      en: "Researcher"
    },
    title: {
      es: "Catedrático de Universidad, UIB",
      ca: "Catedràtic d'Universitat, UIB",
      en: "Full Professor, UIB"
    },
    bio: {
      es: "Catedrático del Área de Didáctica y Organización Escolar de la UIB. Fundador del Grupo de Tecnología Educativa (GTE).\n\nAmplia trayectoria en el diseño de entornos virtuales de aprendizaje, formación del profesorado en TIC y educación flexible y a distancia.",
      ca: "Catedràtic de l'Àrea de Didàctica i Organització Escolar de la UIB. Fundador del Grup de Tecnologia Educativa (GTE).\n\nÀmplia trajectòria en el disseny d'entorns virtuals d'aprenentatge, formació del professorat en TIC i educació flexible i a distància.",
      en: "Full Professor in Didactics and School Organization at UIB. Founder of the Educational Technology Group (GTE).\n\nExtensive career in designing virtual learning environments, teacher training in ICT, and flexible and distance education."
    },
    email: "jesus.salinas@uib.es",
    orcid: "0000-0003-2415-8822",
    researchgate: "https://www.researchgate.net/profile/Jesus-Salinas-3",
    photo: "miembros/Hover/jesus_salinas.png",
    photoHover: "miembros/color/jesus_salinas.png"
  },
  {
    id: "santos-urbina",
    name: "Dr. Santos Urbina Ramírez",
    pubIds: ["pub-5"],
    role: {
      es: "Investigador",
      ca: "Investigador",
      en: "Researcher"
    },
    title: {
      es: "Profesor Titular de Tecnología Educativa, UIB",
      ca: "Profesor Titular de Tecnologia Educativa, UIB",
      en: "Associate Professor of Educational Technology, UIB"
    },
    bio: {
      es: "Doctor en Pedagogía y profesor titular en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Investiga sobre la integración de tecnologías en la enseñanza escolar, alfabetización mediática y herramientas tecnológicas colaborativas.",
      ca: "Doctor en Pedagogia i professor titular al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Investiga sobre la integració de tecnologies en l'ensenyament escolar, alfabetització mediàtica i eines tecnològiques col·laboratives.",
      en: "PhD in Pedagogy and Associate Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Researches the integration of technology in school education, media literacy, and collaborative technological tools."
    },
    email: "santos.urbina@uib.es",
    orcid: "0000-0002-3901-7788",
    researchgate: "https://www.researchgate.net/profile/Santos-Urbina",
    photo: "miembros/Hover/santos_urbina.png",
    photoHover: "miembros/color/santos_urbina.png"
  },
  {
    id: "francisca-negre",
    name: "Dra. Francisca Negre Bennásar",
    pubIds: ["pub-6"],
    role: {
      es: "Investigadora",
      ca: "Investigadora",
      en: "Researcher"
    },
    title: {
      es: "Profesora Titular de Didáctica y Organización Escolar, UIB",
      ca: "Professora Titular de Didàctica i Organització Escolar, UIB",
      en: "Associate Professor in Didactics and School Organization, UIB"
    },
    bio: {
      es: "Profesora en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Investiga en el campo de la tecnología educativa aplicada a la educación especial, el codiseño y la accesibilidad digital en entornos de aprendizaje conectados.",
      ca: "Professora al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Investiga en el camp de la tecnologia educativa aplicada a l'educació especial, el codisseny i l'accessibilitat digital en entorns d'aprenentatge connectats.",
      en: "Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Researches in the field of educational technology applied to special education, co-design, and digital accessibility in connected learning environments."
    },
    email: "xisca.negre@uib.es",
    orcid: "0000-0002-8456-1122",
    researchgate: "https://www.researchgate.net/profile/Francisca-Negre",
    photo: "miembros/Hover/francisca_negre.png",
    photoHover: "miembros/color/francisca_negre.png"
  },
  {
    id: "gemma-tur",
    name: "Dra. Gemma Tur Ferrer",
    pubIds: ["pub-2", "pub-4"],
    role: {
      es: "Investigadora",
      ca: "Investigadora",
      en: "Researcher"
    },
    title: {
      es: "Profesora Titular de Tecnología Educativa, UIB",
      ca: "Professora Titular de Tecnologia Educativa, UIB",
      en: "Associate Professor of Educational Technology, UIB"
    },
    bio: {
      es: "Doctora en Tecnología Educativa por la UIB. Su investigación se centra en los entornos personales de aprendizaje (PLE), la identidad profesional docente, los portafolios digitales y la integración pedagógica de las redes sociales en educación superior.",
      ca: "Doctora en Tecnologia Educativa per la UIB. La seva recerca se centra en els entorns personals d'aprenentatge (PLE), la identitat professional docent, els portafolis digitals i la integració pedagògica de les xarxes socials en educació superior.",
      en: "PhD in Educational Technology from UIB. Her research focuses on Personal Learning Environments (PLE), teacher professional identity, digital portfolios, and the pedagogical integration of social media in higher education."
    },
    email: "gemma.tur@uib.cat",
    orcid: "0000-0002-2309-8812",
    researchgate: "https://www.researchgate.net/profile/Gemma-Tur",
    photo: "miembros/Hover/gemma_tur.png",
    photoHover: "miembros/color/gemma_tur.png"
  },
  {
    id: "francisco-lirola",
    name: "Dr. Francisco Lirola",
    pubIds: ["pub-6", "pub-3"],
    role: {
      es: "Investigador",
      ca: "Investigador",
      en: "Researcher"
    },
    title: {
      es: "Profesor de Didáctica y Organización Escolar, UIB",
      ca: "Professor de Didàctica i Organització Escolar, UIB",
      en: "Lecturer in Didactics and School Organization, UIB"
    },
    bio: {
      es: "Investigador y docente en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Sus áreas de interés abarcan el codiseño didáctico, la incorporación de inteligencia artificial en la práctica docente y el desarrollo de itinerarios flexibles.",
      ca: "Investigador i docent al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Les seves àrees d'interès inclouen el codisseny didàctic, la incorporació d'intel·ligència artificial a la pràctica docent i el desenvolupament d'itineraris flexibles.",
      en: "Researcher and lecturer in the Department of Applied Pedagogy and Educational Psychology at UIB. His areas of interest cover didactic co-design, the incorporation of artificial intelligence in teaching practice, and the development of flexible learning paths."
    },
    email: "francisco.lirola@uib.es",
    orcid: "0000-0001-5612-4433",
    researchgate: "https://www.researchgate.net/profile/Francisco-Lirola",
    photo: "miembros/Hover/francisco_lirola.png",
    photoHover: "miembros/color/francisco_lirola.png"
  },
  {
    id: "linda-castaneda",
    name: "Dra. Linda Castañeda Quintero",
    pubIds: [],
    role: {
      es: "Investigadora",
      ca: "Investigadora",
      en: "Researcher"
    },
    title: {
      es: "Profesora Titular de Tecnología Educativa, Universidad de Murcia",
      ca: "Professora Titular de Tecnologia Educativa, Universitat de Múrcia",
      en: "Associate Professor of Educational Technology, University of Murcia"
    },
    bio: {
      es: "Doctora en Tecnología Educativa. Profesora titular en el Departamento de Didáctica y Organización Escolar de la Universidad de Murcia. Su investigación versa sobre entornos personales de aprendizaje (PLE), perspectivas críticas sobre la tecnología educativa y el codiseño.",
      ca: "Doctora en Tecnologia Educativa. Professora titular al Departament de Didàctica i Organització Escolar de la Universitat de Múrcia. La seva recerca tracta sobre entorns personals d'aprenentatge (PLE), perspectives crítiques sobre la tecnologia educativa i el codisseny.",
      en: "PhD in Educational Technology. Associate Professor in the Department of Didactics and School Organization at the University of Murcia. Her research addresses Personal Learning Environments (PLE), critical perspectives on educational technology, and co-design."
    },
    email: "lindacq@um.es",
    orcid: "0000-0002-3112-9988",
    researchgate: "https://www.researchgate.net/profile/Linda-Castaneda",
    photo: "miembros/Hover/linda_castaneda.png",
    photoHover: "miembros/color/linda_castaneda.png"
  },
  {
    id: "enric-bresco",
    name: "Dr. Enric Brescó Baiges",
    pubIds: ["pub-1", "pub-5", "pub-6"],
    role: {
      es: "Investigador",
      ca: "Investigador",
      en: "Researcher"
    },
    title: {
      es: "Profesor Lector en Tecnología Educativa, UdL / UIB",
      ca: "Professor Lector en Tecnologia Educativa, UdL / UIB",
      en: "Lecturer in Educational Technology, UdL / UIB"
    },
    bio: {
      es: "Doctor en Educación e investigador asociado. Su trabajo analiza la integración didáctica de herramientas tecnológicas en secundaria y educación superior, el codiseño participativo de recursos digitales y la influencia de la IA en la práctica educativa.",
      ca: "Doctor en Educació i investigador associat. El seu treball analitza la integració didàctica d'eines tecnològiques a secundària i educació superior, el codisseny participatiu de recursos digitals i la influència de la IA en la pràctica educativa.",
      en: "PhD in Education and Associate Researcher. His work analyzes the didactic integration of technological tools in secondary and higher education, participatory co-design of digital resources, and the influence of AI on educational practice."
    },
    email: "enric.bresco@udl.cat",
    orcid: "0000-0003-1288-4455",
    researchgate: "https://www.researchgate.net/profile/Enric-Bresco-Baiges",
    photo: "miembros/Hover/enric_bresco.png",
    photoHover: "miembros/color/enric_bresco.png"
  },
  {
    id: "gustavo-angulo",
    name: "Dr. Gustavo Adolfo Angulo Mendoza",
    pubIds: ["pub-6", "pub-5", "pub-2"],
    role: {
      es: "Investigador",
      ca: "Investigador",
      en: "Researcher"
    },
    title: {
      es: "Investigador Postdoctoral y Docente, UIB",
      ca: "Investigador Postdoctoral i Docent, UIB",
      en: "Postdoctoral Researcher & Lecturer, UIB"
    },
    bio: {
      es: "Doctor en Tecnología Educativa. Miembro del Grupo de Tecnología Educativa (GTE). Sus líneas de investigación comprenden los sistemas adaptativos de aprendizaje, analítica del aprendizaje y codiseño de escenarios virtuales con Inteligencia Artificial.",
      ca: "Doctor en Tecnologia Educativa. Membre del Grup de Tecnologia Educativa (GTE). Les seves línies de recerca comprenen els sistemes adaptatius d'aprenentatge, analítica de l'aprenentatge i codisseny d'escenaris virtuals amb Intel·ligència Artificial.",
      en: "PhD in Educational Technology. Member of the Educational Technology Group (GTE). His research lines include adaptive learning systems, learning analytics, and co-design of virtual scenarios using Artificial Intelligence."
    },
    email: "gustavo.angulo@uib.cat",
    orcid: "0000-0002-6677-1122",
    researchgate: "https://www.researchgate.net/profile/Gustavo-Angulo-Mendoza",
    photo: "miembros/Hover/gustavo_angulo.png",
    photoHover: "miembros/color/gustavo_angulo.png"
  },
  {
    id: "virginia-larraz",
    name: "Dra. Virginia Larraz Rada",
    pubIds: [],
    role: {
      es: "Investigadora",
      ca: "Investigadora",
      en: "Researcher"
    },
    title: {
      es: "Profesora Titular y Vicerrectora, Universitat d'Andorra",
      ca: "Professora Titular i Vicerectora, Universitat d'Andorra",
      en: "Associate Professor & Vice-Rector, University of Andorra"
    },
    bio: {
      es: "Doctora en Educación y Tecnología por la UIB. Professora titular y Vicerrectora de la Universitat d'Andorra. Su ámbito de investigación se enfoca en las competencias digitales docentes, la integración pedagógica de las tecnologías emergentes y el codiseño en educación superior.",
      ca: "Doctora en Educació i Tecnologia per la UIB. Professora titular i Vicerectora de la Universitat d'Andorra. El seu àmbit de recerca s'enfoca en les competències digitals docents, la integració pedagògica de les tecnologies emergents i el codisseny en educació superior.",
      en: "PhD in Education and Technology from UIB. Associate Professor and Vice-Rector at the University of Andorra. Her research focus centers on teacher digital competencies, pedagogical integration of emerging technologies, and co-design in higher education."
    },
    email: "vlarraz@uda.ad",
    orcid: "0000-0002-8877-3344",
    researchgate: "https://www.researchgate.net/profile/Virginia-Larraz-Rada",
    photo: "miembros/Hover/virginia_larraz.png",
    photoHover: "miembros/color/virginia_larraz.png"
  },
  {
    id: "antonia-darder",
    name: "Dra. Antonia Darder",
    pubIds: [],
    role: {
      es: "Investigadora",
      ca: "Investigadora",
      en: "Researcher"
    },
    title: {
      es: "Catedrática Emérita, Loyola Marymount University",
      ca: "Catedràtica Emèrita, Loyola Marymount University",
      en: "Professor Emerita, Loyola Marymount University"
    },
    bio: {
      es: "Reconocida investigadora internacional y profesora emérita en Loyola Marymount University. Especialista en pedagogía crítica, justicia social, diseño de entornos formativos inclusivos y tecnología educativa.",
      ca: "Reconeguda investigadora internacional i professora emèrita a Loyola Marymount University. Especialista en pedagogia crítica, justícia social, disseny d'entorns formatius inclusius i tecnologia educativa.",
      en: "Internationally recognized researcher and Professor Emerita at Loyola Marymount University. Specialist in critical pedagogy, social justice, inclusive learning environment design, and educational technology."
    },
    email: "antonia.darder@lmu.edu",
    orcid: "0000-0002-9988-7766",
    researchgate: "https://www.researchgate.net/profile/Antonia-Darder",
    photo: "miembros/Hover/antonia_darder.png",
    photoHover: "miembros/color/antonia_darder.png"
  }
];

const publications = [
  {
    id: "pub-1",
    type: "revista",
    title: {
      es: "Codiseño de entornos virtuales de aprendizaje personalizados mediante Inteligencia Artificial: Un enfoque cooperativo",
      ca: "Codisseny d'entorns virtuals d'aprenentatge personalitzats mitjançant Intel·ligència Artificial: Un enfocament cooperatiu",
      en: "Co-design of personalized virtual learning environments using Artificial Intelligence: A cooperative approach"
    },
    citation: "de Benito, B., & Pérez, A. (2025). Revista de Educación y Tecnología, 14(2), 120-138.",
    abstract: {
      es: "Este artículo explora un marco metodológico para el codiseño de plataformas virtuales donde estudiantes y docentes participan activamente en la parametrización de algoritmos de inteligencia artificial para personalizar trayectorias de aprendizaje. Se detalla un estudio de caso en dos centros de secundaria y las percepciones de control de los usuarios frente al algoritmo.",
      ca: "Aquest article explora un marc metodològic per al codisseny de plataformes virtuals on estudiants i docents participen activament en la parametrització d'algorismes d'intel·ligència artificial per personalitzar trajectòries d'aprenentatge. Es detalla un estudi de cas en dos centres de secundària i les percepcions de control dels usuaris enfront de l'algorisme.",
      en: "This article explores a methodological framework for the co-design of virtual platforms where students and teachers actively participate in configuring artificial intelligence algorithms to personalize learning pathways. A case study in two secondary schools and users' perceptions of control over the algorithm are detailed."
    },
    doi: "10.1016/j.edutec.2025.101230",
    tags: ["Codiseño / Codisseny", "Inteligencia Artificial / IA", "Educación / Educació"],
    zoteroKey: "BEN2025",
    extraLabel: {
      es: "Artículos",
      ca: "Articles",
      en: "Articles"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/BEN2025"
  },
  {
    id: "pub-2",
    type: "revista",
    title: {
      es: "La perspectiva de la comunidad educativa en el diseño de herramientas de IA: Desafíos prácticos de la co-creación",
      ca: "La perspectiva de la comunitat educativa en el disseny d'eines d'IA: Desafiaments pràctics de la co-creació",
      en: "The educational community's perspective on AI tool design: Practical challenges of co-creation"
    },
    abstract: {
      es: "Estudio sobre los retos de comunicación y competencias tecnológicas que emergen al sentar en la misma mesa de codiseño a desarrolladores de software educativo e investigadores escolares. Se proponen dinámicas visuales para mitigar la asimetría técnica y empoderar a la comunidad educativa.",
      ca: "Estudi sobre els reptes de comunicació i competències tecnològiques que emergeixen en seure a la mateixa taula de codisseny desenvolupadors de programari educatiu i investigadors escolars. Es proposen dinàmiques visuals per mitigar l'asimetria tècnica i empoderar la comunitat educativa.",
      en: "Study on communication challenges and technical skills emerging when bringing educational software developers and school researchers together at the same co-design table. Visual dynamics are proposed to mitigate technical asymmetry and empower the educational community."
    },
    citation: "Salinas, J., Tur, G., & de Benito, B. (2024). Pixel-Bit: Revista de Medios y Educación, 69, 45-78.",
    doi: "10.12795/pixelbit.2024.10189",
    tags: ["Co-creación / Co-creació", "Tecnología / Tecnologia", "Usabilidad / Usabilitat"],
    zoteroKey: "SAL2024",
    extraLabel: {
      es: "Artículos",
      ca: "Articles",
      en: "Articles"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/SAL2024"
  },
  {
    id: "pub-3",
    type: "libro",
    title: {
      es: "Tecnología Educativa y Personalización: Guía Práctica para el Codiseño de Aulas Inteligentes",
      ca: "Tecnologia Educativa i Personalització: Guia Pràctica per al Codisseny d'Aules Intel·ligents",
      en: "Educational Technology and Personalization: A Practical Guide for Co-designing Smart Classrooms"
    },
    abstract: {
      es: "Un manual exhaustivo que provee marcos teóricos, plantillas de talleres de codiseño y guías éticas para la introducción de algoritmos adaptativos en el ámbito de la educación primaria y secundaria. Dirigido a formadores de profesorado y tecnólogos.",
      ca: "Un manual exhaustiu que proveeix marcs teòrics, plantilles de tallers de codisseny i guies ètiques per a la introducció d'algorismes adaptatius en l'àmbit de l'educació primària i secundària. Adreçat a formadors de professorat i tecnòlegs.",
      en: "A comprehensive manual providing theoretical frameworks, templates for co-design workshops, and ethical guidelines for implementing adaptive algorithms in primary and secondary education. Intended for teacher trainers and technologists."
    },
    citation: "de Benito, B. (2024). Editorial UIB, Palma de Mallorca.",
    isbn: "978-84-8384-498-3",
    tags: ["Manual", "Codiseño / Codisseny", "Aulas / Aules"],
    zoteroKey: "BEN2024",
    extraLabel: {
      es: "Publicaciones",
      ca: "Publicacions",
      en: "Publications"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/BEN2024"
  },
  {
    id: "pub-4",
    type: "libro",
    title: {
      es: "Inteligencia Artificial y Educación: Nuevos horizontes para el codiseño docente",
      ca: "Intel·ligència Artificial i Educació: Nous horitzons per al codisseny docent",
      en: "Artificial Intelligence and Education: New horizons for teacher co-design"
    },
    abstract: {
      es: "Una antología que reúne investigaciones iberoamericanas sobre el papel del docente como co-creador y supervisor de agentes inteligentes en el aula, discutiendo el diseño de cuadros de mando explicables y la soberanía del dato escolar.",
      ca: "Una antologia que reuneix investigacions iberoamericanes sobre el paper del docent com a co-creador i supervisor d'agents intel·ligents a l'aula, discutint el disseny de quadres de comandament explicables i la sobirania de la dada escolar.",
      en: "An anthology gathering Ibero-American research on the teacher's role as co-creator and supervisor of intelligent agents in the classroom, discussing the design of explainable dashboards and school data sovereignty."
    },
    citation: "Pérez, A. (Ed.). (2025). Octaedro Editorial.",
    isbn: "978-84-19023-88-2",
    tags: ["IA", "Docencia / Docència", "Innovación / Innovació"],
    zoteroKey: "PER2025",
    extraLabel: {
      es: "Publicaciones",
      ca: "Publicacions",
      en: "Publications"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/PER2025"
  },
  {
    id: "pub-5",
    type: "ponencia",
    title: {
      es: "Dynamic Interface Generation for Personalized Learning: A Co-design Case Study",
      ca: "Dynamic Interface Generation for Personalized Learning: A Co-design Case Study",
      en: "Dynamic Interface Generation for Personalized Learning: A Co-design Case Study"
    },
    abstract: {
      es: "Este artículo analiza la implementación técnica de interfaces configuradas dinámicamente a través de talleres de codiseño. Presentamos un marco de telemetría diseñado para equilibrar las recomendaciones automáticas de IA con los ajustes manuales del docente en tiempo real.",
      ca: "Aquest article analitza la implementació tècnica d'interfícies configurades dinàmicament a través de tallers de codisseny. Presentem un marc de telemetria dissenyat per equilibrar las recomanacions automàtiques d'IA amb els ajustaments manuals del docent en temps real.",
      en: "This paper analyzes the technical implementation of interfaces configured dynamically through co-design workshops. We present a telemetry framework designed to balance agentic AI recommendations with manual teacher overrides in real-time."
    },
    citation: "Urbina, S. & Castañeda, L. (2024). Presented at International Conference on Educational Technology (ICET), Paris.",
    event: "ICET 2024, París",
    tags: ["UI", "Automation", "Agency"],
    zoteroKey: "URB2024",
    extraLabel: {
      es: "Congresos",
      ca: "Congressos",
      en: "Conferences"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/URB2024"
  },
  {
    id: "pub-6",
    type: "ponencia",
    title: {
      es: "El rol del codiseño en el desarrollo de asistentes virtuales inteligentes para secundaria",
      ca: "El rol del codisseny en el desenvolupament d'assistents virtuals intel·ligents per a secundària",
      en: "The role of co-design in the development of intelligent virtual assistants for secondary schools"
    },
    abstract: {
      es: "Presentación de resultados del prototipado rápido de asistentes inteligentes en tres institutos de Mallorca, detallando la metodología de codiseño por fases (exploración, co-creación, evaluación) y la acogida de los tableros de control.",
      ca: "Presentació de resultats del prototipat ràpid d'assistents intel·ligents en tres instituts de Mallorca, detallant la metodologia de codisseny per fases (exploració, co-creació, avaluació) y l'acollida dels quadres de comandament.",
      en: "Presentation of results from rapid prototyping of intelligent assistants in three high schools in Mallorca, detailing the phased co-design methodology (exploration, co-creation, evaluation) and the acceptance of dashboard controls."
    },
    citation: "Negre, F., Lirola, F. & Angulo, G. (2025). Ponencia en el Congreso Nacional de Investigación Educativa, Madrid.",
    event: "CNIE 2025, Madrid",
    tags: ["Asistentes / Assistents", "Secundaria / Secundària", "Prototipado / Prototipat"],
    zoteroKey: "NEG2025",
    extraLabel: {
      es: "Seminarios",
      ca: "Seminaris",
      en: "Seminars"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/NEG2025"
  }
];

let newsFeedItems = [
  {
    id: "news-new",
    type: "actividad",
    tag: { es: "Seminario", ca: "Seminari", en: "Seminar" },
    text: {
      es: "TALLER: Síntesis de investigación para explorar diseños de aprendizaje mejorados por IA que fomenten la agencia de los futuros docentes",
      ca: "TALLER: Síntesi d'investigació per explorar dissenys d'aprenentatge millorats per IA que fomentin l'agència dels futurs docents",
      en: "WORKSHOP: Research syntheses to investigate AI-enhanced learning designs to foster pre-service teachers agency"
    },
    activityId: "act-new"
  },
  {
    id: "news-posidonia",
    type: "transferencia",
    tag: { es: "Transferencia", ca: "Transferència", en: "Transfer" },
    text: {
      es: "Codiseño de juegos basados en IA para el bienestar digital. Lecciones aprendidas de los proyectos DALI y Posidonia 360º.",
      ca: "Codisseny de jocs basats en IA per al benestar digital. Lliçons apreses dels projectes DALI i Posidonia 360º.",
      en: "AI-based Game co-design for digital wellbeing. Lessons learnt from the DALI and Posidonia 360º projects."
    },
    activityId: "act-posidonia"
  },
  {
    id: "news-iag",
    type: "actividad",
    tag: { es: "Formación", ca: "Formació", en: "Training" },
    text: {
      es: "Uso de la IAG para multi-análisis en proyectos de Investigación",
      ca: "Ús de la IAG per a multi-anàlisi en projectes d'Investigació",
      en: "Use of GAI for multi-analysis in Research projects"
    },
    activityId: "act-iag-multianalisis"
  },
  {
    id: "news-taller-iag",
    type: "actividad",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    text: {
      es: "Taller Práctico: Aplicación de la IAG en Procesos de Aprendizaje",
      ca: "Taller Pràctic: Aplicació de la IAG en Processos d'Aprenentatge",
      en: "Practical Workshop: Applying GAI in Learning Processes"
    },
    activityId: "act-taller-iag"
  }
];



const transferActivities = [
  {
    id: "act-iag-multianalisis",
    section: "actividades",
    filterType: "formacion",
    type: "formacion",
    tag: { es: "Formación", ca: "Formació", en: "Training" },
    title: {
      es: "Uso de la IAG para multi-análisis en proyectos de Investigación",
      ca: "Ús de la IAG per a multi-anàlisi en projectes d'Investigació",
      en: "Use of GAI for multi-analysis in Research projects"
    },
    desc: {
      es: "Sesión de formación sobre metodologías y herramientas de Inteligencia Artificial Generativa aplicada al multi-análisis de datos en investigación educativa.",
      ca: "Sessió de formació sobre metodologies i eines d'Intel·ligència Artificial Generativa aplicada al multi-anàlisi de dades en investigació educativa.",
      en: "Training session on methodologies and Generative Artificial Intelligence tools applied to multi-analysis of research data."
    },
    pills: ["Formación", "IAG", "Investigación"],
    date: "Miércoles 18 de marzo de 11:00 a 13:00",
    location: "Aula Digital, Edifici Guillem Cifre de Colonya, UIB, Palma, Spain",
    image: "./images/3.png",
    loremIpsum: {
      es: `<p><strong>¿Cómo utilizar la Inteligencia Artificial Generativa para optimizar el análisis cuantitativo y cualitativo en la investigación?</strong></p>
<p>Este post presenta una guía práctica basada en las sesiones de formación realizadas. En ella se detalla cómo estructurar prompts y encadenar análisis multidimensionales utilizando modelos de lenguaje avanzados para el pre-procesamiento de datos, codificación cualitativa preliminar y triangulación metodológica.</p>
<img src="./images/5.png" class="post-body-img lightbox-img" alt="Multi-análisis con IAG" title="Haz clic para ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="Flujo de multi-análisis" title="Haz clic para ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizadores</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`,
      ca: `<p><strong>Com utilitzar la Intel·ligència Artificial Generativa per optimitzar l'anàlisi quantitativa i qualitativa en la investigació?</strong></p>
<p>Aquest post presenta una guia pràctica basada en les sessions de formació realitzades. S'hi detalla com estructurar prompts i encadenar anàlisis multidimensionals utilitzant models de llenguatge avançats per al pre-processament de dades, codificació qualitativa preliminar i triangulació metodològica.</p>
<img src="./images/5.png" class="post-body-img lightbox-img" alt="Multi-anàlisi amb IAG" title="Fes clic per ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="Flux de multi-anàlisi" title="Fes clic per ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organitzadors</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`,
      en: `<p><strong>How to use Generative Artificial Intelligence to optimize quantitative and qualitative analysis in research?</strong></p>
<p>This post presents a practical guide based on the training sessions conducted. It details how to structure prompts and chain multidimensional analyses using advanced language models for data pre-processing, preliminary qualitative coding, and methodological triangulation.</p>
<img src="./images/5.png" class="post-body-img lightbox-img" alt="Multi-analysis with GAI" title="Click to enlarge">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="Multi-analysis flow" title="Click to enlarge">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizers</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`
    }
  },
  {
    id: "act-taller-iag",
    section: "actividades",
    filterType: "taller",
    type: "taller",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    title: {
      es: "Taller Práctico: Aplicación de la IAG en Procesos de Aprendizaje",
      ca: "Taller Pràctic: Aplicació de la IAG en Processos d'Aprenentatge",
      en: "Practical Workshop: Applying GAI in Learning Processes"
    },
    desc: {
      es: "Taller práctico sobre la co-creación de asistentes y herramientas de inteligencia artificial generativa integradas en metodologías activas.",
      ca: "Taller pràctic sobre la co-creació d'assistents i eines d'intel·ligència artificial generativa integrades en metodologies actives.",
      en: "Practical workshop on the co-creation of generative artificial intelligence assistants integrated into active learning."
    },
    pills: ["Taller", "IAG", "Codiseño"],
    date: "Viernes 13 de marzo de 09:30 a 11:30",
    location: "Aula Digital, Edifici Guillem Cifre de Colonya, UIB, Palma, Spain",
    image: "./images/5.png",
    loremIpsum: {
      es: `<p><strong>¿Cómo integrar la IAG de forma práctica en las dinámicas y metodologías de aprendizaje activo?</strong></p>
<p>Este taller práctico se centra en la aplicación real de herramientas basadas en Inteligencia Artificial Generativa. Los participantes experimentarán con el diseño de prompts instruccionales y la personalización de asistentes virtuales orientados a dar soporte a las tareas del alumnado.</p>
<p>Se trabajará en equipos multidisciplinares para diseñar retos didácticos donde la IA actúe como un andamiaje cognitivo y un facilitador del aprendizaje autónomo.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="Aplicación de IAG en el aula" title="Haz clic para ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizadores</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`,
      ca: `<p><strong>Com integrar la IAG de forma pràctica en les dinàmiques i metodologies d'aprenentatge actiu?</strong></p>
<p>Aquest taller pràctic se centra en l'aplicació real d'eines basades en Intel·ligència Artificial Generativa. Els participants experimentaran amb el disseny de prompts instruccionals i la personalització d'assistents virtuals orientats a donar suport a les tasques de l'alumnat.</p>
<p>Es treballarà en equips multidisciplinaris per dissenyar reptes didàctics on la IA actuï com a bastida cognitiva i facilitadora de l'aprenentatge autònom.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="Aplicació d'IAG a l'aula" title="Fes clic per ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organitzadors</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`,
      en: `<p><strong>How to practically integrate GAI in active learning dynamics and methodologies?</strong></p>
<p>This practical workshop focuses on the real-world application of Generative Artificial Intelligence tools. Participants will experiment with instructional prompt design and personalization of virtual assistants aimed at supporting students' tasks.</p>
<p>Teams will work together to design learning challenges where AI acts as a cognitive scaffold and a facilitator of self-regulated learning.</p>
<img src="./images/6.png" class="post-body-img lightbox-img" alt="GAI application in classroom" title="Click to enlarge">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizers</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Barbara de Benito (UIB)</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antonia Darder (UIB)</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Gustavo Angulo (U. Téluq)</strong><br><a href="mailto:GustavoAdolfo.Angulomendoza@teluq.ca" style="color: var(--color-blue); text-decoration: none;">GustavoAdolfo.Angulomendoza@teluq.ca</a></div>
  </div>
</div>`
    }
  },
  {
    id: "act-new",
    section: "actividades",
    filterType: "seminario",
    type: "seminario",
    tag: { es: "Seminario", ca: "Seminari", en: "Seminar" },
    title: {
      es: "TALLER: Síntesis de investigación para explorar diseños de aprendizaje mejorados por IA que fomenten la agencia de los futuros docentes",
      ca: "TALLER: Síntesi d'investigació per explorar dissenys d'aprenentatge millorats per IA que fomentin l'agència dels futurs docents",
      en: "WORKSHOP: Research syntheses to investigate AI-enhanced learning designs to foster pre-service teachers agency"
    },
    desc: {
      es: "Para responder a la pregunta principal del estudio, se han definido subpreguntas para comprender qué diseños de aprendizaje se investigan para potenciar la agencia del alumnado en la educación superior con IA.",
      ca: "Per respondre a la pregunta principal de l'estudi, s'han definit subpreguntes per comprendre quins dissenys d'aprenentatge s'investiguen per potenciar l'agència de l'alumnat en l'educació superior amb IA.",
      en: "To answer the study's main research question, subquestions have been defined to understand which learning designs are investigated to enhance students' agency in AI-related higher education."
    },
    pills: ["Seminario", "AI", "Agency"],
    date: "Miércoles 11 de marzo de 10:30 a 12:30",
    location: "Aula C-11 edificio Guillem Cifre de Colonya, UIB, Palma, Spain",
    image: "./images/1.png",
    loremIpsum: {
      es: `<p><strong>¿Cómo pueden los diseños de aprendizaje basados en IA en la educación superior promover la agencia de los estudiantes?</strong></p>
<p>Para responder a la pregunta principal del estudio, se han definido varias subpreguntas orientadas a comprender qué diseños de aprendizaje se están implementando e investigando para potenciar la agencia del alumnado en la educación superior vinculada a la Inteligencia Artificial.</p>
<p>En este sentido, el seminario explorará qué elementos de la agencia de los estudiantes son observables en estas investigaciones sobre diseños de aprendizaje enriquecidos con IA, analizando también qué herramientas de inteligencia artificial se integran en dichos diseños y con qué propósito específico.</p>
<img src="./images/1.png" class="post-body-img lightbox-img" alt="Actividad del taller" title="Haz clic para ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/3.png" class="post-body-img lightbox-img" alt="Actividad del taller 2" title="Haz clic para ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
<div class="pdf-preview-wrapper">
  <div class="pdf-preview-inner">
    <iframe src="./images/Poster%20workshop%201%20(marzo%202026).pdf#toolbar=0&navpanes=0" width="100%" height="340px" style="border:none; border-radius: 8px;"></iframe>
    <div class="pdf-overlay-btn">
      <button onclick="window.openPdfOverlay('./images/Poster%20workshop%201%20(marzo%202026).pdf')" class="pdf-open-btn">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        Ver / Descargar PDF
      </button>
    </div>
  </div>
</div>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entidades</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>FAU - Friedrich-Alexander-Universität Erlangen-Nürnberg</div>
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizadores</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antònia Darder Mesquida</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Lea Katharina Reis</strong><br><a href="mailto:lea.katharina.reis@fau.de" style="color: var(--color-blue); text-decoration: none;">lea.katharina.reis@fau.de</a></div>
  </div>
</div>`,
      ca: `<p><strong>Com poden els dissenys d'aprenentatge basats en IA a l'educació superior promoure l'agència dels estudiants?</strong></p>
<p>Per respondre a la pregunta principal de l'estudi, s'han definit diverses subpreguntes orientades a comprendre quins dissenys d'aprenentatge s'estan implementant i investigant per potenciar l'agència de l'alumnat en l'educació superior vinculada a la Intel·ligència Artificial.</p>
<p>En aquest sentit, el seminari explorarà quins elements de l'agència dels estudiants són observables en aquestes investigacions sobre dissenys d'aprenentatge enriquits amb IA, analitzant també quines eines d'intel·ligència artificial s'integren en aquests dissenys i amb quin propòsit específic.</p>
<img src="./images/1.png" class="post-body-img lightbox-img" alt="Activitat del taller" title="Fes clic per ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/3.png" class="post-body-img lightbox-img" alt="Activitat del taller 2" title="Fes clic per ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien.</p>
<div class="pdf-preview-wrapper">
  <div class="pdf-preview-inner">
    <iframe src="./images/Poster%20workshop%201%20(marzo%202026).pdf#toolbar=0&navpanes=0" width="100%" height="340px" style="border:none; border-radius: 8px;"></iframe>
    <div class="pdf-overlay-btn">
      <button onclick="window.openPdfOverlay('./images/Poster%20workshop%201%20(marzo%202026).pdf')" class="pdf-open-btn">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        Veure / Descarregar PDF
      </button>
    </div>
  </div>
</div>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entitats</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>FAU - Friedrich-Alexander-Universität Erlangen-Nürnberg</div>
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organitzadors</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antònia Darder Mesquida</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Lea Katharina Reis</strong><br><a href="mailto:lea.katharina.reis@fau.de" style="color: var(--color-blue); text-decoration: none;">lea.katharina.reis@fau.de</a></div>
  </div>
</div>`,
      en: `<p><strong>How can AI-based learning designs in higher education promote student agency?</strong></p>
<p>To answer the study's main research question, several subquestions have been defined to understand which learning designs are being implemented and researched to enhance students' agency in AI-related higher education.</p>
<p>In this sense, the seminar will explore which elements of student agency are observable in this research on AI-enhanced learning designs, also analyzing which artificial intelligence tools are integrated in these designs and with what specific purpose.</p>
<img src="./images/1.png" class="post-body-img lightbox-img" alt="Workshop activity" title="Click to expand">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="./images/3.png" class="post-body-img lightbox-img" alt="Workshop activity 2" title="Click to expand">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien.</p>
<div class="pdf-preview-wrapper">
  <div class="pdf-preview-inner">
    <iframe src="./images/Poster%20workshop%201%20(marzo%202026).pdf#toolbar=0&navpanes=0" width="100%" height="340px" style="border:none; border-radius: 8px;"></iframe>
    <div class="pdf-overlay-btn">
      <button onclick="window.openPdfOverlay('./images/Poster%20workshop%201%20(marzo%202026).pdf')" class="pdf-open-btn">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        View / Download PDF
      </button>
    </div>
  </div>
</div>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entities</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>FAU - Friedrich-Alexander-Universität Erlangen-Nürnberg</div>
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizers</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Antònia Darder Mesquida</strong><br><a href="mailto:antonia.darder@uib.es" style="color: var(--color-blue); text-decoration: none;">antonia.darder@uib.es</a></div>
    <div><strong>Lea Katharina Reis</strong><br><a href="mailto:lea.katharina.reis@fau.de" style="color: var(--color-blue); text-decoration: none;">lea.katharina.reis@fau.de</a></div>
  </div>
</div>`
    }
  },
  {
    id: "act-posidonia",
    section: "transferencia",
    filterType: "seminario",
    type: "seminario",
    tag: { es: "Seminario", ca: "Seminari", en: "Seminar" },
    title: {
      es: "Codiseño de juegos basados en IA para el bienestar digital. Lecciones aprendidas de los proyectos DALI y Posidonia 360º.",
      ca: "Codisseny de jocs basats en IA per al benestar digital. Lliçons apreses dels projectes DALI i Posidonia 360º.",
      en: "AI-based Game co-design for digital wellbeing. Lessons learnt from the DALI and Posidonia 360º projects."
    },
    desc: {
      es: "Diseña un juego siguiendo el proceso de codiseño presentado en el taller, explorando el bienestar digital y la agencia estudiantil con IA.",
      ca: "Dissenya un joc seguint el procés de codisseny presentat en el taller, explorant el benestar digital i l'agència estudiantil con IA.",
      en: "Design a game following the co-design process presented in the workshop, exploring digital wellbeing and student agency with AI."
    },
    pills: ["Juegos", "Bienestar Digital", "Codiseño"],
    date: "5 - 7 Noviembre de 2025",
    location: "UIB, Carrer del Calvari, 1, 07800 Eivissa, Spain",
    image: posidonia3Img,
    loremIpsum: {
      es: `<p>Esta visita de estudio en Ibiza presenta un proceso de codiseño de juegos basados en inteligencia artificial enfocados en promover el bienestar digital. Durante la sesión, se explorarán las lecciones aprendidas de proyectos europeos como <a href="https://dalicitizens.eu" target="_blank" style="color: var(--color-blue);">DALI</a> y <a href="https://posidonia360.uib.es" target="_blank" style="color: var(--color-blue);">Posidonia 360º</a>, analizando cómo integrar mecanismos de agencia estudiantil en el diseño lúdico.</p>
<p>La actividad principal invita a los participantes a diseñar su propio juego aplicando el marco metodológico expuesto. Esto permite entender de forma práctica cómo los elementos del juego y la mediación de la IA pueden alinearse para fomentar entornos digitales más saludables.</p>
<img src="${posidonia2Img}" class="post-body-img lightbox-img" alt="Visita de estudio Posidonia" title="Haz clic para ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat. Integer suscipit, lorem id lacinia condimentum, eros ante tempus mi, in commodo purus augue sed nisi.</p>
<img src="${posidonia3Img}" class="post-body-img lightbox-img" alt="Actividad Posidonia 360" title="Haz clic para ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi, a sodales lorem augue vel sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
<img src="${posidonia4Img}" class="post-body-img lightbox-img" alt="Equipo Posidonia 360" title="Haz clic para ampliar">
<p>Fusce varius, arcu a sodales volutpat, lorem orci facilisis metus, ut pretium turpis dolor non leo. Proin tempor vehicula volutpat. Duis sed ipsum tempus, fringilla risus et, dapibus risus. Nam convallis, leo in fermentum fermentum, velit sapien malesuada massa, at auctor libero ligula ac sapien.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entidades</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizadores</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Tatiana Valerde</strong><br><a href="mailto:tatydrs@gmail.com" style="color: var(--color-blue); text-decoration: none;">tatydrs@gmail.com</a></div>
  </div>
</div>`,
      ca: `<p>Aquesta visita d'estudi a Eivissa presenta un procés de codisseny de jocs basats en intel·ligència artificial enfocats a promoure el benestar digital. Durant la sessió, s'exploraran les lliçons apreses de projectes europeus com <a href="https://dalicitizens.eu" target="_blank" style="color: var(--color-blue);">DALI</a> i <a href="https://posidonia360.uib.es" target="_blank" style="color: var(--color-blue);">Posidonia 360º</a>, analitzant com integrar mecanismes d'agència estudiantil en el disseny lúdic.</p>
<p>L'activitat principal convida els participants a dissenyar el seu propi joc aplicant el marc metodològic exposat. Això permet entendre de manera pràctica com els elements del joc i la mediació de la IA poden alinear-se per fomentar entorns digitals més saludables.</p>
<img src="${posidonia2Img}" class="post-body-img lightbox-img" alt="Visita d'estudi Posidonia" title="Fes clic per ampliar">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat.</p>
<img src="${posidonia3Img}" class="post-body-img lightbox-img" alt="Activitat Posidonia 360" title="Fes clic per ampliar">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi.</p>
<img src="${posidonia4Img}" class="post-body-img lightbox-img" alt="Equip Posidonia 360" title="Fes clic per ampliar">
<p>Fusce varius, arcu a sodales volutpat, lorem orci facilisis metus, ut pretium turpis dolor non leo. Proin tempor vehicula volutpat. Duis sed ipsum tempus, fringilla risus et, dapibus risus. Nam convallis, leo in fermentum fermentum, velit sapien malesuada massa.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entitats</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organitzadors</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Tatiana Valerde</strong><br><a href="mailto:tatydrs@gmail.com" style="color: var(--color-blue); text-decoration: none;">tatydrs@gmail.com</a></div>
  </div>
</div>`,
      en: `<p>This study visit in Ibiza presents an AI-based game co-design process focused on promoting digital wellbeing. During the session, lessons learned from European projects such as <a href="https://dalicitizens.eu" target="_blank" style="color: var(--color-blue);">DALI</a> and <a href="https://posidonia360.uib.es" target="_blank" style="color: var(--color-blue);">Posidonia 360º</a>, analyzing how to integrate student agency mechanisms into game design.</p>
<p>The main activity invites participants to design their own game by applying the methodological framework presented. This allows for a practical understanding of how game elements and AI mediation can be aligned to foster healthier digital environments.</p>
<img src="${posidonia2Img}" class="post-body-img lightbox-img" alt="Posidonia study visit" title="Click to expand">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula, erat ac facilisis consectetur, augue mauris vehicula ligula, id gravida lorem nunc id sapien. Nullam fringilla erat non tortor condimentum, vel facilisis libero ornare. Aliquam erat volutpat.</p>
<img src="${posidonia3Img}" class="post-body-img lightbox-img" alt="Posidonia 360 activity" title="Click to expand">
<p>Sed euismod, metus a feugiat vehicula, est quam placerat ligula, non ultricies eros quam at felis. Proin facilisis lorem ac sapien ullamcorper, quis malesuada lorem fermentum. Curabitur gravida, sapien a luctus aliquam, erat enim ultrices nisi.</p>
<img src="${posidonia4Img}" class="post-body-img lightbox-img" alt="Posidonia 360 team" title="Click to expand">
<p>Fusce varius, arcu a sodales volutpat, lorem orci facilisis metus, ut pretium turpis dolor non leo. Proin tempor vehicula volutpat. Duis sed ipsum tempus, fringilla risus et, dapibus risus. Nam convallis, leo in fermentum fermentum, velit sapien malesuada massa.</p>
<div style="margin-top: 32px;">
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Entities</h4>
  <div style="margin-bottom: 24px; line-height: 1.2;">
    <div>UIB - Universitat de les Illes Balears</div>
  </div>
  <h4 style="color: var(--color-blue); margin-bottom: 12px; font-size: 18px;">Organizers</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <div><strong>Gemma Tur Ferrer</strong><br><a href="mailto:gemma.tur@uib.es" style="color: var(--color-blue); text-decoration: none;">gemma.tur@uib.es</a></div>
    <div><strong>Bárbara Luisa De Benito Crosetti</strong><br><a href="mailto:barbara.debenito@uib.es" style="color: var(--color-blue); text-decoration: none;">barbara.debenito@uib.es</a></div>
    <div><strong>Tatiana Valerde</strong><br><a href="mailto:tatydrs@gmail.com" style="color: var(--color-blue); text-decoration: none;">tatydrs@gmail.com</a></div>
  </div>
</div>`
    }
  }
];

const translations = {
  es: {
    menu_inicio: "Inicio",
    menu_proyecto: "Proyecto",
    menu_impacto: "Impacto y Difusión",
    hero_tag: "Proyecto de Investigación activo",
    hero_tagline_default: "<span class=\"word-highlight blue\">Codiseño</span>, <span class=\"word-highlight teal\">Personalización</span> y <span class=\"word-highlight green\">Tecnología</span>",
    hero_tagline_blue: "<span class=\"word-highlight blue\">Codiseño</span><span class=\"word-rest\"> de aprendizaje flexible</span>",
    hero_tagline_teal: "<span class=\"word-rest\">Itinerarios </span><span class=\"word-highlight teal\">personalizados</span><span class=\"word-rest\"> y agénticos</span>",
    hero_tagline_green: "<span class=\"word-rest\">Ambientes enriquecidos con </span><span class=\"word-highlight green\">Tecnología</span>",
    hero_main_title: "Rediseñamos el futuro de la educación con <span class=\"blue-highlight\">Codiseño</span> e <span class=\"green-highlight\">IA</span>",
    hero_desc: "COPLITELE-IA es un proyecto de investigación que transforma la educación superior integrando la Inteligencia Artificial Generativa (IAG) desde un enfoque pedagógico innovador. A través del codiseño educativo entre docentes y estudiantes, impulsamos la personalización del aprendizaje mediante itinerarios flexibles, promoviendo entornos virtuales conectados que garantizan la equidad, la inclusión y la calidad educativa.",
    btn_conocer: "Conoce el Proyecto",
    btn_publicaciones: "Publicaciones",
    news_title: "Últimas noticias",
    news_pretitle: "Actualidad",
    stats_years: "Años de investigación",
    stats_investigadores: "Investigadores",
    stats_publicaciones: "Publicaciones",
    stats_actividades: "Actividades",
    stats_experiencias: "Actividades",
    progress_label: "Progreso del Proyecto",
    submenu_desc: "Descripción",
    submenu_obj: "Objetivos",
    submenu_miembros: "Equipo",
    submenu_noticias: "Últimas noticias",
    submenu_transferencia: "Transferencia",
    submenu_publicaciones: "Producción científica",
    submenu_recursos: "Recursos",
    impacto_banner_title: "¿Eres Investigador y tienes noticias nuevas?",
    impacto_banner_desc: "Crea una nueva difusión con la Actividad, Transferencia, Publicación o Recurso que has realizado.",
    obj_title: "Objetivos del Proyecto",
    obj_pretitle: "Proyecto",
    obj_1_title: "Agencia Profesional y Académica",
    obj_1_desc: "Disminuir la incertidumbre pedagógica al potenciar la capacidad de decisión de docentes y estudiantes en entornos digitales.",
    obj_2_title: "Personalización y codiseño",
    obj_2_desc: "Diseñar, implementar y validar estrategias de codiseño educativo y de personalización mediante itinerarios flexibles de aprendizaje, que aplicando la IAG promuevan la agencia del estudiante.",
    obj_3_title: "Innovación e inclusión",
    obj_3_desc: "Explorar las posibilidades de la IAG como herramienta de apoyo al codiseño educativo en educación superior para favorecer una educación equitativa, inclusiva y de calidad.",
    obj_4_title: "Sostenibilidad de Recursos Abiertos",
    obj_4_desc: "Promover la creación ética y transparente mediante Inteligencia Artificial Generativa validada para la comunidad académica.",
    project_pretitle: "Conoce más",
    project_title: "El Proyecto",
    tab_desc: "Descripción",
    tab_equipo: "Equipo",
    team_pretitle: "Investigadores",
    project_what_is: "¿Qué es COPLITELE-IA?",
    project_what_is_p1: "COPLITELE-IA es un proyecto de investigación científica orientado a la transformación digital y la innovación metodológica en el ámbito de la educación superior. Su eje central consiste en estudiar, diseñar y validar escenarios y estrategias flexibles de aprendizaje que aprovechen el potencial dialógico y adaptativo de la Inteligencia Artificial Generativa (IAG). A diferencia de otros enfoques centrados únicamente en la automatización, esta propuesta sitúa la pedagogía en el centro, utilizando la tecnología como un socio estratégico para potenciar los procesos formativos en entornos virtuales conectados.",
    project_what_is_p2: "El proyecto introduce el concepto de \"codiseño educativo\", implicando activamente a docentes y estudiantes en la toma de decisiones y en la co-construcción de itinerarios de aprendizaje personalizados y adaptados a los intereses y metas individuales. De este modo, la IAG se implementa no solo para enriquecer el aprendizaje del alumnado, sino también como una herramienta de apoyo didáctico para el profesorado. El objetivo último de COPLITELE-IA es empoderar y fortalecer tanto la agencia académica de los estudiantes como la agencia profesional de los docentes, garantizando entornos educativos inclusivos, equitativos y de alta calidad.",
    project_what_is_p3: "",
    meta_ref: "Ref. Proyecto",
    meta_duracion: "Duración",
    meta_lider: "Institución Líder",
    meta_financiacion: "Financiación",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Framework de investigación",
    phase_1_badge: "Fase 1",
    phase_1_title: "Cimentación",
    phase_1_subtitle: "Análisis y Consenso",
    phase_1_desc: "Revisión documental, construcción del marco teórico y establecimiento de protocolos para analizar diseños educativos agénticos potenciados por IAG.",
    phase_2_badge: "Fase 2",
    phase_2_title: "Exploración",
    phase_2_subtitle: "Diagnóstico de Resiliencia",
    phase_2_desc: "Investigación sobre los usos docentes, la percepción del profesorado, los entornos inclusivos, la agencia estudiantil y el papel de la IAG como agente participante en el codiseño.",
    phase_3_badge: "Fase 3",
    phase_3_title: "Diseño",
    phase_3_subtitle: "Escenarios y Tecnología",
    phase_3_desc: "Desarrollo de estrategias, guías, recursos educativos abiertos, análisis de viabilidad técnica y parámetros de sistemas de IAG para la personalización y el codiseño, etc.",
    phase_4_badge: "Fase 4",
    phase_4_title: "Validación",
    phase_4_subtitle: "Impacto en Aula",
    phase_4_desc: "Validación empírica en aulas universitarias, evaluación de la agencia docente y discente y generación de recursos educativos abiertos.",
    phase_5_badge: "Fase 5",
    phase_5_title: "Impacto",
    phase_5_subtitle: "Transferencia Social",
    phase_5_desc: "Transferencia institucional vía SmartUIB, OTRI e IRIE, difusión científica, publicación de resultados y seminarios internacionales.",
    trans_pretitle: "Impacto y difusión",
    trans_title: "Actividades de Transferencia",
    trans_subtitle: "",
    trans_btn_more: "Ver todas las actividades",
    pub_pretitle: "Biblioteca Científica",
    pub_title: "Producción Científica",
    pub_subtitle: "",
    search_placeholder: "Buscar por título, autor o tag...",
    filter_todos: "Todos",
    filter_articulos: "Artículos",
    filter_congresos: "Congresos",
    filter_libros: "Libros",
    filter_poster: "Póster",
    tab_all: "Todas",
    tab_revistas: "Revistas (Zotero)",
    tab_libros: "Libros (Zotero)",
    tab_ponencias: "Ponencias y Congresos",
    rec_pretitle: "Repositorio Abierto",
    rec_title: "Recursos del Proyecto",
    rec_subtitle: "",
    rec_btn_pdf: "Descargar PDF (4.8 MB)",
    rec_btn_zip: "Descargar Plantillas (Zip, 12 MB)",
    rec_btn_git: "Ver Repositorio GitHub",
    home_card_act_desc: "Demos, talleres, seminarios y programas de formación.",
    home_card_trans_desc: "Experiencias aplicando las estrategias del proyecto",
    home_card_pubs_desc: "Artículos en revistas, libros, ponencias y actas de congreso.",
    home_card_recs_desc: "Acceso a software, corpus, guías didácticas y herramientas.",
    stats_actividades: "Actividades",
    menu_actividades: "Actividades",
    colab_title: "Con la colaboración y financiación de:",
    footer_copy: "&copy; 2026 COPLITELE-IA. Proyecto financiado por el Ministerio español de Ciencia e Innovación, desarrollado por el GTE de la UIB y el IRIE.",
    cookie_banner_title: "Uso de Cookies",
    cookie_banner_text: "Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento técnico de la plataforma, analizar el uso del sitio web y mejorar tu experiencia de navegación en el proyecto COPLITELE-IA, de acuerdo con nuestra Política de Cookies.",
    cookie_accept_all: "Aceptar todas",
    cookie_essential_only: "Solo necesarias",
    cookie_more_info: "Más información",
    cookie_manage: "Configurar Cookies"
  },
  ca: {
    menu_inicio: "Inici",
    menu_proyecto: "Projecte",
    menu_impacto: "Impacte i Difusió",
    menu_actividades: "Activitats",
    hero_tag: "Projecte d’Investigació actiu",
    hero_tagline_default: "<span class=\"word-highlight blue\">Codisseny</span>, <span class=\"word-highlight teal\">Personalització</span> i <span class=\"word-highlight green\">Tecnologia</span>",
    hero_tagline_blue: "<span class=\"word-highlight blue\">Codisseny</span><span class=\"word-rest\"> d'aprenentatge flexible</span>",
    hero_tagline_teal: "<span class=\"word-rest\">Itineraris </span><span class=\"word-highlight teal\">personalitzats</span><span class=\"word-rest\"> i agèntics</span>",
    hero_tagline_green: "<span class=\"word-rest\">Ambients enriquits amb </span><span class=\"word-highlight green\">Tecnologia</span>",
    hero_main_title: "Redissenyam el futur de l'educació amb <span class=\"blue-highlight\">Codisseny</span> i <span class=\"green-highlight\">Intel·ligència Artificial</span>",
    hero_desc: "COPLITELE-IA és un projecte d'investigació que transforma l'educació superior integrant la Intel·ligència Artificial Generativa (IAG) des d'un enfocament pedagògic innovador. A través del codissenyi educatiu entre docents i estudiants, impulsem la personalització de l'aprenentatge mitjançant itineraris flexibles, promovent entorns virtuals connectats que garanteixen l'equitat, la inclusió i la qualitat educativa.",
    btn_conocer: "Conèix el Projecte",
    btn_publicaciones: "Publicacions",
    news_title: "Últimes notícies",
    news_pretitle: "Actualitat",
    stats_years: "Anys d’investigació",
    stats_investigadors: "Investigadors",
    stats_publicaciones: "Publicacions",
    stats_actividades: "Activitats",
    stats_experiències: "Experiències",
    progress_label: "Progrés del Projecte",
    submenu_desc: "Descripció",
    submenu_obj: "Objectius",
    submenu_miembros: "Equip",
    submenu_noticias: "Últimes notícies",
    submenu_transferencia: "Transferència",
    submenu_publicaciones: "Producció científica",
    submenu_recursos: "Recursos",
    impacto_banner_title: "Ets Investigador i tens noves notícies?",
    impacto_banner_desc: "Crea una nova difusió amb l'Activitat, Transferència, Publicació o Recurs que has realitzat.",
    home_card_act_desc: "Demos, tallers, seminaris i programes de formació.",
    home_card_trans_desc: "Experiències aplicant les estratègies del projecte",
    home_card_pubs_desc: "Articles en revistes, llibres, ponències i actes de congrés.",
    home_card_recs_desc: "Accés a programari, corpus, guies didàctiques i eines.",
    obj_title: "Objectius del Projecte",
    obj_pretitle: "Projecte",
    obj_1_title: "Agència Professional i Acadèmica",
    obj_1_desc: "Disminuir la incertesa pedagògica potenciant la capacitat de decisió de docents i estudiants en entorns digitals.",
    obj_2_title: "Personalització i codisseny",
    obj_2_desc: "Dissenyar, implementar i validar estratègies de codisseny educatiu i de personalització mitjançant itineraris flexibles d'aprenentatge, que aplicant la IAG promoguin l'agència de l'estudiant.",
    obj_3_title: "Innovació i inclusió",
    obj_3_desc: "Explorar les possibilitats de la IAG com a eina de suport al codisseny educatiu en educació superior per afavorir una educació equitativa, inclusiva i de qualitat.",
    obj_4_title: "Sostenibilitat de Recursos Oberts",
    obj_4_desc: "Promoure la creació ètica i transparent mitjançant Intel·ligència Artificial Generativa validada per a la comunitat acadèmica.",
    project_pretitle: "Coneix-ne més",
    project_title: "El Projecte",
    tab_desc: "Descripció",
    tab_equipo: "Equip",
    team_pretitle: "Investigadors",
    project_what_is: "Què és COPLITELE-IA?",
    project_what_is_p1: "COPLITELE-IA és un projecte d'investigació científica orientat a la transformació digital i la innovació metodològica en l'àmbit de l'educació superior. El seu eix central consisteix a estudiar, dissenyar i validar escenaris i estratègies flexibles d'aprenentatge que aprofitin el potencial dialògic i adaptatiu de la Intel·ligència Artificial Generativa (IAG). A diferència d'altres enfocaments centrats únicament en l'automatització, aquesta proposta situa la pedagogia en el centre, utilitzant la tecnologia com un soci estratègic per potenciar els processos formatius en entorns virtuals connectats.",
    project_what_is_p2: "El projecte introdueix el concepte de \"codisseny educatiu\", implicant activament docents i estudiants en la presa de decisions i en la co-construcció d'itineraris d'aprenentatge personalitzats i adaptats als interessos i metes individuals. D'aquesta manera, la IAG s'implementa no només per enriquir l'aprenentatge de l'alumnat, sinó també com una eina de suport didàctic per al professorat. L'objectiu últim de COPLITELE-IA és empoderar i enfortir tant l'agència acadèmica dels estudiants com l'agència professional dels docents, garantint entorns educatius inclusius, equitatius i d'alta qualitat.",
    project_what_is_p3: "",
    meta_ref: "Ref. Projecte",
    meta_duracion: "Durada",
    meta_lider: "Institució Líder",
    meta_financiacion: "Finançament",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Framework d'investigació",
    phase_1_badge: "Fase 1",
    phase_1_title: "Fonamentació",
    phase_1_subtitle: "Anàlisi i Consens",
    phase_1_desc: "Revisió documental, construcció del marc teòric i establiment de protocols per analitzar dissenys educatius agèntics potenciats per IAG.",
    phase_2_badge: "Fase 2",
    phase_2_title: "Exploració",
    phase_2_subtitle: "Diagnòstic de Resiliència",
    phase_2_desc: "Investigació sobre els usos docents, la percepció del professorat, els entorns inclusius, l'agència estudiantil i el paper de la IAG com a agent participant en el codisseny.",
    phase_3_badge: "Fase 3",
    phase_3_title: "Disseny",
    phase_3_subtitle: "Escenaris i Tecnologia",
    phase_3_desc: "Desenvolupament d'estratègies, guies, recursos educatius oberts, anàlisi de viabilitat tècnica i paràmetres de sistemes d'IAG per a la personalització i el codisseny, etc.",
    phase_4_badge: "Fase 4",
    phase_4_title: "Validació",
    phase_4_subtitle: "Impacte a l'Aula",
    phase_4_desc: "Validació empírica en aules universitàries, avaluació de l'agència docent i discent i generació de recursos educatius oberts.",
    phase_5_badge: "Fase 5",
    phase_5_title: "Impacte",
    phase_5_subtitle: "Transferència Social",
    phase_5_desc: "Transferència institucional via SmartUIB, OTRI i IRIE, difusió científica, publicació de resultats i seminaris internacionals.",
    trans_pretitle: "Impacte i difusió",
    trans_title: "Activitats de Transferència",
    trans_subtitle: "",
    trans_btn_more: "Veure totes les activitats",
    pub_pretitle: "Biblioteca Científica",
    pub_title: "Producció Científica",
    pub_subtitle: "",
    search_placeholder: "Cercar por títol, autor o etiqueta...",
    filter_todos: "Tots",
    filter_articulos: "Articles",
    filter_congresos: "Congressos",
    filter_libros: "Llibres",
    filter_poster: "Pòster",
    tab_all: "Totes",
    tab_revistas: "Revistes (Zotero)",
    tab_libros: "Llibres (Zotero)",
    tab_ponencias: "Ponències i Congressos",
    rec_pretitle: "Repositori Obert",
    rec_title: "Recursos del Projecte",
    rec_subtitle: "",
    rec_btn_pdf: "Descarregar PDF (4.8 MB)",
    rec_btn_zip: "Descarregar Plantilles (Zip, 12 MB)",
    rec_btn_git: "Veure Repositori GitHub",
    colab_title: "Amb la col·laboració i finançament de:",
    footer_copy: "&copy; 2026 COPLITELE-IA. Projecte finançat pel Ministeri espanyol de Ciència i Innovació, desenvolupat pel GTE de la UIB i l'IRIE.",
    cookie_banner_title: "Ús de Cookies",
    cookie_banner_text: "Utilitzem cookies pròpies i de tercers per garantir el correcte funcionament tècnic de la plataforma, analitzar l'ús del lloc web i millorar la teva experiència de navegació en el projecte COPLITELE-IA, d'acord amb la nostra Política de Cookies.",
    cookie_accept_all: "Acceptar tot",
    cookie_essential_only: "Només necessàries",
    cookie_more_info: "Més informació",
    cookie_manage: "Configurar Cookies"
  },
  en: {
    menu_inicio: "Home",
    menu_proyecto: "Project",
    menu_impacto: "Impact & Communication",
    menu_actividades: "Activities",
    hero_tag: "Active Investigation Project",
    hero_tagline_default: "<span class=\"word-highlight blue\">Co-design</span>, <span class=\"word-highlight teal\">Personalization</span> and <span class=\"word-highlight green\">Technology</span>",
    hero_tagline_blue: "<span class=\"word-highlight blue\">Co-design</span><span class=\"word-rest\"> of flexible learning</span>",
    hero_tagline_teal: "<span class=\"word-rest\">Personalized and </span><span class=\"word-highlight teal\">agentic</span><span class=\"word-rest\"> pathways</span>",
    hero_tagline_green: "<span class=\"word-rest\">Environments enriched with </span><span class=\"word-highlight green\">Technology</span>",
    hero_main_title: "Redesigning the Future of Education with <span class=\"blue-highlight\">Codesign</span> & <span class=\"green-highlight\">Artificial Intelligence</span>",
    hero_desc: "COPLITELE-IA is a research project transforming higher education by integrating Generative Artificial Intelligence (GAI) through an innovative pedagogical lens. Through educational co-design between faculty and students, we champion personalized learning using flexible itineraries, fostering connected virtual environments that ensure equity, inclusion, and educational quality.",
    btn_conocer: "Explore the Project",
    btn_publicaciones: "Publications",
    news_title: "Latest news",
    news_pretitle: "News",
    stats_years: "Years of research",
    stats_investigadores: "Researchers",
    stats_publicaciones: "Publications",
    stats_actividades: "Activities",
    stats_experiencias: "Experiencies",
    progress_label: "Project Progress",
    submenu_desc: "Description",
    submenu_obj: "Objectives",
    submenu_miembros: "Team",
    submenu_noticias: "Latest news",
    submenu_transferencia: "Transfer",
    submenu_publicaciones: "Scientific production",
    submenu_recursos: "Resources",
    impacto_banner_title: "Are you a Researcher and have new updates?",
    impacto_banner_desc: "Create a new dissemination with the Activity, Transfer, Publication or Resource you have carried out.",
    home_card_act_desc: "Demos, workshops, seminars, and training programs.",
    home_card_trans_desc: "Experiences applying the project strategies",
    home_card_pubs_desc: "Journal articles, books, papers, and conference proceedings.",
    home_card_recs_desc: "Access to software, corpora, teaching guides, and tools.",
    obj_title: "Project Objectives",
    obj_pretitle: "Project",
    obj_1_title: "Professional & Academic Agency",
    obj_1_desc: "Diminish pedagogical uncertainty by empowering decision-making capacity of teachers and students in digital environments.",
    obj_2_title: "Personalization & Co-design",
    obj_2_desc: "Design, implement, and validate educational co-design and personalization strategies through flexible learning pathways that foster student agency applying GAI.",
    obj_3_title: "Innovation & Inclusion",
    obj_3_desc: "Explore GAI possibilities as a pedagogical support tool for educational co-design in higher education to promote equitable, inclusive, high-quality education.",
    obj_4_title: "Open Resources Sustainability",
    obj_4_desc: "Promote ethical, transparent creation through validated Generative Artificial Intelligence for the academic community.",
    project_pretitle: "Find out more",
    project_title: "The Project",
    tab_desc: "Description",
    tab_equipo: "Team",
    team_pretitle: "Researchers",
    project_what_is: "What is COPLITELE-IA?",
    project_what_is_p1: "COPLITELE-IA is a scientific research project focused on digital transformation and methodological innovation in higher education. Its central axis consists of studying, designing, and validating flexible learning scenarios and strategies that leverage the dialogic and adaptive potential of Generative Artificial Intelligence (GAI). Unlike other approaches focused solely on automation, this proposal places pedagogy at the core, utilizing technology as a strategic partner to enhance educational processes in connected virtual environments.",
    project_what_is_p2: "The project introduces the concept of \"educational co-design\", actively involving both teachers and students in decision-making and in the co-construction of personalized learning paths tailored to individual interests and goals. In this way, GAI is implemented not only to enrich student learning but also as a pedagogical support tool for faculty. The ultimate goal of COPLITELE-IA is to empower and strengthen both the academic agency of students and the professional agency of educators, ensuring inclusive, equitable, and high-quality educational environments.",
    project_what_is_p3: "",
    meta_ref: "Project Ref",
    meta_duracion: "Duration",
    meta_lider: "Lead Institution",
    meta_financiacion: "Funding",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Research Framework",
    phase_1_badge: "Phase 1",
    phase_1_title: "Foundation",
    phase_1_subtitle: "Analysis & Consensus",
    phase_1_desc: "Literature review, theoretical framework development, and protocol establishment to analyze agentic learning designs powered by GAI.",
    phase_2_badge: "Phase 2",
    phase_2_title: "Exploration",
    phase_2_subtitle: "Resilience Assessment",
    phase_2_desc: "Research on teaching practices, faculty perceptions, inclusive environments, student agency, and the role of GAI as a participating agent in co-design.",
    phase_3_badge: "Phase 3",
    phase_3_title: "Design",
    phase_3_subtitle: "Scenarios & Technology",
    phase_3_desc: "Development of strategies, guidelines, open educational resources, technical feasibility analysis, and GAI system parameters for personalization and co-design, etc.",
    phase_4_badge: "Phase 4",
    phase_4_title: "Validation",
    phase_4_subtitle: "Classroom Impact",
    phase_4_desc: "Empirical validation in university classrooms, evaluation of student and faculty agency, and open educational resource generation.",
    phase_5_badge: "Phase 5",
    phase_5_title: "Impact",
    phase_5_subtitle: "Social Transfer",
    phase_5_desc: "Institutional transfer via SmartUIB, OTRI, and IRIE, scientific dissemination, publication of results, and international seminars.",
    trans_pretitle: "Impact & Communication",
    trans_title: "Transfer Activities",
    trans_subtitle: "",
    trans_btn_more: "See all activities",
    pub_pretitle: "Scientific Library",
    pub_title: "Scientific Production",
    pub_subtitle: "",
    search_placeholder: "Search by title, author, or keyword...",
    filter_todos: "All",
    filter_articulos: "Articles",
    filter_congresos: "Conferences",
    filter_libros: "Books",
    filter_poster: "Poster",
    tab_all: "All",
    tab_revistas: "Journals (Zotero)",
    tab_libros: "Books (Zotero)",
    tab_ponencias: "Presentations & Conferences",
    rec_pretitle: "Open Repository",
    rec_title: "Project Resources",
    rec_subtitle: "",
    rec_btn_pdf: "Download PDF (4.8 MB)",
    rec_btn_zip: "Download Templates (Zip, 12 MB)",
    rec_btn_git: "View GitHub Repository",
    colab_title: "With the collaboration and funding of:",
    footer_copy: "&copy; 2026 COPLITELE-IA. Project funded by the Spanish Ministry of Science and Innovation, developed by the UIB GTE and IRIE.",
    cookie_banner_title: "Cookie Policy & Preferences",
    cookie_banner_text: "We use first-party and third-party cookies to ensure technical functionality, analyze website usage, and improve your browsing experience within the COPLITELE-IA project, in accordance with our Cookie Policy.",
    cookie_accept_all: "Accept all",
    cookie_essential_only: "Essential only",
    cookie_more_info: "Learn more",
    cookie_manage: "Cookie Settings"
  }
};

// ----------------------------------------------------
// 2. DYNAMIC LOGO RENDER CONTROLLER
// ----------------------------------------------------

let currentLogoConfig = null;
let logoPulseTimeouts = [];
const logoWords = {
  blue: ["Codesign", "Learning", "Itineraries"],
  teal: ["Enhance", "Personalized", "Environments"],
  green: ["Technology", "Inteligencia", "Artificial"]
};
let logoWordIndices = { blue: 0, teal: 0, green: 0 };

function clearLogoPulseAnimations() {
  logoPulseTimeouts.forEach(t => clearTimeout(t));
  logoPulseTimeouts = [];
}

let currentRotation = 0;
const rotationSpeed = 0.055; // Very slow and smooth (approx 3.3 degrees per second)
let isRotating = true;
let isInnerRotating = false;
let rotationRequestFrame = null;

function animateRotation() {
  currentRotation = (currentRotation + rotationSpeed) % 360;
  
  const rotatingGroups = document.querySelectorAll('.logo-rotating-group');
  rotatingGroups.forEach(g => {
    g.style.transform = `rotate(${currentRotation}deg)`;
  });
  
  const innerRotatingGroups = document.querySelectorAll('.logo-inner-rotating-group');
  innerRotatingGroups.forEach(g => {
    if (isInnerRotating) {
      g.style.transform = `rotate(${currentRotation}deg)`;
    } else {
      g.style.transform = `rotate(0deg)`;
    }
  });
  
  rotationRequestFrame = requestAnimationFrame(animateRotation);
}

function startRotationLoop() {
  if (!rotationRequestFrame) {
    animateRotation();
  }
}

function formatTaglineHtml(color, rawText) {
  if (!rawText) return '';
  if (rawText.includes('<span')) return rawText;

  if (color === 'default') {
    const parts = rawText.split(/,\s*|\s+(?:y|i|and)\s+/i).filter(Boolean);
    if (parts.length >= 3) {
      const m = rawText.match(/\s+(y|i|and)\s+/i);
      const conj = m ? m[1] : 'y';
      return `<span class="word-highlight blue">${parts[0]}</span>, <span class="word-highlight teal">${parts[1]}</span> ${conj} <span class="word-highlight green">${parts[2]}</span>`;
    }
    return rawText;
  }
  if (color === 'blue') {
    const match = rawText.match(/^([a-zA-ZÀ-ÿ-]+)(\s.*)?$/);
    if (match) {
      return `<span class="word-highlight blue">${match[1]}</span><span class="word-rest">${match[2] || ''}</span>`;
    }
    return `<span class="word-highlight blue">${rawText}</span>`;
  }
  if (color === 'teal') {
    const re = /(personalizad\w+|personalitzat\w+|personalized|agéntic\w+|agèntic\w+|agentic)/i;
    const match = rawText.match(re);
    if (match) {
      const idx = rawText.indexOf(match[0]);
      const before = rawText.substring(0, idx);
      const highlighted = match[0];
      const after = rawText.substring(idx + match[0].length);
      return `<span class="word-rest">${before}</span><span class="word-highlight teal">${highlighted}</span><span class="word-rest">${after}</span>`;
    }
    return `<span class="word-highlight teal">${rawText}</span>`;
  }
  if (color === 'green') {
    const re = /(tecnolog\w+|technology)/i;
    const match = rawText.match(re);
    if (match) {
      const idx = rawText.indexOf(match[0]);
      const before = rawText.substring(0, idx);
      const highlighted = match[0];
      const after = rawText.substring(idx + match[0].length);
      return `<span class="word-rest">${before}</span><span class="word-highlight green">${highlighted}</span><span class="word-rest">${after}</span>`;
    }
    return `<span class="word-highlight green">${rawText}</span>`;
  }
  return rawText;
}

function updateHeroSubtitle(color) {
  const tagline = document.querySelector('.hero-intro-tagline');
  if (!tagline) return;
  
  tagline.classList.add('fade-out');
  
  setTimeout(() => {
    const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : 'es';
    const dict = translations[lang] || translations.es;
    let html = '';

    if (color === 'blue') {
      const raw = dict.hero_tagline_blue || translations.es.hero_tagline_blue || 'Codiseño de aprendizaje flexible';
      html = formatTaglineHtml('blue', raw);
    } else if (color === 'teal') {
      const raw = dict.hero_tagline_teal || translations.es.hero_tagline_teal || 'Itinerarios personalizados y agénticos';
      html = formatTaglineHtml('teal', raw);
    } else if (color === 'green') {
      const raw = dict.hero_tagline_green || translations.es.hero_tagline_green || 'Ambientes enriquecidos con Tecnología';
      html = formatTaglineHtml('green', raw);
    } else if (color === 'default') {
      const raw = dict.hero_tagline_default || translations.es.hero_tagline_default || 'Codiseño, Personalización y Tecnología';
      html = formatTaglineHtml('default', raw);
    }

    if (html) {
      tagline.innerHTML = html;
    }
    tagline.classList.remove('fade-out');
  }, 200);
}

function activateCenterDots() {
  isInnerRotating = true; // Start inner rotation
  
  const groups = document.querySelectorAll('.logo-center-dot-group');
  groups.forEach(group => {
    const dx = group.getAttribute('data-dx');
    const dy = group.getAttribute('data-dy');
    group.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  
  const circles = document.querySelectorAll('.logo-center-dot');
  circles.forEach(circle => {
    const color = circle.getAttribute('data-color');
    circle.style.fill = color;
    circle.style.transform = 'scale(1)';
  });
}

function deactivateCenterDots() {
  isInnerRotating = false; // Stop inner rotation
  
  const groups = document.querySelectorAll('.logo-center-dot-group');
  groups.forEach(group => {
    group.style.transform = 'translate(0px, 0px)';
  });
  
  const circles = document.querySelectorAll('.logo-center-dot');
  circles.forEach(circle => {
    const baseRadius = parseFloat(circle.getAttribute('r'));
    const isLargeLogo = circle.closest('svg').classList.contains('logo-large');
    const targetRadius = isLargeLogo ? 22 : 1.3;
    const scaleFactor = targetRadius / baseRadius;
    
    circle.style.fill = 'var(--logo-gray-dots)';
    circle.style.transform = `scale(${scaleFactor})`;
  });
}

function runLogoPulseLoop() {
  clearLogoPulseAnimations();
  
  const cycleDuration = 11500;
  
  // 1. Return dots to base equilateral triangle state immediately (gray, at base coordinates, stops rotation)
  deactivateCenterDots();
  
  // 2. Transition dots to active generative state (slide to random position, change to active colors, restart rotation) at 3.0s (3s static gray rest)
  logoPulseTimeouts.push(setTimeout(() => {
    activateCenterDots();
  }, 3000));
  
  const triggerPulse = (color, startOffset) => {
    // 1. Central dot pulse
    logoPulseTimeouts.push(setTimeout(() => {
      const centerDots = document.querySelectorAll(`.logo-center-dot.center-${color}`);
      centerDots.forEach(centerDot => {
        centerDot.classList.add('pulse-active-center');
      });
      
      // Update subtitle dynamically on center pulse
      updateHeroSubtitle(color);

      setTimeout(() => {
        centerDots.forEach(centerDot => {
          centerDot.classList.remove('pulse-active-center');
        });
      }, 1200);
    }, startOffset));
    
    // 2. Perimeter dot pulse (0.3s delay)
    logoPulseTimeouts.push(setTimeout(() => {
      const perimDots = document.querySelectorAll(`.logo-perim-dot.perim-${color}`);
      perimDots.forEach(perimDot => {
        perimDot.classList.add('pulse-active-perim');
      });
      setTimeout(() => {
        perimDots.forEach(perimDot => {
          perimDot.classList.remove('pulse-active-perim');
        });
      }, 1200);
    }, startOffset + 300));
  };
  
  // Blue sequence at 4.0s (1.0s after activation)
  triggerPulse('blue', 4000);
  
  // Teal sequence at 6.2s (2.2s after blue)
  triggerPulse('teal', 6200);
  
  // Green sequence at 8.4s (2.2s after teal)
  triggerPulse('green', 8400);
  
  // Reset tagline to initial neutral highlight state at 10.5s
  logoPulseTimeouts.push(setTimeout(() => {
    updateHeroSubtitle('default');
  }, 10500));
  
  // Schedule next cycle to reset and start over
  logoPulseTimeouts.push(setTimeout(runLogoPulseLoop, cycleDuration));
}

function updateAllLogos() {
  currentLogoConfig = getLogoConfig();
  if (!currentLogoConfig) return;
  
  // Render in header (small version, isLarge = false)
  const headerLogoWrapper = document.getElementById('header-logo-container');
  if (headerLogoWrapper) {
    headerLogoWrapper.innerHTML = getLogoSVG(currentLogoConfig, 44, false);
  }
  
  const footerLogoWrapper = document.getElementById('footer-logo-container');
  if (footerLogoWrapper) {
    footerLogoWrapper.innerHTML = getLogoSVG(currentLogoConfig, 96, false);
  }
  
  // Render in hero showcase (large version, isLarge = true)
  const heroLogoWrapper = document.getElementById('hero-logo-container');
  if (heroLogoWrapper) {
    heroLogoWrapper.innerHTML = getLogoSVG(currentLogoConfig, 800, true);
  }
  
  // Trigger line-drawing ease-out animations
  triggerLogoDrawAnimation();
  
  // Start the programmatic rotation loop
  startRotationLoop();
  
  // Start the interactive sequential pulse loop
  runLogoPulseLoop();
}

function triggerLogoDrawAnimation() {
  // Wait a frame for SVG inclusion in DOM
  requestAnimationFrame(() => {
    setTimeout(() => {
      // Set all arc paths stroke-dashoffset to 0
      const arcPaths = document.querySelectorAll('.logo-arc-path');
      arcPaths.forEach(path => {
        path.style.strokeDashoffset = '0';
      });
      
      // Fade in perimeter dots
      const perimDots = document.querySelectorAll('.logo-perim-dot');
      perimDots.forEach(dot => {
        dot.style.opacity = '1';
      });
      
      // Scale and fade in center dots
      const centerDots = document.querySelectorAll('.logo-center-dot');
      centerDots.forEach(dot => {
        const baseRadius = parseFloat(dot.getAttribute('r'));
        const isLargeLogo = dot.closest('svg').classList.contains('logo-large');
        const targetRadius = isLargeLogo ? 22 : 1.3;
        const scaleFactor = targetRadius / baseRadius;
        
        dot.style.opacity = '1';
        dot.style.transform = `scale(${scaleFactor})`;
      });
      
      // Fade in leader lines
      const leaderLines = document.querySelectorAll('.logo-leader-line');
      leaderLines.forEach(line => {
        line.style.opacity = '0.15';
      });
      
      // Fade in word labels
      const wordGroups = document.querySelectorAll('.logo-word-group');
      wordGroups.forEach(group => {
        group.style.opacity = '1';
      });
      
      // Fade in orbit badges
      const badges = document.querySelectorAll('.orbit-badge-group');
      badges.forEach(b => {
        b.style.opacity = '0.7';
      });
    }, 50);
  });
}

document.addEventListener('click', (e) => {
  const langLink = e.target.closest('.lang-switcher-link');
  if (langLink) {
    e.preventDefault();
    let href = langLink.getAttribute('href') || langLink.href;
    if (href.startsWith('http://')) {
      href = 'https://' + href.slice(7);
    }
    const hash = window.location.hash || '';
    if (hash && !href.includes('#')) {
      href += hash;
    }
    window.location.href = href;
  }
});

function translatePage(lang) {
  currentLang = lang;
  
  // 0. Ensure WordPress dynamic page translations are merged before applying to DOM
  syncWPDataIntoTranslations();

  // 1. Translate all DOM elements with [data-i18n]
  if (translations[lang]) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && translations[lang][key] !== undefined && translations[lang][key] !== '') {
        const val = translations[lang][key];
        if (key === 'hero_tagline_default') {
          el.innerHTML = formatTaglineHtml('default', val);
        } else {
          el.innerHTML = val;
        }
      }
    });
  }

  // Also ensure hero-intro-tagline is updated immediately
  const heroTaglineEl = document.querySelector('.hero-intro-tagline');
  if (heroTaglineEl && translations[lang]) {
    const rawTagline = translations[lang].hero_tagline_default || translations.es.hero_tagline_default;
    if (rawTagline) {
      heroTaglineEl.innerHTML = formatTaglineHtml('default', rawTagline);
    }
  }

  // 2. Update search input placeholder
  const searchInput = document.getElementById('search-input');
  if (searchInput && translations[lang] && translations[lang].search_placeholder) {
    searchInput.placeholder = translations[lang].search_placeholder;
  }

  // 3. Update dropdown UI active flag and text
  const currentLangText = document.getElementById('current-lang-text');
  if (currentLangText) currentLangText.textContent = lang.toUpperCase();
  const currentLangFlag = document.getElementById('current-lang-flag');
  if (currentLangFlag) {
    const flagImg = currentLangFlag.querySelector('img');
    if (flagImg) {
      const base = (typeof CopliteleData !== 'undefined' && CopliteleData.assetsUrl) ? CopliteleData.assetsUrl : 'assets/';
      flagImg.src = lang === 'ca' ? (base + 'icons/Cat_icon.png') : (lang === 'en' ? (base + 'icons/Eng_icon.png') : (base + 'icons/Spa_icon.png'));
    }
  }

  // 4. Re-render dynamic components from current WordPress page/post data
  ingestWPPageContent();
  renderNewsFeed();
  renderTeam();
  renderPublications();
  renderTransferActivities();
  renderResources();
  const rawHash = window.location.hash || '#/';
  if (rawHash.includes('actividad/')) {
    const detailId = rawHash.replace(/^#\/?actividad\//, '') || '';
    renderActivityDetail(detailId);
  }
  
  window.dispatchEvent(new CustomEvent('content-updated'));
}

function extractTextBlocks(container) {
  if (!container) return [];
  const ps = Array.from(container.querySelectorAll('p')).map(el => el.innerHTML.trim()).filter(Boolean);
  if (ps.length > 0) return ps;

  // Fallback: split container text/HTML by double breaks or newlines
  const html = container.innerHTML || container.textContent || '';
  return html.split(/<br\s*\/?>\s*<br\s*\/?>|\n\n+/i)
    .map(str => str.replace(/^<[^>]+>|<[^>]+>$/g, '').trim())
    .filter(Boolean);
}

function syncWPDataIntoTranslations() {
  if (typeof window === 'undefined' || !window.CopliteleWPData || !window.CopliteleWPData.pages) return;
  const pages = window.CopliteleWPData.pages;

  // 1. Page: inicio
  if (pages['inicio']) {
    const ini = pages['inicio'];
    if (ini.hero_tag) translations.es.hero_tag = ini.hero_tag;
    if (ini.hero_title) translations.es.hero_main_title = ini.hero_title;
    if (ini.hero_desc) translations.es.hero_desc = ini.hero_desc;
    if (ini.tagline_default) translations.es.hero_tagline_default = ini.tagline_default;
    if (ini.tagline_blue) translations.es.hero_tagline_blue = ini.tagline_blue;
    if (ini.tagline_teal) translations.es.hero_tagline_teal = ini.tagline_teal;
    if (ini.tagline_green) translations.es.hero_tagline_green = ini.tagline_green;

    if (ini.translations_ca && typeof ini.translations_ca === 'object') Object.assign(translations.ca, ini.translations_ca);
    if (ini.translations_en && typeof ini.translations_en === 'object') Object.assign(translations.en, ini.translations_en);
  }

  // 2. Page: proyecto
  if (pages['proyecto']) {
    const proj = pages['proyecto'];
    if (proj.what_is_title) translations.es.project_what_is = proj.what_is_title;
    if (Array.isArray(proj.what_is_paragraphs)) {
      proj.what_is_paragraphs.forEach((p, idx) => {
        translations.es[`project_what_is_p${idx + 1}`] = p;
      });
    }

    if (Array.isArray(proj.phases)) {
      proj.phases.forEach((ph, idx) => {
        const num = idx + 1;
        if (ph.badge) translations.es[`phase_${num}_badge`] = ph.badge;
        if (ph.title) translations.es[`phase_${num}_title`] = ph.title;
        if (ph.subtitle !== undefined) translations.es[`phase_${num}_subtitle`] = ph.subtitle;
        if (ph.desc) translations.es[`phase_${num}_desc`] = ph.desc;
      });
    }

    if (Array.isArray(proj.objectives)) {
      proj.objectives.forEach((obj, idx) => {
        const num = idx + 1;
        if (obj.title) translations.es[`obj_${num}_title`] = obj.title;
        if (obj.desc) translations.es[`obj_${num}_desc`] = obj.desc;
      });
    }

    if (proj.translations_ca && typeof proj.translations_ca === 'object') Object.assign(translations.ca, proj.translations_ca);
    if (proj.translations_en && typeof proj.translations_en === 'object') Object.assign(translations.en, proj.translations_en);
  }
}

function ingestWPPageContent() {
  if (typeof window === 'undefined' || !window.CopliteleWPData || !window.CopliteleWPData.pages) return;
  const pages = window.CopliteleWPData.pages;

  // Sync into translations dictionary
  syncWPDataIntoTranslations();

  // El Proyecto Page Metadata & Dynamic Content
  if (pages['proyecto']) {
    const proj = pages['proyecto'];

    // Progress bar
    if (proj.meta_progreso) {
      const progEls = document.querySelectorAll('.progress-percentage');
      progEls.forEach(el => el.textContent = proj.meta_progreso);
      const progBars = document.querySelectorAll('.progress-bar-fill');
      progBars.forEach(el => el.style.width = proj.meta_progreso.includes('%') ? proj.meta_progreso : (proj.meta_progreso + '%'));
    }

    // Project Metadata Grid
    const metaBoxes = document.querySelectorAll('#proyecto .project-meta-grid .meta-box');
    if (metaBoxes.length >= 4) {
      if (proj.meta_ref && metaBoxes[0].querySelector('.meta-value')) {
        metaBoxes[0].querySelector('.meta-value').textContent = proj.meta_ref;
      }
      if (proj.meta_duracion && metaBoxes[1].querySelector('.meta-value')) {
        metaBoxes[1].querySelector('.meta-value').textContent = proj.meta_duracion;
      }
      if (proj.meta_lider && metaBoxes[2].querySelector('.meta-value')) {
        metaBoxes[2].querySelector('.meta-value').textContent = proj.meta_lider;
      }
      if (proj.meta_financiacion && metaBoxes[3].querySelector('.meta-value')) {
        metaBoxes[3].querySelector('.meta-value').textContent = proj.meta_financiacion;
      }
    }

    // Dynamic Phases Rendering
    if (Array.isArray(proj.phases) && proj.phases.length > 0) {
      const phasesRow = document.querySelector('.project-phases-row');
      if (phasesRow) {
        phasesRow.innerHTML = proj.phases.map((ph, idx) => {
          const num = idx + 1;
          const langDict = translations[currentLang] || translations.es;
          const badge = langDict[`phase_${num}_badge`] || ph.badge || `Fase ${num}`;
          const title = langDict[`phase_${num}_title`] || ph.title || '';
          const subtitle = langDict[`phase_${num}_subtitle`] !== undefined ? langDict[`phase_${num}_subtitle`] : (ph.subtitle || '');
          const desc = langDict[`phase_${num}_desc`] || ph.desc || '';
          return `
            <div class="phase-card phase-${num}">
              <span class="phase-badge" data-i18n="phase_${num}_badge">${badge}</span>
              <h4 class="phase-title" data-i18n="phase_${num}_title">${title}</h4>
              ${subtitle ? `<p class="phase-subtitle" data-i18n="phase_${num}_subtitle">${subtitle}</p>` : ''}
              <div class="phase-hover-text" data-i18n="phase_${num}_desc">${desc}</div>
            </div>
          `;
        }).join('');

        // Re-attach card hover & click handlers
        phasesRow.querySelectorAll('.phase-card').forEach(card => {
          card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
          card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
          card.addEventListener('click', () => {
            phasesRow.querySelectorAll('.phase-card').forEach(c => { if (c !== card) c.classList.remove('is-hovered'); });
            card.classList.toggle('is-hovered');
          });
        });
      }
    }

    // Dynamic Objectives Rendering
    if (Array.isArray(proj.objectives) && proj.objectives.length > 0) {
      const objGrid = document.querySelector('.objectives-grid');
      if (objGrid) {
        const objIcons = [
          'https://cdn.lordicon.com/gqdnbnwt.json?v=4',
          'https://cdn.lordicon.com/jvucoldz.json?v=4',
          'https://cdn.lordicon.com/zpxybbhl.json?v=4',
          'https://cdn.lordicon.com/rjzlnunf.json?v=6'
        ];
        objGrid.innerHTML = proj.objectives.map((obj, idx) => {
          const num = idx + 1;
          const langDict = translations[currentLang] || translations.es;
          const icon = objIcons[idx] || objIcons[0];
          const title = langDict[`obj_${num}_title`] || obj.title || '';
          const desc = langDict[`obj_${num}_desc`] || obj.desc || '';
          return `
            <article class="objective-card">
              <div class="objective-card-icon">
                <lord-icon
                    src="${icon}"
                    trigger="loop"
                    delay="${1000 + idx * 200}"
                    colors="primary:#1D5BFE,secondary:#7ce4e0"
                    style="width:90px;height:90px">
                </lord-icon>
              </div>
              <h3 data-i18n="obj_${num}_title">${title}</h3>
              <p data-i18n="obj_${num}_desc">${desc}</p>
            </article>
          `;
        }).join('');
      }
    }

    // Dynamic What is Paragraphs Rendering
    if (Array.isArray(proj.what_is_paragraphs) && proj.what_is_paragraphs.length > 0) {
      const projectTextBlock = document.querySelector('.project-text-block');
      if (projectTextBlock) {
        const whatTitleEl = projectTextBlock.querySelector('h3');
        const langDict = translations[currentLang] || translations.es;
        if (whatTitleEl && proj.what_is_title) {
          const wTitle = langDict.project_what_is || proj.what_is_title;
          whatTitleEl.textContent = wTitle;
        }
        // Remove existing paragraphs
        projectTextBlock.querySelectorAll('p').forEach(p => p.remove());
        // Insert new paragraphs before project-meta-grid
        const metaGrid = projectTextBlock.querySelector('.project-meta-grid');
        proj.what_is_paragraphs.forEach((pText, idx) => {
          const num = idx + 1;
          const pEl = document.createElement('p');
          pEl.setAttribute('data-i18n', `project_what_is_p${num}`);
          pEl.innerHTML = langDict[`project_what_is_p${num}`] || pText;
          if (metaGrid) {
            projectTextBlock.insertBefore(pEl, metaGrid);
          } else {
            projectTextBlock.appendChild(pEl);
          }
        });
      }
    }
  }
}

function renderNewsFeed() {
  const newsListHome = document.getElementById('latest-news-list-home');
  const newsListImpact = document.getElementById('latest-news-list-impact');
  if (!newsListHome && !newsListImpact) return;
  
  // Images for news cards (cycle through imported assets)
  const newsImages = [posterWorkshop1Img, posidonia1Img, investigadoresImg, congresosImg, transferenciaImg, recursosImg];
  
  // Display 4 items on home, all on impact page.
  const homeContent = newsFeedItems.slice(0, 4).map((item, i) => generateNewsHTML(item, i, newsImages)).join('');
  const impactContent = newsFeedItems.map((item, i) => generateNewsHTML(item, i, newsImages)).join('');
  
  if (newsListHome) newsListHome.innerHTML = homeContent;
  if (newsListImpact) newsListImpact.innerHTML = impactContent;
  
  function generateNewsHTML(item, i, images) {
    if (!item) return '';
    const text = getI18nText(item.text) || getI18nText(item.title);
    
    // Find linked activity/publication to synchronize images, video, tag and date
    const linkedAct = transferActivities.find(act => act && act.id === item.activityId);
    const linkedPub = publications.find(pub => pub && pub.id === item.pubId);
    
    const section = linkedAct ? linkedAct.section : (linkedPub ? 'publicaciones' : 'actividades');
    const tagText = linkedAct ? getI18nText(linkedAct.tag) : (linkedPub ? (linkedPub.extraLabel ? getI18nText(linkedPub.extraLabel) : getI18nText(linkedPub.tag)) : (item.tag ? getI18nText(item.tag) : 'Noticia'));
    const dateText = linkedAct ? linkedAct.date : (linkedPub ? linkedPub.event : '');
    const cleanDate = dateText ? String(dateText).split('·')[0].split('de 10:30')[0].trim() : '';

    // Synchronize media
    let mediaHTML = '';
    if (linkedAct && linkedAct.videoSrc) {
      mediaHTML = `
        <video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;">
          <source src="${linkedAct.videoSrc}" type="video/mp4">
        </video>
      `;
    } else {
      const fallbackSrc = linkedAct ? linkedAct.image : (linkedPub ? images[2] : images[i % images.length]);
      mediaHTML = `<img src="${getAssetUrl(fallbackSrc)}" alt="${text}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;">`;
    }
    
    // Determine type colors — match section palette
    let colorAttr = 'blue';
    let hoverBg = 'rgba(29, 91, 254, 0.96)';

    if (section === 'transferencia') {
      hoverBg = 'rgba(13, 148, 136, 0.96)';
      colorAttr = 'turquoise';
    } else if (section === 'recursos') {
      hoverBg = 'rgba(16, 185, 129, 0.96)';
      colorAttr = 'green';
    } else if (section === 'publicaciones') {
      hoverBg = 'rgba(139, 92, 246, 0.96)';
      colorAttr = 'purple';
    }

    return `
      <article class="news-card news-card-redesign idx-${i}" data-id="${item.id}" data-type="${section}" data-cursor-color="${colorAttr}"
               role="button" tabindex="0">
        <div class="news-image-wrapper" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
          ${mediaHTML}
          
          <!-- Hover overlay: tag/date centred, z-index 2 -->
          <div class="act-hover-overlay" style="position:absolute;inset:0;z-index:2;
               background:${hoverBg} !important;display:flex;flex-direction:column;align-items:center;justify-content:center;
               opacity:0;transition:opacity 0.35s ease;text-align:center;padding:24px 16px 80px;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">
              ${tagText}
            </span>
            ${cleanDate ? `<span style="font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;margin-top:8px;">${cleanDate}</span>` : ''}
          </div>
          
          <!-- Idle bottom gradient for text legibility, z-index 3 -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index:3;"></div>
          
          <!-- Title: always visible at bottom, z-index 4 -->
          <div style="position:absolute;bottom:20px;left:18px;right:18px;z-index:4;pointer-events:none;text-align:center;">
            <h3 style="font-size:17px !important;color:#fff !important;font-weight:700 !important;margin:0 !important;line-height:1.35 !important;
                       text-shadow:0 2px 8px rgba(0,0,0,0.5);
                       display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
              ${text}
            </h3>
          </div>
        </div>
      </article>
    `;
  }

  
  // Add click events
  document.querySelectorAll('.news-card').forEach(el => {
    el.addEventListener('click', () => {
      const newsId = el.getAttribute('data-id');
      const newsItem = newsFeedItems.find(n => n.id === newsId);
      if (newsItem) {
        if (newsItem.activityId) {
          window.location.hash = `#/actividad/${newsItem.activityId}`;
        } else if (newsItem.type === 'revista' && newsItem.pubId) {
          openPubModal(newsItem.pubId);
        } else {
          openNewsModal(newsItem);
        }
      }
    });
  });
}

let teamDisplayOrder = null;

function renderTeam() {
  const teamGrid = document.getElementById('team-grid');
  if (!teamGrid) return;
  
  const colors = ['blue', 'green', 'teal'];
  const colorAccents = {
    blue:  'rgba(29, 91, 254, 0.75)',
    green: 'rgba(34, 197, 94, 0.7)',
    teal:  'rgba(20, 184, 166, 0.7)'
  };
  
  // Shuffle array once on initial page load / initial data load (does not change order on language change)
  if (!teamDisplayOrder || teamDisplayOrder.length !== teamMembers.length || !teamDisplayOrder.every(m => teamMembers.some(curr => curr.id === m.id))) {
    teamDisplayOrder = [...teamMembers].sort(() => Math.random() - 0.5);
  }
  
  const displayTeam = teamDisplayOrder.map(orderedM => {
    return teamMembers.find(curr => curr.id === orderedM.id) || orderedM;
  });
  
  teamGrid.innerHTML = displayTeam.map((member, i) => {
    const colorClass = colors[i % colors.length];
    const accent = colorAccents[colorClass];
    const roleText = getRoleI18n(member.role, currentLang);
    
    // Assign random aspect ratios for dynamic sizing (mostly vertical)
    const aspectRatios = ['4/5', '3/4', '1/1', '16/10'];
    const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    
    // Support personalized ID (member_id), fallback to member.id or slug
    const personalizedId = member.member_id || member.id;
    
    return `
      <article class="team-card color-variation-${colorClass}" id="card-${personalizedId}" data-id="${personalizedId}" style="cursor:pointer; position:relative;">
        <span id="${personalizedId}" class="member-anchor-spy" style="position:absolute; top:-90px; left:0; width:1px; height:1px; opacity:0; pointer-events:none;"></span>
        ${(member.slug && member.slug !== personalizedId) ? `<span id="${member.slug}" class="member-anchor-spy" style="position:absolute; top:-90px; left:0; width:1px; height:1px; opacity:0; pointer-events:none;"></span>` : ''}
        ${(member.id && member.id !== personalizedId && member.id !== member.slug) ? `<span id="${member.id}" class="member-anchor-spy" style="position:absolute; top:-90px; left:0; width:1px; height:1px; opacity:0; pointer-events:none;"></span>` : ''}
        <div class="team-photo img-loader-wrapper" style="aspect-ratio: ${randomAspect};">
          <div class="img-skeleton-spinner">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
          </div>
          <!-- Original image shown by default -->
          <img src="${getAssetUrl(member.image || member.photoHover || member.thumb)}" class="photo-original fade-in-img" alt="${getI18nText(member.name)}" loading="lazy" onload="handleImgLoad(this)">
          <!-- Tinted photo fades in on hover -->
          <img src="${getAssetUrl(member.photoHover || member.image || member.thumb)}" class="photo-color-overlay" alt="${getI18nText(member.name)}" loading="lazy">
          <!-- Dark gradient for text readability -->
          <div class="photo-overlay"></div>
          <!-- Info anchored to bottom of photo -->
          <div class="team-photo-info">
            <span class="team-role-badge">${roleText}</span>
            <button class="team-name-btn view-member-btn" data-id="${personalizedId}" style="border-color:${accent};background:rgba(255,255,255,0.08);">
              <span>${getI18nText(member.name)}</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
  
  // Add events to details buttons and whole cards
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const memberId = card.getAttribute('data-id') || card.id.replace(/^card-/, '');
      if (memberId) openMemberModal(memberId);
    });
  });

  document.querySelectorAll('.view-member-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card click bubbling
      const memberId = btn.getAttribute('data-id') || btn.closest('.team-card')?.getAttribute('data-id') || btn.closest('.team-card')?.id.replace(/^card-/, '');
      if (memberId) openMemberModal(memberId);
    });
  });

  // Dispatch event for custom cursor and reveals to re-bind
  window.dispatchEvent(new Event('content-updated'));
}

// State variables
let searchQuery = '';
let pubFilterType = 'all';

function getPubIcon(type) {
  if (type === 'revista') {
    return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`;
  } else if (type === 'libro') {
    return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`;
  } else {
    return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M19 18H5V6h3v2H6v8h12v-2h2v3c0 1.1-.9 2-2 2zM17 6H9c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 8H9V8h8v6z"/></svg>`;
  }
}

function getPublicationExternalLink(pub) {
  if (!pub) return null;
  const descText = getI18nText(pub.desc) || '';
  const rawContent = pub.rawContent || '';
  const loremText = getI18nText(pub.loremIpsum) || '';
  const combined = descText + ' ' + rawContent + ' ' + loremText;

  // 1. Search for <a href="..."> inside post description / content
  const hrefMatch = combined.match(/<a\s+(?:[^>]*?\s+)?href=["'](https?:\/\/[^"']+)["']/i);
  if (hrefMatch && hrefMatch[1] && !hrefMatch[1].includes('coplitele-ia.uib.es/wp-content/uploads')) {
    return hrefMatch[1];
  }

  // 2. Search for plain https?:// in description
  const plainMatch = descText.match(/(https?:\/\/[^\s<>"']+)/i);
  if (plainMatch && plainMatch[1]) {
    return plainMatch[1].replace(/[.,;)]+$/, '');
  }

  // 3. pub.zoteroUrl if explicitly provided and external
  if (pub.zoteroUrl && /^https?:\/\//i.test(pub.zoteroUrl) && !pub.zoteroUrl.includes('coplitele-ia.uib.es/wp-content/uploads')) {
    return pub.zoteroUrl;
  }

  // 4. pub.link if explicitly provided (external URL only)
  if (pub.link && /^https?:\/\//i.test(pub.link) && !pub.link.includes('/?p=') && !pub.link.includes('/publicaciones/') && !pub.link.includes('coplitele-ia.uib.es/wp-content/uploads')) {
    return pub.link;
  }

  return null;
}

function formatAuthorToApa(member, origCandStr) {
  if (origCandStr && origCandStr.includes(',')) {
    const parts = origCandStr.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length === 2 && parts[1]) {
      const initial = parts[1].charAt(0).toUpperCase() + '.';
      return `${parts[0]}, ${initial}`;
    }
  }
  if (!member) {
    return (typeof formatUnmatchedName === 'function' ? formatUnmatchedName(origCandStr) : origCandStr) || origCandStr || '';
  }
  const clean = (member.displayName || member.name || '').replace(/^(dra?\.?|dr\.?|prof\.?|profesora?)\s*/i, '').trim();
  const words = clean.split(/\s+/);
  if (words.length >= 3) {
    const initial = words[0].charAt(0).toUpperCase() + '.';
    const surnames = words.slice(1).join(' ');
    return `${surnames}, ${initial}`;
  } else if (words.length === 2) {
    return `${words[1]}, ${words[0].charAt(0).toUpperCase()}.`;
  }
  return clean;
}

function getFormattedPubAuthorsAndCitation(pub) {
  if (!pub) return { authors: '', apaAuthors: '', apaCitation: '', externalLink: null, zoteroLink: '#', collabHTML: '' };

  const pubTitle = getI18nText(pub.title);
  const explicitAuthorsStr = pub.colaboradores || pub.collaborators || pub.authors || '';
  const descText = getI18nText(pub.desc) || '';
  const externalLink = getPublicationExternalLink(pub);

  const team = (typeof ALL_TEAM_MEMBERS_MAP !== 'undefined' && Array.isArray(ALL_TEAM_MEMBERS_MAP))
    ? ALL_TEAM_MEMBERS_MAP
    : ((typeof teamMembers !== 'undefined' && Array.isArray(teamMembers)) ? teamMembers : []);

  // Parse candidate authors strictly from explicitAuthorsStr (or fallback to descText)
  const candidateList = explicitAuthorsStr 
    ? parseAuthorNamesList(explicitAuthorsStr, team)
    : parseAuthorNamesList(descText, team);

  const matchedMembers = [];
  const apaAuthorNames = [];
  const fullAuthorNames = [];
  const seenMemberIds = new Set();

  candidateList.forEach(cand => {
    const m = matchCandidateToTeamMember(cand, team);
    if (m) {
      if (!seenMemberIds.has(m.id)) {
        seenMemberIds.add(m.id);
        matchedMembers.push(m);
        apaAuthorNames.push(formatAuthorToApa(m, cand));
        fullAuthorNames.push(m.displayName || m.name);
      }
    } else {
      const formatted = (typeof formatUnmatchedName === 'function') ? formatUnmatchedName(cand) : cand;
      if (formatted && formatted.length >= 3 && !seenMemberIds.has(formatted.toLowerCase())) {
        seenMemberIds.add(formatted.toLowerCase());
        apaAuthorNames.push(formatAuthorToApa(null, cand));
        fullAuthorNames.push(formatted);
      }
    }
  });

  let formattedAuthorsStr = '';
  if (apaAuthorNames.length === 1) {
    formattedAuthorsStr = apaAuthorNames[0];
  } else if (apaAuthorNames.length === 2) {
    formattedAuthorsStr = `${apaAuthorNames[0]} & ${apaAuthorNames[1]}`;
  } else if (apaAuthorNames.length > 2) {
    formattedAuthorsStr = apaAuthorNames.slice(0, -1).join(', ') + ', & ' + apaAuthorNames[apaAuthorNames.length - 1];
  } else {
    // Fallback if no authors extracted
    let cleaned = descText
      .replace(/<!--\s*\/?wp:[^>]*-->/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();
    formattedAuthorsStr = cleaned || (pub.authors ? getI18nText(pub.authors) : 'Proyecto COPLITELE-IA');
  }

  const year = pub.year || (pub.date ? String(pub.date).slice(-4) : '2026');
  const journalOrEvent = pub.event || pub.journal || 'Proyecto COPLITELE-IA';

  let apaCitation = `${formattedAuthorsStr} (${year}). ${pubTitle}. ${journalOrEvent}.`;
  if (pub.doi) {
    apaCitation += ` https://doi.org/${pub.doi}`;
  }

  const fullTextToScan = explicitAuthorsStr || descText;
  const collabHTML = (typeof getMatchedCollaboratorsHTML === 'function')
    ? getMatchedCollaboratorsHTML(fullTextToScan, pub.collabTitle, pub.extraCollabs, explicitAuthorsStr, 'publicacion')
    : '';

  return {
    authors: fullAuthorNames.join(', ') || formattedAuthorsStr,
    apaAuthors: formattedAuthorsStr,
    apaCitation: apaCitation,
    externalLink: externalLink,
    zoteroLink: externalLink || '#',
    collabHTML: collabHTML
  };
}

function renderPublications() {
  const pubGrid = document.getElementById('publications-grid');
  const homePubGrid = document.getElementById('home-publications-grid');
  if (!pubGrid && !homePubGrid) return;
  
  const filtered = publications.filter(pub => {
    if (!pub) return false;
    const titleText = getI18nText(pub.title).toLowerCase();
    const citationText = (pub.citation || '').toLowerCase();
    const abstractText = (getI18nText(pub.abstract) || getI18nText(pub.desc) || getI18nText(pub.loremIpsum)).toLowerCase();
    
    const tagsList = Array.isArray(pub.tags) ? pub.tags : [];
    const matchesSearch = searchQuery === '' || 
      titleText.includes(searchQuery) ||
      citationText.includes(searchQuery) ||
      abstractText.includes(searchQuery) ||
      tagsList.some(tag => String(tag).toLowerCase().includes(searchQuery));
      
    const tagEs = String(pub.tag?.es || '').toLowerCase();
    const tagCa = String(pub.tag?.ca || '').toLowerCase();
    const tagEn = String(pub.tag?.en || '').toLowerCase();

    let matchesType = (pubFilterType === 'all');
    if (!matchesType) {
      if (pubFilterType === 'revista' || pubFilterType === 'articulo') {
        matchesType = pub.type === 'revista' || pub.type === 'articulo' || pub.filterType === 'articulo' ||
          tagEs.includes('artículo') || tagEs.includes('articulo') || tagCa.includes('article') || tagEn.includes('article');
      } else if (pubFilterType === 'congreso') {
        matchesType = pub.type === 'congreso' || pub.filterType === 'congreso' ||
          tagEs.includes('congreso') || tagCa.includes('congrés') || tagCa.includes('congres') || tagEn.includes('conference');
      } else if (pubFilterType === 'libro') {
        matchesType = pub.type === 'libro' || pub.filterType === 'libro' ||
          tagEs.includes('libro') || tagCa.includes('llibre') || tagEn.includes('book');
      } else if (pubFilterType === 'poster') {
        matchesType = pub.type === 'poster' || pub.type === 'posters' || pub.filterType === 'poster' ||
          tagEs.includes('póster') || tagEs.includes('poster') || tagCa.includes('pòster') || tagEn.includes('poster');
      } else {
        matchesType = pub.type === pubFilterType || pub.filterType === pubFilterType;
      }
    }
    
    return matchesSearch && matchesType;
  });
  
  const mapPubHTML = pub => {
    if (!pub) return '';
    const labelColorClass = pub.type === 'revista' ? 'blue' : (pub.type === 'libro' ? 'green' : (pub.type === 'poster' ? 'purple' : 'teal'));
    const extraLabelText = pub.extraLabel ? getI18nText(pub.extraLabel) : (pub.tag ? getI18nText(pub.tag) : 'Publicación');
    const citation = pub.citation || getI18nText(pub.title);
    const year = citation.match(/\((\d{4})\)/)?.[1] || pub.year || '2026';
    
    // Extract authors roughly
    const authorStr = pub.authors ? getI18nText(pub.authors) : (citation.split(/\(\d{4}\)\./)[0] || citation.split(' (')[0] || citation.substring(0, 50));
    
    return `
      <article class="pub-card-row view-pub-btn" data-id="${pub.id}">
        <div class="pub-col pub-col-year">
          <span class="pub-year-badge">${year}</span>
        </div>
        <div class="pub-col pub-col-title">
          <h3 class="pub-title" style="margin-bottom:0;">${getI18nText(pub.title)}</h3>
        </div>
        <div class="pub-col pub-col-authors">
          <p class="pub-authors" style="margin:0;">${authorStr}</p>
        </div>
        <div class="pub-col pub-col-platform">
          <span class="pub-badge badge-${labelColorClass}" style="width: fit-content; padding: 4px 8px;">
            ${getPubIcon(pub.type)} ${extraLabelText}
          </span>
        </div>
      </article>
    `;
  };

  if (pubGrid) {
    if (filtered.length === 0) {
      pubGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted-light);">
          <p>${currentLang === 'en' ? 'No scientific publications found.' : (currentLang === 'ca' ? 'No s\'han trobat publicacions científiques.' : 'No se encontraron publicaciones científicas.')}</p>
        </div>
      `;
    } else {
      pubGrid.innerHTML = filtered.map(mapPubHTML).join('');
    }
  }

  if (homePubGrid) {
    homePubGrid.innerHTML = publications.slice(0, 2).map(mapPubHTML).join('');
  }
  
  // Add click handlers for detailed modal
  document.querySelectorAll('.pub-card-row.view-pub-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find closest pub-card-row because user might click on inner elements
      const row = e.target.closest('.pub-card-row');
      if(row) {
        const pubId = row.getAttribute('data-id');
        openPubModal(pubId);
      }
    });
  });
}

window.handleMemberPostClick = function(type, id) {
  const modal = document.getElementById('details-modal');
  if (modal && typeof modal.close === 'function') {
    modal.close();
  }

  if (type === 'publicacion') {
    window.location.hash = '#/impacto#publicaciones';
    setTimeout(() => {
      openPubModal(id);
    }, 150);
  } else if (type === 'actividad' || type === 'transferencia') {
    window.location.hash = `#/actividad/${id}`;
  } else if (type === 'recurso') {
    window.location.hash = '#/impacto#recursos';
    setTimeout(() => {
      openRecModal(id);
    }, 150);
  }
};

function getMemberAssociatedPosts(member) {
  if (!member) return [];
  const memberName = getI18nText(member.name) || '';
  const memberMapEntry = (typeof ALL_TEAM_MEMBERS_MAP !== 'undefined' && Array.isArray(ALL_TEAM_MEMBERS_MAP))
    ? ALL_TEAM_MEMBERS_MAP.find(m => m && m.id === member.id)
    : null;

  let rawKeys = [];
  if (memberMapEntry && Array.isArray(memberMapEntry.keys) && memberMapEntry.keys.length > 0) {
    rawKeys = memberMapEntry.keys;
  } else if (Array.isArray(member.keys) && member.keys.length > 0) {
    rawKeys = member.keys;
  } else if (memberName) {
    const cleanName = memberName.replace(/^(dra?\.?|dr\.?|prof\.?|profesora?)\s*/i, '').trim();
    const parts = cleanName.split(/\s+/);
    rawKeys = [cleanName, memberName];
    if (parts.length >= 2) {
      rawKeys.push(parts.slice(1).join(' '));
      rawKeys.push(parts[parts.length - 1]);
    }
  }
  const keys = rawKeys.filter(Boolean);
  const posts = [];

  // 1. Scientific Publications
  if (typeof publications !== 'undefined' && Array.isArray(publications)) {
    publications.forEach(pub => {
      if (!pub) return;
      const pubText = (pub.colaboradores || pub.collaborators || pub.authors || '') + ' ' + (pub.citation || '') + ' ' + getI18nText(pub.title) + ' ' + getI18nText(pub.abstract) + ' ' + (pub.authors ? getI18nText(pub.authors) : '');
      const isDirect = member.pubIds && member.pubIds.includes(pub.id);
      const isMatched = keys.length > 0 && keys.some(k => k && pubText.toLowerCase().includes(String(k).toLowerCase()));
      if ((isDirect || isMatched) && !posts.some(p => p.id === pub.id)) {
        posts.push({
          id: pub.id,
          type: 'publicacion',
          badgeText: currentLang === 'en' ? 'Publication' : (currentLang === 'ca' ? 'Publicació' : 'Publicación'),
          title: getI18nText(pub.title)
        });
      }
    });
  }

  // 2. Activities & Transfer
  if (typeof transferActivities !== 'undefined' && Array.isArray(transferActivities)) {
    transferActivities.forEach(act => {
      if (!act) return;
      const actText = (act.colaboradores || act.collaborators || act.authors || '') + ' ' + getI18nText(act.title) + ' ' + getI18nText(act.desc) + ' ' + getI18nText(act.loremIpsum);
      const isMatched = keys.length > 0 && keys.some(k => k && actText.toLowerCase().includes(String(k).toLowerCase()));
      if (isMatched && !posts.some(p => p.id === act.id)) {
        const isTrans = act.section === 'transferencia';
        posts.push({
          id: act.id,
          type: isTrans ? 'transferencia' : 'actividad',
          badgeText: isTrans ? (currentLang === 'en' ? 'Transfer' : (currentLang === 'ca' ? 'Transferència' : 'Transferencia')) : (currentLang === 'en' ? 'Activity' : (currentLang === 'ca' ? 'Activitat' : 'Actividad')),
          title: getI18nText(act.title)
        });
      }
    });
  }

  // 3. Resources
  const targetResources = (typeof projectResources !== 'undefined' && Array.isArray(projectResources)) 
    ? projectResources 
    : ((typeof resources !== 'undefined' && Array.isArray(resources)) ? resources : []);

  targetResources.forEach(res => {
    if (!res) return;
    const resText = (res.colaboradores || res.collaborators || res.authors || '') + ' ' + getI18nText(res.title) + ' ' + getI18nText(res.desc) + ' ' + getI18nText(res.description) + ' ' + getI18nText(res.loremIpsum);
    const isMatched = keys.length > 0 && keys.some(k => k && resText.toLowerCase().includes(String(k).toLowerCase()));
    if (isMatched && !posts.some(p => p.id === res.id)) {
      posts.push({
        id: res.id,
        type: 'recurso',
        badgeText: currentLang === 'en' ? 'Resource' : (currentLang === 'ca' ? 'Recurs' : 'Recurso'),
        title: getI18nText(res.title)
      });
    }
  });

  return posts;
}

function findMemberByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const raw = String(idOrSlug).trim();
  const cleanId = decodeURIComponent(raw).toLowerCase().trim();
  const normCleanId = cleanId.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

  if (typeof teamMembers !== 'undefined' && Array.isArray(teamMembers)) {
    let member = teamMembers.find(m => {
      if (!m) return false;
      if (m.id === raw || String(m.id).toLowerCase() === cleanId) return true;
      if (m.member_id && (m.member_id === raw || String(m.member_id).toLowerCase() === cleanId)) return true;
      if (m.wp_id && String(m.wp_id) === cleanId) return true;
      if (m.slug && (m.slug === raw || String(m.slug).toLowerCase() === cleanId)) return true;
      const mIdNorm = String(m.id || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      if (mIdNorm && mIdNorm === normCleanId) return true;
      const memIdNorm = String(m.member_id || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      if (memIdNorm && memIdNorm === normCleanId) return true;
      const slugNorm = String(m.slug || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      if (slugNorm && slugNorm === normCleanId) return true;
      const mNameNorm = String(getI18nText(m.name) || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
      if (mNameNorm && normCleanId && (mNameNorm.includes(normCleanId) || normCleanId.includes(mNameNorm))) return true;
      return false;
    });
    if (member) return member;
  }

  if (typeof ALL_TEAM_MEMBERS_MAP !== 'undefined' && Array.isArray(ALL_TEAM_MEMBERS_MAP)) {
    const mapEntry = ALL_TEAM_MEMBERS_MAP.find(m => {
      if (!m) return false;
      if (m.id === raw || String(m.id).toLowerCase() === cleanId) return true;
      if (m.member_id && (m.member_id === raw || String(m.member_id).toLowerCase() === cleanId)) return true;
      if (m.slug && (m.slug === raw || String(m.slug).toLowerCase() === cleanId)) return true;
      if (String(m.name).toLowerCase().includes(cleanId)) return true;
      return false;
    });
    if (mapEntry) return mapEntry;
  }

  return null;
}

function renderMemberModalContent(member, modalContent) {
  const memberIndex = teamMembers.findIndex(m => m.id === member.id);
  const isPhotoRight = memberIndex !== -1 ? (memberIndex % 2 === 1) : (member.id.charCodeAt(0) % 2 === 1);
  const layoutClass = isPhotoRight ? 'photo-on-right' : 'photo-on-left';
  const associatedPosts = getMemberAssociatedPosts(member);

  function formatBioHTML(bioContent) {
    if (!bioContent) return '';
    const text = getI18nText(bioContent).trim();
    if (text.includes('<p>') || text.includes('<p ')) {
      return text.replace(/<p(\s+[^>]*)?>/gi, '<p class="modal-bio-text">');
    }
    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    if (paragraphs.length > 1) {
      return paragraphs.map(p => `<p class="modal-bio-text">${p.replace(/\n/g, '<br>')}</p>`).join('');
    }
    return `<p class="modal-bio-text">${text.replace(/\n/g, '<br>')}</p>`;
  }
  
  modalContent.innerHTML = `
    <div class="member-modal-wrapper ${layoutClass}">
      <button class="modal-close member-modal-close-btn" id="modal-close-btn" aria-label="Cerrar modal">
        <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="member-modal-photo-column">
        <div class="modal-member-photo-wrapper img-loader-wrapper">
          <div class="img-skeleton-spinner">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
          </div>
          <img src="${getAssetUrl(member.photoHover || member.photo || member.image || member.thumb || member.photoDefault)}" alt="${getI18nText(member.name)}" class="fade-in-img member-fullheight-photo" onload="handleImgLoad(this)">
        </div>
      </div>
      
      <div class="member-modal-content-column">
        <div class="member-modal-header">
          <div class="member-modal-title-group">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="member-role-badge ${getRoleI18n(member.role, currentLang).toLowerCase().includes('principal') ? 'badge-ip' : 'badge-member'}">
                ${getRoleI18n(member.role, currentLang)}
              </span>
            </div>
            <h3 class="member-modal-name">${getI18nText(member.name)}</h3>
            <p class="member-modal-subtitle">${getI18nText(member.title)}</p>
          </div>
        </div>

        <div class="member-modal-body-scroll">
          ${formatBioHTML(member.bio)}
          
          <!-- Interactive contact icons -->
          <div class="modal-member-contacts-row">
            ${member.email ? `
              <a href="mailto:${member.email}" class="member-contact-link email-btn" title="Email: ${member.email}">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="email-svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            ` : ''}
            ${member.orcid ? `
              <a href="https://orcid.org/${member.orcid.replace(/^https?:\/\/orcid\.org\//, '')}" target="_blank" class="member-contact-link orcid-btn" title="ORCID: ${member.orcid}">
                <svg viewBox="0 0 24 24" width="22" height="22" class="orcid-svg" fill="currentColor">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.041-2.063 4.041-3.722 0-2.019-1.288-3.722-4.1-3.722h-2.238z"/>
                </svg>
              </a>
            ` : ''}
            ${(member.researchgate || member.rg) ? `
              <a href="${member.researchgate || member.rg}" target="_blank" class="member-contact-link rg-btn" title="ResearchGate: ${member.researchgate || member.rg}">
                <svg viewBox="0 0 24 24" width="24" height="24" class="rg-svg">
                  <text x="2.5" y="18" font-size="16.5" font-weight="900" font-family="Georgia, serif" fill="currentColor">R</text>
                  <text x="14" y="12" font-size="12" font-weight="800" font-family="Georgia, serif" style="font-style: italic;" fill="currentColor">g</text>
                </svg>
              </a>
            ` : ''}
            ${(member.googlescholar || member.scholar || member.google_scholar) ? `
              <a href="${member.googlescholar || member.scholar || member.google_scholar}" target="_blank" class="member-contact-link scholar-btn" title="Google Scholar: ${member.googlescholar || member.scholar || member.google_scholar}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="scholar-svg">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                </svg>
              </a>
            ` : ''}
            ${member.dialnet ? `
              <a href="${member.dialnet}" target="_blank" class="member-contact-link dialnet-btn" title="Dialnet: ${member.dialnet}">
                <svg viewBox="0 0 24 24" width="24" height="24" class="dialnet-svg">
                  <text x="4.5" y="18.5" font-size="19" font-weight="900" font-family="Arial, sans-serif" fill="currentColor">D</text>
                </svg>
              </a>
            ` : ''}
            ${member.mendeley ? `
              <a href="${member.mendeley}" target="_blank" class="member-contact-link mendeley-btn" title="Mendeley: ${member.mendeley}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="mendeley-svg">
                  <path d="M12 6.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4zm-5 5.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm10 0a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm-10.5 5.5h11c-.6 2.4-2.5 4.2-5.5 4.2s-4.9-1.8-5.5-4.2z"/>
                </svg>
              </a>
            ` : ''}
            ${member.linkedin ? `
              <a href="${member.linkedin}" target="_blank" class="member-contact-link linkedin-btn" title="LinkedIn: ${member.linkedin}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="linkedin-svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.56 1.56 0 1 0 0 3.12 1.56 1.56 0 0 0 0-3.12z"/>
                </svg>
              </a>
            ` : ''}
            ${member.bluesky ? `
              <a href="${member.bluesky}" target="_blank" class="member-contact-link bluesky-btn" title="Bluesky: ${member.bluesky}">
                <svg viewBox="0 0 568 501" width="24" height="24" class="bluesky-svg">
                  <path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209 46.866-35.185 111.57-55.801 111.57 23.364 0 15.8-9.014 132.884-14.309 151.848-18.411 65.952-85.496 82.781-144.978 72.846 103.882 17.659 130.344 76.516 73.18 135.086-108.629 111.31-160.916-27.917-183.178-77.944-22.263 50.027-74.55 189.254-183.179 77.944-57.164-58.57-30.702-117.427 73.18-135.086-59.482 9.935-126.567-6.894-144.978-72.846C23.07 208.71 14.056 91.627 14.056 75.827c0-79.165 64.704-58.549 111.565-22.163z" fill="currentColor"/>
                </svg>
              </a>
            ` : ''}
            ${member.instagram ? `
              <a href="${member.instagram}" target="_blank" class="member-contact-link instagram-btn" title="Instagram: ${member.instagram}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="instagram-svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            ` : ''}
            ${member.facebook ? `
              <a href="${member.facebook}" target="_blank" class="member-contact-link facebook-btn" title="Facebook: ${member.facebook}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="facebook-svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            ` : ''}
            ${(member.website || member.web || member.personal_website || member.url) ? `
              <a href="${member.website || member.web || member.personal_website || member.url}" target="_blank" rel="noopener noreferrer" class="member-contact-link website-btn" title="Web: ${member.website || member.web || member.personal_website || member.url}">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="website-svg">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </a>
            ` : ''}
          </div>

          <div class="modal-publications-section" style="${associatedPosts.length > 0 ? 'border-top: 1px solid var(--color-border-light); padding-top: 20px; margin-top: 4px;' : 'display:none;'}">
            <h4 style="margin-top: 0; margin-bottom: 12px; font-family: var(--font-primary); font-size: 14px; font-weight: 800; color: #0f172a;">
              ${currentLang === 'en' ? 'Publications & Activities in this project:' : (currentLang === 'ca' ? 'Publicacions i Activitats en aquest projecte:' : 'Publicaciones en este proyecto:')}
            </h4>
            <div class="member-associated-posts-list">
              ${associatedPosts.map(p => `
                <div class="member-post-box box-type-${p.type}" onclick="handleMemberPostClick('${p.type}', '${p.id}')">
                  <span class="member-post-type-badge">${p.badgeText}</span>
                  <span class="member-post-title-text">${p.title}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  adaptModalColors(modalContent);
  setupModalClose(document.getElementById('details-modal'));

  const imgEl = modalContent.querySelector('.member-fullheight-photo');
  if (imgEl) {
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      handleImgLoad(imgEl);
    } else {
      imgEl.addEventListener('load', () => handleImgLoad(imgEl));
    }
  }

  window.dispatchEvent(new CustomEvent('content-updated'));
}

function openMemberModal(id) {
  if (!id) return;
  const member = findMemberByIdOrSlug(id);

  if (!member) {
    console.warn('Member not found for modal ID:', id);
    return;
  }
  
  const modal = document.getElementById('details-modal');
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;

  // Make sure we clean up the class on modal close and restore URL hash
  modal.addEventListener('close', () => {
    modal.classList.remove('modal-large', 'modal-member-popup', 'green-tint-modal', 'modal-pub-popup', 'modal-rec-popup');
    modal.style.opacity = '';
    modal.style.transform = '';
    modal.style.transition = '';
    modal.style.animation = '';
    modalContent.style.opacity = '';
    modalContent.style.transform = '';
    modalContent.style.transition = '';
    try {
      const rawHash = window.location.hash || '';
      const onProyecto = window.location.pathname.includes('/proyecto') || rawHash.includes('#/proyecto') || document.body.getAttribute('data-page') === 'proyecto';
      if (onProyecto) {
        const isCleanPath = window.location.pathname.includes('/proyecto') && !rawHash.startsWith('#/');
        const revertHash = isCleanPath ? '#equipo' : '#/proyecto#equipo';
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', revertHash);
        }
      }
    } catch(e) {}
  }, { once: true });
  
  // Update address bar so user and colleagues can see and share the personalized member ID
  const memberTargetId = member.member_id || member.id || member.slug;
  if (memberTargetId && window.history && window.history.replaceState) {
    try {
      const rawHash = window.location.hash || '';
      const isCleanPath = window.location.pathname.includes('/proyecto') && !rawHash.startsWith('#/');
      const newHash = isCleanPath ? ('#' + memberTargetId) : ('#/proyecto#' + memberTargetId);
      window.history.replaceState({ memberModalOpen: true, memberId: memberTargetId }, '', newHash);
    } catch(e) {}
  }
  
  // Check if transition is happening from an open publication or resource popup
  const isFromPubOrRec = modal.open && (modal.classList.contains('modal-pub-popup') || modal.classList.contains('modal-rec-popup'));
  if (isFromPubOrRec) {
    // Fade out the entire modal box smoothly so there is no white empty box left behind
    modal.style.transition = 'opacity 0.22s cubic-bezier(0.4, 0, 0.2, 1), transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)';
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.97)';
    setTimeout(() => {
      modal.classList.remove('green-tint-modal', 'modal-pub-popup', 'modal-rec-popup');
      modal.classList.add('modal-large', 'modal-member-popup');
      modalContent.style.opacity = '1';
      modalContent.style.transform = 'none';
      modalContent.style.transition = 'none';
      renderMemberModalContent(member, modalContent);
      
      // Force layout reflow and smoothly fade in with slightly longer duration
      void modal.offsetHeight;
      modal.style.transition = 'opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1), transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)';
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
      setTimeout(() => {
        modal.style.transition = '';
        modal.style.transform = '';
      }, 400);
    }, 220);
    return;
  }

  // From Actividad, Transferencia and other posts: no transition animation, simply appear directly
  modal.style.transition = 'none';
  modal.style.animation = 'none';
  modal.style.opacity = '1';
  modal.style.transform = 'none';
  modalContent.style.transition = 'none';
  modalContent.style.opacity = '1';
  modalContent.style.transform = 'none';

  modal.classList.remove('green-tint-modal', 'modal-pub-popup', 'modal-rec-popup');
  modal.classList.add('modal-large', 'modal-member-popup');
  renderMemberModalContent(member, modalContent);
  if (!modal.open) {
    modal.showModal();
  }
}

function openPubModal(id) {
  const pub = publications.find(p => p.id === id);
  if (!pub) return;
  
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  modal.classList.remove('green-tint-modal', 'modal-member-popup', 'modal-rec-popup');
  modal.classList.add('modal-large', 'modal-pub-popup');

  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;
  
  const pubLabel = pub.extraLabel ? getI18nText(pub.extraLabel) : (pub.tag ? getI18nText(pub.tag) : (currentLang === 'en' ? 'Publication' : (currentLang === 'ca' ? 'Publicació' : 'Publicación')));
  const pubTitle = getI18nText(pub.title);
  const rawAbstract = getI18nText(pub.abstract) || getI18nText(pub.desc) || '';
  const { authors, apaCitation, externalLink, collabHTML } = getFormattedPubAuthorsAndCitation(pub);
  const collabWithHTML = (typeof getCollaborationWithHTML === 'function')
    ? getCollaborationWithHTML(pub.collaborationWith || pub.colaboracionCon, pub.collabWithTitle)
    : '';

  // Clean abstract if it only contains author names, URLs or empty tags
  let cleanAbstract = rawAbstract
    .replace(/<!--\s*\/?wp:[^>]*-->/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    .replace(/<a\s+[^>]*>.*?<\/a>/gi, '')
    .replace(/https?:\/\/\S+/gi, '')
    .trim();

  // If abstract is redundant with authors, suppress it so it does not duplicate
  const squashedAuthors = (pub.colaboradores || pub.collaborators || pub.authors || '').replace(/[^a-zA-Z]/g, '').toLowerCase();
  const squashedAbstract = cleanAbstract.replace(/<[^>]*>/g, '').replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (squashedAuthors && squashedAbstract && (squashedAuthors === squashedAbstract || squashedAuthors.includes(squashedAbstract) || squashedAbstract.includes(squashedAuthors))) {
    cleanAbstract = '';
  }

  // Detect poster / featured image
  const posterUrl = (pub.poster && !pub.poster.includes('default.png') && !pub.poster.includes('images/1.png'))
    ? pub.poster
    : ((pub.image && !pub.image.includes('default.png') && !pub.image.includes('images/1.png')) 
      ? pub.image 
      : ((pub.featured_image && !pub.featured_image.includes('default.png')) ? pub.featured_image : ''));

  const assetPosterUrl = posterUrl ? getAssetUrl(posterUrl) : '';

  // 1. Sidebar HTML: Featured Cover and prominent "Ver Publicación" button
  const hasSidebar = !!(assetPosterUrl || externalLink);
  const sidebarHTML = hasSidebar ? `
    <div class="pub-modal-sidebar">
      ${assetPosterUrl ? `
        <div class="pub-modal-poster-card-redesigned" onclick="openImageLightbox('${assetPosterUrl}', '${pubTitle.replace(/'/g, "\\'")}')" title="${currentLang === 'en' ? 'Click to zoom' : (currentLang === 'ca' ? 'Clica per ampliar' : 'Clic para ampliar')}">
          <img src="${assetPosterUrl}" alt="${pubTitle}">
          <div class="pub-modal-poster-zoom-hint">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            ${currentLang === 'en' ? 'Zoom' : 'Ampliar'}
          </div>
        </div>
      ` : ''}

      ${externalLink ? `
        <a href="${externalLink}" target="_blank" rel="noopener noreferrer" class="pub-modal-btn-view-prominent">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          ${currentLang === 'en' ? 'View Publication' : (currentLang === 'ca' ? 'Veure Publicació' : 'Ver Publicación')}
        </a>
      ` : ''}
    </div>
  ` : '';

  // 2. Main Content HTML: Clean Fecha row, APA Citation Card, and Abstract Card
  const mainContentHTML = `
    <div class="pub-modal-main-content">
      ${pub.date ? `
        <div class="pub-modal-date-row">
          <span class="pub-modal-date-badge">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <strong>${currentLang === 'en' ? 'Date' : (currentLang === 'ca' ? 'Data' : 'Fecha')}:</strong> ${pub.date}
          </span>
          ${pub.doi ? `
            <span class="pub-modal-doi-badge">
              <strong>DOI:</strong> <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer">${pub.doi}</a>
            </span>
          ` : ''}
        </div>
      ` : ''}

      <div class="pub-modal-apa-card">
        <span class="pub-modal-apa-label">${currentLang === 'en' ? 'APA Format Citation' : (currentLang === 'ca' ? 'Cita Format APA' : 'Cita Formato APA')}</span>
        <p class="pub-modal-apa-text">${apaCitation}</p>
      </div>

      ${cleanAbstract ? `
        <div class="pub-modal-abstract-card">
          <span class="pub-modal-abstract-label">${currentLang === 'en' ? 'Summary / Abstract' : (currentLang === 'ca' ? 'Resum / Abstract' : 'Resumen / Abstract')}</span>
          <p class="pub-modal-abstract-text">${cleanAbstract}</p>
        </div>
      ` : ''}
    </div>
  `;

  // 3. Full-width Collaborators / Authors section (standard thumbnails, using entire popup width)
  const fullWidthCollabsHTML = (collabHTML || collabWithHTML) ? `
    <div class="pub-modal-fullwidth-collabs">
      ${collabWithHTML}
      ${collabHTML}
    </div>
  ` : '';

  modalContent.innerHTML = `
    <div class="pub-modal-header-top">
      <div class="pub-modal-title-wrapper">
        <span class="pub-modal-category-badge">${pubLabel}</span>
        <h3 class="pub-modal-hero-title">${pubTitle}</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>

    <div class="pub-modal-split-layout ${!hasSidebar ? 'pub-modal-no-sidebar' : ''}">
      ${sidebarHTML}
      ${mainContentHTML}
    </div>

    ${fullWidthCollabsHTML}
  `;

  adaptModalColors(modalContent);
  modal.showModal();
  setupModalClose(modal);
  window.dispatchEvent(new CustomEvent('content-updated'));
}

function openNewsModal(newsItem) {
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;
  
  const labelColorClass = newsItem.type === 'news' ? 'var(--color-green)' : 'var(--color-blue)';
  const newsTag = newsItem.tag ? getI18nText(newsItem.tag) : 'Noticia';
  const newsTitle = getI18nText(newsItem.text) || getI18nText(newsItem.title);
  const newsDetails = getI18nText(newsItem.details) || getI18nText(newsItem.desc);
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-meta-label" style="color: ${labelColorClass}">${newsTag}</span>
        <h3>Últimas Noticias</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body">
      <h4 style="font-size: 18px; line-height: 1.4; margin-bottom: 20px; font-weight: 700; color: var(--color-text-light);">${newsTitle}</h4>
      <p style="font-size: 14.5px; line-height: 1.6; color: var(--color-text-muted-light);">${newsDetails}</p>
    </div>
  `;
  
  adaptModalColors(modalContent);
  
  modal.showModal();
  setupModalClose(modal);
}

function adaptModalColors(placeholder) {
  if (document.body.classList.contains('dark-mode')) {
    placeholder.querySelectorAll('p, li, strong, span.modal-detail-val, h4').forEach(el => {
      if (window.getComputedStyle(el).color === 'rgb(18, 24, 38)' || el.style.color === 'var(--color-text-light)') {
        el.style.color = 'var(--color-text-dark)';
      }
    });
  }
}

function closeModalWithAnimation(modal) {
  if (!modal || !modal.open) return;
  if (modal.classList.contains('is-closing')) return;
  modal.classList.add('is-closing');
  setTimeout(() => {
    modal.close();
    modal.classList.remove('is-closing', 'modal-large', 'modal-member-popup', 'modal-pub-popup', 'modal-rec-popup', 'green-tint-modal');
  }, 240);
}

function setupModalClose(modal) {
  const closeBtn = modal.querySelector('#modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeModalWithAnimation(modal);
    };
  }
  
  modal.onclick = (e) => {
    // Close when clicking the X close button or any element marked as .modal-close
    const closeTrigger = e.target.closest('#modal-close-btn, .modal-close');
    if (closeTrigger) {
      e.stopPropagation();
      closeModalWithAnimation(modal);
      return;
    }
    
    // Only close when clicking on the backdrop outside the dialog window
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModalWithAnimation(modal);
    }
  };
}

function updateImpactoSectionsVisibility() {
  const allActs = (typeof transferActivities !== 'undefined' && Array.isArray(transferActivities)) ? transferActivities : [];
  const actCount = allActs.filter(a => a && a.section !== 'transferencia').length;
  const transCount = allActs.filter(a => a && a.section === 'transferencia').length;
  const pubCount = (typeof publications !== 'undefined' && Array.isArray(publications)) ? publications.length : 0;
  const recCount = (typeof projectResources !== 'undefined' && Array.isArray(projectResources)) ? projectResources.length : 0;

  const sectionsConfig = [
    { key: 'actividades', count: actCount },
    { key: 'transferencia', count: transCount },
    { key: 'publicaciones', count: pubCount },
    { key: 'recursos', count: recCount }
  ];

  sectionsConfig.forEach(({ key, count }) => {
    const isVisible = count > 0;

    // 1. Toggle Cards on Home and Impacto
    document.querySelectorAll(`.card-${key}`).forEach(el => {
      if (isVisible) {
        el.style.removeProperty('display');
      } else {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    // 2. Toggle Submenu Links and their parent <li>
    document.querySelectorAll(`.link-${key}`).forEach(el => {
      const parentLi = el.closest('li') || el.parentElement;
      if (isVisible) {
        el.style.removeProperty('display');
        if (parentLi) parentLi.style.removeProperty('display');
      } else {
        el.style.setProperty('display', 'none', 'important');
        if (parentLi) parentLi.style.setProperty('display', 'none', 'important');
      }
    });

    // 3. Toggle Section Container on Impacto Page
    const secEl = document.getElementById(key);
    if (secEl) {
      if (isVisible) {
        secEl.style.removeProperty('display');
      } else {
        secEl.style.setProperty('display', 'none', 'important');
      }
    }
  });

  // Center remaining cards
  document.querySelectorAll('.section-nav-grid').forEach(grid => {
    grid.style.setProperty('display', 'flex', 'important');
    grid.style.setProperty('flex-wrap', 'wrap', 'important');
    grid.style.setProperty('justify-content', 'center', 'important');
  });

  // Re-adjust active submenu link if the active one is hidden
  const activeSubmenu = document.querySelector('.page-submenu .submenu-link.active');
  if (activeSubmenu) {
    const parentLi = activeSubmenu.closest('li');
    if (activeSubmenu.style.display === 'none' || (parentLi && parentLi.style.display === 'none')) {
      const firstVisible = Array.from(document.querySelectorAll('.page-submenu .submenu-link')).find(l => {
        const pLi = l.closest('li');
        return l.style.display !== 'none' && (!pLi || pLi.style.display !== 'none');
      });
      if (firstVisible) {
        document.querySelectorAll('.page-submenu .submenu-link').forEach(l => l.classList.remove('active'));
        firstVisible.classList.add('active');
      }
    }
  }
}

function setupLordIconHoverColors() {
  document.querySelectorAll('.card-publicaciones').forEach(card => {
    const icon = card.querySelector('lord-icon');
    if (!icon) return;
    card.addEventListener('mouseenter', () => {
      icon.setAttribute('colors', 'primary:#8b5cf6,secondary:#c4b5fd');
    });
    card.addEventListener('mouseleave', () => {
      icon.setAttribute('colors', 'primary:#ffffff,secondary:#ddd6fe');
    });
  });

  document.querySelectorAll('.card-recursos').forEach(card => {
    const icon = card.querySelector('lord-icon');
    if (!icon) return;
    card.addEventListener('mouseenter', () => {
      icon.setAttribute('colors', 'primary:#10b981,secondary:#6ee7b7');
    });
    card.addEventListener('mouseleave', () => {
      icon.setAttribute('colors', 'primary:#ffffff,secondary:#a7f3d0');
    });
  });
}

// ----------------------------------------------------
// 5. GLOBAL INTERACTIVE CONTROLLER INITIALIZATION
// ----------------------------------------------------

function initializeApp() {
  // Merge live WordPress DB Posts & Pages if available (edited from WP Admin or created by Make.com)
  if (typeof window !== 'undefined' && window.CopliteleWPData) {
    ingestWPPageContent();
    const wpAct = Array.isArray(window.CopliteleWPData.actividades) ? window.CopliteleWPData.actividades : [];
    const wpTrans = Array.isArray(window.CopliteleWPData.transferencia) ? window.CopliteleWPData.transferencia : [];
    const wpPubs = Array.isArray(window.CopliteleWPData.publicaciones) ? window.CopliteleWPData.publicaciones : [];
    const wpRecs = Array.isArray(window.CopliteleWPData.recursos) ? window.CopliteleWPData.recursos : [];
    const nonMemberTags = ['taller', 'formacion', 'formacio', 'seminario', 'seminari', 'articulo', 'article', 'libro', 'llibre', 'congreso', 'congres', 'poster', 'guia', 'informe', 'protocolo', 'protocol', 'agente', 'agent', 'transferencia', 'divulgacion', 'divulgacio', 'jornada'];
    const wpMembers = (Array.isArray(window.CopliteleWPData.miembros) ? window.CopliteleWPData.miembros : [])
      .filter(m => {
        if (!m) return false;
        if (m.section && m.section !== 'miembros') return false;
        const tagText = (String(m.tag?.es || '') + ' ' + String(m.type || '') + ' ' + String(m.filterType || '')).toLowerCase();
        if (nonMemberTags.some(kw => tagText.includes(kw))) return false;
        return true;
      });

    // Always replace with live WP data (if 0 posts published in WP, arrays will be empty as expected)
    transferActivities.length = 0;
    transferActivities.push(...wpAct, ...wpTrans);

    newsFeedItems = transferActivities.map((act, index) => ({
      id: 'news-' + (act.id || index),
      type: act.section || 'actividades',
      tag: act.tag || { es: 'Seminario', ca: 'Seminari', en: 'Seminar' },
      text: act.title || { es: '', ca: '', en: '' },
      activityId: act.id
    }));

    publications.length = 0;
    publications.push(...wpPubs);

    projectResources.length = 0;
    projectResources.push(...wpRecs);

    if (wpMembers.length > 0) {
      teamMembers.length = 0;
      teamMembers.push(...wpMembers);

      ALL_TEAM_MEMBERS_MAP.length = 0;
      wpMembers.forEach(wpM => {
        const displayName = getI18nText(wpM.name) || '';
        const cleanName = displayName.replace(/^(dra?\.?|dr\.?|prof\.?|profesora?)\s*/i, '').trim();
        const memberKey = wpM.id || wpM.slug || wpM.member_id;
        const knownAliases = (typeof MEMBER_KNOWN_ALIASES !== 'undefined')
          ? (MEMBER_KNOWN_ALIASES[memberKey] || MEMBER_KNOWN_ALIASES[wpM.id] || MEMBER_KNOWN_ALIASES[wpM.slug] || MEMBER_KNOWN_ALIASES[wpM.member_id] || [])
          : [];
        const generatedKeys = [displayName, cleanName, wpM.id, wpM.member_id, wpM.slug, ...knownAliases].filter(Boolean);

        const entry = {
          id: wpM.id,
          member_id: wpM.member_id || '',
          slug: wpM.slug || '',
          name: displayName,
          displayName: displayName,
          role: getI18nText(wpM.role),
          affiliation: getI18nText(wpM.title),
          thumb: wpM.image || wpM.photoHover,
          image: wpM.image || wpM.photoHover,
          photoHover: wpM.photoHover || wpM.image,
          email: wpM.email || '',
          orcid: wpM.orcid || '',
          researchgate: wpM.researchgate || '',
          googlescholar: wpM.googlescholar || '',
          dialnet: wpM.dialnet || '',
          mendeley: wpM.mendeley || '',
          linkedin: wpM.linkedin || '',
          bluesky: wpM.bluesky || '',
          instagram: wpM.instagram || '',
          facebook: wpM.facebook || '',
          website: wpM.website || '',
          bio: getI18nText(wpM.bio || wpM.desc),
          keys: Array.from(new Set(generatedKeys.filter(Boolean)))
        };
        ALL_TEAM_MEMBERS_MAP.push(entry);
      });
    }
  }

  // 5.1 Render dynamic content components
  try { updateAllLogos(); } catch(e) { console.error('Logo update error:', e); }
  try { renderNewsFeed(); } catch(e) { console.error('NewsFeed error:', e); }
  try { renderTeam(); } catch(e) { console.error('Team error:', e); }
  try { renderPublications(); } catch(e) { console.error('Pubs error:', e); }
  try { renderTransferActivities(); } catch(e) { console.error('Activities error:', e); }
  try { renderResources(); } catch(e) { console.error('Resources error:', e); }
  try { updateImpactoSectionsVisibility(); } catch(e) { console.error('Visibility error:', e); }
  try { setupLordIconHoverColors(); } catch(e) { console.error('Icon hover error:', e); }
  
  // 5.1.1 Hero brand title letter-by-letter entrance animation
  // Use rAF + small timeout so CSS is settled before we add the class
  requestAnimationFrame(() => {
    setTimeout(() => {
      const heroTitle = document.querySelector('.hero-intro-brand-title');
      const heroTagline = document.querySelector('.hero-intro-tagline');
      const heroDivider = document.querySelector('.brand-divider-line');
      if (heroTitle) heroTitle.classList.add('hero-animated');
      if (heroTagline) heroTagline.classList.add('hero-tagline-in');
      if (heroDivider) heroDivider.classList.add('hero-divider-in');
    }, 80);
  });

  
  // 5.2 Dynamic Logo Trigger on click
  const heroLogoContainer = document.getElementById('hero-logo-container');
  if (heroLogoContainer) {
    heroLogoContainer.addEventListener('click', () => {
      updateAllLogos();
    });
  }
  
  const headerLogoContainer = document.getElementById('header-logo-container');
  if (headerLogoContainer) {
    headerLogoContainer.addEventListener('click', (e) => {
      e.preventDefault();
      updateAllLogos();
    });
  }
  
  // 5.3 Shrinking Fixed Header on Scroll
  let arcsSvg = document.querySelector('.animated-arcs-bg');
  
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const sy = window.scrollY;
        const header = document.querySelector('header');
        if (header) {
          if (sy > 30) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
        
        const heroLogo = document.getElementById('hero-logo-container');
        const headerLogo = document.getElementById('header-logo-container');
        
        const currentPath = (window.location.hash || '#/').replace(/^#\/?/, '').split('#')[0] || 'inicio';
        const isInicioPg = (currentPath === 'inicio' || currentPath === '');
        
        if (isInicioPg) {
          const maxScroll = 250;
          const progress = Math.min(1, Math.max(0, sy / maxScroll));
          if (heroLogo) { heroLogo.style.transform = `scale(${1 - progress})`; heroLogo.style.opacity = `${1 - progress}`; }
          if (headerLogo) { headerLogo.style.transform = `scale(${progress})`; headerLogo.style.opacity = `${progress}`; headerLogo.style.pointerEvents = progress > 0.15 ? 'auto' : 'none'; }
          
          // Hero brand text fade-out with slight delay after logo
          const brandText = document.querySelector('.hero-intro-brand-wrapper');
          if (brandText) {
            const textProgress = Math.min(1, Math.max(0, (sy - 30) / 200));
            brandText.style.opacity = `${1 - textProgress}`;
            brandText.style.transform = `translateY(${textProgress * 18}px)`;
          }
        } else {
          if (heroLogo) { heroLogo.style.transform = 'scale(0)'; heroLogo.style.opacity = '0'; }
          if (headerLogo) { headerLogo.style.transform = 'scale(1)'; headerLogo.style.opacity = '1'; headerLogo.style.pointerEvents = 'auto'; }
        }
        
        // Pause CSS spinning animations when scrolling past Hero to improve smoothness
        if (sy > window.innerHeight * 0.8) {
          document.body.classList.add('scrolled-past-hero');
        } else {
          document.body.classList.remove('scrolled-past-hero');
        }
        
        // Arc parallax: apply transformation via JS for smooth scroll-driven movement
        if (arcsSvg) {
          const offsetY = sy * 0.25; 
          const scale = 1 + (sy * 0.0005);
          const rotate = sy * 0.05;
          arcsSvg.style.transform = `translateY(${offsetY}px) scale(${scale}) rotate(${rotate}deg)`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  // 5.3.2 Hero Intro Scroll Down Smoothly
  const scrollDownArrow = document.getElementById('scroll-down-arrow');
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('hero-details-anchor');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // 5.4 Theme Switcher (Light / Dark mode toggle)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', currentMode);
      updateAllLogos();
    });
  }
  
  // 5.5 Custom Language Switcher Dropdown with Flags
  const langDropdownBtn = document.getElementById('lang-dropdown-btn');
  const langDropdownContainer = document.getElementById('lang-dropdown-container');
  const langDropdownList = document.getElementById('lang-dropdown-list');
  const langOptions = document.querySelectorAll('.lang-option');
  
  if (langDropdownBtn && langDropdownContainer) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownContainer.classList.toggle('open');
      const isOpen = langDropdownContainer.classList.contains('open');
      langDropdownBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close dropdown on outside clicks
    document.addEventListener('click', (e) => {
      if (langDropdownContainer && !langDropdownContainer.contains(e.target)) {
        langDropdownContainer.classList.remove('open');
        langDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Handle all language switcher options (both desktop dropdown and mobile pills)
  langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = option.getAttribute('data-value');
      if (!selectedLang) return;
      
      // Update selection states on all language options
      document.querySelectorAll('.lang-option').forEach(opt => {
        const isSelected = opt.getAttribute('data-value') === selectedLang;
        opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        if (opt.classList.contains('mobile-lang-pill')) {
          opt.classList.toggle('active', isSelected);
        }
      });
      
      // Update active flag & text in desktop button if available
      const flagEl = option.querySelector('.flag-icon');
      const shortText = selectedLang.toUpperCase();
      const currFlag = document.getElementById('current-lang-flag');
      const currText = document.getElementById('current-lang-text');
      if (currFlag && flagEl) currFlag.innerHTML = flagEl.innerHTML;
      if (currText) currText.textContent = shortText;
      
      // Run translation
      translatePage(selectedLang);
      
      // Close desktop dropdown if open
      if (langDropdownContainer) {
        langDropdownContainer.classList.remove('open');
      }
      if (langDropdownBtn) {
        langDropdownBtn.setAttribute('aria-expanded', 'false');
      }

      // Close mobile overlay if open so user sees page translated
      const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
      const menuToggle = document.getElementById('menu-toggle');
      if (mobileNavOverlay && mobileNavOverlay.classList.contains('open')) {
        setTimeout(() => {
          mobileNavOverlay.classList.remove('open');
          if (menuToggle) menuToggle.classList.remove('open');
        }, 120);
      }
    });
  });
  
  // 5.6 Mobile Menu Overlay Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  if (menuToggle && mobileNavOverlay) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileNavOverlay.classList.toggle('open');
    });
    
    mobileNavOverlay.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
      });
    });
  }
  
  // 5.7 IntersectionObserver for Active Section Link
  const sections = document.querySelectorAll('section.page-section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const options = {
    root: null,
    threshold: 0.35,
    rootMargin: "-70px 0px 0px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => {
    if (section.getAttribute('id')) {
      observer.observe(section);
    }
  });
  
  // 5.8 Expandable Search Bar click/typing toggle logic
  const headerSearch = document.querySelector('.header-search');
  const headerSearchIcon = document.querySelector('.header-search-icon');
  const headerSearchInput = document.getElementById('header-search-input');
  
  if (headerSearchIcon && headerSearchInput && headerSearch) {
    headerSearchIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!headerSearch.classList.contains('active')) {
        headerSearch.classList.add('active');
        headerSearchInput.focus();
      } else {
        if (headerSearchInput.value.trim() === '') {
          headerSearch.classList.remove('active');
        } else {
          window.location.hash = '#/publicaciones';
        }
      }
    });
    
    // Auto collapse search bar on outside clicks
    document.addEventListener('click', (e) => {
      if (headerSearch.classList.contains('active') && !headerSearch.contains(e.target)) {
        if (headerSearchInput.value.trim() === '') {
          headerSearch.classList.remove('active');
        }
      }
    });
  }

  // 5.9 Publications Search Bar Inputs (Synchronized with Header Search)
  const searchInput = document.getElementById('publications-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (headerSearchInput) headerSearchInput.value = e.target.value;
      renderPublications();
    });
  }
  
  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchInput) searchInput.value = e.target.value;
      renderPublications();
      
      // Auto routing: navigate SPA to scientific publications view
      if (window.location.hash !== '#/publicaciones') {
        window.location.hash = '#/publicaciones';
      }
    });
  }
  
  // 5.10 Publications Tab Filters
  const pubFilterBtns = document.querySelectorAll('.pub-filter-btn');
  pubFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      pubFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pubFilterType = btn.getAttribute('data-filter');
      renderPublications();
    });
  });
  
  // 5.10.1 Actividades Tab Filters
  const actFilterBtns = document.querySelectorAll('.act-filter-btn');
  actFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      actFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterType = btn.getAttribute('data-filter');
      renderTransferActivities(filterType);
    });
  });

  // 5.10.2 Recursos Tab Filters
  const recFilterBtns = document.querySelectorAll('.rec-filter-btn');
  recFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      recFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterType = btn.getAttribute('data-filter');
      renderResources(filterType);
    });
  });
  
  // 5.11 Project Section Tab Switcher (Descripción vs Equipo)
  const projTabDesc = document.getElementById('project-tab-desc');
  const projTabTeam = document.getElementById('project-tab-team');
  const paneDesc = document.getElementById('project-pane-desc');
  const paneTeam = document.getElementById('project-pane-team');
  
  if (projTabDesc && projTabTeam && paneDesc && paneTeam) {
    projTabDesc.addEventListener('click', () => {
      projTabDesc.classList.add('active');
      projTabDesc.classList.remove('inactive');
      projTabTeam.classList.remove('active');
      projTabTeam.classList.add('inactive');
      
      paneDesc.classList.add('active');
      paneTeam.classList.remove('active');
    });
    
    projTabTeam.addEventListener('click', () => {
      projTabTeam.classList.add('active');
      projTabTeam.classList.remove('inactive');
      projTabDesc.classList.remove('active');
      projTabDesc.classList.add('inactive');
      
      paneTeam.classList.add('active');
      paneDesc.classList.remove('active');
      
      // Quick layout recalculation for team cards if needed
      renderTeam();
    });
  }

  // 5.11 Phase Cards Hover and Touch handler
  document.querySelectorAll('.phase-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
    card.addEventListener('click', () => {
      document.querySelectorAll('.phase-card').forEach(c => { if (c !== card) c.classList.remove('is-hovered'); });
      card.classList.toggle('is-hovered');
    });
  });

  // Run initial translation
  translatePage(currentLang);

  // 5.12 Dynamic Stat Counts Injection & Redirection Routing
  const updateStatCounts = () => {
    const invEl = document.getElementById('stat-count-investigadores');
    if (invEl) invEl.innerText = teamMembers.length;

    const pubEl = document.getElementById('stat-count-publicaciones');
    if (pubEl) pubEl.innerText = publications.length;

    const actEl = document.getElementById('stat-count-actividades');
    if (actEl) actEl.innerText = transferActivities.length;
  };
  updateStatCounts();

  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const label = item.querySelector('.stat-label').getAttribute('data-i18n');
      if (label === 'stats_years') {
        window.location.hash = '#/proyecto#proyecto';
      } else if (label === 'stats_investigadores') {
        window.location.hash = '#/proyecto#equipo';
      } else if (label === 'stats_actividades' || label === 'stats_experiencias') {
        window.location.hash = '#/impacto#actividades';
      } else if (label === 'stats_publicaciones') {
        window.location.hash = '#/impacto#publicaciones';
      }
    });
  });

  // 5.13 Initialize Cookies Banner
  initCookieBanner();

  // 5.14 Initialize SPA routing
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('popstate', handleRouting);

  // Support clean URL transitions on nav links and imagotype
  document.querySelectorAll('.nav-link, .mobile-menu-link, .imagotype-container').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('#/') || href.includes('#/'))) {
        const hashPart = href.split('#/')[1];
        if (hashPart && ['inicio', 'proyecto', 'impacto'].includes(hashPart)) {
          e.preventDefault();
          const targetUrl = hashPart === 'inicio' ? '/' : ('/' + hashPart);
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', targetUrl);
            handleRouting();
          } else {
            window.location.hash = '#/' + hashPart;
          }
        }
      }
    });
  });

  window.addEventListener('load', () => {
    handleRouting();
    initSubmenuScrollObserver();
    initCustomCursor();
    initScrollReveal();
  });
  handleRouting();
}

function initCookieBanner() {
  const banner = document.getElementById('coplitele-cookie-banner');
  if (!banner) return;

  const acceptAllBtn = document.getElementById('cookie-accept-all');
  const acceptEssentialBtn = document.getElementById('cookie-accept-essential');
  const openSettingsBtn = document.getElementById('open-cookie-settings-btn');

  const showBanner = () => {
    banner.classList.remove('cookie-banner-hidden');
  };

  const hideBanner = () => {
    banner.classList.add('cookie-banner-hidden');
  };

  const savedConsent = localStorage.getItem('coplitele_cookie_consent');

  if (!savedConsent) {
    // Show banner after brief delay for smooth entrance
    setTimeout(showBanner, 600);
  }

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      localStorage.setItem('coplitele_cookie_consent', 'all');
      localStorage.setItem('coplitele_cookie_consent_date', new Date().toISOString());
      hideBanner();
    });
  }

  if (acceptEssentialBtn) {
    acceptEssentialBtn.addEventListener('click', () => {
      localStorage.setItem('coplitele_cookie_consent', 'essential');
      localStorage.setItem('coplitele_cookie_consent_date', new Date().toISOString());
      hideBanner();
    });
  }

  if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showBanner();
      banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// ----------------------------------------------------
// 6. SPA ROUTING RENDERING FUNCTIONS
// ----------------------------------------------------

function handleRouting() {
  const rawHash = window.location.hash || '';
  const pathname = window.location.pathname.replace(/^\/(?:es|ca|en)\/?/, '/');
  const cleanPathname = pathname.replace(/^\/+|\/+$/g, '');
  
  let path = 'inicio';
  let anchorPart = null;
  let memberToOpen = null;
  let detailId = null;

  // Hide all simulated views
  const views = document.querySelectorAll('.spa-view');
  views.forEach(v => v.classList.remove('active'));

  // 1. Analyze Hash
  if (rawHash && rawHash !== '#' && rawHash !== '#/') {
    // Split all hash segments, e.g. "#/proyecto#equipo#alberto-rodriguez"
    const hashSegments = rawHash.split('#').map(s => s.trim().replace(/^\/+|\/+$/g, '')).filter(Boolean);
    
    if (hashSegments.length > 0) {
      const first = hashSegments[0];
      
      if (first.startsWith('actividad/') || first.startsWith('actividades/') || first.startsWith('post/') || first.startsWith('entrada/')) {
        detailId = first.replace(/^(actividad|actividades|post|entrada)\//, '').trim();
        path = 'actividad-detalle';
      } else if (first.startsWith('miembro/') || first.startsWith('equipo/')) {
        memberToOpen = first.replace(/^(miembro|equipo)\//, '').trim();
        path = 'proyecto';
        anchorPart = 'equipo';
      } else if (first === 'proyecto' || first === 'impacto' || first === 'inicio') {
        path = first;
        if (hashSegments.length > 1) {
          for (let i = 1; i < hashSegments.length; i++) {
            const seg = hashSegments[i];
            const foundMember = findMemberByIdOrSlug(seg);
            if (foundMember) {
              memberToOpen = seg;
              anchorPart = 'equipo';
            } else if (!anchorPart) {
              anchorPart = seg;
            }
          }
        }
      } else if (first === 'transferencia' || first === 'publicaciones' || first === 'recursos' || first === 'actividades') {
        path = 'impacto';
        anchorPart = first;
      } else {
        // Direct member ID or anchor
        const directMember = findMemberByIdOrSlug(first);
        if (directMember) {
          path = 'proyecto';
          anchorPart = 'equipo';
          memberToOpen = first;
        } else if (cleanPathname === 'proyecto' || cleanPathname === 'impacto') {
          path = cleanPathname;
          anchorPart = first;
        } else {
          anchorPart = first;
        }
      }
    }
  } else {
    // 2. No hash present, determine route from pathname
    if (cleanPathname === 'proyecto' || cleanPathname === 'impacto' || cleanPathname === 'inicio') {
      path = cleanPathname;
    } else if (cleanPathname.startsWith('actividad/') || cleanPathname.startsWith('actividades/')) {
      detailId = cleanPathname.replace(/^(actividad|actividades)\//, '').trim();
      path = 'actividad-detalle';
    } else if (cleanPathname.startsWith('miembro/') || cleanPathname.startsWith('equipo/')) {
      memberToOpen = cleanPathname.replace(/^(miembro|equipo)\//, '').trim();
      path = 'proyecto';
      anchorPart = 'equipo';
    } else {
      path = 'inicio';
    }
  }

  // Redirect old routes to unified #/impacto with anchors
  if (path === 'transferencia' || path === 'publicaciones' || path === 'recursos') {
    path = 'impacto';
    anchorPart = path;
  }
  
  // Show target SPA view
  const targetView = document.getElementById(`view-${path}`);
  if (targetView) {
    targetView.classList.add('active');
  } else {
    const homeView = document.getElementById('view-inicio');
    if (homeView) homeView.classList.add('active');
    path = 'inicio';
  }
  
  updateBackgroundLines(path);
  try { updateImpactoSectionsVisibility(); } catch(e) {}
  
  // Update body data-page for CSS targeting
  document.body.setAttribute('data-page', path);
  
  // Update nav-menu links active states
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.replace(/^#\/?/, '').split('#')[0];
      if (path === linkPath || (path === 'inicio' && linkPath === 'inicio') || (path === 'actividad-detalle' && linkPath === 'impacto')) {
        link.classList.add('active');
      }
    }
  });
  
  // Handle member modal opening and scrolling
  if (memberToOpen) {
    setTimeout(() => {
      openMemberModal(memberToOpen);
    }, 180);

    setTimeout(() => {
      const memberCard = document.getElementById(memberToOpen) || document.getElementById('card-' + memberToOpen);
      const targetElement = memberCard || document.getElementById('equipo');
      if (targetElement) {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    }, 120);
  } else if (anchorPart) {
    setTimeout(() => {
      const targetElement = document.getElementById(anchorPart);
      if (targetElement) {
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  
  // Load detail content dynamically if matched
  if (path === 'actividad-detalle' && detailId) {
    renderActivityDetail(detailId);
  }
  
  // Force immediate scroll triggers (logo visibility, circles, etc.)
  window.dispatchEvent(new Event('scroll'));
}

function getActivityIcon(type) {
  switch(type) {
    case 'taller':
      return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>`;
    case 'seminario':
      return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M17 10.5V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.5l5 4.5V6l-5 4.5zM14 18H3V6h11v12z"/></svg>`;
    case 'formacion':
      return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.89 12.5L12 15.82l6.11-3.32v2.32L12 18.16l-6.11-3.32v-2.32z"/></svg>`;
    case 'demo':
    default:
      return `<svg viewBox="0 0 24 24" class="tag-icon"><path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`;
  }
}

function getSpinningIsotypeSVG() {
  // Real COPLITELE-IA isotipo: 3 arcs (blue, teal, green) + 3 dots + transparent interior + white plus
  return `
    <div class="hover-isotype-wrapper">
      <svg class="spinning-arcs" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           style="width:100%; height:100%; fill:none; stroke-linecap:round; overflow:visible;">
        <!-- Blue arc ~105° starting at -90° -->
        <path d="M50 13 A37 37 0 0 1 86.9 62.5" stroke="#93c5fd" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Teal arc ~105° -->
        <path d="M83.5 72 A37 37 0 0 1 16.5 72" stroke="#5eead4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Green arc ~90° -->
        <path d="M13.1 62.5 A37 37 0 0 1 50 13" stroke="#6ee7b7" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- 3 dots at arc junction points -->
        <circle cx="50" cy="13" r="5" fill="#93c5fd"/>
        <circle cx="83.5" cy="72" r="5" fill="#5eead4"/>
        <circle cx="13.1" cy="62.5" r="5" fill="#6ee7b7"/>
      </svg>
      <svg class="static-plus" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
           style="position:absolute; width:100%; height:100%; top:0; left:0; fill:none; stroke:currentColor; stroke-width:6; stroke-linecap:round;">
        <path d="M50 37v26M37 50h26"/>
      </svg>
    </div>
  `;
}
function renderTransferActivities(filterType = 'all') {
  const activitiesGrid = document.getElementById('activities-grid');
  const transferenciaGrid = document.getElementById('transferencia-grid');
  const homeActivitiesGrid = document.getElementById('home-activities-grid');
  
  // ─── ACTIVIDADES ─── image/video card, title at bottom, tag/date on hover
  if (activitiesGrid) {
    const activities = transferActivities.filter(act => 
      act && act.section === 'actividades' && (filterType === 'all' || act.type === filterType)
    );
    activitiesGrid.innerHTML = activities.map(act => {
      if (!act) return '';
      const actTitle = getI18nText(act.title);
      const actTag = act.tag ? getI18nText(act.tag) : 'Actividad';

      // Simplified date format dd/mm/yyyy
      const shortDate = act.date ? String(act.date).replace(/(\d+)\s+(\w+)\s+(\d{4})/, (_, d, m, y) => {
        const months = {enero:'01',febrero:'02',marzo:'03',abril:'04',mayo:'05',junio:'06',julio:'07',agosto:'08',septiembre:'09',octubre:'10',noviembre:'11',diciembre:'12'};
        return d.padStart(2, '0') + '/' + (months[m.toLowerCase()] || '01') + '/' + y;
      }) : '';

      const shortDateHTML = shortDate ? '<span style="font-size:14px; color:rgba(255,255,255,0.8); font-weight:500; margin-top:8px;">' + shortDate + '</span>' : '';

      const mediaHTML = act.videoSrc 
        ? '<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="' + getAssetUrl(act.videoSrc) + '" type="video/mp4"></video>'
        : '<img src="' + getAssetUrl(act.image) + '" alt="' + actTitle + '" loading="lazy">';

      return `
      <article class="activity-card act-card-actividades" data-id="${act.id}" data-type="${act.type}" data-cursor-color="blue" style="text-align:center; position:relative;">
        <div class="activity-image-wrapper">
          ${mediaHTML}
          <!-- Hover overlay: tag/date centered, title remains underneath (z-index 4) -->
          <div class="act-hover-overlay act-hover-blue" style="background: rgba(29, 91, 254, 0.96) !important; padding: 24px 16px 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%; z-index: 2;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">${actTag}</span>
            ${shortDateHTML}
          </div>
          <!-- Idle gradient: shadow behind text -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index: 3;"></div>
          <!-- Singleton Title: Always at the bottom, z-index 4, pointer-events none -->
          <div class="act-card-title-container" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 4; text-align: center; pointer-events: none;">
            <h3 style="font-size:18px !important; font-weight:700 !important; color:#fff !important; margin:0 !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${actTitle}</h3>
          </div>
        </div>
      </article>
    `}).join('');
  }
  
  // ─── TRANSFERENCIA ─── title outside image, tag + date on hover in white text
  if (transferenciaGrid) {
    const transferences = transferActivities.filter(act => act && act.section === 'transferencia');
    transferenciaGrid.innerHTML = transferences.map(act => {
      if (!act) return '';
      const actTitle = getI18nText(act.title);
      const actTag = act.tag ? getI18nText(act.tag) : 'Transferencia';
      
      // Calculate shortDate format dd/mm/yyyy
      const shortDate = act.date ? String(act.date).replace(/(\d+)\s+(\w+)\s+(\d{4})/, (_, d, m, y) => {
        const months = {enero:'01',febrero:'02',marzo:'03',abril:'04',mayo:'05',junio:'06',julio:'07',agosto:'08',septiembre:'09',octubre:'10',noviembre:'11',diciembre:'12'};
        return d.padStart(2, '0') + '/' + (months[m.toLowerCase()] || '01') + '/' + y;
      }) : (act.date || act.event || '');

      const shortDateHTML = shortDate 
        ? '<span class="act-hover-date" style="font-size:14.5px; color:#ffffff !important; font-weight:600; margin-top:6px; display:block;">' + shortDate + '</span>' 
        : '';

      const mediaHTML = act.videoSrc 
        ? '<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="' + getAssetUrl(act.videoSrc) + '" type="video/mp4"></video>'
        : '<img src="' + getAssetUrl(act.image) + '" alt="' + actTitle + '" loading="lazy">';

      return `
      <article class="activity-card act-card-transferencia trans-card" data-id="${act.id}" data-type="${act.type}" data-cursor-color="turquoise" style="overflow:hidden !important; border-radius:20px; display:flex; flex-direction:column; text-align:center; width:100%; max-width:100%; box-sizing:border-box;">
        <div class="activity-image-wrapper" style="position:relative; border-radius:16px; overflow:hidden; width:100%; box-sizing:border-box;">
          ${mediaHTML}
          <!-- Hover overlay: turquoise overlay displaying the tag and DATE (instead of Excerpt) in white text -->
          <div class="act-hover-overlay act-hover-turquoise" style="background: rgba(20, 184, 166, 0.96) !important; padding: 24px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%; z-index: 2;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.95; letter-spacing:1.5px; color:#ffffff !important; font-weight:800; text-transform:uppercase;">${actTag}</span>
            ${shortDateHTML}
          </div>
        </div>
        <!-- Card text content below image - padded and text centered -->
        <div class="trans-card-text-container" style="padding: 20px 16px 16px; flex-grow: 1; display:flex; align-items:center; justify-content:center; text-align:center; width:100%; box-sizing:border-box;">
          <h3 class="trans-card-title-dynamic" style="font-size: 18px !important; font-weight: 700 !important; color: #0f172a; margin: 0 auto !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; transition: color 0.3s ease; text-align:center; width:100%; box-sizing:border-box;">
            ${actTitle}
          </h3>
        </div>
      </article>
    `}).join('');
  }
  
  // ─── HOME ACTIVITIES GRID ─── same style as Actividades
  if (homeActivitiesGrid) {
    homeActivitiesGrid.innerHTML = transferActivities.slice(0, 3).map(act => {
      if (!act) return '';
      const actTitle = getI18nText(act.title);
      const actTag = act.tag ? getI18nText(act.tag) : 'Actividad';
      const mediaHTML = act.videoSrc 
        ? '<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="' + getAssetUrl(act.videoSrc) + '" type="video/mp4"></video>'
        : '<img src="' + getAssetUrl(act.image) + '" alt="' + actTitle + '" loading="lazy">';

      return `
      <article class="activity-card act-card-actividades" data-id="${act.id}" data-type="${act.type}" data-cursor-color="blue" style="text-align:center; position:relative;">
        <div class="activity-image-wrapper">
          ${mediaHTML}
          <!-- Hover overlay: tag/date centered, title remains underneath (z-index 4) -->
          <div class="act-hover-overlay act-hover-blue" style="background: rgba(29, 91, 254, 0.96) !important; padding: 24px 16px 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%; z-index: 2;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">${actTag}</span>
          </div>
          <!-- Idle gradient: shadow behind text -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index: 3;"></div>
          <!-- Singleton Title: Always at the bottom, z-index 4, pointer-events none -->
          <div class="act-card-title-container" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 4; text-align: center; pointer-events: none;">
            <h3 style="font-size:18px !important; font-weight:700 !important; color:#fff !important; margin:0 !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${actTitle}</h3>
          </div>
        </div>
      </article>
    `}).join('');
  }
  
  // Bind clicks to route detailed page
  document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) {
        window.location.hash = `#/actividad/${id}`;
      }
    });
  });

  // Notify custom cursor systems to update bindings
  window.dispatchEvent(new Event('content-updated'));
}



var projectResources = [
  {
    id: "rec-guias-codesign",
    type: "guia",
    title: {
      es: "Guía Didáctica de Codiseño Educativo con IA",
      ca: "Guia Didàctica de Codisseny Educatiu amb IA",
      en: "Pedagogical Guide for Educational Co-design with AI"
    },
    description: {
      es: "Una guía metodológica completa para integrar la IA Generativa en el codiseño de experiencias educativas en la educación superior.",
      ca: "Una guia metodològica completa per integrar la IA Generativa en el codisseny d'experiències educatives a l'educació superior.",
      en: "A comprehensive methodological guide to integrate Generative AI in the co-design of educational experiences in higher education."
    },
    tag: { es: "Guías", ca: "Guies", en: "Guides" },
    downloadUrl: "#",
    collaborators: "Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti",
    loremIpsum: {
      es: `<p>Esta guía proporciona orientaciones prácticas para el profesorado universitario y diseñadores instruccionales interesados en aplicar metodologías de codiseño participativo. A través de un enfoque estructurado en cinco fases, se detalla cómo implicar al alumnado en la configuración de sus propios procesos de aprendizaje mediado por Inteligencia Artificial Generativa.</p>
<p>Se abordan cuestiones clave como la definición de objetivos formativos dialógicos, la selección de herramientas de IAG adecuadas y la evaluación formativa del impacto del codiseño en la autonomía y motivación de los estudiantes.</p>
<p><em>Colaboradores: Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti, y Dr. Quispe Lorem.</em></p>`,
      ca: `<p>Aquesta guia proporciona orientacions pràctiques per al professorat universitari i dissenyadors instruccionals interessats a aplicar metodologies de codisseny participatiu. A través d'un enfocament estructurat en cinc fases, es detalla com implicar l'alumnat en la configuració dels seus propis processos d'aprenentatge mediat per Intel·ligència Artificial Generativa.</p>
<p>S'aborden qüestions clau com la definició d'objectius formatius dialògics, la selecció d'eines d'IAG adequades i l'avaluació formativa de l'impacte del codisseny en l'autonomia i motivació dels estudiants.</p>
<p><em>Col·laboradors: Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti, i Dr. Quispe Lorem.</em></p>`,
      en: `<p>This guide provides practical guidelines for university teachers and instructional designers interested in applying participatory co-design methodologies. Through a structured five-phase approach, it details how to involve students in setting up their own learning processes mediated by Generative Artificial Intelligence.</p>
<p>Key issues such as the definition of dialogic training objectives, the selection of appropriate GAI tools, and the formative evaluation of the impact of co-design on students' autonomy and motivation are addressed.</p>
<p><em>Collaborators: Dr. Gemma Tur Ferrer, Dr. Barbara Luisa De Benito Crosetti, and Dr. Quispe Lorem.</em></p>`
    }
  },
  {
    id: "rec-protocolo-ia",
    type: "protocolo",
    title: {
      es: "Protocolo Ético de Uso de IA Generativa en el Aula",
      ca: "Protocol Ètic d'Ús de IA Generativa a l'Aula",
      en: "Ethical Protocol for Generative AI Use in the Classroom"
    },
    description: {
      es: "Marco de directrices y buenas prácticas para asegurar un uso ético, inclusivo y transparente de los modelos de IA por parte de estudiantes y docentes.",
      ca: "Marc de directrius i bones pràctiques per assegurar un ús ètic, inclusiu i transparent dels models de IA per part d'estudiants i docents.",
      en: "Framework of guidelines and best practices to ensure ethical, inclusive, and transparent use of AI models by students and faculty."
    },
    tag: { es: "Protocolos", ca: "Protocols", en: "Protocols" },
    downloadUrl: "#",
    collaborators: "Dra. Antònia Darder Mesquida, Dr. Lea Katharina Reis",
    loremIpsum: {
      es: `<p>Este protocolo establece el marco de referencia ético y operativo para el uso de la Inteligencia Artificial Generativa en contextos educativos. Se enfoca en mitigar riesgos asociados al sesgo de datos, la falta de transparencia algorítmica y el uso no autorizado de contenidos protegidos.</p>
<p>Incluye rúbricas de autoevaluación para que los estudiantes puedan verificar si su interacción con los asistentes de IA respeta los principios de integridad académica y corresponsabilidad en el aprendizaje.</p>
<p><em>Colaboradores: Dra. Antònia Darder Mesquida, Dr. Lea Katharina Reis, y Dra. Amet Sit.</em></p>`,
      ca: `<p>Aquest protocol establebeix el marc de referència ètic i operatiu per a l'ús de la Intel·ligència Artificial Generativa en contextos educatius. S'enfoca a mitigar riscos associats al biaix de dades, la manca de transparència algorísmica i l'ús no autoritzat de continguts protegits.</p>
<p>Inclou rúbriques d'autoavaluació perquè els estudiants puguin verificar si la seva interacció amb els assistents d'IA respecta els principis d'integritat acadèmica i corresponsabilitat en l'aprenentatge.</p>
<p><em>Col·laboradors: Dra. Antònia Darder Mesquida, Dr. Lea Katharina Reis, i Dra. Amet Sit.</em></p>`,
      en: `<p>This protocol establishes the ethical and operational reference framework for the use of Generative Artificial Intelligence in educational contexts. It focuses on mitigating risks associated with data bias, lack of algorithmic transparency, and unauthorized use of protected content.</p>
<p>It includes self-assessment rubrics for students to verify if their interaction with AI assistants respects the principles of academic integrity and co-responsibility in learning.</p>
<p><em>Collaborators: Dr. Antonia Darder Mesquida, Dr. Lea Katharina Reis, and Dr. Amet Sit.</em></p>`
    }
  },
  {
    id: "rec-agente-uib",
    type: "agente",
    title: {
      es: "Agentes Conversacionales de Apoyo al Aprendizaje de Lenguas",
      ca: "Agents Conversacionals de Suport a l'Aprenentatge de Llengües",
      en: "Conversational Agents Supporting Language Learning"
    },
    description: {
      es: "Prototipos de bots conversacionales diseñados para facilitar la práctica interactiva de lenguas extranjeras en entornos virtuales de telecolaboración.",
      ca: "Prototips de bots conversacionals dissenyats per facilitar la pràctica interactiva de llengües estrangeres en entorns virtuals de telecol·laboració.",
      en: "Conversational bot prototypes designed to facilitate interactive practice of foreign languages in virtual telecollaboration environments."
    },
    tag: { es: "Agentes", ca: "Agents", en: "Agents" },
    downloadUrl: "#",
    collaborators: "Dra. Gemma Tur Ferrer, Dr. Quispe Lorem",
    loremIpsum: {
      es: `<p>Este recurso documenta el desarrollo y validación de agentes conversacionales personalizados (chatbots) integrados en plataformas LMS. Aquestos agentes actúan como mediadores lingüísticos en actividades interlingüísticas, proporcionando retroalimentación inmediata sobre aspectos sintácticos y léxicos.</p>
<p>Se analizan las métricas de engagement del alumnado y cómo la personalización del tono del bot influye en la reducción de la ansiedad comunicativa en una segunda lengua.</p>
<p><em>Colaboradores: Dra. Gemma Tur Ferrer, Dr. Quispe Lorem, y Dr. Dolor Consectetur.</em></p>`,
      ca: `<p>Aquest recurs documenta el desenvolupament i validació d'agents conversacionals personalitzats (chatbots) integrats en plataformes LMS. Aquests agents actuen com a mediadors lingüístics en activitats interlingüístiques, proporcionant reflexió i retroacció immediata sobre aspectes sintàctics i lèxics.</p>
<p>S'analitzen les mètriques d'engagement de l'alumnat i com la personalització del to del bot influeix en la reducció de l'ansietat comunicativa en una segona llengua.</p>
<p><em>Col·laboradors: Dra. Gemma Tur Ferrer, Dr. Quispe Lorem, i Dr. Dolor Consectetur.</em></p>`,
      en: `<p>This resource documents the development and validation of customized conversational agents (chatbots) integrated in LMS platforms. These agents act as linguistic mediators in interlingual activities, providing immediate feedback on syntactic and lexical aspects.</p>
<p>We analyze student engagement metrics and how customizing the bot's tone influences communication anxiety reduction in a second language.</p>
<p><em>Collaborators: Dr. Gemma Tur Ferrer, Dr. Quispe Lorem, and Dr. Dolor Consectetur.</em></p>`
    }
  },
  {
    id: "rec-informe-2025",
    type: "informe",
    title: {
      es: "Informe Anual de Resultados COPLITELE-IA (2025)",
      ca: "Informe Anual de Resultats COPLITELE-IA (2025)",
      en: "Annual Results Report COPLITELE-IA (2025)"
    },
    description: {
      es: "Documento oficial del proyecto que recopila el análisis de datos recopilados en las fases de codiseño durante el año académico 2024-2025.",
      ca: "Document oficial del projecte que recull l'anàlisi de dades recopilades en les fases de codisseny durant l'any acadèmic 2024-2025.",
      en: "Official project document compiling the analysis of data gathered during the co-design phases in the 2024-2025 academic year."
    },
    tag: { es: "Informes", ca: "Informes", en: "Reports" },
    downloadUrl: "#",
    collaborators: "Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti, Dra. Antònia Darder Mesquida",
    loremIpsum: {
      es: `<p>Este informe detalla las actividades científicas y de transferencia desarrolladas en el proyecto durante su primera fase. Se incluye la sistematización de los talleres de codiseño en Ibiza y Palma, y el análisis cualitativo y cuantitativo del impacto en la agencia estudiantil.</p>
<p>Se concluye con una propuesta de recomendaciones de políticas educativas para la integración de la IA en la gobernanza universitaria y el currículo de formación del profesorado.</p>
<p><em>Colaboradores: Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti, Dra. Antònia Darder Mesquida, y Dra. Eget Purus.</em></p>`,
      ca: `<p>Aquest informe detalla les activitats científiques i de transferència desenvolupades en el projecte durant la seva primera fase. S'inclou la sistematització dels tallers de codisseny a Eivissa i Palma, i l'anàlisi qualitativa i quantitativa de l'impacte en l'agència estudiantil.</p>
<p>Es clou amb una proposta de recomanacions de polítiques educatives per a la integració de la IA en la governança universitària i el currículum de formació del professorat.</p>
<p><em>Col·laboradors: Dra. Gemma Tur Ferrer, Dra. Bárbara Luisa De Benito Crosetti, Dra. Antònia Darder Mesquida, i Dra. Eget Purus.</em></p>`,
      en: `<p>This report details the scientific and transfer activities carried out in the project during its first phase. It includes the systematization of the co-design workshops in Ibiza and Palma, and the qualitative and quantitative analysis of the impact on student agency.</p>
<p>It concludes with a set of policy recommendations for the integration of AI in university governance and teacher education curricula.</p>
<p><em>Collaborators: Dr. Gemma Tur Ferrer, Dr. Barbara Luisa De Benito Crosetti, Dr. Antonia Darder Mesquida, and Dr. Eget Purus.</em></p>`
    }
  }
];

function renderResources(filter = 'all') {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;

  const targetRes = (typeof projectResources !== 'undefined' && Array.isArray(projectResources)) ? projectResources : [];
  const filtered = (filter === 'all' 
    ? targetRes 
    : targetRes.filter(r => {
        if (!r) return false;
        const tagEs = String(r.tag?.es || '').toLowerCase();
        const tagCa = String(r.tag?.ca || '').toLowerCase();
        const tagEn = String(r.tag?.en || '').toLowerCase();
        const rType = String(r.type || r.filterType || '').toLowerCase();

        if (filter === 'guias' || filter === 'guia') {
          return rType.includes('guia') || tagEs.includes('guía') || tagEs.includes('guia') || tagCa.includes('guia') || tagEn.includes('guide');
        }
        if (filter === 'informes' || filter === 'informe') {
          return rType.includes('informe') || tagEs.includes('informe') || tagCa.includes('informe') || tagEn.includes('report');
        }
        if (filter === 'protocolos' || filter === 'protocolo') {
          return rType.includes('protocol') || tagEs.includes('protocolo') || tagCa.includes('protocol') || tagEn.includes('protocol');
        }
        if (filter === 'agentes' || filter === 'agente') {
          return rType.includes('agent') || tagEs.includes('agente') || tagCa.includes('agent') || tagEn.includes('agent');
        }
        return r.type === filter || r.filterType === filter;
      }));

  grid.innerHTML = filtered.map(res => {
    if (!res) return '';
    const tagText = res.tag ? getI18nText(res.tag) : (res.filterType || 'Recurso');
    const titleText = getI18nText(res.title);
    
    // Prioritize post content / description over excerpt (which contains member names for Make.com)
    let rawContent = getI18nText(res.loremIpsum) || getI18nText(res.description);
    if (!rawContent || rawContent.trim() === '') {
      rawContent = getI18nText(res.desc);
    }
    const descText = rawContent
      .replace(/<!--\s*\/?wp:[^>]*-->/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();

    return `
    <article class="rec-card rec-card-redesign" data-id="${res.id}" data-cursor-color="green">
      <!-- Top header: category pill + doc icon -->
      <div class="rec-card-top" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:12px;">
        <span class="rec-card-tag-pill" style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; background:rgba(16, 185, 129, 0.1); color:#10b981; padding:4px 10px; border-radius:12px; transition: all 0.3s ease;">
          ${tagText}
        </span>
        <svg viewBox="0 0 24 24" style="width:20px; height:20px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; opacity:0.3; transition: all 0.3s ease; color:#10b981;" class="rec-card-file-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <!-- Body: title + description snippet -->
      <div class="rec-card-body" style="text-align:left; width:100%; flex-grow:1; display:flex; flex-direction:column; justify-content:flex-start; gap:8px;">
        <h3 class="rec-card-title" style="font-size:17px; font-weight:700; color:#0f172a; margin:0; line-height:1.35; transition: color 0.3s ease;">
          ${titleText}
        </h3>
        <p class="rec-card-desc" style="font-size:13.5px; color:#475569; margin:0; line-height:1.45; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; transition: color 0.3s ease;">
          ${descText}
        </p>
      </div>
    </article>
  `}).join('');

  // Bind clicks to open modal
  grid.querySelectorAll('.rec-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openRecModal(id);
    });
  });
  
  // Dispatch content updated for cursors
  window.dispatchEvent(new Event('content-updated'));
}

function openRecModal(id) {
  const res = projectResources.find(r => r && r.id === id);
  if (!res) return;

  const modal = document.getElementById('details-modal');
  if (!modal) return;

  modal.classList.add('modal-large', 'modal-rec-popup', 'green-tint-modal');

  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;

  const resTag = res.tag ? getI18nText(res.tag) : 'Recurso';
  const resTitle = getI18nText(res.title);
  const excerptText = getI18nText(res.desc);
  const contentText = getI18nText(res.loremIpsum) || getI18nText(res.description);
  const rawBody = contentText || '';

  // Extract link from <a href="..."> or <a href=...> (quoted or unquoted) inside post content or excerpt
  const fullTextToScan = (res.colaboradores || res.collaborators || res.authors || '') + ' ' + excerptText + ' ' + rawBody + ' ' + resTitle;
  let extractedUrl = null;
  const hrefMatch = fullTextToScan.match(/<a\s+(?:[^>]*?\s+)?href=(?:["']([^"']+)["']|([^\s>]+))/i);
  if (hrefMatch) {
    const matchedUrl = hrefMatch[1] || hrefMatch[2];
    if (matchedUrl && matchedUrl !== '#') {
      extractedUrl = matchedUrl;
    }
  }

  const downloadUrl = extractedUrl 
    ? extractedUrl 
    : ((res.downloadUrl && res.downloadUrl !== '#') 
      ? res.downloadUrl 
      : (res.attachment_url ? res.attachment_url : (res.slug ? `/recursos/${res.slug}` : (res.wp_id ? `/?p=${res.wp_id}` : '#'))));

  let resBody = processShortcodesAndBlocks(rawBody);
  // Remove empty or raw unclosed <a> tags from body to prevent empty blue pills/circles rendering in description
  resBody = resBody.replace(/<a\s+(?:[^>]*?\s+)?href=(?:["'][^"']+["']|[^\s>]+)[^>]*>\s*<\/a>/gi, '');
  resBody = resBody.replace(/<a\s+(?:[^>]*?\s+)?href=(?:["'][^"']+["']|[^\s>]+)[^>]*>(.*?)<\/a>/gi, (match, text) => {
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    if (!cleanText) return '';
    return `<a href="${downloadUrl}" target="_blank" download style="color: #10b981 !important; font-weight: 700; text-decoration: underline;">${cleanText}</a>`;
  });
  // Strip any leftover unclosed raw <a href=...> tags that have no inner text
  resBody = resBody.replace(/<a\s+[^>]*>/gi, '');

  const authorStr = res.colaboradores || res.collaborators || res.authors || '';
  const collabHTML = getMatchedCollaboratorsHTML(fullTextToScan, res.collabTitle, res.extraCollabs, authorStr, 'recurso');
  const collabWithHTML = (typeof getCollaborationWithHTML === 'function')
    ? getCollaborationWithHTML(res.collaborationWith || res.colaboracionCon, res.collabWithTitle)
    : '';

  // Detect poster / featured image
  const posterUrl = (res.poster && !res.poster.includes('default.png') && !res.poster.includes('images/1.png'))
    ? res.poster
    : ((res.image && !res.image.includes('default.png') && !res.image.includes('images/1.png')) 
      ? res.image 
      : ((res.featured_image && !res.featured_image.includes('default.png')) ? res.featured_image : ''));

  let posterHTML = '';
  if (posterUrl) {
    const assetUrl = getAssetUrl(posterUrl);
    posterHTML = `
      <div class="rec-modal-poster-card" style="margin: 24px 0 28px; border-radius: 14px; overflow: hidden; background: transparent; text-align: center;">
        <img src="${assetUrl}" alt="${resTitle}" class="lightbox-img" style="max-height: 380px; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; cursor: zoom-in; border-radius: 12px; box-shadow: 0 4px 18px rgba(0,0,0,0.08);" onclick="openImageLightbox('${assetUrl}', '${resTitle.replace(/'/g, "\\'")}')">
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-meta-label" style="color: var(--color-green) !important; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 800;">${resTag}</span>
        <h3 style="color: var(--color-green) !important; margin-top: 4px;">${currentLang === 'en' ? 'Project Resource Details' : (currentLang === 'ca' ? 'Detall del Recurs del Projecte' : 'Detalle del Recurso del Proyecto')}</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body" style="padding: 4px 8px 36px;">
      <h4 style="font-size: 22px; line-height: 1.35; margin-bottom: 24px; font-weight: 800; color: var(--color-green) !important;">${resTitle}</h4>
      <div class="activity-detail-lorem" style="font-size: 16px; line-height: 1.85; text-align: justify; margin-bottom: 28px;">
        ${resBody}
      </div>
      ${posterHTML}
      <div style="margin-top: 24px; display: flex; gap: 16px; flex-wrap: wrap;">
        <a href="${downloadUrl}" target="_blank" download class="btn-primary" style="background: var(--color-green) !important; border-color: var(--color-green) !important; padding: 12px 26px; font-size: 14px;">
          <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.5; margin-right: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          ${currentLang === 'en' ? 'Download Resource' : (currentLang === 'ca' ? 'Descarregar Recurs' : 'Descargar Recurso')}
        </a>
      </div>
      ${collabWithHTML}
      ${collabHTML}
    </div>
  `;

  modal.showModal();
  setupModalClose(modal);

  const handleClose = () => {
    modal.classList.remove('modal-large', 'modal-rec-popup', 'green-tint-modal');
    modal.removeEventListener('close', handleClose);
  };
  modal.addEventListener('close', handleClose);
}

function processShortcodesAndBlocks(text) {
  if (!text) return '';
  let str = String(text);

  // Clean Gutenberg block wrapper comments <!-- wp:shortcode --> and <!-- /wp:shortcode -->
  str = str.replace(/<!--\s*\/?wp:[^>]*-->/gi, '');

  // Strip empty gallery shortcodes
  str = str.replace(/\[gallery[^\]]*ids=["']\s*["'][^\]]*\]/gi, '');
  str = str.replace(/\[gallery[^\]]*ids=\s*\]/gi, '');

  // Fallback client-side gallery shortcode parser if raw [gallery ids="..."] reaches JS
  str = str.replace(/\[gallery[^\]]*ids=["']([^"']+)["'][^\]]*\]/gi, (match, idsStr) => {
    const ids = idsStr.split(',').map(id => id.trim()).filter(Boolean);
    if (ids.length === 0) return '';
    return `
      <div class="custom-wp-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0;">
        ${ids.map(id => `
          <div class="gallery-item-card" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
            <img src="/wp-content/uploads/${id}.jpg" onError="this.style.display='none'" alt="Galeria ${id}" style="width: 100%; height: 260px; object-fit: cover; display: block;">
          </div>
        `).join('')}
      </div>
    `;
  });

  // Strip remaining standalone [gallery] shortcodes with no ids
  str = str.replace(/\[gallery[^\]]*\]/gi, '');

  return str;
}

function enhancePostVideos(container) {
  if (!container) return;
  const videos = container.querySelectorAll('video');
  videos.forEach(video => {
    const handleVideoMeta = () => {
      if (video.videoHeight && video.videoWidth) {
        if (video.videoHeight > video.videoWidth) {
          video.classList.add('is-portrait-video');
          const wrapper = video.closest('.wp-inline-video, .wp-block-video, .activity-video-wrapper, figure, div');
          if (wrapper && !wrapper.classList.contains('detail-inner-panel') && !wrapper.classList.contains('section-inner-panel') && !wrapper.classList.contains('view-actividad-detalle')) {
            wrapper.classList.add('is-portrait-video');
          }
        }
      }
    };

    if (video.readyState >= 1) {
      handleVideoMeta();
    } else {
      video.addEventListener('loadedmetadata', handleVideoMeta, { once: true });
    }
  });
}

function renderActivityDetail(id) {
  let allActivities = [];
  if (typeof transferActivities !== 'undefined' && Array.isArray(transferActivities)) {
    allActivities.push(...transferActivities);
  }
  if (typeof publications !== 'undefined' && Array.isArray(publications)) {
    allActivities.push(...publications);
  }
  if (typeof projectResources !== 'undefined' && Array.isArray(projectResources)) {
    allActivities.push(...projectResources);
  }
  if (window.CopliteleWPData) {
    if (Array.isArray(window.CopliteleWPData.actividades)) allActivities.push(...window.CopliteleWPData.actividades);
    if (Array.isArray(window.CopliteleWPData.transferencia)) allActivities.push(...window.CopliteleWPData.transferencia);
    if (Array.isArray(window.CopliteleWPData.publicaciones)) allActivities.push(...window.CopliteleWPData.publicaciones);
    if (Array.isArray(window.CopliteleWPData.recursos)) allActivities.push(...window.CopliteleWPData.recursos);
  }
  const cleanId = decodeURIComponent(String(id || '')).toLowerCase().replace(/\/+$/, '').trim();
  const cleanSlug = cleanId.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const activity = allActivities.find(a => {
    if (!a) return false;
    const aId = String(a.id || '').toLowerCase().trim();
    const aWpId = String(a.wp_id || '').toLowerCase().trim();
    const aSlug = String(a.slug || '').toLowerCase().trim();
    const aTitleEs = getI18nText(a.title) ? getI18nText(a.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : '';
    const aNameEs = getI18nText(a.name) ? getI18nText(a.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : '';

    return (
      (aId && aId === cleanId) ||
      (aWpId && aWpId === cleanId) ||
      (aSlug && aSlug === cleanId) ||
      (aId && aId.replace(/^wp-post-/, '') === cleanId) ||
      (aTitleEs && aTitleEs === cleanSlug) ||
      (aNameEs && aNameEs === cleanSlug)
    );
  }) || allActivities.find(a => {
    if (!a) return false;
    const aTitle = (getI18nText(a.title) || getI18nText(a.name) || '').toLowerCase();
    return cleanId.length >= 4 && aTitle.includes(cleanId);
  });
  const detailContainer = document.getElementById('view-actividad-detalle');
  if (!detailContainer) return;
  
  if (!activity) {
    detailContainer.innerHTML = `
      <div class="section-container" style="max-width: 960px; padding: 60px 20px; text-align: center;">
        <h2 style="font-size: 24px; margin-bottom: 20px; font-weight: 700;">${currentLang === 'en' ? 'Activity not found' : (currentLang === 'ca' ? 'Activitat no trobada' : 'Actividad no encontrada')}</h2>
        <a href="#/impacto" class="btn-primary">&larr; ${currentLang === 'en' ? 'Back to Impact & Communication' : (currentLang === 'ca' ? 'Tornar a Impacte i Difusió' : 'Volver a Impacto y Difusión')}</a>
      </div>
    `;
    return;
  }

  // Enforce scroll to top immediately on post selection
  window.scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);

  const actTitle = getI18nText(activity.title) || getI18nText(activity.name) || '';
  const actTag = activity.tag ? getI18nText(activity.tag) : 'Actividad';

  // Featured media: full-width borderless image (doubled size)
  const featuredMedia = `<img src="${getAssetUrl(activity.image)}" alt="${actTitle}" style="width:100%; height:540px; object-fit:cover; border-radius:0; border:none; outline:none; display:block;">`;

  const isTransferencia = activity.section === 'transferencia';
  const buttonClass = isTransferencia ? 'btn-outline-turquoise' : 'btn-outline-blue';
  const backAnchor = isTransferencia ? '#/impacto#transferencia' : '#/impacto#actividades';
  const typeColor = isTransferencia ? '#14b8a6' : '#1d5bfe';

  const actBodyObj = activity.loremIpsum || activity.desc || activity.description || '';
  const rawBodyText = getI18nText(actBodyObj) || '';
  const processedBody = processShortcodesAndBlocks(rawBodyText)
    .replace(/src=["'](\.?\/?images\/[^"']+)["']/g, (match, path) => `src="${getAssetUrl(path)}"`)
    .replace(/<p[^>]*>\s*<strong[^>]*>\s*EQUIPO E INVESTIGADORES PARTICIPANTES\s*<\/strong>\s*<\/p>/gi, '')
    .replace(/<h[1-6][^>]*>\s*EQUIPO E INVESTIGADORES PARTICIPANTES\s*<\/h[1-6]>/gi, '');

  let collabHTML = '';
  let collabWithHTML = '';
  try {
    const rawAuthors = activity.colaboradores || activity.collaborators || activity.authors || '';
    const fullSearchText = rawAuthors + ' ' + rawBodyText + ' ' + getI18nText(activity.desc) + ' ' + actTitle;
    collabHTML = getMatchedCollaboratorsHTML(fullSearchText, activity.collabTitle, activity.extraCollabs, rawAuthors, activity.section || 'actividad');
    collabWithHTML = getCollaborationWithHTML(activity.collaborationWith || activity.colaboracionCon, activity.collabWithTitle);
  } catch(e) {
    console.error('Error generating collaborators:', e);
  }

  detailContainer.innerHTML = `
    <div class="section-container" style="max-width: 960px; padding: 40px 20px;">
      <a href="${backAnchor}" class="${buttonClass}" style="margin-bottom: 30px; display: inline-flex; align-items: center; gap: 8px;">
        &larr; ${currentLang === 'en' ? 'Back' : (currentLang === 'ca' ? 'Tornar' : 'Volver')}
      </a>
      
      <div class="section-inner-panel" style="margin-top: 10px; padding: 0 0 40px; overflow: hidden; border-radius: 20px;">
        <div class="image-showcase" style="height: 540px; max-height: 540px; width: 100%; margin-bottom: 32px; border-radius: 0; border: none; box-shadow: none; overflow: hidden; position: relative;">
          ${featuredMedia}
        </div>
        
        <div class="detail-inner-panel" style="padding: 0 36px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;">
            <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: ${typeColor}; padding: 4px 12px; border-radius: 20px; border: 1.5px solid ${typeColor};">
              ${actTag}
            </span>
            ${activity.date ? `<span style="font-size: 13px; color: var(--color-text-muted-light);">${activity.date}</span>` : ''}
            ${activity.location ? `<span style="font-size: 13px; color: var(--color-text-muted-light);">· ${activity.location}</span>` : ''}
          </div>
          
          <h1 style="font-size: clamp(22px, 4vw, 34px); margin-bottom: 28px; font-family: var(--font-primary); font-weight: 800; line-height: 1.25;">
            ${actTitle}
          </h1>
          
          <div class="activity-detail-lorem" style="font-size: 15.5px; line-height: 1.8; text-align: justify;">
            ${processedBody}
          </div>

          ${(activity.videoSrc && !processedBody.includes(activity.videoSrc)) ? `
            <div class="activity-video-wrapper" style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--color-border-light);">
              <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 16px; color: var(--color-text-light); display: flex; align-items: center; gap: 8px;">
                🎥 ${currentLang === 'en' ? 'Session Video' : (currentLang === 'ca' ? 'Vídeo de la Sessió' : 'Video de la Sesión')}
              </h4>
              <div style="border-radius: 16px; overflow: hidden; background: #000; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
                <video controls playsinline preload="metadata" style="width: 100%; max-height: 480px; display: block;" src="${getAssetUrl(activity.videoSrc)}"></video>
              </div>
            </div>
          ` : ''}

          ${collabWithHTML}
          ${collabHTML}
        </div>
      </div>
    </div>
  `;

  // Init lightbox on post-body-img images
  detailContainer.querySelectorAll('.lightbox-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openImageLightbox(img.src, img.alt));
  });

  // Auto-detect portrait videos and style them with drop-shadows & constrained width
  enhancePostVideos(detailContainer);

  // PDF overlay global
  window.openPdfOverlay = (url) => {
    const overlay = document.createElement('div');
    overlay.className = 'pdf-lightbox-overlay';
    overlay.innerHTML = `
      <div class="pdf-lightbox-inner">
        <div class="pdf-lightbox-header">
          <button class="pdf-lb-close" onclick="this.closest('.pdf-lightbox-overlay').remove()">✕ ${currentLang === 'en' ? 'Close' : 'Cerrar'}</button>
          <a href="${url}" download class="pdf-lb-download">⬇ ${currentLang === 'en' ? 'Download' : 'Descargar'}</a>
        </div>
        <iframe src="${url}#toolbar=1" class="pdf-lightbox-frame"></iframe>
      </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  };
}

function openImageLightbox(src, alt) {
  if (!src) return;
  const existing = document.getElementById('image-lightbox-modal') || document.querySelector('.img-lightbox-overlay');
  if (existing) existing.remove();

  const dialog = document.createElement('dialog');
  dialog.id = 'image-lightbox-modal';
  dialog.className = 'img-lightbox-dialog';
  dialog.innerHTML = `
    <div class="img-lightbox-inner">
      <button class="img-lb-close" aria-label="Cerrar">✕</button>
      <img src="${src}" alt="${alt || ''}">
    </div>
  `;

  const closeLightbox = (e) => {
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    setTimeout(() => {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      }
      dialog.remove();
    }, 220);
  };

  // Clicking ANYWHERE on the lightbox (the overlay, background, close button or image) closes the lightbox smoothly
  dialog.addEventListener('click', (e) => {
    closeLightbox(e);
  });

  // Also support escape key or cancel event
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeLightbox(e);
  });

  document.body.appendChild(dialog);
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
  requestAnimationFrame(() => dialog.classList.add('visible'));
}
window.openImageLightbox = openImageLightbox;




function initSubmenuScrollObserver() {
  const allSectionIds = ['proyecto', 'objetivos', 'equipo', 'actividades', 'transferencia', 'publicaciones', 'recursos'];

  const updateActiveSubmenuLink = () => {
    const activeView = document.querySelector('.spa-view.active');
    if (!activeView) return;

    const visibleLinks = Array.from(activeView.querySelectorAll('.submenu-link')).filter(l => {
      const pLi = l.closest('li');
      return l.style.display !== 'none' && (!pLi || pLi.style.display !== 'none');
    });
    if (!visibleLinks.length) return;

    // Get ONLY visible sections inside the active view
    const visibleSections = allSectionIds
      .map(id => document.getElementById(id))
      .filter(sec => {
        if (!sec) return false;
        if (!activeView.contains(sec)) return false;
        if (sec.style.display === 'none' || sec.offsetParent === null) return false;
        const rect = sec.getBoundingClientRect();
        return rect.height > 0 || rect.width > 0;
      });

    if (!visibleSections.length) return;

    const triggerY = 200;
    let currentSection = visibleSections[0];

    for (let i = 0; i < visibleSections.length; i++) {
      const sec = visibleSections[i];
      const rect = sec.getBoundingClientRect();
      if (rect.top <= triggerY && rect.bottom > 80) {
        currentSection = sec;
      }
    }

    if (window.scrollY < 120) {
      currentSection = visibleSections[0];
    }

    const currentId = currentSection.getAttribute('id');

    visibleLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.endsWith(`#${currentId}`) || href === `#${currentId}`)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Add click handler to submenu links so clicking immediately highlights the clicked item and maintains clean URLs
  document.querySelectorAll('.page-submenu .submenu-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const activeView = document.querySelector('.spa-view.active');
      if (activeView) {
        activeView.querySelectorAll('.submenu-link').forEach(l => l.classList.remove('active'));
      }
      this.classList.add('active');

      const href = this.getAttribute('href') || '';
      if (href.includes('#')) {
        const parts = href.split('#').filter(Boolean);
        const lastAnchor = parts[parts.length - 1];
        if (lastAnchor) {
          const rawHash = window.location.hash || '';
          const isCleanPath = (window.location.pathname.includes('/proyecto') || window.location.pathname.includes('/impacto')) && !rawHash.startsWith('#/');
          if (isCleanPath) {
            e.preventDefault();
            const targetEl = document.getElementById(lastAnchor);
            if (targetEl) {
              const headerOffset = 85;
              const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: elementPosition - headerOffset,
                behavior: 'smooth'
              });
            }
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', '#' + lastAnchor);
            }
          }
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveSubmenuLink, { passive: true });
  window.addEventListener('hashchange', updateActiveSubmenuLink, { passive: true });
  window.addEventListener('popstate', updateActiveSubmenuLink, { passive: true });
  updateActiveSubmenuLink();
}

function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.querySelector('.custom-cursor') || document.createElement('div');
  cursor.className = 'custom-cursor';
  if (!cursor.parentNode) document.body.appendChild(cursor);
  
  const follower = document.querySelector('.custom-cursor-follower') || document.createElement('div');
  follower.className = 'custom-cursor-follower';
  if (!follower.parentNode) document.body.appendChild(follower);

  let posX = -100, posY = -100;
  let mouseX = -100, mouseY = -100;
  let isFirstMove = true;
  
  cursor.style.opacity = '0';
  follower.style.opacity = '0';
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (isFirstMove) {
      posX = mouseX;
      posY = mouseY;
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
      isFirstMove = false;
    }
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });
  
  let animationId = null;
  function animateFollower() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
    animationId = requestAnimationFrame(animateFollower);
  }
  if (!window.customCursorAnimated) {
    animateFollower();
    window.customCursorAnimated = true;
  }
  
  const getCursorIsotypeSVG = (colorClass) => {
    const config = getLogoConfig() || (typeof generateLogoConfig === 'function' ? generateLogoConfig() : null);
    if (!config) return '';
    const textLabel = currentLang === 'en' ? 'View' : (currentLang === 'ca' ? 'Veure' : 'Ver');
    
    const center = 50;
    const outerRadius = 37;
    const strokeWidth = 5;
    const perimDotRadius = strokeWidth * 0.65;
    const perimNotchRadius = perimDotRadius + 2.2;
    
    const localPolarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    const localDescribeArc = (x, y, radius, startAngle, endAngle) => {
      const start = localPolarToCartesian(x, y, radius, startAngle);
      const end = localPolarToCartesian(x, y, radius, endAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
      ].join(" ");
    };

    const randomSuffix = Math.floor(Math.random() * 1000000);
    let masksMarkup = '<defs>';
    let pathsMarkup = '';
    let dotsMarkup = '';
    
    config.arcs.forEach(arc => {
      const dotPos = localPolarToCartesian(center, center, outerRadius, arc.dotPos);
      const maskId = `cursor-mask-${arc.id}-${randomSuffix}`;
      
      masksMarkup += `
        <mask id="${maskId}" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <circle cx="${dotPos.x}" cy="${dotPos.y}" r="${perimNotchRadius}" fill="black" />
        </mask>
      `;

      const d = localDescribeArc(center, center, outerRadius, arc.start, arc.end);
      // White arcs on solid-color background circle
      pathsMarkup += `
        <path d="${d}" fill="none" stroke="#ffffff" stroke-width="${strokeWidth}" stroke-linecap="round" mask="url(#${maskId})"/>
      `;
      
      dotsMarkup += `
        <circle cx="${dotPos.x}" cy="${dotPos.y}" r="${perimDotRadius}" fill="#ffffff" stroke="none"/>
      `;
    });
    masksMarkup += '</defs>';

    return `
      <div class="cursor-isotype-wrapper" style="position: relative; width: 110px; height: 110px; display: flex; align-items: center; justify-content: center;">
        <svg class="spinning-arcs-cursor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
             style="width: 100%; height: 100%; fill: none; overflow: visible; position: absolute; top: 0; left: 0;">
          ${masksMarkup}
          ${pathsMarkup}
          ${dotsMarkup}
        </svg>
        <span style="color: #ffffff; font-family: var(--font-primary); font-size: 14px; 
                     font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; z-index: 2; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          ${textLabel}
        </span>
      </div>
    `;
  };

  // Button hover: 3 generated logo colors (#1D5BFE blue, #14B8A6 turquoise, #10B981 green)
  const getCursorIsotypeSVGNoText = () => {
    const config = getLogoConfig() || (typeof generateLogoConfig === 'function' ? generateLogoConfig() : null);
    if (!config) return '';

    const colorMap = {
      blue: '#1D5BFE',
      teal: '#14B8A6',
      green: '#10B981'
    };

    const center = 50;
    const outerRadius = 37;
    const strokeWidth = 5;
    const perimDotRadius = strokeWidth * 0.65;
    const perimNotchRadius = perimDotRadius + 2.2;
    const localPolarToCartesian = (cx, cy, r, deg) => {
      const rad = (deg - 90) * Math.PI / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };
    const localDescribeArc = (x, y, r, s, e) => {
      const start = localPolarToCartesian(x, y, r, s);
      const end   = localPolarToCartesian(x, y, r, e);
      const flag  = e - s <= 180 ? '0' : '1';
      return `M ${start.x} ${start.y} A ${r} ${r} 0 ${flag} 1 ${end.x} ${end.y}`;
    };
    const rs = Math.floor(Math.random() * 1000000);
    let masks = '<defs>', paths = '', dots = '';
    config.arcs.forEach(arc => {
      const arcColor = colorMap[arc.id] || '#1D5BFE';
      const dp = localPolarToCartesian(center, center, outerRadius, arc.dotPos);
      const mid = `btn-mask-${arc.id}-${rs}`;
      masks += `<mask id="${mid}" maskUnits="userSpaceOnUse"><rect x="0" y="0" width="100" height="100" fill="white"/><circle cx="${dp.x}" cy="${dp.y}" r="${perimNotchRadius}" fill="black"/></mask>`;
      paths += `<path d="${localDescribeArc(center, center, outerRadius, arc.start, arc.end)}" fill="none" stroke="${arcColor}" stroke-width="${strokeWidth}" stroke-linecap="round" mask="url(#${mid})"/>`;
      dots  += `<circle cx="${dp.x}" cy="${dp.y}" r="${perimDotRadius}" fill="${arcColor}"/>`;
    });
    masks += '</defs>';
    return `
      <div style="position:relative; width:60px; height:60px; display:flex; align-items:center; justify-content:center;">
        <svg class="spinning-arcs-cursor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
             style="width:100%; height:100%; fill:none; overflow:visible; position:absolute; top:0; left:0;">
          ${masks}${paths}${dots}
        </svg>
      </div>
    `;
  };

  const handleCardEnter = (e) => {
    const el = e.currentTarget;
    let color = 'blue';
    if (el.classList.contains('impacto-new-diffusion-banner') || el.getAttribute('data-cursor-color') === 'teal-dark') {
      color = 'teal-dark';
    } else if (el.classList.contains('card-transferencia') || el.getAttribute('data-cursor-color') === 'turquoise' || (el.classList.contains('activity-card') && el.closest('#transferencia')) || el.classList.contains('trans-card')) {
      color = 'turquoise';
    } else if (el.classList.contains('card-publicaciones') || el.getAttribute('data-cursor-color') === 'purple') {
      color = 'purple';
    } else if (el.classList.contains('card-recursos') || el.classList.contains('rec-card') || el.getAttribute('data-cursor-color') === 'green') {
      color = 'green';
    } else if (el.classList.contains('card-actividades') || el.getAttribute('data-cursor-color') === 'blue' || (el.classList.contains('activity-card') && el.closest('#actividades'))) {
      color = 'blue';
    }

    // Fallback category span colors
    if (el.classList.contains('activity-card')) {
      const categorySpan = el.querySelector('.activity-category');
      if (categorySpan) {
        if (categorySpan.classList.contains('color-blue') || categorySpan.textContent.includes('Taller') || categorySpan.textContent.includes('Workshop')) {
          color = 'blue';
        } else if (categorySpan.classList.contains('color-teal') || categorySpan.classList.contains('color-turquoise')) {
          color = 'turquoise';
        }
      }
    }

    cursor.setAttribute('data-color', color);
    if (el.classList.contains('section-nav-card') || el.classList.contains('impacto-new-diffusion-banner')) {
      cursor.classList.add('hover-nav-button');
      cursor.textContent = currentLang === 'en' ? 'View' : (currentLang === 'ca' ? 'Veure' : 'Ver');
    } else if (el.classList.contains('team-card')) {
      cursor.classList.add('hover-post');
      cursor.setAttribute('data-color', 'purple');
      cursor.innerHTML = getCursorIsotypeSVG('purple');
    } else {
      cursor.classList.add('hover-post');
      cursor.innerHTML = getCursorIsotypeSVG(color);
    }
    document.body.classList.add('custom-cursor-hover');
  };

  const handleCardLeave = () => {
    cursor.classList.remove('hover-post', 'hover-nav-button');
    cursor.removeAttribute('data-color');
    cursor.innerHTML = '';
    cursor.textContent = '';
    document.body.classList.remove('custom-cursor-hover');
  };

  const handleButtonEnter = () => {
    cursor.classList.add('hover-button');
    document.body.classList.add('custom-cursor-hover');
  };

  const handleButtonLeave = () => {
    cursor.classList.remove('hover-button');
    cursor.innerHTML = '';
    document.body.classList.remove('custom-cursor-hover');
  };
  
  const updateHoverEvents = () => {
    // 1. Post cards, news cards, navigation shortcut cards, and team member cards
    document.querySelectorAll('.section-nav-card, .activity-card, .rec-card, .news-card, .team-card, .impacto-new-diffusion-banner').forEach(el => {
      el.removeEventListener('mouseenter', handleCardEnter);
      el.removeEventListener('mouseleave', handleCardLeave);
      el.addEventListener('mouseenter', handleCardEnter);
      el.addEventListener('mouseleave', handleCardLeave);
    });

    // 2. Regular interactive buttons and links (including modal contact icons, close buttons, and post boxes)
    document.querySelectorAll('a:not(.section-nav-card):not(.activity-card):not(.news-card):not(.impacto-new-diffusion-banner), button:not(.rec-card), [role="button"]:not(.news-card), #hero-logo-container, .logo-wrapper, .custom-lang-btn, .modal-close, .member-contact-link, .member-post-box').forEach(el => {
      el.removeEventListener('mouseenter', handleButtonEnter);
      el.removeEventListener('mouseleave', handleButtonLeave);
      el.addEventListener('mouseenter', handleButtonEnter);
      el.addEventListener('mouseleave', handleButtonLeave);
    });
  };
  
  updateHoverEvents();
  window.addEventListener('content-updated', updateHoverEvents);

  // Monitor details-modal events
  const modal = document.getElementById('details-modal');
  if (modal) {
    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      document.body.classList.remove('custom-cursor-hover');
      cursor.classList.remove('hover-button', 'hover-post');
      cursor.innerHTML = '';
      if (cursor.parentNode !== document.body) document.body.appendChild(cursor);
      if (follower.parentNode !== document.body) document.body.appendChild(follower);
    });
    const origShowModal = modal.showModal;
    modal.showModal = function() {
      document.body.classList.add('modal-open');
      document.body.classList.remove('custom-cursor-hover');
      cursor.classList.remove('hover-button', 'hover-post');
      cursor.innerHTML = '';
      return origShowModal.apply(this, arguments);
    };
  }
}

function initScrollReveal() {
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  
  window.addEventListener('scroll', () => {
    scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
  }, { passive: true });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Set directional entry animations
        if (scrollDirection === 'down') {
          entry.target.classList.remove('reveal-out-up', 'reveal-out-down', 'reveal-from-top');
          entry.target.classList.add('reveal-visible', 'reveal-from-bottom');
        } else {
          entry.target.classList.remove('reveal-out-up', 'reveal-out-down', 'reveal-from-bottom');
          entry.target.classList.add('reveal-visible', 'reveal-from-top');
        }
      } else {
        // Set directional exit animations
        entry.target.classList.remove('reveal-visible');
        if (scrollDirection === 'down') {
          entry.target.classList.add('reveal-out-up');
        } else {
          entry.target.classList.add('reveal-out-down');
        }
      }
    });
  }, {
    root: null,
    threshold: 0.02,
    rootMargin: '0px 0px -20px 0px'
  });
  
  const setupReveals = () => {
    // Target typography elements to keep scroll animation smooth
    document.querySelectorAll('h1, h2, h3, h4, p, .hero-stats-row, .section-nav-grid').forEach(el => {
      if (el.closest('header') || el.closest('#details-modal') || el.closest('.project-phases-row') || el.closest('.custom-cursor') || el.closest('.custom-cursor-follower') || el.closest('.custom-lang-dropdown')) return;
      
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  };
  
  setupReveals();
  window.addEventListener('content-updated', setupReveals);
}

function initLordIconHovers() {
  const updateIcons = () => {
    document.querySelectorAll('.section-nav-card').forEach(card => {
      const icon = card.querySelector('lord-icon');
      if (!icon) return;
      
      let hoverPrimary = '#1D5BFE';
      let hoverSecondary = '#7ce4e0';
      
      if (card.classList.contains('card-transferencia')) {
        hoverPrimary = '#0f766e'; // teal dark
        hoverSecondary = '#14b8a6'; // teal light
      } else if (card.classList.contains('card-publicaciones')) {
        hoverPrimary = '#6d28d9'; // purple dark
        hoverSecondary = '#8b5cf6'; // purple light
      } else if (card.classList.contains('card-recursos')) {
        hoverPrimary = '#0369a1'; // blue dark
        hoverSecondary = '#0ea5e9'; // blue light
      }

      // Initial state
      icon.setAttribute('colors', 'primary:#ffffff,secondary:#ffffff');

      // Add listeners only once
      if (!card.dataset.lordIconListener) {
        card.addEventListener('mouseenter', () => {
          icon.setAttribute('colors', `primary:${hoverPrimary},secondary:${hoverSecondary}`);
        });
        card.addEventListener('mouseleave', () => {
          icon.setAttribute('colors', 'primary:#ffffff,secondary:#ffffff');
        });
        card.dataset.lordIconListener = 'true';
      }
    });
  };
  
  updateIcons();
  window.addEventListener('content-updated', updateIcons);
}

function updateBackgroundLines(route) {
  let svgBg = document.querySelector('.animated-arcs-bg');
  if (!svgBg) {
    svgBg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgBg.classList.add("animated-arcs-bg");
    svgBg.setAttribute("viewBox", "0 0 1400 900");
    svgBg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svgBg.setAttribute("aria-hidden", "true");
    document.body.insertBefore(svgBg, document.body.firstChild);
  }
  
  svgBg.innerHTML = '';
  
  let cx = 700;
  let cy = 350;

  let circlesHTML = '';

  if (route === 'inicio') {
    circlesHTML = `
      <!-- PAIR 1: inner ring -->
      <circle class="arc arc-p arc-1"  cx="${cx}" cy="${cy}" r="160" />
      <circle class="arc arc-s arc-1b" cx="${cx}" cy="${cy}" r="178" />
      <!-- TRIO 1: mid-inner -->
      <circle class="arc arc-p arc-2"  cx="${cx}" cy="${cy}" r="300" />
      <circle class="arc arc-s arc-2b" cx="${cx}" cy="${cy}" r="320" />
      <circle class="arc arc-s arc-2c" cx="${cx}" cy="${cy}" r="340" />
      <!-- PAIR 2: mid -->
      <circle class="arc arc-p arc-3"  cx="${cx}" cy="${cy}" r="490" />
      <circle class="arc arc-s arc-3b" cx="${cx}" cy="${cy}" r="510" />
      <!-- TRIO 2: outer-mid -->
      <circle class="arc arc-p arc-4"  cx="${cx}" cy="${cy}" r="680" />
      <circle class="arc arc-s arc-4b" cx="${cx}" cy="${cy}" r="700" />
      <circle class="arc arc-s arc-4c" cx="${cx}" cy="${cy}" r="720" />
      <!-- PAIR 3: outermost -->
      <circle class="arc arc-p arc-5"  cx="${cx}" cy="${cy}" r="940" />
      <circle class="arc arc-s arc-5b" cx="${cx}" cy="${cy}" r="960" />
    `;
  } else if (route === 'proyecto') {
    cx = 1200; cy = 200;
    circlesHTML = `
      <circle class="arc arc-p arc-1" cx="${cx}" cy="${cy}" r="200" />
      <circle class="arc arc-s arc-1b" cx="${cx}" cy="${cy}" r="220" />
      <circle class="arc arc-color-blue arc-2" cx="${cx}" cy="${cy}" r="450" />
      <circle class="arc arc-s arc-2b" cx="${cx}" cy="${cy}" r="480" />
      <circle class="arc arc-p arc-3" cx="${cx}" cy="${cy}" r="750" />
      <circle class="arc arc-color-teal arc-3b" cx="${cx}" cy="${cy}" r="780" />
    `;
  } else if (route === 'impacto') {
    cx = 200; cy = 300;
    circlesHTML = `
      <circle class="arc arc-color-teal arc-1" cx="${cx}" cy="${cy}" r="100" />
      <circle class="arc arc-s arc-1b" cx="${cx}" cy="${cy}" r="120" />
      <circle class="arc arc-p arc-2" cx="${cx}" cy="${cy}" r="350" />
      <circle class="arc arc-s arc-2b" cx="${cx}" cy="${cy}" r="380" />
      <circle class="arc arc-s arc-2c" cx="${cx}" cy="${cy}" r="410" />
      <circle class="arc arc-color-blue arc-3" cx="${cx}" cy="${cy}" r="650" />
      <circle class="arc arc-p arc-3b" cx="${cx}" cy="${cy}" r="680" />
    `;
  } else {
    circlesHTML = `
      <circle class="arc arc-p arc-1" cx="700" cy="450" r="300" />
      <circle class="arc arc-s arc-1b" cx="700" cy="450" r="320" />
    `;
  }

  svgBg.innerHTML = circlesHTML;
}
