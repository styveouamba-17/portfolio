import { useState } from "react";
import { motion } from "framer-motion";

import { portfolioData } from "./data/portfolioData";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Project";
import Contact from "./components/Contact";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("accueil");

  const sections = ["accueil", "a-propos", "competences", "projets", "contact"];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar
        nom={portfolioData.nom}
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {activeSection === "accueil" && (
          <Hero
            nom={portfolioData.nom}
            titre={portfolioData.titre}
            description={portfolioData.description}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === "a-propos" && <About />}
        {activeSection === "competences" && <Skills competences={portfolioData.competences} />}
        {activeSection === "projets" && <Projects projets={portfolioData.projets} />}
        {activeSection === "contact" && <Contact contact={portfolioData.contact} />}
      </motion.main>
    </div>
  );
};

export default App;