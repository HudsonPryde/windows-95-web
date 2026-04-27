import './Resume.css';

const PDF_URL = process.env.PUBLIC_URL + '/hpstuart-resume.pdf';

type Job = {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

const experience: Job[] = [
  {
    title: 'Software Engineer (Founding Team)',
    company: 'Corner',
    location: 'Toronto, ON',
    dates: 'May 2025 – Present',
    bullets: [
      'Building a local commerce platform that connects shoppers with nearby stores through unified search and checkout',
      'Architected the backend from zero in Go: gRPC microservices, protobuf contracts, and an API gateway handling HTTPS ingress and service routing',
      'Designed a merchant integration layer supporting Square and Shopify POS systems, with an extensible adapter pattern for onboarding new providers',
      'Building the customer-facing frontend in Next.js, React, and TanStack, owning the full stack from UI to service layer',
    ],
  },
  {
    title: 'Fullstack Developer (Co-op)',
    company: 'Aisha Living',
    location: 'Toronto, ON',
    dates: 'Sep 2023 – Apr 2024',
    bullets: [
      'Designed and shipped communication features—meeting scheduling, user groups, real-time content sharing—using TypeScript, Python, React, and AWS',
      'Cut image load times from 10s+ to ~40ms by reworking caching and data transfer strategies',
      'Managed AWS infrastructure (EC2, Route 53, load balancing) and maintained system uptime across deployments',
    ],
  },
  {
    title: 'Fullstack Developer (Co-op)',
    company: 'GetQuorum',
    location: 'Toronto, ON',
    dates: 'Sep 2021 – Apr 2022',
    bullets: [
      'Built a real-time virtual meeting waiting room supporting 1,000+ concurrent users',
      'Refactored logging pipelines and API endpoints to improve stability under heavy load',
      'Participated in live production troubleshooting and zero-downtime deployments using Vue, Node.js, and CI/CD pipelines',
    ],
  },
];

const projects: { name: string; tagline: string; bullets: string[] }[] = [
  {
    name: 'Study Scribe',
    tagline: 'React Native • Shipped on the App Store, 100+ signups',
    bullets: [
      'Designed and shipped a cross-platform mobile app for creating study notes and preparing for tests; published to the iOS App Store',
      'Built note-taking, organization, and review workflows with local data persistence and offline support',
    ],
  },
  {
    name: 'AI GitHub Task Manager',
    tagline: 'Next.js, LLM APIs, GitHub REST API',
    bullets: [
      'Built a tool that translates natural-language input into structured GitHub issues with generated titles, descriptions, and metadata',
      'Designed modular request/response flows between the LLM and GitHub API, with extensible architecture for multi-step task generation',
    ],
  },
];

const skills: { label: string; items: string }[] = [
  { label: 'Languages', items: 'Go, TypeScript, JavaScript, Python, Java, C++, SQL' },
  { label: 'Frontend', items: 'React, Vue, React Native, HTML5, CSS3' },
  {
    label: 'Backend',
    items: 'Go, Node.js (Express, Next.js), gRPC, Protobufs, Redis, GraphQL',
  },
  { label: 'Infrastructure', items: 'AWS (EC2, S3, Route 53), Docker, Git, CI/CD' },
  { label: 'Databases', items: 'PostgreSQL, Supabase, MongoDB' },
];

export default function Resume() {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <h1 className="resume-name">Hudson Pryde Stuart</h1>
        <p className="resume-contact">
          Toronto, ON · 416-878-3842 ·{' '}
          <a href="mailto:hudsonpryde@gmail.com">hudsonpryde@gmail.com</a> ·{' '}
          <a
            href="https://linkedin.com/in/hudsonpryde"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/hudsonpryde
          </a>{' '}
          ·{' '}
          <a
            href="https://github.com/hudsonpryde"
            target="_blank"
            rel="noreferrer"
          >
            github.com/hudsonpryde
          </a>
        </p>
        <p className="resume-summary">
          Fullstack engineer drawn to early-stage products. Experience shipping
          customer-facing features, building microservices from scratch, and
          owning problems end-to-end at small teams.
        </p>
        <div className="resume-actions">
          <a
            className="win95-button"
            href={PDF_URL}
            download="hudson-pryde-resume.pdf"
          >
            Download PDF
          </a>
          <a
            className="win95-button"
            href={PDF_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </a>
        </div>
      </header>

      <section aria-labelledby="resume-experience">
        <h2 id="resume-experience" className="resume-section-heading">
          Experience
        </h2>
        {experience.map((job) => (
          <article className="resume-entry" key={`${job.company}-${job.dates}`}>
            <div className="resume-entry-head">
              <strong>{job.company}</strong> — {job.title}
            </div>
            <div className="resume-entry-meta">
              {job.location} · {job.dates}
            </div>
            <ul className="resume-bullets">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="resume-projects">
        <h2 id="resume-projects" className="resume-section-heading">
          Projects
        </h2>
        {projects.map((p) => (
          <article className="resume-entry" key={p.name}>
            <div className="resume-entry-head">
              <strong>{p.name}</strong> — {p.tagline}
            </div>
            <ul className="resume-bullets">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="resume-skills">
        <h2 id="resume-skills" className="resume-section-heading">
          Skills
        </h2>
        <dl className="resume-skills">
          {skills.map((s) => (
            <div key={s.label} className="resume-skill-row">
              <dt>{s.label}:</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="resume-education">
        <h2 id="resume-education" className="resume-section-heading">
          Education
        </h2>
        <article className="resume-entry">
          <div className="resume-entry-head">
            <strong>Toronto Metropolitan University</strong> — B.Sc. (Honours),
            Computer Science Co-op
          </div>
          <div className="resume-entry-meta">Apr 2025</div>
        </article>
      </section>
    </div>
  );
}
