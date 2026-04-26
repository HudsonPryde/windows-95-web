import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import WindowsStart from '../icons/windows.png';
import moment from 'moment';
import './Taskbar.css';
import { useEffect, useRef, useState } from 'react';
import StartMenu from './StartMenu';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Taskbar() {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();
  const isMobile = useIsMobile();

  const [startOpen, setStartOpen] = useState(false);
  const [tabsOpen, setTabsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().format('hh:mm A'));

  const startButtonRef = useRef<HTMLButtonElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const tabsButtonRef = useRef<HTMLButtonElement>(null);
  const tabsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(moment().format('hh:mm A'));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!startOpen) return;
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        startMenuRef.current?.contains(target) ||
        startButtonRef.current?.contains(target)
      ) {
        return;
      }
      setStartOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setStartOpen(false);
    }
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [startOpen]);

  useEffect(() => {
    if (!tabsOpen) return;
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        tabsPanelRef.current?.contains(target) ||
        tabsButtonRef.current?.contains(target)
      ) {
        return;
      }
      setTabsOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setTabsOpen(false);
    }
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [tabsOpen]);

  function handleTabClick(windowId: number) {
    dispatch({ type: 'bring_to_front', data: { id: windowId } });
    setTabsOpen(false);
  }

  return (
    <div className="task-bar-container" role="toolbar" aria-label="Taskbar">
      <button
        ref={startButtonRef}
        type="button"
        className={`windows-container start-button ${
          startOpen ? 'active' : ''
        }`}
        onClick={() => setStartOpen(!startOpen)}
        aria-haspopup="menu"
        aria-expanded={startOpen}
      >
        <div className="start-title">
          <img src={WindowsStart} alt="" />
          Start
        </div>
      </button>
      <StartMenu
        visible={startOpen}
        onClose={() => setStartOpen(false)}
        menuRef={startMenuRef}
      />

      {!isMobile &&
        state.windows.map((window) => (
          <button
            key={window.id}
            type="button"
            className={`windows-container window-tab ${
              state.activeWindow === window.id && window.visible ? 'active' : ''
            } ${!window.visible ? 'minimized' : ''}`}
            onClick={() => handleTabClick(window.id)}
            aria-label={`${window.title}${
              window.visible ? '' : ' (minimized)'
            }`}
          >
            {window.title}
          </button>
        ))}

      {isMobile && state.windows.length > 0 && (
        <div className="windows-pill-wrap">
          <button
            ref={tabsButtonRef}
            type="button"
            className={`windows-container windows-pill ${
              tabsOpen ? 'active' : ''
            }`}
            onClick={() => setTabsOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={tabsOpen}
          >
            Windows ({state.windows.length}) ▾
          </button>
          {tabsOpen && (
            <div
              ref={tabsPanelRef}
              className="windows-pill-panel windows-container"
              role="menu"
            >
              {state.windows.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  role="menuitem"
                  className={`windows-pill-item ${
                    state.activeWindow === w.id && w.visible ? 'active' : ''
                  } ${!w.visible ? 'minimized' : ''}`}
                  onClick={() => handleTabClick(w.id)}
                >
                  {w.title}
                  {!w.visible && (
                    <span className="windows-pill-tag">minimized</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="clock-container" aria-label={`Current time ${currentTime}`}>
        {currentTime}
      </div>
    </div>
  );
}
