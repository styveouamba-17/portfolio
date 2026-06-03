import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "./data/portfolioData";
import Constellation from "./components/Constellation";
import WorldShell from "./components/WorldShell";
import WorldAbout from "./components/WorldAbout";
import WorldSkills from "./components/WorldSkills";
import WorldWork from "./components/WorldWork";
import WorldPath from "./components/WorldPath";
import WorldContact from "./components/WorldContact";

type Section = "about" | "skills" | "work" | "path" | "contact";

const sectionConfig: Record<
  Section,
  { accent: string; panX: string; panY: string; zoom: string; next: Section }
> = {
  about: {
    accent: "var(--green)",
    panX: "34vw",
    panY: "23vh",
    zoom: "1.08",
    next: "skills",
  },
  skills: {
    accent: "var(--blue)",
    panX: "-34vw",
    panY: "25vh",
    zoom: "1.08",
    next: "work",
  },
  work: {
    accent: "var(--amber)",
    panX: "34vw",
    panY: "-33vh",
    zoom: "1.08",
    next: "path",
  },
  path: {
    accent: "var(--rose)",
    panX: "-34vw",
    panY: "-33vh",
    zoom: "1.08",
    next: "contact",
  },
  contact: {
    accent: "var(--violet)",
    panX: "0vw",
    panY: "33vh",
    zoom: "1.08",
    next: "about",
  },
};

const nextLabel: Record<Section, string> = {
  about: "Aller vers compétences",
  skills: "Aller vers projets",
  work: "Aller vers parcours",
  path: "Aller vers contact",
  contact: "Retour à propos",
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  const handleOpenMap = () => {
    if (currentSection) {
      // If in a section, return to hub
      setCurrentSection(null);
    } else {
      // If at intro, open hub
      setIsOpen(true);
    }
  };

  const handleOpenSection = (section: Section) => {
    setIsOpen(true);
    setCurrentSection(section);
  };

  const handleBack = () => {
    setCurrentSection(null);
  };

  const handleNext = () => {
    if (currentSection) {
      const config = sectionConfig[currentSection];
      setCurrentSection(config.next);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--amber)] opacity-[0.16] blur-3xl" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-[var(--blue)] opacity-[0.13] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[var(--green)] opacity-[0.10] blur-3xl" />
      </div>

      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18]" />

      {/* Main stage */}
      <main className="relative isolate min-h-screen">
        {/* Space with zoom/pan */}
        <motion.div
          className="absolute inset-0 origin-[50%_52%]"
          animate={{
            transform: currentSection
              ? `translate(${sectionConfig[currentSection].panX}, ${sectionConfig[currentSection].panY}) scale(${sectionConfig[currentSection].zoom})`
              : "translate(0, 0) scale(1)",
          }}
          transition={{ duration: 1, ease: [0.2, 0.86, 0.13, 1] }}
        >
          <Constellation
            isOpen={isOpen}
            isSection={!!currentSection}
            currentSection={currentSection}
            onOpenMap={handleOpenMap}
            onOpenSection={handleOpenSection}
          />
        </motion.div>

        {/* Intro text */}
        <motion.div
          className="pointer-events-none absolute left-[clamp(22px,7vw,96px)] top-[clamp(26px,8vh,96px)] z-40 max-w-[min(520px,calc(100vw-44px))]"
          animate={{
            y: isOpen || currentSection ? -14 : 0,
            opacity: isOpen || currentSection ? 0.14 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.15, 1] }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--amber)]">
            Portfolio interactif
          </p>

          <h1 className="max-w-[12ch] text-[clamp(46px,8vw,106px)] leading-[0.9]">
            {portfolioData.nom}
          </h1>

          <p className="mt-5 text-[var(--muted)] text-[clamp(15px,2vw,18px)] leading-[1.65]">
            {portfolioData.titre}. {portfolioData.description}
          </p>
        </motion.div>

        {/* Hint */}
        <motion.p
          className="pointer-events-none absolute bottom-9 left-1/2 z-40 -translate-x-1/2 text-xs text-[rgba(244,239,229,.52)]"
          animate={{
            opacity: isOpen || currentSection ? 0 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          Clique sur le point central
        </motion.p>

        {/* World sections */}
        <AnimatePresence>
          {currentSection === "about" && (
            <WorldShell
              isActive={true}
              section="about"
              accent={sectionConfig.about.accent}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={nextLabel.about}
            >
              <WorldAbout />
            </WorldShell>
          )}

          {currentSection === "skills" && (
            <WorldShell
              isActive={true}
              section="skills"
              accent={sectionConfig.skills.accent}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={nextLabel.skills}
            >
              <WorldSkills competences={portfolioData.competences} />
            </WorldShell>
          )}

          {currentSection === "work" && (
            <WorldShell
              isActive={true}
              section="work"
              accent={sectionConfig.work.accent}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={nextLabel.work}
            >
              <WorldWork projets={portfolioData.projets} />
            </WorldShell>
          )}

          {currentSection === "path" && (
            <WorldShell
              isActive={true}
              section="path"
              accent={sectionConfig.path.accent}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={nextLabel.path}
            >
              <WorldPath />
            </WorldShell>
          )}

          {currentSection === "contact" && (
            <WorldShell
              isActive={true}
              section="contact"
              accent={sectionConfig.contact.accent}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel={nextLabel.contact}
            >
              <WorldContact contact={portfolioData.contact} />
            </WorldShell>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
