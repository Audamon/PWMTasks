# PMW Tasks

Gerenciador de tarefas simples em **HTML, CSS e JavaScript puro** (sem frameworks, sem build), feito como projeto acadêmico da disciplina **Programação e Modelagem para Web (PMW)** — FSG.

## Sobre o projeto

Cada usuário se cadastra, faz login e passa a ter sua própria lista de tarefas, com nome, descrição, data prevista e nível de urgência. Tudo é persistido no `localStorage` do navegador — não há backend nem banco de dados.

## Funcionalidades

- **Login e registro** de usuário
- **CRUD completo de tarefas**: criar, listar, marcar como concluída e excluir
- **Perfil**: consulta dos dados do usuário logado e troca de senha
- Cada usuário só enxerga as próprias tarefas
- Badges coloridos por urgência (Baixa/Média/Alta) e status (Pendente/Concluída)
- Header fixo no topo, layout responsivo (a tabela de tarefas vira uma lista de cards em telas pequenas)

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis/design system, Flexbox, `@media queries`, nesting nativo)
- JavaScript (ES Modules), sem dependências externas
- **Web Components** (`customElements`) para o header/nav/footer compartilhados entre páginas
- `localStorage` para persistência dos dados (usuários, tarefas e sessão)

## Estrutura de pastas

```
projetoPMW/
├── index.html          # Login
├── registro.html       # Cadastro de usuário
├── home.html           # Lista de tarefas do usuário logado
├── createTask.html     # Criação de tarefa
├── perfil.html          # Dados do usuário + troca de senha
├── css/
│   └── style.css       # Design system (cores, raio de borda, sombra) e estilos
└── js/
    ├── storage.js       # Único ponto de acesso ao localStorage
    ├── layout.js        # Web Components do header/nav/footer
    ├── auth.js          # Login, registro, logout e guarda de sessão
    ├── tasks.js         # Listagem/criação/conclusão/exclusão de tarefas
    └── profile.js       # Página de perfil (dados + troca de senha)
```

## Como rodar

Não precisa de servidor nem instalação: basta abrir o [index.html](index.html) direto no navegador.

## Requisitos do trabalho atendidos

| Requisito | Onde |
|---|---|
| Manipulação de objetos HTML e eventos com DOM | Formulários, botões, clique nas linhas da tabela, modal de confirmação |
| Uso de vetores/matrizes | Arrays de usuários e tarefas (`filter`, `find`, `map`, `forEach`) em [storage.js](js/storage.js) e [tasks.js](js/tasks.js) |
| Criação de objetos em tempo de execução | `document.createElement` (linhas da tabela, modal) e objetos de tarefa/usuário montados dinamicamente |
| CRUD com localStorage | Create, Read, Update e Delete de tarefas em [tasks.js](js/tasks.js); Create/Update de usuário em [auth.js](js/auth.js)/[profile.js](js/profile.js) |
| Design responsivo e amigável com CSS | `@media queries` em [style.css](css/style.css), layout em cards no mobile, header fixo |

## Autor

João Alfredo Tamagno
