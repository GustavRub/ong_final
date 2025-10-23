// main.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('SPA carregado com sucesso');

  const links = document.querySelectorAll('nav a');
  const main = document.querySelector('main');
  const toggleThemeBtn = document.getElementById('toggle-theme');

  // --- Alternância de tema (modo escuro)
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // Salvar preferência no localStorage
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('tema', isDark ? 'dark' : 'light');
    });
  }

  // --- Manter tema salvo ao recarregar
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // --- Função de carregar páginas (SPA)
  async function carregarPagina(url) {
    try {
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error('Não foi possível carregar: ' + resposta.status);
      const texto = await resposta.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(texto, 'text/html');
      const novoMain = doc.querySelector('main');

      if (novoMain) {
        main.innerHTML = novoMain.innerHTML;
        console.log(`Conteúdo de ${url} carregado com sucesso.`);

        // Recarrega validação se o formulário aparecer
        if (window.inicializarValidacao) window.inicializarValidacao();
      } else {
        main.innerHTML = '<p>Conteúdo não encontrado na página.</p>';
      }
    } catch (err) {
      console.error(err);
      main.innerHTML = '<p>Erro ao carregar a página. Veja o console para detalhes.</p>';
    }
  }

  // --- Interceptar cliques nos links de navegação
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (!url || url.startsWith('http')) return; // ignora links externos
      e.preventDefault();
      carregarPagina(url);
      history.pushState(null, '', url);
    });
  });

  // --- Suporte ao botão "Voltar" do navegador
  window.addEventListener('popstate', () => {
    const url = location.pathname.split('/').pop() || 'index.html';
    carregarPagina(url);
  });
});
