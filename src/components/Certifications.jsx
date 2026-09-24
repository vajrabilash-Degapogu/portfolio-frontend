import "../css/Certifications.css";

import artificialIntelligenceCertificate from "../assets/certificates/artificial_int.pdf";
import javaCertificate from "../assets/certificates/java_certificate.pdf";
import pythonAICertificate from "../assets/certificates/python_with_ai.pdf";

function Certifications() {

  const certifications = [
    {
      number: "01",
      title: "Artificial Intelligence Quiz",
      organization: "Sreyas Institute of Engineering and Technology",
      year: "2020",
      score: "70%",
      description:
        "Certificate of Appreciation for scoring 70% in the Artificial Intelligence Quiz conducted by the Department of Computer Science and Engineering.",
      certificateFile: artificialIntelligenceCertificate,
    },

    {
      number: "02",
      title: "Java Assessment",
      organization: "LearnTube by CareerNinja",
      year: "2025",
      description:
        "Certificate of Completion for successfully completing the Java Assessment.",
      certificateFile: javaCertificate,
    },

    {
      number: "03",
      title: "Python Using AI Workshop",
      organization: "AI for Techies",
      year: "2024",
      description:
        "Certificate of Completion for completing a 3-hour Python Using AI workshop covering AI-assisted Python development and interactive visualizations.",
      certificateFile: pythonAICertificate,
    },
  ];

  return (
    <section
      className="certifications-section"
      id="certifications"
    >

      <div className="certifications-container">

        {/* Heading */}

        <div className="certifications-heading">

          <p className="certifications-label">
            CERTIFICATIONS
          </p>

          <h2>
            My <span>certifications</span>
          </h2>

          <p>
            Certifications and workshops that represent my
            continuous learning and technical development.
          </p>

        </div>


        {/* Certifications */}

        <div className="certifications-grid">

          {certifications.map((certification, index) => (

            <div
              className="certification-card"
              key={index}
            >

              {/* Top */}

              <div className="certification-top">

                <span className="certification-number">
                  {certification.number}
                </span>

                <span className="certification-year">
                  {certification.year}
                </span>

              </div>


              {/* Icon */}

              <div className="certification-icon">

                <i className="bi bi-award"></i>

              </div>


              {/* Content */}

              <h3>
                {certification.title}
              </h3>

              <h4>
                {certification.organization}
              </h4>


              {/* Score */}

              {certification.score && (
                <div className="certification-score">
                  Score: {certification.score}
                </div>
              )}


              <p>
                {certification.description}
              </p>


              {/* View Certificate */}

              <a
                href={certification.certificateFile}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-button"
              >
                <i className="bi bi-file-earmark-pdf"></i>
                View Certificate
              </a>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Certifications;