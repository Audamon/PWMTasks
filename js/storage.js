// Acesso direto ao localStorage. 

const USERS_KEY = "usuarios";
const TASKS_KEY = "tarefas";
const SESSION_KEY = "userLogado";

// Usuários cadastrados
export const getUsers = () => {
  const saved = localStorage.getItem(USERS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Tarefas de todos os usuários (o filtro por usuário é feito em tasks.js)
export const getAllTasks = () => {
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveAllTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Usuário da sessão atual
export const getLoggedUser = () => {
  const saved = localStorage.getItem(SESSION_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const setLoggedUser = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearLoggedUser = () => {
  localStorage.removeItem(SESSION_KEY);
};
