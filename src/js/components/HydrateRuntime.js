import { formatRuntime } from "./FormatRuntime.js";

export function hydrateRuntime(item, root, {targetClass, dataAttr}) {
  item.forEach((m) => {
    const container = root.querySelector(
      `.${targetClass}[data-${dataAttr}="${m.id}"]`,
    );

    if (!container) return;

    container.textContent = formatRuntime(m.runtime);
  });
}
