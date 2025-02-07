import express from "express";
import {createDeck, getDeckToShuffle, shuffleDeck, returnDeck, drawRandomCard} from "./routes/deck.mjs";
import {getPoem, getQuote} from "./routes/writings.mjs"
import {getAddition} from "./routes/math.mjs"

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public"));


//  Routes ----------------------------------------------------------
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


//  Starts the server ----------------------------------------------------------
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
