import { env } from "../properties";
import axios from "axios";
const root = env.apiRoot;

// https://spoonacular.com/food-api/docs#Search-Recipes-Complex
export const getRecipesComplex = async (
  ingredients,
  intolerances,
  diet,
  offset = 0,
  query,
  maxReadyTime
) => {
  let url = `${root}recipes/complexSearch`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
      instructionsRequired: true,
      addRecipeInformation: true,
      fillIngredients: true,
      sort: "popularity", // https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
      number: process.env.REACT_APP_MAX_RECIPE_NUMBER, // The number of expected results (between 1 and 100).
      includeIngredients: ingredients, // A comma-separated list of ingredients that should/must be used in the recipes.
      diet: diet || undefined, // https://spoonacular.com/food-api/docs#Diets
      intolerances: intolerances || undefined, // https://spoonacular.com/food-api/docs#Intolerances
      offset,
      query, // The (natural language) recipe search query
      maxReadyTime,
    },
  });
};

export const getRecipesByIngredients = async (ingredients) => {
  let url = `${root}recipes/findByIngredients`;
  return await axios.get(url, {
    params: {
      apiKey: env.apiKey,
      ingredients, // A comma-separated list of ingredients
      number: process.env.REACT_APP_MAX_RECIPE_NUMBER, // The maximum number of recipes to return
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
      number: process.env.REACT_APP_MAX_AUTOCOMPLETE_NUMBER, // The number of results to return (between 1 and 100)
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
