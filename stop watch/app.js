let h1 = document.querySelector("#time");

let hours = 0;
let minutes = 0;
let seconds = 0;
let h = 0;
let m = 0;
let s = 0;
let id;
function startWatch() {
  function stopwatch() {
    h1.innerText = `${h}:${m}:${s}`;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes += 1;
      if (minutes == 60) {
        minutes = 0;
        hours += 1;
      }
    }
  }

  id = setInterval(() => {
    if (hours < 10) {
      h = "0" + hours;
    } else {
      h = hours;
    }
    if (minutes < 10) {
      m = "0" + minutes;
    } else {
      m = minutes;
    }
    if (seconds < 10) {
      s = "0" + seconds;
    } else {
      s = seconds;
    }
    stopwatch();
  }, 1000);
}

let controls = document.querySelectorAll(".controls");
let start = controls[0];
let pause = controls[1];
let reset = controls[2];

pause.addEventListener("click", () => {
  clearInterval(id);
});
start.addEventListener("click", startWatch);
reset.addEventListener("click", () => {
  clearInterval(id);
  hours = minutes = seconds = 0;
  h1.innerText = "00:00:00";
});
