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
  window.location.pathname = "/projects/harry%20potter/secondpage";
 
});

home.addEventListener("click", () => {
  window.location.pathname = "/projects/harry%20potter/secondpage";
  
});

search.addEventListener("click", () => {
  if (input.value.toLowerCase() === "movies") {
    window.location.pathname = "/projects/harry%20potter/secondpage";
    
  }
});
