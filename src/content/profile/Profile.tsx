import './Profile.css';
import ProfilePic from './portfolio-profile.png';

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={ProfilePic}
          alt="profile"
          className="profile-picture no-select"
        />

        <div className="profile-welcome">
          <p className="profile-welcome-line">Welcome!</p>
          <p className="profile-welcome-sub">
            Feel free to close this window and explore the rest of the desktop.
          </p>
          <p className="profile-welcome-sub">Or keep reading to learn a bit about me. :)</p>
        </div>
      </div>

      <div className="profile-text">
        <h2 className="profile-section-heading">About me</h2>

        <p className="profile-paragraph">
          Hey, I'm <strong>Hudson</strong> — a software engineer based in{' '}
          <strong>Toronto, Ontario</strong>. Most of my experience is in{' '}
          <strong>fullstack development</strong>, but I also spend time in:
        </p>

        <ul className="profile-list">
          <li>Interpreters and language design</li>
          <li>Machine learning</li>
          <li>Data mining</li>
          <li>Game development</li>
        </ul>

        <h2 className="profile-section-heading">What I'm working on</h2>

        <p className="profile-paragraph">
          I'm passionate about building software with a positive social impact.
          One example is my app{' '}
          <strong>Study Scribe</strong> — it helps students who struggle with
          reading keep up with their course material and study effectively.
        </p>

        <p className="profile-paragraph">
          Right now I'm building my next large-scale customer-facing project,
          aimed at helping <strong>local retailers compete with chains</strong>{' '}
          for customer attraction and retention.
        </p>

        <h2 className="profile-section-heading">Where I've been</h2>

        <p className="profile-paragraph">
          That same drive to have an impact is why I chose to intern at two
          social-oriented startups. As an early-career self-starter, the
          fast-paced energy of a startup was exactly what I was looking for —
          and on a small dev team, an intern who proves their skill and drive
          quickly gets counted as a full team member.
        </p>

        <p className="profile-paragraph">
          That gave me ownership of customer-facing features, infrastructure
          updates, and onboarding for new teammates. Those experiences leveled
          me up many times over and built my ability to ship high-quality,
          production-grade software.
        </p>
      </div>
    </div>
  );
}
