// Data atual para salvar dados (Dia do mês)
const today = new Date().getDate();

// =================== FUNÇÕES PRINCIPAIS ===================

// Troca de tema
document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");


// =================== TEMPO COM DEUS (Personalizado) ===================

const bibleBooks = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel", 
    "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester", "Jó", "Salmos", "Provérbios", 
    "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel", "Oseias", "Joel", 
    "Amós", "Obadias", "Jonas", "Miqueias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias",
    // Novo Testamento
    "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", 
    "Filipenses", "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", 
    "Filemom", "Hebreus", "Tiago", "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse"
];

const bibleBookSelect = document.getElementById("bible-book");
const bibleChapterInput = document.getElementById("bible-chapter");
const reflectionTextarea = document.getElementById("reflection");

// 1. Popular a lista de livros
bibleBooks.forEach(book => {
    const option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    bibleBookSelect.appendChild(option);
});

// 2. Carregar dados de Fé salvos para o dia atual
function loadFaithData() {
    const savedFaithData = localStorage.getItem(`faith-data-${today}`);
    if (savedFaithData) {
        try {
            const data = JSON.parse(savedFaithData);
            // Seleciona o livro (se o livro existir no array)
            if (bibleBooks.includes(data.book)) {
                bibleBookSelect.value = data.book;
            } else if (data.book) {
                 // Adiciona a opção se não estiver na lista (para evitar perda de dados antigos/personalizados)
                 const option = new Option(data.book, data.book, true, true);
                 bibleBookSelect.appendChild(option);
            }
            bibleChapterInput.value = data.chapter || '';
            reflectionTextarea.value = data.reflection || '';
        } catch (e) {
            console.error("Erro ao carregar dados de fé salvos:", e);
        }
    } else {
        // Limpa os campos se não houver dados salvos
        bibleBookSelect.selectedIndex = 0; // Volta para o primeiro livro
        bibleChapterInput.value = '';
        reflectionTextarea.value = '';
    }
}

// 3. Função de Salvar Leitura e Reflexão
document.getElementById("save-reflection").addEventListener("click", () => {
    const dataToSave = {
        book: bibleBookSelect.value,
        chapter: bibleChapterInput.value.trim(),
        reflection: reflectionTextarea.value.trim()
    };
    
    if (!dataToSave.book) {
        alert("Por favor, selecione o Livro lido.");
        return;
    }

    localStorage.setItem(`faith-data-${today}`, JSON.stringify(dataToSave));
    alert("Leitura e Reflexão salvas para o dia " + today + "!");
});

// Carrega os dados ao iniciar a página
loadFaithData();


// =================== FINANÇAS (Cálculo Dinâmico) ===================

const budgetInput = document.getElementById("budget");
const expenseList = document.getElementById("expense-list");
const remainingBudgetSpan = document.getElementById("remaining-budget");
const totalSpentSpan = document.getElementById("total-spent");
const essentialSpentSpan = document.getElementById("essential-spent");

// Carregar orçamento salvo (se houver)
const savedBudget = localStorage.getItem('budget');
if (savedBudget) {
    budgetInput.value = savedBudget;
}

// Salvar orçamento ao alterar
budgetInput.addEventListener('change', () => {
    localStorage.setItem('budget', budgetInput.value);
    updateFinanceSummary();
});

function calculateFinanceSummary() {
    let totalSpent = 0;
    let essentialSpent = 0;
    const currentBudget = parseFloat(budgetInput.value) || 0;

    // Iterar sobre todos os campos de valor e tipo na tabela
    expenseList.querySelectorAll('tr').forEach(row => {
        const valueInput = row.querySelector('input[type="number"]');
        const selectNecessary = row.querySelector('select');

        const value = parseFloat(valueInput ? valueInput.value : 0) || 0;
        const isNecessary = selectNecessary ? selectNecessary.value === 'Sim' : false;

        totalSpent += value;
        if (isNecessary) {
            essentialSpent += value;
        }
    });

    const remaining = currentBudget - totalSpent;
    return { remaining, totalSpent, essentialSpent };
}

function updateFinanceSummary() {
    const { remaining, totalSpent, essentialSpent } = calculateFinanceSummary();

    // Formatação para R$ (BR)
    const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

    remainingBudgetSpan.textContent = formatCurrency(remaining);
    totalSpentSpan.textContent = formatCurrency(totalSpent);
    essentialSpentSpan.textContent = formatCurrency(essentialSpent);

    // Estilo visual para orçamento negativo
    remainingBudgetSpan.style.color = remaining < 0 ? '#d9534f' : 'var(--accent)';
}

// Função para monitorar alterações na linha de gastos (valor e necessário)
function monitorExpenseChanges(row) {
    row.querySelectorAll('input[type="number"], select').forEach(element => {
        element.addEventListener('input', updateFinanceSummary);
        element.addEventListener('change', updateFinanceSummary);
    });
}

// Finanças - Adicionar Gasto - ATUALIZADO com data-label para responsividade
document.getElementById("add-expense").addEventListener("click", () => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td data-label="Data">${new Date().toLocaleDateString()}</td>
        <td data-label="Descrição"><input type="text" placeholder="Descrição"></td>
        <td data-label="Valor (R$)"><input type="number" placeholder="0.00" value="0.00" min="0"></td>
        <td data-label="Necessário?"><select><option>Não</option><option>Sim</option></select></td>
        <td data-label="Observação / Reflexão"><input type="text" placeholder="O que faria diferente?"></td>
        <td data-label="Ação"><button class="remove">🗑️</button></td>
    `;
    expenseList.appendChild(row);
    monitorExpenseChanges(row); 
    updateFinanceSummary();
});

// Remove Gasto
document.addEventListener("click", e => {
    if (e.target.classList.contains("remove")) {
        e.target.closest("tr").remove();
        updateFinanceSummary(); 
    }
});

// Inicializa o resumo ao carregar
updateFinanceSummary();


// =================== PROGRESSO DIÁRIO ===================
const progressTable = document.getElementById("daily-progress");

// ATUALIZADO com data-label para responsividade
for (let i = 1; i <= 30; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td data-label="Dia">${i}</td>
        <td data-label="Finanças"><input type="checkbox" class="check" data-day="${i}" data-cat="finance"></td>
        <td data-label="Deus"><input type="checkbox" class="check" data-day="${i}" data-cat="faith"></td>
        <td data-label="Treino"><input type="checkbox" class="check" data-day="${i}" data-cat="workout"></td>
        <td data-label="Alimentação"><input type="checkbox" class="check" data-day="${i}" data-cat="diet"></td>
        <td data-label="Pontos" class="points">0</td>
    `;
    progressTable.appendChild(tr);
}

document.querySelectorAll(".check").forEach(chk => {
    // Carrega o estado salvo
    const day = chk.dataset.day;
    const cat = chk.dataset.cat;
    if (localStorage.getItem(`day-${day}-${cat}`) === 'checked') {
        chk.checked = true;
    }
    
    chk.addEventListener("change", (e) => {
        updatePoints();
        // Salva o novo estado
        localStorage.setItem(`day-${day}-${cat}`, e.target.checked ? 'checked' : 'unchecked');
    });
});

function updatePoints() {
    document.querySelectorAll("#daily-progress tr").forEach(row => {
        const checks = row.querySelectorAll(".check");
        const pointsCell = row.querySelector(".points");
        if (pointsCell) pointsCell.textContent = [...checks].filter(c => c.checked).length;
    });
}
updatePoints();


// =================== SAÚDE (Água e Modais) ===================
document.getElementById("save-health").addEventListener("click", () => {
    const water = parseFloat(document.getElementById("water").value) || 0;
    localStorage.setItem("water-" + today, water);
    document.getElementById("health-progress").textContent = `💧 Você bebeu ${water}L hoje!`;
});

// Carregar água salva para o dia atual
const savedWater = localStorage.getItem("water-" + today);
if (savedWater) {
    document.getElementById("water").value = savedWater;
    document.getElementById("health-progress").textContent = `💧 Você bebeu ${savedWater}L hoje!`;
}

// Lógica de Modais
const workoutModal = document.getElementById('workout-modal');
const cheatMealModal = document.getElementById('cheat-meal-modal');
const dailyDietModal = document.getElementById('daily-diet-modal');

document.getElementById('view-workout').addEventListener('click', () => { workoutModal.style.display = 'block'; });
document.getElementById('view-cheat-meal-tips').addEventListener('click', () => { cheatMealModal.style.display = 'block'; });
document.getElementById('view-daily-diet').addEventListener('click', () => { dailyDietModal.style.display = 'block'; });

document.querySelectorAll('.modal .close-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});


// =================== EVOLUÇÃO (Galeria de Fotos) ===================
document.getElementById('photo-upload').addEventListener('change', (e) => {
    const gallery = document.getElementById('photo-gallery');
    [...e.target.files].forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const item = document.createElement('div');
                item.classList.add('photo-item');
                item.innerHTML = `<img src="${event.target.result}" alt="Foto de progresso">`;
                gallery.appendChild(item);
                // Nota: A persistência de fotos exigiria um backend/serviço externo.
            };
            reader.readAsDataURL(file);
        }
    });
});


// =================== EXPORTAÇÃO GERAL DE TODOS OS DADOS ===================

document.getElementById("export-all-data").addEventListener("click", exportAllDataToCSV);

function exportAllDataToCSV() {
    let csvContent = "";
    
    // ------------------------------------------------------------------------
    // SEÇÃO 1: FINANÇAS (GASTOS DETALHADOS)
    // ------------------------------------------------------------------------
    csvContent += "=== FINANÇAS - GASTOS DETALHADOS ===\n";
    
    const financeTable = document.querySelector("#finance table");
    const financeRows = financeTable.querySelectorAll("tr");

    // Cabeçalho de Finanças
    const financeHeaders = [];
    financeTable.querySelectorAll("th").forEach(th => {
        if (th.textContent.trim() !== 'Ação') {
            financeHeaders.push(`"${th.textContent.trim().replace(/\s/g, ' ')}"`);
        }
    });
    csvContent += financeHeaders.join(";") + "\n";

    // Linhas de Finanças
    financeRows.forEach((row, index) => {
        if (index === 0) return; // Pula a linha do cabeçalho
        
        // Obtém os dados dos inputs/selects em tempo real
        const dateCell = row.querySelector('td:nth-child(1)').textContent.trim();
        const descriptionInput = row.querySelector('td:nth-child(2) input').value.trim();
        const valueInput = row.querySelector('td:nth-child(3) input').value.trim().replace('.', ','); 
        const necessarySelect = row.querySelector('td:nth-child(4) select').value.trim();
        const observationInput = row.querySelector('td:nth-child(5) input').value.trim();

        const rowData = [];
        rowData.push(`"${dateCell}"`);
        rowData.push(`"${descriptionInput}"`);
        rowData.push(valueInput); // Valores numéricos sem aspas para cálculo
        rowData.push(`"${necessarySelect}"`);
        rowData.push(`"${observationInput.replace(/"/g, '""')}"`); // Escapa as aspas internas
        
        csvContent += rowData.join(";") + "\n";
    });
    
    csvContent += "\n\n"; // Espaço entre as seções

    // ------------------------------------------------------------------------
    // SEÇÃO 2: TEMPO COM DEUS (REFLEXÕES SALVAS)
    // ------------------------------------------------------------------------
    csvContent += "=== TEMPO COM DEUS - REFLEXÕES ===\n";
    csvContent += "Dia;Livro Lido;Capítulo/Versículo;Reflexão Salva\n";

    for (let i = 1; i <= 30; i++) {
        const savedFaithData = localStorage.getItem(`faith-data-${i}`);
        let book = "Não lido";
        let chapter = "N/A";
        let reflection = "Nenhuma reflexão salva";
        
        if (savedFaithData) {
            try {
                const data = JSON.parse(savedFaithData);
                book = data.book || "Não informado";
                chapter = data.chapter || "N/A";
                reflection = data.reflection || "Nenhuma reflexão salva";
            } catch (e) {
                // Caso o dado salvo esteja corrompido
            }
        }
        
        // Escapa as aspas e quebras de linha na reflexão para o formato CSV
        const cleanReflection = reflection.replace(/"/g, '""').replace(/\n/g, ' | ');
        
        csvContent += `${i};"${book}";"${chapter}";"${cleanReflection}"\n`;
    }
    csvContent += "\n\n"; 

    // ------------------------------------------------------------------------
    // SEÇÃO 3: PROGRESSO DIÁRIO (CHECKLIST E PONTOS)
    // ------------------------------------------------------------------------
    csvContent += "=== PROGRESSO DIÁRIO - PONTOS ===\n";
    csvContent += "Dia;Finanças (OK);Deus (OK);Treino (OK);Dieta (OK);Total Pontos;Água (Litros)\n";

    const progressRows = progressTable.querySelectorAll("tr");

    progressRows.forEach((row, index) => {
        if (index === 0) return; // Pula a linha do cabeçalho
        
        const day = row.querySelector('td:nth-child(1)').textContent.trim();
        
        const financeCheck = row.querySelector('[data-cat="finance"]').checked ? 'Sim' : 'Não';
        const faithCheck = row.querySelector('[data-cat="faith"]').checked ? 'Sim' : 'Não';
        const workoutCheck = row.querySelector('[data-cat="workout"]').checked ? 'Sim' : 'Não';
        const dietCheck = row.querySelector('[data-cat="diet"]').checked ? 'Sim' : 'Não';
        const points = row.querySelector('.points').textContent.trim();
        
        // Incluir consumo de água
        const savedWater = localStorage.getItem(`water-${day}`) || '0';
        
        const rowData = [day, financeCheck, faithCheck, workoutCheck, dietCheck, points, savedWater.replace('.', ',')];
        
        csvContent += rowData.join(";") + "\n";
    });

    // ------------------------------------------------------------------------
    // FINALIZAÇÃO
    // ------------------------------------------------------------------------
    
    // Criação e download do arquivo CSV
    const finalContent = '\uFEFF' + csvContent; // Adiciona BOM para garantir UTF-8 no Excel
    const blob = new Blob([finalContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `resumo-desafio-30-dias-${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Todos os dados do desafio foram exportados para um arquivo CSV!");
}


// =================== RESET ===================
document.getElementById("reset-data").addEventListener("click", () => {
    if (confirm("Deseja reiniciar todo o desafio? Atenção: a lista de gastos atual, reflexões e todo o progresso serão perdidos. (O tema e o orçamento inicial não serão perdidos).")) {
        // Limpar apenas os dados temporários e de progresso, mantendo o tema e orçamento
        for (let i = 1; i <= 30; i++) {
            localStorage.removeItem(`reflection-${i}`); // Formato antigo
            localStorage.removeItem(`faith-data-${i}`); // Novo formato
            localStorage.removeItem(`water-${i}`);
            ['finance', 'faith', 'workout', 'diet'].forEach(cat => {
                localStorage.removeItem(`day-${i}-${cat}`);
            });
        }
        // Limpa a tabela de gastos (os dados da tabela não persistem entre sessões, mas recarregar garante a limpeza visual)
        expenseList.innerHTML = '';
        updateFinanceSummary();
        location.reload();
    }
});