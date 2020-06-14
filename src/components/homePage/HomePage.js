import React, { useEffect, useState } from "react";
import { getExampleRecipes } from "../../api/mockApi";
import Grid from "@material-ui/core/Grid";
import IngredientSearch from "../common/IngredientSearch";
import { getRecipesComplex } from "../../api/spoonacularApi";
import RecipeCardList from "./RecipeCardList";
import RecipeDialog from "../common/RecipeDialog";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchCheckboxes from "./SearchCheckboxes";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dlgOpen, setDlgOpen] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setDiets] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [checkBoxState, setCheckboxState] = useState({
    glutenFree: false,
    dairyFree: false,
    vegetarian: false,
    vegan: false,
  });
  const { glutenFree, dairyFree, vegetarian, vegan } = checkBoxState;

  const onIngredientSelect = (value = []) => {
    // value is an array of objects
    setIngredients(value);
  };

  const handleCheckBoxChange = (event) => {
    const name = event.target.name;
    const checked = event.target.checked;
    setCheckboxState({
      ...checkBoxState,
      [name]: checked,
    });
    switch (name) {
      case "glutenFree":
        handleIntoleranceChange("gluten", checked);
        break;
      case "dairyFree":
        handleIntoleranceChange("dairy", checked);
        break;
      case "vegetarian":
        handleDietsChange(name, checked);
        break;
      case "vegan":
        handleDietsChange(name, checked);
        break;
      default:
        console.log("this filter is unhandled: ", name);
        break;
    }
  };

  const handleDietsChange = (name, checked) => {
    let dietsCopy = [...diets];
    if (checked) {
      setDiets([...diets, name]);
    } else {
      let idx = dietsCopy.indexOf(name);
      if (idx > -1) {
        dietsCopy.splice(idx, 1);
      }
      setDiets(dietsCopy);
    }
  };

  const handleIntoleranceChange = (name, checked) => {
    let intolerancesCopy = [...intolerances];
    if (checked) {
      setIntolerances([...intolerances, name]);
    } else {
      let idx = intolerancesCopy.indexOf(name);
      if (idx > -1) {
        intolerancesCopy.splice(idx, 1);
      }
      setIntolerances(intolerancesCopy);
    }
  };

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  useEffect(() => {
    if (ingredients.length > 0) {
      console.log("loading...");
      loadRecipes(ingredients, intolerances, diets);
    }
  }, [ingredients, intolerances, diets]);

  useEffect(() => {
    setRecipes(getExampleRecipes());
    setZoomIn(true);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <IngredientSearch onSelection={onIngredientSelect} />
          <SearchCheckboxes
            handleCheckboxChange={handleCheckBoxChange}
            glutenFree={glutenFree}
            dairyFree={dairyFree}
            vegetarian={vegetarian}
            vegan={vegan}
          />
        </Grid>
      </Grid>
      <div style={{ height: 4 }}>
        {loadingRecipes && <LinearProgress color="secondary" />}
      </div>
      <RecipeCardList
        recipes={recipes}
        zoomIn={zoomIn}
        onRecipeClick={onRecipeClick}
      />
      <RecipeDialog
        open={dlgOpen}
        handleClose={() => setDlgOpen(false)}
        recipeId={selectedRecipeId}
        recipeInfo={selectedRecipeInfo}
      />
    </>
  );

  function loadRecipes(ingredientsArray, intolerancesArray, dietsArray) {
    let ingredientsString = ingredientsArray.map((o) => o.name).join(",");
    let intolerancesString = intolerancesArray.join(",");
    let dietsString = dietsArray.join(",");

    setLoadingRecipes(true);
    getRecipesComplex(ingredientsString, intolerancesString, dietsString)
      .then((res) => {
        console.log("recipes:", res.data);
        setRecipes(res.data.results);
        setZoomIn(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingRecipes(false));
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    console.log(clickedRecipe);
    setSelectedRecipeInfo(clickedRecipe);
    setDlgOpen(true);
    // getRecipeInfoById(id)
    //   .then((res) => {
    //     console.log("recipe", res.data);
    //     setSelectedRecipeInfo(res.data);
    //     setDlgOpen(true);
    //   })
    //   .catch((error) => console.log(error));
  }
};

export default HomePage;
