import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { PortfolioData } from "../types";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaJira,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiFirebase } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";

interface SkillsProps {
  competences: PortfolioData["competences"];
}

const getSkillIcon = (skill: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    react: <FaReact className="text-cyan-400" />,
    "react native": <FaReact className="text-purple-400" />,
    typescript: <SiTypescript className="text-blue-500" />,
    html5: <FaHtml5 className="text-orange-500" />,
    css3: <FaCss3Alt className="text-blue-400" />,
    "tailwind css": <SiTailwindcss className="text-cyan-400" />,
    "node.js": <FaNodeJs className="text-green-500" />,
    express: <SiExpress className="text-gray-300" />,
    mongodb: <SiMongodb className="text-green-600" />,
    firebase: <SiFirebase className="text-yellow-500" />,
    "restful api": <TbApi className="text-blue-300" />,
    git: <FaGitAlt className="text-orange-600" />,
    github: <FaGithub className="text-gray-300" />,
    "vs code": <BiLogoVisualStudio className="text-blue-500" />,
    figma: <FaFigma className="text-purple-500" />,
    jira: <FaJira className="text-blue-500" />,
  };
  return iconMap[skill.toLowerCase()] || <FaReact className="text-gray-400" />;
};

const Skills: React.FC<SkillsProps> = ({ competences }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categoryLabels: { [key: string]: string } = {
    frontend: "Frontend",
    backend: "Backend",
    outils: "Outils & Méthodes",
  };

  return (
    <section id="competences" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
            Mes compétences
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(competences).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all group"
            >
              <h3 className="text-2xl font-bold mb-6 text-accent">
                {categoryLabels[category]}
              </h3>

              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="text-3xl">{getSkillIcon(skill)}</div>
                    <span className="text-gray-200 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-gray-400 mt-16 italic text-lg"
        >
          En constante évolution pour maîtriser les dernières technologies
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
