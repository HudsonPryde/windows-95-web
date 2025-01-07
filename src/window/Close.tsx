import './Window.css';
import { useDesktopDispatch } from '../desktop/Desktop';
import CloseIcon from '../icons/close.png';

export default function Close({ id }: { id: number }) {
  const dispatch = useDesktopDispatch();

  function handleClick() {
    dispatch({
      type: 'delete_window',
      data: { id },
    });
  }

  return (
    <div className="function-container" onClick={handleClick}>
      <img src={CloseIcon} width={16} height={16} alt="close" />
    </div>
  );
}
