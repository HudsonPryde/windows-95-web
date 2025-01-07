import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import Container from '../shared/Container';
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

  return (
    <div className="task-bar-container">
      <Container clickable>
        <div className="start-button">
          <img src={WindowsStart} alt="start" />
          <div className="start-title">Start</div>
        </div>
      </Container>
      {state.windows.map((window) => {
        return (
          <Container clickable>
            <div className="window-tab">{window.title}</div>
          </Container>
        );
      })}
      <div className="clock-container">{currentTime}</div>
    </div>
  );
}
