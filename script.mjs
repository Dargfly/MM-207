import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public"));

//  Poem ----------------------------------------------------------
function getPoem(req, res, next) {
  res
    .status(HTTP_CODES.SUCCESS.OK)
    .send(
      'Roser er røde, <br> koden kan krasje, <br> feilene dukker opp, <br> men vi trykker på "flash" - så vi kan "cache"'
    )
    .end();
}

// Returns poem with URL
server.get("/temp/poem", getPoem);

// Quote ----------------------------------------------------------
const randomQuotes = [
  "The journey may be long, but the destination is worth every step.",
  "True strength is not found in what we conquer, but in what we endure.",
  "Every day is a blank page, waiting for you to write your story.",
  "The key to happiness lies not in what you have, but in how you see the world.",
  "Growth happens when you embrace discomfort, not when you seek comfort.",
];

function generateQuote() {
  const randomNumber = Math.floor(Math.random() * 5);
  const chosenQuote = randomQuotes[randomNumber];
  return chosenQuote;
}

function getQuote(req, res, next) {
  const quote = generateQuote();
  res.status(HTTP_CODES.SUCCESS.OK).send(quote).end();
}

// Returns quote with URL
server.get("/temp/quote", getQuote);

//  Adding numbers from URL adress ----------------------------------------------------------
server.post("/temp/sum/:a/:b", getAddition);

function getAddition(req, res, next) {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  let answer = null;
  if (isNaN(a) || isNaN(b)) {
    answer = "The URL prompted does not have a valid number";
  } else {
    answer = a + b;
  }

  res.status(HTTP_CODES.SUCCESS.OK).send(answer.toString()).end();
}

//  Deck of cards ----------------------------------------------------------
const suitList = ["spades", "hearts", "clubs", "diamonds"];
const faceCardList = ["jack", "queen", "king", "ace"];
const deckList = [];
let deckID = -1;

function generateDeckID() {
  deckID++;
  return deckID;
}

function createDeck(req, res, next) {
  const deckObject = { id: generateDeckID(), deck: null };
  const deck = [];

  for (const currentSuit of suitList) {
    // Legger til kort fra 2-10
    for (let i = 2; i <= 10; i++) {
      const card = { suit: currentSuit, value: i };
      deck.push(card);
    }
    // Legger til facecards basert på liste
    for (const currentFaceCard of faceCardList) {
      const card = { suit: currentSuit, value: currentFaceCard };
      deck.push(card);
    }
  }

  deckObject.deck = deck;
  deckList.push(deckObject);

  res.status(HTTP_CODES.SUCCESS.OK).send(deckObject.id.toString());
}

server.post("/temp/deck", createDeck);

//  Starts the server ----------------------------------------------------------
server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
