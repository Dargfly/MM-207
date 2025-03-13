import StoreRecipeRecord from "./recipesRecordStore.mjs"; // Pass på at stien stemmer
const store = new StoreRecipeRecord();

async function testCreate() {
  try {
    const newRecipe = {
      object: "Chocolate Cake",
      ingredients: [
        { name: "Flour", amount: "2 cups" },
        { name: "Sugar", amount: "1 cup" },
      ],
      instructions: ["Mix ingredients.", "Bake at 180°C for 30 minutes."],
    };

    const result = await store.create(newRecipe);
    console.log("Recipe inserted:", result);
  } catch (error) {
    console.error("Error inserting recipe:", error);
  }
}

testCreate();
