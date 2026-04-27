import { useState } from 'react';
import './Contact.css';

const EMAIL = 'hudsonpryde@gmail.com';
const GITHUB = 'https://github.com/hudsonpryde';
const LINKEDIN = 'https://linkedin.com/in/hudsonpryde';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="contact-container">
      <h2 className="contact-title">Get in touch</h2>

      <div className="contact-row">
        <label className="contact-label">Email:</label>
        <input className="contact-input" readOnly value={EMAIL} />
        <button className="win95-button" onClick={copyEmail}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <a className="win95-button" href={`mailto:${EMAIL}`}>
          Send
        </a>
      </div>

      <div className="contact-row">
        <label className="contact-label">GitHub:</label>
        <input className="contact-input" readOnly value={GITHUB} />
        <a
          className="win95-button"
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>

      <div className="contact-row">
        <label className="contact-label">LinkedIn:</label>
        <input className="contact-input" readOnly value={LINKEDIN} />
        <a
          className="win95-button"
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>

      <p className="contact-note">
        I'm open to full-time roles, especially at startups. Drop a line — I usually
        reply within a day or two.
      </p>
    </div>
  );
}
