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
        size="2xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {recipe.title}
              </ModalHeader>
              <ModalBody>
                <h3>
                  By <span className="">{recipe.author}</span>
                </h3>
                <p className="mr-2">Ingredients: </p>
                <ul className="flex gap-1 flex-wrap">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h3>{recipe.instructions}</h3>
                <h3>{recipe.categories}</h3>
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
