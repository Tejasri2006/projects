const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  {
    id: uuidv4(),
    username: "alice123",
    email: "alice@example.com",
    content: "Just finished reading a great book on AI!",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=alice123`,
  },
  {
    id: uuidv4(),
    username: "bob_the_builder",
    email: "bob@buildermail.com",
    content: "Started a new woodworking project today.",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=bob_the_builder`,
  },
  {
    id: uuidv4(),
    username: "charlie_dev",
    email: "charlie.dev@example.net",
    content: "Learning how to build RESTful APIs with Node.js!",
    image: `https://api.dicebear.com/8.x/pixel-art/svg?seed=charlie_dev`,
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, email, content } = req.body;
  let image = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${username}`;
  posts.push({ id, username, email, content, image });
  console.log(req.body);
  res.render("index.ejs", { posts });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  console.log(posts);
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((el) => el.id === id);
  console.log(post);
  res.render("edit.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let { content } = req.body;
  let post = posts.find((el) => el.id === id);
  console.log(post);
  post.content = content;
  res.redirect("/posts");
});
app.listen(port, () => {
  console.log("App's listening");
});
