import './Window.css';
import { useDesktopDispatch } from '../desktop/Desktop';

export default function Close({ id }: { id: number }) {
  const dispatch = useDesktopDispatch();

  function handleClick() {
    dispatch({
      type: 'delete_window',
      data: { id },
    });
  }

  return <div className="close-container" onClick={handleClick}></div>;
}
