import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { prefersReducedMotion } from "../lib/utils";

/**
 * Branded route transition: a red road-panel wipes across the screen while the
 * new page settles in. ~500ms, reduced to a quick fade under reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = prefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.35 }}
    >
      {!reduce && (
        <>
          {/* Red wipe sweeping left → right */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-[70] bg-red"
            initial={{ scaleX: 1, originX: 0 }}
            animate={{ scaleX: 0, originX: 1 }}
            exit={{ scaleX: 1, originX: 1 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* center road dashes on the wipe panel */}
            <div
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#FFFFFF 0 32px,transparent 32px 64px)",
              }}
            />
          </motion.div>
        </>
      )}
      {children}
    </motion.div>
  );
}
