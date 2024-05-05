import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Recipe } from "./types";

interface RecipeContextType {
  recipes: Recipe[];
  recipesFiltered: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  filterRecipes: (category: string | null, search: string) => void;
  updateRecipes: () => void;
}
interface RecipeProviderProps {
  children: React.ReactNode;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesFiltered, setRecipesFiltered] = useState<Recipe[]>([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const fetchedRecipes = await fetchRecipes();

    setRecipesFiltered(fetchedRecipes);
    setRecipes(fetchedRecipes);
  };

  const updateRecipes = () => {
    loadRecipes();
  };

  const filterRecipes = (category: string | null, search: string) => {
    let filteredRecipes = recipes;
    if (category === "all") {
      setRecipesFiltered(recipes);
    } else if (category) {
      filteredRecipes = recipes.filter((recipe) =>
        recipe.categories.includes(category),
      );
    }
    if (search) {
      // search title
      // filteredRecipes = filteredRecipes.filter((recipe) =>
      //   recipe.title.toLowerCase().includes(search.toLowerCase()),
      // );

      // search ingredient
      // filteredRecipes = filteredRecipes.filter((recipe) =>
      //   recipe.ingredients.some((ingredient) =>
      //     ingredient.toLowerCase().includes(search.toLowerCase()),
      //   ),
      // );

      // search both ingredient and title
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(search.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    }
    setRecipesFiltered(filteredRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        recipesFiltered,
        setRecipes,
        filterRecipes,
        updateRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>(
      "https://dishcoverer.netlify.app/.netlify/functions/api/",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
