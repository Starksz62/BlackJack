import React from 'react';
import { Card } from './Deck';
import { calculateScore } from '../Utils';
interface PlayerControlsProps {
  deck: Card[];
  cardValue: Card[] | null;
  setCardValue: (cards: Card[] | null) => void;
  setDeck: (deck: Card[]) => void;
  setIsGameLost: (isLost: boolean) => void;
  DrawCardDealer: () => void;
  isGameLost: boolean;
  isGameWon: boolean;
  isGameDraw: boolean;
  dealerScore: number;
  resetGame: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  deck,
  cardValue,
  setCardValue,
  setDeck,
  setIsGameLost,
  DrawCardDealer,
  isGameLost,
  isGameWon,
  isGameDraw,
  resetGame
}) => {
  const drawCard = () => {
    if (isGameLost || isGameWon || isGameDraw) {
        return
    }

    const drawnCard = deck[0];
    const newCardValue = [...(cardValue || []), drawnCard];
    
    const total = calculateScore(newCardValue);

    setCardValue(newCardValue);
    setDeck(deck.slice(1));
    if (total > 21) {
      setIsGameLost(true);
      console.log("Bust");
      setTimeout(resetGame,2000)
      return;
    }
};

  const stay = () => {

    DrawCardDealer();
  };

  const split = () => {
    if (cardValue && cardValue.length > 1 && cardValue[0].value === cardValue[1].value) {
      return console.log("player split")
    }
  };

  const double = () => {
    if (isGameLost || (cardValue && cardValue.length >= 3)) {
      return; 
    }
    drawCard();
    stay();
  };

  return (
    <div>
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={stay}>Stay</button>
      {cardValue && cardValue.length > 1 && cardValue[0].value === cardValue[1].value && (
        <button onClick={split}>Split</button>
      )}
{cardValue?.length === 2 && (
  <button onClick={double} disabled={cardValue?.length > 2}>
    Double
  </button>
)}
    </div>
  );
};

export default PlayerControls;
