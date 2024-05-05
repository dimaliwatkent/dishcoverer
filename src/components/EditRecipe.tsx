import axios from "axios";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { useRecipeContext } from "./RecipeContext";
import { ChevronUp, X } from "lucide-react";
import { categoriesList, Recipe } from "./types";

interface EditRecipeProps {
  recipe: Recipe;
}

const EditRecipe: React.FC<EditRecipeProps> = ({ recipe }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipeTitle, setRecipeTitle] = useState(recipe.title);
  const [recipeAuthor, setRecipeAuthor] = useState(recipe.author);
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>(
    recipe.ingredients,
  );
  const [recipeInstructions, setRecipeInstructions] = useState(
    recipe.instructions,
  );
  const [recipeCategories, setRecipeCategories] = useState<string>(
    recipe.categories.join(","),
  );
  const [inputValue, setInputValue] = useState("");

  const { updateRecipes } = useRecipeContext();
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const allFieldsFilled =
      recipeTitle &&
      recipeAuthor &&
      recipeIngredients.length > 0 &&
      recipeInstructions &&
      recipeCategories;
    setIsFormValid(Boolean(allFieldsFilled));
  }, [
    recipeTitle,
    recipeAuthor,
    recipeIngredients,
    recipeInstructions,
    recipeCategories,
  ]);

  async function handleSubmit() {
    try {
      const categoriesArray = recipeCategories.split(",");
      console.log(
        recipeTitle,
        recipeAuthor,
        recipeIngredients,
        recipeInstructions,
        categoriesArray,
      );
      const response = await axios.put(
        `https://dishcoverer.netlify.app/.netlify/functions/api/${recipe._id}`,
        {
          title: recipeTitle,
          author: recipeAuthor,
          ingredients: recipeIngredients,
          instructions: recipeInstructions,
          categories: recipeCategories,
        },
      );
      console.log(response.data);
      console.log(
        recipeTitle,
        recipeAuthor,
        recipeIngredients,
        recipeInstructions,
        categoriesArray,
      );

      // Reset values
      setRecipeTitle("");
      setRecipeAuthor("");
      setRecipeIngredients([]);
      setRecipeInstructions("");
      setRecipeCategories("");
      setInputValue("");

      onClose();
      updateRecipes();
    } catch (error) {
      console.error(error);
    }
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setRecipeCategories(value);
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };
  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      setRecipeIngredients([...recipeIngredients, inputValue]);
      setInputValue("");
    }
  };
  const handleRemoveIngredient = (indexToRemove: number) => {
    setRecipeIngredients(
      recipeIngredients.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <>
      <div>
        <Button variant="flat" color="primary" onPress={onOpen}>
          Edit
        </Button>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Recipe
              </ModalHeader>
              <ModalBody>
                <Input
                  size="sm"
                  type="text"
                  label="Recipe Name"
                  value={recipeTitle}
                  onChange={(e) => setRecipeTitle(e.target.value)}
                />
                <Input
                  size="sm"
                  type="text"
                  label="Author"
                  value={recipeAuthor}
                  onChange={(e) => setRecipeAuthor(e.target.value)}
                />
                <div className="flex ">
                  <p className="mr-2">Ingredients: </p>
                  <ul className="flex gap-1 flex-wrap">
                    {recipeIngredients.map((ingredient, index) => (
                      <li key={index}>
                        <button
                          className="bg-default px-2 rounded-xl flex items-center"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <p className="pr-1">{ingredient}</p>
                          <X size={"0.8rem"} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={handleIngredientChange}
                    placeholder="Enter ingredient and PRESS INSERT"
                  />
                  <Button
                    color="warning"
                    variant="flat"
                    onClick={handleAddIngredient}
                  >
                    Insert
                  </Button>
                </div>
                <Textarea
                  label="Instructions"
                  placeholder="Enter your step by step procedure"
                  value={recipeInstructions}
                  onChange={(e) => setRecipeInstructions(e.target.value)}
                />

                <Select
                  placeholder="Categories"
                  disableSelectorIconRotation
                  selectorIcon={<ChevronUp />}
                  selectionMode="multiple"
                  value={recipeCategories}
                  onChange={handleCategoryChange}
                >
                  {categoriesList.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                {!isFormValid ? (
                  <Tooltip content="Please fill up all the fields">
                    <Button
                      color="default"
                      variant="flat"
                      className="text-gray-400"
                    >
                      Apply
                    </Button>
                  </Tooltip>
                ) : (
                  <Button color="primary" variant="flat" onPress={handleSubmit}>
                    Apply
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditRecipe;
