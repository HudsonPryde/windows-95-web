export default function StartMenu({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="windows-container start-menu-container">
      <div className="start-menu-title-container">
        <div className="start-menu-title">
          Windows<span id="title-95">95</span>
        </div>
      </div>
    </div>
  );
}
