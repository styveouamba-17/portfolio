import { useCallback, useEffect, useState } from "react";

interface Route<T extends string> {
  id: T;
  hash: string;
}

/**
 * Synchronise une vue avec l'ancre de l'URL : chaque vue a un lien partageable,
 * le bouton retour du navigateur fonctionne et Échap revient à la vue d'ensemble (null).
 */
export function useHashRoute<T extends string>(routes: Route<T>[]) {
  const fromHash = useCallback((): T | null => {
    const hash = window.location.hash.replace("#", "");
    return routes.find((route) => route.hash === hash)?.id ?? null;
  }, [routes]);

  const [current, setCurrent] = useState<T | null>(fromHash);

  const navigate = useCallback(
    (next: T | null) => {
      const hash = next ? routes.find((route) => route.id === next)!.hash : "";
      const url = hash ? `#${hash}` : window.location.pathname + window.location.search;
      window.history.pushState(null, "", url);
      setCurrent(next);
    },
    [routes],
  );

  useEffect(() => {
    const sync = () => setCurrent(fromHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [fromHash]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && current) navigate(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, navigate]);

  return { current, navigate };
}
