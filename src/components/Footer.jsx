import "../css/Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Footer Main */}
        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">

            <h2>Vajrabilash</h2>

            <p>
              Python Full Stack Developer focused on building
              modern web applications and continuously expanding
              my skills in data analytics and software development.
            </p>

          </div>


          {/* Quick Links */}
          <div className="footer-links">

            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>

          </div>


          {/* Connect */}
          <div className="footer-connect">

            <h3>Connect</h3>

            <div className="footer-socials">

              <a
                href="https://www.owntag.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Owntag website"
              >
                <i className="bi bi-globe"></i>
              </a>

              <a
                href="https://github.com/vajrabilash-Degapogu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>

              <a
                href="mailto:vajrabilash0399@gmail.com"
                aria-label="Email"
              >
                <i className="bi bi-envelope"></i>
              </a>

              <a
                href="tel:+918008044700"
                aria-label="Phone"
              >
                <i className="bi bi-telephone"></i>
              </a>

            </div>

          </div>

        </div>


        {/* Footer Bottom */}
        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Vajrabilash. All rights reserved.
          </p>

          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <i className="bi bi-arrow-up"></i>
          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;