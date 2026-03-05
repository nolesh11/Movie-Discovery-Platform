export function formatRuntime(mins) {
  if (mins <= 0) return "-";
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return hours ? `${hours}h ${minutes}mins` : `${mins}`;
}