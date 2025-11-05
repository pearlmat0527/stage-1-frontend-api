import githubIcon from "../../images/github.png";
import linkedinIcon from "../../images/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2025 Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            TripleTen
          </a>
        </nav>
        <div className="footer__social">
          <a
            href="https://github.com/pearlmat0527"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className="footer__social-icon"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/pearly-mathew-000422194/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="footer__social-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
