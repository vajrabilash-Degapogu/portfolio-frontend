import profileImage from "../assets/images/profile.jpg";
import "../css/Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <p className="hero-role">
            PYTHON FULL STACK DEVELOPER
          </p>

          <h1>
            Hi, I'm <span>Vajrabilash</span>
          </h1>

          <h2>
            I build modern web applications.
          </h2>

          <p className="hero-description">
            I'm a developer focused on building reliable and
            user-friendly web applications using Python, Django,
            React and PostgreSQL.
          </p>

          <div className="hero-buttons">

            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>

            <a
              href="#resume"
              className="btn btn-secondary"
            >
              View Resume
            </a>

          </div>

        </div>


        {/* Right Image */}
        <div className="hero-image-container">

          <div className="hero-image-wrapper">

            <img
              src={profileImage}
              alt="Vajrabilash - Python Full Stack Developer"
              className="hero-image"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;