import React, { useRef } from "react";

/**
 * MagneticButton — botão que "puxa" em direção ao cursor (efeito magnético),
 * hover em escala, glow (via CSS/className) e ripple ao clicar.
 * Versão nativa: sem dependências, usa transform inline + transição CSS.
 * Renderiza como <a> (link) para casar com os CTAs do hero.
 */
export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
  strength = 0.35,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) * strength;
    const my = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${mx}px, ${my}px, 0) scale(1.05)`;
  };

  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0, 0, 0) scale(1)";
  };

  const click = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple-el";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - r.left - size / 2}px`;
      ripple.style.top = `${e.clientY - r.top - size / 2}px`;
      el.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={click}
      className={`relative overflow-hidden transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}
