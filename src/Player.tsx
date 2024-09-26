import { Card } from "./Components/Deck";

interface PlayerProps {
    cardValue: Card[] | null;
}

const Player: React.FC<PlayerProps> = ({ cardValue }) => {
    const calculateTotal = (cards: Card[] | null): number => {
        if (!cards) return 0;

        let score = 0;
        let aceCount = 0;

        cards.forEach(card => {
            if (card.value === 'A') {
                score += 11; 
                aceCount++;
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value); 
            }
        });

        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }

        return score;
    };

    const totalScore = calculateTotal(cardValue); 

    return (
        <div>
            <h1>Player's Cards</h1>
            <h2>Total Score: {totalScore}</h2>
            {cardValue ? (
                cardValue.map((card, index) => (
                    <div key={index}>
                        <p>{card.suit} {card.value}</p>
                    </div>
                ))
            ) : (
                <p>No cards drawn</p>
            )}
        </div>
    );
};

export default Player;
