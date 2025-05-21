export const trimWords = (text, limit = 100) => {
  if (typeof text !== "string") return "";
  text = text.trim();
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + "...";
};