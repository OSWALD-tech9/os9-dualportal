/**
 * Escapes HTML special characters to prevent XSS injection.
 */
export const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

/**
 * Sanitizes user input: trims, escapes HTML, and strips control characters.
 */
export const sanitizeInput = (value: string): string => {
  // Strip control characters (except newline/tab for textareas)
  const stripped = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return escapeHtml(stripped.trim());
};

/**
 * Light sanitize for live input (no trim, preserves typing flow).
 * Strips dangerous chars but keeps spaces for UX.
 */
export const sanitizeOnChange = (value: string): string => {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
};
