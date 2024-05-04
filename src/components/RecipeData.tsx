import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { useRecipeContext } from "./RecipeContext";

const RecipeData: React.FC = () => {
  const { recipesFiltered } = useRecipeContext();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {recipesFiltered.map((recipe) => (
        <div key={recipe._id}>
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h2>{recipe.title}</h2>
                <p>{recipe.author}</p>
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
