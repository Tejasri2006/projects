let password = document.getElementById("content");
let generate = document.querySelector(".btn");
let tick = document.querySelector("#display");

let text = "";
generate.addEventListener("click", () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  for (let i = 0; i < 8; i++) {
    text += chars[Math.floor(Math.random() * chars.length)];
  }
  password.value = text;

  text = "";
});

tick.addEventListener("click", () => {
  if (tick.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let copyIcon = document.querySelector(".fa-copy");
  copyIcon.addEventListener("click", () => {
    navigator.clipboard
      .writeText(password.value)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((error) => {
        alert("There was an error!");
      });
  });
});
