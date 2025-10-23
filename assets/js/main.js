// main.js
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const main = document.querySelector('main');

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


  async function carregarPagina(url) {
    try {
      const resposta = await fetch(url);
      if (!resposta.ok) throw new Error('Não foi possível carregar: ' + resposta.status);
      const texto = await resposta.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(texto, 'text/html');
      const novo = doc.querySelector('main');
      if (novo) {
        main.innerHTML = novo.innerHTML;
        // Re-inicializar validação caso o formulário apareça
        if (window.inicializarValidacao) window.inicializarValidacao();
      } else {
        main.innerHTML = '<p>Conteúdo não encontrado na página.</p>';
      }
    } catch (err) {
      console.error(err);
      main.innerHTML = '<p>Erro ao carregar a página. Veja o console para detalhes.</p>';
    }
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      // Se link for âncora externa ou vazio, deixa normal
      if (!url || url.startsWith('http')) return;
      e.preventDefault();
      carregarPagina(url);
      history.pushState(null, '', url);
    });
  });

  // Permite voltar/avançar no histórico do navegador
  window.addEventListener('popstate', () => {
    const url = location.pathname.split('/').pop() || 'index.html';
    carregarPagina(url);
  });
});
