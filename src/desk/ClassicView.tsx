import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaCube, FaDownload, FaLocationDot, FaMoon, FaSun } from "react-icons/fa6";
import { profile } from "../data/profile";
import { projectCategories, projets } from "../data/projects";
import { allSkills } from "../data/skills";
import type { ProjectCategoryId, Projet } from "../types";
import { AboutPanel, ContactPanel, PathPanel, ProjectLinks, SkillsPanel } from "./Panels";

interface ClassicViewProps {
  night: boolean;
  onToggleNight: () => void;
  /** Absent quand le navigateur ne gère pas la 3D. */
  onOpenDesk?: () => void;
}

const navItems = [
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "a-propos", label: "À propos" },
  { id: "contact", label: "Contact" },
];

const anchor = (id: string) => `classique-${id}`;

const featured = projets.filter((projet) => projet.aLaUne);
const others = projets.filter((projet) => !projet.aLaUne);

const categoryLabel = (projet: Projet) =>
  projectCategories.find((category) => category.id === projet.categorie)?.label ?? "";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 0.9, 0.2, 1] as const },
};

/** Grand format pour un projet à la une, image à gauche ou à droite. */
const FeaturedProject: React.FC<{ projet: Projet; reversed: boolean }> = ({ projet, reversed }) => (
  <motion.article className={`classic-featured ${reversed ? "is-reversed" : ""}`} {...reveal}>
    <figure>
      <img src={`/images/${projet.image}`} alt={`Aperçu de ${projet.titre}`} loading="lazy" />
    </figure>
    <div>
      <p className="panel-eyebrow">
        {categoryLabel(projet)}
        <em>À la une</em>
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
    </div>
  </motion.article>
);

const ProjectCard: React.FC<{ projet: Projet }> = ({ projet }) => (
  <motion.article className="classic-card" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <figure>
      <img src={`/images/${projet.image}`} alt={`Aperçu de ${projet.titre}`} loading="lazy" />
    </figure>
    <div>
      <p className="panel-eyebrow">{categoryLabel(projet)}</p>
      <h4>{projet.titre}</h4>
      <p>{projet.description}</p>
      <ProjectLinks projet={projet} />
    </div>
  </motion.article>
);

const ClassicView: React.FC<ClassicViewProps> = ({ night, onToggleNight, onOpenDesk }) => {
  const [filter, setFilter] = useState<ProjectCategoryId | "tous">("tous");
  const visible = filter === "tous" ? others : others.filter((projet) => projet.categorie === filter);
  const years = new Date().getFullYear() - profile.debutPro;

  return (
    <div className="classic">
      <header className="classic-nav">
        <a href={`#${anchor("haut")}`} className="classic-logo">
          {profile.nom}
        </a>
        <nav aria-label="Sections">
          {navItems.map((item) => (
            <a key={item.id} href={`#${anchor(item.id)}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="classic-nav-tools">
          <button type="button" onClick={onToggleNight} aria-label={night ? "Passer en mode jour" : "Passer en mode nuit"}>
            {night ? <FaSun size={13} /> : <FaMoon size={13} />}
          </button>
          {onOpenDesk && (
            <button type="button" onClick={onOpenDesk}>
              <FaCube size={12} />
              <span>Bureau 3D</span>
            </button>
          )}
        </div>
      </header>

      <main className="classic-main">
        <section id={anchor("haut")} className="classic-hero">
          <motion.p className="classic-status" {...reveal}>
            <span />
            Disponible · <FaLocationDot size={11} /> {profile.ville}, {profile.pays}
          </motion.p>
          <motion.h1 {...reveal}>{profile.nom}</motion.h1>
          <motion.p className="classic-title" {...reveal}>
            {profile.titre}
          </motion.p>
          <motion.p className="classic-lead" {...reveal}>
            {profile.accroche}
          </motion.p>
          <motion.div className="classic-actions" {...reveal}>
            <a href={`#${anchor("projets")}`} className="panel-button">
              Voir mes projets <FaArrowRight size={12} />
            </a>
            <a href={`#${anchor("contact")}`} className="classic-ghost">
              Me contacter
            </a>
            {profile.cv && (
              <a href={profile.cv} download className="classic-ghost">
                <FaDownload size={12} /> CV
              </a>
            )}
          </motion.div>
          <motion.dl className="classic-stats" {...reveal}>
            <div>
              <dt>Années d'expérience</dt>
              <dd>{years}+</dd>
            </div>
            <div>
              <dt>Projets livrés</dt>
              <dd>{projets.length}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{allSkills.length}</dd>
            </div>
          </motion.dl>
        </section>

        <section id={anchor("projets")} className="classic-section">
          <header className="panel-header">
            <p className="panel-eyebrow">Projets</p>
            <h2>À la une</h2>
          </header>
          <div className="classic-featured-list">
            {featured.map((projet, index) => (
              <FeaturedProject key={projet.id} projet={projet} reversed={index % 2 === 1} />
            ))}
          </div>

          <div className="classic-all">
            <h3>Autres projets</h3>
            <div className="classic-filters" role="group" aria-label="Filtrer les projets">
              {[{ id: "tous" as const, label: "Tous" }, ...projectCategories.filter((category) => others.some((projet) => projet.categorie === category.id))].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={filter === category.id}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div className="classic-grid" layout>
            {visible.map((projet) => (
              <ProjectCard key={projet.id} projet={projet} />
            ))}
          </motion.div>
        </section>

        <section id={anchor("parcours")} className="classic-section">
          <PathPanel />
        </section>

        <section id={anchor("competences")} className="classic-section classic-skills">
          <SkillsPanel />
        </section>

        <section id={anchor("a-propos")} className="classic-section classic-about">
          <AboutPanel />
        </section>

        <section id={anchor("contact")} className="classic-section classic-contact">
          <ContactPanel />
        </section>
      </main>

      <footer className="classic-footer">
        <p>
          © {new Date().getFullYear()} {profile.nom} · {profile.ville}
        </p>
        <a href={`#${anchor("haut")}`}>Haut de page ↑</a>
      </footer>
    </div>
  );
};

export default ClassicView;
