const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};

const isPROD = true;
const BASE_API_TEST1 = "Test1/";
const BASE_API_PROD = "recipe/";

const BAS_API = isPROD ? BASE_API_PROD : BASE_API_TEST1;

const API_ENDPOINTS_RECIPE_SERVER = {
  GetRecipes: `${BAS_API}/recipes`,
  GetRecipeById: `${BAS_API}`,
  UpdateRecipeById: `${BAS_API}`,
  AddRecipe: `${BAS_API}`,

  // DeletNode: (id) => `${BAS_API}/tree/${id}`,
};

export async function retriveRecipes() {
  const recipes = await runRequest(API_ENDPOINTS_RECIPE_SERVER.GetRecipes, HTTP_METHODS.GET);
  return recipes; // Returner oppskriftene her
}

export async function retriveRecipeById(id) {
  const recipes = await runRequest(API_ENDPOINTS_RECIPE_SERVER.GetRecipeById+id, HTTP_METHODS.GET);
  return recipes; // Returner oppskriftene her
}

export async function updateRecipeById(id, data) {
  const recipes = await runRequest(API_ENDPOINTS_RECIPE_SERVER.UpdateRecipeById+id, HTTP_METHODS.PUT, data);
  return recipes; // Returner oppskriftene her
}

export async function deleteRecipeById(id) {
  const recipes = await runRequest(API_ENDPOINTS_RECIPE_SERVER.GetRecipeById+id, HTTP_METHODS.DELETE);
  return recipes; // Returner oppskriftene her
}

export async function addRecipe(data) {
  const recipes = await runRequest(API_ENDPOINTS_RECIPE_SERVER.AddRecipe, HTTP_METHODS.POST, data);
  return recipes; // Returner oppskriftene her
}

// async function delteTecTreNode(nodeID) {
//   const tree = await runRequest(API_ENDPOINTS_RECIPE_SERVER.DeletNode(nodeID));
// }

async function runRequest(path, method = HTTP_METHODS.GET, data = null) {
  const request = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if ([HTTP_METHODS.POST, HTTP_METHODS.PATCH, HTTP_METHODS.PUT].includes(method)) {
    request.body = JSON.stringify(data);
  }

  const respons = await fetch(path, request);
  // console.log(respons);

  return await respons.json();
}

console.log(`API is runing ${isPROD ? "PROD" : "Test"} `);
