const axios = require("axios");

async function createDeck() {
  let response = await axios //create a deck and shuffle it
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  const deck_id = response.data["deck_id"];
  console.log("Deck has been created.");
  await axios //draws 5 cards from the deck
    .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`)
    .then((res) => {
      const cards = res.data["cards"];
      console.log("The following 5 cards have been drawn...");

      const [ranks, suits] = parseCards(cards);

      console.log("Top poker hand is:", topPokerHand(ranks, suits));
    })
    .catch((error) => {
      console.log(error, "There is an error in drawing the cards...");
    });
}

createDeck();

function parseCards(cards) {
  const ranks = [],
    suits = [];
  cards.forEach((card) => {
    let value = card["value"];
    const suit = card["suit"];
    console.log(`${value} of ${suit}`);
    if (value === "KING") value = 13;
    else if (value === "QUEEN") value = 12;
    else if (value === "JACK") value = 11;
    else if (value === "ACE") value = 1;
    else value = Number(value);
    ranks.push(value);
    suits.push(suit);
  });
  return [ranks, suits];
}

function topPokerHand(ranks, suits) {
  if (!ranks || !suits) return "High card";

  const suitSet = new Set([...suits]);
  let flush = false,
    pairs = 0,
    threeOfAKind = false,
    fourOfAKind = false,
    straight = true;
  let topPokerHand = "Straight flush";

  //If set is size of one, this indicates there is no more than one distinct suit.
  if (suitSet.size === 1) {
    flush = true;
  }
  ranks.sort((a, b) => a - b);
  for (let i = 0; i < ranks.length - 1; i++) {
    if (ranks[i] === ranks[i + 1] - 1) continue;
    else straight = false;
  }
  if (flush && straight) return topPokerHand;

  //Create the map to visualize equal ranks (key = rank, value = # of occurences)
  const rankMap = new Map();
  ranks.forEach((rank) => {
    const mapValue = rankMap.get(rank);
    if (mapValue) rankMap.set(rank, mapValue + 1);
    else rankMap.set(rank, 1);
  });

  //Iterate through the map to validate cards of same rank
  rankMap.forEach((value, key) => {
    if (value === 2) pairs += 1;
    else if (value === 3) threeOfAKind = true;
    else if (value === 4) fourOfAKind = true;
  });

  //Conditionals to determine Top Poker Hand
  if (fourOfAKind) topPokerHand = "Four of a kind";
  else if (threeOfAKind && pairs) topPokerHand = "Full house";
  else if (flush) topPokerHand = "Flush";
  else if (straight) topPokerHand = "Straight";
  else if (threeOfAKind) topPokerHand = "Three of a kind";
  else if (pairs === 2) topPokerHand = "Two pair";
  else if (pairs === 1) topPokerHand = "One pair";
  else topPokerHand = "High card";
  return topPokerHand;
}

module.exports = { topPokerHand, parseCards };
