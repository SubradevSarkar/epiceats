const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["Indian", "Thai", "American", "Chinese", "Mexican", "Spanish"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const recipeModel = mongoose.model("recipes", recipeSchema);

module.exports = recipeModel;
