const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    extraData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
