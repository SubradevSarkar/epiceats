import categoryModel from "../models/CategoryModel.js";
import recipeModel from "../models/RecipeModel.js";
import uploadImage from "../config/firebaseConfig.js";
import contactModel from "../models/ContactModel.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET /
 * homepage
 */
const homepage = asyncHandler(async (req, res, next) => {
  const categoryLimit = 5;
  const categories = await categoryModel.find({}).limit(categoryLimit);
  const latestRecipes = await recipeModel
    .find({})
    .sort({ _id: -1 })
    .limit(categoryLimit);

  const indianRecipes = await recipeModel.find({ category: "Indian" });

  const americanRecipes = await recipeModel.find({ category: "American" });

  const thaiRecipes = await recipeModel.find({ category: "Thai" });

  const food = { latestRecipes, indianRecipes, thaiRecipes, americanRecipes };
  res
    .status(200)
    .render("index", { title: "epiceats - Home", categories, food });
});

/**
 * GET /categories
 * Categories
 */
const categoryPage = asyncHandler(async (req, res, next) => {
  const categoryLimit = 20;
  const categories = await categoryModel.find({}).limit(categoryLimit);

  res
    .status(200)
    .render("categories", { title: "epiceats - Categories", categories });
});

/**
 * GET /categories/:id
 * Categories
 */
const exploreCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const categoryLimit = 20;
  const category = await recipeModel
    .find({ category: categoryId })
    .limit(categoryLimit);

  res.status(200).render("categories", {
    title: `epiceats - ${categoryId}`,
    categoryId,
    category,
  });
});

/**
 * GET /recipe/:id
 * recipe
 */
const recipePage = asyncHandler(async (req, res, next) => {
  const recipeId = req.params.id;
  const recipe = await recipeModel.findById(recipeId);

  res.status(200).render("recipe", { title: "epiceats - Recipe", recipe });
});

/**
 * GET /about
 * recipe
 */
const aboutPage = asyncHandler(async (req, res, next) => {
  res.status(200).render("about", { title: "epiceats - About" });
});

/**
 * GET /explore-latest
 * explore Latest Category
 */
const exploreCategoryLatest = asyncHandler(async (req, res, next) => {
  const recipeLimit = 20;
  const recipes = await recipeModel
    .find({})
    .sort({ _id: -1 })
    .limit(recipeLimit);
  res.status(200).render("exploreLatest", {
    title: "epiceats - Explore latest",
    recipes,
  });
});

/**
 * Post /search
 * searchRecipes
 */
const searchRecipes = asyncHandler(async (req, res, next) => {
  const searchContext = req.body.searchTerm;
  const recipes = await recipeModel.find({
    $text: { $search: searchContext, $diacriticSensitive: true },
  });

  res.status(200).render("search", { title: "epiceats - Search", recipes });
});

/**
 * get /submit-recipe
 * submitRecipe
 */
const recipeSubmitPage = asyncHandler(async (req, res, next) => {
  const infoSuccessMessage = req.flash("infoSuccess");
  const infoFailureMessage = req.flash("infoFailure");
  res.status(200).render("submitRecipe", {
    title: "epiceats - Submit recipe",
    infoSuccessMessage,
    infoFailureMessage,
  });
});

/**
 * Post /submit-recipe
 * submitRecipe
 */
const submitRecipe = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    let imageUrl;
    if (body.email !== req.user.email) {
      throw new Error("Please provide correct email address");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      imageUrl = await uploadImage(req);
    } else {
      throw new Error("choose image to upload");
    }

    const recipeData = {
      email: body.email || req.user.email,
      name: body.name,
      description: body.description,
      ingredients: body.ingredients,
      category: body.category,
      image: imageUrl,
      userId: req.user._id,
    };

    await recipeModel.create(recipeData);
    req.flash("infoSuccess", "Recipe submitted successfully");
    res.status(200).json({ message: "Recipe submitted successfully" });
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * Delete /recipe-delete
 * recipeDelete
 */
const recipeDelete = asyncHandler(async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;

    const recipe = await recipeModel.findOne({
      $and: [{ userId: req.user._id }, { _id: recipeId }],
    });

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    await recipeModel.findByIdAndDelete(recipeId);

    req.flash("infoSuccess", "Recipe Deleted successfully");
    res.status(200).json({ message: "Recipe Deleted successfully" });
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

/**
 * get /contact-submit
 * contact page
 */
const contactPage = asyncHandler(async (req, res, next) => {
  try {
    const infoSuccessMessage = req.flash("infoSuccess");
    const infoFailureMessage = req.flash("infoFailure");
    res.status(200).render("contact", {
      title: "epiceats - contact us",
      infoSuccessMessage,
      infoFailureMessage,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * Post /contact-submit
 * contact submit form
 */
const contactSubmit = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const questionData = {
      name: body.name,
      email: body.email,
      question: body.question,
    };

    await contactModel.create(questionData);
    req.flash("infoSuccess", "Thank you for contacting us");
    res.redirect("/contact-submit");
  } catch (error) {
    req.flash("infoFailure", error.message);
    throw new Error(error.message);
  }
});

export {
  homepage,
  categoryPage,
  exploreCategory,
  recipePage,
  aboutPage,
  exploreCategoryLatest,
  searchRecipes,
  recipeSubmitPage,
  submitRecipe,
  recipeDelete,
  contactPage,
  contactSubmit,
};
