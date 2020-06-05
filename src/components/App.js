import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import HomePage from "../routes/HomePage";
import PageNotFound from "../routes/PageNotFound";
import { env } from "../properties";
import NavigationBar from "./common/NavigationBar";
import LanguageProvider from "../context/LanguageContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import "moment/locale/hu";
moment.locale("hu");

const theme = createMuiTheme(env.theme);
function App() {
  return (
    <LanguageProvider>
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale="hu"
        libInstance={moment}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavigationBar
            variant
            content={
              <Switch>
                <Route exact path="/" component={HomePage} />
                {env.menuItems.map((menuItem) =>
                  menuItem.children ? (
                    menuItem.children.map((childItem) => (
                      <Route
                        key={childItem.url}
                        path={childItem.url}
                        component={childItem.component}
                      />
                    ))
                  ) : (
                    <Route
                      key={menuItem.url}
                      path={menuItem.url}
                      component={menuItem.component}
                    />
                  )
                )}
                <Route component={PageNotFound} />
              </Switch>
            }
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </LanguageProvider>
  );
}

export default App;
