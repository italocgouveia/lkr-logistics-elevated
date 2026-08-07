import { motion, type Variants } from "framer-motion";

const LINES: { text: string; accent?: boolean }[] = [
  { text: "Transportando seu" },
  { text: "negócio com" },
  { text: "segurança e", accent: true },
  { text: "eficiência.", accent: true },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" },
  }),
};

/** Four-line staggered headline: white lines first, red lines follow. */
export function AnimatedTitle() {
  return (
    <h1
      className="text-white leading-[0.98] tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(10,15,60,0.35)]"
      style={{
        fontFamily: "var(--font-hero)",
        fontWeight: 400,
        // Fluid so the widest line ("Transportando seu") never wraps mid-phrase.
        fontSize: "clamp(1.9rem, 5.5vw, 4.25rem)",
      }}
    >
      {LINES.map((line, i) => (
        <motion.span
          key={line.text}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className={`block ${line.accent ? "text-accent" : ""}`}
        >
          {line.text}
        </motion.span>
      ))}
    </h1>
  );
}
