import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowRight,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaSpinner,
  FaWhatsapp,
} from "react-icons/fa6";
import { profile } from "../../data/profile";
import { useParallax } from "../../hooks/useParallax";
import RouteLines from "../world/RouteLines";

const EMAILJS = {
  serviceId: "service_ges4s8i",
  templateId: "template_y93yja4",
  publicKey: "lDilUcH93k2Ip-Qv6",
};

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: IconType;
  x: string;
  y: string;
  route: string;
}

const { contact } = profile;

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const links: ContactLink[] = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: FaEnvelope,
    x: "28%",
    y: "30%",
    route: "M50 50 C39 34 33 30 28 30",
  },
  contact.telephone && {
    label: "WhatsApp",
    value: contact.telephone,
    href: `https://wa.me/${contact.telephone.replace(/\D/g, "")}`,
    icon: FaWhatsapp,
    x: "72%",
    y: "28%",
    route: "M50 50 C62 34 68 29 72 28",
  },
  {
    label: "LinkedIn",
    value: displayUrl(contact.linkedin),
    href: contact.linkedin,
    icon: FaLinkedin,
    x: "76%",
    y: "68%",
    route: "M50 50 C62 60 70 66 76 68",
  },
  {
    label: "GitHub",
    value: displayUrl(contact.github),
    href: contact.github,
    icon: FaGithub,
    x: "32%",
    y: "72%",
    route: "M50 50 C42 61 36 68 32 72",
  },
].filter((link): link is ContactLink => Boolean(link));

const linkProps = (link: ContactLink) => ({
  href: link.href,
  target: link.href.startsWith("http") ? "_blank" : undefined,
  rel: link.href.startsWith("http") ? "noreferrer" : undefined,
  className: "contact-orbit-link",
});

const linkContent = (link: ContactLink) => {
  const Icon = link.icon;
  return (
    <>
      <i>
        <Icon size={15} />
      </i>
      <span>{link.label}</span>
      <strong>{link.value}</strong>
    </>
  );
};

const Contact: React.FC = () => {
  const parallax = useParallax();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ message: string; isError: boolean } | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      setFormStatus(null);

      // Chargé à l'envoi seulement : inutile de l'embarquer pour tous les visiteurs.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey);

      setFormStatus({ message: "Message envoyé. Je reviens vers vous rapidement.", isError: false });
      formRef.current.reset();
    } catch {
      setFormStatus({
        message: `Échec de l'envoi. Réessayez ou écrivez-moi directement à ${contact.email}.`,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-page" onPointerMove={parallax.onPointerMove}>
      <motion.div style={{ x: parallax.x, y: parallax.y }} className="contact-page-glow" />

      <div className="contact-layout">
        <motion.header
          className="contact-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="contact-kicker">Contact</p>
          <h2>Une dernière étoile pour discuter.</h2>
          <p>
            Un projet, une idée, une opportunité ou simplement une piste à explorer : envoyez un message, je réponds rapidement.
          </p>

          <div className="contact-availability">
            <span />
            <div>
              <strong>Disponible</strong>
              <p>{profile.disponibilite}</p>
            </div>
            <small>
              <FaLocationDot size={12} />
              {profile.ville}, {profile.pays}
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
              <strong>Écrivez-moi</strong>
            </div>

            <div className="contact-fields">
              <label>
                <span>Nom</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Votre nom" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="votre@email.com" />
              </label>
              <label className="is-wide">
                <span>Sujet</span>
                <input name="subject" type="text" placeholder="Projet, collaboration..." />
              </label>
              <label className="is-wide">
                <span>Message</span>
                <textarea name="message" required placeholder="Décrivez votre projet..." />
              </label>
            </div>

            {formStatus && (
              <motion.div
                role="status"
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
            style={{ x: parallax.x }}
            className="contact-constellation"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            {/* Desktop : liens en orbite */}
            <div className="hidden md:block">
              <RouteLines paths={links.map((link) => link.route)} pathClassName="contact-route" />

              <div className="contact-center">
                <span />
                <small>Signal</small>
              </div>

              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  {...linkProps(link)}
                  style={{ left: link.x, top: link.y }}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.58, delay: 0.28 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  {linkContent(link)}
                </motion.a>
              ))}
            </div>

            {/* Mobile : liste verticale */}
            <div className="flex flex-col gap-3 md:hidden">
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  {...linkProps(link)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {linkContent(link)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
