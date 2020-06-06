import React, { useEffect, useState } from "react";
import { getExampleRecipes } from "../api/testApi";
import Grid from "@material-ui/core/Grid";
import RecipeCardByIngredient from "../components/common/RecipeCardByIngredients";
import IngredientSearch from "../components/common/IngredientSearch";
import { getRecipesByIngredients } from "../api/spoonacularApi";
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

  useEffect(() => {
    setRecipes(getExampleRecipes());
    setSlideIn(true);
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <IngredientSearch onSelection={onIngredientSelect} />
        </Grid>
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
              <RecipeCardByIngredient recipe={r} />
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
};

export default HomePage;
