import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";

/** "Scroll to drive →" cue that fades after the first scroll/interaction. */
export function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    window.addEventListener("scroll", hide, { once: true, passive: true });
    window.addEventListener("wheel", hide, { once: true, passive: true });
    window.addEventListener("touchstart", hide, { once: true, passive: true });
    const t = window.setTimeout(hide, 6000);
    return () => {
      window.removeEventListener("scroll", hide);
      window.removeEventListener("wheel", hide);
      window.removeEventListener("touchstart", hide);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 left-1/2 z-30 hidden lg:flex -translate-x-1/2 items-center gap-2 border border-line bg-paper px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Scroll to drive
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <MoveRight size={14} className="text-red" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
