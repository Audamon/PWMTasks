// Página de perfil

import { getUsers, saveUsers, setLoggedUser } from "./storage.js";
import { requireLogin } from "./auth.js";

const user = requireLogin();
if (user) {
  const nameField = document.getElementById("perfilNome");
  if (nameField) nameField.textContent = user.nome;

  const passwordForm = document.getElementById("passwordForm");
  passwordForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(passwordForm).entries());

    if (data.senhaAtual !== user.senha) {
      alert("Senha atual incorreta!");
      return;
    }
    if (!data.novaSenha) {
      alert("Informe a nova senha!");
      return;
    }
    if (data.novaSenha !== data.confirmarSenha) {
      alert("A confirmação não coincide com a nova senha!");
      return;
    }

    const users = getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      alert("Usuário não encontrado!");
      return;
    }

    users[index].senha = data.novaSenha;
    saveUsers(users);
    setLoggedUser(users[index]); 

    passwordForm.reset();
    alert("Senha alterada com sucesso!");
  });
}
