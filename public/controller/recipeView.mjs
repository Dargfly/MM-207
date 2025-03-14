import TemplateManager from "../modules/templateManager.mjs";
import * as ApiHandler from "../modules/apiHandler.mjs";
import { appController } from "./controller.mjs";

const templateFile = "/view/recipeView.html";

export async function loadRecipeView(recipeId) {
  try {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const recipeView = TemplateManager.cloneTemplate(template, document.body);

    const recipeContent = document.querySelector("#recipeContent");
    if (recipeContent) {
      recipeContent.style.display = "none";
    }

    await fetchAndDisplayRecipeDetails(recipeId);

    if (recipeContent) {
      recipeContent.style.display = "block";
    }

    return recipeView;
  } catch (error) {
    console.error("Error loading recipe view:", error);
  }
}

async function fetchAndDisplayRecipeDetails(recipeId) {
  try {
    const data = await ApiHandler.retriveRecipeById(recipeId); // Pass id-en her
    console.log(data);

    const recipeTitle = document.getElementById("recipeTitle");
    const ingredientsList = document.getElementById("ingredientsList");
    const instructionsList = document.getElementById("instructionsList");

    if (data && data.recipe) {
      recipeTitle.innerHTML = data.recipe.object;

      data.recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = `${ingredient.name}: ${ingredient.amount}`;
        ingredientsList.appendChild(li);
      });

      data.recipe.instructions.forEach((instruction, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${instruction}`;
        instructionsList.appendChild(li);
      });

      const btnBack = document.getElementById("btnBack");
      if (btnBack) {
        btnBack.addEventListener("click", () => {
          appController.showView("home");
        });
      }

      const btnEdit = document.getElementById("btnEdit");
      if (btnEdit) {
        btnEdit.addEventListener("click", () => {
          appController.showView("edit", data.recipe.id);
        });
      }
    } else {
      console.error("Recipe not found!");
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}
