import './Desktop.css';
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
  JSX,
} from 'react';
import Window from '../window/Window';
import { WindowData, WindowContentType } from '../window/types';
import { DesktopData } from './types';
import { desktopReducer } from './reducer';
import Shortcut from '../shortcut/Shortcut';
import Taskbar from '../taskbar/Taskbar';
import ContextMenu, { ContextMenuItem } from './ContextMenu';
import Shutdown from '../content/shutdown/Shutdown';
import ProfileIcon from '../icons/profile.png';
import ResumeIcon from '../icons/resume.png';
import ProjectsIcon from '../icons/projects.png';
import GithubIcon from '../icons/github-mark.png';
import LinkedInIcon from '../icons/In-Blue-128.png';
// TODO: replace these placeholder icons with My Computer / Recycle Bin / Contact / Skills artwork
import GenericIcon from '../icons/Office progam.png';
import Resume from '../content/resume/Resume';
import Profile from '../content/profile/Profile';
import Projects from '../content/projects/Projects';
import ProjectDetail from '../content/project-detail/ProjectDetail';
import Contact from '../content/contact/Contact';
import Skills from '../content/skills/Skills';
import About from '../content/about/About';

let desktopInit: DesktopData = {
  front: 0,
  windows: [],
  activeShortcut: '',
  activeWindow: null,
};

const DesktopContext = createContext(desktopInit);
const DispatchContext = createContext(null as unknown as React.Dispatch<any>);
const ShutdownContext = createContext<{
  shutdown: () => void;
  restart: () => void;
}>({ shutdown: () => {}, restart: () => {} });

export default function Desktop() {
  const [state, dispatch] = useReducer(desktopReducer, desktopInit);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [isShutdown, setIsShutdown] = useState(false);

  // Open the Profile window on first load. The reducer dedupes by contentType,
  // so StrictMode's double-invoke can't produce two Profile windows.
  useEffect(() => {
    dispatch({
      type: 'create_window',
      data: { title: 'Profile', contentType: 'profile' },
    });
  }, []);

  function handleClick() {
    dispatch({ type: 'deactivate_shortcut' });
    setMenu(null);
  }

  function handleContextMenu(e: React.MouseEvent) {
    // Only fire on the desktop background, not on shortcuts/windows.
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }

  const desktopMenuItems: ContextMenuItem[] = [
    {
      label: 'Refresh',
      onClick: () => {
        // Visual flash to mimic refresh.
        document.body.classList.add('desktop-refreshing');
        setTimeout(
          () => document.body.classList.remove('desktop-refreshing'),
          120
        );
      },
    },
    { divider: true },
    {
      label: 'New',
      onClick: () => {},
      submenuArrow: true,
      disabled: true,
    },
    { divider: true },
    {
      label: 'Properties',
      onClick: () =>
        dispatch({
          type: 'create_window',
          data: { title: 'About', contentType: 'about' },
        }),
    },
  ];

  function getContent(w: WindowData): JSX.Element {
    switch (w.contentType) {
      case 'resume':
        return <Resume />;
      case 'profile':
        return <Profile />;
      case 'projects':
        return <Projects />;
      case 'project-detail':
        return <ProjectDetail projectKey={w.data?.projectKey} />;
      case 'contact':
        return <Contact />;
      case 'skills':
        return <Skills />;
      case 'about':
        return <About />;
      default:
        return <div />;
    }
  }

  function getIcon(contentType: WindowContentType, data?: any): string {
    switch (contentType) {
      case 'resume':
        return ResumeIcon;
      case 'profile':
        return ProfileIcon;
      case 'projects':
        return ProjectsIcon;
      case 'project-detail':
        return data?.icon || GenericIcon;
      case 'contact':
      case 'skills':
      case 'about':
        return GenericIcon;
      default:
        return '';
    }
  }

  if (isShutdown) {
    return <Shutdown onRestart={() => setIsShutdown(false)} />;
  }

  return (
    <DesktopContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ShutdownContext.Provider
          value={{
            shutdown: () => setIsShutdown(true),
            restart: () => setIsShutdown(false),
          }}
        >
          <div
            className="Desktop"
            onClick={handleClick}
            onContextMenu={handleContextMenu}
          >
            {state.windows.map((w: WindowData) => (
              <Window
                key={w.id}
                title={w.title}
                id={w.id}
                zindex={w.zindex}
                visible={w.visible}
                icon={getIcon(w.contentType, w.data)}
                showBottomBarCount={w.showBottomBarCount}
                contentType={w.contentType}
                data={w.data}
              >
                {getContent(w)}
              </Window>
            ))}
            <Shortcut
              title={'Profile'}
              image={ProfileIcon}
              contentType="profile"
            />
            <Shortcut
              title={'Resume'}
              image={ResumeIcon}
              contentType="resume"
            />
            <Shortcut
              title={'Projects'}
              image={ProjectsIcon}
              contentType="projects"
            />
            <Shortcut
              title={'Skills'}
              image={GenericIcon}
              contentType="skills"
            />
            <Shortcut
              title={'Contact'}
              image={GenericIcon}
              contentType="contact"
            />
            <Shortcut
              title={'Github'}
              image={GithubIcon}
              isLink={true}
              link={'https://github.com/hudsonpryde'}
            />
            <Shortcut
              title={'LinkedIn'}
              image={LinkedInIcon}
              isLink={true}
              link={'https://linkedin.com/in/hudsonpryde'}
            />
            {menu && (
              <ContextMenu
                x={menu.x}
                y={menu.y}
                items={desktopMenuItems}
                onClose={() => setMenu(null)}
              />
            )}
          </div>
          <Taskbar />
        </ShutdownContext.Provider>
      </DispatchContext.Provider>
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  return useContext(DesktopContext);
}

export function useDesktopDispatch() {
  return useContext(DispatchContext);
}

export function useShutdown() {
  return useContext(ShutdownContext);
}
