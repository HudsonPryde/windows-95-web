import { RefObject, useState } from 'react';
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

  function open(title: string, contentType: WindowContentType) {
    dispatch({ type: 'create_window', data: { title, contentType } });
    onClose();
  }

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
            return (
              <div
                key={i}
                className={`start-menu-item ${
                  item.submenu ? 'has-submenu' : ''
                }`}
                onClick={() => item.onClick?.()}
              >
                <span className="start-menu-item-label">{item.label}</span>
                {item.submenu && <span className="start-menu-arrow">▸</span>}
                {item.submenu && (
                  <div className="start-submenu">
                    {item.submenu.map((sub, si) => {
                      if ('divider' in sub && sub.divider) {
                        return (
                          <div key={si} className="start-menu-divider" />
                        );
                      }
                      const s = sub as Exclude<Item, { divider: true }>;
                      return (
                        <div
                          key={si}
                          className="start-menu-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            s.onClick?.();
                          }}
                        >
                          <span className="start-menu-item-label">
                            {s.label}
                          </span>
                        </div>
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
          onMouseDown={(e) => {
            // Don't let the backdrop click bubble to the start-menu outside-click handler.
            e.stopPropagation();
          }}
        >
          <div className="shutdown-modal">
            <div className="shutdown-modal-title">Shut Down Windows</div>
            <div className="shutdown-modal-body">
              Are you sure you want to shut down your computer?
            </div>
            <div className="shutdown-modal-actions">
              <button
                className="win95-button"
                onClick={() => {
                  setConfirmShutdown(false);
                  onClose();
                  shutdown();
                }}
              >
                Yes
              </button>
              <button
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
