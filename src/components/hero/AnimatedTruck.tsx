import { motion, type MotionValue } from "motion/react";

/**
 * Full-bleed backdrop for the whole Hero — plays the graded reference clip
 * once on load (camera push-in, headlight ignition, swoosh orbit — all real
 * motion, watermark cropped) and holds on the final frame. No loop: a
 * one-time entrance, not an idle ambient loop.
 *
 * A dark scrim sits over the footage so white copy stays legible at every
 * breakpoint — the same treatment on mobile as desktop, just re-centered.
 */
interface AnimatedTruckProps {
  parallaxY?: MotionValue<number>;
}

export function AnimatedTruck({ parallaxY }: AnimatedTruckProps) {
  return (
    <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "64% 45%" }}
        autoPlay
        muted
        playsInline
        poster="/hero-truck-once-poster.jpg"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        aria-label="Caminhão LKR Serviços em movimento"
      >
        <source src="/hero-truck-once.webm" type="video/webm" />
        <source src="/hero-truck-once.mp4" type="video/mp4" />
      </motion.video>

      {/* Dark scrim — vertical read (top/bottom) + a stronger left-side pool behind the copy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.1 268 / 0.55) 0%, oklch(0.18 0.11 268 / 0.25) 45%, oklch(0.14 0.09 268 / 0.65) 100%), linear-gradient(100deg, oklch(0.14 0.09 268 / 0.8) 0%, oklch(0.16 0.1 268 / 0.5) 40%, oklch(0.18 0.11 268 / 0.18) 65%, transparent 85%)",
        }}
      />
    </motion.div>
  );
}
