import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { env } from "../../../properties";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import { LanguageContext } from "../../../context/LanguageContext";
import Hidden from "@material-ui/core/Hidden";
import { languageOptions } from "../../../languages";
import logo from "../../../assets/images/logo.png";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import HorizontalIcon from "@material-ui/icons/MoreHoriz";
import VerticalIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Paper from "@material-ui/core/Paper";
import VerticalMenuList from "./VerticalMenuList";

const drawerWidth = 240;
const minHeight = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex"
  },
  logo: {
    maxHeight: theme.spacing(5),
  },
  logoWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  drawer: {
    [theme.breakpoints.down("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    [theme.breakpoints.up("lg")]: {
      flexGrow: 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  homeLink: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  xlToolbar: {
    maxWidth: 1920,
    margin: "0 auto",
    width: "100%",
  },
  listItem: {
    position: "relative",
    display: "inline-flex",
    width: "auto",
    color: theme.palette.primary.contrastText,
    minHeight: minHeight,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "&::after": {
      content: '""',
      display: "block",
      borderBottom: `solid 2px ${theme.palette.primary.contrastText}`,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      transform: "scaleX(0)",
      transition: "transform 200ms ease-in-out",
    },
    "&:hover": {
      "&::after": {
        transform: "scaleX(1)",
      },
    },
  },
  listItemIcon: {
    color: "inherit",
    minWidth: 32,
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  button: {
    margin: `0 ${theme.spacing(0.5)}px`,
  },
  buttonGroup: {
    margin: `0 ${theme.spacing(0.5)}px`,
    [theme.breakpoints.down("md")]: { display: "none" },
  },
  collapse: {
    display: "inline-flex",
    position: "absolute",
    // top: 0,
    left: 0,
    // width: "100%",
    marginTop: minHeight + 1,
  },
  collapseMenu: {
    backgroundColor: theme.palette.primary.light,
    width: "100%",
  },
}));

const HorizontalNavigation = ({ content, withIcon, ...props }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [subMenuOpen, setSubMenuOpen] = React.useState({});

  const languageContext = useContext(LanguageContext);

  const handleSubMenuOpen = (name) => (event) => {
    event.preventDefault();
    const newSubMenuOpen = { ...subMenuOpen };
    if (newSubMenuOpen[name]) {
      newSubMenuOpen[name] = !newSubMenuOpen[name];
    } else {
      newSubMenuOpen[name] = true;
    }
    setSubMenuOpen(newSubMenuOpen);
  };

  const closeSubMenus = () => {
    setSubMenuOpen({});
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLanguageChange = (event) => {
    let selectedLanguage;
    const lang = languageContext.language.id;
    if (lang === "hu") {
      selectedLanguage = languageOptions.find((item) => item.id === "en");
    } else {
      selectedLanguage = languageOptions.find((item) => item.id === "hu");
    }
    languageContext.setLanguage(selectedLanguage);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.logoWrapper}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
      </div>
      <Divider />
      <VerticalMenuList
        handleSubMenuOpen={handleSubMenuOpen}
        subMenuOpen={subMenuOpen}
      />
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar variant="dense" className={classes.xlToolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component="h1"
            noWrap
          >
            {env.title}
          </Typography>
          <nav className={classes.drawer}>
            {/* --- DESKTOP NAV --- */}
            <Hidden mdDown implementation="css">
              <List className={classes.list} dense disablePadding>
                <ListItem
                  button
                  component={NavLink}
                  className={classes.listItem}
                  style={{ padding: 0 }}
                  exact
                  to="/"
                  onClick={closeSubMenus}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        className={classes.homeLink}
                        component="h1"
                        noWrap
                      >
                        {env.title}
                      </Typography>
                    }
                  />
                </ListItem>
                {env.menuItems.map((menuItem) =>
                  !menuItem.hidden ? (
                    menuItem.children ? (
                      <span key={menuItem.url} style={{ position: "relative" }}>
                        <ListItem
                          button
                          className={classes.listItem}
                          onClick={handleSubMenuOpen(menuItem.label)}
                          disableRipple
                          component={NavLink}
                          activeStyle={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                          }}
                          to={menuItem.url}
                        >
                          {withIcon ? (
                            <ListItemIcon className={classes.listItemIcon}>
                              <Icon>{menuItem.icon}</Icon>
                            </ListItemIcon>
                          ) : null}
                          <ListItemText
                            primary={
                              languageContext.dictionary[menuItem.label] ||
                              menuItem.label
                            }
                          />
                          {subMenuOpen[menuItem.label] ? (
                            <ExpandLess fontSize="small" />
                          ) : (
                            <ExpandMore fontSize="small" />
                          )}
                        </ListItem>
                        <Collapse
                          className={classes.collapse}
                          in={subMenuOpen[menuItem.label]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Paper
                            className={classes.collapseMenu}
                            square
                            elevation={4}
                          >
                            <List className={classes.list} dense disablePadding>
                              {menuItem.children.map((subMenuItem) => (
                                <ListItem
                                  button
                                  component={NavLink}
                                  activeStyle={{
                                    backgroundColor:
                                      theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                  }}
                                  to={subMenuItem.url}
                                  key={subMenuItem.url}
                                  className={classes.listItem}
                                  style={{ display: "flex" }}
                                  onClick={closeSubMenus}
                                  disableRipple
                                >
                                  {withIcon ? (
                                    <ListItemIcon
                                      className={classes.listItemIcon}
                                    >
                                      <Icon>{subMenuItem.icon}</Icon>
                                    </ListItemIcon>
                                  ) : null}
                                  <ListItemText
                                    primary={
                                      languageContext.dictionary[
                                        subMenuItem.label
                                      ] || subMenuItem.label
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        </Collapse>
                      </span>
                    ) : (
                      <ListItem
                        button
                        component={NavLink}
                        activeStyle={{
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.contrastText,
                        }}
                        to={menuItem.url}
                        key={menuItem.url}
                        className={classes.listItem}
                        disableRipple
                        onClick={closeSubMenus}
                      >
                        {withIcon ? (
                          <ListItemIcon className={classes.listItemIcon}>
                            <Icon>{menuItem.icon}</Icon>
                          </ListItemIcon>
                        ) : null}
                        <ListItemText
                          primary={
                            languageContext.dictionary[menuItem.label] ||
                            menuItem.label
                          }
                        />
                      </ListItem>
                    )
                  ) : (
                    ""
                  )
                )}
              </List>
            </Hidden>
            {/* --- MOBILE NAV --- */}
            <Hidden lgUp implementation="css">
              <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <Tooltip title={languageContext.dictionary.changeLanguage}>
            <Button
              className={classes.button}
              color="inherit"
              onClick={handleLanguageChange}
              size="small"
            >
              <Icon className={classes.icon}>language</Icon>
              {languageContext.language.id}
            </Button>
          </Tooltip>
          {props.changeOrientation && (
            <ButtonGroup
              color="secondary"
              variant="contained"
              size="small"
              className={classes.buttonGroup}
            >
              <Tooltip title="Váltás vertikális menüre">
                <Button
                  color="primary"
                  onClick={() => props.changeOrientation("vertical")}
                >
                  <VerticalIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Horizontális menü">
                <Button onClick={() => props.changeOrientation("horizontal")}>
                  <HorizontalIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{content}</main>
    </div>
  );
};

HorizontalNavigation.propTypes = {
  content: PropTypes.any,
  withIcon: PropTypes.bool,
  changeOrientation: PropTypes.func,
};

export default HorizontalNavigation;
