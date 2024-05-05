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
    description: {
      type: String,
      required: true,
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
    servings: {
      type: Number,
      min: 1,
    },
    cookingTime: {
      type: Number,
      min: 1,
    },
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
