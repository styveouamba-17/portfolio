import { motion } from "framer-motion";

type Section = "about" | "skills" | "work" | "path" | "contact";

interface ConstellationProps {
  isOpen: boolean;
  isSection: boolean;
  currentSection: Section | null;
  onOpenMap: () => void;
  onOpenSection: (section: Section) => void;
}

const nodes = [
  {
    section: "about" as const,
    x: 24,
    y: 28,
    tone: "var(--green)",
    label: "A propos",
    eyebrow: "Identite",
    description: "Qui je suis, comment je pense",
  },
  {
    section: "skills" as const,
    x: 76,
    y: 22,
    tone: "var(--blue)",
    label: "Competences",
    eyebrow: "Stack",
    description: "Outils, logique, facon de construire",
  },
  {
    section: "work" as const,
    x: 24,
    y: 78,
    tone: "var(--amber)",
    label: "Projets",
    eyebrow: "Preuves",
    description: "Quelques realisations concretes",
  },
  {
    section: "path" as const,
    x: 76,
    y: 78,
    tone: "var(--rose)",
    label: "Parcours",
    eyebrow: "Trajet",
    description: "Les etapes qui racontent l'evolution",
  },
  {
    section: "contact" as const,
    x: 50,
    y: 15,
    tone: "var(--violet)",
    label: "Contact",
    eyebrow: "Signal",
    description: "Un passage simple vers la discussion",
  },
];

const Constellation: React.FC<ConstellationProps> = ({
  isOpen,
  isSection,
  onOpenMap,
  onOpenSection,
}) => {
  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="14" cy="18" r=".22" fill="rgba(244, 239, 229, .42)" />
        <circle cx="27" cy="72" r=".18" fill="rgba(244, 239, 229, .42)" />
        <circle cx="72" cy="16" r=".2" fill="rgba(244, 239, 229, .42)" />
        <circle cx="89" cy="64" r=".16" fill="rgba(244, 239, 229, .42)" />
        <circle cx="50" cy="9" r=".18" fill="rgba(244, 239, 229, .42)" />
        <circle cx="8" cy="88" r=".14" fill="rgba(244, 239, 229, .42)" />
        <circle cx="94" cy="26" r=".13" fill="rgba(244, 239, 229, .42)" />
        <circle cx="38" cy="33" r=".15" fill="rgba(244, 239, 229, .42)" />
      </svg>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[
          "M50 52 C38 42 28 35 18 28",
          "M50 52 C62 40 70 31 82 22",
          "M50 52 C36 58 26 68 16 78",
          "M50 52 C63 59 72 70 84 78",
          "M50 52 C50 38 50 26 50 15",
        ].map((path, index) => (
          <motion.path
            key={path}
            className="constellation-line"
            pathLength={1}
            d={path}
            initial={{ strokeDashoffset: 1 }}
            animate={{
              strokeDashoffset: isOpen ? 0 : 1,
              opacity: isSection ? 0.38 : 1,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 0.9, 0.2, 1],
              delay: index * 0.05,
            }}
          />
        ))}
      </svg>

      <motion.button
        onClick={onOpenMap}
        aria-label="Ouvrir le portfolio"
        className="absolute left-1/2 top-1/2 z-20 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--amber)] md:h-[88px] md:w-[88px]"
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

      {/* Desktop: Absolute positioning */}
      <div className="hidden md:contents">
        {nodes.map((node, index) => (
          <motion.button
            key={node.section}
            onClick={() => onOpenSection(node.section)}
            className="constellation-card group absolute z-10 w-[min(230px,42vw)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--amber)]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              ["--node-tone" as string]: node.tone,
            }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{
              opacity: isOpen ? (isSection ? 0.14 : 1) : 0,
              scale: isOpen ? (isSection ? 0.88 : 1) : 0.72,
              pointerEvents: isOpen && !isSection ? "auto" : "none",
            }}
            transition={{ duration: 0.75, ease: [0.2, 0.9, 0.2, 1], delay: index * 0.04 }}
            whileHover={{ scale: 1.035, y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="card-aura" />
            <span className="node-orb" aria-hidden="true">
              <span />
            </span>

            <span className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--node-tone)]">
                {node.eyebrow}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/45">
                0{index + 1}
              </span>
            </span>

            <strong className="mt-3 block text-[17px] leading-none text-[var(--ink)]">
              {node.label}
            </strong>

            <span className="mt-2 block text-[13px] leading-[1.45] text-[var(--muted)]">
              {node.description}
            </span>

            <span className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/42">
              Explorer
              <span className="h-px flex-1 bg-gradient-to-r from-[var(--node-tone)] to-transparent opacity-70" />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Mobile: Grid layout */}
      <motion.div
        className="absolute inset-x-4 top-[12%] bottom-20 z-10 overflow-y-auto overscroll-contain md:hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen && !isSection ? 1 : 0,
          pointerEvents: isOpen && !isSection ? "auto" : "none",
        }}
        transition={{ duration: 0.5 }}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(244, 239, 229, 0.3) transparent',
        }}
      >
        <div className="flex flex-col gap-4 pb-8">
          {nodes.map((node, index) => (
            <motion.button
              key={node.section}
              onClick={() => onOpenSection(node.section)}
              className="constellation-card group relative w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--amber)]"
              style={{
                ["--node-tone" as string]: node.tone,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span className="card-aura" />
              <span className="node-orb" aria-hidden="true">
                <span />
              </span>

              <span className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--node-tone)]">
                  {node.eyebrow}
                </span>
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/45">
                  0{index + 1}
                </span>
              </span>

              <strong className="mt-3 block text-[17px] leading-none text-[var(--ink)]">
                {node.label}
              </strong>

              <span className="mt-2 block text-[13px] leading-[1.45] text-[var(--muted)]">
                {node.description}
              </span>

              <span className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/42">
                Explorer
                <span className="h-px flex-1 bg-gradient-to-r from-[var(--node-tone)] to-transparent opacity-70" />
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Constellation;