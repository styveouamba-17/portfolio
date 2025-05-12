import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Projet } from "../types";
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaUserTie } from "react-icons/fa";

interface ProjectsProps {
  projets: Projet[];
}

// Interface pour les projets clients
interface ClientProjet {
  id: number;
  titre: string;
  description: string;
  fonctionnalites: string[];
  technologies: string[];
}

// Données des projets clients (à déplacer dans un fichier de données plus tard)
const clientProjets: ClientProjet[] = [
  {
    id: 1,
    titre: "Application web de gestion de recrutement",
    description: "Conception et développement d'une plateforme complète permettant d'optimiser le processus de recrutement avec un système avancé de filtrage des candidatures.",
    fonctionnalites: [
      "Portail d'inscription pour les candidats avec formulaire personnalisé",
      "Interface administrateur avec tableau de bord pour la gestion des candidatures",
      "Système de filtrage multicritères pour l'analyse des profils",
      "Automatisation des communications par email aux candidats sélectionnés"
    ],
    technologies: ["React", "Spring-Boot", "PostgreSQL", "API RESTful"]
  },
  {
    id: 2,
    titre: "Solution de gestion de carburant multiplateforme",
    description: "Développement d'un écosystème complet avec application web administrative et application mobile pour les utilisateurs finaux, permettant une gestion optimisée des ressources en carburant.",
    fonctionnalites: [
      "Monitoring en temps réel des niveaux de stock de carburant",
      "Tableau de bord analytique pour visualiser les tendances de consommation",
      "Système de QR Code sécurisé pour l'identification des clients",
      "Notifications automatisées par email et SMS pour les événements importants"
    ],
    technologies: ["React", "React Native", "Django", "PostgreSQL", "Twilio"]
  },
  {
    id: 3,
    titre: "Application mobile de gestion d'interventions techniques",
    description: "Création d'une solution mobile permettant l'organisation et le suivi des interventions techniques sur le terrain, avec géolocalisation et rapports numériques.",
    fonctionnalites: [
      "Interface administrateur pour l'attribution des missions aux techniciens",
      "Application mobile pour les techniciens avec liste des interventions à réaliser",
      "Système de rapports numériques avec signature électronique du client",
      "Cartographie en temps réel des techniciens pour optimiser les déplacements"
    ],
    technologies: ["React-native", "Node.js", "MongoDB", "Docker"]
  }
];

const Projects: React.FC<ProjectsProps> = ({ projets }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedClientProject, setSelectedClientProject] = useState<number | null>(null);

  const handleProjectClick = (id: number) => {
    setSelectedProject(selectedProject === id ? null : id);
  };

  const handleClientProjectClick = (id: number) => {
    setSelectedClientProject(selectedClientProject === id ? null : id);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          Mes projets
        </motion.h2>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-12"
        />
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projets.map((projet) => (
            <motion.div
              key={projet.id}
              variants={item}
              onMouseEnter={() => setHoveredProject(projet.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(projet.id)}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative"
            >
              <div className="relative overflow-hidden h-48">
                <motion.img
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: hoveredProject === projet.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  src={`/images/${projet.image}`}
                  alt={projet.titre}
                  className="w-full h-48 object-cover"
                />
                
                {hoveredProject === projet.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2"
                    >
                      <FaInfoCircle />
                      <span>Détails</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{projet.titre}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{projet.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projet.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={projet.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt size={14} />
                    <span>Voir le projet</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub size={20} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section des projets clients */}
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mt-20 mb-4 text-blue-400"
        >
          Réalisations professionnelles
        </motion.h2>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-12"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Découvrez une sélection de projets sur mesure que j'ai développés pour des clients professionnels. Ces réalisations démontrent ma capacité à créer des solutions techniques adaptées à des besoins métiers spécifiques. Par respect pour la confidentialité de mes clients, les détails présentés sont généralisés.
        </motion.p>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {clientProjets.map((projet) => (
            <motion.div
              key={projet.id}
              variants={item}
              onClick={() => handleClientProjectClick(projet.id)}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative border border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaUserTie className="text-blue-400 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-blue-400">{projet.titre}</h3>
                </div>
                
                <p className="text-gray-300 mb-4 line-clamp-3">{projet.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {projet.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <FaInfoCircle size={14} />
                  <span>Voir les détails</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {projets.map((projet) => 
                projet.id === selectedProject && (
                  <div key={projet.id}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-blue-400">{projet.titre}</h3>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-white text-xl font-bold p-2"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <img 
                      src={`/images/${projet.image}`} 
                      alt={projet.titre}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    
                    <p className="text-gray-300 mb-6">{projet.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Technologies utilisées</h4>
                      <div className="flex flex-wrap gap-2">
                        {projet.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700 text-blue-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={projet.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        <span>Voir le projet</span>
                      </a>
                      
                      <a
                        href={projet.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors"
                      >
                        <FaGithub />
                        <span>Code source</span>
                      </a>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal pour les projets clients */}
      <AnimatePresence>
        {selectedClientProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedClientProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {clientProjets.map((projet) => 
                projet.id === selectedClientProject && (
                  <div key={projet.id}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-blue-400">{projet.titre}</h3>
                      <button 
                        onClick={() => setSelectedClientProject(null)}
                        className="text-gray-400 hover:text-white text-xl font-bold p-2"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="bg-gray-700/50 p-4 rounded-lg mb-6 flex items-center">
                      <FaUserTie className="text-blue-400 mr-3" size={24} />
                      <p className="text-gray-300 italic">Projet réalisé dans un cadre professionnel</p>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{projet.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 text-blue-300">Fonctionnalités principales</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-300">
                        {projet.fonctionnalites.map((fonc, i) => (
                          <li key={i}>{fonc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2 text-blue-300">Technologies utilisées</h4>
                      <div className="flex flex-wrap gap-2">
                        {projet.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-gray-700 text-blue-300 px-3 py-1 rounded-full text-sm"
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
    </motion.section>
  );
};

export default Projects;