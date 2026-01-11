// About.jsx
import "./About.css";
import authorImage from "../../assets/images/author.jpg";

function About() {
  return (
    <section className="About">
      <div className="About__image">
        <img src={authorImage} alt="Author" className="About__img" />
      </div>
      <div className="About__content">
        <h2 className="About__title">About the author</h2>
        <p className="About__description">
          Hi, I&apos;m Rebekah Crockatt, a Full Stack Software Engineer
          specializing in JavaScript, React, Node.js, Express.js, and MongoDB. I
          build responsive web applications and RESTful APIs with a focus on
          clean, maintainable code.
          <br />
          <br />
          I&apos;m a recent TripleTen bootcamp graduate with 8+ years of utility
          operations experience. This unique background combines fresh
          development skills with strong problem-solving abilities and
          systematic thinking – helping me build reliable, user-focused
          applications that solve real business problems. I&apos;m ready to
          bring technical expertise, attention to detail, and a systematic
          approach to your next web development project.
        </p>
      </div>
    </section>
  );
}

export default About;
