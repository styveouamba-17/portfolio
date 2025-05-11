import { motion } from "framer-motion";
import type { PortfolioData } from "../types";

interface ContactProps {
  contact: PortfolioData["contact"];
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Me contacter
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <span className="font-semibold">Email :</span>
              <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">
                {contact.email}
              </a>
            </div>
            <div>
              <span className="font-semibold">Téléphone :</span>
              <a href={`tel:${contact.telephone}`} className="text-blue-400 hover:underline">
                {contact.telephone}
              </a>
            </div>
            <div>
              <span className="font-semibold">LinkedIn :</span>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Mon profil LinkedIn
              </a>
            </div>
            <div>
              <span className="font-semibold">GitHub :</span>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Mon GitHub
              </a>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Envoyer
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;