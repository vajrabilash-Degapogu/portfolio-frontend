import "../css/Projects.css";
import {
  SiReact,
  SiSpringboot,
  SiPostgresql,
  SiPython,
  SiDjango,
} from "react-icons/si";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faReact,
//   faPython,
//   faJava,
//   faPostgresql,
//   faWhatsapp,
// } from "@fortawesome/free-brands-svg-icons";

// import {
//   faDatabase,
// } from "@fortawesome/free-solid-svg-icons";

function Projects() {
  const projects = [
    {
  number: "01",
  title: "owntag.in",
  type: "FULL STACK WEB APPLICATION",
  description:
    "A real-world web application developed as part of my full-stack development journey.",

  technologies: [
    {
      name: "React.js",
      icon: SiReact,
    },
    {
      name: "Spring Boot",
      icon: SiSpringboot,
    },
    {
      name: "PostgreSQL",
      icon: SiPostgresql,
    },
  ],

  projectUrl: "https://www.owntag.in",
},
    {
      number: "02",
      title: "Portfolio Website",
      type: "PERSONAL PROJECT",
      description:
        "A responsive developer portfolio built to showcase my skills, projects, education and development journey.",
      technologies: [
        {name:"Python", icon: SiPython,},
        {name:"Django", icon: SiDjango,},
        {name:"Postgresq", icon: SiPostgresql,},
        ],
    },
    {
      number: "03",
      title: "Python CRUD Application",
      type: "PYTHON PROJECT",
      description:
        "A practical CRUD application built while developing my Python programming and backend development fundamentals.",
      technologies: [
        {name:"Python", icon: SiPython,},
        {name:"Django", icon: SiDjango,},
        {name:"Postgresq", icon: SiPostgresql,},
        ],
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        <div className="projects-heading">
          <p className="projects-label">MY PROJECTS</p>

          <h2>
            Things I've <span>built</span>
          </h2>

          <p>
            A selection of projects that represent my learning,
            development skills and practical experience.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>

              <div className="project-top">
                <span className="project-number">
                  {project.number}
                </span>

                <span className="project-type">
                  {project.type}
                </span>
              </div>

              <h3>{project.title}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-technologies">
  {project.technologies.map((technology, techIndex) => {
    const Icon = technology.icon;

    return (
      <span key={techIndex}>
        <Icon />
        {technology.name}
      </span>
    );
  })}
</div>

              <div className="project-links">

                <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button project-button-primary"
                >
                    View Project
                </a>

                <button
                    type="button"
                    className="project-button"
                >
                    GitHub
                </button>

                </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;