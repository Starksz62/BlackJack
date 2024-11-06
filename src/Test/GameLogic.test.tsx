// gameUtils.test.ts
import { Card } from "../Components/Deck";
import { determineGameResult, calculateScore, isBlackjack } from "../Utils";

describe("Blackjack Game Logic", () => {
  const setIsGameLost = jest.fn();
  const setIsGameWon = jest.fn();
  const setIsGameDraw = jest.fn();
const betAmount = 10;
const currentBalance = 100;
const setBalance = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("determineGameResult", () => {
    it("should declare the player as the winner if their score is higher than the dealer's", () => {
      const playerScore = 19;
      const dealerScore = 17;
      const cardValue: Card[][] = [
        [
          { value: "9", suit: "Hearts", hidden: false, valueCard: 9 },
          { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
        ],
      ];
      const dealerCards: Card[] = [
        { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "7", suit: "Diamonds", hidden: false, valueCard: 7 },
      ];
      determineGameResult(
        [playerScore],
        dealerScore,
        cardValue,
        dealerCards,
        currentBalance,
        betAmount,
        setBalance,
        setIsGameLost,
        setIsGameWon,
        setIsGameDraw
      );
      expect(setIsGameWon).toHaveBeenCalledWith(true);
      expect(setIsGameLost).not.toHaveBeenCalled();
      expect(setIsGameDraw).not.toHaveBeenCalled();
    });

    it("should declare the dealer as the winner if their score is higher than the player's", () => {
      const playerScore = 17;
      const dealerScore = 19;
      
      const cardValue: Card[][] = [
        [
          { value: "7", suit: "Hearts", hidden: false, valueCard: 7 },
          { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
        ],
      ];
      const dealerCards: Card[] = [
        { value: "9", suit: "Hearts", hidden: false, valueCard: 9 },
        { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
      ];
      determineGameResult(
        [playerScore],
        dealerScore,
        cardValue,
        dealerCards,
        currentBalance,
        betAmount,
        setBalance,
        setIsGameLost,
        setIsGameWon,
        setIsGameDraw
      );

      expect(setIsGameWon).not.toHaveBeenCalled();
      expect(setIsGameLost).toHaveBeenCalledWith(true);
      expect(setIsGameDraw).not.toHaveBeenCalled();
    });

    it("should declare a draw if the scores are equal", () => {
      const playerScore = 20;
      const dealerScore = 20;
      const cardValue: Card[][] = [
        [
          { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
          { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
        ],
      ];
      const dealerCards: Card[] = [
        { value: "K", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
      ];
      determineGameResult(
        [playerScore],
        dealerScore,
        cardValue,
        dealerCards,
        currentBalance,
        betAmount,
        setBalance,
        setIsGameLost,
        setIsGameWon,
        setIsGameDraw
      );

      expect(setIsGameLost).not.toHaveBeenCalled();
      expect(setIsGameWon).not.toHaveBeenCalled();
      expect(setIsGameDraw).toHaveBeenCalledWith(true);
    });

    it("should call setIsGameLost when the player exceeds 21", () => {
      const playerScore = 22;
      const dealerScore = 18;
      const cardValue: Card[][] = [
        [
          { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
          { value: "5", suit: "Diamonds", hidden: false, valueCard: 5 },
          { value: "7", suit: "Hearts", hidden: false, valueCard: 7 }
        ],
      ];
      const dealerCards: Card[] = [
        { value: "K", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "8", suit: "Diamonds", hidden: false, valueCard: 8 }
      ];
      determineGameResult(
        [playerScore],
        dealerScore,
        cardValue,
        dealerCards,
        currentBalance,
        betAmount,
        setBalance,
        setIsGameLost,
        setIsGameWon,
        setIsGameDraw
      );
      expect(setIsGameLost).toHaveBeenCalledWith(true);
      expect(setIsGameDraw).not.toHaveBeenCalled();
      expect(setIsGameWon).not.toHaveBeenCalled();
    });

    it("should declare the player as the winner if the dealer exceeds 21", () => {
      const playerScore = 20;
      const dealerScore = 26;
      const cardValue: Card[][] = [
        [
          { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
          { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 },
        ],
      ];
      const dealerCards: Card[] = [
        { value: "K", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "6", suit: "Diamonds", hidden: false, valueCard: 6 },
        { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 },
      ];
      determineGameResult(
        [playerScore],
        dealerScore,
        cardValue,
        dealerCards,
        currentBalance,
        betAmount,
        setBalance,
        setIsGameLost,
        setIsGameWon,
        setIsGameDraw
      );
      expect(setIsGameWon).toHaveBeenCalledWith(true);
      expect(setIsGameDraw).not.toHaveBeenCalled();
      expect(setIsGameLost).not.toHaveBeenCalled();
    });
  });

  describe("calculateScore", () => {
    it("should calculate the correct score for a hand without Aces", () => {
      const hand: Card[] = [
        { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "5", suit: "Clubs", hidden: false, valueCard: 5 },
      ];
      expect(calculateScore(hand)).toBe(15);
    });

    it("should treat an Ace as 11 if it does not exceed 21", () => {
      const hand: Card[] = [
        { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "5", suit: "Clubs", hidden: false, valueCard: 5 },
        { value: "A", suit: "Spades", hidden: false, valueCard: 11 },
      ];
      expect(calculateScore(hand)).toBe(16);
    });

    it("should treat an Ace as 1 if it exceeds 21", () => {
      const hand: Card[] = [
        { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "9", suit: "Clubs", hidden: false, valueCard: 9 },
        { value: "A", suit: "Spades", hidden: false, valueCard: 1 },
      ];
      expect(calculateScore(hand)).toBe(20);
    });

    it("should handle multiple Aces correctly", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "A", suit: "Clubs", hidden: false, valueCard: 11 },
        { value: "9", suit: "Spades", hidden: false, valueCard: 9 },
      ];
      expect(calculateScore(hand)).toBe(21);
    });

    it("should handle multiple Aces and avoid exceeding 21", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "A", suit: "Clubs", hidden: false, valueCard: 11 },
        { value: "8", suit: "Spades", hidden: false, valueCard: 8 },
      ];
      expect(calculateScore(hand)).toBe(20);
    });
  });

  describe("SplitComparaisonResult", () => {
    it("should compare each player hand against the dealer's hand after a split", () => {
      const dealerScore = 19;
      const playerScores = [18, 20];

      const cardValue: Card[][] = [
        [
          { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
          { value: "8", suit: "Diamonds", hidden: false, valueCard: 8 }
        ],
        [
          { value: "9", suit: "Spades", hidden: false, valueCard: 9 },
          { value: "A", suit: "Clubs", hidden: false, valueCard: 11 }
        ]
      ];

      playerScores.forEach((playerScore, index) => {
        determineGameResult(
          [playerScore],
          dealerScore,
          [cardValue[index]],
          [],
          currentBalance,
          betAmount,
          setBalance,
          setIsGameLost,
          setIsGameWon,
          setIsGameDraw
        );

        if (playerScore > dealerScore) {
          expect(setIsGameWon).toHaveBeenCalled();
        } else if (playerScore < dealerScore) {
          expect(setIsGameLost).toHaveBeenCalled();
        } else {
          expect(setIsGameDraw).toHaveBeenCalled();
        }
      });
    });
    
  });
  describe("isBlackjack", () => {
    it("should return true for a hand with an Ace and a 10-value card", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 }
      ];
      expect(isBlackjack(hand)).toBe(true);
    });
  
    it("should return true for a hand with an Ace and a Face card", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "K", suit: "Diamonds", hidden: false, valueCard: 10 }
      ];
      expect(isBlackjack(hand)).toBe(true);
    });
  
    it("should return false for a hand without an Ace", () => {
      const hand: Card[] = [
        { value: "10", suit: "Hearts", hidden: false, valueCard: 10 },
        { value: "9", suit: "Diamonds", hidden: false, valueCard: 9 }
      ];
      expect(isBlackjack(hand)).toBe(false);
    });
  
    it("should return false for a hand without a 10-value card", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "5", suit: "Diamonds", hidden: false, valueCard: 5 }
      ];
      expect(isBlackjack(hand)).toBe(false);
    });
  
    it("should return false for a hand with more than two cards", () => {
      const hand: Card[] = [
        { value: "A", suit: "Hearts", hidden: false, valueCard: 11 },
        { value: "10", suit: "Diamonds", hidden: false, valueCard: 10 },
        { value: "5", suit: "Clubs", hidden: false, valueCard: 5 }
      ];
      expect(isBlackjack(hand)).toBe(false);
    });
  });
  
});
