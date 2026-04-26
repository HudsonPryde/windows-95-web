import './Shortcut.css';
import { useDesktopDispatch, useDesktop } from '../desktop/Desktop';
import shortcutLink from '../icons/shortcut-link.png';
import { ShortcutProps } from './types';
import { useState } from 'react';
import ContextMenu, { ContextMenuItem } from '../desktop/ContextMenu';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Shortcut({
  title,
  image,
  isLink = false,
  link,
  contentType,
}: ShortcutProps) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();
  const isMobile = useIsMobile();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  const isActive = state.activeShortcut === title;

  function open() {
    if (isLink) {
      window.open(link, '_blank')?.focus();
      return;
    }
    if (!contentType) return;
    dispatch({
      type: 'create_window',
      data: { title, contentType },
    });
  }

  // Mobile: a single tap opens. Desktop: first click selects, second click opens.
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isMobile) {
      open();
      return;
    }
    if (state.activeShortcut !== title) {
      dispatch({ type: 'set_active_shortcut', data: { title } });
      return;
    }
    dispatch({ type: 'deactivate_shortcut' });
    open();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      dispatch({ type: 'set_active_shortcut', data: { title } });
      open();
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'set_active_shortcut', data: { title } });
    setMenu({ x: e.clientX, y: e.clientY });
  };

  const items: ContextMenuItem[] = [
    { label: 'Open', onClick: open, bold: true },
    { divider: true },
    {
      label: 'Properties',
      onClick: () =>
        dispatch({
          type: 'create_window',
          data: { title: 'About', contentType: 'about' },
        }),
    },
  ];

  return (
    <>
      <button
        type="button"
        className="shortcut-container"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onKeyDown={handleKeyDown}
        aria-label={isLink ? `${title} (opens in new tab)` : `Open ${title}`}
      >
        <div className="img-container">
          <img
            src={shortcutLink}
            alt=""
            height={32}
            width={32}
            style={{ position: 'fixed' }}
          />
          <img src={image} alt="" height={32} width={32} />
        </div>
        <div className={`shortcut-title ${isActive ? 'shortcut-active' : ''}`}>
          {title}
        </div>
      </button>
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={items}
          onClose={() => setMenu(null)}
        />
      )}
    </>
  );
}
