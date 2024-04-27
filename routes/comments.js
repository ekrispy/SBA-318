const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const userComments = require("../data/comments");

router
 .route("/")
 .get((req, res) => {
    res.json(comments); // Return comments data in JSON format
  })
 .post((req, res, next) => {
    if (req.body.userId && req.body.mealId && req.body.comment) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: req.body.userId,
        mealId: req.body.mealId,
        comment: req.body.comment,
      };

      comments.push(comment);
      res.json(comment); // Return the newly created comment    
    } else {
      next({ status: 400, message: "Insufficient Data" }); // Pass error object to next middleware
    }
  });
  router
 .route("/:id")
 .get((req, res, next) => {
    const comments = userComments.find((comments) => comments.mealId === parseInt(req.params.id));
    if (comments) {
      res.json(comments);
    } else {
      next({ status: 404, message: "Meal Not Found" });
    }
  });
  
  module.exports = router;