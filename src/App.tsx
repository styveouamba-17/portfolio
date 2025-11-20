import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Project";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar nom={portfolioData.nom} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero
          nom={portfolioData.nom}
          titre={portfolioData.titre}
          description={portfolioData.description}
        />
        <About />
        <Skills competences={portfolioData.competences} />
        <Projects projets={portfolioData.projets} />
        <Contact contact={portfolioData.contact} />
      </motion.main>
    </div>
  );
};

export default App;