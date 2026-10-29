import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

/** Écran de chargement affiché tant que les textures de la scène arrivent. */
const Loader: React.FC = () => {
  const { active, progress } = useProgress();

  return (
    <AnimatePresence>
      {(active || progress < 100) && (
        <motion.div
          className="desk-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="status"
        >
          <p>Installation du bureau…</p>
          <div className="desk-loader-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
