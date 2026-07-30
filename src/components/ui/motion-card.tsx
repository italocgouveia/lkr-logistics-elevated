import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * MotionCard — "caixa animada" com Motion (motion/react).
 * Entrada ao aparecer na viewport: fadeUp + blur + scale (spring physics).
 * Hover: leve elevação + escala com spring.
 */
export function MotionCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
