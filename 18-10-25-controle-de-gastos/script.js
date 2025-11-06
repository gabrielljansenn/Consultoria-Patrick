const calcularBtn = document.getElementById('calcular');
const resultado = document.getElementById('resultado');
const toggleTheme = document.getElementById('toggle-theme');
const ctx = document.getElementById('graficoGastos').getContext('2d');
let grafico;

// === CÁLCULO DE GASTOS ===
calcularBtn.addEventListener('click', () => {
  const distancia = parseFloat(document.getElementById('distancia').value);
  const consumo = parseFloat(document.getElementById('consumo').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (isNaN(distancia) || isNaN(consumo) || isNaN(preco) || consumo <= 0) {
    resultado.innerHTML = "⚠️ Preencha todos os campos corretamente.";
    resultado.style.color = "#ff4444";
    resultado.classList.add('mostrar');
    return;
  }

  const litrosUsados = distancia / consumo;
  const custoTotal = litrosUsados * preco;
  const custoPorKm = custoTotal / distancia;

  resultado.style.color = "inherit";
  resultado.innerHTML = `
    <p><strong>Litros necessários:</strong> ${litrosUsados.toFixed(2).replace('.', ',')} L</p>
    <p><strong>Custo total:</strong> R$ ${custoTotal.toFixed(2).replace('.', ',')}</p>
    <p><strong>Custo por km:</strong> R$ ${custoPorKm.toFixed(2).replace('.', ',')}</p>
  `;
  resultado.classList.add('mostrar');

  atualizarGrafico(litrosUsados, custoTotal);
});

// === GRÁFICO ===
function atualizarGrafico(litros, custo) {
  const isDark = document.body.classList.contains('dark');
  const textColor = isDark ? '#fff' : '#222';
  const gridColor = isDark ? '#444' : '#ccc';

  const data = {
    labels: ['Litros usados', 'Custo total (R$)'],
    datasets: [{
      label: 'Gastos da Viagem',
      data: [litros, custo],
      backgroundColor: ['#00cc66cc', '#ffd700cc'],
      borderColor: ['#00cc66', '#ffcc00'],
      borderWidth: 2,
      borderRadius: 10
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: textColor } }
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  };

  if (grafico) grafico.destroy();
  grafico = new Chart(ctx, { type: 'bar', data, options });
}

// === MODO DARK ===
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  toggleTheme.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (grafico) atualizarGrafico(grafico.data.datasets[0].data[0], grafico.data.datasets[0].data[1]);
});

// === PERSISTIR TEMA ===
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  toggleTheme.textContent = '☀️';
}
