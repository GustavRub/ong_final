// templates.js
window.templates = (function () {
  function criarCard(titulo, descricao, imagem) {
    return `
      <div class="card">
        <img src="${imagem}" alt="${titulo}" />
        <h3>${titulo}</h3>
        <p>${descricao}</p>
      </div>
    `;
  }

  return { criarCard };
})();
