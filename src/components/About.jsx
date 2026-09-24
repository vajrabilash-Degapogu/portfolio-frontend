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

  <span>
    <SiPython />
    Python
  </span>

  <span>
    <SiDjango />
    Django
  </span>

  <span>
    <SiReact />
    React.js
  </span>

  <span>
    <FaJava />
    Java
  </span>

  <span>
    <SiSpringboot />
    Spring Boot
  </span>

  <span>
    <SiJavascript />
    JavaScript
  </span>

  <span>
  <FaChartBar />
  Power BI
</span>

  <span>
    <SiPostgresql />
    PostgreSQL
  </span>

  <span>
    <SiMysql />
    MySQL
  </span>

  <span>
    <FaCode />
    REST APIs
  </span>

  <span>
    <FaFileExcel />
    Excel
  </span>

 

  <span>
    <FaDatabase />
    SQL
  </span>

  <span>
    <SiPandas />
    Pandas
  </span>

  <span>
    <SiNumpy />
    NumPy
  </span>

  <span>
    <FaChartLine />
    Matplotlib
  </span>

  <span>
    <FaChartLine />
    Seaborn
  </span>

  <span>
    <SiJupyter />
    Jupyter
  </span>

  <span>
    <SiScikitlearn />
    Scikit-learn
  </span>

  <span>
    <SiTensorflow />
    TensorFlow
  </span>

  <span>
    <SiPytorch />
    PyTorch
  </span>

  <span>
    <FaBrain />
    Machine Learning
  </span>

  <span>
    <FaBrain />
    NLP
  </span>

</div>

      </div>

    </section>
  );
}

export default About;