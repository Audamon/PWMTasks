

const NAV_LINKS = [
  { href: "./home.html", label: "Home" },
  { href: "./perfil.html", label: "Perfil" },
  { href: "./createTask.html", label: "Criar Tarefa" },
];

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

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.classList.add("footer");
    this.innerHTML = `
      <div class="footerContent">
        <div class="footerColumn">
          <h2>Sobre</h2>
          <p>PMW Tasks — projeto acadêmico da disciplina PMW, FSG.</p>
        </div>
        <div class="footerColumn">
          <h2>Contato</h2>
          <p>João Alfredo Tamagno</p>
          <a href="https://github.com/Audamon/PWMTasks" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/joaoalfredotamagno/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <div class="footerColumn">
          <h2>Links</h2>
          <a href="./home.html">Home</a>
          <a href="./createTask.html">Criar Tarefa</a>
          <a href="./perfil.html">Perfil</a>
        </div>
      </div>
      <p class="footerBottom">© 2026 PMW Tasks — Projeto acadêmico</p>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
