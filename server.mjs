import express from "express";
import { startSession, updateSession } from './modules/sessionManager.mjs';
import HTTPLogger from './modules/HTTPLogger.mjs';

import recipeRouter from './routes/recipeAPI.mjs';

const server = express();
const port = process.env.PORT || 8000;
process.env.pass

server.set("port", port);
server.use(express.static("public"));
server.use(express.json());
server.use(HTTPLogger);

//Server session managment
server.use(startSession);


//  Routes ----------------------------------------------------------

//Food recipes
server.use("/recipe/", recipeRouter)
server.use(updateSession);


//  Starts the server ----------------------------------------------------------
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

export default server