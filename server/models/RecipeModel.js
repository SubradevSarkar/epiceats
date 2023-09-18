import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
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
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
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
    isApproved: {
      type: Boolean,
      default: false,
    },
    extraData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

recipeSchema.index({ name: "text", description: "text" });

const recipeModel = mongoose.model("recipes", recipeSchema);

export default recipeModel;
