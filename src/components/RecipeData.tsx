import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useRecipeContext } from "./RecipeContext";
import { Sparkle, Sparkles } from "lucide-react";
import EditRecipe from "./EditRecipe";
import ViewRecipe from "./ViewRecipe";

const RecipeData: React.FC = () => {
  const { recipesFiltered, updateRecipes } = useRecipeContext();

  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (recipeId: string) => {
    setFavorites((prevFavorites: string[]) => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter((id: string) => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };
  const formatCategoryName = (category: string): string => {
    let formattedCategory = category.replace(/_/g, " ");
    formattedCategory = formattedCategory.replace(/\b\w/g, (l) =>
      l.toUpperCase(),
    );
    return formattedCategory;
  };

  const deleteRecipe = async (id: string) => {
    try {
      await axios.delete(
        `https://dishcoverer.netlify.app/.netlify/functions/api/${id}`,
      );
      // reloads after delete
      updateRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleAnchorClick = () => {
    alert();
  };
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {recipesFiltered.map((recipe) => (
        <div key={recipe._id}>
          <ViewRecipe recipe={recipe}>
            <Card className="max-w-52">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col pr-8">
                  <h2 className="text-lg font-bold">{recipe.title}</h2>

                  <p className="text-sm text-gray-400">{recipe.author}</p>

                  <Tooltip content="Add to Favorites">
                    <Button
                      isIconOnly
                      className="rounded-full absolute top-2 right-2 z-10"
                      size="sm"
                      variant="flat"
                      color={
                        favorites.includes(recipe._id) ? "success" : "default"
                      }
                      onClick={() => handleFavoriteToggle(recipe._id)}
                    >
                      {favorites.includes(recipe._id) ? (
                        <Sparkles />
                      ) : (
                        <Sparkle />
                      )}
                    </Button>
                  </Tooltip>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-xs text-gray-500">
                  {recipe.categories
                    .map((category) => formatCategoryName(category))
                    .join(", ")}
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <div className="flex gap-2">
                  <EditRecipe recipe={recipe} />
                  <Button
                    variant="flat"
                    color="danger"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </ViewRecipe>
        </div>
      ))}
    </div>
  );
};

export default RecipeData;
