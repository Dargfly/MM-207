"use strict";

const btnNewDeck = document.getElementById("btnNewDeck");
const btnShowDeck = document.getElementById("btnShowDeck");
const btnShuffleDeck = document.getElementById("btnShuffleDeck");
const btnDrawCard = document.getElementById("btnDrawCard");
const inpDeckID = document.getElementById("inpDeckID");
const imgCard = document.getElementById("imgCard");

//  Generates a deck of cards
async function newDeck() {
  const response = await fetch("/temp/deck", {
    method: "POST",
  });
  const deckObject = await response.json();
  const deckID = deckObject.deck_id;
  console.log(deckID);
}

//  Shows the whole deck of cards
async function showDeck(aDeckID) {
  if (aDeckID) {
    console.log(aDeckID);

    const response = await fetch(`/temp/deck/${aDeckID}`, {
      method: "GET",
    });
    const message = await response.json();
    console.log(message);
  } else {
    console.log("You have to define deck ID");
  }
}

//  Shuffles the deck of cards
async function shuffleDeck(aDeckID) {
  if (aDeckID) {
    const response = await fetch(`/temp/deck/shuffle/${aDeckID}`, {
      method: "PATCH",
    });
    const message = await response.json();
    console.log(message);
  } else {
    console.log("You have to define deck ID");
  }
}

//	Draws a random card
async function drawCard(aDeckID) {
  if (aDeckID) {
    const response = await fetch(`/temp/deck/${aDeckID}/card`);
    const card = await response.json();
    return card;
  } else {
    console.log("You have to define deck ID");
  }
}

//	Shows image of chosen card
function showCardImage(aCard) {
	console.log(aCard);
	
	const value = aCard.value;
	const suit = aCard.suit;
  imgCard.src = `imgs/cards/${value}_of_${suit}.png`;
}

//  Event listeners ----------------------------------------------------------
btnNewDeck.addEventListener("click", newDeck);
btnShowDeck.addEventListener("click", () => showDeck(inpDeckID.value));
btnShuffleDeck.addEventListener("click", () => shuffleDeck(inpDeckID.value));
btnDrawCard.addEventListener("click", async () => {
  try {
    const card = await drawCard(inpDeckID.value);
    showCardImage(card);
  } catch (error) {
    console.log("Error: " + error);
  }
});