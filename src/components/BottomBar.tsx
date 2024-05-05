import { useState } from "react";
import { Navbar, NavbarContent, Input } from "@nextui-org/react";
import { Search, ChevronUp } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Select, SelectItem } from "@nextui-org/react";
import { useRecipeContext } from "./RecipeContext";
import { categoriesList } from "./types";

const allCategoriesList = [{ value: "all", label: "All" }, ...categoriesList];

const BottomBar = () => {
  const { filterRecipes } = useRecipeContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
    filterRecipes(value, search);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    filterRecipes(selectedCategory, event.target.value);
  };
  return (
    <div className="fixed bottom-0 w-full z-50">
      <Navbar maxWidth="full">
        <NavbarContent as="div" justify="start" className="max-w-80">
          <Input
            placeholder="Search a Recipe or Ingredient"
            size="sm"
            endContent={<Search />}
            type="search"
            onChange={handleSearchChange}
          />
        </NavbarContent>
        <NavbarContent as="div" justify="start">
          <Select
            placeholder="Categories"
            size="sm"
            className="max-w-60"
            disableSelectorIconRotation
            selectorIcon={<ChevronUp />}
            selectionMode="single"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {allCategoriesList.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </NavbarContent>

        <ThemeSwitcher />
      </Navbar>
    </div>
  );
};

export default BottomBar;
