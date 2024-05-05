// import { Button } from "@nextui-org/button";
import RecipeData from "./components/RecipeData";
import { Divider } from "@nextui-org/divider";
import BottomBar from "./components/BottomBar";
import { RecipeProvider } from "./components/RecipeContext";
import AddRecipe from "./components/AddRecipe";

const App = () => {
  return (
    <div>
      <RecipeProvider>
        <BottomBar />

        <div className="flex flex-col justify-center items-center p-3">
          <h1 className="text-4xl font-pacifico pb-1">Dishcoverer</h1>
          <p className="font-bold ">
            Become a Dishcoverer and Unearth the World's Best Recipes!
          </p>

          <AddRecipe />
          <Divider />
        </div>

        <RecipeData />
      </RecipeProvider>
      <div className="h-20"></div>
    </div>
  );
};

export default App;
