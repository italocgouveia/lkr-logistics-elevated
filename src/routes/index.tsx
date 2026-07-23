import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Truck, ShieldCheck, Clock, MapPin, Phone, Mail, MessageCircle,
  Package, Route as RouteIcon, Boxes, Warehouse, Send, LineChart,
  Users, Star, ArrowRight, CheckCircle2, Menu, X, Facebook, Instagram, Linkedin,
} from "lucide-react";
import heroImg from "@/assets/hero-truck.jpg";
import fleetImg from "@/assets/fleet-trucks.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

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

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Services />
      <Differentiators />
      <Process />
      <Stats />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  );
}

function Navbar({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div className={`font-display font-extrabold text-lg leading-none ${scrolled ? "text-primary" : "text-white"}`}>
            LKR<span className="text-accent">.</span>
            <div className="text-[10px] font-medium tracking-widest opacity-80 mt-1">SERVIÇOS</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href="#contato" className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 !text-sm">
          Solicitar Orçamento
        </a>

        <button
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">
              {n.label}
            </a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)} className="btn-primary w-full">Solicitar Orçamento</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const chips = [
    { icon: MapPin, label: "Atendimento Nacional" },
    { icon: ShieldCheck, label: "Transporte Seguro" },
    { icon: Clock, label: "Entrega no Prazo" },
    { icon: LineChart, label: "Rastreamento" },
  ];
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Caminhão em rodovia ao pôr do sol"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1200}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-white text-xs font-medium mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Transportes & Logística Integrada
          </div>
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
            Transportando seu negócio com{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #fff, #ff6b70)" }}>
              segurança e eficiência
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-2xl">
            Soluções completas em transporte e logística para empresas de todo o Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contato" className="btn-primary">
              Solicitar Orçamento <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {chips.map((c) => (
            <div
              key={c.label}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-4 flex items-center gap-3 hover:bg-white/15 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-accent/90 grid place-items-center shrink-0">
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-white text-sm font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { v: "+10", l: "anos de experiência" },
    { v: "+500", l: "clientes atendidos" },
    { v: "+100k", l: "entregas realizadas" },
    { v: "BR", l: "cobertura nacional" },
  ];
  return (
    <section id="sobre" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-2xl bg-accent/10" />
          <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl" style={{ background: "var(--gradient-primary)", opacity: 0.1 }} />
          <img
            src={fleetImg}
            alt="Frota moderna de caminhões LKR"
            className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            loading="lazy"
            width={1400}
            height={1000}
          />
        </div>

        <div>
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Sobre a Empresa</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
            Movendo mercadorias.<br />Construindo confiança.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A LKR Serviços nasceu com o propósito de transformar o transporte no Brasil, unindo tecnologia,
            experiência e uma equipe altamente qualificada. Ao longo de mais de uma década, construímos uma
            operação sólida que atende empresas de todos os portes com agilidade e segurança.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Nosso compromisso é entregar mais do que cargas — entregamos previsibilidade, cuidado e resultados
            para o seu negócio.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-5 card-hover">
                <div className="text-3xl font-extrabold text-primary font-display">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: Truck, t: "Transporte Rodoviário", d: "Cobertura nacional com frota moderna e monitorada." },
    { icon: RouteIcon, t: "Logística Integrada", d: "Planejamento ponta a ponta para sua operação." },
    { icon: Send, t: "Distribuição", d: "Entregas capilarizadas em todo o território." },
    { icon: Clock, t: "Coletas Programadas", d: "Roteiros recorrentes com pontualidade garantida." },
    { icon: Boxes, t: "Transporte Fracionado", d: "Otimização de custos para cargas menores." },
    { icon: Package, t: "Transporte Dedicado", d: "Frota exclusiva para sua empresa." },
    { icon: Warehouse, t: "Armazenagem", d: "Estrutura segura para estocagem e preparação." },
    { icon: LineChart, t: "Gestão Logística", d: "Indicadores e tecnologia para decisões melhores." },
  ];
  return (
    <section id="servicos" className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Nossos Serviços</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
            Soluções logísticas completas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Uma linha de serviços desenhada para acompanhar cada etapa da sua cadeia de suprimentos.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((s) => (
            <div key={s.t} className="group rounded-2xl bg-card border border-border p-6 card-hover">
              <div className="h-12 w-12 rounded-xl grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 font-bold text-lg text-primary">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <div className="mt-5 flex items-center gap-1 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Saiba mais <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Diferenciais</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold">
            Por que empresas escolhem a LKR
          </h2>
          <p className="mt-4 text-white/75">
            Um padrão de operação pensado para eliminar surpresas e entregar performance.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((i) => (
            <div key={i.t} className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 hover:-translate-y-1 transition-all">
              <div className="h-11 w-11 rounded-xl bg-accent grid place-items-center">
                <i.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-semibold">{i.t}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = ["Solicitação", "Planejamento", "Coleta", "Transporte", "Entrega", "Confirmação"];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Como Trabalhamos</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
            Um processo claro do início ao fim
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-border" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {steps.map((s, i) => (
              <div key={s} className="relative flex flex-col items-center text-center">
                <div className="relative h-16 w-16 rounded-full bg-card border-2 border-primary grid place-items-center shadow-sm">
                  <span className="text-primary font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-4 font-semibold text-primary">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.18 0.12 268), oklch(0.26 0.16 268))" }}>
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCounter target={500} suffix="+" label="Clientes" start={inView} />
        <StatCounter target={100000} suffix="+" label="Entregas" start={inView} />
        <StatCounter target={27} suffix="" label="Estados atendidos" start={inView} />
        <StatCounter target={99} suffix="%" label="Entregas no prazo" start={inView} />
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Carla Menezes", r: "Diretora de Operações, TechFoods", t: "A LKR transformou nossa distribuição. Prazos consistentes e comunicação impecável." },
    { n: "Rafael Souza", r: "Gerente Logístico, IndustriMax", t: "Frota moderna e equipe altamente profissional. Recomendo sem hesitar." },
    { n: "Marina Alves", r: "Supply Chain, Vale Verde", t: "Rastreamento em tempo real que realmente funciona. Tranquilidade para a operação." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Depoimentos</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
            Quem confia na LKR
          </h2>
        </div>

        <div className="mt-14 relative">
          <div className="rounded-2xl bg-card border border-border shadow-lg p-10 lg:p-14 text-center">
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
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-border"}`}
                aria-label={`Depoimento ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(120deg, oklch(0.55 0.24 27), oklch(0.62 0.24 22))" }}>
      <div className="mx-auto max-w-6xl px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-white text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-extrabold">
            Precisa de uma solução logística para sua empresa?
          </h2>
          <p className="mt-3 text-white/90">Nossa equipe está pronta para desenhar a operação ideal para você.</p>
        </div>
        <a href="#contato" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform">
          Solicitar orçamento <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">Contato</span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-extrabold text-primary">
            Vamos conversar sobre sua operação
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm min-h-[500px] relative bg-surface">
            <iframe
              title="Mapa LKR"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.65%2C-23.60%2C-46.60%2C-23.55&layer=mapnik"
              className="w-full h-full absolute inset-0"
              loading="lazy"
            />
          </div>

          <div className="rounded-2xl bg-card border border-border p-8 lg:p-10 shadow-sm">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <Field label="Nome" placeholder="Seu nome" />
              <Field label="Empresa" placeholder="Sua empresa" />
              <Field label="Telefone" placeholder="(00) 00000-0000" />
              <Field label="Email" placeholder="voce@empresa.com" type="email" />
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Mensagem</label>
                <textarea rows={4} placeholder="Conte-nos sobre sua necessidade logística..." className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full">
                  Enviar mensagem <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-3">
              <QuickAction icon={MessageCircle} label="WhatsApp" href="https://wa.me/5500000000000" />
              <QuickAction icon={Phone} label="Telefone" href="tel:+5500000000000" />
              <QuickAction icon={Mail} label="Email" href="mailto:contato@lkr.com.br" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input {...rest} className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
    </div>
  );
}

function QuickAction({ icon: Icon, label, href }: { icon: typeof Phone; label: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 py-3 rounded-lg hover:bg-surface transition-colors">
      <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "var(--gradient-primary)" }}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="text-white/80" style={{ background: "linear-gradient(180deg, oklch(0.22 0.15 268), oklch(0.16 0.12 268))" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-accent grid place-items-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div className="font-display font-extrabold text-white text-lg">LKR<span className="text-accent">.</span></div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Transportes & Logística Integrada. Movendo o Brasil com segurança, tecnologia e credibilidade.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Ic, k) => (
              <a key={k} href="#" className="h-9 w-9 rounded-lg border border-white/15 grid place-items-center hover:bg-white/10 transition-colors">
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
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> (00) 0000-0000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contato@lkr.com.br</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Brasil — Cobertura Nacional</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Seg–Sex, 8h às 18h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} LKR Serviços. Todos os direitos reservados.</div>
          <div>CNPJ 00.000.000/0001-00</div>
        </div>
      </div>
    </footer>
  );
}
