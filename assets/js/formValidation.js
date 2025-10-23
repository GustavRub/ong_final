// formValidation.js
function validarCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}
function validarTelefone(tel) {
  return /^\(\d{2}\) \d{4,5}-\d{4}$/.test(tel);
}

function tratarEnvio(form) {
  const nome = form.nome?.value.trim() || '';
  const email = form.email?.value.trim() || '';
  const cpf = form.cpf?.value.trim() || '';
  const telefone = form.telefone?.value.trim() || '';

  const erros = [];
  if (nome.length < 3) erros.push('O nome deve ter pelo menos 3 caracteres.');
  if (!email.includes('@')) erros.push('E-mail inválido.');
  if (!validarCPF(cpf)) erros.push('CPF inválido. Formato: 000.000.000-00.');
  if (!validarTelefone(telefone)) erros.push('Telefone inválido. Formato: (11) 91234-5678.');

  if (erros.length) {
    alert('Erros:\n' + erros.join('\n'));
    return false;
  }

  // Sucesso: salva localmente e limpa
  const dados = { nome, email, cpf, telefone, data: new Date().toISOString() };
  // Se já houver uma lista, adiciona; senão cria
  const lista = JSON.parse(localStorage.getItem('cadastros') || '[]');
  lista.push(dados);
  localStorage.setItem('cadastros', JSON.stringify(lista));

  alert('Cadastro enviado com sucesso!');
  form.reset();
  return true;
}

function inicializarValidacao() {
  const form = document.querySelector('form');
  if (!form) return;
  // Remove listener antigo (se houver) e adiciona novo
  form.addEventListener('submit', function handle(event) {
    event.preventDefault();
    tratarEnvio(form);
  }, { once: false });
}

// expõe a função globalmente para o main.js poder chamar após carregar via SPA
window.inicializarValidacao = inicializarValidacao;

// inicializa agora se a página já tem o form (quando script for carregado)
document.addEventListener('DOMContentLoaded', () => {
  inicializarValidacao();
});
