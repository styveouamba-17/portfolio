import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2020 - 2021",
    title: "Baccalauréat Scientifique",
    location: "Saint Dominique au Congo-Brazzaville",
    description: "Obtention du baccalauréat scientifique, spécialité mathématique.",
  },
  {
    year: "Juillet 2021 - Août 2021",
    title: "Stage d'un mois",
    location: "Entreprise TGI à Dakar",
    description: "Stage d'initiation au développement web et Maintenance Informatique.",
  },
  {
    year: "2023 - 2024",
    title: "Licence Informatique",
    location: "Univers Professionnel de Dakar (UNIPRO)",
    description: "Développement de projets web, mobile et gestion de projet.",
  },
  {
    year: "Août 2024 - Janvier 2025",
    title: "Stage",
    location: "Entreprise GATS (gatsmapping)",
    description: "Stage en développement full stack, participation à des projets d'envergure.",
  },
  {
    year: "Depuis Janvier 2025",
    title: "Stage Développeur Full Stack",
    location: "Entreprise GATS",
    description: " prise de responsabilités sur des projets web et mobile.",
  },
];

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="a-propos" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
            À propos de moi
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all">
              <div className="text-6xl mb-6">👨‍💻</div>
              <h3 className="text-3xl font-bold mb-4 text-accent">Développeur Full Stack</h3>
              <p className="text-gray-400 leading-relaxed">
                Passionné par le développement web et mobile
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              Je suis un développeur full stack passionné par la création d'applications web et mobiles modernes.
              Avec une solide expérience dans les technologies front-end et back-end, je développe des solutions
              complètes et performantes.
            </p>
            <p>
              Mon approche est centrée sur la création d'interfaces utilisateur intuitives et d'architectures
              robustes. Je m'efforce constamment d'améliorer mes compétences et de rester à jour avec les
              dernières technologies.
            </p>
            <p>
              Je suis particulièrement intéressé par les projets innovants qui présentent des défis techniques
              et qui ont un impact positif.
            </p>
          </motion.div>
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Mon parcours
        </motion.h3>

        <div className="relative max-w-5xl mx-auto">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + idx * 0.15, duration: 0.6 }}
              className="relative mb-8 flex items-start gap-6"
            >
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-600/50">
                  {idx + 1}
                </div>
                {idx !== timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-blue-600/30 mt-2"></div>
                )}
              </div>

              {/* Content card */}
              <div className="flex-1 glass-effect rounded-xl p-6 hover:bg-white/10 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div className="text-blue-400 font-semibold text-sm mb-2 md:mb-0">{item.year}</div>
                  <div className="text-gray-400 text-sm">{item.location}</div>
                </div>
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
