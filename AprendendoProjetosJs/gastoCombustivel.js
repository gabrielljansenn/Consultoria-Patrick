function compararCarros(carro1, carro2, distancia, viagens, precoCombustivel) {
const gastoCarro1 = calcularGasto(distancia, viagens, carro1, precoCombustivel);
const gastoCarro2 = calcularGasto(distancia, viagens, carro2, precoCombustivel);

if (gastoCarro1 < gastoCarro2) {
console.log(
`🚗 O carro ${carro1.nome} é mais econômico (R$ ${gastoCarro1.toFixed(2)}) do que o ${carro2.nome} (R$ ${gastoCarro2.toFixed(2)})`
);
} else if (gastoCarro2 < gastoCarro1) {
console.log(
`🚗 O carro ${carro2.nome} é mais econômico (R$ ${gastoCarro2.toFixed(2)}) do que o ${carro1.nome} (R$ ${gastoCarro1.toFixed(2)})`
);
} else {
console.log(`⚖️ Os carros ${carro1.nome} e ${carro2.nome} têm o mesmo custo (R$ ${gastoCarro1.toFixed(2)})`);
}
}

// Criando dois carros diferentes
const onix = { nome: "Onix", kmPorLitro: 12 };
const uno = { nome: "Uno", kmPorLitro: 15 };

// Chamando a função de comparação
compararCarros(onix, uno, 30, 4, 6.10);

// função relacao linha dois 
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