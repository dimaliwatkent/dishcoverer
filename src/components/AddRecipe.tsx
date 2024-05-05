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
import { categoriesList } from "./types";

const AddRecipe = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { updateRecipes } = useRecipeContext();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      title && author && ingredients.length > 0 && instructions && categories;
    setIsFormValid(Boolean(allFieldsFilled));
  }, [title, author, ingredients, instructions, categories]);

  async function handleSubmit() {
    try {
      const categoriesArray = categories.split(",");
      console.log(title, author, ingredients, instructions, categoriesArray);
      const response = await axios.post(
        "https://dishcoverer.netlify.app/.netlify/functions/api/",
        {
          title: title,
          author: author,
          ingredients: ingredients,
          instructions: instructions,
          categories: categories,
        },
      );
      console.log(response.data);
      console.log(title, author, ingredients, instructions, categories);

      // Reset values
      setTitle("");
      setAuthor("");
      setIngredients([]);
      setInstructions("");
      setCategories("");
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
    setCategories(value);
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
  };
  const handleAddIngredient = () => {
    if (inputValue.trim() !== "") {
      setIngredients([...ingredients, inputValue]);
      setInputValue("");
    }
  };
  const handleRemoveIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div>
        <Button
          variant="flat"
          size="md"
          color="secondary"
          onPress={onOpen}
          className="m-2"
        >
          Add Recipe
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
                Add Your Own Recipe
              </ModalHeader>
              <ModalBody>
                <Input
                  size="sm"
                  type="text"
                  label="Recipe Name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  size="sm"
                  type="text"
                  label="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <div className="flex ">
                  <p className="mr-2">Ingredients: </p>
                  <ul className="flex gap-1 flex-wrap">
                    {ingredients.map((ingredient, index) => (
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
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />

                <Select
                  placeholder="Categories"
                  disableSelectorIconRotation
                  selectorIcon={<ChevronUp />}
                  selectionMode="multiple"
                  value={categories}
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
                      Add
                    </Button>
                  </Tooltip>
                ) : (
                  <Button color="primary" variant="flat" onPress={handleSubmit}>
                    Add
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

export default AddRecipe;
