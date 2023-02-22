//Variables
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const screen = document.querySelector("#screen");
let cont = 0;

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
  const input = ref.getAttribute("value");
  const conditions = ["+", "-", "/", "x", "%", "del"];

  if (
    (input === "." && screen.textContent.includes(".")) ||
    (input === "." && screen.textContent === "")
  ) {
    return;
  }

  screen.innerHTML += input;
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

  const input = validateOperator(ref);
  screen.innerHTML += input;
}

//Validate if operator can be added
function validateOperator(ref) {
  const input = ref.getAttribute("value");
  const last_input = screen.textContent.slice(-1);
  const conditions = ["+", "-", "/", "x", "%", "del"];

  if (screen.textContent.trim() === "") {
    return "";
  }

  if (conditions.includes(input) && conditions.includes(last_input)) {
    return "";
  }

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
