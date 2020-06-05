// import { API_KEY } from "./apiKey";
import { themeDefault } from "./themes/themeDefault";
import {menuItems} from "./menuItems";

const environments = {
  TEST: {
    name: "test",
    title: "Framework Test",
    // apiKey: API_KEY,
    apiRoot: "https://api.spoonacular.com/",
    menuItems: menuItems,
    theme: themeDefault,
  },
  PROD: {
    name: "production",
    title: "Framework Production",
    // apiKey: API_KEY,
    apiRoot: "https://api.spoonacular.com/",
    menuItems: menuItems,
    theme: themeDefault,
  },
};

export const env = environments.TEST;
