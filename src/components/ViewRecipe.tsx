import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Recipe } from "./types";

interface EditRecipeProps {
  recipe: Recipe;
  children?: React.ReactNode;
}

const ViewRecipe: React.FC<EditRecipeProps> = ({ recipe, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div>
        <a onClick={onOpen}> {children}</a>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="5xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {recipe.title}
                <h3 className="text-sm font-normal">
                  By <span className="">{recipe.author}</span>
                </h3>
              </ModalHeader>
              <ModalBody>
                <p className="">{recipe.description}</p>
                <h3 className="font-bold text-xl">Ingredients: </h3>
                <ul className="">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-xl">Instructions: </h3>
                <p>{recipe.instructions}</p>
                <p className="font-bold">Servings: {recipe.servings}</p>
                <p className="font-bold">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ViewRecipe;
