// Listagem/criação/conclusão de tarefas

import { getAllTasks, saveAllTasks, getLoggedUser } from "./storage.js";
import { requireLogin } from "./auth.js";

// Data de hoje (AAAA-MM-DD) no fuso local; usada para validar e marcar atrasos
const todayStr = () => {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
};

// Tarefas do usuário logado
const getUserTasks = (user) =>
  getAllTasks().filter((t) => t.user === user.nome);

// Texto e cor de cada nível de urgência
const URGENCY_BADGES = {
  baixa: { label: "Baixa", className: "badge-success" },
  media: { label: "Média", className: "badge-warning" },
  alta: { label: "Alta", className: "badge-danger" },
};

const urgencyBadge = (urgencia) => {
  const badge = URGENCY_BADGES[urgencia] ?? { label: urgencia, className: "" };
  return `<span class="badge ${badge.className}">${badge.label}</span>`;
};

// Status: Concluída, Atrasada (prazo vencido e não concluída) ou Pendente
const statusBadge = (t) => {
  if (t.done) return `<span class="badge badge-success">Concluída</span>`;
  if (t.dataPrevista < todayStr())
    return `<span class="badge badge-danger">Atrasada</span>`;
  return `<span class="badge badge-warning">Pendente</span>`;
};

// Redesenha a tabela com as tarefas do usuário
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
    row.innerHTML = `<td class="cellText" data-label="Nome">${t.nomeTarefa}</td><td class="cellText" data-label="Descrição">${t.descricaoTarefa}</td><td data-label="Data Prevista">${t.dataPrevista}</td><td data-label="Urgência">${urgencyBadge(t.urgencia)}</td><td data-label="Status">${statusBadge(t)}</td><td data-label="Ações"><button type="button" class="rowAction" data-action="delete">Excluir</button></td>`;
    tbody.appendChild(row);
  });
};

// Atualiza o status (done) de uma tarefa
const changeTaskStatus = (taskId, newStatus) => {
  const allTasks = getAllTasks();
  const taskIndex = allTasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    allTasks[taskIndex].done = newStatus;
    saveAllTasks(allTasks);
  }
};

// Remove uma tarefa pelo id
const deleteTask = (taskId) => {
  const allTasks = getAllTasks();
  saveAllTasks(allTasks.filter((t) => t.id !== taskId));
};

// Mostra um dado da tarefa no modal (textContent evita interpretar HTML)
const addDetail = (list, label, value) => {
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value;
  list.append(dt, dd);
};

// Cria o modal com os dados completos da tarefa (task) e, se houver onConfirm,
// o botão de confirmar; sem onConfirm, é só visualização
const openConfirmModal = (message, onConfirm, task) => {
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
  // Lista com os dados completos da tarefa, logo abaixo da mensagem
  if (task) {
    const details = document.createElement("dl");
    details.classList.add("modal-details");
    addDetail(details, "Nome", task.nomeTarefa);
    addDetail(details, "Descrição", task.descricaoTarefa);
    addDetail(details, "Data prevista", task.dataPrevista.split("-").reverse().join("/"));
    addDetail(details, "Urgência", URGENCY_BADGES[task.urgencia]?.label ?? task.urgencia);
    modal.querySelector("p").after(details);
  }
  // Sem ação a confirmar: o modal só mostra os dados
  if (!onConfirm) {
    modal.querySelector("#confirmButton").remove();
    modal.querySelector("#cancelButton").textContent = "Fechar";
  }
  document.body.appendChild(modal);
  const closeModal = () => modal.remove();
  modal.querySelector("#closeButton").addEventListener("click", closeModal);
  modal.querySelector("#cancelButton").addEventListener("click", closeModal);
  modal.querySelector("#confirmButton")?.addEventListener("click", () => {
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
    // Excluir apaga; clique na linha conclui a tarefa pendente ou mostra os detalhes da concluída
    tbody.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      if (!row || !row.dataset.id) return;
      const taskId = parseInt(row.dataset.id);
      // Tarefa clicada, para mostrar seus dados no modal
      const task = getAllTasks().find((t) => t.id === taskId);

  
      if (e.target.closest("[data-action='delete']")) {
        openConfirmModal("Deseja excluir esta tarefa?", () => deleteTask(taskId), task);
        return;
      }

      // Tarefa já concluída: só mostra os detalhes
      if (row.dataset.done === "true") {
        openConfirmModal("Detalhes da tarefa", null, task);
        return;
      }
      openConfirmModal(
        "Deseja marcar a tarefa como concluída?",
        () => changeTaskStatus(taskId, true),
        task,
      );
    });
  }
}

// Criar tarefa 
const taskForm = document.getElementById("taskRegisterForm");
if (taskForm) {
  const user = requireLogin();
  // Bloqueia datas passadas no calendário
  taskForm.elements.dataPrevista.min = todayStr();
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const task = Object.fromEntries(new FormData(taskForm).entries());
      // Valida de novo no envio, pois a data pode ser digitada
      if (task.dataPrevista < todayStr()) {
        alert("A data prevista não pode ser no passado!");
        return;
      }
      // Completa o objeto da tarefa
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
