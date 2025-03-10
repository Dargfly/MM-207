HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT"
}

const isPROD = false;

const BASE_API_TEST1 = "Test1/"
const BASE_API_TEST2 = "Test2/"

const BAS_API = (isPROD) ? 

const API_ENDPOINTS_TECTREE_SERVER = {
  GetTree: `${BAS_API}/tree`,
  DeleteNode: (id) => `/tree/${id}`,
}

async function retrieveUsersTecTree(userID) {
  const tree = await runRequest(API_ENDPOINTS_TECTREE_SERVER.GetTree)
}

async function deleteTecTreeNode(nodeID) {
  const tree = await runRequest(API_ENDPOINTS_TECTREE_SERVER.DeleteNode(nodeID))
}

async function runRequest (Path2D, method = HTTP_METHODS.GET, data = null) {

  const request = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  }

  if(HTTP_METHODS) //SPØR OM IKKE ER DET DENNE, ELLER DENNE, SPØR HELLER, ER DET EN AV DISSE
  const respons = await fetch(path, request);

  return await respons.json();


} 



console.log(`API is ${isPROD ? "PROD" : "Test"}`); //Skal bare komme hvis prod er på.