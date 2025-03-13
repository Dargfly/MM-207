import fs from "fs/promises";

// Start asynkron funksjon
async function start() {
  const server = await import("../server.mjs");
};

let JSONrecipes = null;

(async function loadRecipes() {
  try {
    const recipeDummy = await fs.readFile("./models/recipes.json", "utf-8");
    JSONrecipes = JSON.parse(recipeDummy);
    console.log("Recipes loaded successfully");
  } catch (error) {
    console.error("Failed to load recipes:", error);
  }
})();

export { JSONrecipes };
start(); // Kjører den asynkrone funksjonen
