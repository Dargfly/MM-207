class RecipeModel {
  constructor({ object, ingredients, instructions }) {
    if (!object || !ingredients || !instructions) {
      throw new Error("Missing required fields: object, ingredients, or instructions");
    }

    this.object = object;
    this.ingredients = Array.isArray(ingredients) ? ingredients : [];
    this.instructions = Array.isArray(instructions) ? instructions : [];
  }

  toJSON() {
    return {
      object: this.object,
      ingredients: this.ingredients,
      instructions: this.instructions,
    };
  }
}

export default RecipeModel;
