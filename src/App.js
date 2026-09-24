import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import Resume from "./components/Resume";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer"
import Certifications from "./components/Certifications";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Hero />

      <About />

      <Experience />

      <Skills />

      <Projects />

      <Education />

      <Certifications />

      <Resume />

      <Contact />

      <Footer />
    </div>
  );
}

export default App;