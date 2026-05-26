import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

interface HomeProps {
  nom: string;
  titre: string;
  description: string;
}

const Home: React.FC<HomeProps> = ({ nom, titre, description }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen overflow-hidden bg-[#f8fafc] px-4 pt-24 text-slate-950"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Disponible pour de nouveaux projets
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-slate-950 md:text-6xl lg:text-7xl"
          >
            {nom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 max-w-2xl text-2xl font-medium text-slate-700 md:text-3xl"
          >
            {titre}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("projets")}
              className="inline-flex items-center gap-3 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Voir mes projets
              <FaArrowRight size={14} />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-950"
            >
              Me contacter
            </button>

            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              <FaDownload size={14} />
              CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-10 flex items-center gap-3"
          >
            {[
              {
                href: "https://github.com/Styveouamba",
                label: "GitHub",
                icon: <FaGithub size={20} />,
              },
              {
                href: "https://www.linkedin.com/feed/",
                label: "LinkedIn",
                icon: <FaLinkedin size={20} />,
              },
              {
                href: "mailto:styveouamba@gmail.com",
                label: "Email",
                icon: <FaEnvelope size={20} />,
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  item.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-950 hover:text-slate-950"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <div className="mb-16 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Portfolio</p>
                  <p className="mt-1 font-semibold">{nom}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white text-center text-lg font-bold leading-[3rem] text-slate-950">
                  {nom.charAt(0)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Spécialité</p>
                  <p className="mt-1 text-xl font-semibold">{titre}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">React</p>
                    <p className="mt-1 text-xs text-slate-400">Frontend</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">UI</p>
                    <p className="mt-1 text-xs text-slate-400">Design</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-2xl font-bold">Web</p>
                    <p className="mt-1 text-xs text-slate-400">Apps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;