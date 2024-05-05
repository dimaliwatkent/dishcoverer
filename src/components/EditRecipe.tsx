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
  const [title, setTitle] = useState(recipe.title);
  const [author, setAuthor] = useState(recipe.author);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState<string[]>(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const [categories, setCategories] = useState(recipe.categories);
  console.log(categories);
  const [servings, setServings] = useState<number>(recipe.servings);
  const [cookingTime, setCookingTime] = useState<number>(recipe.cookingTime);
  const [inputValue, setInputValue] = useState("");

  const { updateRecipes } = useRecipeContext();
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const allFieldsFilled =
      title &&
      author &&
      ingredients.length > 0 &&
      description &&
      instructions &&
      categories &&
      servings &&
      cookingTime;
    setIsFormValid(Boolean(allFieldsFilled));
  }, [
    title,
    author,
    description,
    ingredients,
    instructions,
    categories,
    servings,
    cookingTime,
  ]);

  async function handleSubmit() {
    try {
      // const categoriesArray = categories.split(",");
      const response = await axios.put(
        `https://dishcoverer.netlify.app/.netlify/functions/api/${recipe._id}`,
        {
          title: title,
          author: author,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
          // categories: categoriesArray,
          categories: categories,
          servings: servings,
          cookingTime: cookingTime,
        },
      );
      console.log(response.data);

      // Reset values
      // setTitle("");
      // setAuthor("");
      // setDescription("");
      // setIngredients([]);
      // setInstructions("");
      // setCategories([]);
      // setInputValue("");
      // setServings(1);
      // setCookingTime(0);

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
    setCategories(value.split(","));
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
                  label="Description"
                  placeholder="Write a description"
                  value={instructions}
                  onChange={(e) => setDescription(e.target.value)}
                />
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

                <Input
                  size="sm"
                  type="number"
                  label="Servings"
                  value={servings.toString()}
                  onChange={(e) => setServings(Number(e.target.value))}
                />

                <Input
                  size="sm"
                  type="number"
                  label="Cooking Time (Minutes)"
                  value={cookingTime.toString()}
                  onChange={(e) => setCookingTime(Number(e.target.value))}
                />
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
