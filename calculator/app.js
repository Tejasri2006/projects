let operator = document.querySelectorAll(".op");
let input = document.querySelector("input");
let numbers = document.querySelectorAll(".num");
let ac = document.querySelector("#ac");
let del = document.querySelector("#del");
let equal = document.querySelector("#equal");

document.addEventListener("keydown", function (event) {
  const allowedKeys = "0123456789+-*/().";
  if (allowedKeys.includes(event.key)) {
    input.value += event.key;
  } else {
    event.preventDefault();
    input.value = input.value;
  }
});

del.addEventListener("click", function () {
  input.value = input.value.slice(0, input.value.length - 1);
});

ac.addEventListener("click", function () {
  input.value = "";
});

equal.addEventListener("click", function () {
  try {
    input.value = math.evaluate(input.value); // safer than eval()
  } catch (error) {
    input.value = "Error";
  }
});
let opsymbols = [...operator];

opsymbols = opsymbols.map((el) => el.innerText);

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (event) {
    if (opsymbols.includes(input.value[input.value.length - 1])) {
      event.preventDefault();
    } else {
      input.value += this.innerText;
    }
  });
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    input.value += this.innerText;
  });
}
