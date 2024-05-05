export const categoriesList = [
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

export interface Recipe {
  _id: string;
  title: string;
  author: string;
  ingredients: string[];
  instructions: string;
  categories: string[];
}
