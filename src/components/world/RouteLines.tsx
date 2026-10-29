import { motion, type MotionStyle } from "framer-motion";

interface RouteLinesProps {
  paths: string[];
  /** Classe appliquée à chaque tracé ; un tableau permet une classe par tracé. */
  pathClassName: string | string[];
  className?: string;
  style?: MotionStyle;
  /** Tracés dessinés (true) ou effacés (false). */
  visible?: boolean;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

/** Lignes de constellation qui se dessinent progressivement. */
const RouteLines: React.FC<RouteLinesProps> = ({
  paths,
  pathClassName,
  className,
  style,
  visible = true,
  opacity = 1,
  duration = 0.85,
  delay = 0.15,
  stagger = 0.1,
}) => (
  <motion.svg
    className={className}
    style={style}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {paths.map((d, index) => (
      <motion.path
        key={d}
        className={Array.isArray(pathClassName) ? pathClassName[index] : pathClassName}
        pathLength={1}
        d={d}
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: visible ? 0 : 1, opacity }}
        transition={{ duration, delay: delay + index * stagger, ease: [0.22, 0.9, 0.2, 1] }}
      />
    ))}
  </motion.svg>
);

export default RouteLines;
