// Listagem/criação/conclusão de tarefas

import { getAllTasks, saveAllTasks, getLoggedUser } from "./storage.js";
import { requireLogin } from "./auth.js";

const getUserTasks = (user) =>
  getAllTasks().filter((t) => t.user === user.nome);

const URGENCY_BADGES = {
  baixa: { label: "Baixa", className: "badge-success" },
  media: { label: "Média", className: "badge-warning" },
  alta: { label: "Alta", className: "badge-danger" },
};

const urgencyBadge = (urgencia) => {
  const badge = URGENCY_BADGES[urgencia] ?? { label: urgencia, className: "" };
  return `<span class="badge ${badge.className}">${badge.label}</span>`;
};

const statusBadge = (done) =>
  done
    ? `<span class="badge badge-success">Concluída</span>`
    : `<span class="badge badge-warning">Pendente</span>`;

const renderTasks = (user) => {
  const tbody = document.getElementById("table-body");
  const tasks = getUserTasks(user);
  tbody.innerHTML = "";
  if (tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Nenhuma tarefa encontrada.</td></tr>`;
    return;
  }
  tasks.forEach((t) => {
    const row = document.createElement("tr");
    row.dataset.id = t.id;
    row.dataset.done = t.done;
    row.innerHTML = `<td data-label="Nome">${t.nomeTarefa}</td><td data-label="Descrição">${t.descricaoTarefa}</td><td data-label="Data Prevista">${t.dataPrevista}</td><td data-label="Urgência">${urgencyBadge(t.urgencia)}</td><td data-label="Status">${statusBadge(t.done)}</td><td data-label="Ações"><button type="button" class="rowAction" data-action="delete">Excluir</button></td>`;
    tbody.appendChild(row);
  });
};

const changeTaskStatus = (taskId, newStatus) => {
  const allTasks = getAllTasks();
  const taskIndex = allTasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    allTasks[taskIndex].done = newStatus;
    saveAllTasks(allTasks);
  }
};

const deleteTask = (taskId) => {
  const allTasks = getAllTasks();
  saveAllTasks(allTasks.filter((t) => t.id !== taskId));
};

const openConfirmModal = (message, onConfirm) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `<div class="modal-content">
  <span class="close" id="closeButton">&times;</span>
  <p>${message}</p>
  <div class="modal-actions">
    <button class="cancel" id="cancelButton">Cancelar</button>
    <button class="confirm" id="confirmButton">Confirmar</button>
  </div>
</div>`;
  document.body.appendChild(modal);
  const closeModal = () => modal.remove();
  modal.querySelector("#closeButton").addEventListener("click", closeModal);
  modal.querySelector("#cancelButton").addEventListener("click", closeModal);
  modal.querySelector("#confirmButton").addEventListener("click", () => {
    onConfirm();
    modal.remove();
    renderTasks(getLoggedUser());
  });
};

// Home: lista de tarefas 
const tbody = document.getElementById("table-body");
if (tbody) {
  const user = requireLogin();
  if (user) {
    renderTasks(user);
    tbody.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      if (!row || !row.dataset.id) return;
      const taskId = parseInt(row.dataset.id);

  
      if (e.target.closest("[data-action='delete']")) {
        openConfirmModal("Deseja excluir esta tarefa?", () =>
          deleteTask(taskId),
        );
        return;
      }

      if (row.dataset.done === "true") return;
      openConfirmModal("Deseja marcar a tarefa como concluída?", () =>
        changeTaskStatus(taskId, true),
      );
    });
  }
}

// Criar tarefa 
const taskForm = document.getElementById("taskRegisterForm");
if (taskForm) {
  const user = requireLogin();
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const task = Object.fromEntries(new FormData(taskForm).entries());
      task.id = Date.now();
      task.done = false;
      task.user = user.nome;
      const allTasks = getAllTasks();
      allTasks.push(task);
      saveAllTasks(allTasks);
      alert("Tarefa criada com sucesso!");
      taskForm.reset();
      window.location.href = "./home.html";
    } catch (err) {
      console.error(err);
      alert("Erro ao criar nova tarefa!");
    }
  });
}
