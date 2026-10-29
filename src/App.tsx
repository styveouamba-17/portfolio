import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa6";
import { profile } from "./data/profile";
import { getSection } from "./data/sections";
import { useSectionRoute } from "./hooks/useSectionRoute";
import type { SectionId } from "./types";
import Constellation from "./components/constellation/Constellation";
import WorldShell from "./components/world/WorldShell";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Work from "./components/sections/Work";
import Path from "./components/sections/Path";
import Contact from "./components/sections/Contact";

const sectionContent: Record<SectionId, ReactNode> = {
  about: <About />,
  skills: <Skills />,
  work: <Work />,
  path: <Path />,
  contact: <Contact />,
};

/** Délai avant l'ouverture automatique de la carte depuis l'accueil. */
const AUTO_OPEN_DELAY = 1400;

const App: React.FC = () => {
  const { view, navigate } = useSectionRoute();
  const isOpen = view !== "intro";
  const currentSection = view === "intro" || view === "hub" ? null : view;
  const pan = currentSection ? getSection(currentSection).pan : null;

  useEffect(() => {
    if (view !== "intro") return;
    const timer = window.setTimeout(() => navigate("hub", { replace: true }), AUTO_OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, [view, navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden">
        {/* Halos d'arrière-plan */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--amber)] opacity-[0.16] blur-3xl" />
          <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-[var(--blue)] opacity-[0.13] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[var(--green)] opacity-[0.10] blur-3xl" />
        </div>

        <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18]" />

        <main className="relative isolate min-h-screen">
          {/* Espace qui se déplace vers la section ouverte */}
          <motion.div
            className="absolute inset-0 origin-[50%_52%]"
            animate={{
              transform: pan ? `translate(${pan.x}, ${pan.y}) scale(1.08)` : "translate(0, 0) scale(1)",
            }}
            transition={{ duration: 1, ease: [0.2, 0.86, 0.13, 1] }}
          >
            <Constellation
              isOpen={isOpen}
              isSection={!!currentSection}
              onCenterClick={() => navigate("hub")}
              onOpenSection={(section) => navigate(section)}
            />
          </motion.div>

          {/* Présentation */}
          <motion.header
            className="pointer-events-none absolute left-[clamp(22px,7vw,96px)] top-[clamp(26px,8vh,96px)] z-40 max-w-[min(520px,calc(100vw-44px))]"
            animate={{
              y: isOpen ? -14 : 0,
              opacity: isOpen ? 0.14 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.15, 1] }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber)]">
              {profile.titre}
            </p>

            <h1 className="max-w-[12ch] text-[clamp(46px,8vw,106px)] leading-[0.9]">{profile.nom}</h1>

            <p className="mt-5 text-[var(--muted)] text-[clamp(15px,2vw,18px)] leading-[1.65]">
              {profile.accroche}
            </p>
          </motion.header>

          {/* Raccourcis toujours visibles hors des sections */}
          <AnimatePresence>
            {!currentSection && (
              <motion.div
                className="app-shortcuts"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <button type="button" className="is-primary" onClick={() => navigate("work")}>
                  Voir mes projets
                  <FaArrowRight size={12} />
                </button>
                {profile.cv && (
                  <a href={profile.cv} download>
                    <FaDownload size={12} />
                    CV
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="pointer-events-none absolute bottom-9 left-1/2 z-40 hidden -translate-x-1/2 text-xs text-[rgba(244,239,229,.52)] md:block"
            animate={{ opacity: currentSection ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            {isOpen ? "Choisissez une section · Échap pour revenir à la carte" : "Ouverture de la carte…"}
          </motion.p>

          <AnimatePresence mode="wait">
            {currentSection && (
              <WorldShell
                key={currentSection}
                section={currentSection}
                onBack={() => navigate("hub")}
                onNavigate={(section) => navigate(section)}
              >
                {sectionContent[currentSection]}
              </WorldShell>
            )}
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
};

export default App;
