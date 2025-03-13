import StoreRecipeRecord from "./recipesRecordStore.mjs"; // Pass på at stien stemmer
const store = new StoreRecipeRecord();

async function testCreate() {
  try {
    const updatedRecipe = {
      object: "Strawberry Cake",
      ingredients: [
        { name: "Flour", amount: "2 cups" },
        { name: "Sugar", amount: "1 cup" },
        { name: "Eggs", amount: "2" },
      ],
      instructions: ["Mix ingredients.", "Bake at 180°C for 30 minutes.", "Enjoy newly baked cake."],
    };
    const recipeId = 1; // Endre til en faktisk ID som finnes i databasen


    // const result = await store.create(newRecipe);
    // console.log("Recipe inserted:", result);

    // const result = await store.readAll(newRecipe);
    // console.log("Reading from database:", JSON.stringify(result, null, 2));

    // const result = await store.update(recipeId, updatedRecipe);
    // console.log("Recipe updated:", JSON.stringify(result, null, 2));
    
    // const result = await store.remove(recipeId);
    // console.log("Recipe removed:", JSON.stringify(result, null, 2));

    const result = await store.readById(recipeId);
    console.log("Reading recipe by id:", JSON.stringify(result, null, 2));

  } catch (error) {
    console.error("Error inserting recipe:", error);
  }
}

testCreate();
