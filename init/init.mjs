import fs from "fs/promises";
import { Node, Tree, saveTree, inflateTree } from "../data/tree.mjs";

// Start asynkron funksjon
async function start() {
  const server = await import("../server.mjs");
};

let JSONtreeDummyAmbulance = null;
let JSONrecipes = null;

(async function loadTree() {
  try {
    const treeDummyAmbulance = await fs.readFile(
      "./dummy/TreeAmbulanceDriver.json",
      "utf-8"
    );
    JSONtreeDummyAmbulance = JSON.parse(treeDummyAmbulance);
    console.log("Tree loaded successfully");
  } catch (error) {
    console.error("Failed to load tree:", error);
  }
})();

(async function loadRecipes() {
  try {
    const recipeDummy = await fs.readFile("./dummy/recipes.json", "utf-8");
    JSONrecipes = JSON.parse(recipeDummy);
    console.log("Recipes loaded successfully");
  } catch (error) {
    console.error("Failed to load recipes:", error);
  }
})();

export { JSONtreeDummyAmbulance, JSONrecipes };
start(); // Kjører den asynkrone funksjonen
