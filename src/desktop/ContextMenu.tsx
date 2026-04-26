import { useEffect, useRef } from 'react';
import './ContextMenu.css';

export type ContextMenuItem =
  | {
      label: string;
      onClick: () => void;
      bold?: boolean;
      disabled?: boolean;
      submenuArrow?: boolean;
      divider?: false;
    }
  | { divider: true };

export default function ContextMenu({
  x,
  y,
  items,
  onClose,
}: {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Clamp to viewport so menu doesn't render off-screen.
  const maxX = window.innerWidth - 180;
  const maxY = window.innerHeight - items.length * 24 - 10;
  const left = Math.min(x, maxX);
  const top = Math.min(y, maxY);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left, top }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, i) => {
        if ('divider' in item && item.divider) {
          return <div key={i} className="context-menu-divider" />;
        }
        const it = item as Exclude<ContextMenuItem, { divider: true }>;
        return (
          <div
            key={i}
            className={`context-menu-item ${it.disabled ? 'disabled' : ''} ${
              it.bold ? 'bold' : ''
            }`}
            onClick={() => {
              if (it.disabled) return;
              it.onClick();
              onClose();
            }}
          >
            <span className="context-menu-label">{it.label}</span>
            {it.submenuArrow && <span className="context-menu-arrow">▸</span>}
          </div>
        );
      })}
    </div>
  );
}
