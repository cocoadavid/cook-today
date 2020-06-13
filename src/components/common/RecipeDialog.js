import React, { useContext } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@mdi/react";
import { mdiCircleMedium } from "@mdi/js";
import Typography from "@material-ui/core/Typography";
import { LanguageContext } from "../../context/LanguageContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { convertToHoursAndMinutes } from "../../utils/helperFunctions";
import Grid from "@material-ui/core/Grid";
import { infoIcons } from "../../utils/icons";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  extraInfo: {
    padding: `4px 0`,
    marginBottom: theme.spacing(2),
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  secondaryColorAvatar: {
    margin: `4px`,
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
  },
  imgContainer: {
    maxHeight: 400,
    overflow: "hidden",
  },
  image: {
    width: "100%",
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
  },
  title: {
    // fontWeight: 500,
    // color: theme.palette.primary.contrastText,
    flexGrow: 1,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  methodListItem: {
    alignItems: "baseline",
  },
  appBar: {
    position: "relative",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RecipeDialog = ({ open, handleClose, recipeId, recipeInfo }) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="recipe-dialog"
      fullScreen={fullScreen}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {recipeInfo.title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div className={classes.imgContainer}>
          <img
            className={classes.image}
            src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.${recipeInfo.imageType}`}
            alt={recipeInfo.title}
          />
        </div>
        <Grid container className={classes.extraInfo}>
          <Grid item xs={8} sm={6}>
            <Typography variant="subtitle2" color="textPrimary">
              <span style={{ color: "#F2385A" }}>ready in </span>
              {convertToHoursAndMinutes(recipeInfo.readyInMinutes)}
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              <span style={{ color: "#F2385A" }}>serves </span>
              {recipeInfo.servings} person(s)
            </Typography>
          </Grid>
          <Grid item xs={4} sm={6} className={classes.iconContainer}>
            {infoIcons.map(
              (item) =>
                recipeInfo[item.name] && (
                  <Avatar
                    key={item.name}
                    className={classes.secondaryColorAvatar}
                    title={item.title}
                  >
                    <Icon path={item.path} size={1} />
                  </Avatar>
                )
            )}
          </Grid>
        </Grid>
        <Typography variant="h6">{language.dictionary.ingredients}</Typography>
        <List className={classes.list} dense>
          {recipeInfo.extendedIngredients &&
            recipeInfo.extendedIngredients.map((item) => (
              <ListItem key={item.original}>
                <ListItemIcon style={{ minWidth: 32 }}>
                  <Icon path={mdiCircleMedium} size={0.8} />
                  {/*<img*/}
                  {/*  alt={item.name}*/}
                  {/*  src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}*/}
                  {/*  style={{ width: 40, height: 40 }}*/}
                  {/*/>*/}
                </ListItemIcon>
                <ListItemText primary={item.original} />
              </ListItem>
            ))}
        </List>
        <Typography variant="h6">Method</Typography>
        <List className={classes.list} dense>
          {recipeInfo.analyzedInstructions &&
            recipeInfo.analyzedInstructions[0] &&
            recipeInfo.analyzedInstructions[0].steps.map((step) => (
              <ListItem
                className={classes.methodListItem}
                key={`step_${step.number}_${recipeId}`}
              >
                <ListItemIcon style={{ minWidth: 32 }}>
                  {step.number}.
                </ListItemIcon>
                <ListItemText primary={step.step} />
              </ListItem>
            ))}
        </List>
        <Typography variant="caption" gutterBottom>
          Recipe from{" "}
          <Link
            href={recipeInfo.sourceUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {recipeInfo.sourceName || "source"}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

RecipeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
  recipeInfo: PropTypes.object.isRequired,
};

export default RecipeDialog;
