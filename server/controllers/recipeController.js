const categoryModel = require("../models/CategoryModel");
const recipeModel = require("../models/RecipeModel");
const uploadImage = require("../config/firebaseConfig");
const contactModel = require("../models/ContactModel");

/**
 * GET /
 * homepage
 */
exports.homepage = async (req, res) => {
  try {
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
    res.render("index", { title: "epiceats - Home", categories, food });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /categories
 * Categories
 */
exports.categoryPage = async (req, res) => {
  try {
    const categoryLimit = 20;
    const categories = await categoryModel.find({}).limit(categoryLimit);

    res.render("categories", { title: "epiceats - Categories", categories });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /categories/:id
 * Categories
 */
exports.exploreCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryLimit = 20;
    const category = await recipeModel
      .find({ category: categoryId })
      .limit(categoryLimit);

    res.render("categories", {
      title: `epiceats - ${categoryId}`,
      categoryId,
      category,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /recipe/:id
 * recipe
 */
exports.recipePage = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeModel.findById(recipeId);

    res.render("recipe", { title: "epiceats - Recipe", recipe });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /about
 * recipe
 */
exports.aboutPage = async (req, res) => {
  try {
    res.render("about", { title: "epiceats - About" });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * GET /explore-latest
 * explore Latest Category
 */
exports.exploreCategoryLatest = async (req, res) => {
  try {
    const recipeLimit = 20;
    const recipes = await recipeModel
      .find({})
      .sort({ _id: -1 })
      .limit(recipeLimit);
    res.render("exploreLatest", {
      title: "epiceats - Explore latest",
      recipes,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Post /search
 * searchRecipes
 */
exports.searchRecipes = async (req, res) => {
  try {
    const searchContext = req.body.searchTerm;
    const recipes = await recipeModel.find({
      $text: { $search: searchContext, $diacriticSensitive: true },
    });

    res.render("search", { title: "epiceats - Search", recipes });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * get /submit-recipe
 * submitRecipe
 */
exports.recipeSubmitPage = async (req, res) => {
  try {
    const infoSuccessMessage = req.flash("infoSuccess");
    const infoFailureMessage = req.flash("infoFailure");
    res.render("submitRecipe", {
      title: "epiceats - Submit recipe",
      infoSuccessMessage,
      infoFailureMessage,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Post /submit-recipe
 * submitRecipe
 */
exports.submitRecipe = async (req, res) => {
  try {
    let imageUrl;

    if (!req.files || Object.keys(req.files).length === 0) {
      imageUrl = await uploadImage(req);
    } else {
      throw new Error("choose image to upload");
    }

    const body = req.body;
    const recipeData = {
      email: body.email,
      name: body.name,
      description: body.description,
      ingredients: body.ingredients,
      category: body.category,
      image: imageUrl,
    };

    await recipeModel.create(recipeData);
    req.flash("infoSuccess", "Recipe submitted successfully");
    res.redirect("/submit-recipe");
  } catch (error) {
    req.flash("infoFailure", error.message);
    res.redirect("/submit-recipe");
  }
};

/**
 * get /contact-submit
 * contact page
 */
exports.contactPage = async (req, res) => {
  try {
    const infoSuccessMessage = req.flash("infoSuccess");
    const infoFailureMessage = req.flash("infoFailure");
    res.render("contact", {
      title: "epiceats - contact us",
      infoSuccessMessage,
      infoFailureMessage,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Post /contact-submit
 * contact submit form
 */
exports.contactSubmitPage = async (req, res) => {
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
};
