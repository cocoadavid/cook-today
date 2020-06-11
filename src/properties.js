import { themeDefault } from "./themes/themeDefault";
import { menuItems } from "./menuItems";

const profiles = {
  TEST: {
    name: "test",
    title: "CookToday",
    apiRoot: "https://api.spoonacular.com/",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
    menuItems: menuItems,
    theme: themeDefault,
  },
  PROD: {
    name: "production",
    title: "CookToday",
    apiRoot: "https://api.spoonacular.com/",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
    menuItems: menuItems,
    theme: themeDefault,
  },
};

let profile;
switch (process.env.REACT_APP_STAGE) {
  case "TEST":
    profile = profiles.TEST;
    break;
  case "PROD":
    profile = profiles.PROD;
    break;
  default:
    profile = profiles.TEST;
    break;
}

export const env = profile;
