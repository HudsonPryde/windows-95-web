import React, { useEffect, useState } from 'react';
import './Window.css';
import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import Close from './Close';
import { WindowData } from './types';
import Minimize from './Minimize';
import Fullscreen from './Fullscreen';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export default function Window({ title, id, zindex, visible }: WindowData) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();
  // position
  const [position, setPosition] = useState({
    x: windowWidth * 0.05,
    y: windowHeight * 0.05,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // size
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [resizeOffset, setResizeOffset] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function handleFullscreen() {
    // handle resize
    if (isFullscreen) {
      setPosition({
        x: windowWidth * 0.05,
        y: windowHeight * 0.05,
      });
      setSize({ width: 300, height: 300 });
      setIsFullscreen(false);
      return;
    }
    setPosition({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
    // fullscreen size is page width - window border+padding (6px) x2 (for both sides)
    // height is page height - taskbar height (5vh) - border+padding
    setSize({
      width: windowWidth - 12,
      height: windowHeight * 0.95 - 12,
    });
    setIsFullscreen(true);
  }

  // set window position on mouse down
  const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
    //focusWindow(title);
    dispatch({
      type: 'bring_to_front',
      data: {
        id,
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

  if (!visible) {
    return null;
  }

  return (
    <div
      className="container"
      onMouseDown={isFullscreen ? () => {} : handleMouseDown}
      onMouseMove={isFullscreen ? () => {} : handleMouseMove}
      onMouseUp={isFullscreen ? () => {} : handleMouseUp}
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
      <div className={`top-bar ${state.activeWindow === id ? 'active' : null}`}>
        <p className="window-title no-select">{title}</p>
        <div className="window-functions">
          <Minimize id={id} />
          <Fullscreen onClick={handleFullscreen} isFullscreen={isFullscreen} />
          <Close id={id} />
        </div>
      </div>
      <div className="resize-handle" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
}
