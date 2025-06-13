let title = document.querySelector("#title");
let h1 = document.querySelector("h1");
let elements = document.querySelector(".elements");
let user = document.querySelector("#user");
let robot = document.querySelector("#robot");
let result = document.querySelector("#result");
let reload = document.querySelector("#reload");
let userChoice,
  comChoice,
  level = 0,
  userScore = 0,
  comScore = 0;

let h2 = document.querySelector("h2");
let choices = ["rock", "paper", "scissors"];

function startGame() {
  levelUp();
  h2.innerText = `Level ${level}`;
}

elements.addEventListener("click", function (event) {
  if (
    event.target.id == "0" ||
    event.target.id == "1" ||
    event.target.id == "2"
  ) {
    userChoice = choices[parseInt(event.target.id)];
    if (
      (userChoice === "rock" && comChoice === "scissors") ||
      (userChoice === "paper" && comChoice === "rock") ||
      (userChoice === "scissors" && comChoice === "paper")
    ) {
      h2.innerText = `Congratulations! you won!`;
      result.innerText = `Robot chose ${comChoice}`;
      userScore++;
      user.innerText = `You:${userScore}`;
    } else if (userChoice === comChoice) {
      h2.innerText = `That was a tie`;
      result.innerText = `Robot chose ${comChoice}`;
    } else {
      h2.innerText = `Computer won!`;
      result.innerText = `Robot chose ${comChoice}`;
      comScore++;
      robot.innerText = `Robot:${comScore}`;
    }

    levelUp();
  }
});

function levelUp() {
  level++;
  // h2.innerText = `Level ${level}`;
  comChoice = choices[Math.floor(Math.random() * 3)];
}

startGame();

reload.addEventListener("click", () => {
  window.location.reload();
});
