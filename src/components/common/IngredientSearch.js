/* eslint-disable no-use-before-define */
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { LanguageContext } from "../../context/LanguageContext";
import _ from "lodash";
import { getIngredients } from "../../api/spoonacularApi";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function IngredientSearch(props) {
  const [options, setOptions] = useState([]);
  const classes = useStyles();
  const language = useContext(LanguageContext);

  const handleInputChange = (event, value) => {
    // debounced 300ms
    if (value) {
      loadIngredients(value);
    }
  };

  const handleChange = (event, value) => {
    props.onSelection(value);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        fullWidth
        multiple
        options={options}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        onInputChange={_.debounce(handleInputChange, 300)}
        onChange={handleChange}
        filterSelectedOptions
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={language.dictionary.ingredients}
            placeholder={language.dictionary.search}
          />
        )}
      />
    </div>
  );

  function loadIngredients(query) {
    getIngredients(query)
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      })
      .catch((error) => console.log(error));
  }
}

IngredientSearch.propTypes = {
  onSelection: PropTypes.func.isRequired,
};
