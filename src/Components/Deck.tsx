export interface Card {
    hidden: boolean;
    suit: 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
    value: string;
    valueCard: number;
  }

  export type Deck = Card[];

  export const createDeck = (numberOfDecks:number): Deck => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'] as const;
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const singleDeck: Deck = suits.flatMap(suit => 
values.map((value, index) => ({
  suit,
  value,
  valueCard: value === 'A' ? 11 : (value === 'K' || value === 'Q' || value === 'J' ? 10 : index + 2),
  hidden: false,
})))
const MultipleDecks: Deck = Array.from({ length: numberOfDecks }).flatMap(() => singleDeck)
    return MultipleDecks;
  }
  export const shuffleDeck = (deck: Deck): Deck => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}
