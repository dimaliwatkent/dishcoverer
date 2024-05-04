const mongoose = require("mongoose");
const recipeSchema = require("../schema/recipeSchema.cjs");

const RecipeModel = mongoose.model("Recipes", recipeSchema);

module.exports = RecipeModel;
