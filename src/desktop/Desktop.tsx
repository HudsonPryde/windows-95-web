import './Desktop.css';
import React, { createContext, useReducer, useContext } from 'react';
import Window from '../window/Window';
import { WindowData } from '../window/types';
import { DesktopData } from './types';
import { desktopReducer } from './reducer';
import Shortcut from '../shortcut/Shortcut';
import Taskbar from '../taskbar/Taskbar';

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
            <Window key={w.title} title={w.title} id={w.id} zindex={w.zindex} />
          ))}
          <Shortcut title={'Profile'} x={50} y={50} />
          <Shortcut title={'Resume'} x={50} y={50} />
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
