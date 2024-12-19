import './Desktop.css';
import React, { createContext, useReducer, useContext } from 'react';
import Window from '../window/Window';
import { WindowData } from '../window/types';
import { DesktopData } from './types';
import { desktopReducer } from './reducer';
import Shortcut from '../shortcut/Shortcut';

let desktopInit: DesktopData = {
  front: 0,
  windows: [],
  shortcuts: [],
};

const DesktopContext = createContext(desktopInit);
const DispatchContext = createContext(null as unknown as React.Dispatch<any>);

export default function Desktop() {
  const [state, dispatch] = useReducer(desktopReducer, desktopInit);

  return (
    <DesktopContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="Desktop">
          {state.windows.map((w: WindowData) => (
            <Window key={w.title} title={w.title} zindex={w.zindex} />
          ))}
          <Shortcut title={'Profile'} x={50} y={50} />
        </div>
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
