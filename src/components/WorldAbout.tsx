import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const orbitNodes = [
  {
    id: "vision",
    label: "Vision",
    title: "Penser produit avant de coder",
    text: "Je commence par comprendre le besoin, le public et les contraintes. Le code arrive ensuite comme une reponse precise, pas comme un reflexe.",
    x: "72%",
    y: "18%",
  },
  {
    id: "method",
    label: "Methode",
    title: "Avancer par prototypes",
    text: "Je transforme vite une idee en interface testable, puis j'itere sur le rendu, les interactions et la structure technique.",
    x: "82%",
    y: "58%",
  },
  {
    id: "profile",
    label: "Profil",
    title: "Full stack avec une sensibilite UI",
    text: "J'aime autant construire une base solide que soigner les details visibles: rythme, lisibilite, transitions et usage reel.",
    x: "32%",
    y: "78%",
  },
];


const stats = [
  { value: 3, suffix: "+", label: "annees", detail: "web et mobile" },
  { value: 15, suffix: "+", label: "projets", detail: "interfaces, apps, dashboards" },
  { value: 10, suffix: "+", label: "technos", detail: "stack full stack moderne" },
];

const principles = [
  "Comprendre le probleme",
  "Concevoir une experience claire",
  "Construire proprement",
  "Iterer avec du recul",
];

const WorldAbout: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [activeNode, setActiveNode] = useState(orbitNodes[0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const nebulaY = useTransform(scrollYProgress, [0, 1], [-70, 90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const copyY = useTransform(scrollYProgress, [0, 1], [20, -24]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [-12, 28]);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-32, 32]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-26, 26]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="about-scene relative mx-auto min-h-[860px] w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 lg:px-10"
    >
      <motion.div
        style={{ y: nebulaY, x: parallaxX }}
        className="about-nebula pointer-events-none absolute right-[4%] top-[5%] h-[420px] w-[420px]"
      />

      <motion.svg
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          className="about-route"
          pathLength={1}
          d="M18 28 C32 20 44 22 52 36 C61 49 68 56 82 58"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, ease: [0.22, 0.9, 0.2, 1] }}
        />
        <motion.path
          className="about-route secondary"
          pathLength={1}
          d="M52 36 C42 50 36 61 32 78"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, delay: 0.16, ease: [0.22, 0.9, 0.2, 1] }}
        />
        <motion.path
          className="about-route secondary"
          pathLength={1}
          d="M52 36 C61 25 66 20 72 18"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1, delay: 0.26, ease: [0.22, 0.9, 0.2, 1] }}
        />
      </motion.svg>

      <div className="relative grid min-h-[760px] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.15fr)]">
        <motion.div
          style={{ y: copyY }}
          className="relative z-10 flex flex-col justify-center pb-6 pt-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]"
          >
            A propos
          </motion.p>
           <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="max-w-[11ch] text-[clamp(48px,8vw,104px)] leading-[0.9] text-[var(--ink)]"
          >
            Je construis avec une idee claire du trajet.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-10 max-w-[54ch] text-[clamp(18px,2.2vw,25px)] leading-[1.48] text-[#e6dfd2]"
          >
            Developpeur full stack base a Dakar, je cree des experiences web et mobiles qui restent lisibles, rapides et agreables a utiliser.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 max-w-[62ch] text-[15px] leading-[1.75] text-[var(--muted)]"
          >
            Mon approche relie trois points: comprendre le probleme, dessiner une interaction qui a du sens, puis construire une base technique maintenable. Cette section reprend donc la logique du portfolio: chaque idee est un noeud, chaque noeud raconte une partie du profil.
          </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34 }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {principles.map((principle, index) => (
              <div key={principle} className="about-principle">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {principle}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: orbitY, x: parallaxX }}
          className="relative z-10 min-h-[620px]"
        >
          {/* Desktop: Absolute positioning with constellation */}
          <div className="hidden md:block">
            <div className="about-core">
              <span className="about-core-ring" />
              <span className="about-core-dot" />
              <span className="about-core-label">Profil</span>
            </div>
            
            {orbitNodes.map((node, index) => (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`about-node ${activeNode.id === node.id ? "is-active" : ""}`}
                style={{
                  left: node.x,
                  top: node.y,
                  ["--node-index" as string]: String(index + 1),
                }}
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ 
                  opacity: 1, 
                  scale: activeNode.id === node.id ? 1.05 : 1,
                  y: activeNode.id === node.id ? -4 : 0
                }}
                transition={{ duration: 0.7, delay: 0.35 + index * 0.12 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <span className="about-node-orb" />
                <span className="about-node-index">0{index + 1}</span>
                <strong>{node.label}</strong>
                <small>{node.title}</small>
              </motion.button>
            ))}

            <motion.article
              key={activeNode.id}
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, y: 24, scale: 0.92, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
              className="about-detail"
            >
              <span className="about-detail-kicker">{activeNode.label}</span>
              <h3>{activeNode.title}</h3>
              <p>{activeNode.text}</p>
            </motion.article>
          </div>

          {/* Mobile: Vertical list */}
          <div className="flex flex-col gap-3 md:hidden">
            {orbitNodes.map((node, index) => (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`about-node ${activeNode.id === node.id ? "is-active" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="about-node-orb" />
                <span className="about-node-index">0{index + 1}</span>
                <strong>{node.label}</strong>
                <small>{node.title}</small>
              </motion.button>
            ))}

            <motion.article
              key={activeNode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="about-detail"
            >
              <span className="about-detail-kicker">{activeNode.label}</span>
              <h3>{activeNode.title}</h3>
              <p>{activeNode.text}</p>
            </motion.article>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75 }}
        className="about-stats relative z-10"
      >
        {stats.map((stat, index) => (
          <AnimatedStat key={stat.label} {...stat} delay={index * 0.14} />
        ))}
      </motion.div>
    </motion.section>
  );
};

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  delay: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, suffix, label, detail, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const total = 70;

    function tick() {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    }

    tick();
  }, [started, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="about-stat"
    >
      <span className="about-stat-orb" />
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
      <p>{detail}</p>
        <p>{detail}</p>
    </motion.div>
  );
};

export default WorldAbout;
