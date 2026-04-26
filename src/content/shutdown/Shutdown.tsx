import './Shutdown.css';

export default function Shutdown({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="shutdown-screen" onClick={onRestart}>
      <div className="shutdown-text">
        It is now safe to turn off your computer.
      </div>
      <button className="shutdown-restart" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}
