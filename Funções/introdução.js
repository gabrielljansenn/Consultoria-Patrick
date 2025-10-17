// =====================================================
// 📘 INTRODUÇÃO ÀS FUNÇÕES EM JAVASCRIPT
// =====================================================
//
// Em JavaScript, funções são blocos de código que executam uma tarefa específica.
// Elas servem para evitar repetição de código, deixar o programa mais organizado
// e facilitar a manutenção.
//
// Podemos pensar nelas como “receitas”: você passa ingredientes (parâmetros),
// a função segue o passo a passo e retorna um resultado.
//
// =====================================================
// 🧩 1. DECLARANDO UMA FUNÇÃO SIMPLES
// =====================================================

function dizerOla() {
    console.log("Olá! Seja bem-vindo ao mundo das funções 🚀");
  }
  
  // Chamando (executando) a função:
  dizerOla();
  
  // ➜ “function” é a palavra reservada usada para criar uma função.
  // ➜ “dizerOla” é o nome da função (evite espaços e use camelCase).
  // ➜ Os parênteses “()” indicam que é uma função sendo chamada.
  
  
  // =====================================================
  // ⚙️ 2. FUNÇÕES COM PARÂMETROS (ENTRADAS)
  // =====================================================
  //
  // Podemos passar valores para a função através de parâmetros.
  // Eles são como “variáveis internas” que só existem dentro da função.
  
  function somar(a, b) {
    return a + b;
  }
  
  const resultado = somar(5, 7);
  console.log("Resultado da soma:", resultado);
  
  // ➜ “a” e “b” são parâmetros.
  // ➜ “return” devolve um valor para quem chamou a função.
  
  
  // =====================================================
  // 🎯 3. FUNÇÕES COM RETORNO E SEM RETORNO
  // =====================================================
  //
  // Algumas funções retornam algo (como a soma acima).
  // Outras apenas executam uma ação, sem devolver valor.
  
  function mostrarMensagem(nome) {
    console.log(`Olá, ${nome}!`);
  }
  
  mostrarMensagem("Gabriel"); // Exibe: Olá, Gabriel!
  
  // ➜ Essa função NÃO tem “return”, então ela não devolve nada, apenas mostra algo no console.
  
  
  // =====================================================
  // 🧠 4. ARROW FUNCTIONS (FUNÇÕES DE SETA)
  // =====================================================
  //
  // São uma forma mais curta e moderna de escrever funções.
  // Muito usada em projetos com Node.js e React, por exemplo.
  
  const multiplicar = (x, y) => {
    return x * y;
  };
  
  console.log("Multiplicação:", multiplicar(3, 4));
  
  // ➜ Se o corpo da função tiver apenas uma linha, dá pra deixar ainda mais curto:
  const dobrar = n => n * 2;
  console.log("Dobro:", dobrar(6));
  
  
  // =====================================================
  // 🔒 5. ESCOPO DE VARIÁVEIS EM FUNÇÕES
  // =====================================================
  //
  // Variáveis criadas dentro de uma função só existem dentro dela.
  
  function testeEscopo() {
    const mensagem = "Sou visível apenas aqui dentro!";
    console.log(mensagem);
  }
  
  testeEscopo();
  // console.log(mensagem); ❌ Isso daria erro, pois “mensagem” só existe dentro da função.
  
  
  // =====================================================
  // 🧮 6. FUNÇÕES ANÔNIMAS E CALLBACKS
  // =====================================================
  //
  // Funções também podem ser armazenadas em variáveis.
  // Isso é útil para passar funções como “argumentos” de outras funções.
  
  const saudacao = function(nome) {
    return `Olá, ${nome}!`;
  };
  
  console.log(saudacao("Maria"));
  
  // Exemplo de callback (função passada como argumento)
  function executarAcao(acao, valor) {
    console.log("Executando ação...");
    console.log(acao(valor));
  }
  
  executarAcao(dobrar, 10); // Passa a função “dobrar” como argumento
  