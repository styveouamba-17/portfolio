import { motion, useInView } from "framer-motion";
import type { PortfolioData } from "../types";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

interface ContactProps {
  contact: PortfolioData["contact"];
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const [formStatus, setFormStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      setFormStatus(null);

      const serviceId = "service_ges4s8i";
      const templateId = "template_y93yja4";
      const publicKey = "lDilUcH93k2Ip-Qv6";

      const result = await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      if (result.text === "OK") {
        setFormStatus({
          message: "Message envoyé avec succès ! Je vous répondrai bientôt.",
          isError: false,
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setFormStatus({
        message: "Une erreur s'est produite. Veuillez réessayer.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
            Me contacter
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Un projet en tête ? N'hésitez pas à me contacter. Je serais ravi d'échanger avec vous.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>

              <div className="space-y-6">
                <motion.a
                  whileHover={{ x: 10 }}
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaEnvelope className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {contact.email}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10 }}
                  href={`tel:${contact.telephone}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaPhone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Téléphone</p>
                    <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      {contact.telephone}
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10 }}
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaLinkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      Mon profil LinkedIn
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 10 }}
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaGithub className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                      Mon GitHub
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4 text-center">Télécharger mon CV</h4>
                <div className="flex justify-center">
                  <CVGenerator />
                </div>
              </div> */}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    formStatus.isError
                      ? "bg-red-500/20 border border-red-500/50 text-red-200"
                      : "bg-green-500/20 border border-green-500/50 text-green-200"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
