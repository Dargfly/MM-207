import express from "express";
import fs from "fs/promises";
import HTTP_CODES from "../utils/httpCodes.mjs";

import { JSONtreeDummyAmbulance, JSONrecipes} from "../init/init.mjs"
const recipeRouter = express.Router();

let tree = JSONtreeDummyAmbulance; // Venter på at JSON blir lastet før bruk

let recipes = JSONrecipes;




recipeRouter.use(express.json());

//Get recipe based on ID
recipeRouter.get("/:recipeID?", (req, res) => {
  const inpRecipeID = req.params.recipeID;

  if (!inpRecipeID) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: "Provide an ID for recipe to return" });
  }

  res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Return recipe feature not implemented yet", inpRecipeID });
});



//Create recipe
recipeRouter.post("/", (req, res, next) => {
  const inpRecipeID = req.params.recipeID;

  //Create a recipe, and return id or whole object
  res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Adding recipe feature not implemented yet", inpRecipeID});
})

//Update recipe based on ID
recipeRouter.put("/:recipeID?", (req, res, next) => {
  const inpRecipeID = req.params.recipeID;

  if (!inpRecipeID) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: "Provide an ID for recipe to update" });
  }

  //Put recipe in object.
  res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Editing recipe feature not implemented yet", inpRecipeID});
})

//Delete recipe based on ID
recipeRouter.delete("/:recipeID?", (req, res, next) => {
  const inpRecipeID = req.params.recipeID;

  if (!inpRecipeID) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: "Provide an ID for recipe to delete" });
  }

  //Put recipe in object.
  res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Removing recipe feature not implemented yet", inpRecipeID});
})

















// //Returns whole tree
// tree.get("/adadadada/", (req, res, next) => {
//     res.json("test");
// });


// //Returns node based on data
// function findNode(node, inpParentData) {
//     if (node.data === inpParentData) return node
//     for (let child of node.connections) {
//         const foundNode = findNode(child, inpParentData)
//         if (foundNode) return foundNode
//     }
//     return false
// }

// //Insert node based on parent name
// tree.post("/adadadadaa/", (req, res, next) => {
//     const inpParentData = req.body.parentData;
//     const inpNewNodeData = req.body.newNodeData;

//     const parentNode = findNode(tree.root, inpParentData);
//     if (parentNode) {
//         parentNode.connections.push(Node(inpNewNodeData))
//         res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Node added", tree });
//     } else {
//         res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: "Parent not found, make sure you filled in correctly" });
//     }
// })

// //Get node based on data name
// tree.get("/node/:node", (req, res, next) => {
//     const inpParentData = req.params.node;
//     const parentNode = findNode(tree.root, inpParentData);
//     if (parentNode) {
//         res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Node found", parentNode });
//     }
// })

// //Replace node data on existing node
// tree.patch("/", (req, res, next) => {
//     const inpParentData = req.body.parentData;
//     const inpNewData = req.body.newData;  // Ny data for noden

//     // Finn parent node i treet
//     const parentNode = findNode(tree.root, inpParentData);
//     if (parentNode) {
//         // Endre dataen til den funne noden
//         parentNode.data = inpNewData;
//         res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Node data updated successfully", tree });
//     } else {
//         res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Parent node not found" });
//     }
// });

// //Delete a node
// tree.delete("/", (req, res, next) => {
//     const inpParentData = req.body.parentData;

//     function findAndDeleteNode(node, targetData) {
//         for (let i = 0; i < node.connections.length; i++) {
//             const child = node.connections[i];

//             if (child.data === targetData) {
//                 node.connections.splice(i, 1);
//                 return true;
//             }

//             if (findAndDeleteNode(child, targetData)) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     const deleteNode = findAndDeleteNode(tree.root, inpParentData);

//     if (deleteNode) {
//         res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Node deleted successfully", tree });
//     } else {
//         res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Node not found" });
//     }
// });

export default recipeRouter