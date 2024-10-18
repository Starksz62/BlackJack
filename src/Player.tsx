import { Card } from "./Components/Deck";
import { calculateScore } from "./Utils";
import { useSplitCards } from "./Context/SplitContext";

interface PlayerProps {
    cardValue: Card[] | null;
}

const Player: React.FC<PlayerProps> = ({ cardValue }) => {
    const { splitCards } = useSplitCards();

    const totalScorePlayer = cardValue && (!splitCards || splitCards.length === 0)
        ? calculateScore(cardValue)
        : null;

    return (
        <div>
            <h1>Player's Cards</h1>
            {cardValue && cardValue.length > 0 && (!splitCards || splitCards.length === 0) && (
                <>
                    {totalScorePlayer !== null && (
                        <h2>Total Score: {totalScorePlayer}</h2>
                    )}
                    {cardValue.map((card, index) => (
                        <div key={index}>
                            <p>{card.suit} {card.value}</p>
                        </div>
                    ))}
                </>
            )}

            {splitCards && splitCards.length > 0 && (
                <div>
                    {splitCards.map((hand, index) => {
                        const handScore = calculateScore(hand);
                        return (
                            <div key={index}>
                                <h3>Hand {index + 1}</h3>
                                <h4>Total Score: {handScore}</h4>
                                {hand.map((card, cardIndex) => (
                                    <div key={cardIndex}>
                                        <p>{card.suit} {card.value}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Player;
