// Browser & WordPress Compatible Initialization
const getI18nText = (val) => {
  if (!val) return '';
  if (typeof val === 'object') {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
    return val[lang] || val.es || val.ca || val.en || Object.values(val)[0] || '';
  }
  return String(val);
};

window.handleImgLoad = function(img) {
  if (!img) return;
  img.classList.add('is-loaded');
  const wrapper = img.closest('.img-loader-wrapper');
  if (wrapper) wrapper.classList.add('is-loaded');
};

const getAssetUrl = (path) => {
  if (!path) return '';
  let strPath = String(path).trim();
  if (strPath.startsWith('http://') || strPath.startsWith('https://') || strPath.startsWith('data:')) return strPath;
  if (strPath.startsWith('./')) strPath = strPath.substring(2);
  if (strPath.startsWith('/')) strPath = strPath.substring(1);
  if (typeof window !== 'undefined' && window.CopliteleData && window.CopliteleData.assetsUrl) {
    return window.CopliteleData.assetsUrl + (strPath.startsWith('assets/') ? strPath.slice(7) : strPath);
  }
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';
  return base + strPath;
};

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

let currentLang = 'es'; // 'es', 'ca', 'en'

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
      es: "Doctora en Filosofía y Ciencias de la Educación. Profesora titular en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Codirectora del Grupo de Tecnología Educativa (GTE). Su investigación se centra en el codiseño educativo, entornos virtuales y la innovación docente.",
      ca: "Doctora en Filosofia i Ciències de l'Educació. Professora titular al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Codirectora del Grup de Tecnologia Educativa (GTE). La seva recerca se centra en el codisseny educatiu, entorns virtuals i la innovació docent.",
      en: "PhD in Philosophy and Educational Sciences. Associate Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Co-director of the Educational Technology Group (GTE). Her research focuses on educational co-design, virtual environments, and teaching innovation."
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
      es: "Doctora en Tecnología Educativa y profesora en el Departamento de Pedagogía Aplicada y Psicología de la Educación de la UIB. Miembro activo del Grupo de Tecnología Educativa (GTE). Especializada en el diseño de recursos virtuales, integración de TIC y metodologías activas.",
      ca: "Doctora en Tecnologia Educativa i professora al Departament de Pedagogia Aplicada i Psicologia de l'Educació de la UIB. Membre actiu del Grup de Tecnologia Educativa (GTE). Especialitzada en el disseny de recursos virtuals, integració de TIC i metodologies actives.",
      en: "PhD in Educational Technology and Professor in the Department of Applied Pedagogy and Educational Psychology at UIB. Active member of the Educational Technology Group (GTE). Specialized in the design of virtual resources, ICT integration, and active methodologies."
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
      es: "Catedrático del Área de Didáctica y Organización Escolar de la UIB. Fundador del Grupo de Tecnología Educativa (GTE). Amplia trayectoria en el diseño de entornos virtuales de aprendizaje, formación del profesorado en TIC y educación flexible y a distancia.",
      ca: "Catedràtic de l'Àrea de Didàctica i Organització Escolar de la UIB. Fundador del Grup de Tecnologia Educativa (GTE). Àmplia trajectòria en el disseny d'entorns virtuals d'aprenentatge, formació del professorat en TIC i educació flexible i a distància.",
      en: "Full Professor in Didactics and School Organization at UIB. Founder of the Educational Technology Group (GTE). Extensive career in designing virtual learning environments, teacher training in ICT, and flexible and distance education."
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

const newsFeedItems = [
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
    id: "formacion-prueba",
    section: "actividades",
    filterType: "formacion",
    type: "formacion",
    tag: { es: "Formación", ca: "Formació", en: "Training" },
    title: {
      es: "Formación Prueba",
      ca: "Formación Prueba",
      en: "Formación Prueba"
    },
    desc: {
      es: "Negre, Xisca Urbina, Santos Castañeda, Linda",
      ca: "Negre, Xisca Urbina, Santos Castañeda, Linda",
      en: "Negre, Xisca Urbina, Santos Castañeda, Linda"
    },
    pills: ["Formación"],
    date: "22 de July de 2026",
    location: "UIB, Palma, Spain",
    image: "./images/3.png",
    loremIpsum: {
      es: "<p>Descripción Prueba</p>",
      ca: "<p>Descripción Prueba</p>",
      en: "<p>Descripción Prueba</p>"
    }
  },
  {
    id: "taller-sobre-codiseno-de-juegos",
    section: "transferencia",
    filterType: "taller",
    type: "taller",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    title: {
      es: "Taller sobre codiseño de juegos",
      ca: "Taller sobre codiseño de juegos",
      en: "Workshop on game co-design"
    },
    desc: {
      es: "De Benito, Bàrbara Tur, Gemma Tatiana Velarde",
      ca: "De Benito, Bàrbara Tur, Gemma Tatiana Velarde",
      en: "De Benito, Bàrbara Tur, Gemma Tatiana Velarde"
    },
    pills: ["Taller"],
    date: "23 de April de 2026",
    location: "UIB, Palma, Spain",
    image: "./images/4.png",
    loremIpsum: {
      es: "<p>Taller en el marco del proyecto europeo Lecture dirigido a los docentes</p>",
      ca: "<p>Taller en el marco del proyecto europeo Lecture dirigido a los docentes</p>",
      en: "<p>Workshop within the framework of the European Lecture project aimed at teachers</p>"
    }
  },
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
    obj_title: "Objetivos del Proyecto",
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
    trans_pretitle: "Impacto y difusión",
    trans_title: "Actividades de Transferencia",
    trans_subtitle: "",
    trans_btn_more: "Ver todas las actividades",
    pub_pretitle: "Biblioteca Científica",
    pub_title: "Producción Científica",
    pub_subtitle: "",
    search_placeholder: "Buscar por título, autor o tag...",
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
    footer_copy: "&copy; 2026 COPLITELE-IA. Proyecto financiado por el Ministerio español de Ciencia e Innovación, desarrollado por el GTE de la UIB y el IRIE."
  },
  ca: {
    menu_inicio: "Inici",
    menu_proyecto: "Projecte",
    menu_impacto: "Impacte i Difusió",
    menu_actividades: "Activitats",
    hero_tag: "Projecte d’Investigació actiu",
    hero_main_title: "Redissenyam el futur de l'educació amb <span class=\"blue-highlight\">Codisseny</span> i <span class=\"green-highlight\">Intel·ligència Artificial</span>",
    hero_desc: "COPLITELE-IA és un projecte d'investigació que transforma l'educació superior integrant la Intel·ligència Artificial Generativa (IAG) des d'un enfocament pedagògic innovador. A través del codissenyi educatiu entre docents i estudiants, impulsem la personalització de l'aprenentatge mitjançant itineraris flexibles, promovent entorns virtuals connectats que garanteixen l'equitat, la inclusió i la qualitat educativa.",
    btn_conocer: "Conèix el Projecte",
    btn_publicaciones: "Publicacions",
    news_title: "Últimes notícies",
    news_pretitle: "Actualitat",
    stats_years: "Anys d’investigació",
    stats_investigadores: "Investigadors",
    stats_publicaciones: "Publicacions",
    stats_actividades: "Activitats",
    stats_experiencias: "Experiències",
    progress_label: "Progrés del Projecte",
    submenu_desc: "Descripció",
    submenu_obj: "Objectius",
    submenu_miembros: "Equip",
    submenu_noticias: "Últimes notícies",
    submenu_transferencia: "Transferència",
    submenu_publicaciones: "Producció científica",
    submenu_recursos: "Recursos",
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
    footer_copy: "&copy; 2026 COPLITELE-IA. Projecte finançat pel Ministeri espanyol de Ciència i Innovació, desenvolupat pel GTE de la UIB i l'IRIE."
  },
  en: {
    menu_inicio: "Home",
    menu_proyecto: "Project",
    menu_impacto: "Impact & Communication",
    menu_actividades: "Activities",
    hero_tag: "Active Investigation Project",
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
    footer_copy: "&copy; 2026 COPLITELE-IA. Project funded by the Spanish Ministry of Science and Innovation, developed by the UIB GTE and IRIE."
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

function updateHeroSubtitle(color) {
  const tagline = document.querySelector('.hero-intro-tagline');
  if (!tagline) return;
  
  tagline.classList.add('fade-out');
  
  setTimeout(() => {
    if (color === 'blue') {
      tagline.innerHTML = `<span class="word-highlight blue">Codiseño</span><span class="word-rest"> de aprendizaje flexible</span>`;
    } else if (color === 'teal') {
      tagline.innerHTML = `<span class="word-rest">Itinerarios </span><span class="word-highlight teal">personalizados</span><span class="word-rest"> y agénticos</span>`;
    } else if (color === 'green') {
      tagline.innerHTML = `<span class="word-rest">Ambientes enriquecidos con </span><span class="word-highlight green">Tecnología</span>`;
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
    const tagline = document.querySelector('.hero-intro-tagline');
    if (tagline) {
      tagline.classList.add('fade-out');
      setTimeout(() => {
        tagline.innerHTML = `<span class="word-highlight blue">Codiseño</span>, <span class="word-highlight teal">Personalización</span> y <span class="word-highlight green">Tecnología</span>`;
        tagline.classList.remove('fade-out');
      }, 200);
    }
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

// ----------------------------------------------------
// 3. UI RENDERING & TRANSLATION FUNCTIONS
// ----------------------------------------------------

function translatePage(lang) {
  currentLang = lang;
  
  // Translate menus
  const menuLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
  const idsMap = [
    { key: 'menu_inicio', hash: '#/inicio' },
    { key: 'menu_proyecto', hash: '#/proyecto' },
    { key: 'menu_impacto', hash: '#/impacto' }
  ];
  
  menuLinks.forEach(link => {
    const hash = link.getAttribute('href');
    const mapping = idsMap.find(m => m.hash === hash);
    if (mapping) {
      link.textContent = translations[lang][mapping.key];
    }
  });
  
  // Translate static text elements using data-i18n attributes
  const i18nElements = document.querySelectorAll('[data-i18n]');
  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // Allow HTML tags for strong and highlights
      el.innerHTML = translations[lang][key];
    }
  });
  
  // Translate input placeholders
  const searchInputs = document.querySelectorAll('#publications-search, #header-search-input');
  searchInputs.forEach(input => {
    input.placeholder = translations[lang]['search_placeholder'];
  });
  
  // Re-render dynamic components
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
    const text = item.text[currentLang];
    
    // Find linked activity/publication to synchronize images, video, tag and date
    const linkedAct = transferActivities.find(act => act.id === item.activityId);
    const linkedPub = publications.find(pub => pub.id === item.pubId);
    
    const section = linkedAct ? linkedAct.section : (linkedPub ? 'publicaciones' : 'actividades');
    const tagText = linkedAct ? linkedAct.tag[currentLang] : (linkedPub ? linkedPub.extraLabel[currentLang] : (item.tag ? item.tag[currentLang] : 'Seminario'));
    const dateText = linkedAct ? linkedAct.date : (linkedPub ? linkedPub.event : '');
    const cleanDate = dateText ? dateText.split('·')[0].split('de 10:30')[0].trim() : '';

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
      mediaHTML = `<img src="${fallbackSrc}" alt="${text}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;">`;
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

    // Set designated aspect ratios for asymmetric masonry sizes
    const aspectRatios = ['16/10', '4/3', '1/1', '4/5', '16/9'];
    const cardAspect = aspectRatios[i % aspectRatios.length];

    return `
      <article class="news-card news-card-redesign idx-${i}" data-id="${item.id}" data-type="${section}" data-cursor-color="${colorAttr}"
               role="button" tabindex="0" style="break-inside: avoid; margin-bottom: 24px; position: relative; overflow: hidden; border-radius: 20px;">
        <div class="news-image-wrapper" style="width: 100%; aspect-ratio: ${cardAspect}; overflow: hidden; position: relative;">
          ${mediaHTML}
          
          <!-- Hover overlay: tag/date centered, z-index 2 -->
          <div class="act-hover-overlay" style="position:absolute;inset:0;z-index:2;
               background:${hoverBg} !important;display:flex;flex-direction:column;align-items:center;justify-content:center;
               opacity:0;transition:opacity 0.35s ease, visibility 0.35s ease;text-align:center;padding:24px 16px 80px;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">
              ${tagText}
            </span>
            ${cleanDate ? `<span style="font-size:14px;color:rgba(255,255,255,0.85);font-weight:500;margin-top:8px;">${cleanDate}</span>` : ''}
          </div>
          
          <!-- Idle bottom gradient: shadow for text, z-index 3 -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index:3;"></div>
          
          <!-- Singleton Title: Always visible at bottom, z-index 4, pointer-events none -->
          <div class="news-card-title-container" style="position:absolute;bottom:20px;left:18px;right:18px;z-index:4;pointer-events:none;text-align:center;">
            <h3 style="font-size:18px !important;color:#fff !important;font-weight:700 !important;margin:0 !important;line-height:1.35 !important;
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
  
  // Shuffle array once on initial page load (does not change order on language change)
  if (!teamDisplayOrder || teamDisplayOrder.length !== teamMembers.length || !teamDisplayOrder.every(m => teamMembers.some(curr => curr.id === m.id))) {
    teamDisplayOrder = [...teamMembers].sort(() => Math.random() - 0.5);
  }
  
  const displayTeam = teamDisplayOrder.map(orderedM => {
    return teamMembers.find(curr => curr.id === orderedM.id) || orderedM;
  });
  
  teamGrid.innerHTML = displayTeam.map((member, i) => {
    const colorClass = colors[i % colors.length];
    const accent = colorAccents[colorClass];
    const roleText = member.role[currentLang];
    
    // Assign random aspect ratios for dynamic sizing (mostly vertical)
    const aspectRatios = ['4/5', '3/4', '1/1', '16/10'];
    const randomAspect = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    
    return `
      <article class="team-card color-variation-${colorClass}" id="card-${member.id}" style="cursor:pointer;">
        <div class="team-photo" style="aspect-ratio: ${randomAspect};">
          <!-- Original image shown by default -->
          <img src="${member.image || member.photoHover || member.thumb}" class="photo-original" alt="${member.name}" loading="lazy">
          <!-- Tinted photo fades in on hover -->
          <img src="${member.photoHover || member.image || member.thumb}" class="photo-color-overlay" alt="${member.name}" loading="lazy">
          <!-- Dark gradient for text readability -->
          <div class="photo-overlay"></div>
          <!-- Info anchored to bottom of photo -->
          <div class="team-photo-info">
            <span class="team-role-badge">${roleText}</span>
            <button class="team-name-btn view-member-btn" data-id="${member.id}" style="border-color:${accent};background:rgba(255,255,255,0.08);">
              <span>${member.name}</span>
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

function renderPublications() {
  const pubGrid = document.getElementById('publications-grid');
  const homePubGrid = document.getElementById('home-publications-grid');
  
  const filtered = publications.filter(pub => {
    const titleText = pub.title[currentLang].toLowerCase();
    const citationText = pub.citation.toLowerCase();
    const abstractText = pub.abstract[currentLang].toLowerCase();
    
    const matchesSearch = searchQuery === '' || 
      titleText.includes(searchQuery) ||
      citationText.includes(searchQuery) ||
      abstractText.includes(searchQuery) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchQuery));
      
    const matchesType = pubFilterType === 'all' || pub.type === pubFilterType;
    
    return matchesSearch && matchesType;
  });
  
  const mapPubHTML = pub => {
    const labelColorClass = pub.type === 'revista' ? 'blue' : (pub.type === 'libro' ? 'green' : 'teal');
    const extraLabelText = pub.extraLabel[currentLang];
    const year = pub.citation.match(/\((\d{4})\)/)?.[1] || 'Zotero';
    
    // Extract authors roughly
    const authorStr = pub.citation.split(/\(\d{4}\)\./)[0] || pub.citation.split(' (')[0] || pub.citation.substring(0, 50);
    
    return `
      <article class="pub-card-row view-pub-btn" data-id="${pub.id}">
        <div class="pub-col pub-col-year">
          <span class="pub-year-badge">${year}</span>
        </div>
        <div class="pub-col pub-col-title">
          <h3 class="pub-title" style="margin-bottom:0;">${pub.title[currentLang]}</h3>
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

function openMemberModal(id) {
  const member = teamMembers.find(m => m.id === id);
  if (!member) return;
  
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;
  
  modal.classList.remove('green-tint-modal');
  modal.classList.add('modal-large', 'modal-member-popup');
  
  // Make sure we clean up the class on modal close
  modal.addEventListener('close', () => {
    modal.classList.remove('modal-large', 'modal-member-popup', 'green-tint-modal');
  }, { once: true });
  
  const memberName = getI18nText(member.name);
  const memberRole = member.role ? (getI18nText(member.role)) : 'Investigador/a';
  const memberTitle = member.title ? (getI18nText(member.title)) : '';
  const memberBio = member.bio ? getI18nText(member.bio) : '';
  const memberIndex = teamMembers.findIndex(m => m.id === id);
  const isPhotoRight = memberIndex !== -1 ? (memberIndex % 2 === 1) : (member.id.charCodeAt(0) % 2 === 1);
  const layoutClass = isPhotoRight ? 'photo-on-right' : 'photo-on-left';

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
          <img src="${getAssetUrl(member.photoHover || member.photo || member.image || member.thumb || member.photoDefault)}" alt="${memberName}" class="fade-in-img member-fullheight-photo" onload="handleImgLoad(this)">
        </div>
      </div>
      
      <div class="member-modal-content-column">
        <div class="member-modal-header">
          <div class="member-modal-title-group">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="member-role-badge ${memberRole.toLowerCase().includes('principal') ? 'badge-ip' : 'badge-member'}">
                ${memberRole}
              </span>
            </div>
            <h3 class="member-modal-name">${memberName}</h3>
            <p class="member-modal-subtitle">${memberTitle}</p>
          </div>
        </div>

        <div class="member-modal-body-scroll">
          <p class="modal-bio-text">${memberBio}</p>
          
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
            ${member.researchgate ? `
              <a href="${member.researchgate}" target="_blank" class="member-contact-link rg-btn" title="ResearchGate: ${member.researchgate}">
                <svg viewBox="0 0 24 24" width="24" height="24" class="rg-svg">
                  <text x="2.5" y="18" font-size="16.5" font-weight="900" font-family="Georgia, serif" fill="currentColor">R</text>
                  <text x="14" y="12" font-size="12" font-weight="800" font-family="Georgia, serif" style="font-style: italic;" fill="currentColor">g</text>
                </svg>
              </a>
            ` : ''}
          </div>

          <div class="modal-publications-section" style="${(member.pubIds && member.pubIds.length > 0) ? 'border-top: 1px solid var(--color-border-light); padding-top: 20px; margin-top: 4px;' : 'display:none;'}">
            <h4 style="margin-top: 0; margin-bottom: 12px; font-family: var(--font-primary); font-size: 14px; font-weight: 800; color: #0f172a;">
              ${currentLang === 'en' ? 'Publications in this project:' : (currentLang === 'ca' ? 'Publicacions en aquest projecte:' : 'Publicaciones en este proyecto:')}
            </h4>
            <ul style="padding: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
              ${
                (member.pubIds || []).map(pid => {
                  const pub = publications.find(p => p.id === pid);
                  if (!pub) return '';
                  const year = (pub.citation && pub.citation.match(/(\d{4})/)?.[0]) || pub.year || '';
                  const url = pub.doi ? `https://doi.org/${pub.doi}` : pub.zoteroUrl;
                  return `<li>
                    <a href="${url}" target="_blank" class="member-post-box box-type-article" style="text-decoration:none; display:flex; align-items:center; gap:8px;">
                      <span class="member-post-type-badge">${year ? `(${year})` : 'Publicación'}</span>
                      <span class="member-post-title-text">${getI18nText(pub.title)}</span>
                    </a>
                  </li>`;
                }).join('')
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.showModal();
  setupModalClose(modal);

  const imgEl = modalContent.querySelector('.member-fullheight-photo');
  if (imgEl) {
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      handleImgLoad(imgEl);
    } else {
      imgEl.addEventListener('load', () => handleImgLoad(imgEl));
    }
  }
}

function openPubModal(id) {
  const pub = publications.find(p => p.id === id);
  if (!pub) return;
  
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-meta-label">${pub.extraLabel[currentLang]}</span>
        <h3>${currentLang === 'en' ? 'Zotero Reference Sheet' : (currentLang === 'ca' ? 'Fitxa Bibliogràfica Zotero' : 'Ficha Bibliográfica Zotero')}</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body">
      <h4 style="font-size: 18px; line-height: 1.4; margin-bottom: 16px; font-weight: 700; color: var(--color-text-light);">${pub.title[currentLang]}</h4>
      
      <div style="background: rgba(0,0,0,0.02); border-radius: 16px; padding: 16px; border: 1px solid var(--color-border-light); margin-bottom: 24px;">
        <span class="modal-meta-label" style="font-size: 9px; margin-bottom: 2px;">Cita Formato APA</span>
        <p style="font-size: 14px; font-style: italic; margin-bottom: 0; color: var(--color-text-light);">${pub.citation}</p>
      </div>
      
      <div style="margin-bottom: 24px;">
        <span class="modal-meta-label" style="font-size: 9px; margin-bottom: 2px;">Resumen / Abstract</span>
        <p style="font-size: 14px; line-height: 1.5; color: var(--color-text-muted-light);">${pub.abstract[currentLang]}</p>
      </div>
      
      <div class="modal-details-grid" style="border-top: 1px solid var(--color-border-light); padding-top: 20px;">
        <div class="modal-detail-item">
          <span class="modal-meta-label" style="font-size: 9px;">Clave Zotero</span>
          <span class="modal-detail-val" style="font-family: monospace;">${pub.zoteroKey}</span>
        </div>
        ${pub.doi ? `
          <div class="modal-detail-item">
            <span class="modal-meta-label" style="font-size: 9px;">DOI</span>
            <span class="modal-detail-val"><a href="https://doi.org/${pub.doi}" target="_blank" style="color: var(--color-blue); text-decoration: none;">${pub.doi}</a></span>
          </div>
        ` : ''}
        ${pub.isbn ? `
          <div class="modal-detail-item">
            <span class="modal-meta-label" style="font-size: 9px;">ISBN</span>
            <span class="modal-detail-val">${pub.isbn}</span>
          </div>
        ` : ''}
        ${pub.event ? `
          <div class="modal-detail-item">
            <span class="modal-meta-label" style="font-size: 9px;">Congreso</span>
            <span class="modal-detail-val">${pub.event}</span>
          </div>
        ` : ''}
      </div>
      
      <div style="display: flex; gap: 12px; margin-top: 30px; justify-content: flex-end;">
        <a href="${pub.zoteroUrl}" target="_blank" class="btn-primary" style="padding: 10px 20px; font-size: 13px; box-shadow: none; background: #c00;">
          <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: white; margin-right: 6px;"><path d="M22 2H2v20h20V2zM12 18H8v-2.5l4-5.5H8V8h6v2.5L10 16h4v2z"/></svg>
          Abrir en Biblioteca Zotero
        </a>
      </div>
    </div>
  `;
  
  adaptModalColors(modalContent);
  
  modal.showModal();
  setupModalClose(modal);
}

function openNewsModal(newsItem) {
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;
  
  const labelColorClass = newsItem.type === 'news' ? 'var(--color-green)' : 'var(--color-blue)';
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-meta-label" style="color: ${labelColorClass}">${newsItem.tag[currentLang]}</span>
        <h3>Últimas Noticias</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body">
      <h4 style="font-size: 18px; line-height: 1.4; margin-bottom: 20px; font-weight: 700; color: var(--color-text-light);">${newsItem.text[currentLang]}</h4>
      <p style="font-size: 14.5px; line-height: 1.6; color: var(--color-text-muted-light);">${newsItem.details[currentLang]}</p>
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
    modal.classList.remove('is-closing', 'modal-large', 'modal-member-popup', 'green-tint-modal');
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
    // If it's a member popup, clicking ANYWHERE that is not the social icons or publication links closes the modal
    if (modal.classList.contains('modal-member-popup')) {
      const interactiveEl = e.target.closest('a, button, .member-contact-link, .member-post-box, .member-pub-link');
      if (interactiveEl) {
        if (interactiveEl.id === 'modal-close-btn' || interactiveEl.classList.contains('modal-close')) {
          e.stopPropagation();
          closeModalWithAnimation(modal);
        }
        return; // Let user interact with email, ORCID, ResearchGate or publications
      }
      // Clicked anywhere else in the modal (background, image, text, white area)
      closeModalWithAnimation(modal);
      return;
    }
    
    // Close standard dialogs when clicking backdrop
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

// ----------------------------------------------------
// 5. GLOBAL INTERACTIVE CONTROLLER INITIALIZATION
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // 5.1 Render dynamic content components
  updateAllLogos();
  renderNewsFeed();
  renderTeam();
  renderPublications();
  renderTransferActivities();
  renderResources();
  
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
  
  if (langDropdownBtn && langDropdownContainer && langDropdownList) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownContainer.classList.toggle('open');
      const isOpen = langDropdownContainer.classList.contains('open');
      langDropdownBtn.setAttribute('aria-expanded', isOpen);
    });
    
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const selectedLang = option.getAttribute('data-value');
        
        // Update selection states
        langOptions.forEach(opt => {
          opt.setAttribute('aria-selected', opt === option);
        });
        
        // Update active flag & text in button
        const flag = option.querySelector('.flag-icon').innerHTML;
        const text = option.querySelector('.lang-name').textContent;
        const shortText = selectedLang.toUpperCase();
        
        document.getElementById('current-lang-flag').innerHTML = flag;
        document.getElementById('current-lang-text').textContent = shortText;
        
        // Run translation
        translatePage(selectedLang);
        
        // Close dropdown
        langDropdownContainer.classList.remove('open');
        langDropdownBtn.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close dropdown on outside clicks
    document.addEventListener('click', (e) => {
      if (langDropdownContainer && !langDropdownContainer.contains(e.target)) {
        langDropdownContainer.classList.remove('open');
        langDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
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

  // 5.13 Initialize SPA routing
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('load', () => {
    handleRouting();
    initSubmenuScrollObserver();
    initCustomCursor();
    initScrollReveal();
  });
  handleRouting();
});

// ----------------------------------------------------
// 6. SPA ROUTING RENDERING FUNCTIONS
// ----------------------------------------------------

function handleRouting() {
  const rawHash = window.location.hash || '#/';
  
  // Clean hash to extract route name and anchor
  const cleanHash = rawHash.replace(/^#\/?/, '');
  const [routePart, anchorPart] = cleanHash.split('#');
  let path = routePart || 'inicio';
  
  let detailId = null;
  // Hide all simulated views
  const views = document.querySelectorAll('.spa-view');
  views.forEach(v => v.classList.remove('active'));
  
  const normPath = path.replace(/\/+$/, '');
  if (normPath.startsWith('actividad/') || normPath.startsWith('actividades/') || normPath.startsWith('post/') || normPath.startsWith('entrada/')) {
    detailId = normPath.replace(/^(actividad|actividades|post|entrada)\//, '').trim();
    path = 'actividad-detalle';
  } else if (normPath.startsWith('miembro/') || normPath.startsWith('equipo/')) {
    const memberId = normPath.replace(/^(miembro|equipo)\//, '').trim();
    path = 'proyecto';
    setTimeout(() => {
      openMemberModal(memberId);
    }, 150);
  }
  
  // Redirect old routes to unified #/impacto with anchors
  if (path === 'transferencia' || path === 'publicaciones' || path === 'recursos') {
    window.location.hash = `#/impacto#${path}`;
    return;
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
  
  // Update body data-page for CSS targeting
  document.body.setAttribute('data-page', path);
  
  // Update nav-menu links active states
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.replace(/^#\/?/, '');
      if (path === linkPath || (path === 'inicio' && linkPath === 'inicio') || (path === 'actividad-detalle' && linkPath === 'impacto')) {
        link.classList.add('active');
      }
    }
  });
  
  // Handle scrolling to anchor or top
  if (anchorPart) {
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
      act.section === 'actividades' && (filterType === 'all' || act.type === filterType)
    );
    activitiesGrid.innerHTML = activities.map(act => {
      // Simplified date format dd/mm/yyyy
      const shortDate = act.date ? act.date.replace(/(\d+)\s+(\w+)\s+(\d{4})/, (_, d, m, y) => {
        const months = {enero:'01',febrero:'02',marzo:'03',abril:'04',mayo:'05',junio:'06',julio:'07',agosto:'08',septiembre:'09',octubre:'10',noviembre:'11',diciembre:'12'};
        return `${d.padStart(2,'0')}/${months[m.toLowerCase()] || '01'}/${y}`;
      }) : '';

      const mediaHTML = act.videoSrc 
        ? `<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="${getAssetUrl(act.videoSrc)}" type="video/mp4"></video>`
        : `<img src="${getAssetUrl(act.image)}" alt="${act.title[currentLang]}" loading="lazy">`;

      return `
      <article class="activity-card act-card-actividades" data-id="${act.id}" data-type="${act.type}" data-cursor-color="blue" style="text-align:center; position:relative;">
        <div class="activity-image-wrapper">
          ${mediaHTML}
          <!-- Hover overlay: tag/date centered, title remains underneath (z-index 4) -->
          <div class="act-hover-overlay act-hover-blue" style="background: rgba(29, 91, 254, 0.96) !important; padding: 24px 16px 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%; z-index: 2;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">${act.tag[currentLang]}</span>
            ${shortDate ? `<span style="font-size:14px; color:rgba(255,255,255,0.8); font-weight:500; margin-top:8px;">${shortDate}</span>` : ''}
          </div>
          <!-- Idle gradient: shadow behind text -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index: 3;"></div>
          <!-- Singleton Title: Always at the bottom, z-index 4, pointer-events none -->
          <div class="act-card-title-container" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 4; text-align: center; pointer-events: none;">
            <h3 style="font-size:18px !important; font-weight:700 !important; color:#fff !important; margin:0 !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${act.title[currentLang]}</h3>
          </div>
        </div>
      </article>
    `}).join('');
  }
  
  // ─── TRANSFERENCIA ─── title outside image in black (no date), desc on hover over image, title turns turquoise on hover
  if (transferenciaGrid) {
    const transferences = transferActivities.filter(act => act.section === 'transferencia');
    transferenciaGrid.innerHTML = transferences.map(act => {
      const mediaHTML = act.videoSrc 
        ? `<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="${getAssetUrl(act.videoSrc)}" type="video/mp4"></video>`
        : `<img src="${getAssetUrl(act.image)}" alt="${act.title[currentLang]}" loading="lazy">`;

      return `
      <article class="activity-card act-card-transferencia trans-card" data-id="${act.id}" data-type="${act.type}" data-cursor-color="turquoise" style="overflow:visible !important; display:flex; flex-direction:column; text-align:center;">
        <div class="activity-image-wrapper" style="position:relative; border-radius:16px; overflow:hidden;">
          ${mediaHTML}
          <!-- Hover overlay: turquoise overlay displaying the tag and DESCRIPTION -->
          <div class="act-hover-overlay act-hover-turquoise" style="background: rgba(13, 148, 136, 0.96) !important;">
            <div class="act-hover-inner" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 20px; gap:8px; height:100%; width:100%;">
              <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:12px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">${act.tag[currentLang]}</span>
              <p style="font-size: 14.5px; line-height: 1.4; color: #ffffff; font-weight: 600; margin: 0; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden;">
                ${act.desc[currentLang]}
              </p>
            </div>
          </div>
        </div>
        <!-- Card text content below image - padded and text centered -->
        <div class="trans-card-text-container" style="padding: 20px 12px 16px; flex-grow: 1; display:flex; align-items:center; justify-content:center; text-align:center;">
          <h3 class="trans-card-title-dynamic" style="font-size: 18px !important; font-weight: 700 !important; color: #0f172a; margin: 0 !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; transition: color 0.3s ease;">
            ${act.title[currentLang]}
          </h3>
        </div>
      </article>
    `}).join('');
  }
  
  // ─── HOME ACTIVITIES GRID ─── same style as Actividades
  if (homeActivitiesGrid) {
    homeActivitiesGrid.innerHTML = transferActivities.slice(0, 3).map(act => {
      const mediaHTML = act.videoSrc 
        ? `<video autoplay loop muted playsinline class="card-video" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;"><source src="${getAssetUrl(act.videoSrc)}" type="video/mp4"></video>`
        : `<img src="${getAssetUrl(act.image)}" alt="${act.title[currentLang]}" loading="lazy">`;

      return `
      <article class="activity-card act-card-actividades" data-id="${act.id}" data-type="${act.type}" data-cursor-color="blue" style="text-align:center; position:relative;">
        <div class="activity-image-wrapper">
          ${mediaHTML}
          <!-- Hover overlay: tag/date centered, title remains underneath (z-index 4) -->
          <div class="act-hover-overlay act-hover-blue" style="background: rgba(29, 91, 254, 0.96) !important; padding: 24px 16px 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%; z-index: 2;">
            <span class="act-hover-tag" style="background:transparent !important; border:none !important; padding:0 !important; font-size:13px; opacity:0.9; letter-spacing:1.5px; color:#fff !important; font-weight:800; text-transform:uppercase;">${act.tag[currentLang]}</span>
          </div>
          <!-- Idle gradient: shadow behind text -->
          <div class="act-idle-gradient act-idle-bottom" style="z-index: 3;"></div>
          <!-- Singleton Title: Always at the bottom, z-index 4, pointer-events none -->
          <div class="act-card-title-container" style="position: absolute; bottom: 20px; left: 16px; right: 16px; z-index: 4; text-align: center; pointer-events: none;">
            <h3 style="font-size:18px !important; font-weight:700 !important; color:#fff !important; margin:0 !important; line-height: 1.35; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${act.title[currentLang]}</h3>
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



const projectResources = [
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

  const filtered = filter === 'all' 
    ? projectResources 
    : projectResources.filter(r => r.type === filter);

  grid.innerHTML = filtered.map(res => `
    <article class="rec-card rec-card-redesign" data-id="${res.id}" data-cursor-color="green">
      <!-- Top header: category pill + doc icon -->
      <div class="rec-card-top" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:12px;">
        <span class="rec-card-tag-pill" style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; background:rgba(16, 185, 129, 0.1); color:#10b981; padding:4px 10px; border-radius:12px; transition: all 0.3s ease;">
          ${res.tag[currentLang]}
        </span>
        <svg viewBox="0 0 24 24" style="width:20px; height:20px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; opacity:0.3; transition: all 0.3s ease; color:#10b981;" class="rec-card-file-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      <!-- Body: title + description snippet -->
      <div class="rec-card-body" style="text-align:left; width:100%; flex-grow:1; display:flex; flex-direction:column; justify-content:flex-start; gap:8px;">
        <h3 class="rec-card-title" style="font-size:17px; font-weight:700; color:#0f172a; margin:0; line-height:1.35; transition: color 0.3s ease;">
          ${res.title[currentLang]}
        </h3>
        <p class="rec-card-desc" style="font-size:13.5px; color:#475569; margin:0; line-height:1.45; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; transition: color 0.3s ease;">
          ${res.description[currentLang]}
        </p>
      </div>
    </article>
  `).join('');

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
  const res = projectResources.find(r => r.id === id);
  if (!res) return;

  const modal = document.getElementById('details-modal');
  if (!modal) return;

  modal.classList.add('green-tint-modal');

  const modalContent = modal.querySelector('.modal-content-placeholder');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-meta-label" style="color: var(--color-green) !important;">${res.tag[currentLang]}</span>
        <h3 style="color: var(--color-green) !important;">${currentLang === 'en' ? 'Project Resource Details' : (currentLang === 'ca' ? 'Detall del Recurs del Projecte' : 'Detalle del Recurso del Proyecto')}</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body">
      <h4 style="font-size: 20px; line-height: 1.4; margin-bottom: 20px; font-weight: 800; color: var(--color-green) !important;">${res.title[currentLang]}</h4>
      <div class="activity-detail-lorem" style="font-size: 15.5px; line-height: 1.8; text-align: justify;">
        ${res.loremIpsum[currentLang]}
      </div>
      <div style="margin-top: 30px; display: flex; gap: 16px; flex-wrap: wrap;">
        <a href="${res.downloadUrl}" class="btn-primary" style="background: var(--color-green) !important; border-color: var(--color-green) !important;">
          ${currentLang === 'en' ? 'Download Resource' : (currentLang === 'ca' ? 'Descarregar Recurs' : 'Descargar Recurso')}
        </a>
      </div>
    </div>
  `;

  modal.showModal();
  setupModalClose(modal);

  const handleClose = () => {
    modal.classList.remove('green-tint-modal');
    modal.removeEventListener('close', handleClose);
  };
  modal.addEventListener('close', handleClose);
}

function renderActivityDetail(id) {
  let allActivities = [];
  if (typeof transferActivities !== 'undefined' && Array.isArray(transferActivities)) {
    allActivities.push(...transferActivities);
  }
  if (typeof window !== 'undefined' && window.CopliteleWPData) {
    if (Array.isArray(window.CopliteleWPData.actividades)) allActivities.push(...window.CopliteleWPData.actividades);
    if (Array.isArray(window.CopliteleWPData.transferencia)) allActivities.push(...window.CopliteleWPData.transferencia);
  }
  const cleanId = decodeURIComponent(String(id || '')).toLowerCase().trim();
  const activity = allActivities.find(a => a && (
    String(a.id || '').toLowerCase() === cleanId ||
    String(a.wp_id || '') === cleanId ||
    String(a.slug || '').toLowerCase() === cleanId ||
    String(a.id || '').replace(/^wp-post-/, '') === cleanId ||
    (a.name && typeof a.name === 'string' && a.name.toLowerCase().includes(cleanId)) ||
    (getI18nText(a.title) && getI18nText(a.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cleanId))
  ));
  const detailContainer = document.getElementById('view-actividad-detalle');
  if (!detailContainer || !activity) return;

  // Enforce scroll to top immediately on post selection
  window.scrollTo({ top: 0, behavior: 'instant' });
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 50);

  const actTitle = getI18nText(activity.title) || getI18nText(activity.name) || '';
  const actTag = activity.tag ? getI18nText(activity.tag) : 'Actividad';

  // Featured media: full-width borderless image (doubled size)
  const featuredMedia = `<img src="${activity.image}" alt="${actTitle}" style="width:100%; height:540px; object-fit:cover; border-radius:0; border:none; outline:none; display:block;">`;

  const isTransferencia = activity.section === 'transferencia';
  const buttonClass = isTransferencia ? 'btn-outline-turquoise' : 'btn-outline-blue';
  const backAnchor = isTransferencia ? '#/impacto#transferencia' : '#/impacto#actividades';
  const typeColor = isTransferencia ? '#14b8a6' : '#1d5bfe';

  const bodyContent = getI18nText(activity.loremIpsum) || getI18nText(activity.desc) || '';

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
            <span style="font-size: 13px; color: var(--color-text-muted-light);">${activity.date || ''}</span>
            ${activity.location ? `<span style="font-size: 13px; color: var(--color-text-muted-light);">· ${activity.location}</span>` : ''}
          </div>
          
          <h1 style="font-size: clamp(22px, 4vw, 34px); margin-bottom: 28px; font-family: var(--font-primary); font-weight: 800; line-height: 1.25;">
            ${actTitle}
          </h1>
          
          <div class="activity-detail-lorem" style="font-size: 15.5px; line-height: 1.8; text-align: justify;">
            ${bodyContent}
          </div>
        </div>
      </div>
    </div>
  `;

  // Init lightbox on post-body-img images
  detailContainer.querySelectorAll('.lightbox-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openImageLightbox(img.src, img.alt));
  });

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
  const existing = document.querySelector('.img-lightbox-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'img-lightbox-overlay';
  overlay.innerHTML = `
    <div class="img-lightbox-inner">
      <button class="img-lb-close" aria-label="Cerrar">✕</button>
      <img src="${src}" alt="${alt || ''}">
    </div>
  `;
  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('img-lb-close')) overlay.remove();
  });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
}




function initSubmenuScrollObserver() {
  const sections = [
    document.getElementById('proyecto'),
    document.getElementById('objetivos'),
    document.getElementById('equipo'),
    document.getElementById('actividades'),
    document.getElementById('transferencia'),
    document.getElementById('publicaciones'),
    document.getElementById('recursos')
  ].filter(Boolean);

  if (!sections.length) return;

  const updateActiveSubmenuLink = () => {
    const activeView = document.querySelector('.spa-view.active');
    if (!activeView) return;

    const links = Array.from(activeView.querySelectorAll('.submenu-link'));
    if (!links.length) return;

    const viewSections = sections.filter(sec => activeView.contains(sec));
    if (!viewSections.length) return;

    // Line 160px from top of viewport for sticky submenu trigger
    const triggerY = 160;
    let currentSection = viewSections[0];

    for (let i = 0; i < viewSections.length; i++) {
      const rect = viewSections[i].getBoundingClientRect();
      if (rect.top <= triggerY) {
        currentSection = viewSections[i];
      }
    }

    if (window.scrollY < 100) {
      currentSection = viewSections[0];
    }

    const currentId = currentSection.getAttribute('id');

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.endsWith(`#${currentId}`)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveSubmenuLink, { passive: true });
  window.addEventListener('hashchange', updateActiveSubmenuLink, { passive: true });
  updateActiveSubmenuLink();
}


/* ----------------------------------------------------
   UPDATED CUSTOM SYSTEMS (Custom Glow Cursor, Scroll Reveals)
   ---------------------------------------------------- */

function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.querySelector('.custom-cursor') || document.createElement('div');
  cursor.className = 'custom-cursor';
  if (!cursor.parentNode) document.body.appendChild(cursor);
  
  const follower = document.querySelector('.custom-cursor-follower') || document.createElement('div');
  follower.className = 'custom-cursor-follower';
  if (!follower.parentNode) document.body.appendChild(follower);
  
  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
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
    const config = generateLogoConfig();
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

  // Same as above but without the text label — used for button hover
  const getCursorIsotypeSVGNoText = (strokeColor = '#a78bfa') => {
    const config = generateLogoConfig();
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
      const dp = localPolarToCartesian(center, center, outerRadius, arc.dotPos);
      const mid = `btn-mask-${arc.id}-${rs}`;
      masks += `<mask id="${mid}" maskUnits="userSpaceOnUse"><rect x="0" y="0" width="100" height="100" fill="white"/><circle cx="${dp.x}" cy="${dp.y}" r="${perimNotchRadius}" fill="black"/></mask>`;
      paths += `<path d="${localDescribeArc(center, center, outerRadius, arc.start, arc.end)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" mask="url(#${mid})"/>`;
      dots  += `<circle cx="${dp.x}" cy="${dp.y}" r="${perimDotRadius}" fill="${strokeColor}"/>`;
    });
    masks += '</defs>';
    return `
      <div style="position:relative; width:80px; height:80px; display:flex; align-items:center; justify-content:center;">
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
    if (el.classList.contains('card-transferencia') || el.getAttribute('data-cursor-color') === 'turquoise' || (el.classList.contains('activity-card') && el.closest('#transferencia')) || el.classList.contains('trans-card')) {
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
    if (el.classList.contains('section-nav-card')) {
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
    cursor.innerHTML = getCursorIsotypeSVGNoText('#a78bfa');
    document.body.classList.add('custom-cursor-hover');
  };

  const handleButtonLeave = () => {
    cursor.classList.remove('hover-button');
    cursor.innerHTML = '';
    document.body.classList.remove('custom-cursor-hover');
  };
  
  const updateHoverEvents = () => {
    // 1. Post cards, news cards, navigation shortcut cards, and team member cards
    document.querySelectorAll('.section-nav-card, .activity-card, .rec-card, .news-card, .team-card').forEach(el => {
      el.removeEventListener('mouseenter', handleCardEnter);
      el.removeEventListener('mouseleave', handleCardLeave);
      el.addEventListener('mouseenter', handleCardEnter);
      el.addEventListener('mouseleave', handleCardLeave);
    });

    // 2. Regular interactive buttons and links (exclude pub links inside member modal — they handle their own hover)
    document.querySelectorAll('a:not(.section-nav-card):not(.activity-card):not(.news-card):not(.member-pub-link), button:not(.rec-card), [role="button"]:not(.news-card), #hero-logo-container, .logo-wrapper, .custom-lang-btn, .modal-close').forEach(el => {
      el.removeEventListener('mouseenter', handleButtonEnter);
      el.removeEventListener('mouseleave', handleButtonLeave);
      el.addEventListener('mouseenter', handleButtonEnter);
      el.addEventListener('mouseleave', handleButtonLeave);
    });
  };
  
  updateHoverEvents();
  window.addEventListener('content-updated', updateHoverEvents);

  // Monitor details-modal events to toggle class on body
  const modal = document.getElementById('details-modal');
  if (modal) {
    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
    });
    const origShowModal = modal.showModal;
    modal.showModal = function() {
      document.body.classList.add('modal-open');
      origShowModal.apply(this, arguments);
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
      if (el.closest('header') || el.closest('#details-modal') || el.closest('.custom-cursor') || el.closest('.custom-cursor-follower') || el.closest('.custom-lang-dropdown')) return;
      
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

document.addEventListener('DOMContentLoaded', initLordIconHovers);
