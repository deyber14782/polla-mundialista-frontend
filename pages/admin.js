import { usersAPI } from "../js/services/api.js";
import { showToast } from "../js/components/toast.js";

export async function renderAdmin(container) {
    container.innerHTML = `
    <div class="admin-page">

      <div class="section-header">
        <h1 class="section-title">
          <i class="fas fa-shield-alt"></i> Panel de administración
        </h1>
      </div>

      <!-- Registrar usuario -->
      <div class="admin-grid">
        <div class="card">
          <div class="card-header">
            <span class="card-title"><i class="fas fa-user-plus"></i> Registrar jugador</span>
          </div>

          <div class="input-group">
            <label>Nombre completo</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input type="text" id="reg-name" class="input-field"
                placeholder="Nombre y apellido" />
            </div>
          </div>

          <div class="input-group">
            <label>Correo electrónico</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" id="reg-email" class="input-field"
                placeholder="correo@ejemplo.com" />
            </div>
          </div>

          <div class="input-group">
            <label>Número de celular</label>
            <div class="input-wrapper">
              <i class="fas fa-phone input-icon"></i>
              <input type="text" id="reg-phone" class="input-field"
                placeholder="3001234567" maxlength="15" />
            </div>
            <p style="font-size:0.78rem;color:var(--text-light);margin-top:0.3rem">
              Este número será la contraseña inicial del usuario
            </p>
          </div>

          <button class="btn btn-primary btn-full" id="register-btn">
            <i class="fas fa-user-plus"></i> Registrar jugador
          </button>

          <div id="register-result" style="margin-top:1rem"></div>
        </div>

        <!-- Lista de jugadores -->
        <div class="card">
          <div class="card-header">
            <span class="card-title"><i class="fas fa-users"></i> Jugadores registrados</span>
            <button class="btn btn-secondary" id="refresh-users-btn"
              style="padding:0.35rem 0.9rem;font-size:0.82rem">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
          <div id="users-list">
            <div class="page-loader"><div class="spinner"></div></div>
          </div>
        </div>
      </div>

    </div>
  `;

    injectAdminStyles();
    await loadUsers();

    document.getElementById("register-btn").addEventListener("click", handleRegister);
    document.getElementById("refresh-users-btn").addEventListener("click", loadUsers);

    // Enter en último campo
    document.getElementById("reg-phone").addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleRegister();
    });
}

async function handleRegister() {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const btn = document.getElementById("register-btn");
    const result = document.getElementById("register-result");

    if (!name || !email || !phone) {
        showToast("Completa todos los campos", "warning");
        return;
    }

    if (phone.length < 7) {
        showToast("El número de celular no es válido", "warning");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;border-width:2px"></div> Registrando...`;
    result.innerHTML = "";

    try {
        const user = await usersAPI.register({
            display_name: name,
            email,
            phone,
        });

        result.innerHTML = `
      <div class="register-success">
        <i class="fas fa-check-circle"></i>
        <div>
          <strong>${user.display_name}</strong> registrado correctamente
          <p>Contraseña inicial: <code>${phone}</code></p>
        </div>
      </div>
    `;

        showToast(`${user.display_name} registrado`, "success");

        // Limpiar campos
        document.getElementById("reg-name").value = "";
        document.getElementById("reg-email").value = "";
        document.getElementById("reg-phone").value = "";

        // Actualizar lista
        await loadUsers();

    } catch (err) {
        result.innerHTML = `
      <div class="register-error">
        <i class="fas fa-circle-xmark"></i>
        <span>${err.message}</span>
      </div>
    `;
        showToast(err.message, "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-user-plus"></i> Registrar jugador`;
    }
}

async function loadUsers() {
    const container = document.getElementById("users-list");
    container.innerHTML = `<div class="page-loader"><div class="spinner"></div></div>`;

    try {
        const users = await usersAPI.getAllUsers();

        if (!users.length) {
            container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-users"></i>
          <p>No hay jugadores registrados aún</p>
        </div>
      `;
            return;
        }

        container.innerHTML = users.map(u => `
      <div class="admin-user-row">
        <div class="admin-user-info">
          <div class="rank-avatar" style="width:36px;height:36px;font-size:0.8rem;flex-shrink:0">
            ${u.photo_url
                ? `<img src="${u.photo_url}" style="width:100%;height:100%;border-radius:50%;object-fit:cover"/>`
                : u.display_name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
            }
          </div>
          <div>
            <p class="admin-user-name">${u.display_name}</p>
            <p class="admin-user-email">${u.email}</p>
            <p class="admin-user-email">${u.phone || ""}</p>
          </div>
        </div>
        <div class="admin-user-right">
          <span class="points-badge">${u.total_score} pts</span>
          <button class="btn-icon btn-delete" data-uid="${u.uid}"
            title="Eliminar usuario">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("");

        // Eventos de eliminar
        container.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", () => handleDelete(btn.dataset.uid));
        });

    } catch (err) {
        container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error cargando usuarios</p>
      </div>
    `;
    }
}

async function handleDelete(uid) {
    if (!confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) return;

    try {
        await usersAPI.deleteUser(uid);
        showToast("Usuario eliminado", "success");
        await loadUsers();
    } catch (err) {
        showToast(err.message, "error");
    }
}

function injectAdminStyles() {
    if (document.getElementById("admin-styles")) return;
    const style = document.createElement("style");
    style.id = "admin-styles";
    style.textContent = `
    body { background: var(--gray-light); }

    .admin-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .register-success {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(34,197,94,0.08);
      border: 1px solid rgba(34,197,94,0.2);
      border-radius: var(--radius-sm);
      color: var(--success);
      font-size: 0.9rem;
    }

    .register-success p {
      margin-top: 0.25rem;
      color: var(--text-light);
      font-size: 0.82rem;
    }

    .register-success code {
      background: var(--gray-mid);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-family: Consolas, monospace;
      color: var(--navy);
    }

    .register-error {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: var(--radius-sm);
      color: var(--error);
      font-size: 0.9rem;
    }

    .admin-user-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--gray-mid);
      gap: 1rem;
    }

    .admin-user-row:last-child { border-bottom: none; }

    .admin-user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .admin-user-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--text);
    }

    .admin-user-email {
      font-size: 0.78rem;
      color: var(--text-light);
    }

    .admin-user-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: var(--radius-sm);
      transition: var(--transition);
      font-size: 0.85rem;
    }

    .btn-delete {
      color: var(--error);
    }

    .btn-delete:hover {
      background: rgba(239,68,68,0.1);
    }

    @media (max-width: 768px) {
      .admin-grid { grid-template-columns: 1fr; }
    }
  `;
    document.head.appendChild(style);
}