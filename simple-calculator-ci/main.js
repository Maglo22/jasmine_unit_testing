function calculate(inputValue) {
    const operator = /\+|\-|\*|\//;
    const numbers = inputValue.split(operator);

    const num1 = parseInt(numbers[0], 10);
    const num2 = parseInt(numbers[1], 10);

    const operation = inputValue.match(operator) ? inputValue.match(operator)[0] : null;

    if (Number.isNaN(num1) || Number.isNaN(num2) || operation === null) {
        updateResult('Operation not recognized');
        return;
    }

    const calculator = new Calculator();

    // load first number in calculator's result
    calculator.add(num1);

    let result;
    switch(operation) {
        case '+':
            result = calculator.add(num2);
            break;
        case '-':
            result = calculator.subtract(num2);
            break;
        case '*':
            result = calculator.multiply(num2);
            break;
        case '/':
            result = calculator.divide(num2);
            break;
        default:
            updateResult('Operation not recognized');
            break;
    }

    updateResult(result);
}

function updateResult(result) {
    const element = document.getElementById('result');

    if (element) {
        element.innerText = result;
    }
}

function showVersion() {
    const calculator = new Calculator();
    const element = document.getElementById('version');

    calculator.version.then(function(version) {
        element.innerText = version;
    });
}