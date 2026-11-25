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
    <SiPython style={{ color: "#3776AB" }} />
    Python
  </span>

  <span>
    <SiDjango style={{ color: "#44B78B" }} />
    Django
  </span>

  <span>
    <SiReact style={{ color: "#61DAFB" }} />
    React.js
  </span>

  <span>
    <FaJava style={{ color: "#ED8B00" }} />
    Java
  </span>

  <span>
    <SiSpringboot style={{ color: "#6DB33F" }} />
    Spring Boot
  </span>

  <span>
    <SiJavascript style={{ color: "#F7DF1E" }} />
    JavaScript
  </span>

  <span>
    <FaChartBar style={{ color: "#F2C811" }} />
    Power BI
  </span>

  <span>
    <SiPostgresql style={{ color: "#4169E1" }} />
    PostgreSQL
  </span>

  <span>
    <SiMysql style={{ color: "#4479A1" }} />
    MySQL
  </span>

  <span>
    <FaCode style={{ color: "#F97316" }} />
    REST APIs
  </span>

  <span>
    <FaFileExcel style={{ color: "#217346" }} />
    Excel
  </span>

  <span>
    <FaDatabase style={{ color: "#4479A1" }} />
    SQL
  </span>

  <span>
    <SiPandas style={{ color: "#150458" }} />
    Pandas
  </span>

  <span>
    <SiNumpy style={{ color: "#4DABCF" }} />
    NumPy
  </span>

  <span>
    <FaChartLine style={{ color: "#11557C" }} />
    Matplotlib
  </span>

  <span>
    <FaChartLine style={{ color: "#4C72B0" }} />
    Seaborn
  </span>

  <span>
    <SiJupyter style={{ color: "#F37626" }} />
    Jupyter
  </span>

  <span>
    <SiScikitlearn style={{ color: "#F7931E" }} />
    Scikit-learn
  </span>

  <span>
    <SiTensorflow style={{ color: "#FF6F00" }} />
    TensorFlow
  </span>

  <span>
    <SiPytorch style={{ color: "#EE4C2C" }} />
    PyTorch
  </span>

  <span>
    <FaBrain style={{ color: "#8B5CF6" }} />
    Machine Learning
  </span>

  <span>
    <FaBrain style={{ color: "#A855F7" }} />
    NLP
  </span>
</div>

      </div>

    </section>
  );
}

export default About;