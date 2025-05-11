import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaServer } from "react-icons/fa";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      className="bg-gray-700 p-6 rounded-lg shadow-md"
    >
      <div className="text-blue-400 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  const skills = [
    {
      icon: <FaLaptopCode />,
      title: "Front-end",
      description: "Développement d'interfaces utilisateur modernes et réactives avec React, Vue.js et Angular."
    },
    {
      icon: <FaServer />,
      title: "Back-end",
      description: "Création d'APIs robustes et évolutives avec Node.js, Express, et bases de données SQL/NoSQL."
    },
    {
      icon: <FaCode />,
      title: "Full Stack",
      description: "Intégration complète de solutions web, du concept à la mise en production avec CI/CD."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-800"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          À propos de moi
        </motion.h2>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-10"
        />

        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:w-1/3"
          >
            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-xl">
              <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Développeur Full Stack</h3>
                <p className="text-gray-300">Passionné par le développement web et mobile</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:w-2/3 text-lg text-gray-300 space-y-6"
          >
            <p>
              Je suis un développeur full stack passionné par la création d'applications web et mobiles modernes.
              Avec une solide expérience dans les technologies front-end et back-end, je développe des solutions
              complètes et performantes qui répondent aux besoins des utilisateurs.
            </p>
            <p>
              Mon approche est centrée sur la création d'interfaces utilisateur intuitives et d'architectures
              robustes. Je m'efforce constamment d'améliorer mes compétences et de rester à jour avec les
              dernières technologies et meilleures pratiques du développement web et mobile.
            </p>
            <p>
              Je suis particulièrement intéressé par les projets innovants qui présentent des défis techniques
              et qui ont un impact positif. Ma capacité à comprendre les besoins métier et à les traduire en
              solutions techniques efficaces est l'une de mes principales forces.
            </p>
          </motion.div>
        </div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-10"
        >
          Mes compétences
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;