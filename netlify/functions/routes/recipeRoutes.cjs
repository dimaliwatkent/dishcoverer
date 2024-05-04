const express = require("express");
const RecipeModel = require("../models/recipeModel.cjs");

const router = express.Router();

// get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get single recipe
router.get("/:id", getRecipe, (req, res) => {
  res.json(res.recipe);
});

// CREATE recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    const newRecipe = await recipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE recipe
router.patch("/:id", getRecipe, async (req, res) => {
  try {
    if (req.body.name !== null) {
      res.recipe.name = req.body.name;
    }
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", getRecipe, async (req, res) => {
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE recipe
router.delete("/:id", getRecipe, async (req, res) => {
  try {
    await RecipeModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware functions to get single recipe by id
async function getRecipe(req, res, next) {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.recipe = recipe;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
