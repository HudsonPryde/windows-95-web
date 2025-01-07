import './Shortcut.css';
import { useDesktopDispatch, useDesktop } from '../desktop/Desktop';
import { WindowData } from '../window/types';
import shortcutLink from '../icons/shortcut-link.png';

export default function Shortcut({
  title,
  x,
  y,
  image,
}: {
  title: string;
  x: number;
  y: number;
  image: string;
}) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();

  let isActive = state.activeShortcut === title ? true : false;

  // handles double click as well
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (state.activeShortcut !== title) {
      dispatch({ type: 'set_active_shortcut', data: { title } });
      return;
    }
    dispatch({
      type: 'deactivate_shortcut',
    });
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
    <div className={`shortcut-container`} onClick={handleClick}>
      <div className={'img-container'}>
        <img
          src={shortcutLink}
          alt="shortcut"
          height={32}
          width={32}
          style={{ position: 'fixed' }}
        />
        <img src={image} alt={image} height={32} width={32} />
      </div>
      <div className={`shortcut-title ${isActive ? 'shortcut-active' : null}`}>
        {title}
      </div>
    </div>
  );
}
