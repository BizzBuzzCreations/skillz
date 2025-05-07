export const trimWords = (text) => {
  if (typeof text !== "string") return "";
  const words = text.trim().split(/\s+/);
  if(words.length <= 50) return text;
  return words.slice(0, 50).join(" ") + "...";
}