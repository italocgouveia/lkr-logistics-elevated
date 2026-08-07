import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Truck, ShieldCheck, Clock, MapPin, Phone, Mail, MessageCircle,
  Package, Route as RouteIcon, Boxes, Warehouse, Send, LineChart,
  Users, Star, ArrowRight, CheckCircle2, Menu, X, Facebook, Instagram, Linkedin, Plane,
  ArrowUp,
} from "lucide-react";
import sedeImg from "@/assets/sede-lkr.jpg";
import { LkrLogo } from "../components/LkrLogo";
import { BorderBeamPanel } from "../components/ui/border-beam-panel";
import { Hero } from "../components/hero/Hero";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- Hooks ---------- */

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- Reveal wrapper ---------- */

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Data ---------- */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

const BRANDS = ["ANTT", "Omnilink", "Cadeia de Frio", "Cross Docking", "LKR Farma", "Transporte Aéreo", "Rastreamento", "Cobertura Nacional"];

/* ---------- Main ---------- */

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowTop(y > 600);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress bar */}
      <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 12px oklch(0.6 0.24 27 / 0.7)" }}
        />
      </div>

      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <BrandStrip />
      <About />
      <Services />
      <Medicamentos />
      <Differentiators />
      <Parceiros />
      <Process />
      <Rastreamento />
      <Stats />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/553432291736?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20LKR%20Servi%C3%A7os."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent grid place-items-center text-white shadow-lg animate-pulse-ring hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className={`fixed bottom-24 right-6 z-50 h-11 w-11 rounded-full bg-primary text-white grid place-items-center shadow-md transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary-dark/90 backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(10,15,60,0.5)] border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto max-w-[1440px] px-6 lg:px-10 grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* The wordmark is a white-on-transparent lockup, so it sits directly on the
            dark bar — no plate behind it. */}
        <a href="#home" className="flex items-center group" aria-label="LKR Serviços — início">
          <LkrLogo
            variant="full"
            className={`w-auto transition-all duration-500 group-hover:opacity-80 ${scrolled ? "h-8" : "h-10"}`}
          />
        </a>

        <nav className="hidden lg:flex items-center justify-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full text-white/85 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <a href="#contato" className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 !text-sm">
            Solicitar Orçamento
          </a>
          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden bg-primary-dark/95 backdrop-blur-xl border-t border-white/10 transition-[max-height,opacity] duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium py-2 text-white/85 hover:text-white transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)} className="btn-primary w-full">Solicitar Orçamento</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Brand strip ---------- */

function BrandStrip() {
  const items = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-border bg-surface py-8 overflow-hidden">
      <div className="mask-fade-x">
        <div className="flex gap-16 whitespace-nowrap animate-marquee w-max">
          {items.map((b, i) => (
            <div key={i} className="text-primary/60 font-display font-extrabold text-2xl tracking-tight hover:text-primary transition-colors">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  const stats = [
    { v: "1994", l: "no mercado desde" },
    { v: "+21", l: "anos em cargas aéreas" },
    { v: "+15", l: "anos como gerente de cargas" },
    { v: "BR", l: "cobertura nacional" },
  ];
  return (
    <section id="sobre" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-2xl bg-accent/10 animate-float" />
            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl animate-float" style={{ background: "var(--gradient-primary)", opacity: 0.12, animationDelay: "1s" }} />
            <img
              src={sedeImg}
              alt="Sede da LKR Serviços em Uberlândia - MG"
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-lg border border-border px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Credenciada</div>
                <div className="font-bold text-primary text-sm">ANTT · Omnilink</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Sobre a LKR</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
            Experiência que conhece o caminho.<br />Compromisso que faz a carga chegar.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A LKR Serviços iniciou suas atividades em 1994, prestando serviços de distribuição e entregas
              para empresas de transporte de cargas. Há mais de três décadas, construímos uma trajetória
              marcada por experiência, responsabilidade e dedicação em cada operação.
            </p>
            <p>
              Nossa história nasceu de uma sólida experiência no segmento de cargas aéreas, adquirida em
              empresas reconhecidas como Varig e TAM Cargo. São mais de 21 anos de atuação nesse mercado,
              incluindo 15 anos na função de gerente de cargas. Esse conhecimento se tornou a base para
              compreender profundamente os desafios das transportadoras e oferecer soluções seguras, ágeis
              e eficientes.
            </p>
            <p>
              Hoje, utilizamos toda essa experiência para atender transportadoras e operadores logísticos
              de diferentes regiões do território nacional. Trabalhamos como uma verdadeira extensão da
              operação de nossos clientes, cuidando de cada encomenda com atenção, transparência e
              compromisso com os prazos.
            </p>
            <p>
              Investimos continuamente em tecnologia, rastreamento, processos operacionais e qualificação
              da nossa equipe. Nosso objetivo é oferecer confiança em todas as etapas, desde a coleta até a
              entrega no destino final.
            </p>
            <p>
              Mais do que transportar cargas, ajudamos empresas a manter seus compromissos e seus negócios
              em movimento.
            </p>
          </div>
          <p className="mt-6 border-l-4 border-accent pl-4 text-primary font-semibold italic">
            LKR Serviços — experiência que gera confiança, logística que entrega resultados.
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 80}>
            <div className="rounded-xl border border-border bg-card p-5 card-hover text-center">
              <div className="text-3xl font-extrabold text-primary font-display">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

function Services() {
  const items = [
    { icon: Truck, t: "Transporte Rodoviário", d: "Cobertura nacional com frota moderna e monitorada." },
    { icon: RouteIcon, t: "Logística Integrada", d: "Planejamento ponta a ponta para sua operação." },
    { icon: Send, t: "Distribuição", d: "Entregas capilarizadas em todo o território." },
    { icon: Clock, t: "Coletas Programadas", d: "Roteiros recorrentes com pontualidade garantida." },
    { icon: Boxes, t: "Transporte Fracionado", d: "Otimização de custos para cargas menores." },
    { icon: Package, t: "Transporte Dedicado", d: "Frota exclusiva para sua empresa." },
    { icon: Plane, t: "Transporte Aéreo", d: "Cargas expressas com agilidade para todo o Brasil." },
    { icon: Warehouse, t: "Armazenagem", d: "Estrutura segura para estocagem e preparação." },
    { icon: LineChart, t: "Gestão Logística", d: "Indicadores e tecnologia para decisões melhores." },
  ];
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-surface relative">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Nossos Serviços</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
              Soluções logísticas completas
            </h2>
            <p className="mt-4 text-muted-foreground">
              Uma linha de serviços desenhada para acompanhar cada etapa da sua cadeia de suprimentos.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <a
                href="#contato"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card border border-border p-7 tilt-card hover:border-accent/40"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                <div
                  className="relative h-14 w-14 rounded-2xl grid place-items-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="relative mt-6 font-bold text-xl text-primary">{s.t}</h3>
                <p className="relative mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="relative mt-6 inline-flex items-center gap-2 text-accent text-sm font-semibold">
                  Solicitar orçamento
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Differentiators ---------- */

function Differentiators() {
  const items = [
    { icon: Truck, t: "Frota moderna" },
    { icon: LineChart, t: "Monitoramento em tempo real" },
    { icon: Users, t: "Equipe especializada" },
    { icon: MessageCircle, t: "Atendimento personalizado" },
    { icon: Clock, t: "Pontualidade" },
    { icon: ShieldCheck, t: "Segurança da carga" },
    { icon: MapPin, t: "Cobertura nacional" },
    { icon: Boxes, t: "Tecnologia logística" },
  ];
  return (
    <section id="diferenciais" className="py-24 lg:py-32 relative overflow-hidden text-white" style={{ background: "var(--gradient-primary)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Diferenciais</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold">
              Por que empresas escolhem a LKR
            </h2>
            <p className="mt-4 text-white/75">
              Um padrão de operação pensado para eliminar surpresas e entregar performance.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((i, k) => (
            <Reveal key={i.t} delay={k * 60}>
              <div className="group rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:-translate-y-1.5 hover:border-white/30 transition-all h-full">
                <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <i.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 font-semibold">{i.t}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Medicamentos ---------- */

function Medicamentos() {
  const cards = [
    { icon: Users, t: "Operação com excelência", d: "Equipe seguindo rigorosos padrões de qualidade, garantindo a integridade da carga em todas as etapas." },
    { icon: Truck, t: "Serviços para cada necessidade", d: "Convencional, Expresso, Dedicado e Imediato, com veículos rastreados e monitorados em tempo real." },
    { icon: Clock, t: "Veículos dedicados 24 horas", d: "Disponíveis para operações exclusivas, coletas emergenciais e entregas críticas." },
    { icon: ShieldCheck, t: "Compromisso que faz a diferença", d: "Transportamos responsabilidade e confiança, dentro dos mais altos padrões do setor farmacêutico." },
  ];
  return (
    <section id="medicamentos" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-[45%]">
          <Reveal>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">LKR Farma</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold text-primary leading-tight">
              Transporte Especializado de Medicamentos
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A LKR é especializada no transporte de medicamentos, produtos para a saúde e cargas sensíveis,
              oferecendo soluções logísticas seguras, ágeis e confiáveis para atender às exigências da
              indústria farmacêutica.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {cards.map((c, i) => (
              <Reveal key={c.t} delay={100 + i * 80}>
                <div className="flex gap-4 rounded-2xl bg-card border border-border p-5 card-hover">
                  <div className="h-11 w-11 shrink-0 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{c.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[55%]">
          <Reveal delay={150}>
            <BorderBeamPanel
              radius={24}
              beams={2}
              colors={["#4f7cff", "#38bdf8"]}
              thickness={4}
              glow
              className="p-0 border-[3px] border-[#3b6cff]/70 overflow-hidden bg-white shadow-2xl"
            >
              <img
                src="/arte/transportes.jpg"
                alt="Avião e van da LKR para transporte de medicamentos"
                loading="lazy"
                className="w-full block"
              />
            </BorderBeamPanel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Parceiros ---------- */

function Parceiros() {
  const premium = [
    { icon: Plane, t: "Transporte Aéreo", d: "Agilidade e segurança que conectam todo o Brasil." },
    { icon: Truck, t: "Entregas Rodoviárias", d: "Eficiência e pontualidade em cada entrega." },
  ];
  const mini = [
    { icon: MapPin, t: "Base própria", d: "Uberlândia - MG" },
    { icon: Users, t: "Parceiros estratégicos", d: "Rede em todo o país" },
    { icon: ShieldCheck, t: "Cobertura nacional", d: "Segurança em cada etapa" },
    { icon: Clock, t: "Agilidade", d: "Que sua operação precisa" },
  ];
  return (
    <section id="parceiros" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Área de Atuação</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
              Parceiros em todo o Brasil
            </h2>
            <p className="mt-4 text-muted-foreground">
              Parceiros estratégicos que fazem a diferença para garantir agilidade, segurança e cobertura nacional.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <BorderBeamPanel
              radius={24}
              beams={2}
              colors={["#4f7cff", "#38bdf8"]}
              thickness={4}
              glow
              className="p-0 border-[3px] border-[#3b6cff]/70 overflow-hidden bg-white shadow-lg"
            >
              <img
                src="/arte/parceiros.jpg"
                alt="Parceiros da LKR em todo o Brasil"
                loading="lazy"
                className="w-full block"
              />
            </BorderBeamPanel>
          </Reveal>

          <div>
            <div className="grid sm:grid-cols-2 gap-5">
              {premium.map((p, i) => (
                <Reveal key={p.t} delay={100 + i * 90}>
                  <div className="h-full rounded-2xl p-6 text-white shadow-lg card-hover" style={{ background: "var(--gradient-primary)" }}>
                    <div className="h-12 w-12 rounded-xl bg-white/15 grid place-items-center">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-bold text-lg">{p.t}</h3>
                    <p className="mt-1 text-sm text-white/80">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {mini.map((m, i) => (
                <Reveal key={m.t} delay={200 + i * 70}>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 card-hover">
                    <div className="h-9 w-9 shrink-0 rounded-lg grid place-items-center bg-accent/10">
                      <m.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-primary">{m.t}</div>
                      <div className="text-xs text-muted-foreground">{m.d}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={150}>
          <div className="mt-10 rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(120deg, oklch(0.22 0.15 268), oklch(0.32 0.19 268))" }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-6 py-5 text-white text-center">
              <div className="flex items-center gap-2 font-bold shrink-0">
                <Send className="h-5 w-5 text-accent" /> Distribuição em:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> Uberlândia - MG · Triângulo Mineiro</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> Catalão - GO</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent" /> Itumbiara - GO</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Rastreamento ---------- */

function Rastreamento() {
  const features = [
    "Rastreamento em tempo real",
    "Segurança da carga",
    "Atualizações automáticas",
    "Atendimento 24 horas",
  ];
  return (
    <section id="rastreamento" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="pointer-events-none absolute -top-40 left-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-float" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/arte/rastreamento.jpg"
              alt="Rastreamento de carga da LKR em tempo real"
              loading="lazy"
              className="w-full block"
            />
            {/* Vignette que funde as bordas da imagem no azul da seção */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: "inset 0 0 60px 14px oklch(0.24 0.16 268 / 0.85)" }}
            />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Rastreamento</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Acompanhe sua carga em tempo real
          </h2>
          <p className="mt-4 text-white/80 leading-relaxed max-w-lg">
            Tecnologia e segurança para você acompanhar sua carga em tempo real, com total transparência e confiabilidade.
          </p>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://wa.me/553432291736?text=Ol%C3%A1!%20Gostaria%20de%20rastrear%20minha%20carga%20com%20a%20LKR%20Servi%C3%A7os."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-accent text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            Rastrear Agora <ArrowRight className="h-5 w-5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

function Process() {
  const steps = ["Solicitação", "Planejamento", "Coleta", "Transporte", "Entrega", "Confirmação"];
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Como Trabalhamos</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
              Um processo claro do início ao fim
            </h2>
          </div>
        </Reveal>

        <div ref={ref} className="mt-16 relative">
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-[2px] bg-border" />
          {inView && (
            <div
              className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-primary via-accent to-primary animate-progress"
            />
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative h-16 w-16 rounded-full bg-card border-2 border-primary grid place-items-center shadow-sm hover:scale-110 hover:border-accent transition-all">
                    <span className="text-primary font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-4 font-semibold text-primary">{s}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function StatCounter({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const value = useCountUp(target, start);
  const display = target >= 1000 ? value.toLocaleString("pt-BR") : value;
  return (
    <div className="text-center">
      <div className="text-5xl lg:text-6xl font-extrabold text-white font-display">
        {display}{suffix}
      </div>
      <div className="mt-2 text-white/70 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, oklch(0.18 0.12 268), oklch(0.26 0.16 268))" }}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-primary/40 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCounter target={500} suffix="+" label="Clientes" start={inView} />
        <StatCounter target={100000} suffix="+" label="Entregas" start={inView} />
        <StatCounter target={27} suffix="" label="Estados atendidos" start={inView} />
        <StatCounter target={99} suffix="%" label="Entregas no prazo" start={inView} />
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  const items = [
    { n: "Daniela Moreira", r: "Avaliação no Google", t: "Melhor transportadora de Uberlândia, entregas dentro do prazo. Eficiência e um excelente atendimento" },
    { n: "fred neves", r: "Avaliação no Google", t: "Melhor transportadora da cidade eficiência rapidez é um ótimo atendimento ao cliente recomendo" },
    { n: "Rafael Santos", r: "Avaliação no Google", t: "uma empresa muito seria e comprometida com os prazo e informações.. top..demais" },
    { n: "Alessandra Mendes Klovrva", r: "Local Guide no Google", t: "Empresa séria, organizada e que cuida de tudo dos clientes" },
    { n: "Wagner Borges de Souza", r: "Avaliação no Google", t: "De uma responsabilidade e um comprometimento 100% positivo" },
    { n: "Dagmarjordao Vargas", r: "Avaliação no Google", t: "Empresa eficiente, atende com muita presteza e agilidade." },
    { n: "Sávio olimpio", r: "Local Guide no Google", t: "Bom atendimento e entrega rápida" },
    { n: "Fernando Queiroz", r: "Local Guide no Google", t: "Pessoal atende bem, são bem profissionais." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Depoimentos</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
              Quem confia na LKR
            </h2>
            <a
              href="https://www.google.com/maps/place/LKR+Servi%C3%A7os+Transportes+e+Log%C3%ADstica"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 shadow-sm hover:-translate-y-0.5 transition-transform"
            >
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </span>
              <span className="font-bold text-primary">4,6</span>
              <span className="text-sm text-muted-foreground">no Google</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 relative">
            <div className="rounded-2xl bg-card border border-border shadow-lg p-10 lg:p-14 text-center overflow-hidden">
              <div key={i} className="fade-up">
                <div className="flex justify-center gap-1 text-accent mb-6">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed">
                  “{items[i].t}”
                </p>
                <div className="mt-8">
                  <div className="font-bold text-primary">{items[i].n}</div>
                  <div className="text-sm text-muted-foreground">{items[i].r}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-border hover:bg-primary/30"}`}
                  aria-label={`Depoimento ${k + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CTA Banner ---------- */

function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(120deg, oklch(0.55 0.24 27), oklch(0.62 0.24 22))" }}>
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <Reveal>
        <div className="relative mx-auto max-w-6xl px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-extrabold">
              Precisa de uma solução logística para sua empresa?
            </h2>
            <p className="mt-3 text-white/90">Nossa equipe está pronta para desenhar a operação ideal para você.</p>
          </div>
          <a href="#contato" className="group inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all">
            Solicitar orçamento <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contato" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">Contato</span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
              Vamos conversar sobre sua operação
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm min-h-[500px] h-full relative bg-surface">
              <iframe
                title="Mapa LKR — R. Prof. Mario Godói, 587, Santa Mônica, Uberlândia - MG"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-48.2266%2C-18.9346%2C-48.2166%2C-18.9266&layer=mapnik&marker=-18.9306357%2C-48.221656"
                className="w-full h-full absolute inset-0"
                loading="lazy"
              />
              <a
                href="https://www.google.com/maps/place/LKR+Servi%C3%A7os+Transportes+e+Log%C3%ADstica"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 rounded-xl bg-card/95 backdrop-blur border border-border px-4 py-3 shadow-lg flex items-start gap-3 hover:-translate-y-0.5 transition-transform"
              >
                <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-primary text-sm">LKR Serviços Transportes e Logística</div>
                  <div className="text-xs text-muted-foreground">R. Prof. Mario Godói, 587 — Santa Mônica, Uberlândia - MG, 38408-332</div>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl bg-card border border-border p-8 lg:p-10 shadow-sm">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <Field label="Nome" placeholder="Seu nome" />
                <Field label="Empresa" placeholder="Sua empresa" />
                <Field label="Telefone" placeholder="(00) 00000-0000" />
                <Field label="Email" placeholder="voce@empresa.com" type="email" />
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Mensagem</label>
                  <textarea rows={4} placeholder="Conte-nos sobre sua necessidade logística..." className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full group">
                    Enviar mensagem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-3">
                <QuickAction icon={MessageCircle} label="WhatsApp" href="https://wa.me/553432291736?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20LKR%20Servi%C3%A7os." />
                <QuickAction icon={Phone} label="Telefone" href="tel:+553432291736" />
                <QuickAction icon={Mail} label="Email" href="mailto:comercial@lkrservicos.com.br" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input {...rest} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
    </div>
  );
}

function QuickAction({ icon: Icon, label, href }: { icon: typeof Phone; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 py-3 rounded-lg hover:bg-surface hover:-translate-y-0.5 transition-all">
      <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="text-white/80" style={{ background: "linear-gradient(180deg, oklch(0.22 0.15 268), oklch(0.16 0.12 268))" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-4 gap-10">
        <div>
          <LkrLogo variant="full" className="h-16 w-auto" />
          <div className="h-px w-16 bg-accent/60 mt-4" />
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Deus é fiel
          </p>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Transportes & Logística Integrada. Movendo o Brasil com segurança, tecnologia e credibilidade.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Ic, k) => (
              <a key={k} href="#" className="h-9 w-9 rounded-lg border border-white/15 grid place-items-center hover:bg-accent hover:border-accent hover:-translate-y-0.5 transition-all">
                <Ic className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-white transition-colors">{n.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Serviços</h4>
          <ul className="space-y-2 text-sm">
            <li>Transporte Rodoviário</li>
            <li>Logística Integrada</li>
            <li>Distribuição</li>
            <li>Armazenagem</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contato</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> (34) 3229-1736</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> comercial@lkrservicos.com.br</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" /> R. Prof. Mario Godói, 587 — Santa Mônica, Uberlândia - MG, 38408-332</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Seg–Sex, 8h às 18h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} LKR Serviços. Todos os direitos reservados.</div>
          <div>CNPJ 03.527.759/0001-15</div>
        </div>
      </div>
    </footer>
  );
}
