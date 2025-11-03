import "./About.css";
import authorImage from "../../images/about_Image1.png";

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This project was created as part of a software engineering bootcamp at
          TripleTen. The goal is to build a full-stack application that searches
          for news articles using the News API and allows users to save their
          favorite articles for later reading.
        </p>
      </div>
    </section>
  );
}

export default About;
