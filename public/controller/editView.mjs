import TemplateManager from "../modules/templateManager.mjs";
import * as ApiHandler from "../modules/apiHandler.mjs";
import { appController } from "./controller.mjs";
const templateFile = "../view/editView.html";

//  Dialog System ----------------------------------------------------------
export function dialogMessage(title, message) {
  // Ensure dialog exists before trying to use it
  const dialog = TemplateManager.ensureDialogExists();
    const titleDialog = document.getElementById("titleDialog");
  const textDialog = document.getElementById("textDialog");
  
  titleDialog.innerText = title;
  textDialog.innerText = message;

  dialog.showModal();
}
// --------------------------------------------------------------------------

export async function loadEditView(recipeId) {
  try {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const editView = TemplateManager.cloneTemplate(template, document.body);

    await fetchAndDisplayRecipeDetails(recipeId);

    return editView;
  } catch (error) {
    console.error("Error loading edit view:", error);
    dialogMessage("Error loading edit view:", error);
  }
}

async function fetchAndDisplayRecipeDetails(recipeId) {
  try {
    const data = await ApiHandler.retriveRecipeById(recipeId); // Pass id-en her
    const recipe = data.recipe;
    // console.log(recipe);

    const recipeTitleInput = document.getElementById("recipeTitle");
    const ingredientsContainer = document.getElementById(
      "ingredientsContainer"
    );
    const instructionsContainer = document.getElementById(
      "instructionsContainer"
    );
    const btnAddIngredient = document.getElementById("btnAddIngredient");
    const btnAddInstruction = document.getElementById("btnAddInstruction");
    const btnSaveRecipe = document.getElementById("btnSaveRecipe");
    const btnDeleteRecipe = document.getElementById("btnDeleteRecipe")

    function renderIngredients() {
      ingredientsContainer.innerHTML = "";
      recipe.ingredients.forEach((ingredient, index) => {
        const ingredientDiv = document.createElement("div");
        ingredientDiv.classList.add("ingredient");

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = ingredient.name;
        nameInput.placeholder = "Ingredient name";

        const amountInput = document.createElement("input");
        amountInput.type = "text";
        amountInput.value = ingredient.amount;
        amountInput.placeholder = "Amount";

        const btnRemoveIngredient = document.createElement("button");
        btnRemoveIngredient.textContent = "Remove Ingredient";
        btnRemoveIngredient.addEventListener("click", () => {
          recipe.ingredients.splice(index, 1);
          renderIngredients();
        });

        ingredientDiv.appendChild(nameInput);
        ingredientDiv.appendChild(amountInput);
        ingredientDiv.appendChild(btnRemoveIngredient);

        ingredientsContainer.appendChild(ingredientDiv);
      });
    }

    function renderInstructions() {
      instructionsContainer.innerHTML = "";
      recipe.instructions.forEach((instruction, index) => {
        const instructionDiv = document.createElement("div");
        instructionDiv.classList.add("instruction");

        const instructionInput = document.createElement("input");
        instructionInput.type = "text";
        instructionInput.value = instruction;
        instructionInput.placeholder = `Instruction step ${index + 1}`;

        const btnRemoveInstruction = document.createElement("button");
        btnRemoveInstruction.textContent = "Remove Instruction";
        btnRemoveInstruction.addEventListener("click", () => {
          recipe.instructions.splice(index, 1);
          renderInstructions();
        });

        instructionDiv.appendChild(instructionInput);

        instructionsContainer.appendChild(instructionDiv);
        instructionDiv.appendChild(btnRemoveInstruction);
      });
    }

    btnAddIngredient.addEventListener("click", function () {
      recipe.ingredients.push({ name: "", amount: "" });
      renderIngredients();
    });

    btnAddInstruction.addEventListener("click", function () {
      recipe.instructions.push("");
      renderInstructions();
    });

    btnSaveRecipe.addEventListener("click", async function () {
      recipe.object = recipeTitleInput.value;

      const ingredientInputs = ingredientsContainer.querySelectorAll("input");
      recipe.ingredients = [];
      for (let i = 0; i < ingredientInputs.length; i += 2) {
        recipe.ingredients.push({
          name: ingredientInputs[i].value,
          amount: ingredientInputs[i + 1].value,
        });
      }

      const instructionInputs = instructionsContainer.querySelectorAll("input");
      recipe.instructions = [];
      for (let i = 0; i < instructionInputs.length; i++) {
        recipe.instructions.push(instructionInputs[i].value);
      }

      const sendRequest = await ApiHandler.updateRecipeById(recipeId, recipe)
      // console.log(sendRequest);
      
      dialogMessage("Updated Recipe:", sendRequest.message);
    });

    btnDeleteRecipe.addEventListener("click", async function () {
      const sendRequest = await ApiHandler.deleteRecipeById(recipeId)
      // console.log("Deleted Recipe:", sendRequest);
      dialogMessage("Deleted Recipe:", sendRequest.message);
    })

    recipeTitleInput.value = recipe.object;
    renderIngredients();
    renderInstructions();

    const btnBack = document.getElementById("btnBack");

    btnBack.addEventListener("click", () => {
      appController.showView("home");
    });
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    dialogMessage("Error fetching recipe details:", error);
  }
}
