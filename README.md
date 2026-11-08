# PMW Tasks

Gerenciador de tarefas simples em **HTML, CSS e JavaScript puro** (sem frameworks, sem build), feito como projeto acadêmico da disciplina **Programação e Modelagem para Web (PMW)** — FSG.

## Sobre o projeto

Cada usuário se cadastra, faz login e passa a ter sua própria lista de tarefas, com nome, descrição, data prevista e nível de urgência. O objetivo é ajudar na organização pessoal e profissional e evitar atrasos nas entregas. Tudo é persistido no `localStorage` do navegador — não há backend nem banco de dados.

## Funcionalidades

- **Login e registro** de usuário
- **CRUD de tarefas**: criar, listar, marcar como concluída e excluir
- **Validação de data**: não é possível criar tarefa com data prevista no passado
- **Status automático**: *Pendente*, *Atrasada* (data prevista já passou e a tarefa não foi concluída) e *Concluída*
- **Perfil**: consulta do nome do usuário logado e troca de senha
- Cada usuário só enxerga as próprias tarefas
- Badges coloridos por urgência (Baixa/Média/Alta) e por status
- Cabeçalho (com menu) fixo no topo, tema em azul, layout responsivo (a tabela de tarefas vira uma lista de cards em telas pequenas)
- Rodapé com informações do projeto, contatos dos autores e "Leituras Úteis" sobre organização de tarefas

## Tecnologias

- HTML5
- CSS3 (variáveis/design system, Flexbox, `@media queries`, nesting nativo)
- JavaScript (ES Modules), sem dependências externas
- **Web Components** (`customElements`) para o cabeçalho/menu e o rodapé compartilhados entre páginas
- `localStorage` para persistência dos dados (usuários, tarefas e sessão)

## Estrutura de pastas

```
PWMTasks/
├── index.html          # Login
├── registro.html       # Cadastro de usuário
├── home.html           # Lista de tarefas do usuário logado
├── createTask.html     # Criação de tarefa
├── perfil.html         # Dados do usuário + troca de senha
├── css/
│   └── style.css       # Design system (cores, raio de borda, sombra) e estilos
└── js/
    ├── storage.js      # Único ponto de acesso ao localStorage
    ├── layout.js       # Web Components do cabeçalho/menu e rodapé
    ├── auth.js         # Login, registro, logout e guarda de sessão
    ├── tasks.js        # Listagem/criação/conclusão/exclusão de tarefas
    └── profile.js      # Página de perfil (dados + troca de senha)
```

## Como rodar

O projeto usa módulos JavaScript (`type="module"`), que os navegadores bloqueiam quando a página é aberta direto do disco (`file://`). Por isso, abra-o por um servidor local, por exemplo:

- **VS Code**: extensão *Live Server* → botão direito em `index.html` → *Open with Live Server*; ou
- **Terminal**, dentro da pasta do projeto: `python -m http.server 8000` e acesse `http://localhost:8000`.

Não há nada para instalar além disso.

---

## Funções do sistema (por área)

### 1. Login (`index.html`)

Tela inicial. O usuário informa **nome** e **senha**.

- Se os dados batem com um usuário cadastrado, a sessão é salva e ele é levado para a **Home**.
- Se não, aparece o aviso "Usuario não encontrado!".
- O link **Registre-se** leva à tela de cadastro.

### 2. Registro (`registro.html`)

Cria uma nova conta com **nome** e **senha**. Ao concluir, o usuário é levado de volta ao login para entrar.

### 3. Cabeçalho e menu (`layout.js`)

Fica fixo no topo enquanto a página rola. Nas telas logadas mostra o menu:

| Item | Destino |
|---|---|
| Home | Lista de tarefas |
| Perfil | Dados do usuário e troca de senha |
| Criar Tarefa | Formulário de nova tarefa |
| Sair | Encerra a sessão e volta ao login |

Nas telas de login e registro, mostra só o nome do sistema.

### 4. Home — lista de tarefas (`home.html`)

Mostra uma tabela com as tarefas do usuário logado:

| Coluna | Conteúdo |
|---|---|
| Nome | Nome da tarefa |
| Descrição | Detalhes da tarefa |
| Data Prevista | Prazo informado |
| Urgência | Baixa (verde), Média (amarelo) ou Alta (vermelho) |
| Status | Pendente (amarelo), **Atrasada** (vermelho) ou Concluída (verde) |
| Ações | Botão **Excluir** |

Ações disponíveis:

- **Concluir**: clicar na linha da tarefa abre uma confirmação; ao confirmar, o status passa para *Concluída*. Tarefas atrasadas também podem ser concluídas.
- **Excluir**: clicar em "Excluir" pede confirmação e remove a tarefa.
- Sem tarefas, a tabela mostra "Nenhuma tarefa encontrada.".

O status **Atrasada** é calculado a cada vez que a lista é mostrada: se a tarefa não foi concluída e a data prevista é anterior a hoje, ela aparece como atrasada. Nada extra é salvo.

### 5. Criar Tarefa (`createTask.html`)

Formulário com:

- **Nome da Tarefa** e **Descrição da Tarefa** (obrigatórios)
- **Data Prevista**: o calendário não permite dias anteriores a hoje, e o envio também é validado ("A data prevista não pode ser no passado!"). Hoje é permitido.
- **Urgência**: Baixa, Média ou Alta

Ao salvar, a tarefa é gravada como pendente e o usuário volta para a Home.

### 6. Perfil (`perfil.html`)

Mostra o nome do usuário e permite **alterar a senha**, informando a senha atual, a nova senha e a confirmação. O sistema avisa se a senha atual está incorreta ou se a confirmação não coincide.

### 7. Rodapé (`layout.js`)

Mostra sobre o projeto, contato dos autores (GitHub e LinkedIn), **Leituras Úteis** (artigos sobre rotina de estudos, tarefas e ansiedade) e o copyright.

---

## Como usar (passo a passo)

1. Inicie o projeto em um servidor local (veja *Como rodar*) e abra o `index.html`.
2. Clique em **Registre-se**, informe nome e senha e confirme.
3. Volte ao login, entre com os mesmos dados e você cai na **Home**.
4. No menu, clique em **Criar Tarefa**, preencha nome, descrição, data prevista (hoje ou futura) e urgência, e clique em **Criar Tarefa**.
5. Na **Home**, veja a tarefa na lista com status *Pendente*.
6. Quando terminar uma tarefa, clique na linha dela e confirme: o status vira *Concluída*.
7. Para apagar uma tarefa, clique em **Excluir** e confirme.
8. Se uma tarefa passar do prazo sem ser concluída, ela aparece como **Atrasada** (em vermelho).
9. Em **Perfil**, troque a senha quando quiser.
10. Clique em **Sair** para encerrar a sessão.

Os dados ficam salvos no navegador usado. Limpar os dados do site ou trocar de navegador/computador faz as contas e tarefas não aparecerem.

---

## Resumo das funções de código

| Arquivo | Função | O que faz |
|---|---|---|
| `storage.js` | `getUsers` / `saveUsers` | Lê e grava a lista de usuários |
| `storage.js` | `getAllTasks` / `saveAllTasks` | Lê e grava a lista de tarefas |
| `storage.js` | `getLoggedUser` / `setLoggedUser` / `clearLoggedUser` | Lê, grava e apaga o usuário da sessão |
| `auth.js` | `requireLogin` | Redireciona ao login se ninguém estiver logado |
| `auth.js` | listeners de login, registro e logout | Tratam os formulários e o link "Sair" |
| `tasks.js` | `todayStr` | Devolve a data de hoje (AAAA-MM-DD) no fuso local |
| `tasks.js` | `getUserTasks` | Filtra as tarefas do usuário logado |
| `tasks.js` | `urgencyBadge` / `statusBadge` | Montam os selos de urgência e de status (incluindo Atrasada) |
| `tasks.js` | `renderTasks` | Desenha as linhas da tabela dinamicamente |
| `tasks.js` | `changeTaskStatus` / `deleteTask` | Concluem ou excluem uma tarefa |
| `tasks.js` | `openConfirmModal` | Cria o modal de confirmação em tempo de execução |
| `profile.js` | listener de troca de senha | Valida e salva a nova senha |
| `layout.js` | `SiteHeader` / `SiteFooter` | Web Components do cabeçalho/menu e do rodapé |

## Requisitos do trabalho atendidos

| Requisito | Onde |
|---|---|
| Manipulação de objetos HTML e eventos com DOM | Formulários, botões, clique nas linhas da tabela, modal de confirmação |
| Uso de vetores/matrizes | Arrays de usuários e tarefas (`filter`, `find`, `map`, `forEach`) em [storage.js](js/storage.js) e [tasks.js](js/tasks.js) |
| Criação de objetos em tempo de execução | `document.createElement` (linhas da tabela, modal) e objetos de tarefa/usuário montados dinamicamente |
| CRUD com localStorage | **Create**: cadastro de usuário e criação de tarefa. **Read**: login e listagem de tarefas. **Update**: concluir tarefa e trocar senha. **Delete**: excluir tarefa |
| Design responsivo e amigável com CSS | `@media queries` em [style.css](css/style.css), layout em cards no mobile, cabeçalho fixo |

## Limitações conhecidas

- Senhas ficam salvas em texto no `localStorage` (adequado só para fins acadêmicos).
- Não há sincronização entre dispositivos: os dados existem apenas no navegador em que foram criados.
- A tarefa só pode ser concluída ou excluída; não há edição de nome, descrição, data ou urgência.

## Autores

João Alfredo Tamagno · Giovani Rigotti
