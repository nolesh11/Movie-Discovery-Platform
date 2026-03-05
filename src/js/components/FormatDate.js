export function formatDate(item, root, {targetClass, dataAttr}) {
  item.forEach((d) => {
    const dateContainer = root.querySelector(
      `.${targetClass}[data-${dataAttr}="${d.id}"]`,
    );
    const releaseDate = d.release_date;
    const date = new Date(releaseDate);

    const formatedDay = date.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const formatedMonth = date.toLocaleDateString("en-US", {
      month: "short",
    });
    const formatedYear = date.toLocaleDateString("en-US", {
      year: "numeric",
    });

    if (!dateContainer) return;

    dateContainer.textContent = `\u00A0${formatedDay} ${formatedMonth} ${formatedYear}`;
  });
}
