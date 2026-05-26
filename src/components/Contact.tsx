import { motion, useInView } from "framer-motion";
import type { PortfolioData } from "../types";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaSpinner,
} from "react-icons/fa6";

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
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      setFormStatus(null);

      const result = await emailjs.sendForm(
        "service_ges4s8i",
        "template_y93yja4",
        formRef.current,
        "lDilUcH93k2Ip-Qv6"
      );

      if (result.text === "OK") {
        setFormStatus({
          message: "Message envoyé. Je reviens vers vous bientôt.",
          isError: false,
        });
        formRef.current.reset();
      }
    } catch {
      setFormStatus({
        message: "Échec de l'envoi. Réessayez ou contactez-moi directement.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const links = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: FaEnvelope,
    },
    {
      label: "Téléphone",
      value: contact.telephone,
      href: `tel:${contact.telephone}`,
      icon: FaPhone,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/styve",
      href: contact.linkedin,
      icon: FaLinkedin,
    },
    {
      label: "GitHub",
      value: "github.com/Styveouamba",
      href: contact.github,
      icon: FaGithub,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 px-4 py-24 text-white sm:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300">
              <span className="h-1.5 w-8 rounded-full bg-white" />
              Contact
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-normal text-white md:text-5xl lg:text-6xl">
              Travaillons ensemble.
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Un projet, une idée ou une opportunité ? Envoyez-moi un message.
              Je réponds généralement rapidement et je serai ravi d’échanger sur
              votre besoin.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-semibold text-emerald-300">
                  Disponible pour de nouveaux projets
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Basé à Dakar, disponible pour des missions web, mobile,
                full stack ou des collaborations produit.
              </p>
            </div>

            <div className="space-y-3">
              {links.map((link, index) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.25 + index * 0.07,
                      duration: 0.5,
                    }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950">
                      <Icon size={17} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {link.label}
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold text-slate-200">
                        {link.value}
                      </span>
                    </span>

                    <FaArrowRight
                      size={13}
                      className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.65, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 md:p-6"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Nom complet
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="votre@email.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Sujet
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Projet, collaboration, question..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Décrivez votre projet ou votre besoin..."
                  className="min-h-36 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
                />
              </div>

              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    formStatus.isError
                      ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner size={15} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <FaArrowRight size={13} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75 }}
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500"
        >
          <span>© 2026 Styve Ouamba. Tous droits réservés.</span>

          <span className="inline-flex items-center gap-2">
            <FaLocationDot size={13} />
            Dakar, Sénégal
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;