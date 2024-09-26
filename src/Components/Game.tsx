// Game.tsx
import { Card, createDeck, shuffleDeck } from '../Components/Deck';
import { useState } from 'react';
import Player from '../Player';
import PlayerControls from './PlayerControls';

const Game: React.FC = () => {
    const totalDecks = 7;
    const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck(totalDecks)));
    const [cardValue, setCardValue] = useState<Card[] | null>(null);
    const [isTwoCardDrawn, setIsTwoCardDrawn] = useState<boolean>(false);
    const [isGameLost, setIsGameLost] = useState<boolean>(false);

    const drawTwoCards = () => {
        if (deck.length >= 2) {
            const firstCard = deck[0];
            const secondCard = deck[1];
            setCardValue([firstCard, secondCard]);
            setDeck(deck.slice(2));
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

    const resetGame = () => {
        setDeck(shuffleDeck(createDeck(totalDecks)));
        setCardValue(null);
        setIsTwoCardDrawn(false);
        setIsGameLost(false);
    };

    return (
        <>
            {!isGameLost ? (
                !isTwoCardDrawn ? (
                    <button onClick={drawTwoCards}>Start the Game</button>
                ) : (
                    <PlayerControls
                        drawCard={drawCard}
                        stay={stay}
                        split={split}
                        double={double}
                        cardValue={cardValue}
                        isGameLost={isGameLost}
                    />
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
