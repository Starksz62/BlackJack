import { Card } from "./Components/Deck";
import {calculateScore} from "./Utils";
interface PlayerProps {
    cardValue: Card[] | null;
}

const Player: React.FC<PlayerProps> = ({ cardValue }) => {

    const totalScorePlayer = cardValue !== null ? calculateScore(cardValue) : 0;
    
    return (
        <div>
            <h1>Player's Cards</h1>
            <h2>Total Score: {totalScorePlayer}</h2>
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
