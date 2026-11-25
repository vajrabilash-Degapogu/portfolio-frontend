import "../css/Skills.css";

import {
  SiPython,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiDjango,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";

import {
  FaJava,
  FaCss3Alt,
  FaDatabase,
  FaCode,
  FaMobileAlt,
  FaFileExcel,
  FaChartBar,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";

import { VscVscode } from "react-icons/vsc";

// Keep each technology mark in its recognizable brand colour.
const skillIconColors = {
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  Java: "#ED8B00",
  SQL: "#4479A1",
  "React.js": "#61DAFB",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "Responsive Design": "#8B5CF6",
  Django: "#44B78B",
  "Spring Boot": "#6DB33F",
  "REST APIs": "#F97316",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  "CRUD Operations": "#7F8C8D",
  Excel: "#217346",
  "Power BI": "#F2C811",
  Pandas: "#150458",
  NumPy: "#4DABCF",
  Matplotlib: "#11557C",
  Seaborn: "#4C72B0",
  "Jupyter Notebook": "#F37626",
  "Scikit-learn": "#F7931E",
  TensorFlow: "#FF6F00",
  PyTorch: "#EE4C2C",
  "Machine Learning": "#8B5CF6",
  Git: "#F05032",
  GitHub: "#F0F6FC",
  "VS Code": "#007ACC",
};

function Skills() {
  const skillGroups = [
    {
      title: "Languages",
      skills: [
        { name: "Python", icon: SiPython },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Java", icon: FaJava },
        { name: "SQL", icon: FaDatabase },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: SiReact },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: FaCss3Alt },
        { name: "Responsive Design", icon: FaMobileAlt },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Django", icon: SiDjango },
        { name: "Spring Boot", icon: SiSpringboot },
        { name: "REST APIs", icon: FaCode },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MySQL", icon: SiMysql },
        { name: "SQL", icon: FaDatabase },
        { name: "CRUD Operations", icon: FaDatabase },
      ],
    },
    {
      title: "Data Analytics",
      skills: [
        { name: "Excel", icon: FaFileExcel },
        { name: "Power BI", icon: FaChartBar },
        { name: "Pandas", icon: SiPandas },
        { name: "NumPy", icon: SiNumpy },
        { name: "Matplotlib", icon: FaChartLine },
        { name: "Seaborn", icon: FaChartLine },
        { name: "Jupyter Notebook", icon: SiJupyter },
      ],
    },
    {
      title: "AI / Machine Learning",
      skills: [
        { name: "Scikit-learn", icon: SiScikitlearn },
        { name: "TensorFlow", icon: SiTensorflow },
        { name: "PyTorch", icon: SiPytorch },
        { name: "Machine Learning", icon: FaBrain },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "VS Code", icon: VscVscode },
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="skills-heading">
          <p className="skills-label">TECHNICAL SKILLS</p>
          <h2>
            My <span>technology stack</span>
          </h2>
          <p>
            Technologies and development tools I use while building
            modern full-stack applications and developing my
            data analytics and AI/ML skills.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-card" key={index}>
              <h3>{group.title}</h3>
              <div className="skill-list">
                {group.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;

                  return (
                    <span key={skillIndex}>
                      <Icon
                        aria-hidden="true"
                        style={{ color: skillIconColors[skill.name] || "currentColor" }}
                      />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
