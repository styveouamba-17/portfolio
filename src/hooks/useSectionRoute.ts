import { useCallback, useEffect, useState } from "react";
import { sections } from "../data/sections";
import type { SectionId } from "../types";

/** "intro" : écran d'accueil, "hub" : carte ouverte, sinon une section. */
export type View = "intro" | "hub" | SectionId;

const HUB_HASH = "carte";

function viewFromHash(): View {
  const hash = window.location.hash.replace("#", "");
  if (hash === HUB_HASH) return "hub";
  return sections.find((section) => section.hash === hash)?.id ?? "intro";
}

function hashFromView(view: View): string {
  if (view === "intro") return "";
  if (view === "hub") return HUB_HASH;
  return sections.find((section) => section.id === view)!.hash;
}

/**
 * Synchronise la vue courante avec l'ancre de l'URL : chaque section a un lien
 * partageable, le bouton retour du navigateur fonctionne et Échap ramène à la carte.
 */
export function useSectionRoute() {
  const [view, setView] = useState<View>(viewFromHash);

  const navigate = useCallback((next: View, options: { replace?: boolean } = {}) => {
    const hash = hashFromView(next);
    const url = hash ? `#${hash}` : window.location.pathname + window.location.search;
    if (options.replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
    setView(next);
  }, []);

  useEffect(() => {
    const sync = () => setView(viewFromHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && view !== "intro" && view !== "hub") navigate("hub");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, navigate]);

  return { view, navigate };
}
