const express = require("express");
const app = express();
const port = 3000;
const users = require("./routes/users");
const posts = require("./routes/posts");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/users", users);
app.use("/posts", posts);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
