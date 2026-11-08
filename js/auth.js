// Login, registro, logout e a "guarda" de sessão


import {
  getUsers,
  saveUsers,
  getLoggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "./storage.js";

// Redireciona para o login se ninguém estiver logado.
export const requireLogin = () => {
  const user = getLoggedUser();
  if (!user) {
    window.location.href = "./index.html";
    return null;
  }
  return user;
};
// Login: procura um usuário com nome e senha iguais e abre a sessão
const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm).entries());
  const user = getUsers().find(
    (u) => u.nome === data.nome && u.senha === data.senha,
  );
  if (user) {
    setLoggedUser(user);
    window.location.href = "./home.html";
  } else {
    alert("Usuario não encontrado!");
  }
});

// Registro: cria um novo usuário
const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(registerForm).entries());
  const users = getUsers();
  data.id = Date.now(); // id único
  users.push(data);
  saveUsers(users);
  alert("Cadastro realizado com sucesso! Faça login.");
  window.location.href = "./index.html";
});

// Logout: encerra a sessão
const logoutLink = document.getElementById("sair");
logoutLink?.addEventListener("click", (e) => {
  e.preventDefault();
  clearLoggedUser();
  window.location.href = "./index.html";
});
