import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa6";
import { projectCategories, projets } from "../../data/projects";
import { useParallax } from "../../hooks/useParallax";
import type { ProjectCategory, ProjectCategoryId, Projet } from "../../types";
import RouteLines from "../world/RouteLines";

const routes = [
  "M50 48 C39 34 34 30 30 30",
  "M50 48 C61 32 67 29 72 28",
  "M50 48 C54 58 57 65 58 70",
  "M50 48 C44 56 37 62 28 68",
];

/** Projets d'une catégorie, ceux « à la une » en premier. */
function projectsOf(category: ProjectCategoryId): Projet[] {
  return projets
    .filter((projet) => projet.categorie === category)
    .sort((a, b) => Number(!!b.aLaUne) - Number(!!a.aLaUne));
}

const Work: React.FC = () => {
  const parallax = useParallax();
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>(
    projets.find((projet) => projet.aLaUne)?.categorie ?? projectCategories[0].id,
  );
  const filteredProjects = useMemo(() => projectsOf(activeCategory), [activeCategory]);
  const [activeProjectId, setActiveProjectId] = useState(filteredProjects[0]?.id);

  const activeCategoryMeta = projectCategories.find((category) => category.id === activeCategory)!;
  const activeIndex = Math.max(0, filteredProjects.findIndex((projet) => projet.id === activeProjectId));
  const activeProject = filteredProjects[activeIndex];

  function selectCategory(category: ProjectCategoryId) {
    setActiveCategory(category);
    setActiveProjectId(projectsOf(category)[0]?.id);
  }

  function step(offset: number) {
    const next = (activeIndex + offset + filteredProjects.length) % filteredProjects.length;
    setActiveProjectId(filteredProjects[next].id);
  }

  const categoryContent = (category: ProjectCategory) => {
    const count = projectsOf(category.id).length;
    return (
      <>
        <i />
        <span>{category.eyebrow}</span>
        <strong>{category.label}</strong>
        <small>
          {count} projet{count > 1 ? "s" : ""}
        </small>
      </>
    );
  };

  const projectNodes = filteredProjects.map((projet, index) => (
    <motion.button
      key={projet.id}
      type="button"
      className={`work-project-node ${activeProject?.id === projet.id ? "is-active" : ""}`}
      aria-pressed={activeProject?.id === projet.id}
      onClick={() => setActiveProjectId(projet.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.1 + index * 0.06 }}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      {projet.titre}
    </motion.button>
  ));

  return (
    <section className="work-page" onPointerMove={parallax.onPointerMove}>
      <motion.div style={{ x: parallax.x, y: parallax.y }} className="work-page-glow" />

      <div className="work-layout">
        <motion.header
          className="work-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="work-kicker">Projets</p>
          <h2>Ce que j'ai construit.</h2>
          <p>
            Des sites vitrines aux applications mobiles : {projets.length} projets livrés, la plupart en ligne et consultables.
          </p>

          <div className="work-category-tabs" role="tablist" aria-label="Catégories de projets">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                className={activeCategory === category.id ? "is-active" : ""}
                onClick={() => selectCategory(category.id)}
              >
                <span>{category.eyebrow}</span>
                <strong>{category.label}</strong>
                <small>{projectsOf(category.id).length}</small>
              </button>
            ))}
          </div>

          <motion.footer
            className="work-current"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <span />
            <p>Catégorie active</p>
            <strong>{activeCategoryMeta.label}</strong>
            <small>{activeCategoryMeta.description}</small>
          </motion.footer>
        </motion.header>

        <div className="work-right-col">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.article
                className="work-panel"
                key={activeProject.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 0.9, 0.2, 1] }}
              >
                <figure className="work-panel-media">
                  <img
                    src={`/images/${activeProject.image}`}
                    alt={`Aperçu de ${activeProject.titre}`}
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={700}
                  />
                </figure>

                <div className="work-panel-head">
                  <span>
                    {activeCategoryMeta.eyebrow}
                    {activeProject.aLaUne && <em className="work-badge">À la une</em>}
                  </span>
                  <h3>{activeProject.titre}</h3>
                  <p>{activeProject.description}</p>
                </div>

                {activeProject.etudeDeCas && (
                  <dl className="work-case">
                    <div>
                      <dt>Mon rôle</dt>
                      <dd>{activeProject.etudeDeCas.role}</dd>
                    </div>
                    <div>
                      <dt>Le défi</dt>
                      <dd>{activeProject.etudeDeCas.defi}</dd>
                    </div>
                    <div>
                      <dt>Le résultat</dt>
                      <dd>{activeProject.etudeDeCas.resultat}</dd>
                    </div>
                  </dl>
                )}

                <div className="work-techs">
                  {activeProject.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                {(activeProject.lien || activeProject.code) && (
                  <div className="work-actions">
                    {activeProject.lien && (
                      <a href={activeProject.lien} target="_blank" rel="noreferrer">
                        Voir le projet <FaArrowUpRightFromSquare size={11} />
                      </a>
                    )}
                    {activeProject.code && (
                      <a href={activeProject.code} target="_blank" rel="noreferrer">
                        <FaGithub size={13} /> Code source
                      </a>
                    )}
                  </div>
                )}

                {filteredProjects.length > 1 && (
                  <div className="work-panel-nav">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="work-panel-nav-btn"
                      aria-label="Projet précédent"
                    >
                      <FaChevronLeft size={12} />
                      Précédent
                    </button>
                    <span className="work-panel-nav-counter">
                      {activeIndex + 1} / {filteredProjects.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="work-panel-nav-btn"
                      aria-label="Projet suivant"
                    >
                      Suivant
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                )}
              </motion.article>
            )}
          </AnimatePresence>

          <motion.div
            style={{ x: parallax.x }}
            className="work-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop : catégories en orbite */}
            <div className="hidden md:block">
              <RouteLines
                paths={routes}
                pathClassName={["work-route", "work-route", "work-route", "work-route secondary"]}
                stagger={0.1}
              />

              <div className="work-center">
                <span />
                <small>Projets</small>
              </div>

              {projectCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`work-orbit-card ${activeCategory === category.id ? "is-active" : ""}`}
                  aria-pressed={activeCategory === category.id}
                  style={{ left: category.x, top: category.y }}
                  onClick={() => selectCategory(category.id)}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: 1,
                    scale: activeCategory === category.id ? 1.06 : 1,
                    y: activeCategory === category.id ? -4 : 0,
                  }}
                  transition={{ duration: 0.58, delay: 0.28 + index * 0.12 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  {categoryContent(category)}
                </motion.button>
              ))}

              <div className="work-project-nodes">{projectNodes}</div>
            </div>

            {/* Mobile : liste des projets de la catégorie (les onglets servent de filtre) */}
            <div className="flex flex-col gap-2 md:hidden">{projectNodes}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
