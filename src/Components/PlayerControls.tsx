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
  isGameLost: boolean
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  deck,
  cardValue,
  setCardValue,
  setDeck,
  setIsGameLost,
  DrawCardDealer,
  isGameLost
}) => {
  
  const drawCard = () => {
    if (isGameLost) {
      return;
    }

    if (deck.length > 0) {
      const drawnCard = deck[0];
      const newCardValue = [...(cardValue || []), drawnCard];
      
      const total = calculateScore(newCardValue);

      if (total > 21) {
        setIsGameLost(true); 
      }

      setCardValue(newCardValue);
      setDeck(deck.slice(1));
    }
  };
  const stay = () => {
    console.log("Player chose to stay.");
    DrawCardDealer();
  };

  const split = () => {
    console.log("Player chose to split.");
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
      <button onClick={split}>Split</button>
      <button onClick={double}>Double</button>
    </div>
  );
};

export default PlayerControls;
