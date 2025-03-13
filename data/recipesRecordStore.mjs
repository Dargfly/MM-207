import RecordStoreInterface from "./abstractRecordStoreInterface.mjs";
import * as db from "./db.mjs";

//DENNE SKAL BARE SNAKKE MED ITEMSTORE/ASBTRACTRECORDSTOREINTERFACE

export default class StoreRecipeRecord extends RecordStoreInterface {
  async create(aRecipe) {
    const query = `
      INSERT INTO recipes_test (object, ingredients, instructions)
      VALUES ($1, $2, $3)
      RETURNING *
  `;

    const values = [
      aRecipe.object,
      JSON.stringify(aRecipe.ingredients || []),
      JSON.stringify(aRecipe.instructions || []),
    ];

    return await db.create(query, ...values);
  }

  async read(aRecipe_id) {
    const query = `
        SELECT * FROM recipes
        WHERE id = $1
        `;

    return await db.read(query, ...[aRecipe_id]);
  }

  async update(aRecipe_id, recipeChanges) {
    const query = `
        UPDATE recipes_test
        SET object = $1,
            ingredients = $2,
            instructions = $3
        WHERE id = $4
        RETURNING *;
    `;

    const values = [
      recipeChanges.object,
      JSON.stringify(recipeChanges.ingredients || []),
      JSON.stringify(recipeChanges.instructions || []),
      aRecipe_id,
    ];

    return await db.update(query, ...values);
  }

  async remove(aRecipe_id) {
    const query = `
        DELETE FROM recipes_test
        WHERE id = $1
        RETURNING *
        `;

    const values = [aRecipe_id];

    return await db.remove(query, ...values);
  }

  async getAllRecipes() {
    let query = `SELECT * FROM recipes_test`;

    return await db.read(query);
  }
  
}
