import type { SectionMeta } from "../../types";

interface NodeCardProps {
  section: SectionMeta;
  index: number;
}

/** Contenu d'une carte de la constellation (partagé desktop / mobile). */
const NodeCard: React.FC<NodeCardProps> = ({ section, index }) => (
  <>
    <span className="card-aura" />
    <span className="node-orb" aria-hidden="true">
      <span />
    </span>

    <span className="flex items-center justify-between gap-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--node-tone)]">
        {section.eyebrow}
      </span>
      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/45">
        {String(index + 1).padStart(2, "0")}
      </span>
    </span>

    <strong className="mt-3 block text-[17px] leading-none text-[var(--ink)]">{section.label}</strong>

    <span className="mt-2 block text-[13px] leading-[1.45] text-[var(--muted)]">
      {section.description}
    </span>

    <span className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/42">
      Explorer
      <span className="h-px flex-1 bg-gradient-to-r from-[var(--node-tone)] to-transparent opacity-70" />
    </span>
  </>
);

export default NodeCard;
