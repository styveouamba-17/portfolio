import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import type { PortfolioData } from "../types";

interface WorldSkillsProps {
  competences: PortfolioData["competences"];
}

const meta: Record<
  string,
  {
    label: string;
    eyebrow: string;
    desc: string;
    x: string;
    y: string;
    level: number;
  }
> = {
  frontend: {
    label: "Frontend",
    eyebrow: "Interface",
    desc: "React, mobile, composants, animations et experience utilisateur.",
    x: "30%",
    y: "30%",
    level: 92,
  },
  backend: {
    label: "Backend",
    eyebrow: "Logique",
    desc: "APIs, authentification, architecture serveur et gestion des donnees.",
    x: "72%",
    y: "28%",
    level: 86,
  },
  outils: {
    label: "Outils",
    eyebrow: "Workflow",
    desc: "Design, collaboration, versioning, methodes et livraison propre.",
    x: "58%",
    y: "70%",
    level: 80,
  },
  tools: {
    label: "Outils",
    eyebrow: "Workflow",
    desc: "Design, collaboration, versioning, methodes et livraison propre.",
    x: "58%",
    y: "70%",
    level: 80,
  },
};

const fallback = {
  label: "Systeme",
  eyebrow: "Stack",
  desc: "Competences transverses et outils de construction.",
  x: "58%",
  y: "70%",
  level: 78,
};

const WorldSkills: React.FC<WorldSkillsProps> = ({ competences }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const categories = useMemo(
    () =>
      Object.entries(competences).map(([id, skills]) => ({
        id,
        skills: skills as string[],
        ...(meta[id] ?? fallback),
      })),
    [competences],
  );

  const [active, setActive] = useState(categories[0]);
  const [activeSkill, setActiveSkill] = useState(categories[0]?.skills[0] ?? "");

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function selectCategory(category: typeof categories[number]) {
    setActive(category);
    setActiveSkill(category.skills[0] ?? category.label);
  }

  return (
    <section className="skills-page" onPointerMove={onPointerMove}>
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="skills-page-glow" />

      <div className="skills-layout">
        <motion.header
          className="skills-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="skills-kicker">Competences</p>
          <h2>Une stack qui forme un systeme.</h2>
          <p>
            Mes competences ne sont pas des logos alignes: elles se connectent entre elles pour produire des interfaces fluides, des APIs robustes et des produits maintenables.
          </p>

          <div className="skills-summary">
            <span>
              <strong>{categories.length}</strong>
              poles
            </span>
            <span>
              <strong>{categories.reduce((total, item) => total + item.skills.length, 0)}</strong>
              technos
            </span>
            <span>
              <strong>{active.level}%</strong>
              focus
            </span>
          </div>

          <motion.footer
            className="skills-current"
            key={activeSkill}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span />
            <p>Competence active</p>
            <strong>{activeSkill}</strong>
          </motion.footer>
        </motion.header>

        <div className="skills-right-col">
          <motion.aside
            className="skills-panel"
            key={active.id}
            style={{ x: parallaxX }}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
          >
            <div className="skills-panel-head">
              <span>{active.eyebrow}</span>
              <strong>{active.label}</strong>
              <p>{active.desc}</p>
            </div>

            <div className="skills-chip-grid">
              {active.skills.map((skill, idx) => (
                <motion.button
                  key={skill}
                  type="button"
                  className={activeSkill === skill ? "is-selected" : ""}
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
            style={{ x: parallaxX }}
            className="skills-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop: Absolute positioning with constellation */}
            <div className="hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  className="skills-v2-route main"
                  pathLength={1}
                  d="M50 48 C39 34 34 30 30 30"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 }}
                />
                <motion.path
                  className="skills-v2-route main"
                  pathLength={1}
                  d="M50 48 C61 32 67 29 72 28"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.25 }}
                />
                <motion.path
                  className="skills-v2-route main"
                  pathLength={1}
                  d="M50 48 C54 58 57 65 58 70"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.35 }}
                />
              </svg>

              <div className="skills-center">
                <span />
                <small>Stack</small>
              </div>

              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`skills-orbit-card ${active.id === category.id ? "is-active" : ""}`}
                  style={{ left: category.x, top: category.y }}
                  onClick={() => selectCategory(category)}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{ 
                    opacity: 1, 
                    scale: active.id === category.id ? 1.06 : 1,
                    y: active.id === category.id ? -4 : 0
                  }}
                  transition={{ duration: 0.58, delay: 0.28 + index * 0.12 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <i />
                  <span>{category.eyebrow}</span>
                  <strong>{category.label}</strong>
                  <small>{category.skills.length} technologies</small>
                </motion.button>
              ))}
            </div>

            {/* Mobile: Vertical list */}
            <div className="flex flex-col gap-3 md:hidden">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  type="button"
                  className={`skills-orbit-card ${active.id === category.id ? "is-active" : ""}`}
                  onClick={() => selectCategory(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <i />
                  <span>{category.eyebrow}</span>
                  <strong>{category.label}</strong>
                  <small>{category.skills.length} technologies</small>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldSkills;
