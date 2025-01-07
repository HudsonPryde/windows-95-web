import './Window.css';
import MaximizeIcon from '../icons/maximize.png';
import ResizeIcon from '../icons/resize.png';

export default function Fullscreen({
  onClick,
  isFullscreen,
}: {
  onClick: Function;
  isFullscreen: boolean;
}) {
  return (
    <div className="function-container" onClick={() => onClick()}>
      <img
        src={isFullscreen ? ResizeIcon : MaximizeIcon}
        width={16}
        height={16}
        alt="close"
      />
    </div>
  );
}
