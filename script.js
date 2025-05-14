function calculateDerivative(equation) {
    
    const result = math.sqrt(equation);
    return result; 
}

function calculateIntegral(equation) {

    const result = math.sqrt(equation);
    return result;
}

function formatter(userinput){
    
    console.log(userinput);

    const result = math.parse(userinput);
    
    console.log(result);

    return input;

}

// DOM manipulation functions
function displayResults(derivative, integral) {
    const derivativeValue = document.querySelector('.derivative-value');
    const integralValue = document.querySelector('.integral-value');
    const resultadoContainer = document.querySelector('.resultado-container');
    
    derivativeValue.textContent = derivative;
    integralValue.textContent = integral;
    resultadoContainer.style.display = 'block';
}

function clearResults() {
    document.querySelector('.derivative-value').textContent = '';
    document.querySelector('.integral-value').textContent = '';
    document.querySelector('.resultado-container').style.display = 'none';
}

// Main execution
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.querySelector('.botaoD');
    const equationInput = document.querySelector('.equation-input');
    
    calculateBtn.addEventListener('click', function() {
        const equation = formatter(equationInput.value.trim());
        
        if (!equation) {
            displayResults('Por favor insira uma equação', 'Por favor insira uma equação');
            return;
        }
        
        try {
            // Calculate both results
            const derivative = calculateDerivative(equation);
            const integral = calculateIntegral(equation);
            
            // Display them
            displayResults(
                `Derivada: d/dx(${equation}) = ${derivative}`,
                `Integral: ∫(${equation})dx = ${integral}`
            );
        } catch (error) {
            displayResults('Erro no cálculo', error.message);
        }
    });
    
    // Clear results when input changes
    equationInput.addEventListener('input', clearResults);
});