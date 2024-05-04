import { Button } from "@nextui-org/button";
import RecipeData from "./components/RecipeData";
import { Divider } from "@nextui-org/divider";
import BottomBar from "./components/BottomBar";
import { RecipeProvider } from "./components/RecipeContext";

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

          <Divider />
          <Button className="mt-3" color="secondary" variant="flat">
            Add a Recipe
          </Button>
        </div>

        <RecipeData />
      </RecipeProvider>
    </div>
  );
};

export default App;
