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
          Welcome!
          <br />
          Feel free to close this window and checkout
          <br /> what else I've linked on the desktop.
          <br />
          <br /> Keep reading to learn a bit about me :)
        </div>
      </div>
      <div className="profile-text">
        <p className="profile-about-me">
          Hey, I'm Hudson. It's nice to meet you! I'm a software engineer based
          in Toronto, Ontario. Most of my experience is in Fullstack
          development, but my interests also lie in interpreters, machine
          learning, data mining, and game development. I'm passionate about
          creating software with a positive social impact, like my app Study
          Scribe, which helps students with difficulty reading keep-up with
          their course readings and study effectively. I'm currently working on
          my next large-scale customer-facing project which aims to help local
          retailers compete with retail-chains for customer attraction and
          retention. This drive to have an impact is also why I chose two
          social-oriented startups to intern at. As an early career
          self-starter, the fast-paced energy of a startup was exactly what I
          was looking for, along with the reality that on such a tight dev team
          you have to make use of every resource so interns can quickly be
          counted as full team members if they prove their skill and drive. This
          enabled me to take ownership of many customer-facing features, updates
          to infrastructure, and guidance for new team members. These
          experiences have let me level up as a developer many times over and
          facilitated my ability to build high-level production-grade software.
        </p>
      </div>
    </div>
  );
}
