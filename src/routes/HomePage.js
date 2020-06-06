import React, { useEffect, useState } from "react";
import { getExampleRecipes } from "../api/testApi";
import Grid from "@material-ui/core/Grid";
import RecipeCardByIngredient from "../components/common/RecipeCardByIngredients";
import IngredientSearch from "../components/common/IngredientSearch";
import {
  getRecipeInfoById,
  getRecipesByIngredients,
} from "../api/spoonacularApi";
import Zoom from "@material-ui/core/Zoom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [slideIn, setSlideIn] = useState(false);

  const onIngredientSelect = (value = []) => {
    // value is an array of objects
    let ingredientListString = value.map((o) => o.name).join(",");
    if (ingredientListString) {
      setSlideIn(false);
      loadRecipes(ingredientListString);
    }
  };

  const onRecipeClick = (id) => {
    loadRecipeById(id);
  };

  useEffect(() => {
    setRecipes(getExampleRecipes());
    setSlideIn(true);
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} xl={4}>
          <IngredientSearch onSelection={onIngredientSelect} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {recipes.map((r, idx) => (
          <Zoom
            key={`recipe-card-${r.id}`}
            in={slideIn}
            mountOnEnter
            unmountOnExit
            timeout={300}
            style={{ transitionDelay: idx * 49 + 1 }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <RecipeCardByIngredient recipe={r} onClick={onRecipeClick} />
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </div>
  );

  function loadRecipes(ingredients) {
    getRecipesByIngredients(ingredients)
      .then((res) => {
        console.log("recipes:", res.data);
        setRecipes(res.data);
        setSlideIn(true);
      })
      .catch((error) => console.log(error));
  }

  function loadRecipeById(id) {
    getRecipeInfoById(id)
      .then((res) => {
        console.log("recipe", res.data);
      })
      .catch((error) => console.log(error));
  }
};

export default HomePage;
