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

function calculateDefiniteIntegral(equation, lowerBound, upperBound) {
    try {
        
        let result;
        console.log("--------------------------------------------------")
        console.log(`Calculando a integral definida na equação ${equation} de ${lowerBound} até ${upperBound}`);
        result = Algebrite.eval(`defint(${equation}, x, ${lowerBound}, ${upperBound})`).toString();
        console.log("E o resultado foi: " + result);
        console.log("--------------------------------------------------")

        return result;

    } catch (error) {
        return `Erro: ${error.message}`;
    }
}

function calculateIntegral(equation) {

    try {
        console.log("--------------------------------------------------")
        console.log("Equação que vamos fazer a integral: " + equation);
        const result = Algebrite.integral(equation).toString();
        console.log("E o resultado foi: " + result);
        console.log("--------------------------------------------------")

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

function formatterAlgebrite(userinput) {
    return userinput
        // Handle square roots: √x → sqrt(x)
        .replace(/√\s*(\d+|x)/g, 'sqrt($1)')
        // Handle exponents: x² → x^2, x³ → x^3
        .replace(/([x\d\)])\s*²/g, '$1^2')
        .replace(/([x\d\)])\s*³/g, '$1^3')
        // Add * between numbers and variables: 9x → 9*x, 2( → 2*(
        .replace(/(\d)(\(|[a-zA-Z])/g, '$1*$2')
        // Add * between variables and numbers: x4 → x*4 (rare but possible)
        .replace(/([a-zA-Z])(\d)/g, '$1*$2')
        // Add * between fractions and variables: 1/4x → 1/4*x
        .replace(/(\/)(\s*)([a-zA-Z])/g, '$1*$3');
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
    const lowerBoundInput = document.querySelector('#lower-bound');
    const upperBoundInput = document.querySelector('#upper-bound');
    const calculateIntegralBtn = document.querySelector('.calculate-integral-bounds');
    
    calculateBtn.addEventListener('click', function() {
        const equation = formatter(equationInput.value.trim());
        const equationAlgebrite = formatterAlgebrite(equationInput.value.trim());
        const lowerBound = parseFloat(lowerBoundInput.value);
        const upperBound = parseFloat(upperBoundInput.value);
        const definiteResultContainer = document.querySelector('.definite-integral-result');
        const definiteValueBox = document.querySelector('.definite-integral-value');

        // Clear all previous results including the definite integral
        clearResults();
        definiteResultContainer.style.display = 'none';
        definiteValueBox.textContent = '';

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

            // If both bounds are numbers, calculate definite integral
            if (!isNaN(lowerBound) && !isNaN(upperBound)) {
                const result = calculateDefiniteIntegral(equationAlgebrite, lowerBound, upperBound);
                definiteValueBox.textContent = `∫(${equation})dx de ${lowerBound} até ${upperBound} = ${result}`;
                definiteResultContainer.style.display = 'flex';
            }

        } catch (error) {
            displayResults('Erro no cálculo', 'Erro no cálculo', error.message);
        }
    });
    
    calculateIntegralBtn.addEventListener('click', function() {
        const equation = formatter(equationInput.value.trim());
        const lowerBound = parseFloat(lowerBoundInput.value);
        const upperBound = parseFloat(upperBoundInput.value);
        
        if (!equation || isNaN(lowerBound) || isNaN(upperBound)) {
            document.querySelector('.integral-bounds-value').textContent = 'Por favor insira uma equação e os limites.';
            return;
        }
        
        try {
            const result = calculateDefiniteIntegral(equation, lowerBound, upperBound);
            document.querySelector('.integral-bounds-value').textContent = `Resultado: ${result}`;
        } catch (error) {
            document.querySelector('.integral-bounds-value').textContent = 'Erro no cálculo';
        }
    });
    
    equationInput.addEventListener('input', clearResults);
});