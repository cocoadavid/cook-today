import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { searchTypes } from "../../utils/enums";

const useStyles = makeStyles({
  root: {
    margin: "0 4px 16px",
  },
  button: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

const SearchTypeSelect = ({ searchType, onClick }) => {
  const classes = useStyles();
  return (
    <ButtonGroup className={classes.root} size="small">
      <Button
        variant={
          searchType === searchTypes.INGREDIENT ? "contained" : "outlined"
        }
        color="primary"
        className={classes.button}
        onClick={onClick(searchTypes.INGREDIENT)}
      >
        Search By Ingredients
      </Button>
      <Button
        variant={searchType === searchTypes.TITLE ? "contained" : "outlined"}
        color="primary"
        className={classes.button}
        onClick={onClick(searchTypes.TITLE)}
      >
        Search By Title
      </Button>
    </ButtonGroup>
  );
};

SearchTypeSelect.propTypes = {
  searchType: PropTypes.oneOf([searchTypes.INGREDIENT, searchTypes.TITLE]),
  onClick: PropTypes.func.isRequired,
};

export default SearchTypeSelect;
