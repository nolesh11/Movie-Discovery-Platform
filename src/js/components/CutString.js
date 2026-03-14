export function cutString(str, max) {
  if (!str) return "";
  if (str.length <= max) return str;

  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "...";
}
