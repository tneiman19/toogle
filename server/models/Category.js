const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  categoryDesc: {
    type: String,
    required: true,
    trim: true,
  },
  categoryImage: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = model("Category", categorySchema);
module.exports = Category;
