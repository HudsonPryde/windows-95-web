import './Desktop.css';
import React, { createContext, useReducer, useContext, JSX } from 'react';
import Window from '../window/Window';
import { WindowData } from '../window/types';
import { DesktopData } from './types';
import { desktopReducer } from './reducer';
import Shortcut from '../shortcut/Shortcut';
import Taskbar from '../taskbar/Taskbar';
import ProfileIcon from '../icons/profile.png';
import ResumeIcon from '../icons/resume.png';
import ProjectsIcon from '../icons/projects.png';
import GithubIcon from '../icons/github-mark.png';
import LinkedInIcon from '../icons/In-Blue-128.png';
import Resume from '../content/resume/Resume';
import Profile from '../content/profile/Profile';
import Projects from '../content/projects/Projects';

let desktopInit: DesktopData = {
  front: 0,
  windows: [],
  shortcuts: [],
  activeShortcut: '',
  activeWindow: 1,
};

const DesktopContext = createContext(desktopInit);
const DispatchContext = createContext(null as unknown as React.Dispatch<any>);

export default function Desktop() {
  const [state, dispatch] = useReducer(desktopReducer, desktopInit);

  function handleClick() {
    dispatch({
      type: 'deactivate_shortcut',
    });
  }

  function getContent(title: string): JSX.Element {
    switch (title) {
      case 'Resume':
        return <Resume />;
      case 'Profile':
        return <Profile />;
      case 'Projects':
        return <Projects />;
      default:
        return <div></div>;
    }
  }

  function getIcon(title: string): string {
    switch (title) {
      case 'Resume':
        return ResumeIcon;
      case 'Profile':
        return ProfileIcon;
      case 'Projects':
        return ProjectsIcon;
      default:
        return '';
    }
  }

  return (
    <DesktopContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="Desktop" onClick={handleClick}>
          {state.windows.map((w: WindowData) => (
            <Window
              key={w.title}
              title={w.title}
              id={w.id}
              zindex={w.zindex}
              visible={w.visible}
              icon={getIcon(w.title)}
              showBottomBarCount={w.showBottomBarCount}
            >
              {getContent(w.title)}
            </Window>
          ))}
          <Shortcut title={'Profile'} image={ProfileIcon} />
          <Shortcut title={'Resume'} image={ResumeIcon} />
          <Shortcut title={'Projects'} image={ProjectsIcon} />
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
        </div>
        <Taskbar />
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
