//JavaScript é responsável por dar interatividade ao site.
//Ele controla o botão de mudança de tema e faz com que o site reaja quando o usuário clica nele.
//Primeiro, o código usa getElementById para acessar o botão com o ID toggle-theme.
//Depois, ele verifica se o tema escuro já estava salvo no localStorage — que é um espaço de armazenamento do navegador usado para manter informações mesmo depois que o site é fechado.
//Se o tema escuro estiver salvo, o JavaScript já aplica a classe .dark ao corpo da página e muda o ícone do botão


const toggleBtn = document.getElementById('toggle-theme');

// Verifica se há tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = '☀️ Mudar tema';
}

// Ao clicar no botão
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');
  toggleBtn.textContent = isDark ? '☀️ Mudar tema' : '🌙 Mudar tema';

  // Salva a preferência do usuário
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});



