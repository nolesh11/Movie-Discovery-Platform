export function pagination({
  prevBtn,
  nextBtn,
  pageSize,
  step,
  onChange,
  getTotal,
  getStart,
}) {
  if (!prevBtn || !nextBtn) {
    throw new Error(
      "pagination: prevBtn/nextBtn не найдены. Проверь селекторы и момент вызова.",
    );
  }

  const maxStart = Math.max(0, getTotal() - pageSize);
  prevBtn.disabled = getStart() === 0;
  nextBtn.disabled = getStart() === maxStart;

  prevBtn.addEventListener("click", () => {
    const newStart = Math.max(0, getStart() - step);
    onChange(newStart);
  });

  nextBtn.addEventListener("click", () => {
    const maxStart = Math.max(0, getTotal() - pageSize);
    const newStart = Math.min(maxStart, getStart() + step);
    onChange(newStart);
  });
}
