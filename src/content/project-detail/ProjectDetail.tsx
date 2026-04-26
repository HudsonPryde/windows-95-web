import './ProjectDetail.css';
import { projects } from './projects';

export default function ProjectDetail({
  projectKey,
}: {
  projectKey?: string;
}) {
  const project = projectKey ? projects[projectKey] : undefined;

  if (!project) {
    return (
      <div className="project-detail-container">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <h2 className="project-detail-title">{project.title}</h2>
      <p className="project-detail-tagline">{project.tagline}</p>

      <p className="project-detail-description">{project.description}</p>

      <div className="project-detail-section-title">Tech</div>
      <div className="project-detail-tech-row">
        {project.tech.map((t) => (
          <span className="project-detail-tech" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="project-detail-actions">
        <a
          className="win95-button"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          Open on GitHub
        </a>
        {project.live && (
          <a
            className="win95-button"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Visit Site
          </a>
        )}
      </div>
    </div>
  );
}
