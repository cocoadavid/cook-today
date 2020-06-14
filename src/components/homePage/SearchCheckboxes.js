import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

const SearchCheckboxes = ({
  glutenFree,
  dairyFree,
  vegetarian,
  vegan,
  handleCheckboxChange,
}) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={glutenFree}
            onChange={handleCheckboxChange}
            name="glutenFree"
          />
        }
        label="gluten-free"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={dairyFree}
            onChange={handleCheckboxChange}
            name="dairyFree"
          />
        }
        label="dairy-free"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={vegetarian}
            onChange={handleCheckboxChange}
            name="vegetarian"
          />
        }
        label="vegetarian"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={vegan}
            onChange={handleCheckboxChange}
            name="vegan"
          />
        }
        label="vegan"
      />
    </FormGroup>
  );
};

SearchCheckboxes.propTypes = {
  glutenFree: PropTypes.bool,
  dairyFree: PropTypes.bool,
  vegetarian: PropTypes.bool,
  vegan: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default SearchCheckboxes;
