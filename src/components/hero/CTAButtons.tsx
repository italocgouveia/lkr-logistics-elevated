import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_HREF =
  "https://wa.me/553432291736?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20LKR%20Servi%C3%A7os.";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 20 };

export function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="mt-9 flex flex-col sm:flex-row gap-4"
    >
      <motion.a
        href="#contato"
        whileHover={{ y: -3 }}
        transition={SPRING}
        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-accent text-white font-semibold px-7 py-3.5 text-sm shadow-[0_10px_30px_-10px_oklch(0.6_0.24_27/0.5)] hover:shadow-[0_16px_36px_-10px_oklch(0.6_0.24_27/0.6)] w-full sm:w-auto transition-shadow"
      >
        Solicitar Orçamento
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.a>
      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3 }}
        transition={SPRING}
        className="group inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/50 text-white font-semibold px-7 py-3.5 text-sm hover:bg-white hover:text-primary hover:border-white w-full sm:w-auto transition-colors"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </motion.a>
    </motion.div>
  );
}
