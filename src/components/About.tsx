import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaGraduationCap, FaLaptopCode } from "react-icons/fa";

const timeline = [
  {
    year: "2020 - 2021",
    title: "Baccalauréat Scientifique",
    location: "Saint Dominique au Congo-Brazzaville",
    description: "Obtention du baccalauréat scientifique, spécialité mathématique.",
    icon: <FaGraduationCap />,
  },
  {
    year: "Juillet 2021 - Août 2021",
    title: "Stage d'un mois",
    location: "Entreprise TGI à Dakar",
    description: "Stage d'initiation au développement web et Maintenance Informatique.",
    icon: <FaBriefcase />,
  },
  {
    year: "2023 - 2024",
    title: "Licence Informatique",
    location: "Univers Professionnel de Dakar (UNIPRO)",
    description: "Développement de projets web, mobile et gestion de projet.",
    icon: <FaGraduationCap />,
  },
  {
    year: "Août 2024 - Janvier 2025",
    title: "Stage",
    location: "Entreprise GATS (gatsmapping)",
    description: "Stage en développement full stack, participation à des projets d'envergure.",
    icon: <FaBriefcase />,
  },
  {
    year: "Depuis Janvier 2025",
    title: "Developpeur",
    location: "Entreprise GATS",
    description: "Prise de responsabilités sur des projets web et mobile.",
    icon: <FaLaptopCode />,
  },
];

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="a-propos" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-badge">Qui suis-je</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-gray-900">À propos de moi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Développeur passionné avec une expérience solide en développement web et mobile
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Large card - About text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 bento-card"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Mon histoire</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
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
            </div>
          </motion.div>

          {/* Small card - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bento-card bg-gradient-to-br from-blue-50 to-purple-50"
          >
            <FaLaptopCode className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Développeur Full Stack</h3>
            <p className="text-gray-600">
              Passionné par le développement web et mobile
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Mon Parcours</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
              className="bento-card group hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-blue-600">{item.year}</span>
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500 mb-3">{item.location}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
