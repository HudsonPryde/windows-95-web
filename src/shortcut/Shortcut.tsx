import './Shortcut.css';
import { useState } from 'react';
import { useDesktopDispatch, useDesktop } from '../desktop/Desktop';
import { WindowData } from '../window/types';

export default function Shortcut({
  title,
  x,
  y,
}: {
  title: string;
  x: number;
  y: number;
}) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();
  const [active, setActive] = useState(false);

  // handles double click as well
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!active) {
      setActive(true);
      return;
    }
    // we need to open or bring to front the corrosponding window to this shortcut if doubleclicked
    const window = findWindowByTitle(title);
    if (window) {
      dispatch({
        type: 'bring_to_front',
        data: {
          id: window.id,
        },
      });
      return;
    }
    dispatch({
      type: 'create_window',
      data: {
        title,
      },
    });
  };

  function findWindowByTitle(title: string): WindowData | undefined {
    return state.windows.find((w) => {
      if (w.title === title) {
        return true;
      }
      return false;
    });
  }

  return (
    <div
      className={`shortcut-container ${active ? 'shrortcut-active' : null}`}
      onClick={handleClick}
    ></div>
  );
}
