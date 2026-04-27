import { RefObject, useEffect, useRef, useState } from 'react';
import { useDesktopDispatch, useShutdown } from '../desktop/Desktop';
import { WindowContentType } from '../window/types';

type Item =
  | {
      label: string;
      onClick?: () => void;
      submenu?: Item[];
      bold?: boolean;
    }
  | { divider: true };

export default function StartMenu({
  visible,
  onClose,
  menuRef,
}: {
  visible: boolean;
  onClose: () => void;
  menuRef: RefObject<HTMLDivElement | null>;
}) {
  const dispatch = useDesktopDispatch();
  const { shutdown } = useShutdown();
  const [confirmShutdown, setConfirmShutdown] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  function open(title: string, contentType: WindowContentType) {
    dispatch({ type: 'create_window', data: { title, contentType } });
    onClose();
  }

  // Focus the first item when the menu opens, so keyboard users land inside it.
  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => firstItemRef.current?.focus());
    } else {
      setOpenSubmenu(null);
    }
  }, [visible]);

  const items: Item[] = [
    {
      label: 'Programs',
      submenu: [
        { label: 'Profile', onClick: () => open('Profile', 'profile') },
        { label: 'Resume', onClick: () => open('Resume', 'resume') },
        { label: 'Projects', onClick: () => open('Projects', 'projects') },
        { label: 'Skills', onClick: () => open('Skills', 'skills') },
        { label: 'Contact', onClick: () => open('Contact', 'contact') },
      ],
    },
    {
      label: 'Documents',
      submenu: [
        { label: 'Resume.pdf', onClick: () => open('Resume', 'resume') },
      ],
    },
    {
      label: 'Help',
      onClick: () => open('About', 'about'),
    },
    { divider: true },
    {
      label: 'Shut Down...',
      onClick: () => setConfirmShutdown(true),
    },
  ];

  if (!visible) return null;

  return (
    <>
      <div
        ref={menuRef}
        className="windows-container start-menu-container"
        role="menu"
        aria-label="Start menu"
      >
        <div className="start-menu-title-container">
          <div className="start-menu-title">
            Windows<span id="title-95">95</span>
          </div>
        </div>
        <div className="start-menu-items">
          {items.map((it, i) => {
            if ('divider' in it && it.divider) {
              return <div key={i} className="start-menu-divider" />;
            }
            const item = it as Exclude<Item, { divider: true }>;
            const hasSubmenu = !!item.submenu;
            const submenuOpen = openSubmenu === i;
            return (
              <div
                key={i}
                className={`start-menu-item-wrap ${
                  hasSubmenu ? 'has-submenu' : ''
                } ${submenuOpen ? 'open' : ''}`}
                style={{ position: 'relative' }}
              >
                <button
                  ref={i === 0 ? firstItemRef : undefined}
                  type="button"
                  role="menuitem"
                  aria-haspopup={hasSubmenu ? 'menu' : undefined}
                  aria-expanded={hasSubmenu ? submenuOpen : undefined}
                  className={`start-menu-item ${
                    hasSubmenu ? 'has-submenu' : ''
                  } ${submenuOpen ? 'open' : ''}`}
                  onClick={() => {
                    if (hasSubmenu) {
                      setOpenSubmenu(submenuOpen ? null : i);
                    } else {
                      item.onClick?.();
                    }
                  }}
                  onMouseEnter={() => {
                    if (hasSubmenu) setOpenSubmenu(i);
                  }}
                >
                  <span className="start-menu-item-label">{item.label}</span>
                  {hasSubmenu && <span className="start-menu-arrow">▸</span>}
                </button>
                {hasSubmenu && (
                  <div
                    className={`start-submenu ${submenuOpen ? 'open' : ''}`}
                    role="menu"
                    aria-label={item.label}
                  >
                    {item.submenu!.map((sub, si) => {
                      if ('divider' in sub && sub.divider) {
                        return (
                          <div key={si} className="start-menu-divider" />
                        );
                      }
                      const s = sub as Exclude<Item, { divider: true }>;
                      return (
                        <button
                          key={si}
                          type="button"
                          role="menuitem"
                          className="start-menu-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            s.onClick?.();
                          }}
                        >
                          <span className="start-menu-item-label">
                            {s.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {confirmShutdown && (
        <div
          className="shutdown-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Shut down confirmation"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="shutdown-modal">
            <div className="shutdown-modal-title">Shut Down Windows</div>
            <div className="shutdown-modal-body">
              Are you sure you want to shut down your computer?
            </div>
            <div className="shutdown-modal-actions">
              <button
                type="button"
                className="win95-button"
                autoFocus
                onClick={() => {
                  setConfirmShutdown(false);
                  onClose();
                  shutdown();
                }}
              >
                Yes
              </button>
              <button
                type="button"
                className="win95-button"
                onClick={() => setConfirmShutdown(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
