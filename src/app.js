//Variables
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const screen = document.querySelector("#screen");
let dotValidator = true;

//EventListeners

loadEventListeners();

//functions

//Load all the event listeners
function loadEventListeners() {
  numbers.forEach((number) =>
    number.addEventListener("click", () => {
      displayNumbers(number);
    })
  );

  operators.forEach((operator) =>
    operator.addEventListener("click", () => {
      displayOperator(operator);
    })
  );
}

//Get the reference and display his value (Numbers)
function displayNumbers(ref) {
  const input = validateNumbers(ref);
  screen.innerHTML += input;
}

//Validates the number input
function validateNumbers(ref) {
  const input = ref.getAttribute("value");

  //Validation for dot (avoid multiple dots in the same number)
  if (!dotValidator && input === ".") {
    dotValidator = true;
    return input;
  }
  if (
    (input === "." && screen.textContent.includes(".")) ||
    (input === "." && screen.textContent === "")
  ) {
    return "";
  }

  //Validation for zero (Avoid left zeros)
  if (
    input === "0" &&
    screen.textContent.length === 1 &&
    screen.textContent[0] === "0"
  ) {
    return "";
  }
  if (
    screen.textContent[0] === "0" &&
    input !== "." &&
    screen.textContent.length < 2
  ) {
    screen.textContent = input;
    return "";
  }
  return input;
}

//Displays the operator on the screen
function displayOperator(ref) {
  //If users press '='
  if (ref.getAttribute("value") === "=") {
    calculate();
    return;
  }

  //If users press the clear button
  if (ref.getAttribute("value") === "c") {
    clearScreen();
  }

  //If users press the +/- button (**Need some work**)
  if (ref.getAttribute("value") === "sign") {
    let newNum = changeSign(screen.textContent);
    screen.textContent = newNum;
    return;
  }

  //If users press the del button
  if (ref.getAttribute("value") === "del") {
    deleteNum();
    return;
  }

  //If user press the percetange button (**Need some work**)
  if (ref.getAttribute("value") === "%") {
    let percentageNum = percentage(screen.textContent);
    screen.textContent = percentageNum;
    return;
  }

  const input = validateOperator(ref);
  screen.innerHTML += input;
}

//Validate if operator can be added
function validateOperator(ref) {
  const input = ref.getAttribute("value");
  const last_input = screen.textContent.slice(-1);
  const conditions = ["+", "-", "/", "*", "%", "del"];

  if (screen.textContent.trim() === "") {
    return "";
  }

  if (conditions.includes(input) && conditions.includes(last_input)) {
    return "";
  }

  dotValidator = false;
  return input;
}

//Calculate the operation
function calculate() {
  const resultado = eval(screen.textContent);
  screen.textContent = resultado;
}

//Clear the screen
function clearScreen() {
  screen.textContent = "";
}

//Change the sign of the number
function changeSign(num) {
  num = parseFloat(num) * -1;
  const numString = String(num);
  return numString;
}

//Delete numbers
function deleteNum() {
  screen.textContent = screen.textContent.slice(
    0,
    screen.textContent.length - 1
  );
}

//Converts the number in percentage
function percentage(num) {
  let newNum = parseFloat(num) / 100;
  return String(newNum);
}
