import { motion } from "framer-motion";
import type { PortfolioData } from "../types";
import { 
  FaCode, FaServer, FaTools, 
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaJira,
} from "react-icons/fa";
import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiFirebase
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";

interface SkillsProps {
  competences: PortfolioData["competences"];
}

// Fonction pour obtenir l'icône correspondant à la catégorie
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "frontend":
      return <FaCode />;
    case "backend":
      return <FaServer />;
    case "outils":
      return <FaTools />;
    default:
      return <FaCode />;
  }
};

// Fonction pour obtenir l'icône correspondant à la compétence
const getSkillIcon = (skill: string) => {
  switch (skill.toLowerCase()) {
    // Frontend
    case "react":
      return <FaReact className="text-blue-400" />;
    case "react native":
      return <FaReact className="text-purple-400" />;
    case "typescript":
      return <SiTypescript className="text-blue-600" />;
    case "html5":
      return <FaHtml5 className="text-orange-500" />;
    case "css3":
      return <FaCss3Alt className="text-blue-500" />;
    case "tailwind css":
      return <SiTailwindcss className="text-cyan-400" />;
    
    // Backend
    case "node.js":
      return <FaNodeJs className="text-green-500" />;
    case "express":
      return <SiExpress className="text-gray-400" />;
    case "mongodb":
      return <SiMongodb className="text-green-600" />;
    case "firebase":
      return <SiFirebase className="text-yellow-500" />;
    case "restful api":
      return <TbApi className="text-blue-300" />;
    
    // Outils
    case "git":
      return <FaGitAlt className="text-red-500" />;
    case "github":
      return <FaGithub className="text-gray-300" />;
    case "vs code":
      return <BiLogoVisualStudio className="text-blue-500" />;
    case "figma":
      return <FaFigma className="text-purple-500" />;
    case "jira":
      return <FaJira className="text-blue-500" />;
    
    default:
      return <FaCode className="text-gray-400" />;
  }
};

// Composant pour afficher une compétence individuelle avec icône
const SkillItem: React.FC<{ skill: string; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-700 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-600 transition-colors duration-300"
    >
      <div className="text-2xl">
        {getSkillIcon(skill)}
      </div>
      <span className="text-gray-200 font-medium">{skill}</span>
    </motion.div>
  );
};

const Skills: React.FC<SkillsProps> = ({ competences }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          Mes compétences
        </motion.h2>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(competences).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-blue-400 text-2xl mr-3">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-semibold">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace("outils", "Outils & Méthodes")}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {skills.map((skill, i) => (
                  <SkillItem key={i} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 italic">
            Je suis constamment en train d'apprendre et d'améliorer mes compétences pour rester à jour avec les dernières technologies.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;