// Acesso direto ao localStorage. 

const USERS_KEY = "usuarios";
const TASKS_KEY = "tarefas";
const SESSION_KEY = "userLogado";

export const getUsers = () => {
  const saved = localStorage.getItem(USERS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getAllTasks = () => {
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveAllTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

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
