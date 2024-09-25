import { Card, createDeck, shuffleDeck } from './Components/Deck';
import { useState } from 'react'


const App: React.FC = () => {
  const totalDecks = 7
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck(totalDecks)))
  const initialDeck = createDeck(totalDecks);
  const DrawCard = () => {
    if (deck.length > initialDeck.length / 2) {
      const card = deck[0];
      console.log(card.suit, card.value, card.valueCard, deck.length,)
      setDeck(deck.slice(1))
    } else {
      const newDeck = shuffleDeck(createDeck(totalDecks));
      setDeck(newDeck);
      console.log("Deck shuffled!");
    }
  }

  return (
    <>
      <button onClick={DrawCard}>Button</button>
    </>
  )
}
export default App
