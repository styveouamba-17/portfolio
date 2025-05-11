import { motion } from "framer-motion";

interface HeroProps {
  nom: string;
  titre: string;
  description: string;
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ nom, titre, description, setActiveSection }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900"
    >
      <div className="text-center max-w-3xl mx-auto px-4">
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Bonjour, je suis {nom}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl sm:text-3xl text-blue-400 mb-6"
        >
          {titre}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg text-gray-300 mb-8"
        >
          {description}
        </motion.p>
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            onClick={() => setActiveSection("projets")}
          >
            Voir mes projets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition"
            onClick={() => setActiveSection("contact")}
          >
            Me contacter
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;