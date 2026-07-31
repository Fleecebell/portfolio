import Header from "./components/Header";
import Hero from "./components/Hero";
import Awards from "./components/Awards";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Awards />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
