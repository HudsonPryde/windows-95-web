import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import WindowsStart from '../icons/windows.png';
import moment from 'moment';
import './Taskbar.css';
import { useState } from 'react';
import StartMenu from './StartMenu';

export default function Taskbar() {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();

  const [startOpen, setStartOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'));
  setInterval(() => {
    setCurrentTime(moment().format('hh:mm A'));
  }, 1000);

  function handleTabClick(windowId: number) {
    dispatch({
      type: 'bring_to_front',
      data: {
        id: windowId,
      },
    });
  }

  return (
    <div className="task-bar-container">
      <button
        className={`windows-container start-button ${
          startOpen ? 'active' : ''
        }`}
        onClick={() => setStartOpen(!startOpen)}
      >
        <div className="start-title">
          <img src={WindowsStart} alt="start" />
          Start
        </div>
      </button>
      <StartMenu visible={startOpen} />
      {state.windows.map((window) => {
        return (
          <div
            className={` windows-container window-tab ${
              state.activeWindow === window.id ? 'active' : null
            }`}
            onClick={() => handleTabClick(window.id)}
          >
            {window.title}
          </div>
        );
      })}
      <div className="clock-container">{currentTime}</div>
    </div>
  );
}
