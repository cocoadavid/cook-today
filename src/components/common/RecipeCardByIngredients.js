import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Icon from "@mdi/react";
import { mdiFoodVariant } from "@mdi/js";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    cursor: "pointer",
    position: "relative",
    maxWidth: 400, // image width resolution is 393px
    "&:hover": {
      "& img": {
        opacity: 0.2,
      },
      "& div": {
        visibility: "visible",
      },
    },
  },
  media: {
    overflow: "hidden",
    height: 200,
    position: "relative",
  },
  recipeButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 8,
    visibility: "hidden",
  },
  image: {
    width: "100%",
    transition: "opacity 250ms ease",
    backfaceVisibility: "hidden",
  },
  lowResImg: {
    width: "100%",
    filter: "blur(4px)",
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
  badgeContainer: {
    position: "absolute",
    height: 40,
    width: 40,
    backgroundColor: "rgba(255,255,255, 0.8)",
    borderRadius: "50%",
    top: 4,
    right: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    margin: "4px 8px",
  },
}));

const RecipeCardByIngredient = ({ recipe, ...props }) => {
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = useState({});

  const handleImgLoaded = (id) => (event) => {
    let imgLoadedCopy = { ...imgLoaded };
    imgLoadedCopy[id] = true;
    setImgLoaded(imgLoadedCopy);
  };

  return (
    <Card
      className={classes.root}
      elevation={2}
      onClick={() => props.onClick(recipe.id)}
    >
      <div className={classes.media}>
        {/* display a low-res image until high-res image is loaded*/}
        {!imgLoaded[recipe.id] && (
          <img
            className={classes.lowResImg}
            src={`https://spoonacular.com/recipeImages/${recipe.id}-90x90.${recipe.imageType}`}
            alt={recipe.title}
          />
        )}
        <img
          className={classes.image}
          onLoad={handleImgLoaded(recipe.id)}
          src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
          alt={recipe.title}
        />
        <div className={classes.recipeButton}>
          <Typography variant="button" component="span">
            Click for the Recipe
          </Typography>
        </div>
      </div>
      <CardContent>
        <Typography variant="h6" component="h3" color="primary" align="center">
          {recipe.title}
        </Typography>
      </CardContent>
      <div
        className={classes.badgeContainer}
        title={"The number of ingredients"}
      >
        <Badge
          className={classes.badge}
          badgeContent={
            recipe.usedIngredientCount + recipe.missedIngredientCount
          }
          color="secondary"
          showZero
        >
          <Icon size={1} color={"#F2385A"} path={mdiFoodVariant} />
        </Badge>
      </div>
    </Card>
  );
};

RecipeCardByIngredient.propTypes = {
  recipe: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCardByIngredient;
