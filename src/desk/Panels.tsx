import { useRef, useState } from "react";
import {
  FaArrowUpRightFromSquare,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import { profile } from "../data/profile";
import { mobileProjects, projectCategories, projets, webProjects } from "../data/projects";
import { allSkills, skillCategories } from "../data/skills";
import { timeline } from "../data/timeline";
import type { Projet } from "../types";
import type { StationId } from "./stations";

const EMAILJS = {
  serviceId: "service_ges4s8i",
  templateId: "template_y93yja4",
  publicKey: "lDilUcH93k2Ip-Qv6",
};

const categoryLabel = (projet: Projet) =>
  projectCategories.find((category) => category.id === projet.categorie)?.label ?? "";

/* ------------------------------------------------------------------ */

export const ProjectLinks: React.FC<{ projet: Projet }> = ({ projet }) =>
  projet.lien || projet.code ? (
    <div className="panel-links">
      {projet.lien && (
        <a href={projet.lien} target="_blank" rel="noreferrer">
          Voir le projet <FaArrowUpRightFromSquare size={10} />
        </a>
      )}
      {projet.code && (
        <a href={projet.code} target="_blank" rel="noreferrer">
          <FaGithub size={12} /> Code
        </a>
      )}
    </div>
  ) : (
    <p className="panel-note">Démo sur demande</p>
  );

const ProjectDetail: React.FC<{ projet: Projet }> = ({ projet }) => (
  <article className="panel-project">
    <img src={`/images/${projet.image}`} alt={`Aperçu de ${projet.titre}`} loading="lazy" />
    <p className="panel-eyebrow">
      {categoryLabel(projet)}
      {projet.aLaUne && <em>À la une</em>}
    </p>
    <h3>{projet.titre}</h3>
    <p>{projet.description}</p>
    {projet.etudeDeCas && (
      <dl className="panel-case">
        <dt>Mon rôle</dt>
        <dd>{projet.etudeDeCas.role}</dd>
        <dt>Le défi</dt>
        <dd>{projet.etudeDeCas.defi}</dd>
        <dt>Le résultat</dt>
        <dd>{projet.etudeDeCas.resultat}</dd>
      </dl>
    )}
    <ul className="panel-chips">
      {projet.technologies.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
    <ProjectLinks projet={projet} />
  </article>
);

/** Liste cliquable + détail du projet sélectionné. */
const ProjectBrowser: React.FC<{ list: Projet[]; onPreview?: (projet: Projet) => void }> = ({ list, onPreview }) => {
  const [selectedId, setSelectedId] = useState(list[0].id);
  const selected = list.find((projet) => projet.id === selectedId) ?? list[0];

  return (
    <>
      <ul className="panel-list" role="listbox" aria-label="Projets">
        {list.map((projet) => (
          <li key={projet.id}>
            <button
              type="button"
              role="option"
              aria-selected={projet.id === selected.id}
              onClick={() => {
                setSelectedId(projet.id);
                onPreview?.(projet);
              }}
            >
              <strong>{projet.titre}</strong>
              <span>{categoryLabel(projet)}</span>
            </button>
          </li>
        ))}
      </ul>
      <ProjectDetail projet={selected} />
    </>
  );
};

/* ------------------------------------------------------------------ */

export const WorkPanel: React.FC<{ onPreview?: (projet: Projet) => void }> = ({ onPreview }) => (
  <>
    <PanelHeader eyebrow="Projets web" title="Sites et applications" />
    <p className="panel-lead">
      {webProjects.length} projets livrés, de la vitrine au tableau de bord métier. Choisissez-en un : il s'affiche sur l'écran.
    </p>
    <ProjectBrowser list={webProjects} onPreview={onPreview} />
  </>
);

export const MobilePanel: React.FC = () => (
  <>
    <PanelHeader eyebrow="Apps mobiles" title="Dans la poche" />
    <p className="panel-lead">Applications React Native pensées pour l'usage au quotidien.</p>
    <ProjectBrowser list={mobileProjects} />
  </>
);

export const PathPanel: React.FC = () => (
  <>
    <PanelHeader eyebrow="Parcours" title="De Brazzaville à Dakar" />
    <ol className="panel-timeline">
      {[...timeline].reverse().map((step) => (
        <li key={step.titre} className={step.type === "actuel" ? "is-current" : ""}>
          <span>{step.periode}</span>
          <strong>{step.titre}</strong>
          <small>{step.lieu}</small>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  </>
);

export const SkillsPanel: React.FC = () => (
  <>
    <PanelHeader eyebrow="Compétences" title="Ma stack" />
    <p className="panel-lead">
      {allSkills.length} technologies, chacune utilisée sur de vrais projets.
    </p>
    {skillCategories.map((category) => (
      <section key={category.id} className="panel-skillgroup">
        <h3>{category.label}</h3>
        <p>{category.description}</p>
        <ul className="panel-chips">
          {category.skills.map((skill) => {
            const count = projets.filter((projet) => projet.technologies.includes(skill)).length;
            return (
              <li key={skill}>
                {skill}
                {count > 0 && <small>{count}</small>}
              </li>
            );
          })}
        </ul>
      </section>
    ))}
  </>
);

export const AboutPanel: React.FC = () => {
  const years = new Date().getFullYear() - profile.debutPro;
  return (
    <>
      <PanelHeader eyebrow="À propos" title={profile.nom} />
      <p className="panel-lead">
        {profile.titre} basé à {profile.ville}. Aujourd'hui en CDI chez GATS, je conçois et fais évoluer des produits web et mobiles, de l'interface React jusqu'à l'API Node.js.
      </p>
      <div className="panel-stats">
        <div>
          <strong>{years}+</strong>
          <span>années</span>
        </div>
        <div>
          <strong>{projets.length}</strong>
          <span>projets</span>
        </div>
        <div>
          <strong>{allSkills.length}</strong>
          <span>technos</span>
        </div>
      </div>
      <h3 className="panel-subtitle">Ma façon de travailler</h3>
      <ol className="panel-steps">
        <li>
          <strong>Comprendre le besoin</strong> avant d'écrire du code : public, contraintes, objectif.
        </li>
        <li>
          <strong>Prototyper vite</strong> une interface testable, puis itérer.
        </li>
        <li>
          <strong>Construire proprement</strong> une base maintenable, du frontend à l'API.
        </li>
      </ol>
      {profile.cv && (
        <a className="panel-button" href={profile.cv} download>
          Télécharger mon CV
        </a>
      )}
    </>
  );
};

export const ContactPanel: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const { contact } = profile;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      // Chargé à l'envoi seulement : inutile de l'embarquer pour tous les visiteurs.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey);
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <PanelHeader eyebrow="Contact" title="Un projet ? Parlons-en." />
      <p className="panel-lead">{profile.disponibilite}</p>

      <div className="panel-contact">
        <button type="button" onClick={copyEmail}>
          <FaEnvelope size={14} />
          <span>{contact.email}</span>
          {copied ? <FaCheck size={12} aria-label="Copié" /> : <FaCopy size={12} aria-label="Copier" />}
        </button>
        {contact.telephone && (
          <a href={`https://wa.me/${contact.telephone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
            <FaWhatsapp size={14} />
            <span>WhatsApp</span>
          </a>
        )}
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          <FaLinkedin size={14} />
          <span>LinkedIn</span>
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer">
          <FaGithub size={14} />
          <span>GitHub</span>
        </a>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="panel-form">
        <label>
          Nom
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Message
          <textarea name="message" required rows={4} />
        </label>
        <input type="hidden" name="subject" value="Message depuis le portfolio" />
        <button type="submit" className="panel-button" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer"}
        </button>
        {status === "sent" && <p role="status">Message envoyé, je reviens vers vous rapidement.</p>}
        {status === "error" && (
          <p role="status" className="is-error">
            Échec de l'envoi. Écrivez-moi directement à {contact.email}.
          </p>
        )}
      </form>
    </>
  );
};

/* ------------------------------------------------------------------ */

const PanelHeader: React.FC<{ eyebrow: string; title: string }> = ({ eyebrow, title }) => (
  <header className="panel-header">
    <p className="panel-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
  </header>
);

export const PanelContent: React.FC<{ station: StationId; onPreview?: (projet: Projet) => void }> = ({
  station,
  onPreview,
}) => {
  switch (station) {
    case "work":
      return <WorkPanel onPreview={onPreview} />;
    case "mobile":
      return <MobilePanel />;
    case "path":
      return <PathPanel />;
    case "skills":
      return <SkillsPanel />;
    case "about":
      return <AboutPanel />;
    case "contact":
      return <ContactPanel />;
  }
};
