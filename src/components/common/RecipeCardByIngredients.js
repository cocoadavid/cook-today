import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    cursor: "pointer",
    maxWidth: 345,
    border: "2px solid transparent",
    "&:hover": {
      borderColor: `${theme.palette.secondary.main}`,
      transition: "border 250ms",
    },
  },
  media: {
    height: 0,
    paddingTop: "61.8%", // 75% for 4:3 , either set height or paddingTop
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const RecipeCardByIngredient = ({ recipe }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardMedia
        className={classes.media}
        image={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
        title={recipe.title}
      />
      <CardContent>
        <Typography variant="h6" component="h3" color="primary" align="center">
          {recipe.title}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary">
          missing ingredients: {recipe.missedIngredientCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

RecipeCardByIngredient.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCardByIngredient;
