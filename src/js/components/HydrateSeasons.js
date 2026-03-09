export function hydrateSeasons(item, root, { targetClass, dataAttr }) {
  item.forEach((m) => {
    const container = root.querySelector(
      `.${targetClass}[data-${dataAttr}="${m.id}"]`,
    );

    if (!container) return;

    container.textContent = `${m.number_of_seasons} season`;
  });
}
