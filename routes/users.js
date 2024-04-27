const express = require("express");
const router = express.Router();
const users = require("../data/users");

// ADD A NEW USER
router.post('/', (req, res) => {
  const { name, username, email } = req.body;
  const newUser = { id: users.length + 1, name, username, email };
  users.push(newUser);
  res.redirect('/users');
});
// GET ALL USERS
router.get("/", (req, res) => {
  res.render('users', { users: users });
});
// GET A SINGLE USER
router.get("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (userId < 1 || userId > users.length) {
    const error = new Error("User Not Found");
    error.status = 404;
    return next(error);
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      const { name, email } = req.query;
      let filteredUsers = [user]; // start with the found user

      if (name) {
        filteredUsers = filteredUsers.filter((user) => user.name.includes(name));
      }

      if (email) {
        filteredUsers = filteredUsers.filter((user) => user.email.includes(email));
      }

      res.json(filteredUsers);
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      return next(error);
    }
  }
});
// UPDATE A SINGLE USER
router.patch("/:id/", (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (userId < 1 || userId > users.length) {
    const error = new Error("User Not Found");
    error.status = 404;
    return next(error);
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      res.json(user);
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      return next(error);
    }
  }
});
// DELETE A SINGLE USER
router.delete("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (userId < 1 || userId > users.length) {
    const error = new Error("User Not Found");
    error.status = 404;
    return next(error);
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
      res.sendStatus(204);
    } else {
      const error = new Error("User Not Found");
      error.status = 404;
      return next(error);
    }
  }
});
// ERROR HANDLING
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
   },
  });
});

module.exports = router;