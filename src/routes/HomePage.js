import React, { useEffect, useState } from "react";
import { getExampleRecipeInfo, getExampleRecipes } from "../api/mockApi";
import Grid from "@material-ui/core/Grid";
import IngredientSearch from "../components/common/IngredientSearch";
import {
  getInstructions,
  getRecipeInfoById,
  getRecipesByIngredients,
} from "../api/spoonacularApi";
import RecipeCardByIngredientsList from "../components/homePage/RecipeCardByIngredientsList";
import RecipeDialog from "../components/common/RecipeDialog";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dlgOpen, setDlgOpen] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const onIngredientSelect = (value = []) => {
    // value is an array of objects
    let ingredientListString = value.map((o) => o.name).join(",");
    if (ingredientListString) {
      setZoomIn(false);
      loadRecipes(ingredientListString);
    }
  };

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  useEffect(() => {
    setRecipes(getExampleRecipes());
    setZoomIn(true);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} xl={4}>
          <IngredientSearch onSelection={onIngredientSelect} />
        </Grid>
      </Grid>
      <RecipeCardByIngredientsList
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

  function loadRecipes(ingredients) {
    getRecipesByIngredients(ingredients)
      .then((res) => {
        console.log("recipes:", res.data);
        setRecipes(res.data);
        setZoomIn(true);
      })
      .catch((error) => console.log(error));
  }

  function loadRecipeById(id) {
    // setSelectedRecipeInfo(getExampleRecipeInfo());
    // setDlgOpen(true);
    // console.log(getExampleRecipeInfo());

    getRecipeInfoById(id)
      .then((res) => {
        console.log("recipe", res.data);
        setSelectedRecipeInfo(res.data);
        setDlgOpen(true);
      })
      .catch((error) => console.log(error));
  }
};

export default HomePage;
