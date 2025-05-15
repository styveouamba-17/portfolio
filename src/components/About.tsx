import { motion } from "framer-motion";

const timeline = [
  {
    year: "2020 - 2021",
    title: "Baccalauréat Scientifique",
    location: "Saint Dominique au Congo-Brazzaville",
    description: "Obtention du baccalauréat scientifique, spécialité mathématique.",
    side: "left",
  },
  {
    year: "Juillet 2021 - Aout 2021",
    title: "Stage d'un mois",
    location: "Entreprise TGI a Dakar ",
    description: "Stage d'initiation au développement web et Maintenance Informatique, premières expériences professionnelles.",
    side: "right",
  },
  {
    year: "2023 - 2024",
    title: "Licence Informatique",
    location: "Univers Professionnel de Dakar (UNIPRO)",
    description: "Développement de projets web, mobile et gestion de projet. Approfondissement des compétences techniques.",
    side: "left",
  },
  {
    year: "Août 2024 - Janvier 2025",
    title: "Stage de 6 mois dans l'entreprise GATS (gatsmapping)",
    location: "Entreprise GATS",
    description: "Stage de 6 mois en développement full stack, participation à des projets d'envergure.",
    side: "right",
  },
  {
    year: "Depuis Janvier 2025",
    title: "CDD Développeur Full Stack",
    location: "Entreprise GATS",
    description: "Premier contrat en CDD, prise de responsabilités sur des projets web et mobile.",
    side: "left",
  },
];

const About: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-800"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-blue-400"
        >
          À propos de moi
        </motion.h2>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-24 h-1 bg-blue-500 mx-auto mb-10"
        />

        <div className="flex flex-col md:flex-row gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:w-1/3"
          >
            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-xl">
              <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Développeur Full Stack</h3>
                <p className="text-gray-300">Passionné par le développement web et mobile</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:w-2/3 text-lg text-gray-300 space-y-6"
          >
            <p>
              Je suis un développeur full stack passionné par la création d'applications web et mobiles modernes.
              Avec une solide expérience dans les technologies front-end et back-end, je développe des solutions
              complètes et performantes qui répondent aux besoins des utilisateurs.
            </p>
            <p>
              Mon approche est centrée sur la création d'interfaces utilisateur intuitives et d'architectures
              robustes. Je m'efforce constamment d'améliorer mes compétences et de rester à jour avec les
              dernières technologies et meilleures pratiques du développement web et mobile.
            </p>
            <p>
              Je suis particulièrement intéressé par les projets innovants qui présentent des défis techniques
              et qui ont un impact positif. Ma capacité à comprendre les besoins métier et à les traduire en
              solutions techniques efficaces est l'une de mes principales forces.
            </p>
          </motion.div>
        </div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-10"
        >
          Mon parcours
        </motion.h3>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-blue-500 transform -translate-x-1/2"></div>
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${item.side === "left" ? "md:justify-start" : "md:justify-end"}`}>
                <div className={`w-full md:w-1/2 ${item.side === "left" ? "md:pr-8 md:order-1" : "md:pl-8 md:order-2"}`}>
                  <div className="bg-gray-700 rounded-lg p-6 shadow-md">
                    <div className="text-blue-400 font-semibold">{item.year}</div>
                    <div className="text-xl font-bold">{item.title}</div>
                    <div className="text-gray-300">{item.location}</div>
                    <div className="mt-2 text-gray-400 text-sm">{item.description}</div>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-center z-10">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-800 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  {idx !== timeline.length - 1 && (
                    <div className="flex-1 w-1 bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;