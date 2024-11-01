//Properties

let history = document.querySelector(".history")
let result = document.querySelector(".result")
let currentInput = "";
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
const operationsArr = ['+', '-', '×', '/'];

function appendNumber(number) {
    if(number == '.' && countOccurrences(currentInput, '.') == 2 ) return;
    if(currentInput == '0' && number != '.') {
        return
    } else if(currentInput == '' && number == '.') {
        currentInput += '0' 
        currentInput += number
        updateDisplay(currentInput)
    } else {
        currentInput += number;
        updateDisplay(currentInput)
    }
}

function countOccurrences(str, element) {
    let count = 0;
    for (let i = 0; i <= str.length - element.length; i++) {
        if (str.slice(i, i + element.length) === element) {
            count++;
        }
    }
    return count;
}

function setOperation(operation) {
    var lastChar = currentInput[currentInput.length - 1]
    if (operationsArr.includes(lastChar)) return;

    if (currentOperation != null) {
        calculate()

        firstOperand = parseFloat(currentInput)
        currentOperation = null;
    }

    if(currentInput === '') {
        currentOperation = operation
        appendNumber(operation)
    } else if(operation == '%') {
        currentInput = (parseFloat(currentInput) / 100).toFixed(6);
        updateDisplay(currentInput);
    } else {
        firstOperand = parseFloat(currentInput);
        currentOperation = operation;
        appendNumber(operation)
    }
}

function backwardFunction() {
    if (currentInput == '' || currentInput.length == 1) {
        currentInput = '0'
        updateDisplay(currentInput)
        return
    } else {
        currentInput = currentInput.slice(0, -1)
        updateDisplay(currentInput) 
    }
}

function toggleSign() {
    if (currentInput === '') return;

    if (currentOperation == null) {
        currentInput = String(parseFloat(currentInput) * -1);
    } else {
        let secondOperandIndex = currentInput.indexOf(currentOperation) + 1;
        let secondOperand = currentInput.slice(secondOperandIndex).trim();

        if (secondOperand.startsWith('(') && secondOperand.endsWith(')')) {
            secondOperand = secondOperand.slice(1, -1);
            secondOperand = String(parseFloat(secondOperand) * -1)
            currentInput = currentInput.slice(0, secondOperandIndex) + `(${secondOperand})`;
        } else {
            secondOperand = String(parseFloat(secondOperand) * -1)
            currentInput = currentInput.slice(0, secondOperandIndex) + ` (${secondOperand})`;
        }
    }
    updateDisplay(currentInput);
}

function calculate() {
    if (currentOperation === null || currentInput === '') {
        return;
    }
    secondOperand = currentInput.substring(currentInput.indexOf(currentOperation) + 1);
    secondOperand = parseFloat(secondOperand.replace(/[()]/g, ''));

    let result;
    switch (currentOperation) {
        case '+': 
            result = add(firstOperand, secondOperand);
            break;
        case '-':
            result = substract(firstOperand, secondOperand);
            break;
        case '×':
            result = multiply(firstOperand, secondOperand);
            break;
        case '/':
            result = divide(firstOperand, secondOperand);
            break;
    }
    result = result.toFixed(6)
    updateHistory(currentInput)
    currentInput = String(result)
    updateDisplay(result)
    reset()
}

//Operations

function add(operand1, operand2) {
    return operand1 + operand2;
}

function substract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    if(operand2 == 0) {
        return 'Infinity'
    }
    return operand1 / operand2;
}

//Display functions

function updateHistory(historyString) {
    history.textContent = historyString;
}

function updateDisplay(value) {
    result.textContent = value;
}

function clearDisplay() {
    reset();
    currentInput = ''
    updateDisplay('0');
    updateHistory('');
}

function reset() {
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
}
