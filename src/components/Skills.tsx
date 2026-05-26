import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactElement } from "react";
import type { PortfolioData } from "../types";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaLayerGroup,
  FaCode,
  FaToolbox,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiJira,
  SiDjango,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";

interface SkillsProps {
  competences: PortfolioData["competences"];
}

const iconMap: Record<string, { icon: ReactElement; color: string }> = {
  react: { icon: <FaReact />, color: "#06b6d4" },
  "react native": { icon: <FaReact />, color: "#8b5cf6" },
  typescript: { icon: <SiTypescript />, color: "#2563eb" },
  html5: { icon: <FaHtml5 />, color: "#ea580c" },
  css3: { icon: <FaCss3Alt />, color: "#2563eb" },
  "tailwind css": { icon: <SiTailwindcss />, color: "#0891b2" },
  "node.js": { icon: <FaNodeJs />, color: "#16a34a" },
  express: { icon: <SiExpress />, color: "#111827" },
  mongodb: { icon: <SiMongodb />, color: "#16a34a" },
  firebase: { icon: <SiFirebase />, color: "#f59e0b" },
  "restful api": { icon: <TbApi />, color: "#4f46e5" },
  git: { icon: <FaGitAlt />, color: "#ea580c" },
  github: { icon: <FaGithub />, color: "#111827" },
  "vs code": { icon: <BiLogoVisualStudio />, color: "#2563eb" },
  figma: { icon: <FaFigma />, color: "#8b5cf6" },
  jira: { icon: <SiJira />, color: "#2563eb" },
  django: { icon: <SiDjango />, color: "#15803d" },
  postgresql: { icon: <SiPostgresql />, color: "#4f46e5" },
  "next.js": { icon: <SiNextdotjs />, color: "#111827" },
};

const getSkillMeta = (skill: string) =>
  iconMap[skill.toLowerCase()] ?? { icon: <FaCode />, color: "#475569" };

const categoryConfig: Record<
  string,
  {
    label: string;
    description: string;
    index: string;
    icon: ReactElement;
    accent: string;
    badge: string;
  }
> = {
  frontend: {
    label: "Frontend",
    description: "Interfaces modernes, responsives et orientées expérience utilisateur.",
    index: "01",
    icon: <FaLayerGroup />,
    accent: "bg-cyan-500",
    badge: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  },
  backend: {
    label: "Backend",
    description: "APIs, logique métier, bases de données et services robustes.",
    index: "02",
    icon: <FaCode />,
    accent: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  outils: {
    label: "Outils & méthodes",
    description: "Workflow, collaboration, design, versioning et organisation projet.",
    index: "03",
    icon: <FaToolbox />,
    accent: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 ring-violet-200",
  },
};

const Skills: React.FC<SkillsProps> = ({ competences }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const totalSkills = Object.values(competences).reduce(
    (total, skills) => total + (skills as string[]).length,
    0
  );

  return (
    <section
      id="competences"
      ref={ref}
      className="relative overflow-hidden bg-slate-50 px-4 py-24 text-slate-950 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              <span className="h-1.5 w-8 rounded-full bg-slate-950" />
              Expertise
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-normal text-slate-950 md:text-5xl">
              Technologies que j’utilise pour construire.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Un stack orienté applications web et mobile, avec une attention
              particulière portée à la qualité, la maintenabilité et l’expérience
              utilisateur.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-bold text-slate-950">
                  {totalSkills}+
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">
                  Compétences
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-bold text-slate-950">
                  {Object.keys(competences).length}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">
                  Domaines
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            {Object.entries(competences).map(([cat, skills], catIdx) => {
              const config =
                categoryConfig[cat] ?? {
                  label: cat,
                  description: "Technologies et outils utilisés dans mes projets.",
                  index: String(catIdx + 1).padStart(2, "0"),
                  icon: <FaCode />,
                  accent: "bg-slate-950",
                  badge: "bg-slate-100 text-slate-700 ring-slate-200",
                };

              return (
                <motion.article
                  key={cat}
                  initial={{ opacity: 0, y: 26 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: catIdx * 0.12,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/8"
                >
                  <div className="flex flex-col gap-5 border-b border-slate-200 p-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg text-white">
                        {config.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-semibold text-slate-400">
                            {config.index}
                          </span>

                          <h3 className="text-xl font-bold text-slate-950">
                            {config.label}
                          </h3>
                        </div>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${config.badge}`}
                    >
                      {(skills as string[]).length} technologies
                    </span>
                  </div>

                  <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
                    {(skills as string[]).map((skill, index) => {
                      const meta = getSkillMeta(skill);

                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 12 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            delay: catIdx * 0.12 + index * 0.04 + 0.15,
                            duration: 0.4,
                          }}
                          className="group flex min-h-14 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300 hover:bg-white"
                        >
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm ring-1 ring-slate-200"
                            style={{ color: meta.color }}
                          >
                            {meta.icon}
                          </span>

                          <span className="text-sm font-semibold text-slate-700 transition group-hover:text-slate-950">
                            {skill}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;