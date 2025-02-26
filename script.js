function showInputs() {
    const functionSelect = document.getElementById('functionSelect');
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = ''; // Limpa os inputs anteriores

    switch (functionSelect.value) {
        case 'quadratica':
            inputsDiv.innerHTML = `
                <input type="number" id="a" placeholder="Coeficiente a" required>
                <input type="number" id="b" placeholder="Coeficiente b" required>
                <input type="number" id="c" placeholder="Coeficiente c" required>
            `;
            break;
        case 'modular':
            inputsDiv.innerHTML = `
                <input type="number" id="x" placeholder="Valor de x" required>
            `;
            break;
        case 'exponencial':
            inputsDiv.innerHTML = `
                <input type="number" id="base" placeholder="Base" required>
                <input type="number" id="expoente" placeholder="Expoente" required>
            `;
            break;
        case 'logaritmica':
            inputsDiv.innerHTML = `
                <input type="number" id="logBase" placeholder="Base do logaritmo" required>
                <input type="number" id="logValue" placeholder="Valor" required>
            `;
            break;
        default:
            break;
    }
}

function calculate() {
    const functionSelect = document.getElementById('functionSelect').value;
    let result;

    switch (functionSelect) {
        case 'quadratica':
            const a = parseFloat(document.getElementById('a').value);
            const b = parseFloat(document.getElementById('b').value);
            const c = parseFloat(document.getElementById('c').value);
            const discriminante = b * b - 4 * a * c;

            if (discriminante < 0) {
                result = "Não há raízes reais.";
            } else {
                const raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
                const raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
                result = `Raízes: ${raiz1.toFixed(2)}, ${raiz2.toFixed(2)}`;
            }
            break;
        case 'modular':
            const x = parseFloat(document.getElementById('x').value);
            result = `Valor absoluto: ${Math.abs(x)}`;
            break;
        case 'exponencial':
            const base = parseFloat(document.getElementById('base').value);
            const expoente = parseFloat(document.getElementById('expoente').value);
            result = `Resultado: ${Math.pow(base, expoente)}`;
            break;
        case 'logaritmica':
            const logBase = parseFloat(document.getElementById('logBase').value);
            const logValue = parseFloat(document.getElementById('logValue').value);
            if (logBase <= 0 || logBase === 1 || logValue <= 0) {
                result = "Base do logaritmo deve ser maior que 0 e diferente de 1, e o valor deve ser maior que 0.";
            } else {
                result = `Resultado: ${Math.log(logValue) / Math.log(logBase)}`;
            }
            break;
        default:
            result = "Por favor, selecione uma função.";
            break;
    }

    document.getElementById('result').innerText = result; // Exibe o resultado
}
