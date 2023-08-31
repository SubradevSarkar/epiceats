const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;
