import mongoose from "mongoose";

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

export default CategoryModel;
