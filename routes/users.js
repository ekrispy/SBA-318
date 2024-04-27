const express = require("express");
const router = express.Router();
const users = require("../data/users");

router
 .route("/")
 .get((req, res) => {
    res.json(users); // Return users data in JSON format
  })
 .post((req, res, next) => {
    if (req.body.id && req.body.name && req.body.email) {
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
      };

      users.push(user);
      res.json(user); // Return the newly created user
    } else {
      next({ status: 400, message: "Insufficient Data" }); // Pass error object to next middleware
    }
  });

router
 .route("/:id")
 .get((req, res, next) => {
    const userId = parseInt(req.params.id);
    if (userId < 1 || userId > users.length) {
      const error = new Error("User Not Found");
      error.status = 404;
      return next(error);
    } else {
      const user = users.find((user) => user.id === userId);
      if (user) {
        res.json(user);
      } else {
        const error = new Error("User Not Found");
        error.status = 404;
        return next(error);
      }
    }
  })
 .patch((req, res, next) => {
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
  })
 .delete((req, res, next) => {
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

// Add this error handling middleware to handle the custom error object
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

module.exports = router;