"use strict";

const btnNewDeck = document.getElementById("btnNewDeck");
const btnShowDeck = document.getElementById("btnShowDeck");
const btnShuffleDeck = document.getElementById("btnShuffleDeck");
const btnDrawCard = document.getElementById("btnDrawCard");
const inpDeckID = document.getElementById("inpDeckID");
const imgCard = document.getElementById("imgCard");

//  Generates a deck of cards
async function newDeck() {
  try {
    const response = await fetch("/temp/deck", {
      method: "POST",
    });

    //If response from server is not ok, throw an error
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const deckObject = await response.json();
    const deckID = deckObject.deck_id;
    dialogMessage(
      "Deck created!",
      "Deck with ID: " + deckID + " has been made"
    );
  } catch (error) {
    dialogMessage("Error", error.message || "An unexpected error occurred.");
  }
}

//  Shows the whole deck of cards
async function showDeck(aDeckID) {
  if (!aDeckID) {
    dialogMessage("Error", "You have define deck ID");
    return
  }
  try {
    const response = await fetch(`/temp/deck/${aDeckID}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const message = await response.json();
    console.log(message);
  } catch (error) {
    dialogMessage("Error", error.message || "An unexpected error occurred.");
  }
}

//  Shuffles the deck of cards
async function shuffleDeck(aDeckID) {
  //Checks if a deck is is provided
  if (!aDeckID) {
    dialogMessage("Error", "You have to define deck ID");
    return;
  }

  try {
    const response = await fetch(`/temp/deck/shuffle/${aDeckID}`, {
      method: "PATCH",
    });

    //If response from server is not ok, throw an error
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const message = await response.json();
    dialogMessage("Successful!", message.data);
  } catch (error) {
    dialogMessage("Error", error.message || "An unexpected error occurred.");
  }
}

//	Draws a random card
async function drawCard(aDeckID) {
  if (!aDeckID) {
    dialogMessage("Error", "You have to define deck ID");
    return
  }
  try {
    const response = await fetch(`/temp/deck/${aDeckID}/card`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const card = await response.json();
    return card;
  } catch {
    dialogMessage("Error", error.message || "An unexpected error occurred.");
  }
}

//	Shows image of chosen card
function showCardImage(aCard) {
  if (aCard) {
    console.log(aCard);

    const value = aCard.value;
    const suit = aCard.suit;
    imgCard.src = `imgs/cards/${value}_of_${suit}.png`;
  }
}

//  Dialog System ----------------------------------------------------------
const dialog = document.getElementById("dialog");
const titleDialog = document.getElementById("titleDialog");
const textDialog = document.getElementById("textDialog");
const btnCloseDialog = document.getElementById("btnCloseDialog");

function dialogMessage(title, message) {
  titleDialog.innerText = title;
  textDialog.innerText = message;

  dialog.showModal();
}

btnCloseDialog.addEventListener("click", () => {
  dialog.close();
});

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
