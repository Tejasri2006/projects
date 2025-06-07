const questions = [
  {
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctInd: 2,
  },
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    options: [
      "Jawaharlal Nehru",
      "Subhas Chandra Bose",
      "Mahatma Gandhi",
      "Sardar Vallabhbhai Patel",
    ],
    correctInd: 2,
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Earth", "Venus", "Jupiter", "Mars"],
    correctInd: 3,
  },
  {
    question: "Who wrote the national anthem of India, 'Jana Gana Mana'?",
    options: [
      "Rabindranath Tagore",
      "Bankim Chandra Chatterjee",
      "Sarojini Naidu",
      "Aurobindo Ghosh",
    ],
    correctInd: 0,
  },
  {
    question: "What is the largest continent in the world by area?",
    options: ["Africa", "North America", "Asia", "Europe"],
    correctInd: 2,
  },
];

let qpara = document.getElementById("q");
let apara = document.querySelectorAll(".options");
let next = document.querySelector("#next");
let container = document.querySelector("#container");

let i = 0;
let score;
let answered;
function startQuiz() {
  i = 0;
  score = 0;
}

display(i);
function display(i) {
  qpara.innerText = questions[i].question;
  for (let j = 0; j < 4; j++) {
    apara[j].innerText = `${j + 1}.${questions[i].options[j]}`;
    apara[j].style.backgroundColor = "";
    apara[j].classList.remove("disabled");
  }
}

for (let k = 0; k < 4; k++) {
  apara[k].addEventListener("click", function (event) {
    if (k === questions[i].correctInd) {
      apara[k].style.backgroundColor = "rgba(0,255,0,0.5)";
      score += 1;
    } else {
      apara[questions[i].correctInd].style.backgroundColor =
        "rgba(0,255,0,0.5)";
      apara[k].style.backgroundColor = "rgb(255, 0, 0, 0.5)";
    }
    for (let m = 0; m < 4; m++) {
      apara[m].classList.add("disabled");
    }
  });
}

next.addEventListener("click", function (event) {
  i += 1;
  if (i == 5) {
    event.preventDefault();
    let scoreCard = document.createElement("div");
    let character = document.createElement("div");
    scoreCard.classList.add("score");
    character.classList.add("character");
    character.style.borderRadius = "10px";
    document.body.append(scoreCard);
    let message = document.createElement("div");
    message.innerHTML = `<h2>Congratulations!!</h2><p>Your final score is: ${score}</p>`;
    scoreCard.appendChild(character);
    scoreCard.appendChild(message);
    container.remove();

    return;
  } else {
    display(i);
  }
});
startQuiz();
