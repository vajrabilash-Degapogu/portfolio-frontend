import resumeFile from "../assets/resume/DV_abhilash_FR.pdf";
import "../css/Resume.css";

function Resume() {
  return (
    <section className="resume-section" id="resume">
      <div className="resume-container">

        <p className="section-label">MY RESUME</p>

        <h2 className="resume-title">
          Let's build something <span>meaningful.</span>
        </h2>

        <p className="resume-description">
          View my resume to learn more about my skills, projects,
          education and development experience.
        </p>

        <div className="resume-buttons">

          {/* View Resume */}
          <a
            href={resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn resume-btn-primary"
          >
            View Resume
          </a>

          {/* Download Resume */}
          <a
            href={resumeFile}
            download="Vajrabilash_Resume.pdf"
            className="resume-btn resume-btn-secondary"
          >
            Download Resume
          </a>

        </div>

      </div>
    </section>
  );
}

export default Resume;