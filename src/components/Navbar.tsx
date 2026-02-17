import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
  nom: string;
}

const Navbar: React.FC<NavbarProps> = ({ nom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "accueil", label: "Accueil" },
    { id: "a-propos", label: "À propos" },
    { id: "competences", label: "Compétences" },
    { id: "projets", label: "Projets" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold cursor-pointer"
            onClick={() => scrollToSection("accueil")}
          >
            <span className="gradient-text">{nom}</span>
          </motion.div>

          <ul className="hidden md:flex space-x-2">
            {sections.map((section) => (
              <motion.li key={section.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </motion.li>
            ))}
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200"
        >
          <div className="px-4 py-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
