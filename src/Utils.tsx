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
    playerScores: number[], // plusieurs mains possibles
    dealerScore: number,
    setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameDraw: React.Dispatch<React.SetStateAction<boolean>>
  ): string[] => {
    const results: string[] = [];
  
    playerScores.forEach((playerScore) => {
      if (playerScore > 21) {
        setIsGameLost(true);
        results.push("Le joueur a perdu avec cette main !");
      } else if (dealerScore > 21) {
        setIsGameWon(true);
        results.push("Le joueur a gagné avec cette main !");

      }else if (playerScore === 21) {
        setIsGameWon(true); }
      else if (playerScore === dealerScore) {
        setIsGameDraw(true);
        results.push("Égalité avec cette main !");
      } else if (playerScore > dealerScore) {
        setIsGameWon(true);
        results.push("Le joueur a gagné avec cette main !");
      } else {
        setIsGameLost(true);
        results.push("Le joueur a perdu avec cette main !");
      }
    });
  
    return results.length ? results : ["Erreur de logique !"];
  };