import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { profile } from "../data/profile";
import { webProjects } from "../data/projects";
import { useHashRoute } from "../hooks/useHashRoute";
import ClassicView from "./ClassicView";
import { PanelContent } from "./Panels";
import { getStation, stations } from "./stations";

const DeskStage = lazy(() => import("./DeskStage"));

const webImages = webProjects.map((projet) => `/images/${projet.image}`);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const CLASSIC_PARAM = "classique";

/** Version classique si le navigateur ne gère pas la 3D, ou demandée via ?classique (lien à envoyer). */
function initialClassic() {
  return !supportsWebGL() || new URLSearchParams(window.location.search).has(CLASSIC_PARAM);
}

function setClassicParam(enabled: boolean) {
  const url = new URL(window.location.href);
  if (enabled) url.searchParams.set(CLASSIC_PARAM, "");
  else url.searchParams.delete(CLASSIC_PARAM);
  url.hash = "";
  window.history.replaceState(null, "", url.toString().replace(`${CLASSIC_PARAM}=`, CLASSIC_PARAM));
}

function initialNight() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

const DeskApp: React.FC = () => {
  const { current, navigate } = useHashRoute(stations);
  const reduceMotion = useReducedMotion() ?? false;
  const [night, setNight] = useState(initialNight);
  const [classic, setClassic] = useState(initialClassic);
  const [monitorIndex, setMonitorIndex] = useState(0);
  const [pinnedImage, setPinnedImage] = useState<string | null>(null);

  // En vue d'ensemble, l'écran fait défiler les projets web.
  useEffect(() => {
    if (current || reduceMotion) return;
    const timer = window.setInterval(() => setMonitorIndex((i) => (i + 1) % webImages.length), 3500);
    return () => window.clearInterval(timer);
  }, [current, reduceMotion]);

  useEffect(() => {
    // En ouvrant les projets, l'écran montre le premier de la liste, comme le panneau.
    setPinnedImage(current === "work" ? webImages[0] : null);
  }, [current]);

  function toggleClassic(enabled: boolean) {
    setClassicParam(enabled);
    setClassic(enabled);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    document.documentElement.dataset.theme = night ? "dark" : "light";
  }, [night]);

  const monitorImage = pinnedImage ?? webImages[monitorIndex];

  if (classic) {
    return (
      <ClassicView
        night={night}
        onToggleNight={() => setNight((value) => !value)}
        onOpenDesk={supportsWebGL() ? () => toggleClassic(false) : undefined}
      />
    );
  }

  return (
    <div className="desk-app">
      <Suspense
        fallback={
          <div className="desk-loader" role="status">
            <p>Installation du bureau…</p>
          </div>
        }
      >
        <DeskStage
          active={current}
          onSelect={navigate}
          onBackgroundClick={() => current && navigate(null)}
          night={night}
          monitorImage={monitorImage}
          reduceMotion={reduceMotion}
        />
      </Suspense>

      <header className="desk-brand">
        <h1>{profile.nom}</h1>
        <p>{profile.titre}</p>
      </header>

      <div className="desk-tools">
        <button type="button" onClick={() => setNight((value) => !value)} aria-label={night ? "Passer en mode jour" : "Passer en mode nuit"}>
          {night ? <FaSun size={14} /> : <FaMoon size={14} />}
        </button>
        <button type="button" onClick={() => toggleClassic(true)}>
          Version classique
        </button>
      </div>

      <AnimatePresence>
        {!current && (
          <motion.p
            className="desk-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            Cliquez sur un objet du bureau, ou choisissez une section ci-dessous.
          </motion.p>
        )}
      </AnimatePresence>

      <nav className="desk-dock" aria-label="Sections">
        {stations.map((station) => (
          <button
            key={station.id}
            type="button"
            aria-current={current === station.id ? "page" : undefined}
            onClick={() => navigate(current === station.id ? null : station.id)}
          >
            {station.label}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {current && (
          <motion.aside
            key={current}
            className="desk-panel"
            aria-label={getStation(current).label}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.35, delay: 0.25, ease: [0.22, 0.9, 0.2, 1] }}
          >
            <button type="button" className="desk-panel-close" onClick={() => navigate(null)} aria-label="Fermer (Échap)">
              <FaXmark size={16} />
            </button>
            <PanelContent
              station={current}
              onPreview={(projet) => setPinnedImage(`/images/${projet.image}`)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeskApp;
