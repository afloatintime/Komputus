document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os eventos
    document.getElementById('functionSelect').addEventListener('change', showInputs);
    document.getElementById('calculateBtn').addEventListener('click', calculate);
    
    // Inicializa o segundo select de opções quando existir
    const subOptionSelect = document.getElementById('subOptionSelect');
    if (subOptionSelect) {
        subOptionSelect.addEventListener('change', updateInputFields);
    }
    
    // Limpa os inputs inicialmente
    showInputs();
});

/**
 * Exibe os campos de entrada apropriados com base na função selecionada
 */
function showInputs() {
    const functionSelect = document.getElementById('functionSelect');
    const inputsDiv = document.getElementById('inputs');
    const resultDiv = document.getElementById('result');
    const subOptionDiv = document.getElementById('subOptionDiv');
    const subOptionSelect = document.getElementById('subOptionSelect');
    
    // Limpa os resultados anteriores
    resultDiv.textContent = '';
    
    // Limpa os inputs anteriores
    inputsDiv.innerHTML = '';
    
    // Inicialmente esconde o seletor de sub-opções
    subOptionDiv.style.display = 'none';
    subOptionSelect.innerHTML = '<option value="">Selecione o que deseja calcular</option>';
    
    // Adiciona os inputs de acordo com a função selecionada
    switch (functionSelect.value) {
        case 'quadratica':
            inputsDiv.innerHTML = `
                <div class="field-group">
                    <input type="number" id="a" placeholder="Coeficiente a" step="any" required>
                    <input type="number" id="b" placeholder="Coeficiente b" step="any" required>
                    <input type="number" id="c" placeholder="Coeficiente c" step="any" required>
                </div>
                <p class="hint">Formato: ax² + bx + c = 0</p>
            `;
            break;
        case 'modular':
            inputsDiv.innerHTML = `
                <input type="number" id="x" placeholder="Valor de x" step="any" required>
                <p class="hint">Calcula o valor absoluto de x</p>
            `;
            break;
        case 'exponencial':
            inputsDiv.innerHTML = `
                <input type="number" id="base" placeholder="Base" step="any" required>
                <input type="number" id="expoente" placeholder="Expoente" step="any" required>
                <p class="hint">Calcula base^expoente</p>
            `;
            break;
        case 'logaritmica':
            inputsDiv.innerHTML = `
                <input type="number" id="logBase" placeholder="Base do logaritmo" step="any" required>
                <input type="number" id="logValue" placeholder="Valor" step="any" required>
                <p class="hint">Calcula log_base(valor)</p>
            `;
            break;
        case 'pa':
            // Mostra e preenche o segundo select para P.A.
            subOptionDiv.style.display = 'block';
            subOptionSelect.innerHTML = `
                <option value="">Selecione o que deseja calcular</option>
                <option value="termo">Termo da P.A.</option>
                <option value="razao">Razão da P.A.</option>
                <option value="primeiro-termo">Primeiro Termo da P.A.</option>
                <option value="gerar-termos">Gerar Termos da P.A.</option>
            `;
            inputsDiv.innerHTML = '<p class="hint">Selecione o que deseja calcular para ver os campos necessários</p>';
            break;
        case 'pa-soma':
            // Mostra e preenche o segundo select para Soma da P.A.
            subOptionDiv.style.display = 'block';
            subOptionSelect.innerHTML = `
                <option value="">Selecione o que deseja calcular</option>
                <option value="soma-n-termos">Soma dos n primeiros termos</option>
                <option value="soma-termos-conhecidos">Soma entre dois termos conhecidos</option>
            `;
            inputsDiv.innerHTML = '<p class="hint">Selecione o que deseja calcular para ver os campos necessários</p>';
            break;
        default:
            inputsDiv.innerHTML = '<p class="hint">Selecione uma função para começar</p>';
            break;
    }
    
    // Adiciona eventos de tecla para os novos inputs
    addEnterKeyListeners();
}

/**
 * Atualiza os campos de entrada com base na sub-opção selecionada
 */
function updateInputFields() {
    const subOptionSelect = document.getElementById('subOptionSelect');
    const inputsDiv = document.getElementById('inputs');
    
    if (!subOptionSelect || !subOptionSelect.value) {
        return;
    }
    
    // Limpa os inputs anteriores
    inputsDiv.innerHTML = '';
    
    // Adiciona campos específicos baseados na sub-opção
    switch (subOptionSelect.value) {
        case 'termo':
            inputsDiv.innerHTML = `
                <input type="number" id="a1" placeholder="Primeiro termo (a₁)" step="any" required>
                <input type="number" id="r" placeholder="Razão (r)" step="any" required>
                <input type="number" id="n" placeholder="Posição do termo (n)" step="1" min="1" required>
                <p class="formula">Fórmula: aₙ = a₁ + (n - 1) × r</p>
                <p class="hint">Calcula o termo de posição n na P.A.</p>
            `;
            break;
        case 'razao':
            inputsDiv.innerHTML = `
                <div class="field-group">
                    <input type="number" id="termoA" placeholder="Termo conhecido (aₓ)" step="any" required>
                    <input type="number" id="posA" placeholder="Posição do termo (x)" step="1" min="1" required>
                </div>
                <div class="field-group">
                    <input type="number" id="termoB" placeholder="Outro termo (aᵧ)" step="any" required>
                    <input type="number" id="posB" placeholder="Posição do termo (y)" step="1" min="1" required>
                </div>
                <p class="formula">Fórmula: r = (aᵧ - aₓ) ÷ (y - x)</p>
                <p class="hint">Calcula a razão da P.A. usando dois termos conhecidos</p>
            `;
            break;
        case 'primeiro-termo':
            inputsDiv.innerHTML = `
                <input type="number" id="an" placeholder="Termo conhecido (aₙ)" step="any" required>
                <input type="number" id="n" placeholder="Posição do termo (n)" step="1" min="1" required>
                <input type="number" id="r" placeholder="Razão (r)" step="any" required>
                <p class="formula">Fórmula: a₁ = aₙ - (n - 1) × r</p>
                <p class="hint">Calcula o primeiro termo da P.A.</p>
            `;
            break;
        case 'gerar-termos':
            inputsDiv.innerHTML = `
                <input type="number" id="a1" placeholder="Primeiro termo (a₁)" step="any" required>
                <input type="number" id="r" placeholder="Razão (r)" step="any" required>
                <input type="number" id="quantidade" placeholder="Quantidade de termos" step="1" min="1" max="100" required>
                <p class="hint">Gera uma lista com os termos da P.A.</p>
            `;
            break;
        case 'soma-n-termos':
            inputsDiv.innerHTML = `
                <input type="number" id="a1" placeholder="Primeiro termo (a₁)" step="any" required>
                <input type="number" id="r" placeholder="Razão (r)" step="any" required>
                <input type="number" id="n" placeholder="Número de termos (n)" step="1" min="1" required>
                <p class="formula">Fórmula: Sₙ = [n × (a₁ + aₙ)] ÷ 2   ou   Sₙ = [n × (2a₁ + (n-1)r)] ÷ 2</p>
                <p class="hint">Calcula a soma dos n primeiros termos da P.A.</p>
            `;
            break;
        case 'soma-termos-conhecidos':
            inputsDiv.innerHTML = `
                <div class="field-group">
                    <input type="number" id="termoA" placeholder="Termo inicial (aₚ)" step="any" required>
                    <input type="number" id="posA" placeholder="Posição do termo (p)" step="1" min="1" required>
                </div>
                <div class="field-group">
                    <input type="number" id="termoB" placeholder="Termo final (aₖ)" step="any" required>
                    <input type="number" id="posB" placeholder="Posição do termo (k)" step="1" min="1" required>
                </div>
                <p class="formula">Fórmula: Sₚₖ = [(k-p+1) × (aₚ + aₖ)] ÷ 2</p>
                <p class="hint">Calcula a soma dos termos entre as posições p e k (inclusive)</p>
            `;
            break;
    }
    
    // Adiciona eventos de tecla para os novos inputs
    addEnterKeyListeners();
}

/**
 * Adiciona event listeners para a tecla Enter nos inputs
 */
function addEnterKeyListeners() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
}

/**
 * Calcula o resultado com base na função selecionada e nos valores inseridos
 */
function calculate() {
    const functionSelect = document.getElementById('functionSelect');
    const subOptionSelect = document.getElementById('subOptionSelect');
    const resultDiv = document.getElementById('result');
    
    // Limpa classes de sucesso/erro anteriores
    resultDiv.classList.remove('success', 'error');
    
    // Verifica se uma função foi selecionada
    if (!functionSelect.value) {
        showError('Por favor, selecione uma função.');
        return;
    }
    
    // Verifica se é necessário uma sub-opção
    if ((functionSelect.value === 'pa' || functionSelect.value === 'pa-soma') && (!subOptionSelect.value)) {
        showError('Por favor, selecione o que deseja calcular.');
        return;
    }
    
    try {
        let result;
        
        // Determina qual função calcular
        if (functionSelect.value === 'pa' || functionSelect.value === 'pa-soma') {
            // Usa a sub-opção para calcular
            switch (subOptionSelect.value) {
                case 'termo':
                    result = calcularTermoPA();
                    break;
                case 'razao':
                    result = calcularRazaoPA();
                    break;
                case 'primeiro-termo':
                    result = calcularPrimeiroTermoPA();
                    break;
                case 'gerar-termos':
                    result = gerarTermosPA();
                    break;
                case 'soma-n-termos':
                    result = calcularSomaNTermosPA();
                    break;
                case 'soma-termos-conhecidos':
                    result = calcularSomaTermosConhecidosPA();
                    break;
                default:
                    showError('Opção não implementada.');
                    return;
            }
        } else {
            // Usa a função principal para calcular
            switch (functionSelect.value) {
                case 'quadratica':
                    result = calcularQuadratica();
                    break;
                case 'modular':
                    result = calcularModular();
                    break;
                case 'exponencial':
                    result = calcularExponencial();
                    break;
                case 'logaritmica':
                    result = calcularLogaritmica();
                    break;
                default:
                    showError('Função não implementada.');
                    return;
            }
        }
        
        // Exibe o resultado
        if (typeof result === 'string') {
            resultDiv.innerHTML = result;
        } else {
            resultDiv.textContent = result;
        }
        resultDiv.classList.add('success');
        
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Calcula as raízes da função quadrática
 */
function calcularQuadratica() {
    const a = getNumberFromInput('a');
    const b = getNumberFromInput('b');
    const c = getNumberFromInput('c');
    
    if (a === 0) {
        throw new Error('O coeficiente "a" não pode ser zero (não seria uma equação quadrática).');
    }
    
    const discriminante = b * b - 4 * a * c;
    
    if (discriminante < 0) {
        return "Não há raízes reais.";
    } else if (discriminante === 0) {
        const raiz = -b / (2 * a);
        return `Raiz única: ${formatarNumero(raiz)}`;
    } else {
        const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        return `Raízes: x₁ = ${formatarNumero(raiz1)}, x₂ = ${formatarNumero(raiz2)}`;
    }
}

/**
 * Calcula o valor absoluto
 */
function calcularModular() {
    const x = getNumberFromInput('x');
    return `Valor absoluto: |${x}| = ${Math.abs(x)}`;
}

/**
 * Calcula potenciação
 */
function calcularExponencial() {
    const base = getNumberFromInput('base');
    const expoente = getNumberFromInput('expoente');
    
    return `${base}^${expoente} = ${formatarNumero(Math.pow(base, expoente))}`;
}

/**
 * Calcula logaritmo
 */
function calcularLogaritmica() {
    const base = getNumberFromInput('logBase');
    const valor = getNumberFromInput('logValue');
    
    if (base <= 0 || base === 1) {
        throw new Error('A base do logaritmo deve ser maior que 0 e diferente de 1.');
    }
    
    if (valor <= 0) {
        throw new Error('O valor deve ser maior que 0.');
    }
    
    const resultado = Math.log(valor) / Math.log(base);
    return `log_${base}(${valor}) = ${formatarNumero(resultado)}`;
}

/**
 * Calcula o termo da P.A.
 */
function calcularTermoPA() {
    const a1 = getNumberFromInput('a1');
    const r = getNumberFromInput('r');
    const n = getNumberFromInput('n');
    
    if (n <= 0 || !Number.isInteger(n)) {
        throw new Error('A posição do termo deve ser um número inteiro positivo.');
    }
    
    const an = a1 + (n - 1) * r;
    return `O ${n}º termo da P.A. é: ${formatarNumero(an)}`;
}

/**
 * Calcula a razão da P.A.
 */
function calcularRazaoPA() {
    const termoA = getNumberFromInput('termoA');
    const posA = getNumberFromInput('posA');
    const termoB = getNumberFromInput('termoB');
    const posB = getNumberFromInput('posB');
    
    if (posA <= 0 || !Number.isInteger(posA) || posB <= 0 || !Number.isInteger(posB)) {
        throw new Error('As posições dos termos devem ser números inteiros positivos.');
    }
    
    if (posA === posB) {
        throw new Error('As posições dos termos devem ser diferentes.');
    }
    
    const r = (termoB - termoA) / (posB - posA);
    return `A razão da P.A. é: ${formatarNumero(r)}`;
}

/**
 * Calcula o primeiro termo da P.A.
 */
function calcularPrimeiroTermoPA() {
    const an = getNumberFromInput('an');
    const n = getNumberFromInput('n');
    const r = getNumberFromInput('r');
    
    if (n <= 0 || !Number.isInteger(n)) {
        throw new Error('A posição do termo deve ser um número inteiro positivo.');
    }
    
    const a1 = an - (n - 1) * r;
    return `O primeiro termo da P.A. é: ${formatarNumero(a1)}`;
}

/**
 * Gera os termos da P.A.
 */
function gerarTermosPA() {
    const a1 = getNumberFromInput('a1');
    const r = getNumberFromInput('r');
    const quantidade = getNumberFromInput('quantidade');
    
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        throw new Error('A quantidade de termos deve ser um número inteiro positivo.');
    }
    
    if (quantidade > 100) {
        throw new Error('Por favor, insira no máximo 100 termos para evitar sobrecarga.');
    }
    
    const termos = [];
    for (let i = 0; i < quantidade; i++) {
        termos.push(a1 + i * r);
    }
    
    // Cria uma tabela HTML para mostrar os termos
    let html = `<div>Termos da P.A. com a₁ = ${formatarNumero(a1)} e r = ${formatarNumero(r)}:</div>`;
    html += '<table class="pa-table"><tr><th>Posição</th><th>Termo</th></tr>';
    
    for (let i = 0; i < termos.length; i++) {
        html += `<tr><td>${i + 1}</td><td>${formatarNumero(termos[i])}</td></tr>`;
    }
    
    html += '</table>';
    
    return html;
}

/**
 * Calcula a soma dos n primeiros termos da P.A.
 */
function calcularSomaNTermosPA() {
    const a1 = getNumberFromInput('a1');
    const r = getNumberFromInput('r');
    const n = getNumberFromInput('n');
    
    if (n <= 0 || !Number.isInteger(n)) {
        throw new Error('O número de termos deve ser um número inteiro positivo.');
    }
    
    // Calcula o último termo
    const an = a1 + (n - 1) * r;
    
    // Calcular a soma usando a fórmula Sn = (n/2) * (a1 + an)
    const soma = (n / 2) * (a1 + an);
    
    return `A soma dos ${n} primeiros termos da P.A. é: ${formatarNumero(soma)}`;
}

/**
 * Calcula a soma dos termos entre duas posições conhecidas
 */
function calcularSomaTermosConhecidosPA() {
    const termoA = getNumberFromInput('termoA');
    const posA = getNumberFromInput('posA');
    const termoB = getNumberFromInput('termoB');
    const posB = getNumberFromInput('posB');
    
    if (posA <= 0 || !Number.isInteger(posA) || posB <= 0 || !Number.isInteger(posB)) {
        throw new Error('As posições dos termos devem ser números inteiros positivos.');
    }
    
    if (posB < posA) {
        throw new Error('A posição final deve ser maior ou igual à posição inicial.');
    }
    
    // Número de termos entre posA e posB, inclusive
    const numTermos = posB - posA + 1;
    
    // Calcula a soma usando a fórmula S = (n/2) * (primeiro + último)
    const soma = (numTermos / 2) * (termoA + termoB);
    
    if (posA === posB) {
        return `A soma do termo na posição ${posA} é: ${formatarNumero(termoA)}`;
    } else {
        return `A soma dos termos da P.A. entre as posições ${posA} e ${posB} é: ${formatarNumero(soma)}`;
    }
}

/**
 * Obtém um valor numérico de um input e valida
 */
function getNumberFromInput(id) {
    const input = document.getElementById(id);
    
    if (!input) {
        throw new Error(`Campo ${id} não encontrado.`);
    }
    
    if (input.value.trim() === '') {
        throw new Error('Todos os campos são obrigatórios.');
    }
    
    const value = parseFloat(input.value);
    
    if (isNaN(value)) {
        throw new Error('Por favor, insira apenas valores numéricos.');
    }
    
    return value;
}

/**
 * Formata um número para exibição
 */
function formatarNumero(numero) {
    // Limita a 4 casas decimais e remove zeros à direita
    return parseFloat(numero.toFixed(4)).toString();
}

/**
 * Exibe uma mensagem de erro
 */
function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    resultDiv.classList.add('error');
    resultDiv.classList.remove('success');
}