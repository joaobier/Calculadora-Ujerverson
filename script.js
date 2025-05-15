function calculateDerivative(equation) {

    try {

        const expr = math.parse(equation);
        console.log(expr.toString());
        const derivative = math.derivative(expr, 'x');
        return derivative.toString();

    } catch (error) {

        return `Error: ${error.message}`;

    }
}

function calculateSecondDerivative(equation) {

    try {

        const expr = math.parse(equation);
        const firstDerivative = math.derivative(expr, 'x');
        const secondDerivative = math.derivative(firstDerivative, 'x');
        return secondDerivative.toString();

    } catch (error) {

        return `Error: ${error.message}`;

    }
}

function calculateIntegral(equation) {

    try {

        console.log(equation);
        const result = Algebrite.integral(equation).toString();
        return result + ' + C';

    } catch (error) {

        return `Error: ${error.message}`;

    }
}

function formatter(userinput){

    console.log(userinput.replace(/√\s*(\d+(\.\d+)?|\w+)/g, 'sqrt($1)').replace(/([\w\)\]])\s*²/g, '$1^2').replace(/([\w\)\]])\s*³/g, '$1^3'));

    return userinput.replace(/√\s*(\d+(\.\d+)?|\w+)/g, 'sqrt($1)').replace(/([\w\)\]])\s*²/g, '$1^2').replace(/([\w\)\]])\s*³/g, '$1^3'); 
                               // √9 => sqrt(9)                                 // x² => x^2                        //√x => sqrt(x)
         
}

// DOM manipulation functions
function displayResults(derivative, secondDerivative, integral) {
    const derivativeValue = document.querySelector('.derivative-value');
    const secondDerivativeValue = document.querySelector('.second-derivative-value');
    const integralValue = document.querySelector('.integral-value');
    const resultadoContainer = document.querySelector('.resultado-container');
    
    derivativeValue.textContent = derivative;
    secondDerivativeValue.textContent = secondDerivative;
    integralValue.textContent = integral;
    resultadoContainer.style.display = 'block';
}

function clearResults() {
    document.querySelector('.derivative-value').textContent = '';
    document.querySelector('.second-derivative-value').textContent = '';
    document.querySelector('.integral-value').textContent = '';
    document.querySelector('.resultado-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.querySelector('.botaoD');
    const equationInput = document.querySelector('.equation-input');
    
    calculateBtn.addEventListener('click', function() {
        const equation = formatter(equationInput.value.trim());
        
        if (!equation) {
            displayResults('Por favor insira uma equação', '', 'Por favor insira uma equação');
            return;
        }
        
        try {
            const derivative = calculateDerivative(equation);
            const secondDerivative = calculateSecondDerivative(equation);
            const integral = calculateIntegral(equation);
            
            displayResults(
                `d/dx(${equation}) = ${derivative}`,
                `d²/dx²(${equation}) = ${secondDerivative}`,
                `∫(${equation})dx = ${integral}`
            );
        } catch (error) {
            displayResults('Erro no cálculo', 'Erro no cálculo', error.message);
        }
    });
    
    equationInput.addEventListener('input', clearResults);
});