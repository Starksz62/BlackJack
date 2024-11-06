import { Card } from "./Components/Deck";

export const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let acesCount = 0;

  hand.forEach((card) => {
    if (card.value === "A") {
      acesCount++;
      score += 11;
    } else {
      score += card.valueCard;
    }
  });

  while (score > 21 && acesCount > 0) {
    score -= 10;
    acesCount--;
  }

  return score;
};
export const drawDealerCard = (
  deck: Card[],
  dealerCards: Card[]
): { newDealerCards: Card[]; updatedDeck: Card[] } => {
  const newDealerCards = [...dealerCards];

  if (newDealerCards[1]) {
    newDealerCards[1] = { ...newDealerCards[1], hidden: false };
  }

  let updatedDeck = [...deck];

  let dealerScore = calculateScore(
    newDealerCards.filter((card) => !card.hidden)
  );

  while (dealerScore < 17 && updatedDeck.length > 0) {
    const drawnCard = updatedDeck[0];
    newDealerCards.push(drawnCard);
    dealerScore = calculateScore(newDealerCards.filter((card) => !card.hidden));

    if (dealerScore > 21) {
      break;
    }

    updatedDeck = updatedDeck.slice(1);
  }

  return { newDealerCards, updatedDeck };
};

export const determineGameResult = (
  playerScores: number[],
  dealerScore: number,
  cardValue: Card[][],
  dealerCards: Card[],
  currentBalance: number,
  betAmount: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameDraw: React.Dispatch<React.SetStateAction<boolean>>,

): string[] => {
  const results: string[] = [];

   const updateGameStatus = (gameStatus: "win" | "lose" | "draw") => {
    
    switch (gameStatus) {
      case "win":
        setIsGameWon(true);
        break;
      case "lose":
        setIsGameLost(true);
        break;
      case "draw":
        setIsGameDraw(true);
        break;
    }
    return gameStatus;
  };
  playerScores.forEach((playerScore, index) => {
    const playerCards = cardValue[index];
    const dealerHasBlackjack = isBlackjack(dealerCards);
    const playerHasBlackjack = isBlackjack(playerCards);
    let resultMessage = "";
    let gameStatus: "win" | "lose" | "draw"; 
   

    if (playerScore > 21) {
      updateGameStatus("lose");
      resultMessage = `Le joueur a perdu avec cette main ${index + 1} !`;
      gameStatus = "lose";
    } else if (dealerScore > 21) {
      updateGameStatus("win");
      resultMessage = `Le joueur a gagné avec cette main ${index + 1} !`;
      gameStatus = "win";
    } else if (playerHasBlackjack && dealerHasBlackjack) {
      updateGameStatus("draw");
      resultMessage = `Égalité avec Blackjack sur la main ${index + 1} !`;
      gameStatus = "draw";
    } else if (playerHasBlackjack) {
      updateGameStatus("win");
      resultMessage = `Le joueur a gagné avec Blackjack sur la main ${index + 1} !`;
      gameStatus = "win";
    } else if (dealerHasBlackjack) {
      updateGameStatus("lose");
      resultMessage = `Blackjack du croupier, le joueur a perdu sur la main ${index + 1} !`;
      gameStatus = "lose";
    } else if (playerScore === dealerScore) {
      updateGameStatus("draw");
      resultMessage = `Égalité sur la main ${index + 1} !`;
      gameStatus = "draw";
    } else if (playerScore > dealerScore) {
      updateGameStatus("win");
      resultMessage = `Le joueur a gagné avec cette main ${index + 1} !`;
      gameStatus = "win";
    } else {
      updateGameStatus("lose");
      resultMessage = `Le joueur a perdu avec cette main ${index + 1} !`;
      gameStatus = "lose";
    }
    

    results.push(resultMessage);
    updateWallet(gameStatus, playerHasBlackjack,currentBalance, betAmount, setBalance);
  });


  return results.length ? results : ["Erreur de logique !"];
};
export const updateWallet = (
  gameStatus: "win" | "lose" | "draw",
  playerHasBlackjack: boolean,
  currentBalance: number,
  betAmount: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  let newBalance = currentBalance;

  if (gameStatus === "win") {
    newBalance += playerHasBlackjack ? betAmount * 2.5 : betAmount;
    console.log("win", newBalance);
  } else if (gameStatus === "lose") {
    newBalance -= betAmount;
    console.log("lose", newBalance);
  } else if (gameStatus === "draw") {
    console.log("draw", newBalance);
  }

  setBalance(newBalance);
};
export const isBlackjack = (hand: Card[]): boolean => {
  if (hand.length !== 2) return false;

  const containsAce = hand.some(card => card.value === 'A');
  const containsFaceOrTen = hand.some(card => ['10', 'J', 'Q', 'K'].includes(card.value));

  return containsAce && containsFaceOrTen;
};

