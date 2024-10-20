import { Card } from './Deck';
import { calculateScore } from '../Utils';
import { useSplitCards } from '../Context/SplitContext';
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
  

  const { splitCards, setSplitCards, activeHand, setActiveHand } = useSplitCards();
    const drawCard = () => {
    if (isGameLost || isGameWon || isGameDraw) {
        return
    }

    const drawnCard = deck[0];
    const newCardValue = [...(splitCards ? splitCards[activeHand] : cardValue || []), drawnCard];
    const total = calculateScore(newCardValue);
    console.log("je suis dans playerControl",total);
if(splitCards) {
  if (splitCards) {
    const updatedHands = [...splitCards];
    updatedHands[activeHand] = newCardValue;
    setSplitCards(updatedHands);
  } else {
    setCardValue(newCardValue);
  }
}
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
  if (splitCards) {
    if (activeHand === 0) {
      setActiveHand(1);
    } else {
      DrawCardDealer();
    }
  } else {
    DrawCardDealer();
  }
};

const split = () => {
  if (cardValue && cardValue.length === 2 && cardValue[0].valueCard === cardValue[1].valueCard) {
    const firstHand = [cardValue[0]];
    const secondHand = [cardValue[1]];

    const updatedHands = [firstHand, secondHand];
    setSplitCards(updatedHands);

    setCardValue(null);
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
      {cardValue && cardValue.length > 1 && cardValue[0].valueCard === cardValue[1].valueCard && (
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
