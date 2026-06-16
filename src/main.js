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
    id: "maria-gomez",
    name: "Dra. Maria Gómez",
    role: {
      es: "Directora del Proyecto",
      ca: "Directora del Projecte",
      en: "Project Director"
    },
    bio: {
      es: "Doctora en Tecnología Educativa por la UIB. Especialista en metodologías participativas y codiseño de entornos inteligentes de aprendizaje. Coordina la vinculación del proyecto con las escuelas.",
      ca: "Doctora en Tecnologia Educativa per la UIB. Especialista en metodologies participatives i codisseny d'entorns intel·ligents d'aprenentatge. Coordina la vinculació del projecte amb les escoles.",
      en: "PhD in Educational Technology from UIB. Specialist in participatory methodologies and co-design of smart learning environments. She coordinates project partnerships with schools."
    },
    email: "maria.gomez@uib.es",
    orcid: "0000-0002-1823-9922",
    researchgate: "https://researchgate.net/profile/Maria-Gomez",
    photo: investigadoresImg
  },
  {
    id: "alberto-rodriguez",
    name: "Dr. Alberto Rodríguez",
    role: {
      es: "Investigador Principal",
      ca: "Investigador Principal",
      en: "Lead Researcher"
    },
    bio: {
      es: "Doctor en Informática. Su campo de investigación es la Inteligencia Artificial aplicada a la personalización de contenidos y a la analítica de aprendizaje en educación superior.",
      ca: "Doctor en Informàtica. El seu camp d'investigació és la Intel·ligència Artificial aplicada a la personalització de continguts i a l'analítica d'aprenentatge en educació superior.",
      en: "PhD in Computer Science. His research field is Artificial Intelligence applied to content personalization and learning analytics in higher education."
    },
    email: "alberto.rodriguez@uib.es",
    orcid: "0000-0003-4902-8812",
    researchgate: "https://researchgate.net/profile/Alberto-Rodriguez",
    photo: investigadoresImg
  },
  {
    id: "lucas-martinez",
    name: "Dr. Lucas Martínez",
    role: {
      es: "Investigador en IA",
      ca: "Investigador en IA",
      en: "AI Researcher"
    },
    bio: {
      es: "Especialista en procesamiento del lenguaje natural y modelado de estudiante. Desarrolla los algoritmos predictivos adaptativos del proyecto.",
      ca: "Especialista en processament del llenguatge natural i modelatge d'estudiant. Desenvolupa els algorismes predictius adaptatius del projecte.",
      en: "Specialist in natural language processing and student modeling. He develops the project's predictive adaptive algorithms."
    },
    email: "lucas.martinez@uib.es",
    orcid: "0000-0001-9922-3844",
    researchgate: "https://researchgate.net/profile/Lucas-Martinez",
    photo: investigadoresImg
  },
  {
    id: "sara-vidal",
    name: "Sara Vidal",
    role: {
      es: "Diseñadora UX / Facilitadora",
      ca: "Dissenyadora UX / Facilitadora",
      en: "UX Designer / Facilitator"
    },
    bio: {
      es: "Máster en Diseño de Interacción. Dirige los talleres de codiseño con profesorado y alumnado, traduciendo requisitos pedagógicos en wireframes interactivos.",
      ca: "Màster en Disseny d'Interacció. Dirigeix els tallers de codisseny amb professorat i alumnat, traduint requisits pedagògics en wireframes interactius.",
      en: "Master in Interaction Design. Leads the co-design workshops with teachers and students, translating pedagogical requirements into interactive wireframes."
    },
    email: "sara.vidal@uib.es",
    orcid: "0000-0002-3811-1922",
    researchgate: "https://researchgate.net/profile/Sara-Vidal",
    photo: investigadoresImg
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
    citation: "Gómez, M., & Rodríguez, A. (2025). Revista de Educación y Tecnología, 14(2), 120-138.",
    abstract: {
      es: "Este artículo explora un marco metodológico para el codiseño de plataformas virtuales donde estudiantes y docentes participan activamente en la parametrización de algoritmos de inteligencia artificial para personalizar trayectorias de aprendizaje. Se detalla un estudio de caso en dos centros de secundaria y las percepciones de control de los usuarios frente al algoritmo.",
      ca: "Aquest article explora un marc metodològic per al codisseny de plataformes virtuals on estudiants i docents participen activament en la parametrització d'algorismes d'intel·ligència artificial per personalitzar trajectòries d'aprenentatge. Es detalla un estudi de cas en dos centres de secundària i les percepcions de control dels usuaris enfront de l'algorisme.",
      en: "This article explores a methodological framework for the co-design of virtual platforms where students and teachers actively participate in configuring artificial intelligence algorithms to personalize learning pathways. A case study in two secondary schools and users' perceptions of control over the algorithm are detailed."
    },
    doi: "10.1016/j.edutec.2025.101230",
    tags: ["Codiseño / Codisseny", "Inteligencia Artificial / IA", "Educación / Educació"],
    zoteroKey: "GOM2025",
    extraLabel: {
      es: "Revistas (Zotero)",
      ca: "Revistes (Zotero)",
      en: "Journals (Zotero)"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/GOM2025"
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
    citation: "Martínez, L., Vidal, S., & Gómez, M. (2024). Pixel-Bit: Revista de Medios y Educación, 69, 45-78.",
    doi: "10.12795/pixelbit.2024.10189",
    tags: ["Co-creación / Co-creació", "Tecnología / Tecnologia", "Usabilidad / Usabilitat"],
    zoteroKey: "MAR2024",
    extraLabel: {
      es: "Revistas (Zotero)",
      ca: "Revistes (Zotero)",
      en: "Journals (Zotero)"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/MAR2024"
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
    citation: "Gómez, M. (2024). Editorial UIB, Palma de Mallorca.",
    isbn: "978-84-8384-498-3",
    tags: ["Manual", "Codiseño / Codisseny", "Aulas / Aules"],
    zoteroKey: "GOM2024b",
    extraLabel: {
      es: "Libros (Zotero)",
      ca: "Llibres (Zotero)",
      en: "Books (Zotero)"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/GOM2024b"
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
    citation: "Rodríguez, A. (Ed.). (2025). Octaedro Editorial.",
    isbn: "978-84-19023-88-2",
    tags: ["IA", "Docencia / Docència", "Innovación / Innovació"],
    zoteroKey: "ROD2025b",
    extraLabel: {
      es: "Libros (Zotero)",
      ca: "Llibres (Zotero)",
      en: "Books (Zotero)"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/ROD2025b"
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
      ca: "Aquest article analitza la implementació tècnica d'interfícies configurades dinàmicament a través de tallers de codisseny. Presentem un marc de telemetria dissenyat per equilibrar les recomanacions automàtiques d'IA amb els ajustaments manuals del docent en temps real.",
      en: "This paper analyzes the technical implementation of interfaces configured dynamically through co-design workshops. We present a telemetry framework designed to balance agentic AI recommendations with manual teacher overrides in real-time."
    },
    citation: "Presented at International Conference on Educational Technology (ICET), Paris, 2024.",
    event: "ICET 2024, París",
    tags: ["UI", "Automation", "Agency"],
    zoteroKey: "ICET2024",
    extraLabel: {
      es: "Ponencia",
      ca: "Ponència",
      en: "Presentation"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/ICET2024"
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
      ca: "Presentació de resultats del prototipat ràpid d'assistents intel·ligents en tres instituts de Mallorca, detallant la metodologia de codisseny per fases (exploració, co-creació, avaluació) i l'acollida dels quadres de comandament.",
      en: "Presentation of results from rapid prototyping of intelligent assistants in three high schools in Mallorca, detailing the phased co-design methodology (exploration, co-creation, evaluation) and the acceptance of dashboard controls."
    },
    citation: "Vidal, S. & Martínez, L. (2025). Ponencia en el Congreso Nacional de Investigación Educativa, Madrid.",
    event: "CNIE 2025, Madrid",
    tags: ["Asistentes / Assistents", "Secundaria / Secundària", "Prototipado / Prototipat"],
    zoteroKey: "VID2025",
    extraLabel: {
      es: "Ponencia",
      ca: "Ponència",
      en: "Presentation"
    },
    zoteroUrl: "https://www.zotero.org/groups/coplitele-ia/items/VID2025"
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
    type: "news",
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
    type: "transferencia",
    tag: { es: "Transferencia", ca: "Transferència", en: "Transfer" },
    text: {
      es: "Sesión de transferencia tecnológica con inspectores y directores del IRIE sobre soberanía digital.",
      ca: "Sessió de transferència tecnològica amb inspectors i directors de l'IRIE sobre sobirania digital.",
      en: "Technology transfer session with inspectors and directors of IRIE on digital sovereignty."
    },
    activityId: "act-6"
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
    menu_transferencia: "Transferencia",
    menu_publicaciones: "Producción Científica",
    menu_recursos: "Recursos",
    hero_tag: "Proyecto de Investigación Activo",
    hero_desc: "El proyecto <strong>COPLITELE-IA</strong> investiga el codiseño, la personalización y la integración de tecnologías de inteligencia artificial en contextos de telecolaboración para el aprendizaje de lenguas. Un enfoque innovador que une tecnología, lingüística y pedagogía.",
    btn_conocer: "Conocer el Proyecto",
    btn_publicaciones: "Publicaciones",
    news_title: "Últimas Noticias & Actividades",
    stats_years: "Años de investigación",
    stats_investigadores: "Investigadores",
    stats_publicaciones: "Publicaciones",
    stats_instituciones: "Instituciones",
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
    menu_transferencia: "Transferència",
    menu_publicaciones: "Producció Científica",
    menu_recursos: "Recursos",
    hero_tag: "Projecte d'Investigació Actiu",
    hero_desc: "El projecte <strong>COPLITELE-IA</strong> investiga el codisseny, la personalització i la integració de tecnologies d'intel·ligència artificial en contextos de telecolaboració per a l'aprenentatge de llengües. Un enfocament innovador que uneix tecnologia, lingüística i pedagogia.",
    btn_conocer: "Conèixer el Projecte",
    btn_publicaciones: "Publicacions",
    news_title: "Últimes Notícies & Activitats",
    stats_years: "Anys d'investigació",
    stats_investigadores: "Investigadors",
    stats_publicaciones: "Publicacions",
    stats_instituciones: "Institucions",
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
    project_what_is_p3: "El nostre enfocament integra la comunicació mediada per ordinador (CMC), l'aprenentatge de llengües assistit per ordinador (CALL) i les tecnologies emergents d'IA, inclosos models de llenguatge, anàlisi de sentiments i sistemes de retroalimentació automatitzada.",
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
    search_placeholder: "Cercar per títol, autor o etiqueta...",
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
    menu_transferencia: "Transfer",
    menu_publicaciones: "Scientific Production",
    menu_recursos: "Resources",
    hero_tag: "Active Research Project",
    hero_desc: "The <strong>COPLITELE-IA</strong> project investigates the co-design, personalization, and integration of artificial intelligence technologies in interlingual telecollaboration settings for language learning. An innovative approach uniting technology, linguistics, and pedagogy.",
    btn_conocer: "Explore Project",
    btn_publicaciones: "Publications",
    news_title: "Latest News & Activities",
    stats_years: "Years of research",
    stats_investigadores: "Researchers",
    stats_publicaciones: "Publications",
    stats_instituciones: "Institutions",
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
let rotationRequestFrame = null;

function animateRotation() {
  if (isRotating) {
    currentRotation = (currentRotation + rotationSpeed) % 360;
  } else {
    // Easing deceleration to 0
    if (currentRotation > 0.15 || currentRotation < -0.15) {
      let target = currentRotation > 180 ? 360 : 0;
      currentRotation += (target - currentRotation) * 0.06;
      if (currentRotation >= 359.85) currentRotation = 0;
    } else {
      currentRotation = 0;
    }
  }
  
  const rotatingGroups = document.querySelectorAll('.logo-rotating-group');
  rotatingGroups.forEach(g => {
    g.style.transform = `rotate(${currentRotation}deg)`;
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
  isRotating = true; // Start rotation
  
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
  isRotating = false; // Stop rotation and ease to 0
  
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
    { key: 'menu_inicio', hash: '#inicio' },
    { key: 'menu_proyecto', hash: '#proyecto' },
    { key: 'menu_transferencia', hash: '#transferencia' },
    { key: 'menu_publicaciones', hash: '#publicaciones' },
    { key: 'menu_recursos', hash: '#recursos' }
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
  const newsList = document.getElementById('latest-news-list');
  if (!newsList) return;
  
  // Images for news cards (cycle through imported assets)
  const newsImages = [transferenciaImg, investigadoresImg, congresosImg];
  
  newsList.innerHTML = newsFeedItems.map((item, i) => {
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
    <article class="team-card" id="card-${member.id}">
      <div class="team-photo">
        <img src="${member.photo}" alt="${member.name}" loading="lazy" onerror="this.src='https://placehold.co/400x300/1e293b/7ce4e0?text=${encodeURIComponent(member.name)}'">
      </div>
      <div class="team-info">
        <span class="team-role">${member.role[currentLang]}</span>
        <h3 class="team-name">${member.name}</h3>
        <p class="team-bio">${member.bio[currentLang].substring(0, 100)}...</p>
        <div class="team-links">
          <button class="btn-small view-member-btn" data-id="${member.id}">Ver Perfil Completo</button>
        </div>
      </div>
    </article>
  `).join('');
  
  // Add events to details buttons
  document.querySelectorAll('.view-member-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const memberId = e.target.getAttribute('data-id');
      openMemberModal(memberId);
    });
  });
}

let activeTab = 'all';
let searchQuery = '';

function renderPublications() {
  const pubGrid = document.getElementById('publications-grid');
  const homePubGrid = document.getElementById('home-publications-grid');
  
  // Filter by tab and search
  const filtered = publications.filter(pub => {
    const matchesTab = activeTab === 'all' || pub.type === activeTab;
    
    const titleText = pub.title[currentLang].toLowerCase();
    const citationText = pub.citation.toLowerCase();
    const abstractText = pub.abstract[currentLang].toLowerCase();
    
    const matchesSearch = searchQuery === '' || 
      titleText.includes(searchQuery) ||
      citationText.includes(searchQuery) ||
      abstractText.includes(searchQuery) ||
      pub.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    
    return matchesTab && matchesSearch;
  });
  
  const mapPubHTML = pub => {
    let typeIcon = '';
    if (pub.type === 'revista') {
      typeIcon = `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`;
    } else if (pub.type === 'libro') {
      typeIcon = `<svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`;
    } else {
      typeIcon = `<svg viewBox="0 0 24 24"><path d="M19 18H5V6h3v2H6v8h12v-2h2v3c0 1.1-.9 2-2 2zM17 6H9c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 8H9V8h8v6z"/></svg>`;
    }
    
    const labelColorClass = pub.type === 'revista' ? 'var(--color-blue)' : (pub.type === 'libro' ? 'var(--color-green)' : 'var(--color-teal)');
    const extraLabelText = pub.extraLabel[currentLang];
    
    return `
      <div class="pub-card" data-id="${pub.id}">
        <div class="pub-type-badge" style="color: ${labelColorClass}">
          ${typeIcon}
        </div>
        <div class="pub-content">
          <div class="pub-meta">
            <span class="pub-tag" style="color: ${labelColorClass}">${extraLabelText}</span>
            <span class="pub-year">${pub.citation.match(/\((\d{4})\)?/)?.[1] || 'Zotero'}</span>
            ${pub.type !== 'ponencia' ? `
              <span class="pub-zotero-tag">
                <svg viewBox="0 0 24 24"><path d="M22 2H2v20h20V2zM12 18H8v-2.5l4-5.5H8V8h6v2.5L10 16h4v2z"/></svg>
                Zotero
              </span>
            ` : ''}
          </div>
          <h4 class="pub-title">${pub.title[currentLang]}</h4>
          <p class="pub-citation">${pub.citation}</p>
          <div class="pub-tags">
            ${pub.tags.map(tag => `<span class="pub-keyword">${tag.split(' / ')[currentLang === 'es' ? 0 : (currentLang === 'ca' ? 1 : 0)] || tag}</span>`).join('')}
          </div>
        </div>
        <div class="pub-actions">
          <button class="btn-small view-pub-btn" data-id="${pub.id}">Ver Ficha Zotero</button>
        </div>
      </div>
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

// ----------------------------------------------------
// 4. DIALOG MODAL CONTROLLERS (Accessibility-focused)
// ----------------------------------------------------

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
        <span class="modal-meta-label">${member.role[currentLang]}</span>
        <h3>${member.name}</h3>
      </div>
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar modal">&times;</button>
    </div>
    <div class="modal-body">
      <div style="display: grid; grid-template-columns: 140px 1fr; gap: 24px; margin-bottom: 24px; align-items: start;">
        <img src="${member.photo}" alt="${member.name}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 20px;" onerror="this.src='https://placehold.co/150x150/1e293b/7ce4e0?text=Logo'">
        <div>
          <p style="margin-bottom: 12px; font-weight: 500; color: var(--color-text-light);">${member.bio[currentLang]}</p>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
            <div><strong>Email:</strong> <a href="mailto:${member.email}" style="color: var(--color-blue); text-decoration: none;">${member.email}</a></div>
            <div><strong>ORCID:</strong> <a href="https://orcid.org/${member.orcid}" target="_blank" style="color: var(--color-blue); text-decoration: none;">${member.orcid}</a></div>
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid var(--color-border-light); padding-top: 20px;">
        <h4 style="margin-bottom: 12px; font-family: var(--font-primary);">${currentLang === 'en' ? 'Publications in this project:' : (currentLang === 'ca' ? 'Publicacions en aquest projecte:' : 'Publicaciones en este proyecto:')}</h4>
        <ul style="padding-left: 20px; font-size: 13.5px; line-height: 1.5; color: var(--color-text-muted-light);">
          ${publications
            .filter(pub => pub.citation.includes(member.name.split(' ').pop()))
            .map(pub => `<li style="margin-bottom: 8px;"><strong>${pub.citation.match(/\((\d{4})\)/)?.[0] || ''}</strong> ${pub.title[currentLang]}</li>`)
            .join('') || `<li style="list-style:none; padding-left:0; margin-left:-20px;">${currentLang === 'en' ? 'No individual publications registered yet.' : (currentLang === 'ca' ? 'No s\'han registrat publicacions individuals encara.' : 'No se registraron publicaciones individuales todavía.')}</li>`}
        </ul>
      </div>
    </div>
  `;
  
  // Apply dark mode adaptations dynamically
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
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });


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
      if (label === 'stats_years' || label === 'stats_instituciones') {
        window.location.hash = '#/proyecto';
        const projTabDescBtn = document.getElementById('project-tab-desc');
        if (projTabDescBtn) projTabDescBtn.click();
      } else if (label === 'stats_investigadores') {
        window.location.hash = '#/proyecto';
        const projTabTeamBtn = document.getElementById('project-tab-team');
        if (projTabTeamBtn) projTabTeamBtn.click();
      } else if (label === 'stats_publicaciones') {
        window.location.hash = '#/publicaciones';
      }
    });
  });

  // 5.13 Initialize SPA routing
  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('load', handleRouting);
  handleRouting();
});

// ----------------------------------------------------
// 6. SPA ROUTING RENDERING FUNCTIONS
// ----------------------------------------------------

function handleRouting() {
  const rawHash = window.location.hash || '#/';
  
  // Clean hash to extract route name (e.g. '#/proyecto' -> 'proyecto', '#proyecto' -> 'proyecto')
  let path = rawHash.replace(/^#\/?/, '') || 'inicio';
  
  let detailId = null;
  if (path.startsWith('actividad/')) {
    detailId = path.substring('actividad/'.length);
    path = 'actividad-detalle';
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
      if (path === linkPath || (path === 'inicio' && linkPath === 'inicio') || (path === 'actividad-detalle' && linkPath === 'transferencia')) {
        link.classList.add('active');
      }
    }
  });
  
  // Reset scroll
  window.scrollTo({ top: 0, behavior: 'instant' });
  
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
      <a href="#/transferencia" class="btn-outline-blue" style="margin-bottom: 30px;">
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
