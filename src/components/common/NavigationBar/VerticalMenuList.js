import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import { env } from "../../../properties";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTheme } from "@material-ui/core/styles";

const VerticalMenuList = ({ subMenuOpen, handleSubMenuOpen, ...props }) => {
  const languageContext = React.useContext(LanguageContext);
  const theme = useTheme();

  return (
    <List>
      <ListItem
        button
        component={NavLink}
        activeStyle={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
        exact
        to="/"
      >
        <Tooltip title={languageContext.dictionary["home"]}>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={languageContext.dictionary["home"]} />
      </ListItem>
      {env.menuItems.map((menuItem) =>
        !menuItem.hidden ? (
          menuItem.children ? (
            <React.Fragment key={menuItem.url}>
              <ListItem button onClick={handleSubMenuOpen(menuItem.label)}>
                <Tooltip
                  title={
                    languageContext.dictionary[menuItem.label] || menuItem.label
                  }
                >
                  <ListItemIcon>
                    <Icon>{menuItem.icon}</Icon>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={
                    languageContext.dictionary[menuItem.label] || menuItem.label
                  }
                />
                {subMenuOpen[menuItem.label] ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMore fontSize="small" />
                )}
              </ListItem>
              <Collapse
                in={subMenuOpen[menuItem.label]}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <List dense>
                  {menuItem.children.map((subMenuItem) => (
                    <ListItem
                      button
                      component={NavLink}
                      activeStyle={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                      }}
                      to={subMenuItem.url}
                      key={subMenuItem.url}
                    >
                      <Tooltip
                        title={
                          languageContext.dictionary[subMenuItem.label] ||
                          subMenuItem.label
                        }
                      >
                        <ListItemIcon>
                          <Icon>{subMenuItem.icon}</Icon>
                        </ListItemIcon>
                      </Tooltip>
                      <ListItemText
                        primary={
                          languageContext.dictionary[subMenuItem.label] ||
                          subMenuItem.label
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Collapse>
            </React.Fragment>
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
            >
              <Tooltip
                title={
                  languageContext.dictionary[menuItem.label] || menuItem.label
                }
              >
                <ListItemIcon>
                  <Icon>{menuItem.icon}</Icon>
                </ListItemIcon>
              </Tooltip>
              <ListItemText
                primary={
                  languageContext.dictionary[menuItem.label] || menuItem.label
                }
              />
            </ListItem>
          )
        ) : (
          ""
        )
      )}
    </List>
  );
};

VerticalMenuList.propTypes = {
  handleSubMenuOpen: PropTypes.func.isRequired,
  subMenuOpen: PropTypes.object.isRequired,
};

export default VerticalMenuList;
