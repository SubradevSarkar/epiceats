const express = require("express");
const router = express.Router();

const upload = require("../config/uploadConfig");

const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.recipePage);
router.get("/categories", recipeController.categoryPage);
router.get("/categories/:id", recipeController.exploreCategory);
router.get("/explore-latest", recipeController.exploreCategoryLatest);
router.get("/about", recipeController.aboutPage);
router.post("/search", recipeController.searchRecipes);
router.get("/submit-recipe", recipeController.recipeSubmitPage);
router.post(
  "/submit-recipe",
  upload.single("image"),
  recipeController.submitRecipe
);

router.get("/contact-submit", recipeController.contactPage);
router.post("/contact-submit", recipeController.contactSubmitPage);

module.exports = router;
