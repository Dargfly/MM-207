import express from "express";
import { createDeck, getDeckToShuffle, shuffleDeck, returnDeck, drawRandomCard } from "./routes/deck.mjs";
import { getPoem, getQuote } from "./routes/writings.mjs"
import { getAddition } from "./routes/math.mjs"
import { startSession, updateSession } from './modules/sessionManager.mjs';

import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';

const server = express();
const port = process.env.PORT || 8000;
process.env.pass

server.set("port", port);
server.use(express.static("public"));
server.use(express.json());

//Server session managment
server.use(startSession);


//  Routes ----------------------------------------------------------
//Avatar Project
server.use("/tree/", treeRouter);
server.use("/quest", questLogRouter);
server.use("/user", userRouter)


//Deck of Cards-routes
server.post("/temp/deck", createDeck);
server.patch("/temp/deck/shuffle/:deck_id", getDeckToShuffle, shuffleDeck);
server.get("/temp/deck/:deck_id", returnDeck);
server.get("/temp/deck/:deck_id/card", drawRandomCard);

//Writings-routes - Returns with URL
server.get("/temp/quote", getQuote);
server.get("/temp/poem", getPoem);

//  Adding numbers from URL adress
server.post("/temp/sum/:a/:b", getAddition);

server.use(updateSession);


//  Starts the server ----------------------------------------------------------
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

export default server