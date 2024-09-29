import { Card, createDeck, shuffleDeck } from '../Components/Deck';
import { useState } from 'react';
import Player from '../Player';
import PlayerControls from './PlayerControls';
import Dealer from './Dealer';

const Game: React.FC = () => {
    const totalDecks = 7;
    const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck(totalDecks)));
    const [cardValue, setCardValue] = useState<Card[] | null>(null);
    const [dealerCards, setDealerCards] = useState<Card[] | null>(null);
    const [isTwoCardDrawn, setIsTwoCardDrawn] = useState<boolean>(false);
    const [isGameLost, setIsGameLost] = useState<boolean>(false);

    const drawCards = async () => {
        if (deck.length > deck.length / 2) {
          const playerFirstCard = deck[0];
          const playerSecondCard = deck[1];
          const dealerFirstCard = deck[2];
          const dealerSecondCard: Card = { ...deck[3], hidden: true as const };
          setCardValue([playerFirstCard, playerSecondCard]);
          setDealerCards([dealerFirstCard, dealerSecondCard]);
      
          await new Promise((resolve) => setTimeout(resolve, 1000));
      
          setDeck(deck.slice(4));
          setIsTwoCardDrawn(true);
        }
      };

    const drawCard = () => {
        if (deck.length > 0) {
            const drawnCard = deck[0];
            const newCardValue = [...(cardValue || []), drawnCard];
            const total = newCardValue.reduce((acc, card) => acc + (parseInt(card.value) || 10), 0);

            if (total > 21) {
                setIsGameLost(true);
                setCardValue(null);
                setIsTwoCardDrawn(false);
            } else {
                setCardValue(newCardValue);
                setDeck(deck.slice(1));
            }
        }
    };



    const resetGame = () => {
        setDeck(shuffleDeck(createDeck(totalDecks)));
        setCardValue(null);
        setIsTwoCardDrawn(false);
        setIsGameLost(false);
    };

    return (
        <>
       <Dealer dealerCards={dealerCards} drawCard={drawCard} />
            {!isGameLost ? (
                !isTwoCardDrawn ? (
                    <button onClick={drawCards}>Start the Game</button>
                ) : (
                    <PlayerControls drawCard={drawCard} cardValue={null} isGameLost={false}/>
                )
            ) : (
                <>
                    <h2>You Lost! Total exceeded 21.</h2>
                    <button onClick={resetGame}>Restart Game</button>
                </>
            )}
            <Player cardValue={cardValue} />
        </>
    );
};

export default Game;
