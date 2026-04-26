import React, { useEffect, useRef, useState } from 'react';
import './Window.css';
import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import Close from './Close';
import { WindowData } from './types';
import Minimize from './Minimize';
import Fullscreen from './Fullscreen';
import ResizeHandleIcon from '../icons/resize-handle.png';
import { useIsMobile } from '../hooks/useIsMobile';

export default function Window({
  children,
  title,
  id,
  zindex,
  visible,
  icon,
  showBottomBarCount = false,
}: WindowData) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial position cascade so newly-opened windows don't perfectly stack.
  const cascadeStep = 28;
  const cascadeOffset = ((id - 1) % 8) * cascadeStep;
  const [position, setPosition] = useState(() => ({
    x: window.innerWidth * 0.05 + cascadeOffset,
    y: window.innerHeight * 0.05 + cascadeOffset,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [size, setSize] = useState(() => ({
    width: window.innerWidth * 0.3,
    height: window.innerHeight * 0.6,
  }));
  const [resizeOffset, setResizeOffset] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function handleFullscreen() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    if (isFullscreen) {
      setPosition({ x: ww * 0.05, y: wh * 0.05 });
      setSize({ width: ww * 0.3, height: wh * 0.6 });
      setIsFullscreen(false);
      return;
    }
    setPosition({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
    setSize({ width: ww - 12, height: wh * 0.95 - 12 });
    setIsFullscreen(true);
  }

  const bringToFront = () =>
    dispatch({ type: 'bring_to_front', data: { id } });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    bringToFront();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
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

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsResizing(true);
    setResizeOffset({
      width: e.clientX - size.width,
      height: e.clientY - size.height,
    });
    e.stopPropagation();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, isResizing]);

  // When a window first becomes the active window, focus its container so Tab
  // navigation lands inside it and Esc-to-close hits the right target.
  useEffect(() => {
    if (state.activeWindow === id && visible) {
      containerRef.current?.focus();
    }
  }, [state.activeWindow, id, visible]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      dispatch({ type: 'delete_window', data: { id } });
    }
  }

  if (!visible) return null;

  const mobileFullscreen = isMobile;
  const desktopStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    zIndex: zindex,
  };
  const mobileStyle: React.CSSProperties = { zIndex: zindex };
  const containerStyle = mobileFullscreen ? mobileStyle : desktopStyle;
  const containerClass = `container${
    mobileFullscreen ? ' mobile-fullscreen' : ''
  }`;

  return (
    <div
      ref={containerRef}
      className={containerClass}
      style={containerStyle}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onMouseDown={bringToFront}
    >
      <div
        onMouseDown={
          mobileFullscreen || isFullscreen ? undefined : handleMouseDown
        }
        className={`top-bar ${state.activeWindow === id ? 'active' : ''}`}
      >
        <div className="window-title">
          {icon ? <img src={icon} alt="" height={24} width={24} /> : null}
          <p className="no-select">{title}</p>
        </div>
        <div className="window-functions">
          <Minimize id={id} />
          {!mobileFullscreen && (
            <Fullscreen
              onClick={handleFullscreen}
              isFullscreen={isFullscreen}
            />
          )}
          <Close id={id} />
        </div>
      </div>
      <div className="window-body">{children}</div>

      <div className="bottom-bar">
        <div className="bottom-bar-body">
          {showBottomBarCount && '4 object(s)'}
          {!mobileFullscreen && (
            <img
              src={ResizeHandleIcon}
              onMouseDown={handleResizeMouseDown}
              className="resize-handle"
              draggable={false}
              height={20}
              width={20}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
