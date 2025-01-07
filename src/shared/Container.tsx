import './Container.css';
import { ReactNode } from 'react';

export default function Container({
  children,
  clickable = false,
}: {
  children: ReactNode;
  clickable?: boolean;
}) {
  return (
    <div className={`windows-container ${clickable ? 'clickable' : null}`}>
      {children}
    </div>
  );
}
