/* eslint-disable no-use-before-define */
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { LanguageContext } from "../../context/LanguageContext";
import _ from "lodash";
import { getIngredients } from "../../api/spoonacularApi";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  largeAvatar: {
    width: `${theme.spacing(5)}px !important`,
    height: `${theme.spacing(5)}px !important`,
    marginLeft: "0 !important",
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
    <Paper className={classes.root} elevation={2}>
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
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              color="secondary"
              avatar={
                <Avatar
                  alt={option.name}
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${option.image}`}
                  className={classes.largeAvatar}
                />
              }
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={language.dictionary.searchByIngredients}
            placeholder={language.dictionary.startTyping}
          />
        )}
      />
    </Paper>
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
