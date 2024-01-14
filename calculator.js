let displayValue = '';
let currentInput = '';
let currentOperator = '';
let mode = 'withBrackets';
let corpus = 'pc';

function updateDisplay() {
  document.getElementById('display').value = displayValue;
}

function clearDisplay() {
  displayValue = '';
  currentInput = '';
  currentOperator = '';
  updateDisplay();
}

function deleteLast() {
  displayValue = displayValue.slice(0, -1);
  updateDisplay();
}

function appendSymbol(symbol) {
  if (symbol === '.' && currentInput.includes('.')) {
    return;
  }

  currentInput += symbol;
  displayValue = currentInput;
  updateDisplay();
}

function setOperator(operator) {
  if (currentOperator !== '') {
    calculate();
  }

  currentInput = displayValue;
  currentOperator = operator;
  displayValue = '';
  updateDisplay();
}

function calculate() {
  if (currentOperator === '' || currentInput === '') {
    return;
  }

  const num1 = parseFloat(currentInput);
  const num2 = parseFloat(displayValue);

  if (isNaN(num1) || isNaN(num2)) {
    displayValue = 'Ошибка';
  } else {
    switch (currentOperator) {
      case '+':
        displayValue = (num1 + num2).toFixed(8);
        break;
      case '-':
        displayValue = (num1 - num2).toFixed(8);
        break;
      case '*':
        displayValue = (num1 * num2).toFixed(8);
        break;
      case '/':
        if (num2 !== 0) {
          displayValue = (num1 / num2).toFixed(8);
        } else {
          displayValue = 'Ошибка';
        }
        break;
      case '%':
        displayValue = (num1 % num2).toFixed(8);
        break;
      default:
        displayValue = 'Ошибка';
    }
  }

  currentInput = '';
  currentOperator = '';
  updateDisplay();
}

function changeMode() {
  mode = document.getElementById('mode').value;
}
