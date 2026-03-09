import { formatRuntime } from "./FormatRuntime.js";

export function hydrateEpisodeRuntime(item, root, {targetClass, dataAttr}) {
  item.forEach((m) => {
    const container = root.querySelector(
      `.${targetClass}[data-${dataAttr}="${m.id}"]`,
    );

    if (!container) return;

    const runtime = (m.episode_run_time * m.number_of_episodes);

    if(!runtime) {
      container.textContent = 'No data';
    } else {
      container.textContent = formatRuntime(runtime);
    }
  });
}