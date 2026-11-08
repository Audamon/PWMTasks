

// Itens do menu
const NAV_LINKS = [
  { href: "./home.html", label: "Home" },
  { href: "./perfil.html", label: "Perfil" },
  { href: "./createTask.html", label: "Criar Tarefa" },
];

// <site-header>: com o atributo "nav" mostra o menu; sem ele, só o nome do sistema
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.classList.add("header");

    if (!this.hasAttribute("nav")) {
      this.classList.add("header--centered");
      this.innerHTML = `<span class="brand">PMW Tasks</span>`;
      return;
    }

    
    const links = NAV_LINKS.map(
      (l) => `<a href="${l.href}">${l.label}</a>`,
    ).join("");
    this.innerHTML = `
      <span class="brand">PMW Tasks</span>
      <nav class="navLinks">
        ${links}
        <a href="#" id="sair">Sair</a>
      </nav>
    `;
  }
}

// <site-footer>: rodapé igual em todas as páginas
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.classList.add("footer");
    this.innerHTML = `
      <div class="footerContent">
        <div class="footerColumn">
          <h2>Sobre</h2>
          <p>PMW Tasks — projeto acadêmico da disciplina PMW<br>FSG.</p>
        </div>
        <div class="footerColumn">
          <h2>Contato</h2>
          <p>João Alfredo Tamagno</p>
          <div class="footerLinks">
            <a href="https://github.com/Audamon/PWMTasks" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/joaoalfredotamagno/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <p>Giovani Rigotti</p>
          <div class="footerLinks">
            <a href="https://github.com/GRigotti/PWMTasks" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/giovani-rigotti-2914b63a7/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
        <div class="footerColumn">
          <h2>Leituras Úteis</h2>
          <a href="https://unifor.br/-/confira-dicas-para-organizar-a-rotina-de-estudos-e-manter-o-conteudo-das-aulas-em-dia">Rotina de Estudos</a>
          <a href="https://forbes.com.br/coluna/2022/07/arthur-guerra-lista-de-tarefas-e-uma-boa-ferramenta-para-ajudar-a-reduzir-a-ansiedade/">Tarefas e Ansiedade</a>
          <a href="https://www.fsa.br/rotina-de-estudos-na-faculdade/">Estudos na Faculdade</a>
        </div>
      </div>
      <p class="footerBottom">© 2026 PMW Tasks — Projeto acadêmico</p>
    `;
  }
}

// Registra as tags personalizadas
customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
