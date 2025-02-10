import express from "express";
import {createDeck, getDeckToShuffle, shuffleDeck, returnDeck, drawRandomCard} from "./routes/deck.mjs";
import {getPoem, getQuote} from "./routes/writings.mjs"
import {getAddition} from "./routes/math.mjs"
import {setupSession, loginUser, logoutUser, checkAuthentication} from "./modules/sessionManager.mjs";

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public"));
server.use(express.json());

//Server session managment
setupSession(server);


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

//----LOGIN------
// Eksempel på ruter som bruker autentisering
server.post("/login", (req, res) => {
  loginUser(req, res, 'John Doe');  // Logge inn bruker
});

server.post("/logout", (req, res) => {
  logoutUser(req, res);  // Logge ut bruker
});

server.get("/dashboard", checkAuthentication, (req, res) => {
  res.send('Velkommen til ditt dashboard, ' + req.session.user.username);
});
//----LOGIN END------


//  Starts the server ----------------------------------------------------------
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
