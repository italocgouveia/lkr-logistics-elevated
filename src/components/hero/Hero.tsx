import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { CTAButtons } from "./CTAButtons";
import { AnimatedTruck } from "./AnimatedTruck";

const HERO_STATS = [
  { value: "500+", label: "Clientes atendidos" },
  { value: "99%", label: "Entregas no prazo" },
  { value: "27", label: "Estados atendidos" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 30]); // backdrop moves less than text — light parallax

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden bg-primary">
      {/* Full-bleed backdrop with a dark scrim, so white copy stays legible over the footage */}
      <AnimatedTruck parallaxY={bgY} />

      <div className="relative z-10 flex-1 flex items-center mx-auto max-w-[1440px] px-6 lg:px-10 pt-28 w-full">
        <motion.div style={{ y: textY }} className="max-w-3xl">
          <AnimatedTitle />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-[520px]"
          >
            Soluções completas em transporte e logística para empresas de todo o Brasil.
          </motion.p>

          <CTAButtons />
        </motion.div>
      </div>

      {/* Bottom stat bar — anchored to the footage, not a separate white block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-10 w-full pb-10 pt-8"
      >
        <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/15 pt-8">
          {HERO_STATS.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight"
                style={{ fontFamily: "var(--font-hero)", fontWeight: 400 }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-white/65">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
