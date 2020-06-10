import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import RecipeCardByIngredient from "./RecipeCard";

const RecipeCardList = ({ recipes, zoomIn, onRecipeClick }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((r, idx) => (
        <Zoom
          key={`recipe-card-by-ingredient-${r.id}`}
          in={zoomIn}
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
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
  zoomIn: PropTypes.bool.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
};

export default RecipeCardList;
