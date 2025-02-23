import express from "express";
// import fs from "fs/promises";
import { Tree, Node, inflateTree } from "../data/tree.mjs";
import HTTP_CODES from "../utils/httpCodes.mjs";
// import { treeDummyAmbulance } from "../init/init.mjs";  // Importer initializeTree-funksjonen
const treeRouter = express.Router();

const fs = require('fs').promises;

let tree = null;

async function loadTree() {
    try {
        const data = await fs.readFile("../dummy/TreeAmbulanceDriver.json", "utf-8");
        tree = JSON.parse(data);
        console.log("Tree loaded successfully");
    } catch (error) {
        console.error("Failed to load tree:", error);
    }
}

loadTree();


treeRouter.use(express.json());

//Returns whole tree
treeRouter.get("/", (req, res, next) => {
    res.json(tree);
});


//Returns node based on data
function findNode(node, inpParentData) {
    if (node.data === inpParentData) return node
    for (let child of node.connections) {
        const foundNode = findNode(child, inpParentData)
        if (foundNode) return foundNode
    }
    return false
}

//Insert node based on parent name
treeRouter.post("/", (req, res, next) => {
    const inpParentData = req.body.parentData;
    const inpNewNodeData = req.body.newNodeData;

    const parentNode = findNode(tree.root, inpParentData);
    if (parentNode) {
        parentNode.connections.push(Node(inpNewNodeData))
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Node added", tree });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ message: "Parent not found, make sure you filled in correctly" });
    }
})

//Get node based on data name
treeRouter.get("/node/:node", (req, res, next) => {
    const inpParentData = req.params.node;
    const parentNode = findNode(tree.root, inpParentData);
    if (parentNode) {
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Node found", parentNode });
    }
})

//Replace node data on existing node
treeRouter.patch("/", (req, res, next) => {
    const inpParentData = req.body.parentData;
    const inpNewData = req.body.newData;  // Ny data for noden

    // Finn parent node i treet
    const parentNode = findNode(tree.root, inpParentData);
    if (parentNode) {
        // Endre dataen til den funne noden
        parentNode.data = inpNewData;
        res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Node data updated successfully", tree });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Parent node not found" });
    }
});

//Delete a node
treeRouter.delete("/", (req, res, next) => {
    const inpParentData = req.body.parentData;

    function findAndDeleteNode(node, targetData) {
        for (let i = 0; i < node.connections.length; i++) {
            const child = node.connections[i];

            if (child.data === targetData) {
                node.connections.splice(i, 1);
                return true;
            }

            if (findAndDeleteNode(child, targetData)) {
                return true;
            }
        }
        return false;
    }

    const deleteNode = findAndDeleteNode(tree.root, inpParentData);

    if (deleteNode) {
        res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Node deleted successfully", tree });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Node not found" });
    }
});

export default treeRouter