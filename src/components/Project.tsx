import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import type { Projet } from "../types";
import { FaGithub, FaExternalLinkAlt, FaUserTie, FaTimes, FaCode } from "react-icons/fa";

interface ProjectsProps {
  projets: Projet[];
}

interface ClientProjet {
  id: number;
  titre: string;
  description: string;
  fonctionnalites: string[];
  technologies: string[];
}

const clientProjets: ClientProjet[] = [
  {
    id: 1,
    titre: "Application web de gestion de recrutement",
    description: "Conception et développement d'une plateforme complète permettant d'optimiser le processus de recrutement.",
    fonctionnalites: [
      "Portail d'inscription pour les candidats",
      "Interface administrateur avec tableau de bord",
      "Système de filtrage multicritères",
      "Automatisation des communications par email",
    ],
    technologies: ["React", "Spring-Boot", "PostgreSQL"],
  },
  {
    id: 2,
    titre: "Solution de gestion de carburant",
    description: "Développement d'un écosystème complet avec application web et mobile.",
    fonctionnalites: [
      "Monitoring en temps réel des stocks",
      "Tableau de bord analytique",
      "Système de QR Code sécurisé",
      "Notifications automatisées",
    ],
    technologies: ["React", "React Native", "Django", "PostgreSQL"],
  },
  {
    id: 3,
    titre: "Application mobile d'interventions",
    description: "Solution mobile pour l'organisation et le suivi des interventions techniques.",
    fonctionnalites: [
      "Attribution des missions aux techniciens",
      "Liste des interventions à réaliser",
      "Rapports numériques avec signature",
      "Cartographie en temps réel",
    ],
    technologies: ["React-native", "Node.js", "MongoDB"],
  },
];

const Projects: React.FC<ProjectsProps> = ({ projets }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedClientProject, setSelectedClientProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projets" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-badge">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-gray-900">Mes Projets</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez mes réalisations personnelles et professionnelles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projets.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedProject(projet.id)}
              className="bento-card cursor-pointer group overflow-hidden"
            >
              <div className="relative overflow-hidden h-48 rounded-xl mb-4">
                <img
                  src={`/images/${projet.image}`}
                  alt={projet.titre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900">{projet.titre}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{projet.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {projet.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={projet.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <FaExternalLinkAlt size={14} />
                  Démo
                </a>
                <a
                  href={projet.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  <FaGithub size={16} />
                  Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-900">Réalisations Professionnelles</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProjets.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedClientProject(projet.id)}
              className="bento-card cursor-pointer group bg-gradient-to-br from-blue-50 to-purple-50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <FaUserTie size={20} />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900">{projet.titre}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{projet.description}</p>

              <div className="flex flex-wrap gap-2">
                {projet.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/80 text-blue-600 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {projets.map(
                (projet) =>
                  projet.id === selectedProject && (
                    <div key={projet.id}>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-gray-900">{projet.titre}</h3>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes size={24} />
                        </button>
                      </div>

                      <img
                        src={`/images/${projet.image}`}
                        alt={projet.titre}
                        className="w-full h-72 object-cover rounded-xl mb-6"
                      />

                      <p className="text-gray-600 mb-6">{projet.description}</p>

                      <div className="flex gap-4">
                        <a
                          href={projet.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-solid flex items-center gap-2"
                        >
                          <FaExternalLinkAlt />
                          Voir le projet
                        </a>
                        <a
                          href={projet.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline flex items-center gap-2"
                        >
                          <FaGithub />
                          Code
                        </a>
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedClientProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedClientProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {clientProjets.map(
                (projet) =>
                  projet.id === selectedClientProject && (
                    <div key={projet.id}>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-gray-900">{projet.titre}</h3>
                        <button
                          onClick={() => setSelectedClientProject(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes size={24} />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-6">{projet.description}</p>

                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3">Fonctionnalités</h4>
                        <ul className="space-y-2">
                          {projet.fonctionnalites.map((fonc, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                              <FaCode className="text-blue-600 mt-1" />
                              <span>{fonc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
