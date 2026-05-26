import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { Projet } from "../types";
import {
  FaArrowRight,
  FaBriefcase,
  FaCode,
  FaGithub,
  FaGlobe,
  FaMobileScreenButton,
  FaXmark,
} from "react-icons/fa6";

interface ProjectsProps {
  projets: Projet[];
}

interface ClientProjet {
  id: number;
  titre: string;
  description: string;
  fonctionnalites: string[];
  technologies: string[];
  categorie: string;
}

type ProjectCategory = "site-web" | "app-web" | "mobile";

const clientProjets: ClientProjet[] = [
  {
    id: 1,
    titre: "Plateforme de recrutement",
    description:
      "Conception et développement d'une plateforme complète permettant d'optimiser le processus de recrutement de bout en bout.",
    fonctionnalites: [
      "Portail d'inscription pour les candidats",
      "Interface administrateur avec tableau de bord",
      "Système de filtrage multicritères",
      "Automatisation des communications par email",
    ],
    technologies: ["React", "Spring Boot", "PostgreSQL"],
    categorie: "Web App",
  },
  {
    id: 2,
    titre: "Gestion de carburant",
    description:
      "Écosystème complet web + mobile pour le suivi et la gestion des stocks carburant en temps réel.",
    fonctionnalites: [
      "Monitoring en temps réel des stocks",
      "Tableau de bord analytique",
      "Système de QR Code sécurisé",
      "Notifications automatisées",
    ],
    technologies: ["React", "React Native", "Django", "PostgreSQL"],
    categorie: "Web + Mobile",
  },
  {
    id: 3,
    titre: "App mobile interventions",
    description:
      "Solution mobile pour l'organisation, l'attribution et le suivi des interventions techniques terrain.",
    fonctionnalites: [
      "Attribution des missions aux techniciens",
      "Liste des interventions à réaliser",
      "Rapports numériques avec signature",
      "Cartographie en temps réel",
    ],
    technologies: ["React Native", "Node.js", "MongoDB"],
    categorie: "Mobile",
  },
];

const categoryConfig: Record<
  ProjectCategory,
  {
    label: string;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
  }
> = {
  "site-web": {
    label: "Sites web",
    title: "Sites vitrines & présences digitales",
    description:
      "Des sites modernes conçus pour présenter une marque, un service ou une activité avec clarté.",
    icon: FaGlobe,
    badge: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  },
  "app-web": {
    label: "Applications web",
    title: "Plateformes & tableaux de bord",
    description:
      "Des applications web orientées usage métier, gestion, données et expérience utilisateur.",
    icon: FaCode,
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },
  mobile: {
    label: "Applications mobiles",
    title: "Expériences mobiles",
    description:
      "Des applications pensées pour le terrain, le quotidien et les usages mobiles natifs.",
    icon: FaMobileScreenButton,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

const categories: ProjectCategory[] = ["site-web", "app-web", "mobile"];

const Projects: React.FC<ProjectsProps> = ({ projets }) => {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("site-web");

  const [showAllProjects, setShowAllProjects] = useState<
    Record<ProjectCategory, boolean>
  >({
    "site-web": false,
    "app-web": false,
    mobile: false,
  });

  const [activeModal, setActiveModal] = useState<{
    type: "project" | "client";
    id: number;
  } | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const groupedProjects = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = projets.filter(
        (projet) => projet.categorie === category
      );
      return acc;
    }, {} as Record<ProjectCategory, Projet[]>);
  }, [projets]);

  const getVisibleProjects = (category: ProjectCategory) => {
    const projects = groupedProjects[category];
    const maxVisible = 3;
    
    if (showAllProjects[category] || projects.length <= maxVisible) {
      return projects;
    }
    
    return projects.slice(0, maxVisible);
  };

  const hasMoreProjects = (category: ProjectCategory) => {
    return groupedProjects[category].length > 3;
  };

  const toggleShowAll = (category: ProjectCategory) => {
    setShowAllProjects((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const selectedProject = projets.find((p) => p.id === activeModal?.id);
  const selectedClient = clientProjets.find((p) => p.id === activeModal?.id);

  return (
    <section
      id="projets"
      ref={ref}
      className="relative overflow-hidden bg-white px-4 py-24 text-slate-950 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
              <span className="h-1.5 w-8 rounded-full bg-slate-950" />
              Portfolio
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-normal text-slate-950 md:text-5xl lg:text-6xl">
              Projets sélectionnés.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Une sélection organisée par type de réalisation : sites web,
              applications web et applications mobiles.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mb-10 grid gap-3 md:grid-cols-3"
        >
          {categories.map((category) => {
            const config = categoryConfig[category];
            const Icon = config.icon;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-900/10"
                    : "border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    isActive ? "bg-white text-slate-950" : "bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                </span>

                <span>
                  <span className="block text-sm font-bold">
                    {config.label}
                  </span>
                  <span
                    className={`mt-1 block text-xs font-medium ${
                      isActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {groupedProjects[category].length} projets
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {categoryConfig[activeCategory].label}
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-950">
                  {categoryConfig[activeCategory].title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {categoryConfig[activeCategory].description}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {getVisibleProjects(activeCategory).map((projet, index) => {
                const config = categoryConfig[activeCategory];

                return (
                  <motion.article
                    key={projet.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    onClick={() =>
                      setActiveModal({ type: "project", id: projet.id })
                    }
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={`/images/${projet.image}`}
                        alt={projet.titre}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1 backdrop-blur ${config.badge}`}
                      >
                        {config.label}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <span className="text-sm font-semibold text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <h4 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">
                            {projet.titre}
                          </h4>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white">
                          <FaArrowRight size={14} />
                        </span>
                      </div>

                      <p className="line-clamp-3 text-base leading-7 text-slate-600">
                        {projet.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {projet.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {hasMoreProjects(activeCategory) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => toggleShowAll(activeCategory)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  {showAllProjects[activeCategory] ? (
                    <>
                      Voir moins
                      <FaArrowRight size={13} className="rotate-180" />
                    </>
                  ) : (
                    <>
                      Voir plus ({groupedProjects[activeCategory].length - 3}{" "}
                      autres)
                      <FaArrowRight size={13} />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Réalisations professionnelles
            </p>

            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              Solutions livrées en contexte client.
            </h3>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Des applications pensées pour des usages métier : gestion,
              automatisation, suivi terrain et tableaux de bord.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                <FaBriefcase size={17} />
              </div>

              <div className="mt-4 text-2xl font-bold text-slate-950">
                {clientProjets.length} cas
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                Web, mobile et plateformes métier
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            {clientProjets.map((projet, index) => (
              <motion.article
                key={projet.id}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.35 + index * 0.08,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                onClick={() =>
                  setActiveModal({ type: "client", id: projet.id })
                }
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/8"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <FaBriefcase size={18} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                          {projet.categorie}
                        </span>
                      </div>

                      <h4 className="mt-3 text-2xl font-bold tracking-normal text-slate-950">
                        {projet.titre}
                      </h4>

                      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        {projet.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {projet.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white">
                    <FaArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
                aria-label="Fermer"
              >
                <FaXmark size={16} />
              </button>

              {activeModal.type === "project" && selectedProject && (
                <>
                  <img
                    src={`/images/${selectedProject.image}`}
                    alt={selectedProject.titre}
                    className="h-72 w-full object-cover"
                  />

                  <div className="p-7 md:p-8">
                    <div
                      className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                        categoryConfig[
                          selectedProject.categorie as ProjectCategory
                        ]?.badge ?? "bg-slate-100 text-slate-700 ring-slate-200"
                      }`}
                    >
                      <FaCode size={12} />
                      {
                        categoryConfig[
                          selectedProject.categorie as ProjectCategory
                        ]?.label
                      }
                    </div>

                    <h3 className="text-3xl font-bold text-slate-950">
                      {selectedProject.titre}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {selectedProject.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {selectedProject.lien !== "#" && (
                        <a
                          href={selectedProject.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Voir le projet
                          <FaArrowRight size={13} />
                        </a>
                      )}

                      {selectedProject.code !== "#" && (
                        <a
                          href={selectedProject.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950"
                        >
                          <FaGithub size={15} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeModal.type === "client" && selectedClient && (
                <div className="p-7 md:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                    <FaBriefcase size={12} />
                    {selectedClient.categorie}
                  </div>

                  <h3 className="text-3xl font-bold text-slate-950">
                    {selectedClient.titre}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {selectedClient.description}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                      Fonctionnalités clés
                    </h4>

                    <div className="mt-4 space-y-3">
                      {selectedClient.fonctionnalites.map((feature) => (
                        <div
                          key={feature}
                          className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-950" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedClient.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;