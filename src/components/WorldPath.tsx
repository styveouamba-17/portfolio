import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const timeline = [
  {
    year: "2020 - 2021",
    title: "Baccalaureat Scientifique",
    location: "Saint Dominique, Congo-Brazzaville",
    description: "Specialite mathematique. Premiere vraie confrontation avec la logique, la rigueur et la resolution de problemes.",
    gain: "Logique",
    type: "education",
    x: "24%",
    y: "34%",
  },
  {
    year: "Juil - Aout 2021",
    title: "Stage d'initiation",
    location: "Entreprise TGI, Dakar",
    description: "Premier contact avec le monde professionnel: developpement web, maintenance et comprehension du terrain.",
    gain: "Terrain",
    type: "work",
    x: "42%",
    y: "23%",
  },
  {
    year: "2023 - 2024",
    title: "Licence Informatique",
    location: "UNIPRO, Dakar",
    description: "Developpement de projets web et mobile, gestion de projet et structuration progressive d'une vraie methode.",
    gain: "Bases",
    type: "education",
    x: "62%",
    y: "38%",
  },
  {
    year: "Aout 2024 - Jan 2025",
    title: "Stage Full Stack",
    location: "GATS (gatsmapping)",
    description: "Participation a des projets d'envergure, montee en competence rapide et meilleure lecture des contraintes produit.",
    gain: "Full stack",
    type: "work",
    x: "78%",
    y: "58%",
  },
  {
    year: "Jan 2025 - Dec 2025",
    title: "CDD Developpeur Full Stack",
    location: "GATS",
    description: "Prise de responsabilites, conception et developpement de bout en bout sur des interfaces et services metier.",
    gain: "Responsabilite",
    type: "work",
    x: "55%",
    y: "72%",
  },
  {
    year: "Depuis Jan 2026",
    title: "CDI Developpeur Full Stack",
    location: "GATS",
    description: "Conception, developpement et amelioration continue de produits web et mobiles dans une logique durable.",
    gain: "Produit",
    type: "current",
    x: "30%",
    y: "66%",
  },
];

const typeLabels = {
  education: "Formation",
  work: "Experience",
  current: "Actuel",
};

const WorldPath: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const [activeStep, setActiveStep] = useState(timeline[timeline.length - 1]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function goToPreviousStep() {
    const currentIndex = timeline.findIndex((item) => item.title === activeStep.title);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : timeline.length - 1;
    setActiveStep(timeline[prevIndex]);
  }

  function goToNextStep() {
    const currentIndex = timeline.findIndex((item) => item.title === activeStep.title);
    const nextIndex = currentIndex < timeline.length - 1 ? currentIndex + 1 : 0;
    setActiveStep(timeline[nextIndex]);
  }

  return (
    <section className="path-page" onPointerMove={handlePointerMove}>
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="path-page-glow" />

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
            Chaque etape devient un noeud: une periode, un contexte, une competence gagnee. Le parcours se lit comme une carte, pas comme une liste.
          </p>

          <div className="path-summary">
            <span>
              <strong>{timeline.length}</strong>
              etapes
            </span>
            <span>
              <strong>3</strong>
              experiences
            </span>
            <span>
              <strong>2026</strong>
              actuel
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
            <strong>Construire des produits solides, utiles et bien dessines.</strong>
          </motion.footer>
        </motion.header>

        <div className="path-right-col">
          <motion.article
            key={activeStep.title}
            className="path-panel"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
          >
            <div className="path-panel-head">
              <span>{typeLabels[activeStep.type as keyof typeof typeLabels]}</span>
              <h3>{activeStep.title}</h3>
              <p className="path-year">{activeStep.year} - {activeStep.location}</p>
              <p>{activeStep.description}</p>
            </div>

            <div className="path-panel-nav">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="path-panel-nav-btn"
                aria-label="Étape précédente"
              >
                <FaChevronLeft size={12} />
                Précédent
              </button>
              <span className="path-panel-nav-counter">
                {timeline.findIndex((item) => item.title === activeStep.title) + 1} / {timeline.length}
              </span>
              <button
                type="button"
                onClick={goToNextStep}
                className="path-panel-nav-btn"
                aria-label="Étape suivante"
              >
                Suivant
                <FaChevronRight size={12} />
              </button>
            </div>
          </motion.article>

          <motion.div
            style={{ x: parallaxX }}
            className="path-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop: Absolute positioning with constellation */}
            <div className="hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  className="path-route"
                  pathLength={1}
                  d="M24 34 C32 24 36 22 42 23 C51 25 56 32 62 38 C70 46 75 52 78 58 C73 68 64 73 55 72 C45 72 37 68 30 66"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.25, delay: 0.16, ease: [0.22, 0.9, 0.2, 1] }}
                />
              </svg>

              {timeline.map((item, index) => (
                <motion.button
                  key={item.title}
                  type="button"
                  className={`path-node ${activeStep.title === item.title ? "is-active" : ""} is-${item.type}`}
                  style={{ left: item.x, top: item.y }}
                  onClick={() => setActiveStep(item)}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{ 
                    opacity: 1, 
                    scale: activeStep.title === item.title ? 1.08 : 1,
                    y: activeStep.title === item.title ? -4 : 0
                  }}
                  transition={{ duration: 0.55, delay: 0.28 + index * 0.08 }}
                  whileHover={{ y: -5, scale: 1.04 }}
                >
                  <i />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.gain}</strong>
                </motion.button>
              ))}
            </div>

            {/* Mobile: Vertical list */}
            <div className="flex flex-col gap-3 md:hidden">
              {timeline.map((item, index) => (
                <motion.button
                  key={item.title}
                  type="button"
                  className={`path-node ${activeStep.title === item.title ? "is-active" : ""} is-${item.type}`}
                  onClick={() => setActiveStep(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <i />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.gain}</strong>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldPath;
