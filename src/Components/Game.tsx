import React, { useState, useCallback, useMemo } from 'react';
import { drawDealerCard, calculateScore, determineGameResult } from '../Utils';
import { Card, createDeck, shuffleDeck } from '../Components/Deck';
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
    const [gameResult, setGameResult] = useState<string | null>(null);

    const drawCards = useCallback(async () => {
        if (deck.length > deck.length / 2) {
            const playerFirstCard = deck[0];
            const playerSecondCard = deck[1];
            const dealerFirstCard = deck[2];
            const dealerSecondCard: Card = { ...deck[3], hidden: true as const };

            setCardValue([playerFirstCard, playerSecondCard]);
            setDealerCards([dealerFirstCard, dealerSecondCard]);
            setDeck(deck.slice(4));
            setIsTwoCardDrawn(true);
        }
    }, [deck]); // Notez que la dépendance est 'deck'

    const resetGame = useCallback(() => {
        setDeck(shuffleDeck(createDeck(totalDecks)));
        setCardValue(null);
        setDealerCards(null);
        setIsTwoCardDrawn(false);
        setGameResult(null);
        setIsGameLost(false);
    }, []);

    const handleDealerDraw = useCallback(() => {
        if (dealerCards) {
            const { newDealerCards, updatedDeck } = drawDealerCard(deck, dealerCards);
            setDealerCards(newDealerCards);
            setDeck(updatedDeck);
            
            const visibleDealerCards = newDealerCards.filter(card => !card.hidden);
            const dealerScore = calculateScore(visibleDealerCards);
            const playerScore = calculateScore(cardValue);
            
            const result = determineGameResult(playerScore, dealerScore, setIsGameLost);
            setGameResult(result);
        }
    }, [deck, dealerCards, cardValue]);

    const dealerScore = useMemo(() => {
        if (dealerCards) {
            const visibleDealerCards = dealerCards.filter(card => !card.hidden);
            return calculateScore(visibleDealerCards);
        }
        return 0;
    }, [dealerCards]);

    return (
        <>
            <Dealer dealerCards={dealerCards} dealerScore={dealerScore} />
            {gameResult && <p>{gameResult}</p>}
            {!gameResult ? (
                !isTwoCardDrawn ? (
                    <button onClick={drawCards}>Start the Game</button>
                ) : (
                    <PlayerControls
                        deck={deck}
                        cardValue={cardValue}
                        setCardValue={setCardValue}
                        setDeck={setDeck}
                        setIsGameLost={setIsGameLost}
                        DrawCardDealer={handleDealerDraw}
                        isGameLost={isGameLost}
                    />
                )
            ) : (
                <button onClick={resetGame}>Restart Game</button>
            )}
            <Player cardValue={cardValue} />
        </>
    );
};

export default Game;
