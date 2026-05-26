import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaGraduationCap, FaLocationDot } from "react-icons/fa6";

const timeline = [
  {
    year: "2020 — 2021",
    title: "Baccalauréat Scientifique",
    location: "Saint Dominique, Congo-Brazzaville",
    description:
      "Spécialité mathématique. Première confrontation sérieuse avec la logique qui allait définir ma carrière.",
    type: "education",
  },
  {
    year: "Juil — Août 2021",
    title: "Stage d'initiation",
    location: "Entreprise TGI, Dakar",
    description:
      "Premier contact avec le monde professionnel : développement web et maintenance informatique.",
    type: "work",
  },
  {
    year: "2023 — 2024",
    title: "Licence Informatique",
    location: "UNIPRO, Dakar",
    description:
      "Développement de projets web et mobile, gestion de projet. Construction des fondations techniques.",
    type: "education",
  },
  {
    year: "Août 2024 — Jan 2025",
    title: "Stage Full Stack",
    location: "GATS (gatsmapping)",
    description:
      "Participation à des projets d'envergure. Montée en compétence rapide sur des architectures complexes.",
    type: "work",
  },
  {
    year: "Jan 2025 — Déc 2025",
    title: "CDD Développeur Full Stack",
    location: "GATS",
    description:
      "Prise de responsabilités. Conception et développement de solutions web et mobile de bout en bout.",
    type: "current",
  },
  {
    year: "Depuis Jan 2026",
    title: "CDI Développeur Full Stack",
    location: "GATS",
    description:
      "Conception, développement et amélioration continue de produits web et mobiles dans un contexte professionnel.",
    type: "current",
  },
];

const typeStyles = {
  education: {
    label: "Formation",
    icon: FaGraduationCap,
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  work: {
    label: "Expérience",
    icon: FaBriefcase,
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  current: {
    label: "Actuel",
    icon: FaBriefcase,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
};

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="a-propos"
      ref={ref}
      className="relative overflow-hidden bg-white px-4 py-24 text-slate-950 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
              <span className="h-1.5 w-8 rounded-full bg-slate-950" />
              À propos
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-normal text-slate-950 md:text-5xl lg:text-6xl">
              Un profil full stack orienté produit.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-lg leading-8 text-slate-600">
              Développeur full stack basé à{" "}
              <strong className="font-semibold text-slate-950">Dakar</strong>,
              je construis des applications web et mobiles pensées pour être{" "}
              <strong className="font-semibold text-slate-950">
                performantes, maintenables et agréables à utiliser
              </strong>
              .
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Mon approche : comprendre le problème avant d'écrire la première
              ligne. Je m'intéresse autant à l'expérience utilisateur qu'à
              l'architecture technique qui la supporte.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
          className="mb-20 grid gap-4 md:grid-cols-3"
        >
          {[
            { num: "3+", label: "Années d'expérience" },
            { num: "15+", label: "Projets livrés" },
            { num: "10+", label: "Technologies maîtrisées" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="text-4xl font-bold tracking-normal text-slate-950">
                {stat.num}
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>


        <div className="grid gap-10 lg:grid-cols-[minmax(280px,340px)_1fr] xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Parcours
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 md:text-4xl">
              Formation & expérience
            </h3>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Une progression continue entre bases scientifiques, projets web, mobile
              et responsabilités full stack en entreprise.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-500">
                Position actuelle
              </div>
              <div className="mt-2 text-lg font-bold text-slate-950">
                Développeur Full Stack chez GATS
              </div>
              <div className="mt-1 text-sm text-emerald-700">
                Depuis janvier 2026
              </div>
            </div>
          </motion.div>

          <div className="relative min-h-[400px]">
            <div className="absolute left-4 top-3 bottom-3 w-px bg-slate-200 md:left-6" />

            <div className="space-y-6">
              {timeline.map((item, index) => {
                const style = typeStyles[item.type as keyof typeof typeStyles];
                const Icon = style.icon;

                return (
                  <motion.article
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.35 + index * 0.08,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                    className="relative pl-12 md:pl-16"
                  >
                    <div
                      className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-8 ring-white md:left-2 ${style.dot}`}
                    >
                      <Icon size={13} className="text-white" />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-500">
                          {item.year}
                        </span>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${style.className}`}
                        >
                          <Icon size={12} />
                          {style.label}
                        </span>
                      </div>

                      <h4 className="mt-4 text-xl font-bold tracking-normal text-slate-950">
                        {item.title}
                      </h4>

                      <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                        <FaLocationDot size={13} />
                        {item.location}
                      </div>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;