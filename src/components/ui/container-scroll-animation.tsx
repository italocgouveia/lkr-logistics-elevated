import React, { useEffect, useRef, useState } from "react";

/**
 * ContainerScroll — versão nativa (sem framer-motion).
 * Reproduz o efeito da Aceternity UI (rotateX/scale/translateY conforme o
 * scroll) usando um listener de scroll + CSS transforms, mantendo a mesma API:
 *   <ContainerScroll titleComponent={...}>{children}</ContainerScroll>
 */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Progresso 0→1 do elemento atravessando a viewport (equivale ao
 * useScroll({ target }) do framer-motion com offset ["start end", "end start"]). */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [progress, setProgress] = useState(enabled ? 0 : 1);
  useEffect(() => {
    if (!enabled) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const p = (vh - rect.top) / (vh + rect.height);
        setProgress(clamp(p));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
  return progress;
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress(containerRef, !reduced);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = lerp(20, 0, progress);
  const scale = isMobile ? lerp(0.7, 0.9, progress) : lerp(1.05, 1, progress);
  const translate = lerp(0, -100, progress);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: number;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <div
      style={{ transform: `translateY(${translate}px)`, willChange: "transform" }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: number;
  scale: number;
  translate?: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        transform: `rotateX(${rotate}deg) scale(${scale})`,
        willChange: "transform",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </div>
  );
};
