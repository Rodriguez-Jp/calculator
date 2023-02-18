//Variables
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const screen = document.querySelector("#screen");

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

  if (
    (input === "." && screen.textContent.includes(".")) ||
    (input === "." && screen.textContent === "")
  ) {
    console.log("Ya tienes un punto en tu calculo");
    return;
  }

  screen.innerHTML += input;
}

function displayOperator(ref) {}
