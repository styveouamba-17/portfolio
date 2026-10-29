import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/**
 * Décalage léger qui suit la souris. Renvoie des MotionValues à passer en `style`
 * et le handler à brancher sur `onPointerMove`. Désactivé si l'utilisateur
 * a demandé moins d'animations.
 */
export function useParallax(amountX = 14, amountY = 10) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useTransform(mouseX, [-0.5, 0.5], [-amountX, amountX]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-amountY, amountY]);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return { x, y, onPointerMove };
}
