import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import WindowsStart from '../icons/windows.png';
import moment from 'moment';
import './Taskbar.css';
import { useState } from 'react';

export default function Taskbar() {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();

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
      <div className="windows-container">
        <div className="start-button">
          <img src={WindowsStart} alt="start" />
          <div className="start-title">Start</div>
        </div>
      </div>
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
