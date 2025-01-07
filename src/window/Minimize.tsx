import './Window.css';
import { useDesktop, useDesktopDispatch } from '../desktop/Desktop';
import MinimizeIcon from '../icons/minimize.png';

export default function Minimize({ id }: { id: number }) {
  const state = useDesktop();
  const dispatch = useDesktopDispatch();

  function handleClick() {
    dispatch({
      type: 'hide_window',
      data: {
        id,
      },
    });
    console.log(state);
  }

  return (
    <div className="function-container" onClick={handleClick}>
      <img src={MinimizeIcon} width={16} height={16} alt="close" />
    </div>
  );
}
