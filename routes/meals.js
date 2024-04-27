const express = require("express");
const router = express.Router();
const meals = require("../data/Meals");

router
 .route("/")
 .get((req, res) => {
    res.json(meals); // Return meals data in JSON format
  })
 .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.recipe) {
      const meal = {
        id: meals[meals.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        recipe: req.body.recipe,
      };

      meals.push(meal);
      res.json(meal); // Return the newly created meal
    } else {
      next({ status: 400, message: "Insufficient Data" }); // Pass error object to next middleware
    }
  });

router
 .route("/:id")
 .get((req, res, next) => {
    const meal = meals.find((meal) => meal.id === parseInt(req.params.id));
    if (meal) {
      res.json(meal);
    } else {
      next({ status: 404, message: "Meal Not Found" });
    }
  });

module.exports = router;