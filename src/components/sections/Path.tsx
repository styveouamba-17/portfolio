import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { timeline } from "../../data/timeline";
import { useParallax } from "../../hooks/useParallax";
import type { TimelineStep } from "../../types";
import RouteLines from "../world/RouteLines";

const typeLabels: Record<TimelineStep["type"], string> = {
  formation: "Formation",
  experience: "Expérience",
  actuel: "Poste actuel",
};

// Les classes CSS existantes utilisent les noms anglais.
const typeClass: Record<TimelineStep["type"], string> = {
  formation: "is-education",
  experience: "is-work",
  actuel: "is-current",
};

const route =
  "M24 34 C32 24 36 22 42 23 C51 25 56 32 62 38 C70 46 75 52 78 58 C73 68 64 73 55 72 C45 72 37 68 30 66";

const experienceCount = timeline.filter((item) => item.type !== "formation").length;

const Path: React.FC = () => {
  const parallax = useParallax();
  const [activeIndex, setActiveIndex] = useState(timeline.length - 1);
  const activeStep = timeline[activeIndex];

  function step(offset: number) {
    setActiveIndex((index) => (index + offset + timeline.length) % timeline.length);
  }

  const nodeContent = (item: TimelineStep, index: number) => (
    <>
      <i />
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{item.acquis}</strong>
    </>
  );

  return (
    <section className="path-page" onPointerMove={parallax.onPointerMove}>
      <motion.div style={{ x: parallax.x, y: parallax.y }} className="path-page-glow" />

      <div className="path-layout">
        <motion.header
          className="path-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="path-kicker">Parcours</p>
          <h2>Une trajectoire qui continue.</h2>
          <p>
            Du baccalauréat scientifique à Brazzaville jusqu'à un CDI de développeur full stack à Dakar : chaque étape a ajouté une compétence.
          </p>

          <div className="path-summary">
            <span>
              <strong>{timeline.length}</strong>
              étapes
            </span>
            <span>
              <strong>{experienceCount}</strong>
              expériences
            </span>
            <span>
              <strong>{new Date().getFullYear()}</strong>
              aujourd'hui
            </span>
          </div>

          <motion.footer
            className="path-current"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            <span />
            <p>Objectif</p>
            <strong>Construire des produits solides, utiles et bien dessinés.</strong>
          </motion.footer>
        </motion.header>

        <div className="path-right-col">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeStep.titre}
              className="path-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 0.9, 0.2, 1] }}
            >
              <div className="path-panel-head">
                <span>{typeLabels[activeStep.type]}</span>
                <h3>{activeStep.titre}</h3>
                <p className="path-year">
                  {activeStep.periode} · {activeStep.lieu}
                </p>
                <p>{activeStep.description}</p>
              </div>

              <div className="path-panel-nav">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="path-panel-nav-btn"
                  aria-label="Étape précédente"
                >
                  <FaChevronLeft size={12} />
                  Précédent
                </button>
                <span className="path-panel-nav-counter">
                  {activeIndex + 1} / {timeline.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="path-panel-nav-btn"
                  aria-label="Étape suivante"
                >
                  Suivant
                  <FaChevronRight size={12} />
                </button>
              </div>
            </motion.article>
          </AnimatePresence>

          <motion.div
            style={{ x: parallax.x }}
            className="path-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop : étapes reliées par un tracé */}
            <div className="hidden md:block">
              <RouteLines paths={[route]} pathClassName="path-route" duration={1.25} delay={0.16} />

              {timeline.map((item, index) => (
                <motion.button
                  key={item.titre}
                  type="button"
                  className={`path-node ${activeIndex === index ? "is-active" : ""} ${typeClass[item.type]}`}
                  aria-pressed={activeIndex === index}
                  aria-label={`${item.titre} (${item.periode})`}
                  style={{ left: item.x, top: item.y }}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: 1,
                    scale: activeIndex === index ? 1.08 : 1,
                    y: activeIndex === index ? -4 : 0,
                  }}
                  transition={{ duration: 0.55, delay: 0.28 + index * 0.08 }}
                  whileHover={{ y: -5, scale: 1.04 }}
                >
                  {nodeContent(item, index)}
                </motion.button>
              ))}
            </div>

            {/* Mobile : liste verticale */}
            <div className="flex flex-col gap-3 md:hidden">
              {timeline.map((item, index) => (
                <motion.button
                  key={item.titre}
                  type="button"
                  className={`path-node ${activeIndex === index ? "is-active" : ""} ${typeClass[item.type]}`}
                  aria-pressed={activeIndex === index}
                  aria-label={`${item.titre} (${item.periode})`}
                  onClick={() => setActiveIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {nodeContent(item, index)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Path;
