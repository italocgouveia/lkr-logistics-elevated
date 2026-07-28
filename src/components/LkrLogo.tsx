import React from "react";

interface LkrLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** "full" = emblema + "Transportes & Logística Integrada"; "icon" = apenas o emblema */
  variant?: "full" | "icon";
  className?: string;
}

export const LkrLogo: React.FC<LkrLogoProps> = ({
  variant = "full",
  className = "h-10 w-auto",
  alt = "LKR Serviços — Transportes & Logística Integrada",
  ...props
}) => {
  const src = variant === "full" ? "/lkr-logo.png" : "/lkr-logo-mark.png";
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      draggable={false}
      {...props}
    />
  );
};
