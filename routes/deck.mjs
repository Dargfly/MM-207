import HTTP_CODES from "../utils/httpCodes.mjs";

//  Deck of Cards ----------------------------------------------------------
const suitList = ["spades", "hearts", "clubs", "diamonds"];
const faceCardList = ["jack", "queen", "king", "ace"];
const deckList = [];
let deckID = -1;

function generateDeckID() {
  deckID++;
  return deckID;
}

//  Generates a deck of cards
export function createDeck(req, res, next) {
  const deckObject = { deck_id: generateDeckID(), deck: null };
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

  res.status(HTTP_CODES.SUCCESS.OK).json({ deck_id: deckObject.deck_id });
}

//  Gets deck to shuffle based on ID
export function getDeckToShuffle(req, res, next) {
  const aDeck_id = Number(req.params.deck_id);
  const findTargetDeck = deckList.find(
    (element) => element.deck_id === aDeck_id
  );

  //If deck id provided in the URL doesn't exist;
  if (!findTargetDeck) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ data: "Deck not found" });
  }
  req.deck = findTargetDeck; //Forwards found deck to the next function

  //Uses next() in order to run the next function.
  next();
}

//  Shuffles the deck of cards
export function shuffleDeck(req, res, next) {
  const deck = req.deck.deck;

  //Uses Fisher-Yates shuffle algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }

  res
    .status(HTTP_CODES.SUCCESS.OK)
    .json({ data: "Deck with ID " + req.deck.deck_id + " shuffled!" });
}

//  Returns the whole deck
export function returnDeck(req, res, next) {
  const aDeck_id = Number(req.params.deck_id);
  const findTargetDeck = deckList.find(
    (element) => element.deck_id === aDeck_id
  );

  if (!findTargetDeck) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ data: "Deck not found" });
  }

  res.status(HTTP_CODES.SUCCESS.OK).json({ data: findTargetDeck });
}

//  Draw a random card
export function drawRandomCard(req, res, next) {
  const aDeck_id = Number(req.params.deck_id);
  const findTargetDeck = deckList.find(
    (element) => element.deck_id === aDeck_id
  );
  if (!findTargetDeck) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ data: "Deck not found" });
  }
  const targetDeck = findTargetDeck.deck;

  //Checks amount of cards in deck
  if (targetDeck.length <= 0) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ data: "Deck doesn't have cards left" });
  }

  const randomCardNumber = Math.floor(Math.random() * targetDeck.length);
  const randomCard = targetDeck.splice(randomCardNumber, 1)[0];
  res.status(HTTP_CODES.SUCCESS.OK).json(randomCard);
}