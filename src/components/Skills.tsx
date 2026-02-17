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
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiFirebase, SiJira } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";

interface SkillsProps {
  competences: PortfolioData["competences"];
}

const getSkillIcon = (skill: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    react: <FaReact className="text-cyan-500" />,
    "react native": <FaReact className="text-purple-500" />,
    typescript: <SiTypescript className="text-blue-600" />,
    html5: <FaHtml5 className="text-orange-600" />,
    css3: <FaCss3Alt className="text-blue-500" />,
    "tailwind css": <SiTailwindcss className="text-cyan-500" />,
    "node.js": <FaNodeJs className="text-green-600" />,
    express: <SiExpress className="text-gray-700" />,
    mongodb: <SiMongodb className="text-green-600" />,
    firebase: <SiFirebase className="text-yellow-500" />,
    "restful api": <TbApi className="text-blue-500" />,
    git: <FaGitAlt className="text-orange-600" />,
    github: <FaGithub className="text-gray-800" />,
    "vs code": <BiLogoVisualStudio className="text-blue-600" />,
    figma: <FaFigma className="text-purple-600" />,
    jira: <SiJira className="text-blue-600" />,
  };
  return iconMap[skill.toLowerCase()] || <FaReact className="text-gray-600" />;
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
    <section id="competences" className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-badge">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-gray-900">Mes Compétences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Technologies et outils que j'utilise pour créer des applications modernes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(competences).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bento-card"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                {categoryLabels[category]}
              </h3>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + i * 0.05, duration: 0.3 }}
                    className="skill-badge"
                  >
                    <span className="text-xl">{getSkillIcon(skill)}</span>
                    <span className="text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
