export function showToast(message, type = "info", duration = 3500) {
    const container = document.getElementById("toast-container");

    const icons = {
        success: "fa-circle-check",
        error: "fa-circle-xmark",
        info: "fa-circle-info",
        warning: "fa-triangle-exclamation",
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
  `;

    container.appendChild(toast);

    // Animación de entrada
    setTimeout(() => toast.classList.add("show"), 10);

    // Auto-remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}