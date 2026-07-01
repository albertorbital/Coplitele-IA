import { generateLogoConfig, renderLogoSVG } from './logoGenerator.js';
import './style.css';
import investigadoresImg from './assets/images/investigadores.png';
import transferenciaImg from './assets/images/transferencia.png';
import congresosImg from './assets/images/congresos.png';
import recursosImg from './assets/images/recursos.png';

// ----------------------------------------------------
// 1. DATA DEFINITIONS (Mock databases in 3 languages)
// ----------------------------------------------------

let currentLang = 'es'; // 'es', 'ca', 'en'

const teamMembers = [
  {
    id: "adolfina-perez",
    name: "Dra. Adolfina Pérez Garcías",
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
    photo: "miembros/color/adolfina_perez.png",
    photoHover: "miembros/Hover/adolfina_perez.png"
  },
  {
    id: "barbara-de-benito",
    name: "Dra. Bárbara de Benito Crosetti",
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
    photo: "miembros/color/barbara_de_benito.png",
    photoHover: "miembros/Hover/barbara_de_benito.png"
  },
  {
    id: "jesus-salinas",
    name: "Dr. Jesús María Salinas Ibáñez",
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
      ca: "Catedràtic de l'Àrea de Didàctica i Organització Escolar de la UIB. Fundador del Grup de Tecnologia Educativa (GTE). Àmplia trajectòria en el disseny d'entorns virtuals d'aprenentatge, formació del profesorat en TIC i educació flexible i a distància.",
      en: "Full Professor in Didactics and School Organization at UIB. Founder of the Educational Technology Group (GTE). Extensive career in designing virtual learning environments, teacher training in ICT, and flexible and distance education."
    },
    email: "jesus.salinas@uib.es",
    orcid: "0000-0003-2415-8822",
    researchgate: "https://www.researchgate.net/profile/Jesus-Salinas-3",
    photo: "miembros/color/jesus_salinas.png",
    photoHover: "miembros/Hover/jesus_salinas.png"
  },
  {
    id: "santos-urbina",
    name: "Dr. Santos Urbina Ramírez",
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
    photo: "miembros/color/santos_urbina.png",
    photoHover: "miembros/Hover/santos_urbina.png"
  },
  {
    id: "francisca-negre",
    name: "Dra. Francisca Negre Bennásar",
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
    photo: "miembros/color/francisca_negre.png",
    photoHover: "miembros/Hover/francisca_negre.png"
  },
  {
    id: "gemma-tur",
    name: "Dra. Gemma Tur Ferrer",
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
    photo: "miembros/color/gemma_tur.png",
    photoHover: "miembros/Hover/gemma_tur.png"
  },
  {
    id: "francisco-lirola",
    name: "Dr. Francisco Lirola",
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
    photo: "miembros/color/francisco_lirola.png",
    photoHover: "miembros/Hover/francisco_lirola.png"
  },
  {
    id: "linda-castaneda",
    name: "Dra. Linda Castañeda Quintero",
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
    photo: "miembros/color/linda_castaneda.png",
    photoHover: "miembros/Hover/linda_castaneda.png"
  },
  {
    id: "enric-bresco",
    name: "Dr. Enric Brescó Baiges",
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
    photo: "miembros/color/enric_bresco.png",
    photoHover: "miembros/Hover/enric_bresco.png"
  },
  {
    id: "gustavo-angulo",
    name: "Dr. Gustavo Adolfo Angulo Mendoza",
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
    photo: "miembros/color/gustavo_angulo.png",
    photoHover: "miembros/Hover/gustavo_angulo.png"
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
    id: "news-1",
    type: "revista",
    tag: { es: "Publicación", ca: "Publicació", en: "Publication" },
    text: {
      es: "Publicado nuevo artículo sobre codiseño de plataformas de IA en la Revista de Educación y Tecnología.",
      ca: "Publicat nou article sobre codisseny de plataformes d'IA a la Revista de Educación y Tecnología.",
      en: "New article published on AI platform co-design in the Journal of Education and Technology."
    },
    pubId: "pub-1"
  },
  {
    id: "news-2",
    type: "transferencia",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    text: {
      es: "Comienzo de los talleres de co-creación de interfaces inteligentes en institutos colaboradores de Mallorca.",
      ca: "Començament dels tallers de co-creació d'interfícies intel·ligents a instituts col·laboradors de Mallorca.",
      en: "Co-creation workshops for smart interfaces begin in collaborating high schools in Mallorca."
    },
    activityId: "act-1"
  },
  {
    id: "news-3",
    type: "revista",
    tag: { es: "Publicación", ca: "Publicació", en: "Publication" },
    text: {
      es: "Investigación sobre la perspectiva de la comunidad educativa y los retos prácticos de la co-creación de IA.",
      ca: "Investigació sobre la perspectiva de la comunitat educativa i els reptes pràctics de la co-creació d'IA.",
      en: "Research on the educational community's perspective and practical challenges in AI co-creation."
    },
    pubId: "pub-2"
  },
  {
    id: "news-4",
    type: "transferencia",
    tag: { es: "Transferencia", ca: "Transferència", en: "Transfer" },
    text: {
      es: "Sesión de transferencia tecnológica con inspectores y directores del IRIE sobre soberanía digital.",
      ca: "Sessió de transferència tecnològica amb inspectors i directors de l'IRIE sobre sobirania digital.",
      en: "Technology transfer session with inspectors and directors of IRIE on digital sovereignty."
    },
    activityId: "act-6"
  },
  {
    id: "news-5",
    type: "revista",
    tag: { es: "Publicación", ca: "Publicació", en: "Publication" },
    text: {
      es: "Publicación del libro 'Tecnología Educativa y Personalización: Guía Práctica para el Codiseño de Aulas Inteligentes'.",
      ca: "Publicació del llibre 'Tecnologia Educativa i Personalització: Guia Pràctica per al Codisseny d'Aules Intel·ligents'.",
      en: "Publication of the book 'Educational Technology and Personalization: A Practical Guide for Co-designing Smart Classrooms'."
    },
    pubId: "pub-3"
  },
  {
    id: "news-6",
    type: "transferencia",
    tag: { es: "Seminario", ca: "Seminari", en: "Seminar" },
    text: {
      es: "Seminario Internacional sobre Inteligencia Artificial y Aprendizaje de Lenguas Asistido por Ordenador (CALL).",
      ca: "Seminari Internacional sobre Intel·ligència Artificial i Aprenentatge de Llengües Assistit per Ordinador (CALL).",
      en: "International Seminar on Artificial Intelligence and Computer-Assisted Language Learning (CALL)."
    },
    activityId: "act-2"
  }
];

const transferActivities = [
  {
    id: "act-1",
    type: "taller",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    title: {
      es: "Taller de Codiseño con Docentes",
      ca: "Taller de Codisseny amb Docents",
      en: "Co-design Workshop with Teachers"
    },
    desc: {
      es: "Sesión participativa con profesorado de educación secundaria para co-crear estrategias de integración de IA en la enseñanza de lenguas.",
      ca: "Sessió participativa amb professorat d'educació secundària per co-crear estratègies d'integració d'IA en l'ensenyament de llengües.",
      en: "Participatory session with secondary education teachers to co-create strategies for integrating AI in language teaching."
    },
    pills: ["Codiseño", "Formación Docente"],
    date: "Marzo 2024",
    location: "UIB, Palma de Mallorca",
    image: transferenciaImg,
    loremIpsum: {
      es: "El Taller de Codiseño con Docentes se concibió como un espacio participativo donde más de veinte profesores y profesoras de educación secundaria compartieron sus necesidades y expectativas sobre la integración de sistemas adaptativos de Inteligencia Artificial en el aula. A través de dinámicas de diseño centrado en el usuario, se definieron los requisitos para un panel de control que permita al docente supervisar las sugerencias de la IA en tiempo real. Este codiseño fomenta la soberanía educativa frente al algoritmo.\n\nDurante las sesiones de trabajo cooperativo, se elaboraron wireframes conceptuales de visualizaciones de datos y métricas adaptativas, determinando qué información sobre el procesamiento del lenguaje del alumnado resulta verdaderamente relevante para la toma de decisiones pedagógicas y cómo presentarla sin provocar sobrecarga cognitiva.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "El Taller de Codisseny amb Docents es va concebre com un espai participatiu on més de vint professors i professores d'educació secundària van compartir les seves necessitats i expectatives sobre la integració de sistemes adaptatius d'Intel·ligència Artificial a l'aula. A través de dinàmiques de disseny centrat en l'usuari, es van definir els requisits per a un panell de control que permeti al docent supervisar les suggeriments de la IA en temps real. Aquest codisseny fomenta la sobirania educativa enfront de l'algorisme.\n\nDurant les sessions de treball cooperatiu, es van elaborar wireframes conceptuals de visualitzacions de dades i mètriques adaptatives, determinant quina informació sobre el processament del llenguatge de l'alumnat resulta verdaderament rellevant per a la presa de decisions pedagògiques i com presentar-la sense provocar sobrecàrrega cognitiva.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim.",
      en: "The Co-design Workshop with Teachers was conceived as a participatory space where more than twenty secondary education teachers shared their needs and expectations regarding the integration of adaptive Artificial Intelligence systems in the classroom. Through user-centered design dynamics, requirements were defined for a dashboard that allows teachers to supervise AI suggestions in real time. This co-design promotes educational sovereignty in the face of the algorithm.\n\nDuring the cooperative work sessions, conceptual wireframes of data visualizations and adaptive metrics were developed, determining what information on student language processing is truly relevant for pedagogical decision-making and how to present it without causing cognitive overload.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  },
  {
    id: "act-2",
    type: "seminario",
    tag: { es: "Seminario", ca: "Seminari", en: "Seminar" },
    title: {
      es: "Seminario Internacional: IA y CALL",
      ca: "Seminari Internacional: IA i CALL",
      en: "International Seminar: AI and CALL"
    },
    desc: {
      es: "Seminario online internacional con expertos de Europa y América Latina sobre el estado del arte en IA aplicada al aprendizaje de lenguas.",
      ca: "Seminari online internacional amb experts d'Europa i Amèrica Llatina sobre l'estat de l'art en IA aplicada a l'aprenentatge de llengües.",
      en: "International online seminar with experts from Europe and Latin America on the state of the art in AI applied to language learning."
    },
    pills: ["IA", "CALL", "Internacional"],
    date: "Mayo 2024",
    location: "Online (Zoom)",
    image: congresosImg,
    loremIpsum: {
      es: "El Seminario Internacional: IA y CALL congregó a investigadores de primer nivel procedentes de universidades europeas y americanas. Las sesiones se centraron en debatir el estado del arte de las tecnologías de procesamiento del lenguaje natural (NLP) aplicadas a la adquisición de segundas lenguas (CALL), prestant especial atención a la retroalimentación automática y al análisis de interacciones en contextos de telecolaboración virtual.\n\nLos ponentes discutieron sobre los límites éticos de los modelos de lenguaje comerciales en entornos escolares y presentaron propuestas de implementación local que salvaguardan la privacidad del estudiante. El debate evidenció la necesidad de crear frameworks híbridos que unan la intuición pedagógica humana con la precisión de los análisis basados en deep learning.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "El Seminari Internacional: IA i CALL va congregar investigadors de primer nivell procedents d'universitats europees i americanes. Les sessions es van centrar en debatre l'estat de l'art de les tecnologies de processament del llenguatge natural (NLP) aplicades a l'adquisició de segones llengües (CALL), prestant especial atenció a la retroalimentació automàtica i a l'anàlisi d'interaccions en contextos de telecol·laboració virtual.\n\nEls ponents van discutir sobre els límits ètics dels models de llenguatge comercials en entorns escolars i van presentar propostes d'implementació local que salvaguarden la privacitat de l'estudiant. El debat va evidenciar la necessitat de crear frameworks híbrids que uneixin la intuïció pedagògica humana amb la precisió de les anàlisis basades en deep learning.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus.",
      en: "The International Seminar: AI and CALL gathered top-tier researchers from European and American universities. The sessions focused on debating the state of the art of natural language processing (NLP) technologies applied to computer-assisted language learning (CALL), paying special attention to automated feedback and interaction analysis in virtual telecollaboration contexts.\n\nSpeakers discussed the ethical limits of commercial language models in school environments and presented local implementation proposals that safeguard student privacy. The debate highlighted the need to create hybrid frameworks that combine human pedagogical intuition with the precision of deep learning-based analytics.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  },
  {
    id: "act-3",
    type: "demo",
    tag: { es: "Demo", ca: "Demo", en: "Demo" },
    title: {
      es: "Demostración de Prototipo",
      ca: "Demostració de Prototip",
      en: "Prototype Demonstration"
    },
    desc: {
      es: "Presentación del prototipo de plataforma de telecolaboración con módulo de IA integrado. Sesión abierta a la comunidad universitaria.",
      ca: "Presentació del prototip de plataforma de telecolaboració amb mòdul d'IA integrat. Sessió oberta a la comunitat universitària.",
      en: "Presentation of the telecollaboration platform prototype with integrated AI module. Session open to the university community."
    },
    pills: ["Tecnología", "Demostración"],
    date: "Octubre 2024",
    location: "UIB, Palma de Mallorca",
    image: recursosImg,
    loremIpsum: {
      es: "La Demostración de Prototipo del sistema interactivo COPLITELE-IA sirvió para validar con la comunidad investigadora y educativa la primera versión funcional del entorno adaptativo de telecolaboración. El prototipo permite parametrizar de forma ágil la retroalimentación predictiva del sistema, proporcionando una interfaz limpia y accesible que asegura que la mediación tecnológica sea explicable y transparente.\n\nLos asistentes pudieron probar de primera mano cómo los alumnos interactúan en las salas de telecolaboración mientras un motor de análisis lingüístico proporciona sugerencias dinámicas adaptadas al nivel de competencia de cada participante. Las respuestas recolectadas servirán para pulir los tiempos de respuesta y la precisión de la interfaz en futuras iteraciones del proyecto.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "La Demostració de Prototip del sistema interactiu COPLITELE-IA va servir per validar amb la comunitat investigadora i educativa la primera versió funcional de l'entorn adaptatiu de telecol·laboració. El prototip permet parametritzar de manera àgil la retroalimentació predictiva del sistema, proporcionant una interfície neta i accessible que assegura que la mediació tecnològica sigui explicable i transparent.\n\nEls assistents van poder provar de primera mà com els alumnes interactuen a les sales de telecol·laboració mentre un motor d'anàlisi lingüística proporciona suggeriments dinàmics adaptats al nivell de competència de cada participant. Les respostes recollides serviran per polir els temps de resposta i la precisió de la interfície en futures iteracions del projecte.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus.",
      en: "The Prototype Demonstration of the COPLITELE-IA interactive system served to validate the first functional version of the adaptive telecollaboration environment with the research and educational community. The prototype allows for agile configuration of the system's predictive feedback, providing a clean and accessible interface that ensures the technological mediation is explainable and transparent.\n\nAttendees experienced firsthand how students interact in the telecollaboration rooms while a linguistic analysis engine provides dynamic suggestions adapted to each participant's proficiency level. The feedback collected will be used to refine response times and interface precision in future project iterations.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  },
  {
    id: "act-4",
    type: "formacion",
    tag: { es: "Formación", ca: "Formació", en: "Training" },
    title: {
      es: "Curso de Formación: NLP para Educadores",
      ca: "Curs de Formació: NLP per a Educadors",
      en: "Training Course: NLP for Educators"
    },
    desc: {
      es: "Programa de formación de 8 horas dirigido a docentes de lenguas sobre procesamiento del lenguaje natural y herramientas de feedback automatizado.",
      ca: "Programa de formació de 8 hores adreçat a docents de llengües sobre processament del llenguatge natural i eines de feedback automatitzat.",
      en: "8-hour training program for language teachers on natural language processing and automated feedback tools."
    },
    pills: ["NLP", "Formación", "Blended"],
    date: "Enero 2025",
    location: "Online y presencial (UIB)",
    image: transferenciaImg,
    loremIpsum: {
      es: "El Curso de Formación en NLP para Educadores proporcionó al profesorado participante herramientas conceptuales y prácticas para comprender cómo la IA procesa el lenguaje de los estudiantes. Durante el curso, se diseñaron actividades de escritura que incorporaban sistemas automáticos de retroalimentación constructiva, analizando el impacto de este andamiaje algorítmico en la motivación del alumnado.\n\nSe profundizó en el funcionamiento básico de los transformadores y los modelos de lenguaje, explicando cómo traducir la probabilidad de palabras en andamios de escritura significativos. Los docentes participantes diseñaron guías didácticas que integran estas herramientas como asistentes de escritura, promoviendo el pensamiento crítico frente al texto generado automáticamente.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "El Curs de Formació en NLP per a Educadors va proporcionar al professorat participant eines conceptuals i pràctiques per comprendre com la IA processa el llenguatge dels estudiants. Durant el curs, es van dissenyar activitats d'escriptura que incorporaven sistemes automàtics de retroalimentació constructiva, analitzant l'impacte d'aquesta bastida algorísmica en la motivació de l'alumnat.\n\nEs va aprofundir en el funcionament bàsic dels transformadors i els models de llenguatge, explicant com traduir la probabilitat de paraules en bastides d'escriptura significatives. Els docents participants van dissenyar guies didàctiques que integren aquestes eines com a assistents d'escriptura, promovent el pensament crític enfront del text generat automàticament.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus.",
      en: "The NLP for Educators Training Course provided participating teachers with conceptual and practical tools to understand how AI processes student language. During the course, writing activities incorporating automatic systems of constructive feedback were designed, analyzing the impact of this algorithmic scaffolding on student motivation.\n\nThe basic operation of transformers and language models was covered, explaining how to translate word probabilities into meaningful writing scaffolds. Participating teachers designed educational guides that integrate these tools as writing assistants, promoting critical thinking toward automatically generated text.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  },
  {
    id: "act-5",
    type: "taller",
    tag: { es: "Taller", ca: "Taller", en: "Workshop" },
    title: {
      es: "Workshop: Diseño de Tareas Telecolaborativas",
      ca: "Workshop: Disseny de Tasques Telecolaboratives",
      en: "Workshop: Designing Telecollaborative Tasks"
    },
    desc: {
      es: "Taller práctico para el diseño colaborativo de tareas de intercambio lingüístico entre estudiantes de diferentes países con apoyo de IA.",
      ca: "Taller pràctic per al disseny col·laboratiu de tasques d'intercanvi lingüístic entre estudiants de diferents països amb suport d'IA.",
      en: "Practical workshop for the collaborative design of language exchange tasks between students from different countries supported by AI."
    },
    pills: ["Diseño de Tareas", "Telecolaboración"],
    date: "Marzo 2025",
    location: "UAH, Alcalá de Henares",
    image: congresosImg,
    loremIpsum: {
      es: "El Workshop de Diseño de Tareas Telecolaborativas, celebrado en Alcalá de Henares, sirvió como un foro de co-creación de itinerarios didácticos virtuales. Los investigadores y docentes desarrollaron tareas de comunicación interactiva apoyadas por IA, adaptadas a diversos niveles de competencia lingüística, priorizando la equidad de las dinámicas en contextos plurilingües.\n\nLas dinámicas permitieron unificar criterios sobre cómo estructurar los turnos de intervención de los alumnos, y cómo la plataforma inteligente puede sugerir disparadores de conversación (prompts) en caso de bloqueos comunicativos, asegurando que las parejas mantengan un flujo natural de telecolaboración.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "El Workshop de Disseny de Tasques Telecol·laboratives, celebrat a Alcalá de Henares, va servir com un fòrum de co-creació d'itineraris didàctics virtuals. Els investigadors i docents van desenvolupar tasques de comunicació interactiva amb suport d'IA, adaptades a diversos nivells de competència lingüística, prioritzant l'equitat de les dinàmiques en contextos plurilingües.\n\nLes dinàmiques van permetre unificar criteris sobre com estructurar els torns d'intervenció dels alumnes, i com la plataforma intel·ligent pot suggerir disparadors de conversa (prompts) en cas de bloquejos comunicatius, assegurant que les parelles mantinguin un flux natural de telecol·laboració.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus.",
      en: "The Designing Telecollaborative Tasks Workshop, held in Alcalá de Henares, served as a forum for co-creating virtual educational itineraries. Researchers and teachers developed interactive communication tasks supported by AI, adapted to various language proficiency levels, prioritizing equity in plurilingual contexts.\n\nThe dynamics allowed for unifying criteria on how to structure student turn-taking, and how the smart platform can suggest conversation starters (prompts) in case of communication blocks, ensuring that partners maintain a natural flow of telecollaboration.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  },
  {
    id: "act-6",
    type: "difusion",
    tag: { es: "Difusión", ca: "Difusió", en: "Dissemination" },
    title: {
      es: "Jornada de Difusión de Resultados",
      ca: "Jornada de Difusió de Resultats",
      en: "Results Dissemination Day"
    },
    desc: {
      es: "Presentación pública de los principales hallazgos del proyecto, con mesas redondas y presentación de materiales didácticos elaborados.",
      ca: "Presentació pública de les principals troballes del projecte, amb taules rodones i presentació de materials didàctics elaborats.",
      en: "Public presentation of the project's main findings, with roundtables and presentation of developed educational materials."
    },
    pills: ["Resultados", "Difusión"],
    date: "Junio 2025",
    location: "UIB, Palma de Mallorca",
    image: recursosImg,
    loremIpsum: {
      es: "La Jornada de Difusión de Resultados marcó el cierre público del proyecto, reuniendo a autoridades académicas, docentes y público general. Se presentaron los principales hallazgos de las pruebas de campo, demostrando el impacto positivo de la telecolaboración asistida por IA co-diseñada, y se distribuyeron manuales didácticos y códigos de buenas prácticas éticas.\n\nLas ponencias resumieron las métricas cuantitativas y cualitativas registradas en los institutos, destacando una mejora estadísticamente significativa en la fluidez de escritura de los estudiantes y una reducción de la ansiedad lingüística gracias al andamiaje personalizado del sistema adaptativo.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus. Curabitur vitae justo elementum, gravida arcu at, luctus enim. Cras facilisis ante eros, vel porttitor ipsum luctus in. Duis dictum ligula id augue eleifend, at tristique nulla pretium.",
      ca: "La Jornada de Difusió de Resultats va marcar el tancament públic del projecte, reunint autoritats acadèmiques, docents i públic general. Es van presentar les principals troballes de les proves de camp, demostrant l'impacte positiu de la telecol·laboració assistida per IA co-dissenyada, i es van distribuir manuals didàctics i codis de bones pràctiques ètiques.\n\nLes ponències van resumir les mètriques quantitatives i qualitatives registrades als instituts, destacant una millora estadísticament significativa en la fluïdesa d'escriptura dels estudiants i una reducció de l'ansietat lingüística gràcies a la bastida personalitzada del sistema adaptatiu.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus.",
      en: "The Results Dissemination Day marked the public closing of the project, bringing together academic authorities, teachers, and the general public. The main findings from the field trials were presented, demonstrating the positive impact of co-designed AI-assisted telecollaboration, and educational manuals and codes of ethical good practices were distributed.\n\nPresentations summarized both quantitative and qualitative metrics recorded in high schools, highlighting a statistically significant improvement in students' writing fluency and a reduction in language anxiety due to the personalized scaffolding of the adaptive system.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat molestie elementum. Integer accumsan pulvinar erat eget accumsan. Vestibulum tristique sapien et leo egestas molestie. Mauris nec pretium nisl. Proin ac convallis lacus."
    }
  }
];

const translations = {
  es: {
    menu_inicio: "Inicio",
    menu_proyecto: "Proyecto",
    menu_impacto: "Impacto y Difusión",
    hero_tag: "Proyecto de Investigación activo",
    hero_main_title: "Rediseñamos el futuro de la educación con <span class=\"blue-highlight\">Codiseño</span> e <span class=\"green-highlight\">Inteligencia Artificial</span>",
    hero_desc: "COPLITELE-IA es un proyecto de investigación que transforma la educación superior integrando la Inteligencia Artificial Generativa (IAG) desde un enfoque pedagógico innovador. A través del codiseño educativo entre docentes y estudiantes, impulsamos la personalización del aprendizaje mediante itinerarios flexibles, promoviendo entornos virtuales conectados que garantizan la equidad, la inclusión y la calidad educativa.",
    btn_conocer: "Conoce el Proyecto",
    btn_publicaciones: "Publicaciones",
    news_title: "Últimas noticias",
    news_pretitle: "Actualidad",
    stats_years: "Años de investigación",
    stats_investigadores: "Investigadores",
    stats_publicaciones: "Publicaciones",
    stats_experiencias: "Experiencias",
    progress_label: "Progreso del Proyecto",
    submenu_desc: "Descripción",
    submenu_obj: "Objetivos",
    submenu_miembros: "Miembros",
    submenu_noticias: "Últimas noticias",
    submenu_transferencia: "Transferencia",
    submenu_publicaciones: "Producción científica",
    submenu_recursos: "Recursos",
    obj_title: "Objetivos del Proyecto",
    obj_1_title: "Objetivo Principal",
    obj_1_desc: "Investigar el impacto de la IA en la telecolaboración interlingüística, analizando cómo el codiseño mejora los procesos de aprendizaje de lenguas.",
    obj_2_title: "Innovación",
    obj_2_desc: "Desarrollar herramientas de personalización adaptativa basadas en IA para entornos de aprendizaje de lenguas mediado por tecnología.",
    obj_3_title: "Alcance Internacional",
    obj_3_desc: "Colaboración con instituciones europeas y latinoamericanas para estudiar la comunicación mediada por ordenador en contextos plurilingüísticos.",
    obj_4_title: "Impacto Social",
    obj_4_desc: "Contribuir a la inclusión digital y educativa a través de soluciones tecnológicas accesibles y personalizadas.",
    project_pretitle: "Conoce más",
    project_title: "El Proyecto",
    tab_desc: "Descripción",
    tab_equipo: "Equipo",
    project_what_is: "¿Qué es COPLITELE-IA?",
    project_what_is_p1: "<strong>COPLITELE-IA</strong> (Codiseño, Personalización y Tecnología en la Telecolaboración para el Aprendizaje de Lenguas con IA) es un proyecto de investigación financiado por el Ministerio de Ciencia e Innovación de España (Ref. PID2021-127836NB-I00).",
    project_what_is_p2: "El proyecto examina cómo los enfoques de codiseño participativo, combinados con herramientas de inteligencia artificial, pueden transformar las experiencias de telecolaboración interlingüística, especialmente en contextos de aprendizaje de lenguas extranjeras.",
    project_what_is_p3: "Nuestro enfoque integra la comunicación mediada por ordenador (CMC), el aprendizaje de lenguas asistido por ordenador (CALL) y las tecnologías emergentes de IA, incluidos modelos de lenguaje, análisis de sentimientos y sistemas de retroalimentación automatizada.",
    meta_ref: "Ref. Proyecto",
    meta_duracion: "Duración",
    meta_lider: "Institución Líder",
    meta_financiacion: "Financiación",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Framework de investigación",
    trans_pretitle: "Impacto y difusión",
    trans_title: "Actividades de Transferencia",
    trans_subtitle: "Actividades diseñadas para maximizar el impacto social y educativo de nuestra investigación, conectando la academia con la práctica docente y la sociedad.",
    trans_btn_more: "Ver todas las actividades",
    pub_pretitle: "Biblioteca Científica",
    pub_title: "Producción Científica",
    pub_subtitle: "Accede a las publicaciones del proyecto sincronizadas con nuestra biblioteca de referencias de Zotero.",
    search_placeholder: "Buscar por título, autor o tag...",
    tab_all: "Todas",
    tab_revistas: "Revistas (Zotero)",
    tab_libros: "Libros (Zotero)",
    tab_ponencias: "Ponencias y Congresos",
    rec_pretitle: "Repositorio Abierto",
    rec_title: "Recursos del Proyecto",
    rec_subtitle: "Descarga materiales pedagógicos y herramientas de codiseño desarrolladas durante la investigación.",
    rec_btn_pdf: "Descargar PDF (4.8 MB)",
    rec_btn_zip: "Descargar Plantillas (Zip, 12 MB)",
    rec_btn_git: "Ver Repositorio GitHub",
    colab_title: "Con la colaboración y financiación de:",
    footer_copy: "&copy; 2026 COPLITELE-IA. Proyecto financiado por el Ministerio español de Ciencia e Innovación, desarrollado por el GTE de la UIB y el IRIE."
  },
  ca: {
    menu_inicio: "Inici",
    menu_proyecto: "Projecte",
    menu_impacto: "Impacte i Difusió",
    hero_tag: "Proyecte d’Investigació actiu",
    hero_main_title: "Redissenyam el futur de l'educació amb <span class=\"blue-highlight\">Codisseny</span> i <span class=\"green-highlight\">Intel·ligència Artificial</span>",
    hero_desc: "COPLITELE-IA és un projecte d'investigació que transforma l'educació superior integrant la Intel·ligència Artificial Generativa (IAG) des d'un enfocament pedagògic innovador. A través del codissenyi educatiu entre docents i estudiants, impulsem la personalització de l'aprenentatge mitjançant itineraris flexibles, promovent entorns virtuals connectats que garanteixen l'equitat, la inclusió i la qualitat educativa.",
    btn_conocer: "Conèix el Proyecte",
    btn_publicaciones: "Publicacions",
    news_title: "Últimes notícies",
    news_pretitle: "Actualitat",
    stats_years: "Anys d’investigació",
    stats_investigadores: "Investigadors",
    stats_publicaciones: "Publicacions",
    stats_experiencias: "Experiències",
    progress_label: "Progrés del Projecte",
    submenu_desc: "Descripció",
    submenu_obj: "Objectius",
    submenu_miembros: "Membres",
    submenu_noticias: "Últimes notícies",
    submenu_transferencia: "Transferència",
    submenu_publicaciones: "Producció científica",
    submenu_recursos: "Recursos",
    obj_title: "Objectius del Projecte",
    obj_1_title: "Objectiu Principal",
    obj_1_desc: "Investigar l'impacte de la IA en la telecolaboració interlingüística, analitzant com el codisseny millora els processos d'aprenentatge de llengües.",
    obj_2_title: "Innovació",
    obj_2_desc: "Desenvolupar eines de personalització adaptativa basades en IA per a entorns d'aprenentatge de llengües mediat per tecnologia.",
    obj_3_title: "Abast Internacional",
    obj_3_desc: "Col·laboració amb institucions europees i llatinoamericanes per estudiar la comunicació mediada per ordinador en contextos plurilingües.",
    obj_4_title: "Impacte Social",
    obj_4_desc: "Contribuir a la inclusió digital i educativa a través de solucions tecnològiques accessibles i personalitzades.",
    project_pretitle: "Coneix-ne més",
    project_title: "El Projecte",
    tab_desc: "Descripció",
    tab_equipo: "Equip",
    project_what_is: "Què és COPLITELE-IA?",
    project_what_is_p1: "<strong>COPLITELE-IA</strong> (Codisseny, Personalització i Tecnologia en la Telecolaboració per a l'Aprenentatge de Llengües amb IA) és un projecte d'investigació finançat pel Ministeri de Ciència i Innovació d'Espanya (Ref. PID2021-127836NB-I00).",
    project_what_is_p2: "El projecte examina com els enfocaments de codisseny participatiu, combinats amb eines d'intel·ligència artificial, poden transformar les experiències de telecolaboració interlingüística, especialment en contextos d'aprenentatge de llengües estrangeres.",
    project_what_is_p3: "El nostre enfocament integra la comunicació mediada per ordinador (CMC), l'aprenentatge de llengües assistit per ordinador (CALL) i les tecnologies emergents d'IA, inclosos models de llenguatge, anàlisi de sentiments i sistemes de retroalimentació automatizada.",
    meta_ref: "Ref. Projecte",
    meta_duracion: "Durada",
    meta_lider: "Institució Líder",
    meta_financiacion: "Finançament",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Framework d'investigació",
    trans_pretitle: "Impacte i difusió",
    trans_title: "Activitats de Transferència",
    trans_subtitle: "Activitats dissenyades per maximitzar l'impacte social i educatiu de la nostra investigació, connectant l'acadèmia amb la pràctica docent i la societat.",
    trans_btn_more: "Veure totes les activitats",
    pub_pretitle: "Biblioteca Científica",
    pub_title: "Producció Científica",
    pub_subtitle: "Accedeix a les publicacions del projecte sincronitzades amb la nostra biblioteca de referències de Zotero.",
    search_placeholder: "Cercar por títol, autor o etiqueta...",
    tab_all: "Totes",
    tab_revistas: "Revistes (Zotero)",
    tab_libros: "Llibres (Zotero)",
    tab_ponencias: "Ponències i Congressos",
    rec_pretitle: "Repositori Obert",
    rec_title: "Recursos del Projecte",
    rec_subtitle: "Descarrega materials pedagògics i eines de codisseny desenvolupades durant la investigació.",
    rec_btn_pdf: "Descarregar PDF (4.8 MB)",
    rec_btn_zip: "Descarregar Plantilles (Zip, 12 MB)",
    rec_btn_git: "Veure Repositori GitHub",
    colab_title: "Amb la col·laboració i finançament de:",
    footer_copy: "&copy; 2026 COPLITELE-IA. Projecte finançat pel Ministeri espanyol de Ciència i Innovació, desenvolupat pel GTE de la UIB i l'IRIE."
  },
  en: {
    menu_inicio: "Home",
    menu_proyecto: "Project",
    menu_impacto: "Impact & Dissemination",
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
    stats_experiencias: "Experiencies",
    progress_label: "Project Process",
    submenu_desc: "Description",
    submenu_obj: "Objectives",
    submenu_miembros: "Members",
    submenu_noticias: "Latest news",
    submenu_transferencia: "Transfer",
    submenu_publicaciones: "Scientific production",
    submenu_recursos: "Resources",
    obj_title: "Project Objectives",
    obj_1_title: "Main Objective",
    obj_1_desc: "Investigate the impact of AI in interlingual telecollaboration, analyzing how co-design improves language learning processes.",
    obj_2_title: "Innovation",
    obj_2_desc: "Develop adaptive personalization tools based on AI for technology-mediated language learning environments.",
    obj_3_title: "International Scope",
    obj_3_desc: "Collaboration with European and Latin American institutions to study computer-mediated communication in plurilingual contexts.",
    obj_4_title: "Social Impact",
    obj_4_desc: "Contribute to digital and educational inclusion through accessible and personalized technological solutions.",
    project_pretitle: "Find out more",
    project_title: "The Project",
    tab_desc: "Description",
    tab_equipo: "Team",
    project_what_is: "What is COPLITELE-IA?",
    project_what_is_p1: "<strong>COPLITELE-IA</strong> (Co-design, Personalization, and Technology in Telecollaboration for Language Learning with AI) is a research project funded by the Spanish Ministry of Science and Innovation (Ref. PID2021-127836NB-I00).",
    project_what_is_p2: "The project examines how participatory co-design approaches, combined with artificial intelligence tools, can transform interlingual telecollaboration experiences, especially in foreign language learning contexts.",
    project_what_is_p3: "Our approach integrates computer-mediated communication (CMC), computer-assisted language learning (CALL), and emerging AI technologies, including language models, sentiment analysis, and automated feedback systems.",
    meta_ref: "Project Ref",
    meta_duracion: "Duration",
    meta_lider: "Lead Institution",
    meta_financiacion: "Funding",
    framework_header: "COPLITELE-IA",
    framework_subtitle: "Research Framework",
    trans_pretitle: "Impact and dissemination",
    trans_title: "Transfer Activities",
    trans_subtitle: "Activities designed to maximize the social and educational impact of our research, connecting academia with teaching practice and society.",
    trans_btn_more: "See all activities",
    pub_pretitle: "Scientific Library",
    pub_title: "Scientific Production",
    pub_subtitle: "Access project publications synchronized with our Zotero reference library.",
    search_placeholder: "Search by title, author, or keyword...",
    tab_all: "All",
    tab_revistas: "Journals (Zotero)",
    tab_libros: "Books (Zotero)",
    tab_ponencias: "Presentations & Conferences",
    rec_pretitle: "Open Repository",
    rec_title: "Project Resources",
    rec_subtitle: "Download pedagogical materials and co-design tools developed during the research.",
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
  currentLogoConfig = generateLogoConfig();
  
  // Render in header (small version, isLarge = false)
  const headerLogoWrapper = document.getElementById('header-logo-container');
  if (headerLogoWrapper) {
    headerLogoWrapper.innerHTML = renderLogoSVG(currentLogoConfig, 44, false);
  }
  
  // Render in hero showcase (large version, isLarge = true)
  const heroLogoWrapper = document.getElementById('hero-logo-container');
  if (heroLogoWrapper) {
    heroLogoWrapper.innerHTML = renderLogoSVG(currentLogoConfig, 800, true);
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
  const newsImages = [transferenciaImg, investigadoresImg, congresosImg];
  
  const htmlContent = newsFeedItems.map((item, i) => {
    const text = item.text[currentLang];
    const badgeText = item.tag[currentLang];
    let badgeClass = 'badge-news';
    
    if (item.type === 'revista') badgeClass = 'badge-pub';
    if (item.type === 'transferencia') badgeClass = 'badge-trans';
    
    const imgSrc = newsImages[i % newsImages.length];
    
    return `
      <div class="news-card" data-id="${item.id}" role="button" tabindex="0">
        <div class="news-card-image">
          <img src="${imgSrc}" alt="${badgeText}" loading="lazy">
        </div>
        <div class="news-card-body">
          <span class="news-card-badge ${badgeClass}">${badgeText}</span>
          <p class="news-card-title">${text}</p>
        </div>
      </div>
    `;
  }).join('');
  
  if (newsListHome) {
    newsListHome.innerHTML = htmlContent;
  }
  if (newsListImpact) {
    newsListImpact.innerHTML = htmlContent;
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

function renderTeam() {
  const teamGrid = document.getElementById('team-grid');
  if (!teamGrid) return;
  
  teamGrid.innerHTML = teamMembers.map(member => `
    <article class="team-card" id="card-${member.id}" style="cursor: pointer;">
      <div class="team-photo">
        <img src="${member.photo}" class="photo-color" alt="${member.name}" loading="lazy">
        <img src="${member.photoHover}" class="photo-hover" alt="${member.name}" loading="lazy">
      </div>
      <div class="team-info">
        <span class="team-role">${member.role[currentLang]}</span>
        <h3 class="team-name">${member.name}</h3>
        <p class="team-bio">${member.bio[currentLang].substring(0, 100)}...</p>
        <div class="team-links">
          <button class="btn-small view-member-btn" data-id="${member.id}">${currentLang === 'en' ? 'View Full Profile' : (currentLang === 'ca' ? 'Veure Perfil Complet' : 'Ver Perfil Completo')}</button>
        </div>
      </div>
    </article>
  `).join('');
  
  // Add events to details buttons and whole cards
  document.querySelectorAll('.team-card').forEach(card => {
    const memberId = card.id.replace('card-', '');
    card.addEventListener('click', (e) => {
      // If they clicked the button specifically, we let the button click handler do it
      if (e.target.classList.contains('view-member-btn')) return;
      openMemberModal(memberId);
    });
  });

  document.querySelectorAll('.view-member-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent card click
      const memberId = e.target.getAttribute('data-id');
      openMemberModal(memberId);
    });
  });

  // Dispatch event for custom cursor and reveals to re-bind
  window.dispatchEvent(new Event('content-updated'));
}

let activeTab = 'all';
let searchQuery = '';

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
    
    return matchesSearch;
  });
  
  const mapPubHTML = pub => {
    const labelColorClass = pub.type === 'revista' ? 'blue' : (pub.type === 'libro' ? 'green' : 'teal');
    const extraLabelText = pub.extraLabel[currentLang];
    
    return `
      <article class="activity-card pub-card" data-id="${pub.id}">
        <div class="activity-image-wrapper pub-gradient-header header-${pub.type}">
          <span class="activity-category color-${labelColorClass}">
            ${getPubIcon(pub.type)} ${extraLabelText}
          </span>
        </div>
        <div class="activity-card-body">
          <div class="activity-footer" style="margin-top: 0; margin-bottom: 8px;">
            <div class="activity-footer-item">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              <span>${pub.citation.match(/\((\d{4})\)?/)?.[1] || 'Zotero'}</span>
            </div>
            ${pub.type !== 'ponencia' ? `
            <div class="activity-footer-item">
              <svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 2H2v20h20V2zM12 18H8v-2.5l4-5.5H8V8h6v2.5L10 16h4v2z"/></svg>
              <span>Zotero</span>
            </div>
            ` : ''}
          </div>
          <h3>${pub.title[currentLang]}</h3>
          <p class="activity-desc">${pub.citation}</p>
          <div class="activity-pill-wrapper">
            ${pub.tags.map(tag => `<span class="activity-pill bg-${labelColorClass}-light">${tag.split(' / ')[currentLang === 'es' ? 0 : (currentLang === 'ca' ? 1 : 0)] || tag}</span>`).join('')}
          </div>
          <div class="activity-footer" style="margin-top: auto; padding-top: 15px;">
            <button class="btn-small view-pub-btn" style="width: 100%; justify-content: center;" data-id="${pub.id}">Ver Ficha Zotero</button>
          </div>
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
  document.querySelectorAll('.view-pub-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pubId = e.target.getAttribute('data-id');
      openPubModal(pubId);
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
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span class="member-role-badge ${member.role.en.toLowerCase().includes('principal') ? 'badge-ip' : 'badge-member'}">
            ${member.role[currentLang]}
          </span>
        </div>
        <h3 style="font-size: 24px; font-weight: 850; margin: 0; color: var(--color-text-light);">${member.name}</h3>
        <p style="font-size: 13.5px; font-weight: 550; color: var(--color-blue); margin: 4px 0 0 0;">${member.title[currentLang]}</p>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal" style="font-size: 24px;">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-member-layout" style="display: grid; grid-template-columns: 160px 1fr; gap: 24px; margin-bottom: 24px; align-items: start;">
        <div class="modal-member-photo-wrapper" style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid var(--color-border-light);">
          <img src="${member.photo}" alt="${member.name}" style="width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block;">
        </div>
        <div>
          <p style="margin-top: 0; margin-bottom: 16px; font-size: 14.5px; line-height: 1.6; color: var(--color-text-muted-light);">${member.bio[currentLang]}</p>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 10px;">
            <a href="mailto:${member.email}" class="member-contact-link email-btn" title="Email">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a href="https://orcid.org/${member.orcid}" target="_blank" class="member-contact-link orcid-btn" title="ORCID">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.541 0 .954.212 1.238.636.284.424.426.974.426 1.65 0 .67-.142 1.218-.426 1.644-.284.426-.697.639-1.238.639-.547 0-.961-.213-1.244-.639a2.766 2.766 0 0 1-.426-1.644c0-.676.142-1.226.426-1.65.283-.424.697-.636 1.244-.636zm-.437 6.136h.885v3.136h-.885V10.514zm11.393.993c0 .548-.121 1.026-.363 1.436-.242.41-.577.728-1.006.953-.428.225-.921.338-1.478.338-.642 0-1.189-.153-1.643-.459a2.723 2.723 0 0 1-1.054-1.261h-.06v1.545h-.854V4.76h2.247c.597 0 1.11.113 1.54.339.428.226.757.545.986.957.228.411.343.896.343 1.455 0 .428-.073.816-.219 1.164a2.296 2.296 0 0 1-.617.868c.287.162.528.384.723.666.195.281.338.608.428.981a5.05 5.05 0 0 1 .135 1.037l-.001.28zm-3.056-4.992c0-.404-.085-.723-.255-.956-.169-.233-.423-.349-.762-.349h-.979v2.609h.979c.339 0 .593-.116.762-.349.17-.233.255-.552.255-.955zm.406 3.655c0-.43-.092-.767-.276-1.011-.184-.244-.455-.366-.812-.366h-.979v2.756h.979c.357 0 .628-.122.812-.366.184-.244.276-.582.276-1.013z"/>
              </svg>
            </a>
            <a href="${member.researchgate}" target="_blank" class="member-contact-link rg-btn" title="ResearchGate">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19.5 0h-15C2.015 0 0 2.015 0 4.5v15C0 21.985 2.015 24 4.5 24h15c2.485 0 4.5-2.015 4.5-4.5v-15C24 2.015 21.985 0 19.5 0zM8.76 16.24c-1.34 0-2.42-1.08-2.42-2.42s1.08-2.42 2.42-2.42c.46 0 .89.13 1.25.35V9.45c-.36-.12-.74-.18-1.25-.18-2.61 0-4.73 2.12-4.73 4.73s2.12 4.73 4.73 4.73c.96 0 1.83-.29 2.56-.8v-3.05c-.65.71-1.57 1.3-2.56 1.3zm7.84-6.97c-.96 0-1.83.29-2.56.8v3.05c.65-.71 1.57-1.3 2.56-1.3 1.34 0 2.42 1.08 2.42 2.42s-1.08 2.42-2.42 2.42c-.46 0-.89-.13-1.25-.35v2.3c.36.12.74.18 1.25.18 2.61 0 4.73-2.12 4.73-4.73s-2.12-4.73-4.73-4.73z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid var(--color-border-light); padding-top: 20px;">
        <h4 style="margin-top: 0; margin-bottom: 12px; font-family: var(--font-primary); font-size: 14.5px; font-weight: 700;">
          ${currentLang === 'en' ? 'Publications in this project:' : (currentLang === 'ca' ? 'Publicacions en aquest projecte:' : 'Publicaciones en este proyecto:')}
        </h4>
        <ul style="padding-left: 20px; font-size: 13.5px; line-height: 1.5; color: var(--color-text-muted-light); margin: 0;">
          ${publications
            .filter(pub => {
              // Match author last name (robust check)
              const lastName = member.name.split(' ').slice(-2, -1)[0] || member.name.split(' ').pop();
              const cleanLastName = lastName.replace('í', 'i').replace('é', 'e').replace('ó', 'o').replace('á', 'a').replace('ú', 'u');
              return pub.citation.toLowerCase().includes(lastName.toLowerCase()) || 
                     pub.citation.toLowerCase().includes(cleanLastName.toLowerCase());
            })
            .map(pub => `<li style="margin-bottom: 8px;"><strong>${pub.citation.match(/\((\d{4})\)/)?.[0] || ''}</strong> ${pub.title[currentLang]}</li>`)
            .join('') || `<li style="list-style:none; padding-left:0; margin-left:-20px;">${currentLang === 'en' ? 'No individual publications registered yet.' : (currentLang === 'ca' ? 'No s\'han registrat publicacions individuals encara.' : 'No se registraron publicaciones individuales todavía.')}</li>`}
        </ul>
      </div>
    </div>
  `;
  
  adaptModalColors(modalContent);
  modal.showModal();
  setupModalClose(modal);
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

function setupModalClose(modal) {
  const closeBtn = modal.querySelector('#modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.close();
    });
  }
  
  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
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
  const handleScroll = () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Scroll-driven logo scaling
    const maxScroll = 250;
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    
    const heroLogo = document.getElementById('hero-logo-container');
    const headerLogo = document.getElementById('header-logo-container');
    
    if (heroLogo) {
      heroLogo.style.transform = `scale(${1 - progress})`;
      heroLogo.style.opacity = `${1 - progress}`;
    }
    if (headerLogo) {
      headerLogo.style.transform = `scale(${progress})`;
      headerLogo.style.opacity = `${progress}`;
      headerLogo.style.pointerEvents = progress > 0.15 ? 'auto' : 'none';
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once to initialize correct scaling on reload


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
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      renderPublications();
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

  // 5.12 Stat row redirection routing clicks
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const label = item.querySelector('.stat-label').getAttribute('data-i18n');
      if (label === 'stats_years') {
        window.location.hash = '#/proyecto#proyecto';
      } else if (label === 'stats_investigadores') {
        window.location.hash = '#/proyecto#equipo';
      } else if (label === 'stats_experiencias') {
        window.location.hash = '#/impacto#transferencia';
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
  if (path.startsWith('actividad/')) {
    detailId = path.substring('actividad/'.length);
    path = 'actividad-detalle';
  }
  
  // Redirect old routes to unified #/impacto with anchors
  if (path === 'transferencia' || path === 'publicaciones' || path === 'recursos') {
    window.location.hash = `#/impacto#${path}`;
    return;
  }
  
  // Hide all simulated views
  const views = document.querySelectorAll('.spa-view');
  views.forEach(v => v.classList.remove('active'));
  
  // Show target SPA view
  const targetView = document.getElementById(`view-${path}`);
  if (targetView) {
    targetView.classList.add('active');
  } else {
    const homeView = document.getElementById('view-inicio');
    if (homeView) homeView.classList.add('active');
    path = 'inicio';
  }
  
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

function renderTransferActivities() {
  const activitiesGrid = document.getElementById('activities-grid');
  const homeActivitiesGrid = document.getElementById('home-activities-grid');
  
  if (activitiesGrid) {
    activitiesGrid.innerHTML = transferActivities.map(act => `
      <article class="activity-card" data-id="${act.id}">
        <div class="activity-image-wrapper">
          <img src="${act.image}" alt="${act.title[currentLang]}" loading="lazy">
          <span class="activity-category color-${act.type === 'taller' ? 'blue' : (act.type === 'seminario' ? 'teal' : 'green')}">
            ${getActivityIcon(act.type)} ${act.tag[currentLang]}
          </span>
        </div>
        <div class="activity-card-body">
          <h3>${act.title[currentLang]}</h3>
          <p class="activity-desc">${act.desc[currentLang]}</p>
          <div class="activity-pill-wrapper">
            ${act.pills.map(p => `<span class="activity-pill bg-${act.type === 'taller' ? 'blue' : (act.type === 'seminario' ? 'teal' : 'green')}-light">${p}</span>`).join('')}
          </div>
          <div class="activity-footer">
            <div class="activity-footer-item">
              <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              <span>${act.date}</span>
            </div>
            <div class="activity-footer-item">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>${act.location}</span>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }
  
  if (homeActivitiesGrid) {
    homeActivitiesGrid.innerHTML = transferActivities.slice(0, 3).map(act => `
      <article class="activity-card" data-id="${act.id}">
        <div class="activity-image-wrapper">
          <img src="${act.image}" alt="${act.title[currentLang]}" loading="lazy">
          <span class="activity-category color-${act.type === 'taller' ? 'blue' : (act.type === 'seminario' ? 'teal' : 'green')}">
            ${getActivityIcon(act.type)} ${act.tag[currentLang]}
          </span>
        </div>
        <div class="activity-card-body">
          <h3>${act.title[currentLang]}</h3>
          <p class="activity-desc">${act.desc[currentLang]}</p>
          <div class="activity-pill-wrapper">
            ${act.pills.map(p => `<span class="activity-pill bg-${act.type === 'taller' ? 'blue' : (act.type === 'seminario' ? 'teal' : 'green')}-light">${p}</span>`).join('')}
          </div>
          <div class="activity-footer">
            <div class="activity-footer-item">
              <svg viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
              <span>${act.date}</span>
            </div>
          </div>
        </div>
      </article>
    `).join('');
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
}

function renderActivityDetail(id) {
  const activity = transferActivities.find(a => a.id === id);
  const detailContainer = document.getElementById('view-actividad-detalle');
  if (!detailContainer || !activity) return;
  
  detailContainer.innerHTML = `
    <div class="section-container" style="max-width: 800px; padding: 40px 20px;">
      <a href="#/impacto#transferencia" class="btn-outline-blue" style="margin-bottom: 30px;">
        &larr; ${currentLang === 'en' ? 'Back to Transfer' : (currentLang === 'ca' ? 'Tornar a Transferència' : 'Volver a Transferencia')}
      </a>
      
      <div class="image-showcase" style="aspect-ratio: 16 / 9; margin-bottom: 30px; border-radius: 24px;">
        <img src="${activity.image}" alt="${activity.title[currentLang]}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 20px;">
        <span class="activity-category color-${activity.type === 'taller' ? 'blue' : (activity.type === 'seminario' ? 'teal' : 'green')}" style="position: static; background: rgba(255, 255, 255, 0.05); padding: 6px 12px; border-radius: 12px; font-weight: 800; font-size: 11px;">
          ${activity.tag[currentLang]}
        </span>
        <span style="font-size: 13.5px; color: var(--color-text-muted-light);">${activity.date}</span>
        <span style="font-size: 13.5px; color: var(--color-text-muted-light);">|</span>
        <span style="font-size: 13.5px; color: var(--color-text-muted-light);">${activity.location}</span>
      </div>
      
      <h1 style="font-size: clamp(26px, 4vw, 36px); margin-bottom: 24px; color: var(--color-text-light); font-family: var(--font-primary); font-weight: 800; line-height: 1.25;">
        ${activity.title[currentLang]}
      </h1>
      
      <div class="activity-detail-lorem" style="font-size: 15.5px; line-height: 1.8; color: var(--color-text-light); text-align: justify; white-space: pre-line;">
        ${activity.loremIpsum[currentLang]}
      </div>
    </div>
  `;
  
  // Correct body styles for light/dark modes
  if (document.body.classList.contains('dark-mode')) {
    detailContainer.querySelectorAll('h1, .activity-detail-lorem').forEach(el => {
      el.style.color = 'var(--color-text-dark)';
    });
  } else {
    detailContainer.querySelectorAll('h1, .activity-detail-lorem').forEach(el => {
      el.style.color = 'var(--color-text-light)';
    });
  }
}


function initSubmenuScrollObserver() {
  const sections = [
    document.getElementById('proyecto'),
    document.getElementById('objetivos'),
    document.getElementById('equipo'),
    document.getElementById('noticias'),
    document.getElementById('transferencia'),
    document.getElementById('publicaciones'),
    document.getElementById('recursos')
  ].filter(Boolean);

  const observerOptions = {
    root: null,
    rootMargin: '-120px 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLinks = document.querySelectorAll(`.submenu-link`);
        activeLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.endsWith(`#${id}`)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}


/* ----------------------------------------------------
   UPDATED CUSTOM SYSTEMS (Custom Glow Cursor, Scroll Reveals)
   ---------------------------------------------------- */

function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';
  document.body.appendChild(follower);
  
  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  function animateFollower() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  
  const updateHoverEvents = () => {
    document.querySelectorAll('a, button, [role="button"], .team-card, .activity-card, #hero-logo-container, .logo-wrapper, .submenu-link').forEach(el => {
      el.removeEventListener('mouseenter', addHoverClass);
      el.removeEventListener('mouseleave', removeHoverClass);
      
      el.addEventListener('mouseenter', addHoverClass);
      el.addEventListener('mouseleave', removeHoverClass);
    });
  };
  
  function addHoverClass() {
    document.body.classList.add('custom-cursor-hover');
  }
  function removeHoverClass() {
    document.body.classList.remove('custom-cursor-hover');
  }
  
  updateHoverEvents();
  window.addEventListener('content-updated', updateHoverEvents);
}

function initScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      } else {
        const rect = entry.target.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          entry.target.classList.remove('reveal-visible');
        }
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
  
  const setupReveals = () => {
    document.querySelectorAll('section, .page-section, .hero-stats-row, .section-nav-grid, .team-card, .activity-card, .objective-card, .resource-card, .framework-card').forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  };
  
  setupReveals();
  window.addEventListener('content-updated', setupReveals);
}
