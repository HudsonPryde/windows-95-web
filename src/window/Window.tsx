import React, { useEffect, useState } from 'react';
import './Window.css';
import { useDesktopDispatch } from '../desktop/Desktop';

export default function Window({
  title,
  zindex,
}: {
  title: string;
  zindex: number;
}) {
  const dispatch = useDesktopDispatch();
  // position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // size
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [resizeOffset, setResizeOffset] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);

  // set window position on mouse down
  const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
    //focusWindow(title);
    dispatch({
      type: 'bring_to_front',
      data: {
        title,
      },
    });
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // update window offset on mouse move
  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
    if (isResizing) {
      setSize({
        width: e.clientX - resizeOffset.width,
        height: e.clientY - resizeOffset.height,
      });
    }
  };

  // stop dragging the window
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Resizing logic
  const handleResizeMouseDown = (e: MouseEvent | React.MouseEvent) => {
    setIsResizing(true);
    setResizeOffset({
      width: e.clientX - size.width,
      height: e.clientY - size.height,
    });
    e.stopPropagation(); // Prevent triggering dragging while resizing
  };

  // Adding event listeners for mousemove and mouseup when dragging or resizing starts
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    // Cleanup event listeners when component unmounts or dragging stops
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      className="container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        resize: 'both',
        zIndex: zindex,
      }}
    >
      <div className="top-bar">
        <p className="window-title no-select">{title}</p>
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
}
