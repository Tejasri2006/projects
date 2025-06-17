let url = "https://api.potterdb.com/v1/movies";
let img = document.querySelector("img");
let select = document.querySelector("select");
let content = document.querySelector(".content");
let options = document.querySelectorAll("option");
let title = document.querySelector("#name");
let trailer = document.querySelector("#trailer");
let directors = document.querySelector("#directors");
let editors = document.querySelector("#editors");
let distributors = document.querySelector("#distributors");
let music = document.querySelector("#music");
let run = document.querySelector("#run");
let producers = document.querySelector("#producers");
let release = document.querySelector("#release");
async function getData(url, id) {
  let res = await fetch(url + "/" + id);
  let data = await res.json();
  return data;
}
function expand(list) {
  let string = "";
  if (list.length == 1) {
    for (_ of list) {
      string = string + " " + _;
    }
  } else {
    for (_ of list) {
      if (_ === list[list.length - 1]) {
        string = string + _;
        break;
      }
      string = _ + "," + string;
    }
  }

  return string;
}
let div;

if (select.value == "default") {
  content.remove();
  div = document.createElement("div");
  let img = document.createElement("img");
  div.appendChild(img);
  div.classList.add("content");
  img.src = "moviescollage.jpeg";
  img.style.height = "100%";
  img.style.width = "100%";
  document.body.append(div);
}

select.addEventListener("change", async function (event) {
  if (select.value == "default") {
    content.remove();
    div = document.createElement("div");
    let img = document.createElement("img");
    div.appendChild(img);
    div.classList.add("content");
    img.src = "moviescollage.jpeg";
    img.style.height = "100%";
    img.style.width = "100%";
    document.body.append(div);
  } else {
    div.remove();
    document.body.appendChild(content);
    let id = this.value;
    let data;
    try {
      data = await getData(url, id);
      console.log(data);
      img.src = data.data.attributes.poster;
      title.innerHTML = `<h1>${data.data.attributes.title}</h1>`;
      title.style.textDecoration = "underline";
      trailer.innerHTML = `Watch trailer here :
          <a href="${data.data.attributes.trailer}" target="_blank"><i class="fa-solid fa-circle-play"></i></a>`;
      directors.innerHTML = `<h2>Directors : ${expand(
        data.data.attributes.directors
      )}</h2>`;
      editors.innerHTML = `<h2>Editors : ${expand(
        data.data.attributes.editors
      )}</h2>`;
      distributors.innerHTML = `<h2>Distributors : ${expand(
        data.data.attributes.distributors
      )}</h2>`;
      music.innerHTML = `<h2>Music Composers : ${expand(
        data.data.attributes.music_composers
      )}</h2>`;
      producers.innerHTML = `<h2>Producers : ${expand(
        data.data.attributes.producers
      )}</h2>`;
      run.innerHTML = `Run Time : ${data.data.attributes.running_time}`;
      release.innerHTML = `Release Date : ${data.data.attributes.release_date}`;
    } catch (e) {
      console.log("Error -", e);
    }
  }
});
