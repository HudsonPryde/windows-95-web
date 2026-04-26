import './Skills.css';

const groups: { title: string; items: string[] }[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'C / C++', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'React',
      'Node.js',
      'Express',
      'Next.js',
      'PostgreSQL',
      'Firebase',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: ['Git', 'Linux', 'Docker', 'AWS', 'Vercel', 'Figma'],
  },
  {
    title: 'Interests',
    items: [
      'Machine learning',
      'Interpreters & language design',
      'Game development',
      'Accessibility tooling',
    ],
  },
];

export default function Skills() {
  return (
    <div className="skills-container">
      <h2 className="skills-title">Skills</h2>
      <div className="skills-grid">
        {groups.map((g) => (
          <div className="skills-group" key={g.title}>
            <div className="skills-group-title">{g.title}</div>
            <ul className="skills-list">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
