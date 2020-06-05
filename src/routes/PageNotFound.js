import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../context/LanguageContext";

const useStyles = makeStyles(theme => ({
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb"
  },
  title: {
    fontSize: "6rem"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "50%",
    height: 360,
    width: 360,
    textAlign: "center",
    transition: "all ease 0.2s",
    "&:active": {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px",
      transform: "translateY(5px)"
    },
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer"
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      height: "100%",
      width: "100%"
    }
  },
  button: {
    margin: theme.spacing(2),
    fontSize: "1.125rem"
  }
}));

const PageNotFound = () => {
  const classes = useStyles();
  const languageContext = React.useContext(LanguageContext);
  return (
    <div className={classes.fullScreen}>
      <Paper className={classes.paper} elevation={8} component={Link} href="/">
        <Typography variant="h3" color="secondary" className={classes.title}>
          404
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {languageContext.dictionary.pageNotFound}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {languageContext.dictionary.pageNotFoundLong}
        </Typography>
        <Typography
          variant="button"
          color="secondary"
          className={classes.button}
        >
          {languageContext.dictionary.pushMe}
        </Typography>
      </Paper>
    </div>
  );
};

export default PageNotFound;
