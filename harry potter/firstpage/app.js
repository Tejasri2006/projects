let list = document.querySelector("#list-icon");
let menu = document.querySelector(".nav");
let movies = document.querySelector("#movies");
let home = document.querySelector("#home");

let input = document.querySelector("input");
let search = document.querySelector("#btn-search");
list.addEventListener("click", () => {
  menu.classList.toggle("clicked");
});

movies.addEventListener("click", () => {
  window.location.href = "projects/harry%20potter/secondpage/index.html";
});

home.addEventListener("click", () => {
  window.location.href = "projects/harry%20potter/firstpage/index.html";
});

search.addEventListener("click", () => {
  if (input.value.toLowerCase() === "movies") {
    window.location.href = "projects/harry%20potter/secondpage/index.html";
  }
});
