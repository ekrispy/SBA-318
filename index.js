const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const usersRouter = require("./routes/users");
const meals = require("./routes/meals");
const commentsRouter = require("./routes/comments");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/meals", meals);
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});