// O código abaixo deveria calcular o lucro líquido de uma corrida,
// mas o resultado está dando algo estranho ou erro.
// Sua missão: Encontrar o erro e corrigir.

const valorDaCorrida = "20"; // O app mandou isso como texto!
const taxaDoApp = 0.25; // O app cobra 25%

// O motorista acha que vai ganhar 15, mas o código tá fazendo algo errado na matemática
const desconto = valorDaCorrida * taxaDoApp;
const lucro = valorDaCorrida + desconto; // Deveria ser menos!

console.log("Lucro da corrida: R$ " + lucro);

// PERGUNTA:
// 1. Por que o lucro deu errado na conta?
// 2. O que acontece se você mudar a variável 'valorDaCorrida' para number sem as aspas?