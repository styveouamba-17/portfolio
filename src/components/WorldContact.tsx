import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import type { PortfolioData } from "../types";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaSpinner,
  FaLocationDot,
} from "react-icons/fa6";

interface WorldContactProps {
  contact: PortfolioData["contact"];
}

const WorldContact: React.FC<WorldContactProps> = ({ contact }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const links = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: FaEnvelope,
      x: "28%",
      y: "30%",
    },
    {
      label: "Telephone",
      value: contact.telephone,
      href: `tel:${contact.telephone}`,
      icon: FaPhone,
      x: "72%",
      y: "28%",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/styve",
      href: contact.linkedin,
      icon: FaLinkedin,
      x: "76%",
      y: "68%",
    },
    {
      label: "GitHub",
      value: "github.com/Styveouamba",
      href: contact.github,
      icon: FaGithub,
      x: "32%",
      y: "72%",
    },
  ];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      setFormStatus(null);

      const result = await emailjs.sendForm(
        "service_ges4s8i",
        "template_y93yja4",
        formRef.current,
        "lDilUcH93k2Ip-Qv6",
      );

      if (result.text === "OK") {
        setFormStatus({
          message: "Message envoye. Je reviens vers vous bientot.",
          isError: false,
        });
        formRef.current.reset();
      }
    } catch {
      setFormStatus({
        message: "Echec de l'envoi. Reessayez ou contactez-moi directement.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section className="contact-page" onPointerMove={handlePointerMove}>
      <motion.div style={{ x: parallaxX, y: parallaxY }} className="contact-page-glow" />

      <div className="contact-layout">
        <motion.header
          className="contact-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="contact-kicker">Contact</p>
          <h2>Une derniere etoile pour discuter.</h2>
          <p>
            Un projet, une idee, une opportunite ou simplement une piste a explorer: envoyez un signal, je reponds rapidement.
          </p>

          <div className="contact-availability">
            <span />
            <div>
              <strong>Disponible</strong>
              <p>Base a Dakar, ouvert aux missions web, mobile et full stack.</p>
            </div>
            <small>
              <FaLocationDot size={12} />
              Dakar, Senegal
            </small>
          </div>
        </motion.header>

        <div className="contact-right-col">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <div className="contact-panel-head">
              <span>Message</span>
              <strong>Envoyer un signal</strong>
            </div>

            <div className="contact-fields">
              <label>
                <span>Nom</span>
                <input name="name" type="text" required placeholder="Votre nom" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" required placeholder="votre@email.com" />
              </label>
              <label className="is-wide">
                <span>Sujet</span>
                <input name="subject" type="text" placeholder="Projet, collaboration..." />
              </label>
              <label className="is-wide">
                <span>Message</span>
                <textarea name="message" required placeholder="Decrivez votre projet..." />
              </label>
            </div>

            {formStatus && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`contact-status ${formStatus.isError ? "is-error" : "is-success"}`}
              >
                {formStatus.message}
              </motion.div>
            )}

            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner size={14} className="animate-spin" />
                  Envoi en cours
                </>
              ) : (
                <>
                  Envoyer le message
                  <FaArrowRight size={13} />
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            style={{ x: parallaxX }}
            className="contact-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop: Absolute positioning with constellation */}
            <div className="hidden md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  className="contact-route"
                  pathLength={1}
                  d="M50 50 C39 34 33 30 28 30"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.15 }}
                />
                <motion.path
                  className="contact-route"
                  pathLength={1}
                  d="M50 50 C62 34 68 29 72 28"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.25 }}
                />
                <motion.path
                  className="contact-route"
                  pathLength={1}
                  d="M50 50 C62 60 70 66 76 68"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.35 }}
                />
                <motion.path
                  className="contact-route"
                  pathLength={1}
                  d="M50 50 C42 61 36 68 32 72"
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.85, delay: 0.45 }}
                />
              </svg>

              <div className="contact-center">
                <span />
                <small>Signal</small>
              </div>

              {links.map((link, index) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="contact-orbit-link"
                    style={{ left: link.x, top: link.y }}
                    initial={{ opacity: 0, scale: 0.72 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.58, delay: 0.28 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.03 }}
                  >
                    <i>
                      <Icon size={15} />
                    </i>
                    <span>{link.label}</span>
                    <strong>{link.value}</strong>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile: Vertical list */}
            <div className="flex flex-col gap-3 md:hidden">
              {links.map((link, index) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="contact-orbit-link"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <i>
                      <Icon size={15} />
                    </i>
                    <span>{link.label}</span>
                    <strong>{link.value}</strong>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldContact;
