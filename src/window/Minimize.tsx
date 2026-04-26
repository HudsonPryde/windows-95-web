import './Window.css';
import { useDesktopDispatch } from '../desktop/Desktop';
import MinimizeIcon from '../icons/minimize.png';

export default function Minimize({ id }: { id: number }) {
  const dispatch = useDesktopDispatch();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({
      type: 'hide_window',
      data: { id },
    });
  }

  return (
    <button
      type="button"
      className="function-container"
      onClick={handleClick}
      aria-label="Minimize window"
    >
      <img src={MinimizeIcon} width={16} height={16} alt="" />
    </button>
  );
}
