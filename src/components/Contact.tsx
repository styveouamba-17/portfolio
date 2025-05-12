import { motion } from "framer-motion";
import type { PortfolioData } from "../types";
import { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';

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

  useEffect(() => {
    // Initialiser EmailJS avec votre clé publique
    emailjs.init("lDilUcH93k2Ip-Qv6");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    try {
      setIsSubmitting(true);
      setFormStatus(null);
      
      // Identifiants EmailJS
      const serviceId = "service_ges4s8i";
      const templateId = "template_y93yja4";
      const publicKey = "lDilUcH93k2Ip-Qv6";
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      
      if (result.text === "OK") {
        setFormStatus({
          message: "Votre message a été envoyé avec succès !",
          isError: false,
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setFormStatus({
        message: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            ref={formRef}
            onSubmit={handleSubmit}
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
            
            {formStatus && (
              <div className={`p-3 rounded ${formStatus.isError ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                {formStatus.message}
              </div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-blue-800' : 'bg-blue-600'} text-white px-6 py-3 rounded hover:bg-blue-700 transition flex justify-center items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer"
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;