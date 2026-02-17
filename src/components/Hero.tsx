import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRocket } from "react-icons/fa";

interface HeroProps {
  nom: string;
  titre: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({ nom, titre, description }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center pt-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <FaCode className="text-blue-600 text-2xl" />
            <span className="text-gray-600 font-medium">Développeur Full Stack</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight"
          >
            Salut, je suis<br />
            <span className="gradient-text">{nom}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-4"
          >
            {titre}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 mb-8 leading-relaxed max-w-xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={() => scrollToSection("projets")}
              className="btn-solid flex items-center gap-2"
            >
              <FaRocket />
              Voir mes projets
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-outline"
            >
              Me contacter
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/Styveouamba"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:styveouamba@gmail.com"
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <FaEnvelope size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Bento grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          <div className="bento-card col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center h-48">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">3+</div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
          </div>
          <div className="bento-card bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600 text-sm">Projets</div>
            </div>
          </div>
          <div className="bento-card bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center h-40">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600 text-sm">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
