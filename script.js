const output = document.getElementById('output');
let isNewCalculation = false;

const errorMessages = [
  'Error',
  'undefined',
  'NaN',
  'Infinity',
  '-Infinity',
  /function Error\(\) \{\s*\[native code\]\s*\}/
];

const operators = ['+', '-', '*', '/'];

// Input
function appendToOutput(value) {
  if (isErrorMessage(output.innerText)) {
    output.innerText = '';
    isNewCalculation = true;
  }

  if (isNewCalculation && !isNaN(value)) {
    output.innerText = value;
    isNewCalculation = false;
  } else if (isOperator(value)) {
    isNewCalculation = false;
    if (output.innerText.length < 75) {
      output.innerText += value;
    }
  } else {
    if (output.innerText.length < 75) {
      output.innerText += value;
    }
  }
}

// Delete button
function deleteLast() {
  if (isErrorMessage(output.innerText)) {
    output.innerText = '';
  } else {
    output.innerText = output.innerText.slice(0, -1);
  }
}

// Clear button
function clearOutput() {
  output.innerText = '';
}

// Result
function calculateResult() {
  try {
    output.innerText = eval(output.innerText);
    isNewCalculation = true;
  } catch (error) {
    output.innerText = 'Error';
    isNewCalculation = true;
  }
}

function isOperator(value) {
  return operators.includes(value);
}

function isErrorMessage(text) {
  return errorMessages.some(errorMessage => {
    if (typeof errorMessage === 'string') {
      return text === errorMessage;
    } else {
      return errorMessage.test(text);
    }
  });
}

// Keyboard input
function handleKeyPress(event) {
  const key = event.key;
  if (!isNaN(key) || operators.includes(key) || key === '.') {
    appendToOutput(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearOutput();
  }
}

document.addEventListener('keydown', handleKeyPress);