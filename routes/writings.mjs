import HTTP_CODES from "../utils/httpCodes.mjs";

//  Poem ----------------------------------------------------------
export function getPoem(req, res, next) {
  res
    .status(HTTP_CODES.SUCCESS.OK)
    .send(
      'Roser er røde, <br> koden kan krasje, <br> feilene dukker opp, <br> men vi trykker på "flash" - så vi kan "cache"'
    )
    .end();
}

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

export function getQuote(req, res, next) {
  const quote = generateQuote();
  res.status(HTTP_CODES.SUCCESS.OK).send(quote).end();
}