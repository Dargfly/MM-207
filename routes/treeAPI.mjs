import express from "express";
import { Tree, Node, inflateTree } from "../data/tree.mjs";
import HTTP_CODES from "../utils/httpCodes.mjs";
import { treeDummyAmbulance } from "../init/init.mjs"; // Juster banen til filen hvor `tree` er eksportert
const treeRouter = express.Router();

const tree = inflateTree(treeDummyAmbulance);


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
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ data: "Node added", tree });
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ data: "Parent not found, make sure you filled in correctly" });
    }
})

//Get node based on data name
treeRouter.get("/node/:node", (req, res, next) => {
    const inpParentData = req.params.node;
    const parentNode = findNode(tree.root, inpParentData);
    if(parentNode) {
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ data: "Node found", parentNode });
    }
})

treeRouter.patch("/", (req, res, next) => {
    const inpParentData = req.body.parentData;
    const inpNewData = req.body.newData;  // Ny data for noden

    // Finn parent node i treet
    const parentNode = findNode(tree.root, inpParentData);
    if (parentNode) {
        // Endre dataen til den funne noden
        parentNode.data = inpNewData;
        res.status(200).json({ message: "Node data updated successfully", tree });
    } else {
        res.status(404).json({ error: "Parent node not found" });
    }
});

export default treeRouter