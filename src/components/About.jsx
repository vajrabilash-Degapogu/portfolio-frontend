import "../css/About.css";

import "../css/About.css";
import { FaJava } from "react-icons/fa";
import {
  FaChartBar,
} from "react-icons/fa";

import {
  SiPython,
  SiDjango,
  SiReact,
  SiSpringboot,
  SiPostgresql,
  SiJavascript,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
} from "react-icons/si";

import {
  FaFileExcel,
  FaDatabase,
  FaChartLine,
  FaBrain,
  FaCode,
} from "react-icons/fa";

const technologyColors = {
  Python: "#3776AB",
  Django: "#44B78B",
  "React.js": "#61DAFB",
  Java: "#ED8B00",
  "Spring Boot": "#6DB33F",
  JavaScript: "#F7DF1E",
  "Power BI": "#F2C811",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  "REST APIs": "#F97316",
  Excel: "#217346",
  SQL: "#4479A1",
  Pandas: "#150458",
  "NumPy": "#4DABCF",
  Matplotlib: "#11557C",
  Seaborn: "#4C72B0",
  Jupyter: "#F37626",
  "Scikit-learn": "#F7931E",
  TensorFlow: "#FF6F00",
  PyTorch: "#EE4C2C",
  "Machine Learning": "#8B5CF6",
  NLP: "#A855F7",
};

function About() {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* Section Heading */}
        <div className="section-heading">

          <p className="section-label">
            ABOUT ME
          </p>

          <h2>
            Building my path as{" "}
            <span>Python Full Stack Developer</span>
          </h2>

          <p className="section-intro">
            I'm focused on learning and building modern web applications
            while continuously improving my skills across frontend and
            backend development.
          </p>

        </div>


        {/* About Content */}
        <div className="about-content">

          {/* Who I Am */}
          <div className="about-card">

            <div className="about-card-number">
              01
            </div>

            <h3>Who I Am</h3>

            <p>
              I'm a developer focused on Python Full Stack Development.
              I enjoy turning ideas into practical web applications
              and learning how different parts of a full-stack system
              work together.
            </p>

          </div>


          {/* What I Build */}
          <div className="about-card">

            <div className="about-card-number">
              02
            </div>

            <h3>What I Build</h3>

            <p>
              I work with technologies such as Python, Django, React,
              Spring Boot and PostgreSQL to build responsive frontend
              interfaces and backend applications.
            </p>

          </div>


          {/* Development Focus */}
          <div className="about-card">

            <div className="about-card-number">
              03
            </div>

            <h3>Development Focus</h3>

            <p>
              My current focus is becoming a professional full-stack
              developer by strengthening my Python, Django, React,
              database and API development skills.
            </p>

          </div>

        </div>


        {/* Technology Strip */}
        <div className="about-tech">

  <span style={{ "--tech-color": technologyColors["Python"] }}>
    <<span>
    <SiPython />
    Python
  </span>

  <span style={{ "--tech-color": technologyColors["Django"] }}>
    <<span>
    <SiDjango />
    Django
  </span>

  <span style={{ "--tech-color": technologyColors["React.js"] }}>
    <<span>
    <SiReact />
    React.js
  </span>

  <span style={{ "--tech-color": technologyColors["Java"] }}>
    <<span>
    <FaJava />
    Java
  </span>

  <span style={{ "--tech-color": technologyColors["Spring Boot"] }}>
    <<span>
    <SiSpringboot />
    Spring Boot
  </span>

  <span style={{ "--tech-color": technologyColors["Java"] }}>
    <<span>
    <SiJavascript />
    JavaScript
  </span>

  <span style={{ "--tech-color": technologyColors["Power BI"] }}>
    <<span>
  <FaChartBar />
  Power BI
</span>

  <span style={{ "--tech-color": technologyColors["PostgreSQL"] }}>
    <<span>
    <SiPostgresql />
    PostgreSQL
  </span>

  <span style={{ "--tech-color": technologyColors["MySQL"] }}>
    <<span>
    <SiMysql />
    MySQL
  </span>

  <span style={{ "--tech-color": technologyColors["REST APIs"] }}>
    <<span>
    <FaCode />
    REST APIs
  </span>

  <span style={{ "--tech-color": technologyColors["Excel"] }}>
    <<span>
    <FaFileExcel />
    Excel
  </span>

 

  <span style={{ "--tech-color": technologyColors["SQL"] }}>
    <<span>
    <FaDatabase />
    SQL
  </span>

  <span style={{ "--tech-color": technologyColors["Pandas"] }}>
    <<span>
    <SiPandas />
    Pandas
  </span>

  <span style={{ "--tech-color": technologyColors["NumPy"] }}>
    <<span>
    <SiNumpy />
    NumPy
  </span>

  <span style={{ "--tech-color": technologyColors["Matplotlib"] }}>
    <<span>
    <FaChartLine />
    Matplotlib
  </span>

  <span style={{ "--tech-color": technologyColors["Seaborn"] }}>
    <<span>
    <FaChartLine />
    Seaborn
  </span>

  <span style={{ "--tech-color": technologyColors["Jupyter"] }}>
    <<span>
    <SiJupyter />
    Jupyter
  </span>

  <span style={{ "--tech-color": technologyColors["Scikit-learn"] }}>
    <<span>
    <SiScikitlearn />
    Scikit-learn
  </span>

  <span style={{ "--tech-color": technologyColors["TensorFlow"] }}>
    <<span>
    <SiTensorflow />
    TensorFlow
  </span>

  <span style={{ "--tech-color": technologyColors["PyTorch"] }}>
    <<span>
    <SiPytorch />
    PyTorch
  </span>

  <span style={{ "--tech-color": technologyColors["Machine Learning"] }}>
    <<span>
    <FaBrain />
    Machine Learning
  </span>

  <span style={{ "--tech-color": technologyColors["NLP"] }}>
    <<span>
    <FaBrain />
    NLP
  </span>

</div>

      </div>

    </section>
  );
}

export default About;