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
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br />
          <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
