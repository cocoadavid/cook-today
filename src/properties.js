import { themeDefault } from "./themes/themeDefault";
import {menuItems} from "./menuItems";

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

export const env = profiles.TEST;
