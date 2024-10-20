import React, { useMemo } from "react";
import { Card } from "./Deck";

interface DealerProps {
    dealerCards: Card[] | null;
    dealerScore: number;
}

const Dealer: React.FC<DealerProps> = ({ dealerCards, dealerScore }) => {

    const renderedDealerCards = useMemo(() => {
        if (!dealerCards) return null;

        return dealerCards.map((card, index) => (
            <div key={index}>
                {card.hidden ? (
                    <p>Carte cachée</p>
                ) : (
                    <p>Carte : {card.suit} {card.value}</p>
                )}
            </div>
        ));
    }, [dealerCards]);

    return (
        <div>
            <h1>Cartes du croupier</h1>
            <p>{dealerScore}</p>
            {renderedDealerCards || <p>Pas encore de cartes distribuées pour le croupier</p>}
        </div>
    );
}

export default React.memo(Dealer);
