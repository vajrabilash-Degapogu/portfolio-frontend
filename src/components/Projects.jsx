import { useEffect, useState } from "react";
import "../css/Projects.css";
import {
  SiReact,
  SiSpringboot,
  SiPostgresql,
  SiPython,
  SiDjango,
  SiJavascript,
  SiMysql,
  SiGit,
  SiGithub,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiHtml5,
} from "react-icons/si";
import {
  FaJava,
  FaCss3Alt,
  FaDatabase,
  FaEnvelope,
  FaFileExcel,
  FaChartBar,
  FaChartLine,
  FaCode,
} from "react-icons/fa";
import { apiRequest } from "../admin/adminApi";

const icons = {
  react: SiReact,
  "react.js": SiReact,
  "spring boot": SiSpringboot,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  python: SiPython,
  django: SiDjango,
  javascript: SiJavascript,
  java: FaJava,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
  pandas: SiPandas,
  numpy: SiNumpy,
  "jupyter notebook": SiJupyter,
  "scikit-learn": SiScikitlearn,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  html5: SiHtml5,
  css3: FaCss3Alt,
  sql: FaDatabase,
  excel: FaFileExcel,
  "power bi": FaChartBar,
  matplotlib: FaChartLine,
  seaborn: FaChartLine,
  "rest apis": FaCode,
  "resend email otp": FaEnvelope,
};

const iconColors = {
  react: "#61DAFB",
  "react.js": "#61DAFB",
  "spring boot": "#6DB33F",
  postgresql: "#4169E1",
  postgres: "#4169E1",
  python: "#3776AB",
  django: "#44B78B",
  javascript: "#F7DF1E",
  java: "#ED8B00",
  mysql: "#4479A1",
  git: "#F05032",
  github: "#F0F6FC",
  pandas: "#150458",
  numpy: "#4DABCF",
  "jupyter notebook": "#F37626",
  "scikit-learn": "#F7931E",
  tensorflow: "#FF6F00",
  pytorch: "#EE4C2C",
  html5: "#E34F26",
  css3: "#1572B6",
  sql: "#4479A1",
  excel: "#217346",
  "power bi": "#F2C811",
  matplotlib: "#11557C",
  seaborn: "#4C72B0",
  "rest apis": "#F97316",
  "resend email otp": "#2563EB",
};

const fallback = [
  {
    id: "owntag",
    title: "owntag.in",
    type: "FULL STACK WEB APPLICATION",
    description: "A real-world web application developed as part of my full-stack development journey.",
    technologies: ["React.js", "Spring Boot", "PostgreSQL"],
    projectUrl: "https://www.owntag.in",
    githubUrl: "",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    type: "PERSONAL PROJECT",
    description: "A responsive developer portfolio built to showcase my skills, projects, education and development journey.",
    technologies: ["Python", "Django", "PostgreSQL"],
    projectUrl: "https://vajrabilash.in",
    githubUrl: "https://github.com/vajrabilash-Degapogu/portfolio-frontend",
  },
  {
    id: "portfoliocv",
    title: "PortfolioCV.in",
    type: "FULL-STACK CAREER PLATFORM",
    description: "A full-stack platform that helps students create professional resumes and personal portfolio websites, discover job opportunities, and track their applications.",
    technologies: ["React.js", "Django", "Python", "PostgreSQL", "REST APIs", "Resend Email OTP"],
    projectUrl: "https://www.portfoliocv.in",
    githubUrl: "https://github.com/portfoliocvin",
  },
  {
    id: "crud",
    title: "Python CRUD Application",
    type: "PYTHON PROJECT",
    description: "A practical CRUD application built while developing Python programming and backend development fundamentals.",
    technologies: ["Python", "Django", "PostgreSQL"],
    projectUrl: "",
    githubUrl: "",
  },
];

function Projects({ siteConfig }) {
  const [projects, setProjects] = useState(siteConfig?.projects || fallback);

  useEffect(() => {
    if (siteConfig?.projects) {
      setProjects(siteConfig.projects);
      return undefined;
    }

    let active = true;
    apiRequest("/api/public")
      .then((data) => {
        if (active && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [siteConfig]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-heading">
          <p className="projects-label">MY PROJECTS</p>
          <h2>
            Things I've <span>built</span>
          </h2>
          <p>
            A selection of projects that represent my learning, development skills
            and practical experience.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={project.id || index}>
              <div className="project-top">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-type">{project.type}</span>
              </div>

              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-technologies">
                {(project.technologies || []).map((technology, technologyIndex) => {
                  const name = typeof technology === "string" ? technology : technology.name;
                  const key = String(name || "").toLowerCase();
                  const Icon = icons[key] || SiPython;

                  return (
                    <span key={technologyIndex}>
                      <Icon
                        aria-hidden="true"
                        style={{ color: iconColors[key] || "#8b5cf6" }}
                      />
                      {name}
                    </span>
                  );
                })}
              </div>

              <div className="project-links">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button project-button-primary"
                  >
                    View Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
