const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.recipePage);
router.get("/categories", recipeController.categoryPage);
router.get("/categories/:id", recipeController.exploreCategory);
router.get("/explore-latest", recipeController.exploreCategoryLatest);
router.post("/search", recipeController.searchRecipes);
router.get("/submit-recipe", recipeController.submitRecipe);

module.exports = router;
