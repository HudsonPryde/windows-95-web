import './Projects.css';
import SSIcon from '../../icons/ss-icon.png';
import ProgramIcon from '../../icons/Office progam.png';
import { useState } from 'react';
import { useDesktopDispatch } from '../../desktop/Desktop';

type Entry = { title: string; key: string };

const projectList: Entry[] = [
  { title: 'Study Scribe', key: 'study-scribe' },
  { title: 'AI GitHub Task Manager', key: 'github-task-manager' },
  { title: 'Research Assistant', key: 'research-assistant' },
  { title: 'Pollyfill', key: 'pollyfill' },
];

function getProjectIcon(title: string) {
  switch (title) {
    case 'Study Scribe':
      return SSIcon;
    default:
      return ProgramIcon;
  }
}

export default function Projects() {
  const [activeItem, setActiveItem] = useState('');
  const dispatch = useDesktopDispatch();

  function openProject(entry: Entry) {
    dispatch({
      type: 'create_window',
      data: {
        title: entry.title,
        contentType: 'project-detail',
        data: { projectKey: entry.key, icon: getProjectIcon(entry.title) },
      },
    });
  }

  return (
    <div className="projects-container" onClick={() => setActiveItem('')}>
      {projectList.map((project) => (
        <div
          key={project.key}
          onClick={(e) => {
            setActiveItem(project.title);
            e.stopPropagation();
          }}
          onDoubleClick={() => openProject(project)}
        >
          <ProjectItem
            title={project.title}
            icon={getProjectIcon(project.title)}
            active={project.title === activeItem}
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
}: {
  title: string;
  icon: string;
  active: boolean;
}) {
  return (
    <div className="projects-item">
      <div className="project-icon">
        <img src={icon} height={36} width={36} alt={title} />
      </div>
      <div className={`project-title ${active ? 'active' : ''}`}>{title}</div>
    </div>
  );
}
