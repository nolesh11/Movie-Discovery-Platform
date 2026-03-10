export function getCastPaginationConfig(pageSizeMob, stepMob, pageSizeDesc, stepDesc) {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  return isMobile
    ? { pageSize: pageSizeMob, step: stepMob }
    : { pageSize: pageSizeDesc, step: stepDesc };
}