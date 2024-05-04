import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

interface Recipe {
  _id: string;
  title: string;
  categories: [string];
}

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

const RecipeData: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    };

    loadRecipes();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h2>{recipe.title}</h2>
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
