import './Window.css';
import MaximizeIcon from '../icons/maximize.png';
import ResizeIcon from '../icons/resize.png';

export default function Fullscreen({
  onClick,
  isFullscreen,
}: {
  onClick: () => void;
  isFullscreen: boolean;
}) {
  return (
    <button
      type="button"
      className="function-container"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={isFullscreen ? 'Restore window' : 'Maximize window'}
    >
      <img
        src={isFullscreen ? ResizeIcon : MaximizeIcon}
        width={16}
        height={16}
        alt=""
      />
    </button>
  );
}
