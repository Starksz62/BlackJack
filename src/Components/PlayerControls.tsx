import React from 'react';
import { Card } from './Deck';

interface PlayerControlsProps {
  drawCard: () => void;
  cardValue: Card[] | null;
  isGameLost: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  drawCard,
  isGameLost,
}) => {
  const stay = () => {
    console.log("Player chose to stay.");
  };

  const split = () => {
    console.log("Player chose to split.");
  };

  const double = () => {
    console.log("Player chose to double.");
    drawCard();
  };

  return (
    <div>
      <button onClick={drawCard} disabled={isGameLost}>Draw Card</button>
      <button onClick={stay} disabled={isGameLost}>Stay</button>
      <button onClick={split} disabled={isGameLost}>Split</button>
      <button onClick={double} disabled={isGameLost}>Double</button>
    </div>
  );
};

export default PlayerControls;