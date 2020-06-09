import { env } from "../properties";
import axios from "axios";
const root = env.apiRoot;

export const getRecipesByIngredients = async (ingredients) => {
  let url = `${root}recipes/findByIngredients`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
      ingredients, // A comma-separated list of ingredients
      number: 4, // The maximum number of recipes to return
      ranking: 1, // Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
      ignorePantry: true, // Whether to ignore typical pantry items, such as water, salt, flour, etc.
    },
  });
};

export const getIngredients = async (query) => {
  let url = `${root}food/ingredients/autocomplete`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
      query,
      number: 5, // The number of results to return (between 1 and 100)
    },
  });
};

export const getRecipeInfoById = async (id) => {
  let url = `${root}recipes/${id}/information`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
    },
  });
};

export const getInstructions = async (id) => {
  let url = `${root}recipes/${id}/analyzedInstructions`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
    },
  });
};
