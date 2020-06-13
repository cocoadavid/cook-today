import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import VerticalIcon from "@material-ui/icons/MoreVert";
import HorizontalIcon from "@material-ui/icons/MoreHoriz";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import VerticalMenuList from "./VerticalMenuList";
import { env } from "../../../properties";
import logo from "../../../assets/images/logo.png";
import { LanguageContext } from "../../../context/LanguageContext";
import { languageOptions } from "../../../languages";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    maxHeight: theme.spacing(7),
  },
  logoWrapper: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBarShift: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 3,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  button: {
    margin: `0 ${theme.spacing(0.5)}px`,
  },
  buttonGroup: {
    margin: `0 ${theme.spacing(0.5)}px`,
    [theme.breakpoints.down("xs")]: { display: "none" },
  },
  hide: {
    display: "none",
  },
}));

const VerticalNavigation = (props) => {
  const classes = useStyles();
  const { content } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [subMenuOpen, setSubMenuOpen] = React.useState({});

  const languageContext = useContext(LanguageContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuOpen = (name) => (event) => {
    const newSubMenuOpen = { ...subMenuOpen };
    if (newSubMenuOpen[name]) {
      newSubMenuOpen[name] = !newSubMenuOpen[name];
    } else {
      newSubMenuOpen[name] = true;
    }
    setSubMenuOpen(newSubMenuOpen);
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
    <nav>
      <div className={classes.toolbar}>
        <div className={classes.logoWrapper}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <Hidden smUp implementation="css">
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation="css">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Hidden>
      </div>
      <Divider />
      <VerticalMenuList
        handleSubMenuOpen={handleSubMenuOpen}
        subMenuOpen={subMenuOpen}
      />
    </nav>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileOpen(true)}
              edge="start"
              className={classes.menuButton}
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
          <Hidden xsDown implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title} noWrap>
            {env.title}
          </Typography>
          <Tooltip title={"username"}>
            <Button className={classes.button} color="inherit" size="small">
              <Icon className={classes.icon}>account_circle</Icon>
              username
            </Button>
          </Tooltip>
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
              <Tooltip title="Vertikális menü">
                <Button onClick={() => props.changeOrientation("vertical")}>
                  <VerticalIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Váltás horizontális menüre">
                <Button
                  color="primary"
                  onClick={() => props.changeOrientation("horizontal")}
                >
                  <HorizontalIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          )}
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
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
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {content}
      </main>
    </div>
  );
};

VerticalNavigation.propTypes = {
  content: PropTypes.any,
  changeOrientation: PropTypes.func,
};

export default VerticalNavigation;
