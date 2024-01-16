const resultElement = document.getElementById('result');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const changeSignButton = document.getElementById('change-sign');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const subtractButton = document.getElementById('subtract');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const addButton = document.getElementById('add');
const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const equalsButton = document.getElementById('equals');
const zeroButton = document.getElementById('zero');
const decimalButton = document.getElementById('decimal');

let calculatorState = {
  currentInput: '',
  firstNumber: '',
  operationSign: '',
};

function clearInput() {
  calculatorState = {
    ...calculatorState,
    currentInput: '',
  };

  updateDisplay();
}

function deleteLast() {
  calculatorState = {
    ...calculatorState,
    currentInput: calculatorState.currentInput.slice(0, -1),
  };

  updateDisplay();
}

function appendNumber(number) {
  calculatorState = {
    ...calculatorState,
    currentInput: calculatorState.currentInput + number,
  };

  updateDisplay();
}

function appendOperation(operation) {
  if (calculatorState.currentInput !== '') {
    calculatorState = {
      ...calculatorState,
      firstNumber: calculatorState.currentInput,
      currentInput: '',
      operationSign: operation,
    };

    updateDisplay();
  }
}

function appendDecimal() {
  if (calculatorState.currentInput.indexOf('.') === -1) {
    calculatorState = {
      ...calculatorState,
      currentInput: calculatorState.currentInput + '.',
    };

    updateDisplay();
  }
}

function calculate() {
  try {
    calculatorState = {
      currentInput: evaluateExpression(calculatorState.currentInput),
      firstNumber: '',
      operationSign: '',
    };

    updateDisplay();
  } catch (error) {
    calculatorState = {
      currentInput: 'Error',
      firstNumber: '',
      operationSign: '',
    };

    updateDisplay();
  }
}

function changeSign() {
  if (
    typeof calculatorState.currentInput === 'string' &&
    calculatorState.currentInput !== ''
  ) {
    calculatorState = {
      ...calculatorState,
      currentInput:
        calculatorState.currentInput.charAt(0) === '-'
          ? calculatorState.currentInput.slice(1)
          : '-' + calculatorState.currentInput,
    };

    updateDisplay();
  }
}

function evaluateExpression(expression) {
  let firstNumber = parseFloat(calculatorState.firstNumber);
  let secondNumber = parseFloat(calculatorState.currentInput);

  switch (calculatorState.operationSign) {
    case '+':
      return roundValue(firstNumber + secondNumber);
    case '-':
      return roundValue(firstNumber - secondNumber);
    case '*':
      return roundValue(firstNumber * secondNumber);
    case '/':
      if (secondNumber !== 0) {
        return roundValue(firstNumber / secondNumber);
      } else {
        throw new Error('Division by zero');
      }
    default:
      return roundValue(secondNumber);
  }
}

function roundValue(number) {
  const roundedNumber = parseFloat(number.toFixed(8));

  return roundedNumber.toString();
}

function updateDisplay() {
  resultElement.value = calculatorState.currentInput;
}

clearButton.addEventListener('click', clearInput);
deleteButton.addEventListener('click', deleteLast);
equalsButton.addEventListener('click', calculate);
divideButton.addEventListener('click', () => appendOperation('/'));
multiplyButton.addEventListener('click', () => appendOperation('*'));
addButton.addEventListener('click', () => appendOperation('+'));
subtractButton.addEventListener('click', () => appendOperation('-'));
zeroButton.addEventListener('click', () => appendNumber('0'));
oneButton.addEventListener('click', () => appendNumber('1'));
twoButton.addEventListener('click', () => appendNumber('2'));
threeButton.addEventListener('click', () => appendNumber('3'));
fourButton.addEventListener('click', () => appendNumber('4'));
fiveButton.addEventListener('click', () => appendNumber('5'));
sixButton.addEventListener('click', () => appendNumber('6'));
sevenButton.addEventListener('click', () => appendNumber('7'));
eightButton.addEventListener('click', () => appendNumber('8'));
nineButton.addEventListener('click', () => appendNumber('9'));
decimalButton.addEventListener('click', () => appendDecimal());
changeSignButton.addEventListener('click', changeSign);
