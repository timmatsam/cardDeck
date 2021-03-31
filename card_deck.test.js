const { topPokerHand, parseCards } = require("./card_deck");
const cards = [
  {
    code: "QS",
    image: "https://deckofcardsapi.com/static/img/QS.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/QS.svg",
      png: "https://deckofcardsapi.com/static/img/QS.png",
    },
    value: "QUEEN",
    suit: "SPADES",
  },
  {
    code: "JH",
    image: "https://deckofcardsapi.com/static/img/JH.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/JH.svg",
      png: "https://deckofcardsapi.com/static/img/JH.png",
    },
    value: "JACK",
    suit: "HEARTS",
  },
  {
    code: "4C",
    image: "https://deckofcardsapi.com/static/img/4C.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/4C.svg",
      png: "https://deckofcardsapi.com/static/img/4C.png",
    },
    value: "4",
    suit: "CLUBS",
  },
  {
    code: "8C",
    image: "https://deckofcardsapi.com/static/img/8C.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/8C.svg",
      png: "https://deckofcardsapi.com/static/img/8C.png",
    },
    value: "8",
    suit: "CLUBS",
  },
  {
    code: "3D",
    image: "https://deckofcardsapi.com/static/img/3D.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/3D.svg",
      png: "https://deckofcardsapi.com/static/img/3D.png",
    },
    value: "3",
    suit: "DIAMONDS",
  },
];
describe("parseCards Functionality", () => {
  test("Returns two arrays", () => {
    expect(Array.isArray(parseCards(cards)[0])).toBe(true);
    expect(Array.isArray(parseCards(cards)[1])).toBe(true);
  });
});

describe("topPokerHand Functionality", () => {
  test("Returns High Card / does not break w/o input", () => {
    expect(topPokerHand()).toBe("High card");
  });
  test("Returns Straight Flush", () => {
    expect(topPokerHand([12, 11, 10, 8, 9], ["C", "C", "C", "C", "C"])).toBe(
      "Straight flush"
    );
  });
  test("Returns Four of a kind", () => {
    expect(topPokerHand([11, 11, 11, 11, 9], ["C", "C", "C", "C", "C"])).toBe(
      "Four of a kind"
    );
  });
  test("Returns Full house", () => {
    expect(topPokerHand([11, 11, 11, 10, 10], ["C", "C", "C", "C", "C"])).toBe(
      "Full house"
    );
  });
  test("Returns Straight", () => {
    expect(topPokerHand([11, 10, 9, 7, 8], ["D", "C", "C", "C", "C"])).toBe(
      "Straight"
    );
  });
  test("Returns Three of a kind", () => {
    expect(topPokerHand([11, 11, 11, 7, 8], ["D", "C", "C", "C", "C"])).toBe(
      "Three of a kind"
    );
  });
  test("Returns Two pair", () => {
    expect(topPokerHand([11, 11, 7, 7, 8], ["D", "C", "C", "C", "C"])).toBe(
      "Two pair"
    );
  });
  test("Returns One pair", () => {
    expect(topPokerHand([11, 11, 7, 6, 8], ["D", "C", "C", "C", "C"])).toBe(
      "One pair"
    );
  });
  test("Returns Flush", () => {
    expect(topPokerHand([11, 11, 10, 8, 9], ["C", "C", "C", "C", "C"])).toBe(
      "Flush"
    );
  });
});
