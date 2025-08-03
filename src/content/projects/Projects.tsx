import './Projects.css';
import SSIcon from '../../icons/ss-icon.png';
import ProgramIcon from '../../icons/Office progam.png';
import { useState } from 'react';

export default function Projects() {
  const [activeItem, setActiveItem] = useState('');
  const projectList = ['Study Scribe', 'Research Assistant', 'Pollyfill'];

  function getProjectIcon(title: string) {
    switch (title) {
      case 'Study Scribe':
        return SSIcon;
      default:
        return ProgramIcon;
    }
  }

  function getProjectLink(title: string) {
    switch (title) {
      case 'Study Scribe':
        return 'https://github.com/HudsonPryde/ss-app';
      case 'Research Assistant':
        return 'https://github.com/HudsonPryde/research-assistant';
      case 'Pollyfill':
        return 'https://github.com/HudsonPryde/Pollyfill';
      default:
        return '';
    }
  }

  return (
    <div className="projects-container" onClick={() => setActiveItem('')}>
      {projectList.map((project) => (
        <div
          onClick={(e) => {
            setActiveItem(project);
            e.stopPropagation();
          }}
        >
          <ProjectItem
            title={project}
            icon={getProjectIcon(project)}
            link={getProjectLink(project)}
            active={project === activeItem}
          />
        </div>
      ))}
    </div>
  );
}

function ProjectItem({
  title,
  icon,
  active,
  link,
}: {
  title: string;
  icon: string;
  active: boolean;
  link: string;
}) {
  function openLink() {
    if (link !== '') {
      window.open(link, '_blank')?.focus();
      return;
    }
  }
  return (
    <div className="projects-item" onDoubleClick={openLink}>
      <div className="project-icon">
        <img src={icon} height={36} width={36} alt="study scribe"></img>
      </div>
      <div className={`project-title ${active ? 'active' : ''}`}>{title}</div>
    </div>
  );
}
