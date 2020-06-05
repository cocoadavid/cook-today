import { env } from "../properties";
import axios from "axios";
const root = env.apiRoot;

export const getRecipesByIngredients = async (
  ingredients,
  number,
  ranking,
  ignorePantry
) => {
  let url = `${root}recipes/findByIngredients`;
  return await axios.get(url, {
    params: {
      apiKey: "YOUR_API_KEY",
      ingredients, // A comma-separated list of ingredients
      number: 5, // The maximum number of recipes to return
      ranking: 2,
      ignorePantry: false,
    },
  });
};
