const express = require("express");
const app = express();
require("dotenv").config();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let generateUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

//home route
app.get("/", (req, res) => {
  let query = "select count(*) as count from user";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    let count = result[0].count;
    res.render("home.ejs", { count });
  });
});

//show route
app.get("/users", (req, res) => {
  let query = "select * from user";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    res.render("showusers.ejs", { result });
  });
});

//edit route
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let query = `select * from user where id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    let user = result[0];
    res.render("edit.ejs", { user });
  });
});

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let username = req.body.changed;
  let query = `select * from user where id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    let password = req.body.password;
    if (password === result[0].password) {
      query = `update user set username = ? where id = ?`;
      connection.query(query, [username, id], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("There was an error!");
        }
        res.redirect("/users");
      });
    } else {
      res.send("Password was incorrect");
    }
  });
});

app.get("/users/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let query = `delete from user where id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    res.redirect("/users");
  });
});

app.post("/users", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  let query = `insert into user (id,username,email,password) values ?`;
  let user = [[id, username, email, password]];
  connection.query(query, [user], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("There was an error!");
    }
    console.log(result);
    res.redirect("/users");
  });
});

app.listen(port, () => {
  console.log("Server's is listening to port:", port);
});
