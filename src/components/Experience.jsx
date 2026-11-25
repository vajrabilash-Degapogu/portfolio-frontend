import "../css/Experience.css";

import {
  SiPython,
  SiDjango,
  SiReact,
  SiPostgresql,
  SiSpringboot,
  SiGit,
} from "react-icons/si";

import {
  FaCode,
  FaDatabase,
  FaCloudUploadAlt,
} from "react-icons/fa";

const experienceIconColors = {
  Python: "#3776AB",
  Django: "#44B78B",
  "React.js": "#61DAFB",
  PostgreSQL: "#4169E1",
  "REST API": "#F97316",
  "Spring Boot": "#6DB33F",
  CRUD: "#7F8C8D",
  APIs: "#F97316",
  Database: "#4479A1",
  Git: "#F05032",
  Deployment: "#8B5CF6",
};

function Experience() {
  return (
    <section className="experience-section" id="experience">

      <div className="experience-container">

        {/* Section Heading */}

        <div className="section-heading">

          <p className="section-label">
            EXPERIENCE
          </p>

          <h2>
            My <span>development journey</span>
          </h2>

          <p className="section-intro">
            My experience has been shaped by building practical
            applications and continuously expanding my full-stack
            development skills.
          </p>

        </div>


        {/* Timeline */}

        <div className="experience-timeline">


          {/* Experience 01 */}

          <div className="experience-item">

            <div className="experience-marker">
              01
            </div>

            <div className="experience-card">

              <div className="experience-header">

                <div>

                  <p className="experience-type">
                    FULL STACK DEVELOPMENT
                  </p>

                  <h3>
                    Python Full Stack Development
                  </h3>

                </div>

                <span className="experience-status">
                  Current Focus
                </span>

              </div>


              <p className="experience-description">
                Developing my skills across frontend and backend
                development with a focus on Python, Django, React,
                REST APIs and PostgreSQL.
              </p>


              <div className="experience-tech">

                <span>
                  <SiPython  style={{ color: experienceIconColors["Python"] || "#8b5cf6" }} />
                  Python
                </span>

                <span>
                  <SiDjango  style={{ color: experienceIconColors["Django"] || "#8b5cf6" }} />
                  Django
                </span>

                <span>
                  <SiReact  style={{ color: experienceIconColors["React.js"] || "#8b5cf6" }} />
                  React.js
                </span>

                <span>
                  <SiPostgresql  style={{ color: experienceIconColors["PostgreSQL"] || "#8b5cf6" }} />
                  PostgreSQL
                </span>

                <span>
                  <FaCode  style={{ color: experienceIconColors["REST API"] || "#8b5cf6" }} />
                  REST API
                </span>

              </div>

            </div>

          </div>


          {/* Experience 02 */}

          <div className="experience-item">

            <div className="experience-marker">
              02
            </div>

            <div className="experience-card">

              <div className="experience-header">

                <div>

                  <p className="experience-type">
                    WEB APPLICATION DEVELOPMENT
                  </p>

                  <h3>
                    React & Spring Boot Development
                  </h3>

                </div>

                <span className="experience-status">
                  Project Experience
                </span>

              </div>


              <p className="experience-description">
                Built full-stack web application features using
                React for the frontend and Spring Boot with
                PostgreSQL for backend services and data management.
              </p>


              <div className="experience-tech">

                <span>
                  <SiReact  style={{ color: experienceIconColors["React.js"] || "#8b5cf6" }} />
                  React.js
                </span>

                <span>
                  <SiSpringboot  style={{ color: experienceIconColors["Spring Boot"] || "#8b5cf6" }} />
                  Spring Boot
                </span>

                <span>
                  <SiPostgresql  style={{ color: experienceIconColors["PostgreSQL"] || "#8b5cf6" }} />
                  PostgreSQL
                </span>

                <span>
                  <FaCode  style={{ color: experienceIconColors["REST API"] || "#8b5cf6" }} />
                  REST API
                </span>

              </div>

            </div>

          </div>


          {/* Experience 03 */}

          <div className="experience-item">

            <div className="experience-marker">
              03
            </div>

            <div className="experience-card">

              <div className="experience-header">

                <div>

                  <p className="experience-type">
                    PROJECT DEVELOPMENT
                  </p>

                  <h3>
                    Real-World Application Building
                  </h3>

                </div>

                <span className="experience-status">
                  Ongoing
                </span>

              </div>


              <p className="experience-description">
                Working on practical applications that involve
                database design, CRUD operations, APIs, responsive
                interfaces and deployment workflows.
              </p>


              <div className="experience-tech">

                <span>
                  <FaDatabase  style={{ color: experienceIconColors["CRUD"] || "#8b5cf6" }} />
                  CRUD
                </span>

                <span>
                  <FaCode  style={{ color: experienceIconColors["APIs"] || "#8b5cf6" }} />
                  APIs
                </span>

                <span>
                  <FaDatabase  style={{ color: experienceIconColors["Database"] || "#8b5cf6" }} />
                  Database
                </span>

                <span>
                  <SiGit  style={{ color: experienceIconColors["Git"] || "#8b5cf6" }} />
                  Git
                </span>

                <span>
                  <FaCloudUploadAlt  style={{ color: experienceIconColors["Deployment"] || "#8b5cf6" }} />
                  Deployment
                </span>

              </div>

            </div>

          </div>


        </div>

      </div>

    </section>
  );
}

export default Experience;