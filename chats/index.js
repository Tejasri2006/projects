const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
const port = 8080;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then((res) => {
    console.log("Connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Working");
});
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});
//create route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let created_at = Date.now();
  let chat = { from, to, msg, created_at };
  let result = await Chat.insertOne(chat);
  console.log(result);
  res.redirect("/chats");
});
//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs", { chat });
});
app.patch("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let result = await Chat.findByIdAndUpdate(
    id,
    { msg: msg },
    { new: true, runValidators: true }
  );
  console.log(result);
  res.redirect("/chats");
});
//destroy route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});
app.listen(port, () => {
  console.log("App's listening");
});
