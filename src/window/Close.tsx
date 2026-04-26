import './Window.css';
import { useDesktopDispatch } from '../desktop/Desktop';
import CloseIcon from '../icons/close.png';

export default function Close({ id }: { id: number }) {
  const dispatch = useDesktopDispatch();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({
      type: 'delete_window',
      data: { id },
    });
  }

  return (
    <button
      type="button"
      className="function-container"
      onClick={handleClick}
      aria-label="Close window"
    >
      <img src={CloseIcon} width={16} height={16} alt="" />
    </button>
  );
}
