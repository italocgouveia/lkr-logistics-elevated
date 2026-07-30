import { useEffect } from "react";

/**
 * Microinterações premium globais (client-only, sem dependências):
 * - Ripple branco ao clicar em .btn-primary / .btn-outline
 * - Glow vermelho que segue o cursor quando passa sobre qualquer botão
 * (Os botões do hero — .hero-btn-* — já têm ripple/magnético via MagneticButton.)
 */
const RIPPLE_SELECTOR = ".btn-primary, .btn-outline";
const GLOW_SELECTOR = ".btn-primary, .btn-outline, .hero-btn-primary, .hero-btn-ghost, .btn-magnetic";

export function usePremiumButtons() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Ripple ----
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.(RIPPLE_SELECTOR) as HTMLElement | null;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple-el";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - r.left - size / 2}px`;
      ripple.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    };
    document.addEventListener("click", onClick);

    // ---- Cursor glow ----
    let glow: HTMLDivElement | null = null;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let over = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const isOver = !!(e.target as HTMLElement | null)?.closest?.(GLOW_SELECTOR);
      if (isOver !== over) {
        over = isOver;
        glow?.classList.toggle("cursor-glow-on", over);
      }
    };

    if (!reduce) {
      glow = document.createElement("div");
      glow.className = "cursor-glow";
      document.body.appendChild(glow);
      const loop = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        if (glow) glow.style.transform = `translate3d(${cx - 90}px, ${cy - 90}px, 0)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      glow?.remove();
    };
  }, []);
}
