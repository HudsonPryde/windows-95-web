import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About this site</h2>
      <p>
        Hudson Pryde's portfolio, built as a Windows 95 desktop in React +
        TypeScript.
      </p>
      <p>
        Drag, resize, minimize, and restore the windows. Right-click the
        desktop or a shortcut for more options. The Start menu opens the
        programs included with this build.
      </p>
      <p>
        Source:{' '}
        <a
          href="https://github.com/HudsonPryde/windows-95-web"
          target="_blank"
          rel="noreferrer"
        >
          github.com/HudsonPryde/windows-95-web
        </a>
      </p>
    </div>
  );
}
