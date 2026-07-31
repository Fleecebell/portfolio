import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Awards from "./components/Awards";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import AiWorkflow from "./components/AiWorkflow";
import Roadmap from "./components/Roadmap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Awards />
        <Experience />
        <Projects />
        <Skills />
        <AiWorkflow />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
