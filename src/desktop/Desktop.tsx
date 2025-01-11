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
            >
              {w.title === 'Resume' ? <Resume /> : <div />}
            </Window>
          ))}
          <Shortcut title={'Profile'} image={ProfileIcon} x={50} y={50} />
          <Shortcut title={'Resume'} image={ResumeIcon} x={50} y={50} />
          <Shortcut title={'Projects'} image={ProjectsIcon} x={50} y={50} />
          <Shortcut title={'Github'} image={GithubIcon} x={50} y={50} />
          <Shortcut title={'LinkedIn'} image={LinkedInIcon} x={50} y={50} />
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
