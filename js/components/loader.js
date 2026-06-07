export function showLoader(containerId = "app") {
    const container = document.getElementById(containerId);
    container.innerHTML = `
    <div class="page-loader">
      <div class="spinner"></div>
    </div>
  `;
}

export function showSkeleton(count = 3) {
    return Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton-line wide"></div>
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line narrow"></div>
    </div>
  `).join("");
}