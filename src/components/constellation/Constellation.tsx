import { motion } from "framer-motion";
import { sections } from "../../data/sections";
import type { SectionId } from "../../types";
import RouteLines from "../world/RouteLines";
import NodeCard from "./NodeCard";

interface ConstellationProps {
  isOpen: boolean;
  isSection: boolean;
  onCenterClick: () => void;
  onOpenSection: (section: SectionId) => void;
}

const stars = [
  [14, 18, 0.22],
  [27, 72, 0.18],
  [72, 16, 0.2],
  [89, 64, 0.16],
  [50, 9, 0.18],
  [8, 88, 0.14],
  [94, 26, 0.13],
  [38, 33, 0.15],
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--amber)]";

const Constellation: React.FC<ConstellationProps> = ({
  isOpen,
  isSection,
  onCenterClick,
  onOpenSection,
}) => {
  const cardsInteractive = isOpen && !isSection;

  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {stars.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="rgba(244, 239, 229, .42)" />
        ))}
      </svg>

      <RouteLines
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        paths={sections.map((section) => section.line)}
        pathClassName="constellation-line"
        visible={isOpen}
        opacity={isSection ? 0.38 : 1}
        delay={0}
        stagger={0.05}
      />

      <motion.button
        onClick={onCenterClick}
        aria-label={isOpen ? "Revenir à la carte" : "Ouvrir la carte du portfolio"}
        className={`absolute left-1/2 top-1/2 z-20 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${focusRing}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="pulse-animation absolute inset-4 rounded-full border border-[var(--ink)] opacity-40" />
        <motion.span
          className="relative h-[18px] w-[18px] rounded-full bg-[var(--ink)] shadow-[0_0_0_12px_rgba(244,239,229,0.07),0_0_46px_rgba(240,179,90,0.55)]"
          animate={{
            scale: isOpen ? 1.45 : 1,
            backgroundColor: isOpen ? "var(--amber)" : "var(--ink)",
          }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </motion.button>

      {/* Desktop : cartes positionnées autour du centre */}
      <nav className="hidden md:contents" aria-label="Sections du portfolio">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onOpenSection(section.id)}
            tabIndex={cardsInteractive ? 0 : -1}
            aria-hidden={!cardsInteractive}
            className={`constellation-card group absolute z-10 w-[min(230px,42vw)] text-left ${focusRing}`}
            style={{
              left: `${section.node.x}%`,
              top: `${section.node.y}%`,
              transform: "translate(-50%, -50%)",
              ["--node-tone" as string]: section.accent,
            }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{
              opacity: isOpen ? (isSection ? 0.14 : 1) : 0,
              scale: isOpen ? (isSection ? 0.88 : 1) : 0.72,
              pointerEvents: cardsInteractive ? "auto" : "none",
            }}
            transition={{ duration: 0.75, ease: [0.2, 0.9, 0.2, 1], delay: index * 0.04 }}
            whileHover={{ scale: 1.035, y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <NodeCard section={section} index={index} />
          </motion.button>
        ))}
      </nav>

      {/* Mobile : liste verticale */}
      <motion.nav
        className="absolute inset-x-4 top-[12%] bottom-20 z-10 overflow-y-auto overscroll-contain md:hidden"
        aria-label="Sections du portfolio"
        aria-hidden={!cardsInteractive}
        initial={{ opacity: 0 }}
        animate={{
          opacity: cardsInteractive ? 1 : 0,
          pointerEvents: cardsInteractive ? "auto" : "none",
        }}
        transition={{ duration: 0.5 }}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(244, 239, 229, 0.3) transparent",
        }}
      >
        <div className="flex flex-col gap-4 pb-8">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => onOpenSection(section.id)}
              tabIndex={cardsInteractive ? 0 : -1}
              className={`constellation-card group relative w-full text-left ${focusRing}`}
              style={{ ["--node-tone" as string]: section.accent }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <NodeCard section={section} index={index} />
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default Constellation;
