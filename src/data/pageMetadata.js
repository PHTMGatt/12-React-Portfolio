// Public entry-point metadata, shared by the build and client navigation.
// Case-study descriptions use the existing, evidence-backed project summaries.
export const siteUrl = 'https://one2-react-portfolio.onrender.com';
export const pageMetadata = {
  '/': {
    title: 'Bryen Gatt — Full-Stack Developer',
    description: 'Bryen Gatt is a full-stack developer building React front-ends, Node and GraphQL APIs, and Discord automation. Case studies, projects, résumé and contact.',
  },
  '/work': {
    title: 'Work — Bryen Gatt',
    description: 'Explore Bryen Gatt’s software projects and case studies: React applications, full-stack development, and Discord automation.',
  },
  '/work/zombies-hub-2': {
    title: 'Zombies Hub 2.0 case study — Bryen Gatt',
    description: 'Seven separate guide sites rebuilt as one fast, unified React application. A project case study by Bryen Gatt.',
  },
  '/work/fairway-finder': {
    title: 'Fairway Finder case study — Bryen Gatt',
    description: 'A golf trip planner that puts courses, routes, weather and handicaps in one app. A full-stack project case study by Bryen Gatt.',
  },
  '/work/clash-automation': {
    title: 'Clash of Clans Discord Suite case study — Bryen Gatt',
    description: 'War intelligence and server operations bots, built to run together on a single host. An automation case study by Bryen Gatt.',
  },
  '/resume': {
    title: 'Resume — Bryen Gatt',
    description: 'Bryen Gatt’s developer résumé: technical skills, selected projects, work experience, and a downloadable PDF with contact links.',
  },
  '/contact': {
    title: 'Contact — Bryen Gatt',
    description: 'Contact Bryen Gatt about software development opportunities. Find email, GitHub, LinkedIn, and a direct contact form.',
  },
};

export function metadataForPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const metadata = pageMetadata[path];
  return metadata ? { ...metadata, canonical: `${siteUrl}${path}` } : null;
}
