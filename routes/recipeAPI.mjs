import express from "express";
import fs from "fs/promises";
import HTTP_CODES from "../utils/httpCodes.mjs";

import StoreRecipeRecord from "../data/recipesRecordStore.mjs"; // Pass på at stien stemmer
import RecipeModel from "../models/recipeModel.mjs";
import { log } from "console";

const storeRecipes = new StoreRecipeRecord(); // Opprett en instans av databasen

const recipeRouter = express.Router();
recipeRouter.use(express.json());

// Hent alle oppskrifter
recipeRouter.get("/recipes", async (req, res, next) => {
  try {
    const recipes = await storeRecipes.getAllRecipes(); // Hent alle oppskrifter

    if (recipes.length === 0) {
      return res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ message: "No recipes found" });
    }

    res.status(HTTP_CODES.SUCCESS.OK).json({
      message: "Recipes retrieved successfully",
      recipes: recipes,
    });
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving recipes",
      error: error.message,
    });
  }
});

//Get recipe based on ID
recipeRouter.get("/:recipeID?", async (req, res, next) => {
  let recipeID = req.params.recipeID;

  if (!recipeID) {
    return res
      .status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST)
      .json({ message: "Provide an ID for recipe to return" });
  }

  recipeID = parseInt(recipeID, 10);

  if (isNaN(recipeID)) {
    return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({
      message: "Invalid recipe ID format",
    });
  }

  try {
    const recipe = await storeRecipes.read(recipeID);

    if (!recipe) {
      return res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ message: `Recipe with ID ${recipeID} not found` });
    }

    res.status(HTTP_CODES.SUCCESS.OK).json({
      message: "Recipe found",
      recipe: recipe,
    });
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
      message: "Error retrieving recipe",
      error: error.message,
    });
  }
});

//Create recipe
recipeRouter.post("/", async (req, res, next) => {
  try {
    const { object, ingredients, instructions } = req.body;
    //Lager en oppskrift basert på modellen
    const newRecipe = new RecipeModel({ object, ingredients, instructions });

    // Lagre oppskriften i den faktiske databasen ved hjelp av StoreRecipeRecord
    const createdRecipe = await storeRecipes.create(newRecipe); // Vi antar at `create` er definert i `recipesRecordStore.js`

    //Create a recipe, and return id or whole object
    res.status(HTTP_CODES.SUCCESS.CREATED).json({
      message: "Recipe created successfully!",
      recipe: createdRecipe,
    });
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
      message: "Error creating recipe",
      error: error.message,
    });
  }
});

//Update recipe based on ID
recipeRouter.put("/:recipeID?", async (req, res, next) => {
  let recipeID = req.params.recipeID;

  if (!recipeID) {
    return res
      .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
      .json({ message: "Provide an ID for recipe to update" });
  }

  recipeID = parseInt(recipeID, 10);

  if (isNaN(recipeID)) {
    return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({
      message: "Invalid recipe ID format",
    });
  }

  try {
    const { object, ingredients, instructions } = req.body;

    // Sjekk om oppskriften finnes
    const existingRecipe = await storeRecipes.read(recipeID);
    if (!existingRecipe) {
      return res
        .status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
        .json({ message: `Recipe with ID ${recipeID} not found` });
    }

    // Opprett et oppdatert oppskriftsobjekt
    const updatedRecipe = new RecipeModel({
      object: object || existingRecipe.object,
      ingredients: ingredients || existingRecipe.ingredients,
      instructions: instructions || existingRecipe.instructions,
    });

    // Kall en update-funksjon i databasen (må være definert i storeRecipes)
    const result = await storeRecipes.update(recipeID, updatedRecipe);

    res.status(HTTP_CODES.SUCCESS.OK).json({
      message: `Recipe with ID ${recipeID} updated successfully!`,
      updatedRecipe: result,
    });
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
      message: "Error updating recipe",
      error: error.message,
    });
  }
});

//Delete recipe based on ID
recipeRouter.delete("/:recipeID?", async (req, res, next) => {
  let recipeID = req.params.recipeID;

  if (!recipeID) {
    return res
      .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
      .json({ message: "Provide an ID for recipe to delete" });
  }

  recipeID = parseInt(recipeID, 10);

  if (isNaN(recipeID)) {
    return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({
      message: "Invalid recipe ID format",
    });
  }

  try {
    const deletedRecipe = await storeRecipes.remove(recipeID); // Vi antar at `delete` er definert i `recipesRecordStore.js`

    // Hvis ingen oppskrift ble funnet med den ID-en
    if (!deletedRecipe) {
      return res
        .status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
        .json({ message: `Recipe with ID ${recipeID} not found` });
    }

    res.status(HTTP_CODES.SUCCESS.OK).json({
      message: "Recipe deleted successfully!",
      recipeID: recipeID,
    });
  } catch (error) {
    res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting recipe",
      error: error.message,
    });
  }
});

export default recipeRouter;
