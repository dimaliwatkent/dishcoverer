import { useState } from "react";
import { Navbar, NavbarContent, Input } from "@nextui-org/react";
import { Search, ChevronUp } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Select, SelectItem } from "@nextui-org/react";

const categories = [
  { value: "all", label: "All" },
  { value: "appetizers", label: "Appetizers" },
  { value: "breakfast", label: "Breakfast" },
  { value: "dinner", label: "Dinner" },
  { value: "lunch", label: "Lunch" },
  { value: "main_course", label: "Main Course" },
  { value: "side_dish", label: "Side Dish" },
  { value: "snacks", label: "Snacks" },
  { value: "soups", label: "Soups" },
  { value: "desserts", label: "Desserts" },
  { value: "beverages", label: "Beverages" },
  { value: "sauces_and_seasonings", label: "Sauces and Seasonings" },
];

const BottomBar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
  };

  return (
    <div className="absolute bottom-0 w-full z-50">
      <Navbar maxWidth="full">
        <NavbarContent as="div" justify="start" className="max-w-80">
          <Input
            placeholder="Search an Ingredient"
            size="sm"
            endContent={<Search />}
            type="search"
            className=""
            onChange={handleIngredientChange}
          />
        </NavbarContent>
        <NavbarContent as="div" justify="start">
          <Select
            placeholder="Categories"
            size="sm"
            className="max-w-60"
            disableSelectorIconRotation
            selectorIcon={<ChevronUp />}
            selectionMode="multiple"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
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
