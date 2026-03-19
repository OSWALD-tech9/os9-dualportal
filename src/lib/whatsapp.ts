import { escapeHtml } from "./sanitize";

const WHATSAPP_NUMBER = "237673225998";

export const getWhatsAppUrl = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  const sanitized = escapeHtml(message);
  return `${base}?text=${encodeURIComponent(sanitized)}`;
};
