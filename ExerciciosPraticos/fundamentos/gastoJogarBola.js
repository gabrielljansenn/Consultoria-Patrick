// 💡 Aprender programação é difícil, e às vezes dá vontade de pedir pra IA fazer tudo por nós.
// Mas o objetivo aqui não é só ter o resultado, é aprender o caminho até ele.
// Pesquise, teste, erre e tente de novo. É assim que você evolui e chega na sua primeira vaga em TI! 🚀

// Fique livre para me perguntar sobre qualquer assunto pelo Whatsapp, estarei disponível para te ajudar!

// ==========================================================
// 🏎️ Projeto: Cálculo de gasto de combustível para jogar bola
// ==========================================================
//
// Objetivo: Usar variáveis, objetos e operações matemáticas
// para calcular quanto custa ir jogar bola de carro.
//
// Conceitos que vamos aprender:
// - Declaração de variáveis (let e const)
// - Tipos primitivos (number, string, boolean)
// - Objetos e propriedades
// - Operações matemáticas
// - Interpolação de strings (template literals)
// - Introdução a funções
// ==========================================================


// ===============================
// 🚗 Definindo variáveis base
// ===============================

// `const` → usado para valores que NÃO mudam no programa.
const distanciaAteOCampo = 30; // tipo: number (representa um valor numérico em km)

// `let` → usado quando o valor pode mudar.
let numeroDeViagens = 1; // tipo: number


// ===============================
// 🚘 Criando um objeto para representar o carro
// ===============================
//
// Um objeto é uma estrutura que agrupa informações relacionadas.
// Ele tem propriedades (nome, kmPorLitro).
//
const carro = {
  nome: "Onix",       // tipo: string → sequência de caracteres
  kmPorLitro: 12,     // tipo: number → consumo médio de combustível
};


// ===============================
// ⛽ Preço do combustível
// ===============================
const precoCombustivel = 6.10;


// ===============================
// 🧮 Cálculos
// ===============================
//
// Aqui usamos operações matemáticas básicas:
// + (adição), - (subtração), * (multiplicação), / (divisão)
//
const distanciaTotal = distanciaAteOCampo * 2;
const kmTotal = distanciaTotal * numeroDeViagens;
const litrosGastos = kmTotal / carro.kmPorLitro;
const custoTotal = litrosGastos * precoCombustivel;


// ===============================
// 📊 Exibição do resultado
// ===============================
//
// Usamos `console.log()` para exibir informações no terminal.
//
console.log(`🏁 Carro: ${carro.nome}`);
console.log(`🚗 Distância total: ${kmTotal} km`);
console.log(`⛽ Gasto total de combustível: ${litrosGastos.toFixed(2)} litros`);
console.log(`💰 Custo total: R$ ${custoTotal.toFixed(2)}`);

// ===============================
// 🧠 Desafios e exercícios
// ===============================
//
// 1️⃣ Mude o número de viagens e veja como isso afeta o custo total.
// 2️⃣ Crie outro carro (ex: "Civic", "Uno") e troque o objeto `carro` para comparar.
// 3️⃣ Adicione uma variável para o preço do pedágio e inclua no cálculo total.


// ===============================
// 🧠 Funções em JavaScript
// ===============================
//
// Uma função é um bloco de código reutilizável que executa uma tarefa específica.
// Você pode “chamar” a função quantas vezes quiser, passando valores diferentes.
//
// Sintaxe básica:
//
// function nomeDaFuncao(param1, param2) {
//   // código que a função executa
//   return resultado; // opcional — usado quando queremos devolver um valor
// }
//
// Exemplo prático abaixo 👇
// ===============================

function calcularGasto(distancia, viagens, carro, precoCombustivel) {
  // Multiplica a distância (ida e volta) pelo número de viagens
  const kmTotal = distancia * 2 * viagens;

  // Divide a distância total pelo consumo do carro (km/l)
  const litros = kmTotal / carro.kmPorLitro;

  // Calcula o custo total
  const custo = litros * precoCombustivel;

  // Retorna o valor calculado para quem chamou a função
  return custo;
}

// Chamando (executando) a função e exibindo o resultado
const gastoComOnix = calcularGasto(30, 4, carro, 6.10);
console.log(`\n🔹 Gasto calculado pela função: R$ ${gastoComOnix.toFixed(2)}`);


// ===============================
// 💪 Desafio Extra!
// ===============================
//
// 4️⃣ Crie uma função chamada `compararCarros()` que receba DOIS carros diferentes
//     e diga qual deles é mais econômico no cálculo total.
//     - A função deve usar `calcularGasto()` dentro dela.
//
// Exemplo do que ela poderia mostrar no console:
// "O carro Uno é mais econômico (R$ 50.40) do que o Onix (R$ 61.00)"
//
// Dica: use if/else para comparar os resultados.
// ==========================================================
