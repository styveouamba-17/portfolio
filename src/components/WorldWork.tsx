import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { Projet } from "../types";

interface WorldWorkProps {
  projets: Projet[];
}

const categories = [
  {
    key: "site-web",
    label: "Sites web",
    eyebrow: "Vitrine",
    desc: "Identite, presence en ligne, storytelling et conversion.",
    x: "30%",
    y: "30%",
  },
  {
    key: "app-web",
    label: "Applications web",
    eyebrow: "Produit",
    desc: "Interfaces metier, dashboards, logique utilisateur et donnees.",
    x: "72%",
    y: "28%",
  },
  {
    key: "mobile",
    label: "Mobile",
    eyebrow: "Terrain",
    desc: "Experiences mobiles fluides, utiles et proches de l'usage reel.",
    x: "58%",
    y: "70%",
  },
];

const WorldWork: React.FC<WorldWorkProps> = ({ projets }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const firstCategoryWithProjects =
    categories.find((category) => projets.some((project) => project.categorie === category.key)) ??
    categories[0];

  const [activeCategory, setActiveCategory] = useState(firstCategoryWithProjects.key);

  const filteredProjects = useMemo(
    () => projets.filter((project) => project.categorie === activeCategory),
    [activeCategory, projets],
  );

  const [activeProjectId, setActiveProjectId] = useState<string | number | null>(
    filteredProjects[0]?.id ?? null,
  );

  const activeCategoryMeta =
    categories.find((category) => category.key === activeCategory) ?? categories[0];

  const activeProject =
    filteredProjects.find((project) => project.id === activeProjectId) ??
    filteredProjects[0] ??
    projets[0];

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function selectCategory(categoryKey: string) {
    const nextProjects = projets.filter((project) => project.categorie === categoryKey);
    setActiveCategory(categoryKey);
    setActiveProjectId(nextProjects[0]?.id ?? null);
  }

  function goToPreviousProject() {
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeProjectId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    setActiveProjectId(filteredProjects[prevIndex]?.id ?? null);
  }

  function goToNextProject() {
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeProjectId);
    const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    setActiveProjectId(filteredProjects[nextIndex]?.id ?? null);
  }

  return (
    <section className="work-page" onPointerMove={handlePointerMove}>
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="work-page-glow" />

      <div className="work-layout">
        <motion.header
          className="work-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="work-kicker">Projets</p>
          <h2>Des fragments, pas une grille froide.</h2>
          <p>
            Chaque projet devient un point du parcours: contexte, techno, role et lien vers le resultat. On garde le cote exploratoire sans forcer l'utilisateur a ouvrir une fenetre.
          </p>

          <div className="work-category-tabs">
            {categories.map((category) => {
              const count = projets.filter((project) => project.categorie === category.key).length;

              return (
                <button
                  key={category.key}
                  type="button"
                  className={activeCategory === category.key ? "is-active" : ""}
                  onClick={() => selectCategory(category.key)}
                >
                  <span>{category.eyebrow}</span>
                  <strong>{category.label}</strong>
                  <small>{count}</small>
                </button>
              );
            })}
          </div>

          <motion.footer
            className="work-current"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <span />
            <p>Categorie active</p>
            <strong>{activeCategoryMeta.label}</strong>
            <small>{activeCategoryMeta.desc}</small>
          </motion.footer>
        </motion.header>

        <div className="work-right-col">
          {activeProject && (
            <motion.aside
              className="work-panel"
              key={activeProject.id}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
            >
              <div className="work-panel-head">
                <span>{activeCategoryMeta.eyebrow}</span>
                <h3>{activeProject.titre}</h3>
                <p>{activeProject.description}</p>
              </div>

              <div className="work-techs">
                {activeProject.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <div className="work-actions">
                {activeProject.lien !== "#" && (
                  <a href={activeProject.lien} target="_blank" rel="noreferrer">
                    Voir le projet
                  </a>
                )}
                {activeProject.code !== "#" && (
                  <a href={activeProject.code} target="_blank" rel="noreferrer">
                    Code source
                  </a>
                )}
              </div>

              {filteredProjects.length > 1 && (
                <div className="work-panel-nav">
                  <button
                    type="button"
                    onClick={goToPreviousProject}
                    className="work-panel-nav-btn"
                    aria-label="Projet précédent"
                  >
                    <FaChevronLeft size={12} />
                    Précédent
                  </button>
                  <span className="work-panel-nav-counter">
                    {filteredProjects.findIndex((p) => p.id === activeProjectId) + 1} / {filteredProjects.length}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextProject}
                    className="work-panel-nav-btn"
                    aria-label="Projet suivant"
                  >
                    Suivant
                    <FaChevronRight size={12} />
                  </button>
                </div>
              )}
            </motion.aside>
          )}

          <motion.div
            style={{ x: parallaxX }}
            className="work-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop: Absolute positioning with constellation */}
            <div className="hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  className="work-route"
                  pathLength={1}
                  d="M50 48 C39 34 34 30 30 30"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 }}
                />
                <motion.path
                  className="work-route"
                  pathLength={1}
                  d="M50 48 C61 32 67 29 72 28"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.25 }}
                />
                <motion.path
                  className="work-route"
                  pathLength={1}
                  d="M50 48 C54 58 57 65 58 70"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.35 }}
                />
                <motion.path
                  className="work-route secondary"
                  pathLength={1}
                  d="M50 48 C44 56 37 62 28 68"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.46 }}
                />
              </svg>

              <div className="work-center">
                <span />
                <small>Work</small>
              </div>

              {categories.map((category, index) => {
                const count = projets.filter((project) => project.categorie === category.key).length;

                return (
                  <motion.button
                    key={category.key}
                    type="button"
                    className={`work-orbit-card ${activeCategory === category.key ? "is-active" : ""}`}
                    style={{ left: category.x, top: category.y }}
                    onClick={() => selectCategory(category.key)}
                    initial={{ opacity: 0, scale: 0.72 }}
                    animate={{ 
                      opacity: count ? 1 : 0.45, 
                      scale: activeCategory === category.key ? 1.06 : 1,
                      y: activeCategory === category.key ? -4 : 0
                    }}
                    transition={{ duration: 0.58, delay: 0.28 + index * 0.12 }}
                    whileHover={{ y: count ? -5 : 0, scale: count ? 1.03 : 1 }}
                  >
                    <i />
                    <span>{category.eyebrow}</span>
                    <strong>{category.label}</strong>
                    <small>{count} projet{count > 1 ? "s" : ""}</small>
                  </motion.button>
                );
              })}

              <div className="work-project-nodes">
                {filteredProjects.slice(0, 5).map((project, index) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    className={`work-project-node ${activeProject?.id === project.id ? "is-active" : ""}`}
                    style={{ ["--node-step" as string]: String(index) }}
                    onClick={() => setActiveProjectId(project.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.1 + index * 0.06 }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {project.titre}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile: Vertical list */}
            <div className="flex flex-col gap-3 md:hidden">
              {categories.map((category, index) => {
                const count = projets.filter((project) => project.categorie === category.key).length;

                return (
                  <motion.button
                    key={category.key}
                    type="button"
                    className={`work-orbit-card ${activeCategory === category.key ? "is-active" : ""}`}
                    onClick={() => selectCategory(category.key)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <i />
                    <span>{category.eyebrow}</span>
                    <strong>{category.label}</strong>
                    <small>{count} projet{count > 1 ? "s" : ""}</small>
                  </motion.button>
                );
              })}

              <div className="mt-2 flex flex-col gap-2">
                {filteredProjects.slice(0, 5).map((project, index) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    className={`work-project-node ${activeProject?.id === project.id ? "is-active" : ""}`}
                    onClick={() => setActiveProjectId(project.id)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, delay: 0.1 + index * 0.06 }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {project.titre}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldWork;
