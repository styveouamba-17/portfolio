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
    <section id="contact" className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-badge">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-gray-900">Travaillons Ensemble</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un projet en tête ? N'hésitez pas à me contacter. Je serais ravi d'échanger avec vous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <a
              href={`mailto:${contact.email}`}
              className="bento-card flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaEnvelope size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-medium">{contact.email}</p>
              </div>
            </a>

            <a
              href={`tel:${contact.telephone}`}
              className="bento-card flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <FaPhone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="text-gray-900 font-medium">{contact.telephone}</p>
              </div>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FaLinkedin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                <p className="text-gray-900 font-medium">Mon profil</p>
              </div>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-gray-700 group-hover:text-white transition-all">
                <FaGithub size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">GitHub</p>
                <p className="text-gray-900 font-medium">Mon GitHub</p>
              </div>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="bento-card space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    formStatus.isError
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : "bg-green-50 border border-green-200 text-green-700"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-solid"
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
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
