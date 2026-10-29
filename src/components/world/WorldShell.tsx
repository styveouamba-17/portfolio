import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { ReactNode } from "react";
import { getNextSection, getSection, sections } from "../../data/sections";
import type { SectionId } from "../../types";

interface WorldShellProps {
  section: SectionId;
  children: ReactNode;
  onBack: () => void;
  onNavigate: (section: SectionId) => void;
}

/** Cadre commun d'une section : fond, progression, retour, suivant et navigation rapide. */
const WorldShell: React.FC<WorldShellProps> = ({ section, children, onBack, onNavigate }) => {
  const meta = getSection(section);
  const next = getNextSection(section);
  const activeIndex = sections.findIndex((item) => item.id === section);
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <motion.section
      className="world-shell-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      aria-label={meta.label}
      style={{ "--accent": meta.accent } as React.CSSProperties}
    >
      <div className="world-shell-bg" />
      <div className="world-shell-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="world-shell-content">{children}</div>

      <motion.div
        className="world-shell-controls"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2 }}
      >
        <button onClick={onBack} className="world-shell-back" aria-label="Retour à la carte (Échap)">
          <FaArrowLeft size={15} />
        </button>

        <button onClick={() => onNavigate(next.id)} className="world-shell-next">
          <span>{activeIndex === sections.length - 1 ? `Retour à ${next.label.toLowerCase()}` : `Aller vers ${next.label.toLowerCase()}`}</span>
          <FaArrowRight size={13} />
        </button>
      </motion.div>

      <motion.nav
        className="world-shell-orbit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        aria-label="Navigation rapide"
      >
        {sections.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={item.id === section ? "is-active" : ""}
            aria-label={item.label}
            title={item.label}
            aria-current={item.id === section ? "page" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </button>
        ))}
      </motion.nav>
    </motion.section>
  );
};

export default WorldShell;
