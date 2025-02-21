import fs from "fs/promises";
import { Node, Tree, saveTree, inflateTree } from "../data/tree.mjs";

let treeDummyAmbulance = null
// Start asynkron funksjon
async function start() {
  treeDummyAmbulance = await fs.readFile("./dummy/TreeAmbulanceDriver.json", "Utf-8");

  const server = await import("../server.mjs");

  const jsonData = JSON.parse(treeDummyAmbulance);
}

import fs from 'fs/promises';

async function checkFiles() {
  const files = await fs.readdir('./dummy');
  console.log(files);
}

checkFiles();

start(); // Kjører den asynkrone funksjonen

export { treeDummyAmbulance };