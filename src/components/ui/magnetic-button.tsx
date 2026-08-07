import React, { useRef } from "react";

/**
 * MagneticButton — botão que "puxa" em direção ao cursor (efeito magnético,
 * máx. ~12px), sobe 4px no hover, comprime no clique (scale 0.96) e emite
 * ripple. Versão nativa (spring via transição CSS), sem dependências.
 */
export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
  strength = 0.3,
  max = 12,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  strength?: number;
  max?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pressed = useRef(false);

  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  const render = (mx: number, my: number, hovering: boolean) => {
    const el = ref.current;
    if (!el) return;
    const scale = pressed.current ? 0.96 : hovering ? 1.05 : 1;
    const lift = hovering ? -4 : 0;
    el.style.transform = `translate3d(${mx}px, ${my + lift}px, 0) scale(${scale})`;
  };

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = clamp((e.clientX - (r.left + r.width / 2)) * strength);
    const my = clamp((e.clientY - (r.top + r.height / 2)) * strength);
    render(mx, my, true);
  };

  const leave = () => {
    pressed.current = false;
    render(0, 0, false);
  };

  const down = () => {
    pressed.current = true;
    const el = ref.current;
    if (el) el.style.transform = el.style.transform.replace(/scale\([^)]*\)/, "scale(0.96)");
  };

  const up = () => {
    pressed.current = false;
    const el = ref.current;
    if (el) el.style.transform = el.style.transform.replace(/scale\([^)]*\)/, "scale(1.05)");
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
      onMouseDown={down}
      onMouseUp={up}
      onClick={click}
      className={`btn-magnetic transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </a>
  );
}
