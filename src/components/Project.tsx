import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import type { Projet } from "../types";
import { FaGithub, FaExternalLinkAlt, FaUserTie, FaTimes } from "react-icons/fa";

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
    description: "Conception et développement d'une plateforme complète permettant d'optimiser le processus de recrutement avec un système avancé de filtrage des candidatures.",
    fonctionnalites: [
      "Portail d'inscription pour les candidats avec formulaire personnalisé",
      "Interface administrateur avec tableau de bord pour la gestion des candidatures",
      "Système de filtrage multicritères pour l'analyse des profils",
      "Automatisation des communications par email aux candidats sélectionnés",
    ],
    technologies: ["React", "Spring-Boot", "PostgreSQL", "API RESTful"],
  },
  {
    id: 2,
    titre: "Solution de gestion de carburant multiplateforme",
    description: "Développement d'un écosystème complet avec application web administrative et application mobile pour les utilisateurs finaux.",
    fonctionnalites: [
      "Monitoring en temps réel des niveaux de stock de carburant",
      "Tableau de bord analytique pour visualiser les tendances de consommation",
      "Système de QR Code sécurisé pour l'identification des clients",
      "Notifications automatisées par email et SMS pour les événements importants",
    ],
    technologies: ["React", "React Native", "Django", "PostgreSQL", "Twilio"],
  },
  {
    id: 3,
    titre: "Application mobile de gestion d'interventions techniques",
    description: "Création d'une solution mobile permettant l'organisation et le suivi des interventions techniques sur le terrain.",
    fonctionnalites: [
      "Interface administrateur pour l'attribution des missions aux techniciens",
      "Application mobile pour les techniciens avec liste des interventions à réaliser",
      "Système de rapports numériques avec signature électronique du client",
      "Cartographie en temps réel des techniciens pour optimiser les déplacements",
    ],
    technologies: ["React-native", "Node.js", "MongoDB", "Docker"],
  },
];

const Projects: React.FC<ProjectsProps> = ({ projets }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedClientProject, setSelectedClientProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projets" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
            Mes projets
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {projets.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(projet.id)}
              className="glass-effect rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative overflow-hidden h-56">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={`/images/${projet.image}`}
                  alt={projet.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">Voir les détails</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-accent">{projet.titre}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{projet.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {projet.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {projet.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-400">
                      +{projet.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={projet.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    <FaExternalLinkAlt size={14} />
                    <span className="text-sm">Démo</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={projet.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <FaGithub size={16} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">
            Réalisations professionnelles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Projets sur mesure développés pour des clients professionnels. Les détails sont généralisés par respect de la confidentialité.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientProjets.map((projet, index) => (
            <motion.div
              key={projet.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedClientProject(projet.id)}
              className="glass-effect rounded-2xl p-6 cursor-pointer group hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaUserTie className="text-blue-400 text-2xl" />
                <h3 className="text-xl font-bold text-accent">{projet.titre}</h3>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-3">{projet.description}</p>

              <div className="flex flex-wrap gap-2">
                {projet.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for personal projects */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {projets.map(
                (projet) =>
                  projet.id === selectedProject && (
                    <div key={projet.id}>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-accent">{projet.titre}</h3>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="text-gray-400 hover:text-white p-2"
                        >
                          <FaTimes size={24} />
                        </button>
                      </div>

                      <img
                        src={`/images/${projet.image}`}
                        alt={projet.titre}
                        className="w-full h-72 object-cover rounded-xl mb-6"
                      />

                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">{projet.description}</p>

                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {projet.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={projet.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                        >
                          <FaExternalLinkAlt />
                          Voir le projet
                        </a>
                        <a
                          href={projet.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
                        >
                          <FaGithub />
                          Code source
                        </a>
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for client projects */}
      <AnimatePresence>
        {selectedClientProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedClientProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {clientProjets.map(
                (projet) =>
                  projet.id === selectedClientProject && (
                    <div key={projet.id}>
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-bold text-accent">{projet.titre}</h3>
                        <button
                          onClick={() => setSelectedClientProject(null)}
                          className="text-gray-400 hover:text-white p-2"
                        >
                          <FaTimes size={24} />
                        </button>
                      </div>

                      <div className="glass-effect p-4 rounded-lg mb-6 flex items-center gap-3">
                        <FaUserTie className="text-blue-400 text-2xl" />
                        <p className="text-gray-300 italic">Projet réalisé dans un cadre professionnel</p>
                      </div>

                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">{projet.description}</p>

                      <div className="mb-6">
                        <h4 className="text-xl font-semibold mb-3 text-blue-300">Fonctionnalités principales</h4>
                        <ul className="space-y-2">
                          {projet.fonctionnalites.map((fonc, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>{fonc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {projet.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
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
