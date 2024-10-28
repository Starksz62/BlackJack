import React, { useState, useCallback } from 'react';
import { drawDealerCard, calculateScore, determineGameResult, isBlackjack } from '../Utils';
import { useSplitCards } from "../Context/SplitContext";
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
    const [isGameWon, setIsGameWon] = useState<boolean>(false);
    const [isGameDraw, setIsGameDraw] = useState<boolean>(false);
    const [gameResult, setGameResult] = useState<string | null>(null);
    const initialDeck = createDeck(totalDecks);


    const { splitCards } = useSplitCards(); 
    const drawCards = useCallback( () => {
        if (deck.length > deck.length / 2) {
            const playerFirstCard = deck[0];
            const playerSecondCard = deck[1];
            const dealerFirstCard = deck[2];
            const dealerSecondCard: Card = { ...deck[3], hidden: true as const };
    
            const initialPlayerCards = [playerFirstCard, playerSecondCard];
            const initialDealerCards = [dealerFirstCard, dealerSecondCard];
    
            setCardValue(initialPlayerCards);
            setDealerCards(initialDealerCards);
            setDeck(deck.slice(4));
            setIsTwoCardDrawn(true);
    
            if (isBlackjack(initialPlayerCards)) {
                setDealerCards([dealerFirstCard, { ...dealerSecondCard, hidden: false }]);
    
                if (isBlackjack([dealerFirstCard, dealerSecondCard])) {
                    setIsGameDraw(true);
                    setGameResult("draw");
                    console.log("Both player and dealer have blackjack! It's a draw.");
                } else {
                    setIsGameWon(true);
                    setGameResult("Blackjack");
                    console.log("Player has blackjack! Player wins.");
                }
            }
    
    
            console.log("Player's cards:", initialPlayerCards);
            console.log("Dealer's cards:", initialDealerCards);
        }
    }, [deck]);

    const resetGame = useCallback(() => {
        const newDeck = shuffleDeck([...initialDeck]);
        setDeck(newDeck); 
        setCardValue(null);
        setDealerCards(null);
        setIsTwoCardDrawn(false);
        setGameResult(null);
        setIsGameLost(false);
        setIsGameWon(false);
        setIsGameDraw(false);
    }, [initialDeck]);

    const handleDealerDraw = useCallback(() => {
        if (dealerCards) {
            setDeck((prevDeck) => {
                const { newDealerCards, updatedDeck } = drawDealerCard(prevDeck, dealerCards);
                setDealerCards(newDealerCards);
    
                const visibleDealerCards = newDealerCards.filter(card => !card.hidden);
                const dealerScore = calculateScore(visibleDealerCards);
                
                console.log("Dealer's Cards:", newDealerCards);
                console.log("Dealer Score:", dealerScore);
                
                if (isBlackjack(newDealerCards)) {
                    setIsGameLost(true);
                    setGameResult("Blackjack du croupier !");
                    return updatedDeck; 
                }
    
                const playerScores = splitCards
                ? splitCards.map((hand) => calculateScore(hand))
                : [cardValue ? calculateScore(cardValue) : 0];
              
              const results = playerScores.map((playerScore, index) => {
                if (cardValue && dealerCards) {
                  const result = determineGameResult(
                    [playerScore],    
                    dealerScore,          
                    splitCards || [cardValue], 
                    dealerCards,         
                    setIsGameLost,      
                    setIsGameWon,          
                    setIsGameDraw         
                  );
                  
                  return `Main ${index + 1}: ${result.join(" | ")}`;
                } else {
                  console.error("Les cartes du joueur ou du croupier sont null");
                  return `Main ${index + 1}: Erreur - Cartes manquantes !`;
                }
              });
              
              console.log(results);
              setGameResult(results.join(" | "));
              return updatedDeck;
            });
        }
    }, [dealerCards, cardValue, splitCards]);
    
    return (
        <>
            <Dealer dealerCards={dealerCards} dealerScore={dealerCards ? calculateScore(dealerCards.filter(card => !card.hidden)) : 0} />
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
                        isGameWon={isGameWon}
                        isGameDraw={isGameDraw}
                        dealerScore={dealerCards ? calculateScore(dealerCards.filter(card => !card.hidden)) : 0} 
                        resetGame={resetGame}
                        
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
