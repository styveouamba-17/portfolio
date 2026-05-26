import { motion } from "framer-motion";
import { portfolioData } from "./data/portfolioData";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Project";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar nom={portfolioData.nom} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Home
          nom={portfolioData.nom}
          titre={portfolioData.titre}
          description={portfolioData.description}
        />
        <About />
        <Skills competences={portfolioData.competences} />
        <Projects projets={portfolioData.projets} />
        <Contact contact={portfolioData.contact} />
      </motion.main>
      
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">© 2025 {portfolioData.nom}. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
