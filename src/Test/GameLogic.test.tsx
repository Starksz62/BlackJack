// gameUtils.test.ts
import { Card } from '../Components/Deck';
import { determineGameResult, calculateScore } from '../Utils';

describe('Blackjack Game Logic', () => {
    
    describe('determineGameResult', () => {
     
        const setIsGameLost = jest.fn();
        const setIsGameWon = jest.fn();
        const setIsGameDraw = jest.fn();
        
        beforeEach(() => {
            jest.clearAllMocks();
        });


        it('should declare the player as the winner if their score is greater than the dealer\'s', () => {
            const playerScore = 20;
            const dealerScore = 18;
            determineGameResult(playerScore, dealerScore, setIsGameLost, setIsGameWon, setIsGameDraw);
            expect(setIsGameLost).not.toHaveBeenCalled();
            expect(setIsGameDraw).not.toHaveBeenCalled();
            expect(setIsGameWon).toHaveBeenCalledWith(true); 
        });

        it('should declare the dealer as the winner if their score is greater than the player\'s', () => {
            const playerScore = 18;
            const dealerScore = 20;
            determineGameResult(playerScore, dealerScore, setIsGameLost, setIsGameWon, setIsGameDraw);            
            expect(setIsGameWon).not.toHaveBeenCalled(); 
            expect(setIsGameDraw).not.toHaveBeenCalled();
            expect(setIsGameLost).toHaveBeenCalledWith(true); 
        });

        it('should declare a tie if the scores are equal', () => {
            const playerScore = 20;
            const dealerScore = 20;
            determineGameResult(playerScore, dealerScore, setIsGameLost, setIsGameWon, setIsGameDraw);
            expect(setIsGameWon).not.toHaveBeenCalled(); 
            expect(setIsGameLost).not.toHaveBeenCalled();            
            expect(setIsGameDraw).toHaveBeenCalledWith(true); 
        });

        it('should call setIsGameLost when the player busts', () => {
            const playerScore = 22;
            const dealerScore = 18;
            determineGameResult(playerScore, dealerScore, setIsGameLost, setIsGameWon, setIsGameDraw);            
            expect(setIsGameLost).toHaveBeenCalledWith(true);
            expect(setIsGameDraw).not.toHaveBeenCalled();
            expect(setIsGameWon).not.toHaveBeenCalled();
        });

        it('should declare the player as the winner if the dealer busts (over 21)', () => {
            const playerScore = 20;
            const dealerScore = 22;
            determineGameResult(playerScore, dealerScore, setIsGameLost, setIsGameWon, setIsGameDraw);            
            expect(setIsGameWon).toHaveBeenCalledWith(true);
            expect(setIsGameDraw).not.toHaveBeenCalled();
            expect(setIsGameLost).not.toHaveBeenCalled();
        });
    });

    describe('calculateScore', () => {
        it('should calculate the correct score for a hand without Aces', () => {
            const hand: Card[] = [
                { value: '10', suit: 'Hearts', hidden: false, valueCard: 10 },
                { value: '5', suit: 'Clubs', hidden: false, valueCard: 5 }
            ];
            expect(calculateScore(hand)).toBe(15);
        });
    
        it('should handle an ace as 11 if it does not bust the score', () => {
            const hand: Card[] = [
                { value: '10', suit: 'Hearts', hidden: false, valueCard: 10 },
                { value: '5', suit: 'Clubs', hidden: false, valueCard: 5 },
                { value: 'A', suit: 'Spades', hidden: false, valueCard: 11 }
            ];
            expect(calculateScore(hand)).toBe(16);
        });
    
        it('should handle an ace as 1 if it busts the score', () => {
            const hand: Card[] = [
                { value: '10', suit: 'Hearts', hidden: false, valueCard: 10 },
                { value: '9', suit: 'Clubs', hidden: false, valueCard: 9 },
                { value: 'A', suit: 'Spades', hidden: false, valueCard: 1 }
            ];
            expect(calculateScore(hand)).toBe(20);
        });
    
        it('should handle multiple aces correctly', () => {
            const hand: Card[] = [
                { value: 'A', suit: 'Hearts', hidden: false, valueCard: 11 },
                { value: 'A', suit: 'Clubs', hidden: false, valueCard: 11 },
                { value: '9', suit: 'Spades', hidden: false, valueCard: 9 }
            ];
            expect(calculateScore(hand)).toBe(21); 
        });
    
        it('should handle multiple aces and avoid busting', () => {
            const hand: Card[] = [
                { value: 'A', suit: 'Hearts', hidden: false, valueCard: 11 },
                { value: 'A', suit: 'Clubs', hidden: false, valueCard: 11 },
                { value: '8', suit: 'Spades', hidden: false, valueCard: 8 }
            ];
            expect(calculateScore(hand)).toBe(20);
        });
    });
});
    