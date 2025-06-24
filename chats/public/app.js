let deleteBtns = document.querySelectorAll(".delete");

deleteBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    try {
      let ans = prompt(
        "Do you really want to delete the chat?y/n"
      ).toLowerCase();
      if (ans !== "y" && ans !== "n" && ans !== "yes" && ans !== "no") {
        throw "Invalid  response!";
      } else if (ans === "no" || ans === "n") {
        event.preventDefault();
      }
    } catch (err) {
      alert(err);
      event.preventDefault();
    }
  });
});
