import TemplateManager from "../modules/templateManager.mjs";
import * as ApiHandler from "../modules/apiHandler.mjs";
import { appController } from "./controller.mjs";
const templateFile = "../view/addView.html";

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

export async function loadAddView() {
  try {
    const template = await TemplateManager.fetchTemplate(templateFile);
    const addView = TemplateManager.cloneTemplate(template, document.body);

    await fetchAndDisplayRecipeDetails();

    return addView;
  } catch (error) {
    console.error("Error loading add view:", error);
    dialogMessage("Error loading edit view:", error);
  }
}

async function fetchAndDisplayRecipeDetails() {
  try {
    const recipe = {
      object: "",
      ingredients: [""],
      instructions: [""],
    };
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

    function renderIngredients() {
      //Had AI help with keeping the values from the input fields when adding new input fields
      const existingIngredientInputs = ingredientsContainer.querySelectorAll(".ingredient");
      existingIngredientInputs.forEach((ingredientDiv, index) => {
        if (index < recipe.ingredients.length) {
          const nameInput = ingredientDiv.querySelector(
            'input[type="text"]:first-child'
          );
          const amountInput = ingredientDiv.querySelector(
            'input[type="text"]:nth-child(2)'
          );

          // Ensure this ingredient is an object
          if (typeof recipe.ingredients[index] !== "object") {
            recipe.ingredients[index] = {};
          }

          recipe.ingredients[index].name = nameInput ? nameInput.value : "";
          recipe.ingredients[index].amount = amountInput
            ? amountInput.value
            : "";
        }
      });

      ingredientsContainer.innerHTML = "";

      recipe.ingredients.forEach((ingredient, index) => {
        if (typeof ingredient !== "object") {
          ingredient = { name: "", amount: "" };
          recipe.ingredients[index] = ingredient;
        }

        const ingredientDiv = document.createElement("div");
        ingredientDiv.classList.add("ingredient");

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = ingredient.name || "";
        nameInput.placeholder = "Ingredient name";

        const amountInput = document.createElement("input");
        amountInput.type = "text";
        amountInput.value = ingredient.amount || "";
        amountInput.placeholder = "Amount";

        nameInput.addEventListener("input", () => {
          recipe.ingredients[index].name = nameInput.value;
        });

        amountInput.addEventListener("input", () => {
          recipe.ingredients[index].amount = amountInput.value;
        });

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

    btnAddIngredient.addEventListener("click", function () {
      renderIngredients();
      recipe.ingredients.push({ name: "", amount: "" });
      renderIngredients();
    });

    function renderInstructions() {
      const existingInstructionInputs =
        instructionsContainer.querySelectorAll(".instruction");
      existingInstructionInputs.forEach((instructionDiv, index) => {
        const instructionInput =
          instructionDiv.querySelector('input[type="text"]');

        if (instructionInput && index < recipe.instructions.length) {
          recipe.instructions[index] = instructionInput.value;
        }
      });

      instructionsContainer.innerHTML = "";

      recipe.instructions.forEach((instruction, index) => {
        const instructionDiv = document.createElement("div");
        instructionDiv.classList.add("instruction");

        const instructionInput = document.createElement("input");
        instructionInput.type = "text";
        instructionInput.value = instruction || "";
        instructionInput.placeholder = `Instruction step ${index + 1}`;

        instructionInput.addEventListener("input", () => {
          recipe.instructions[index] = instructionInput.value;
        });

        const btnRemoveInstruction = document.createElement("button");
        btnRemoveInstruction.textContent = "Remove Instruction";
        btnRemoveInstruction.addEventListener("click", () => {
          recipe.instructions.splice(index, 1);
          renderInstructions();
        });

        instructionDiv.appendChild(instructionInput);
        instructionDiv.appendChild(btnRemoveInstruction);
        instructionsContainer.appendChild(instructionDiv);
      });
    }

    btnAddInstruction.addEventListener("click", function () {
      const existingInstructionInputs =
        instructionsContainer.querySelectorAll(".instruction");
      existingInstructionInputs.forEach((instructionDiv, index) => {
        const instructionInput =
          instructionDiv.querySelector('input[type="text"]');

        if (instructionInput && index < recipe.instructions.length) {
          recipe.instructions[index] = instructionInput.value;
        }
      });

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

      const sendRequest = await ApiHandler.addRecipe(recipe);
      dialogMessage("Updated Recipe:", sendRequest.message);
    });

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
