import React, { useState, useEffect } from "react";
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

const RecipeData: React.FC = () => {
  const { recipesFiltered } = useRecipeContext();
  // Initialize state with value from local storage
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
        // Remove from favorites
        return prevFavorites.filter((id: string) => id !== recipeId);
      } else {
        // Add to favorites
        return [...prevFavorites, recipeId];
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {recipesFiltered.map((recipe) => (
        <div key={recipe._id}>
          <Card className="max-w-52">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col pr-8">
                <h2>{recipe.title}</h2>

                <p>{recipe.author}</p>

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
              <p>{recipe.categories}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="flat" color="primary">
                  Edit
                </Button>
                <Button variant="flat" color="danger">
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default RecipeData;
