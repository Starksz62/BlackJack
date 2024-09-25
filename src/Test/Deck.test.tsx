import { createDeck, shuffleDeck } from '../Components/Deck';

describe('Deck functionality', () => {
    test('should create a deck with 52 cards', () => {
        const deck = createDeck(1);
        expect(deck.length).toBe(52);
    });
    test('should shuffle the deck', () => {        
        const originalDeck = createDeck(1);
        const shuffledDeck = shuffleDeck([...originalDeck]);
        expect(shuffledDeck).not.toEqual(originalDeck); 
        expect(shuffledDeck.length).toBe(originalDeck.length); 
    });
    test('drawing a card should remove the card from the deck', () => {
        const originalDeck = createDeck(1);
        const shuffledDeck = shuffleDeck([...originalDeck]);
        const drawnCard = shuffledDeck[0];
        const newDeck = shuffledDeck.slice(1);

        expect(newDeck).not.toContain(drawnCard);

        expect(newDeck.length).toBe(shuffledDeck.length - 1);
    });
})