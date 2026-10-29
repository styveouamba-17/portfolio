import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { projets } from "../../data/projects";
import { allSkills } from "../../data/skills";
import { useParallax } from "../../hooks/useParallax";
import RouteLines from "../world/RouteLines";

const orbitNodes = [
  {
    id: "vision",
    label: "Vision",
    title: "Penser produit avant de coder",
    text: "Je commence par comprendre le besoin, le public et les contraintes. Le code arrive ensuite comme une réponse précise, pas comme un réflexe.",
    x: "72%",
    y: "18%",
  },
  {
    id: "method",
    label: "Méthode",
    title: "Avancer par prototypes",
    text: "Je transforme vite une idée en interface testable, puis j'itère sur le rendu, les interactions et la structure technique.",
    x: "82%",
    y: "58%",
  },
  {
    id: "profile",
    label: "Profil",
    title: "Full stack avec une sensibilité UI",
    text: "J'aime autant construire une base solide que soigner les détails visibles : rythme, lisibilité, transitions et usage réel.",
    x: "32%",
    y: "78%",
  },
];

const stats = [
  {
    value: new Date().getFullYear() - profile.debutPro,
    suffix: "+",
    label: "années",
    detail: "d'expérience web et mobile",
  },
  { value: projets.length, suffix: "", label: "projets", detail: "sites, applications, dashboards" },
  { value: allSkills.length, suffix: "", label: "technologies", detail: "du frontend au backend" },
];

const principles = [
  "Comprendre le problème",
  "Concevoir une expérience claire",
  "Construire proprement",
  "Itérer avec du recul",
];

const routes = [
  "M18 28 C32 20 44 22 52 36 C61 49 68 56 82 58",
  "M52 36 C42 50 36 61 32 78",
  "M52 36 C61 25 66 20 72 18",
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallax = useParallax(32, 26);
  const [activeNode, setActiveNode] = useState(orbitNodes[0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const nebulaY = useTransform(scrollYProgress, [0, 1], [-70, 90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const copyY = useTransform(scrollYProgress, [0, 1], [20, -24]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [-12, 28]);

  return (
    <motion.section
      ref={sectionRef}
      onPointerMove={parallax.onPointerMove}
      className="about-scene relative mx-auto min-h-[860px] w-full max-w-7xl overflow-hidden px-4 py-8 sm:px-8 lg:px-10"
    >
      <motion.div
        style={{ y: nebulaY, x: parallax.x }}
        className="about-nebula pointer-events-none absolute right-[4%] top-[5%] h-[420px] w-[420px]"
      />

      <RouteLines
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        paths={routes}
        pathClassName={["about-route", "about-route secondary", "about-route secondary"]}
        duration={1}
        delay={0}
        stagger={0.13}
      />

      <div className="relative grid min-h-[760px] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.15fr)]">
        <motion.div style={{ y: copyY }} className="relative z-10 flex flex-col justify-center pb-6 pt-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]"
          >
            À propos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="max-w-[11ch] text-[clamp(48px,8vw,104px)] leading-[0.9] text-[var(--ink)]"
          >
            Je construis avec une idée claire du trajet.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-10 max-w-[54ch] text-[clamp(18px,2.2vw,25px)] leading-[1.48] text-[#e6dfd2]"
          >
            Développeur full stack basé à {profile.ville}, je crée des expériences web et mobiles lisibles, rapides et agréables à utiliser.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 max-w-[62ch] text-[15px] leading-[1.75] text-[var(--muted)]"
          >
            Aujourd'hui en CDI chez GATS, je conçois et fais évoluer des produits web et mobiles, de l'interface React jusqu'à l'API Node.js. Mon approche relie trois points : comprendre le problème, dessiner une interaction qui a du sens, puis construire une base technique maintenable.
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

        <motion.div style={{ y: orbitY, x: parallax.x }} className="relative z-10 min-h-[620px]">
          {/* Desktop : nœuds en orbite */}
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
                aria-pressed={activeNode.id === node.id}
                style={{
                  left: node.x,
                  top: node.y,
                  ["--node-index" as string]: String(index + 1),
                }}
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{
                  opacity: 1,
                  scale: activeNode.id === node.id ? 1.05 : 1,
                  y: activeNode.id === node.id ? -4 : 0,
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
              style={{ x: parallax.x, y: parallax.y }}
              initial={{ opacity: 0, y: 24, scale: 0.92, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
              className="about-detail"
              aria-live="polite"
            >
              <span className="about-detail-kicker">{activeNode.label}</span>
              <h3>{activeNode.title}</h3>
              <p>{activeNode.text}</p>
            </motion.article>
          </div>

          {/* Mobile : liste verticale */}
          <div className="flex flex-col gap-3 md:hidden">
            {orbitNodes.map((node, index) => (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node)}
                className={`about-node ${activeNode.id === node.id ? "is-active" : ""}`}
                aria-pressed={activeNode.id === node.id}
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
    let rafId = 0;
    const total = 70;

    function tick() {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(rafId);
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
      <strong aria-label={`${value}${suffix} ${label}`}>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
      <p>{detail}</p>
    </motion.div>
  );
};

export default About;
