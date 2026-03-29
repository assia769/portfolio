export const personal = {
  name: "Assia Houbbadi",
  title: "Ingénieure Informatique",
  subtitle: "Full Stack Developer · Leader · Innovatrice",
  email: "ahoubbadi139@gmail.com",
  phone: "+212 713 306 509",
  location: "Khouribga, Maroc",
  birthdate: "07 juillet 2004",
  nationality: "Marocaine",
  cv: "/cv.pdf",
  image: "/images/profile.png",
  github: "https://github.com/assia769",
  linkedin: "https://www.linkedin.com/in/assia-houbbadi-6726b0272/",
  tagline: "Je construis des expériences digitales qui changent le monde.",
};

export const education = [
  {
    school: "ENSAKH",
    full: "École Nationale des Sciences Appliquées de Khouribga",
    degree: "Cycle Ingénieur — Génie Informatique",
    period: "2024 – présent",
    icon: "🎓",
  },
  {
    school: "ENSAKH",
    full: "École Nationale des Sciences Appliquées de Khouribga",
    degree: "Cycle Préparatoire Intégré",
    period: "2022 – 2024",
    icon: "📐",
  },
  {
    school: "Lycée Al Kindi",
    full: "Lycée Al Kindi",
    degree: "Baccalauréat Sciences Physiques — Mention Très Bien",
    period: "2021 – 2022",
    icon: "⭐",
  },
];

export const experiences = [
  {
    company: "Assojet",
    location: "Khmisset",
    role: "Stage de Fin d'Année",
    period: "Juil – Août 2025",
    description:
      "Conception, développement et déploiement d'une plateforme complète de gestion de cabinet médical.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    bullets: [
      "Application full stack : gestion patients, médecins, rendez-vous",
      "Système d'authentification et de rôles utilisateurs",
      "Déploiement complet en production",
    ],
  },
  {
    company: "Polmlek / Jibal",
    location: "Fkih Ben Saleh",
    role: "Stage d'Initiation",
    period: "Juillet 2024",
    description:
      "Développement d'une plateforme web de vente et gestion de bovins dans le milieu industriel agri.",
    tags: ["HTML", "CSS", "JavaScript"],
    bullets: [
      "Application web de gestion du bétail",
      "Découverte du milieu industriel",
      "Livraison complète de la solution",
    ],
  },
];

export const projects = [
  // ─── FEATURED ────────────────────────────────────────────
  {
    title: "DFCraft",
    subtitle: "Website & Extension Next.js",
    description:
      "Mon premier projet personnel déployé — un website et une extension Next.js que j'ai conçus et déployés en production en 2026.",
    tags: ["Next.js", "TypeScript", "Extension Chrome"],
    images: ["/images/dfcraft/1.png", "/images/dfcraft/2.png"],
    video: null,
    featured: true,
    year: "2026",
    link: "#",
  },
  {
    title: "Marinova",
    subtitle: "Hult Prize 2026 — 2nd Runner Up 🏆",
    description:
      "Projet innovant de réutilisation des sardines. 3ème prix au Hult Prize 2026 — solution durable pour valoriser les déchets de pêche en produits à haute valeur ajoutée.",
    tags: ["Innovation", "Durabilité", "Entrepreneuriat"],
    images: [
      "/images/marinova/0.png",
      "/images/marinova/1.png",
      "/images/marinova/2.png",
      "/images/marinova/3.png",
    ],
    video: null,
    featured: true,
    year: "2026",
    prize: "🥉 2nd Runner Up — Hult Prize 2026",
  },

  // ─── AUTRES PROJETS AVEC VIDÉOS ──────────────────────────
  {
    title: "Cabinet Médical — Assojet",
    subtitle: "Full Stack App · Stage Fin d'Année",
    description:
      "Plateforme complète de gestion de cabinet médical déployée en production : gestion patients, médecins, rendez-vous, authentification et rôles.",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    images: [],
    video: "/videos/assojet.mp4",
    featured: false,
    year: "2025",
  },
  {
    title: "Medicore",
    subtitle: "Cabinet Médical · Spring Boot",
    description:
      "Application académique de gestion de cabinet médical avec Spring Boot, PostgreSQL et React — gestion avancée des rôles médecin / patient / admin.",
    tags: ["Spring Boot", "PostgreSQL", "React"],
    images: [],
    video: "/videos/Medicore.mp4",
    featured: false,
    year: "2025",
  },
  {
    title: "Alkhawarizmi",
    subtitle: "Apprendre l'algorithme de Prim",
    description:
      "Plateforme d'apprentissage de l'algorithme de Prim avec visualisation interactive, quiz d'évaluation et intégration LLM dans le processus d'apprentissage.",
    tags: ["Next.js", "React", "LLM"],
    images: [],
    video: "/videos/prime.mp4",
    featured: false,
    year: "2025",
  },
  {
    title: "Yalah ntaybo",
    subtitle: "Réseau Social Culinaire Marocain",
    description:
      "Plateforme de publication, notation et commentaires de recettes marocaines avec profils utilisateurs.",
    tags: ["Laravel", "React"],
    images: [],
    video: "/videos/yalah_ntaybo.mp4",
    featured: false,
    year: "2024",
  },
  {
    title: "Gestion Hôtel",
    subtitle: "Application Desktop",
    description:
      "Application desktop de gestion hôtelière : réservations, gestion clients et facturation.",
    tags: ["Java", "JavaFX"],
    images: ["/images/projets/h1.png", "/images/projets/h2.png", "/images/projets/h3.png"],
    video: null,
    featured: false,
    year: "2024",
  },
  {
    title: "Gestion Bibliothèque",
    subtitle: "Web App",
    description:
      "Système de gestion de bibliothèque avec authentification, emprunts et gestion des ouvrages.",
    tags: ["Flask", "SQLite"],
    images: [],
    video: ["/videos/ennajii.mp4"],
    featured: false,
    year: "2024",
  },
  {
    title: "AquaGazen",
    subtitle: "Hult Prize 2025",
    description:
      "Installation innovante de réutilisation des eaux usées — projet Hult Prize 2025.",
    tags: ["Django", "MySQL"],
    images: ["/images/events/hultprize/1.png", "/images/events/hultprize/2.png", "/images/events/hultprize/3.png","/images/events/hultprize/4.png","/images/events/hultprize/5.png"],
    video: null,
    featured: false,
    year: "2025",
    prize: "Hult Prize 2025",
  },
  {
    title: "Bovins Auction",
    subtitle: "projet de stage d'initiation en Jibal",
    description:
      "Développement d'une plateforme web de vente et gestion de bovins dans le milieu industriel agri.",
    tags: ["HTML", "CSS", "JavaScript"],
    images: ["/images/projets/j1.png", "/images/projets/j2.png", "/images/projets/j3.png"],
    video: null,
    featured: false,
    year: "2024",
  },
];

export const skills = {
  languages: ["Java", "Python", "PHP", "C++", "SQL", "JavaScript", "TypeScript"],
  frameworks: [
    "Spring Boot",
    "Django",
    "Laravel",
    "Flask",
    "React.js",
    "Next.js",
    "Angular",
    "Node.js",
  ],
  databases: ["PostgreSQL", "MySQL", "Oracle", "SQLite"],
  tools: ["Docker", "Git", "API REST", "UML", "MVC"],
};

export const activities = [
  {
    year: "2026",
    role: "Chef Cellule Organisation",
    org: "Événement Open Sources",
    image: "/images/events/open-source/1.png",
  },
  {
    year: "2025",
    role: "Chef des Actions",
    org: "Club JLM — Jeunes Leaders Marocaines",
    image: null,
  },
  {
    year: "2025",
    role: "Animatrice",
    org: "Événement Sanitaire v2.0  et v.3 — Club EPIC",
    image: "/images/events/sanitaire-20/1.png",
  },
  {
    year: "2024",
    role: "Chef des Projets",
    org: "Club JLM — Jeunes Leaders Marocaines",
    image: null,
  },
  {
    year: "En cours",
    role: "Membre Actif",
    org: "Be Secure — Cybersécurité & Sensibilisation",
    image: null,
  },
];

export const certifications = [
  {
    title: "2nd Runner Up — Hult Prize",
    org: "Hult Prize 2026 · Marinova",
    year: "2026",
    image: "/images/certifs/hult-2026.png",
    category: "Prix",
    highlight: true,
  },
  {
    title: "présentation devant les jurys",
    org: "Hult Prize 2026 ",
    year: "2026",
    image: "/images/certifs/mari.png",
    category: "Prix",
    highlight: true,
  },
  {
    title: "Chef Cellule Organisation — Open Source",
    org: "Événement Open Sources · 9-10 Fév 2026",
    year: "2026",
    image: "/images/certifs/open-source.png",
    category: "Leadership",
    highlight: false,
  },
  {
    title: "Participation — Hult Prize",
    org: "AquaGazen · Fév 2025",
    year: "2025",
    image: "/images/certifs/hult-2025.png",
    category: "Compétition",
    highlight: false,
  },
  {
    title: "JENR — Journée des Énergies Renouvelables",
    org: "Édition 11.0 · 2025",
    year: "2025",
    image: "/images/certifs/jenr.png",
    category: "Conférence",
    highlight: false,
  },
  {
    title: "Remerciement — Club JLM ENSAKH",
    org: "Club JLM · 2025",
    year: "2025",
    image: "/images/certifs/jlm-2025.png",
    category: "Reconnaissance",
    highlight: false,
  },
  {
    title: "Reconnaissance — Club EPIC",
    org: "Club EPIC",
    year: "2025",
    image: "/images/certifs/epic.png",
    category: "Reconnaissance",
    highlight: false,
  },
  {
    title: "Cellule Technique — Open Source",
    org: "Événement Open Source · 2025",
    year: "2025",
    image: "/images/certifs/open-source-tech.png",
    category: "Technique",
    highlight: false,
  },
   {
    title: "Membre de l'équipe organisation",
    org: "Événement Open Source · 2025",
    year: "2025",
    image: "/images/certifs/os.png",
    category: "leadership",
    highlight: false,
  },
  {
    title: "Attestation de Réference — Assojet",
    org: "Assojet, Khmisset · 2025",
    year: "2025",
    image: "/images/certifs/assojet.jpg",
    category: "Stage",
    highlight: false,
  },
  
  {
    title: "Excellence — 1ère en 1ère Année Bac",
    org: "Lycée Al Kindi",
    year: "2021",
    image: "/images/certifs/excellence-bac.png",
    category: "Excellence",
    highlight: true,
  },
  {
    title: "Journal Scolaire — Santé",
    org: "Collège · Encadrement Profs de Français",
    year: "2019",
    image: "/images/certifs/college-journal.png",
    category: "Créatif",
    highlight: false,
  },
   {
    title: "Journal Scolaire - Réussite académique ",
    org: "Collège ",
    year: "2019",
    image: "/images/certifs/college.png",
    category: "Créatif",
    highlight: false,
  },
];

export const languages = [
  { name: "Arabe", level: "Langue maternelle", pct: 100 },
  { name: "Français", level: "Courant", pct: 88 },
  { name: "Anglais", level: "Intermédiaire", pct: 60 },
];

export const softSkills = [
  "Leadership & Gestion de Projet",
  "Organisation & Gestion du Temps",
  "Communication",
  "Travail en Équipe",
];