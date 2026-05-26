import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";

interface NavbarProps {
  nom: string;
}

const Navbar: React.FC<NavbarProps> = ({ nom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const sections = [
    { id: "accueil", label: "Accueil", num: "01" },
    { id: "a-propos", label: "À propos", num: "02" },
    { id: "competences", label: "Skills", num: "03" },
    { id: "projets", label: "Projets", num: "04" },
    { id: "contact", label: "Contact", num: "05" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const current = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4"
    >
      <div
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          scrolled || isOpen
            ? "border-slate-200/80 bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
            : "border-transparent bg-white/45 backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <button
            onClick={() => scrollToSection("accueil")}
            className="group flex items-center gap-3"
            aria-label="Retour à l'accueil"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold uppercase text-white shadow-sm transition group-hover:-translate-y-0.5">
              {nom.charAt(0)}
            </span>

            <span className="hidden text-left sm:block">
              <span className="block text-sm font-bold uppercase tracking-normal text-slate-950">
                {nom}
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Portfolio
              </span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    activeSection === section.id
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <span
                    className={`text-[10px] font-medium ${
                      activeSection === section.id
                        ? "text-slate-300"
                        : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  >
                    {section.num}
                  </span>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollToSection("contact")}
            className="hidden items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 md:flex"
          >
            Disponible
            <FaArrowRight size={12} />
          </button>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-slate-950 md:hidden"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-slate-200/80 md:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeSection === section.id
                        ? "bg-slate-950 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`text-[11px] ${
                          activeSection === section.id
                            ? "text-slate-300"
                            : "text-slate-400"
                        }`}
                      >
                        {section.num}
                      </span>
                      {section.label}
                    </span>

                    {activeSection === section.id && <FaArrowRight size={12} />}
                  </motion.button>
                ))}

                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Me contacter
                  <FaArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;