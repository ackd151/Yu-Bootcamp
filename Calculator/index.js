// Calculator vars
let operand1, operation;

// Calculator dom object handles
const display = document.querySelector('.display');

// Calculator operations
const add = (a, b) => a + b;
const subt = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;
const mod = (a, b) => a % b;
const sqrt = () => {
    operand1 = Number(display.innerText);
    operation = mod;
    display.innerText = Math.sqrt(operand1);
}
const calculate = (a, b, operate) => {
    return operate(a, b);
}
const clear = () => display.innerText = '0';
const equal = () => {
    operand2 = Number(display.innerText);
    display.innerText = calculate(operand1, operand2, operation);
}

// Calculator digit (0-9) listener callback
function updateDisplay(digit) {
    return function() {
        if (!(display.innerText.length > 9)) {
            display.innerText = display.innerText === '0' ? `${digit}` : display.innerText + `${digit}`;
        }
    }
}

// Calculator operation (+,-,*,/,%) listener callback
function operationListener(op) {
    return function() {
        operand1 = Number(display.innerText);
                operation = op;
                display.innerText = '0';
    }
}

// Create dom button and keyboard key objects to use in event listener binding switch stmt
const btnsAndKeys = [];
function BtnAndKey(btn, key, listener) {
    this.btn = btn,
    this.key = key,
    this.listener = listener;
}
btnsAndKeys.push(new BtnAndKey('clear', 'Delete', clear));
btnsAndKeys.push(new BtnAndKey('nine', '9', updateDisplay(9)));
btnsAndKeys.push(new BtnAndKey('eight', '8', updateDisplay(8)));
btnsAndKeys.push(new BtnAndKey('seven', '7', updateDisplay(7)));
btnsAndKeys.push(new BtnAndKey('six', '6', updateDisplay(6)));
btnsAndKeys.push(new BtnAndKey('five', '5', updateDisplay(5)));
btnsAndKeys.push(new BtnAndKey('four', '4', updateDisplay(4)));
btnsAndKeys.push(new BtnAndKey('three', '3', updateDisplay(3)));
btnsAndKeys.push(new BtnAndKey('two', '2', updateDisplay(2)));
btnsAndKeys.push(new BtnAndKey('one', '1', updateDisplay(1)));
btnsAndKeys.push(new BtnAndKey('zero', '0', updateDisplay(0)));
btnsAndKeys.push(new BtnAndKey('plus', '+', operationListener(add)));
btnsAndKeys.push(new BtnAndKey('minus', '-', operationListener(subt)));
btnsAndKeys.push(new BtnAndKey('mult', '*', operationListener(mult)));
btnsAndKeys.push(new BtnAndKey('div', '/', operationListener(div)));
btnsAndKeys.push(new BtnAndKey('mod', '%', operationListener(mod)));
btnsAndKeys.push(new BtnAndKey('sqrt', '^', sqrt));
btnsAndKeys.push(new BtnAndKey('equal', '=', equal));
console.log(btnsAndKeys);

// Attach listeners to buttons and keys
for (let bAndK of btnsAndKeys) {
    document.querySelector(`.${bAndK.btn}`).addEventListener('click', bAndK.listener);
    document.addEventListener('keydown', (e) => {
        if (e.key === bAndK.key) {
            bAndK.listener();
        }
    })
}
