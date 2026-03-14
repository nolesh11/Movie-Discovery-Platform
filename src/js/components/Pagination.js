export function pagination({
  prevBtn,
  nextBtn,
  pageSize,
  step,
  onChange,
  getTotal,
  getStart,
  root,
  targetClass,
}) {
  if (!prevBtn || !nextBtn) {
    throw new Error(
      "pagination: prevBtn/nextBtn не найдены. Проверь селекторы и момент вызова.",
    );
  }

  function onPrev() {
    prevBtn.addEventListener("click", () => {
      const newStart = Math.max(0, getStart() - step);
      onChange(newStart);
      const container = root.querySelectorAll(`.${targetClass}`);
      container.forEach((p) => {
        p.classList.remove("is-reveal");
        void p.offsetWidth;
        p.classList.add("is-reveal");
      });
    });
  }

  function onNext() {
    nextBtn.addEventListener("click", () => {
      const maxStart = Math.max(0, getTotal() - pageSize);
      const newStart = Math.min(maxStart, getStart() + step);
      onChange(newStart);
      const container = root.querySelectorAll(`.${targetClass}`);
      container.forEach((p) => {
        p.classList.remove("is-reveal");
        void p.offsetWidth;
        p.classList.add("is-reveal");
      });
    });
  }

  onPrev();
  onNext();

  return () => {
    prevBtn.removeEventlistener("click", onPrev);
    nextBtn.removeEventlistener("click", onNext);
  };
}
