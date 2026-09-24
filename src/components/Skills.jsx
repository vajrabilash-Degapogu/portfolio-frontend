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

function Skills() {
  const skillGroups = [
    {
      title: "Languages",
      skills: [
        {
          name: "Python",
          icon: SiPython,
        },
        {
          name: "JavaScript",
          icon: SiJavascript,
        },
        {
          name: "Java",
          icon: FaJava,
        },
        {
          name: "SQL",
          icon: FaDatabase,
        },
      ],
    },

    {
      title: "Frontend",
      skills: [
        {
          name: "React.js",
          icon: SiReact,
        },
        {
          name: "HTML5",
          icon: SiHtml5,
        },
        {
          name: "CSS3",
          icon: FaCss3Alt,
        },
        {
          name: "Responsive Design",
          icon: FaMobileAlt,
        },
      ],
    },

    {
      title: "Backend",
      skills: [
        {
          name: "Django",
          icon: SiDjango,
        },
        {
          name: "Spring Boot",
          icon: SiSpringboot,
        },
        {
          name: "REST APIs",
          icon: FaCode,
        },
      ],
    },

    {
      title: "Database",
      skills: [
        {
          name: "PostgreSQL",
          icon: SiPostgresql,
        },
        {
          name: "MySQL",
          icon: SiMysql,
        },
        {
          name: "SQL",
          icon: FaDatabase,
        },
        {
          name: "CRUD Operations",
          icon: FaDatabase,
        },
      ],
    },

    {
      title: "Data Analytics",
      skills: [
        {
          name: "Excel",
          icon: FaFileExcel,
        },
        {
          name: "Power BI",
          icon: FaChartBar,
        },
        {
          name: "Pandas",
          icon: SiPandas,
        },
        {
          name: "NumPy",
          icon: SiNumpy,
        },
        {
          name: "Matplotlib",
          icon: FaChartLine,
        },
        {
          name: "Seaborn",
          icon: FaChartLine,
        },
        {
          name: "Jupyter Notebook",
          icon: SiJupyter,
        },
      ],
    },

    {
      title: "AI / Machine Learning",
      skills: [
        {
          name: "Scikit-learn",
          icon: SiScikitlearn,
        },
        {
          name: "TensorFlow",
          icon: SiTensorflow,
        },
        {
          name: "PyTorch",
          icon: SiPytorch,
        },
        {
          name: "Machine Learning",
          icon: FaBrain,
        },
      ],
    },

    {
      title: "Tools",
      skills: [
        {
          name: "Git",
          icon: SiGit,
        },
        {
          name: "GitHub",
          icon: SiGithub,
        },
        {
          name: "VS Code",
          icon: VscVscode,
        },
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">

      <div className="skills-container">

        <div className="skills-heading">

          <p className="skills-label">
            TECHNICAL SKILLS
          </p>

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

            <div
              className="skill-card"
              key={index}
            >

              <h3>{group.title}</h3>

              <div className="skill-list">

                {group.skills.map((skill, skillIndex) => {

                  const Icon = skill.icon;

                  return (
                    <span key={skillIndex}>

                      <Icon />

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