import express from "express";
const router = express.Router();

import { authUser, hasAccess } from "../middleware/authMiddleware.js";

import upload from "../config/uploadConfig.js";

import * as recipeController from "../controllers/recipeController.js";

router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.recipePage);
router.get("/categories", recipeController.categoryPage);
router.get("/categories/:id", recipeController.exploreCategory);
router.get("/explore-latest", recipeController.exploreCategoryLatest);
router.get("/about", recipeController.aboutPage);
router.post("/search", recipeController.searchRecipes);
router.get(
  "/submit-recipe",
  authUser,
  hasAccess(["user", "admin"]),
  recipeController.recipeSubmitPage
);
router.post(
  "/submit-recipe",
  authUser,
  hasAccess(["user", "admin"]),
  upload.single("image"),
  recipeController.submitRecipe
);

router.get("/contact-submit", recipeController.contactPage);
router.post("/contact-submit", recipeController.contactSubmit);

export default router;
