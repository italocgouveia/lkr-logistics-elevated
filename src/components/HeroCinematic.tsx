import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, Sparkles, Calendar, MapPin, ShieldCheck, Clock } from "lucide-react";
import heroImg from "@/assets/hero-caminhao.jpg";
import planeImg from "@/assets/aviao-lkr.png";
import { MagneticButton } from "@/components/ui/magnetic-button";

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

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const LINE_1 = ["Do", "céu", "à", "estrada."];
const LINE_2 = ["Sua", "carga", "no", "destino."];
const WORD_STEP = 0.11;
const WORD_BASE = 0.25;

const STATS = [
  { icon: Calendar, label: "Desde 1994" },
  { icon: MapPin, label: "Rastreamento" },
  { icon: ShieldCheck, label: "Transporte Seguro" },
  { icon: Clock, label: "Entrega no Prazo" },
];

export function HeroCinematic() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const cloudsParallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const planeOuterRef = useRef<HTMLDivElement>(null);
  const planeInnerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax multicamadas + fade do conteúdo (scroll nativo, sem re-render)
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const apply = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 1;
      const p = Math.min(y / vh, 1);
      // Parallax só no fundo/nuvens — o conteúdo permanece nítido e visível ao rolar
      if (bgParallaxRef.current) bgParallaxRef.current.style.transform = `translate3d(0, ${p * 12}%, 0)`;
      if (cloudsParallaxRef.current) cloudsParallaxRef.current.style.transform = `translate3d(0, ${p * 6}%, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Avião: voo em loop (RAF) + resposta ao scroll (acelera + inclina o nariz)
  useEffect(() => {
    if (reduced) return;
    const outer = planeOuterRef.current;
    const inner = planeInnerRef.current;
    if (!outer || !inner) return;

    const CYCLE = 22000; // ms para atravessar
    const WAIT = 3500; // ms fora de cena antes de reaparecer
    let progress = 0;
    let waiting = 0;
    let boost = 0; // aceleração extra (decai)
    let tilt = 0; // inclinação do nariz (decai)
    let last = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      const k = Math.min(dt / 400, 1);
      boost += (0 - boost) * k;
      tilt += (0 - tilt) * k;

      if (waiting > 0) {
        waiting -= dt;
      } else {
        progress += (dt / CYCLE) * (1 + boost);
        if (progress >= 1) {
          progress = 0;
          waiting = WAIT;
        }
      }
      const x = -150 + 300 * progress; // -150% (fora à esquerda) → 150% (fora à direita)
      outer.style.transform = `translate3d(${x}%, 0, 0) rotate(${5 + tilt}deg)`;
      inner.style.transform = `translate3d(0, ${Math.sin(now / 1200) * 12}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(now - lastT, 1);
      lastY = window.scrollY;
      lastT = now;
      boost = Math.min(boost + Math.abs(dy / dt) * 2, 4);
      tilt = clamp(dy * 0.3, -12, 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  // Canvas: partículas de poeira iluminadas + contrail (rastro) do avião
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];
    const trail: { x: number; y: number; life: number }[] = [];

    const initParticles = () => {
      particles = Array.from({ length: 46 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -(Math.random() * 0.14 + 0.03),
        a: Math.random() * 0.4 + 0.1,
      }));
    };
    const resize = () => {
      const r = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 240, 210, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const plane = planeInnerRef.current;
      if (plane) {
        const pr = plane.getBoundingClientRect();
        const sr = section.getBoundingClientRect();
        const cx = pr.left - sr.left + pr.width * 0.18;
        const cy = pr.top - sr.top + pr.height * 0.5;
        if (cx > -20 && cx < w + 20) trail.push({ x: cx, y: cy, life: 1 });
      }
      for (const t of trail) t.life -= 0.006;
      while (trail.length && trail[0].life <= 0) trail.shift();
      if (trail.length > 60) trail.splice(0, trail.length - 60);
      ctx.lineCap = "round";
      for (let i = 1; i < trail.length; i++) {
        const life = trail[i].life;
        ctx.strokeStyle = `rgba(255, 255, 255, ${life * 0.5})`;
        ctx.lineWidth = life * 6;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Camada 2/5 — Céu + carreta (foto). Parallax + entrada (blur/scale/opacity) + Ken Burns */}
      <div ref={bgParallaxRef} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <div className="hero-bg-in absolute inset-0">
          <img
            src={heroImg}
            alt="Carreta LKR Serviços em rodovia ao pôr do sol com avião de carga cruzando o céu"
            className="hero-kenburns absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1280}
          />
        </div>
      </div>

      {/* Camada 3 — Nuvens / atmosfera em drift */}
      <div ref={cloudsParallaxRef} className="pointer-events-none absolute inset-0 will-change-transform">
        <div
          className="cloud-drift absolute -inset-x-[10%] top-0 h-1/2 opacity-60"
          style={{ background: "radial-gradient(60% 80% at 30% 20%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(50% 70% at 75% 10%, rgba(255,220,180,0.12), transparent 60%)" }}
        />
      </div>

      {/* SOL — glow + respiração */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="sun-breathe absolute h-[36rem] w-[36rem] rounded-full blur-2xl"
          style={{ left: "34%", top: "40%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,196,120,0.55) 0%, rgba(255,150,80,0.28) 35%, transparent 70%)" }}
        />
        <div
          className="sun-breathe absolute h-40 w-40 rounded-full blur-md"
          style={{ left: "34%", top: "40%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,255,240,0.8) 0%, rgba(255,220,170,0.3) 50%, transparent 75%)", animationDelay: "0.6s" }}
        />
      </div>

      {/* Camada 1 — Overlays escuros (gradiente esq→dir para leitura) */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,21,47,0.9) 0%, rgba(8,21,47,0.62) 38%, rgba(8,21,47,0.2) 66%, rgba(8,21,47,0) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,21,47,0.35) 0%, rgba(8,21,47,0) 30%, rgba(8,21,47,0.55) 100%)" }} />

      {/* Light sweep — reflexo passando na cabine (lado direito, a cada 8s) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <div className="light-sweep absolute inset-y-0 -left-1/3 w-1/3" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)", mixBlendMode: "screen" }} />
      </div>

      {/* Camada 4 — Avião LKR (PNG) + contrail/partículas (canvas) */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[6]" aria-hidden="true" />
      <div ref={planeOuterRef} className="pointer-events-none absolute top-[14%] left-0 z-[7] will-change-transform" style={{ transform: "translate3d(-150%,0,0) rotate(5deg)" }} aria-hidden="true">
        <div ref={planeInnerRef} className="will-change-transform" style={{ filter: "blur(0.4px) drop-shadow(0 16px 26px rgba(0,0,0,0.4))" }}>
          <img src={planeImg} alt="" className="w-40 lg:w-60 h-auto select-none" draggable={false} />
        </div>
      </div>

      {/* Camada 6 — Conteúdo */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16 w-full will-change-transform">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="anim-fade-down inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-white text-xs font-semibold tracking-wide mb-7">
              <Sparkles className="h-3.5 w-3.5 text-[#E31E24]" />
              Transportes &amp; Logística Integrada
            </div>

            {/* Título palavra por palavra (fade + blur + translateY, stagger) */}
            <h1 className="font-sans font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] leading-[1.02] tracking-tight">
              <span className="block">
                {LINE_1.map((word, i) => (
                  <span
                    key={i}
                    className={`anim-fade-up-blur inline-block mr-[0.25em] ${word === "céu" ? "hero-red-word" : ""}`}
                    style={{ animationDelay: `${WORD_BASE + i * WORD_STEP}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block">
                {LINE_2.map((word, i) => (
                  <span
                    key={i}
                    className="anim-fade-up-blur inline-block mr-[0.25em]"
                    style={{ animationDelay: `${WORD_BASE + (LINE_1.length + i) * WORD_STEP}s` }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            <p className="anim-slide-up mt-7 text-lg lg:text-xl font-medium text-white/85 max-w-xl leading-relaxed" style={{ animationDelay: "1.1s" }}>
              Experiência, segurança e compromisso para manter o seu negócio sempre em movimento.
            </p>

            <div className="anim-slide-up mt-9 flex flex-col sm:flex-row flex-wrap gap-4" style={{ animationDelay: "1.3s" }}>
              <MagneticButton href="#contato" className="hero-btn-primary group">
                Solicitar orçamento
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                href="https://wa.me/553432291736?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20LKR%20Servi%C3%A7os."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost group"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </MagneticButton>
            </div>

            {/* Barra de diferenciais (stagger) */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="hero-stat anim-slide-up rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 flex flex-col gap-2.5"
                  style={{ animationDelay: `${1.5 + i * 0.12}s` }}
                >
                  <div className="h-9 w-9 rounded-lg bg-[#E31E24]/90 grid place-items-center shrink-0">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white text-sm font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="h-8 w-[1px] bg-white/40 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3 bg-[#E31E24] animate-[float-y_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
