const mongoose = require("mongoose");

const { Schema } = mongoose;
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    author: {
      type: String,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    categories: [
      {
        type: String,
        default: [],
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = recipeSchema;
