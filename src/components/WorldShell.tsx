import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import type { ReactNode } from "react";

interface WorldShellProps {
  isActive: boolean;
  section: string;
  accent: string;
  children: ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  onNavigate?: (section: string) => void;
}

const sections = [
  { key: "about", label: "A propos" },
  { key: "skills", label: "Skills" },
  { key: "work", label: "Work" },
  { key: "path", label: "Parcours" },
  { key: "contact", label: "Contact" },
];

const WorldShell: React.FC<WorldShellProps> = ({
  isActive,
  section,
  accent,
  children,
  onBack,
  onNext,
  nextLabel,
  onNavigate,
}) => {
  const activeIndex = Math.max(0, sections.findIndex((item) => item.key === section));
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.section
          className="world-shell-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          aria-label={`Section ${section}`}
          style={{ "--accent": accent } as React.CSSProperties}
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
            <button onClick={onBack} className="world-shell-back" aria-label="Retour">
              <FaArrowLeft size={15} />
            </button>

            <button onClick={onNext} className="world-shell-next">
              <span>{nextLabel}</span>
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
                key={item.key}
                type="button"
                onClick={() => onNavigate?.(item.key)}
                className={item.key === section ? "is-active" : ""}
                aria-label={item.label}
                aria-current={item.key === section ? "page" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </button>
            ))}
          </motion.nav>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default WorldShell;
