import { motion } from "framer-motion";
import { useState } from "react";
import { projets } from "../../data/projects";
import { allSkills, skillCategories } from "../../data/skills";
import { useParallax } from "../../hooks/useParallax";
import type { SkillCategory } from "../../types";
import RouteLines from "../world/RouteLines";

const routes = [
  "M50 48 C39 34 34 30 30 30",
  "M50 48 C61 32 67 29 72 28",
  "M50 48 C54 58 57 65 58 70",
];

function countProjectsUsing(skill: string) {
  return projets.filter((projet) => projet.technologies.includes(skill)).length;
}

const Skills: React.FC = () => {
  const parallax = useParallax();
  const [active, setActive] = useState(skillCategories[0]);
  const [activeSkill, setActiveSkill] = useState(skillCategories[0].skills[0]);
  const usage = countProjectsUsing(activeSkill);

  function selectCategory(category: SkillCategory) {
    setActive(category);
    setActiveSkill(category.skills[0]);
  }

  const categoryButtonProps = (category: SkillCategory) => ({
    type: "button" as const,
    className: `skills-orbit-card ${active.id === category.id ? "is-active" : ""}`,
    "aria-pressed": active.id === category.id,
    onClick: () => selectCategory(category),
  });

  const categoryContent = (category: SkillCategory) => (
    <>
      <i />
      <span>{category.eyebrow}</span>
      <strong>{category.label}</strong>
      <small>{category.skills.length} technologies</small>
    </>
  );

  return (
    <section className="skills-page" onPointerMove={parallax.onPointerMove}>
      <motion.div style={{ x: parallax.x, y: parallax.y }} className="skills-page-glow" />

      <div className="skills-layout">
        <motion.header
          className="skills-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="skills-kicker">Compétences</p>
          <h2>Une stack qui forme un système.</h2>
          <p>
            Du composant React à la base MongoDB, je travaille sur toute la chaîne : interfaces fluides, APIs robustes et produits maintenables.
          </p>

          <div className="skills-summary">
            <span>
              <strong>{skillCategories.length}</strong>
              pôles
            </span>
            <span>
              <strong>{allSkills.length}</strong>
              technos
            </span>
            <span>
              <strong>{projets.length}</strong>
              projets
            </span>
          </div>

          <motion.footer
            className="skills-current"
            key={activeSkill}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
          >
            <span />
            <p>{usage > 0 ? `Utilisé dans ${usage} projet${usage > 1 ? "s" : ""}` : "Compétence sélectionnée"}</p>
            <strong>{activeSkill}</strong>
          </motion.footer>
        </motion.header>

        <div className="skills-right-col">
          <motion.aside
            className="skills-panel"
            key={active.id}
            style={{ x: parallax.x }}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
          >
            <div className="skills-panel-head">
              <span>{active.eyebrow}</span>
              <strong>{active.label}</strong>
              <p>{active.description}</p>
            </div>

            <div className="skills-chip-grid">
              {active.skills.map((skill, idx) => (
                <motion.button
                  key={skill}
                  type="button"
                  className={activeSkill === skill ? "is-selected" : ""}
                  aria-pressed={activeSkill === skill}
                  onClick={() => setActiveSkill(skill)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </motion.aside>

          <motion.div
            style={{ x: parallax.x }}
            className="skills-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop : pôles en orbite */}
            <div className="hidden md:block">
              <RouteLines paths={routes} pathClassName="skills-v2-route main" />

              <div className="skills-center">
                <span />
                <small>Stack</small>
              </div>

              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  {...categoryButtonProps(category)}
                  style={{ left: category.x, top: category.y }}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: 1,
                    scale: active.id === category.id ? 1.06 : 1,
                    y: active.id === category.id ? -4 : 0,
                  }}
                  transition={{ duration: 0.58, delay: 0.28 + index * 0.12 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  {categoryContent(category)}
                </motion.button>
              ))}
            </div>

            {/* Mobile : liste verticale */}
            <div className="flex flex-col gap-3 md:hidden">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  {...categoryButtonProps(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {categoryContent(category)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
