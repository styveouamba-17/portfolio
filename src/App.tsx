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
    <div className="min-h-screen bg-[#F8FAFC]">
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
      
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 {portfolioData.nom}. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;