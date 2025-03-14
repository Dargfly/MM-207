import TemplateManager from "../modules/templateManager.mjs";
import * as ApiHandler from "../modules/apiHandler.mjs";
import { appController } from './controller.mjs';

const templateFile = "../view/homeView.html";

export async function loadHomeView() {
  try {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const homeView = TemplateManager.cloneTemplate(template, document.body);

    await fetchAndDisplayRecipes();

    return homeView;
  } catch (error) {
    console.error("Error loading home view:", error);
  }
}

async function fetchAndDisplayRecipes() {
  try {
    const data = await ApiHandler.retriveRecipes();
    const btnAddRecipe = document.getElementById("btnAddRecipe")

    if (!data || !data.recipes || !Array.isArray(data.recipes)) {
      console.error("No valid recipes found");
      return;
    }

    const recipesContainer = document.getElementById("recipeList");

    if (!recipesContainer) {
      console.error("Recipe list container not found");
      return;
    }

    recipesContainer.innerHTML = "";

    data.recipes.forEach((recipe) => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");

      recipeElement.innerHTML = `
        <h2>${recipe.object || "No Name"}</h2>
      `;

      recipeElement.addEventListener("click", () => {
        console.log(`Recipe ID: ${recipe.id}`);
        appController.showView("recipe", recipe.id);
      });

      recipesContainer.appendChild(recipeElement);
    });

    btnAddRecipe.addEventListener("click", function () {
      appController.showView("add");
    })
    
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

