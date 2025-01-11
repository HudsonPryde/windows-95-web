import './Resume.css';

export default function Resume() {
  return (
    <object
      className="resume"
      type="application/pdf"
      data="hpstuart-resume.pdf"
    >
      <a href="hpstuart-resume.pdf">Download PDF</a>
    </object>
  );
}
