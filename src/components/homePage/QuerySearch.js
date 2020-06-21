import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { LanguageContext } from "../../context/LanguageContext";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: "25ch",
  //   },
  // },
}));

const initialFormData = Object.freeze({
  query: "",
});

export default function QuerySearch(props) {
  const [formState, setFormState] = useState(initialFormData);
  const classes = useStyles();
  const language = useContext(LanguageContext);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formState.query);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Paper className={classes.root}>
        <TextField
          label={language.dictionary.searchByTitle}
          variant="outlined"
          name="query"
          onChange={handleChange}
          value={formState.query}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Paper>
    </form>
  );
}

QuerySearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
