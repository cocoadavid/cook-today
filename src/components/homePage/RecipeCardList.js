import React, { useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";
import RecipeCard from "./RecipeCard";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { LanguageContext } from "../../context/LanguageContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  loadMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
  },
  progressBarWrapper: {
    height: 4,
  },
});

const RecipeCardList = ({
  recipes,
  zoomIn,
  onRecipeClick,
  loadMore,
  loading,
}) => {
  const language = useContext(LanguageContext);
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {recipes.map((r, idx) => (
        <Zoom
          key={`recipe-card-by-ingredient-${r.id}`}
          in={zoomIn}
          mountOnEnter
          unmountOnExit
          style={{ transitionDelay: idx * 49 + 1 }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <RecipeCard recipe={r} onClick={onRecipeClick} />
          </Grid>
        </Zoom>
      ))}
      <Grid item xs={12} className={classes.loadMoreContainer}>
        <Zoom in={!loading} mountOnEnter unmountOnExit>
          <Button
            variant="text"
            color="primary"
            onClick={loadMore}
            disabled={loading}
          >
            <ArrowDownwardIcon className="left-icon" />
            {language.dictionary.loadMore}
            <ArrowDownwardIcon className="right-icon" />
          </Button>
        </Zoom>
        <Zoom in={loading} mountOnEnter unmountOnExit>
          <CircularProgress color="primary" />
        </Zoom>
      </Grid>
    </Grid>
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
  zoomIn: PropTypes.bool.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  loading: PropTypes.bool,
};

export default RecipeCardList;
