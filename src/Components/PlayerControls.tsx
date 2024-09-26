import React from 'react';
import { Card } from './Deck';

interface PlayerControlsProps {
    drawCard: () => void;
    stay: () => void;
    split: () => void;
    double: () => void;
    cardValue: Card[] | null;
    isGameLost: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
    drawCard,
    stay,
    split,
    double,
    isGameLost,
}) => {
    return (
        <div>
            <button onClick={drawCard} disabled={isGameLost}>Draw Card</button>
            <button onClick={stay} disabled={isGameLost}>Stay</button>
            <button onClick={split} disabled={isGameLost}>Split</button>
            <button onClick={double} disabled={isGameLost}>Double</button>
        </div>
    );
};

export default PlayerControls;
