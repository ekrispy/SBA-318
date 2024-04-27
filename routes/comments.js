const express = require("express");
const router = express.Router();
const comments = require("../data/comments");

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
    const userId = parseInt(req.params.id);
    const userComments = comments.filter((comment) => comment.userId === userId);
    if (userComments.length > 0) {
      res.json(userComments);
    } else {
      const error = new Error("No comments found for this user");
      error.status = 404;
      return next(error);
    }
  })
.patch((req, res, next) => {
    const userId = parseInt(req.params.id);
    const userComments = comments.filter((comment) => comment.userId === userId);
    if (userComments.length > 0) {
      const updatedComment = userComments[0];
      updatedComment.comment = req.body.comment;
      res.json(updatedComment);
    } else {
      const error = new Error("No comments found for this user");
      error.status = 404;
      return next(error);
    }
  })       
.delete((req, res, next) => {
    const userId = parseInt(req.params.id);
    const userComments = comments.filter((comment) => comment.userId === userId);
    if (userComments.length > 0) {
      const index = comments.indexOf(userComments[0]);
      comments.splice(index, 1);
      res.json({ message: "Comment deleted successfully" });
    } else {
      const error = new Error("No comments found for this user");
      error.status = 404;
      return next(error);
    }
  });

module.exports = router;