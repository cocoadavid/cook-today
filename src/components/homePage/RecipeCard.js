import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Icon from "@mdi/react";
import { infoIcons } from "../../utils/icons";
import { convertToHoursAndMinutes } from "../../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  content: {
    padding: "8px 16px 4px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 16px 8px",
  },
}));

const RecipeCard = ({ recipe, ...props }) => {
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
      elevation={4}
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
      <CardContent className={classes.content}>
        <Typography
          variant="h6"
          component="h3"
          color="textPrimary"
          align="center"
        >
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div
          style={{ display: "flex", alignItems: "center" }}
          title="preparation time"
        >
          <ScheduleIcon color="primary" style={{ marginRight: 6 }} />{" "}
          <Typography variant="subtitle2" color="textSecondary">
            {convertToHoursAndMinutes(recipe.readyInMinutes)}
          </Typography>
        </div>
        <div>
          {infoIcons.map(
            (icon) =>
              recipe[icon.name] && (
                <Icon
                  key={`recipe_card_${icon.name}`}
                  path={icon.path}
                  color="#F2385A"
                  size={1}
                  title={icon.title}
                />
              )
          )}
        </div>
      </CardActions>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;
