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
  setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>,
  setIsGameDraw: React.Dispatch<React.SetStateAction<boolean>>
): string[] => {
  const results: string[] = [];
  const dealerHasBlackjack = isBlackjack(dealerCards);

  playerScores.forEach((playerScore, index) => {
    const playerCards = cardValue[index];
    const playerHasBlackjack = isBlackjack(playerCards);

    if (playerScore > 21) {
      setIsGameLost(true);
      results.push(`Le joueur a perdu avec cette main ${index + 1} !`);
    } else if (dealerScore > 21) {
      setIsGameWon(true);
      results.push(`Le joueur a gagné avec cette main ${index + 1} !`);
    } else if (playerHasBlackjack && dealerHasBlackjack) {
      setIsGameDraw(true);
      results.push(`Égalité avec Blackjack sur la main ${index + 1} !`);
    } else if (playerHasBlackjack) {
      setIsGameWon(true);
      results.push(`Le joueur a gagné avec Blackjack sur la main ${index + 1} !`);
    } else if (dealerHasBlackjack) {
      setIsGameLost(true);
      results.push(`Blackjack du croupier, le joueur a perdu sur la main ${index + 1} !`);
    } else if (playerScore === dealerScore) {
      setIsGameDraw(true);
      results.push(`Égalité sur la main ${index + 1} !`);
    } else if (playerScore > dealerScore) {
      setIsGameWon(true);
      results.push(`Le joueur a gagné avec cette main ${index + 1} !`);
    } else {
      setIsGameLost(true);
      results.push(`Le joueur a perdu avec cette main ${index + 1} !`);
    }
  });

  return results.length ? results : ["Erreur de logique !"];
};


export const isBlackjack = (cards: Card[]): boolean => {

  if (cards.length !== 2) return false;

  const hasAce = cards.some(card => card.value === 'A');
  const hasFaceOrTenCard  = cards.some(card => ['10', 'J', 'Q', 'K'].includes(card.value));

  return hasAce && hasFaceOrTenCard;
};