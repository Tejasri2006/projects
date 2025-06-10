let input = document.querySelector("input");
let addBtn = document.querySelector(".add");
let ul = document.querySelector("#list");
addBtn.addEventListener("click", function () {
  if (input.value === "") {
    return;
  }
  let li = document.createElement("li");
  li.innerText = input.value;
  let delBtn = document.createElement("button");
  let hr = document.createElement("hr");
  delBtn.classList.add("delete");
  delBtn.innerText = "delete";
  li.append(delBtn);
  li.append(hr);
  ul.append(li);
  input.value = "";
});

ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
});
