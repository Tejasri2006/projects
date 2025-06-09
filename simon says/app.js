let gameSeq = [];
let userSeq = [];
let buttons = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");
let divs = document.querySelectorAll(".btn");
let highest = document.createElement("h2");
let text = document.querySelector("#text");
highest.classList.add("high");
let started = false;
let level = 0;
let score = 0;
let highestScore = 0;
highest.innerText = `Highest Score: ${highestScore}`;
text.append(highest);
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = buttons[randIdx];
  gameSeq.push(randColor);
  let randBtn = document.querySelector(`.${randColor}`);
  buttonFlash(randBtn);
}

function buttonFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}
let value,
  count = 0;
for (btn of divs) {
  btn.addEventListener("click", function () {
    userSeq.push(this.id);
    // buttonFlash(btn);
    count++;
    value = check(count);
    if (value === false) {
      document.body.classList.add("end");
      setTimeout(() => {
        document.body.classList.remove("end");
      }, 250);
      h2.innerText = `GAMEOVER! Please press any key to start again!. Your Score was ${score}`;
      resetGame();
    } else if (count === level) {
      count = 0;
      score++;
      if (score > highestScore) {
        highestScore = score;
        highest.innerText = `Highest Score: ${highestScore}`;
        text.append(highest);
      }
      levelUp();
    }
  });
}

function check(count) {
  if (userSeq[userSeq.length - 1] !== gameSeq[count - 1]) {
    return false;
  }
  return true;
}

function resetGame() {
  count = 0;
  score = 0;
  level = 0;
  userSeq = [];
  gameSeq = [];
  started = false;
}
