import { Card} from './Components/Deck';

export const calculateScore = (cards: Card[] | null): number => {
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
export const drawDealerCard = (deck: Card[], dealerCards: Card[]): { newDealerCards: Card[], updatedDeck: Card[] } => {
    const newDealerCards = [...dealerCards];

    if (newDealerCards[1]) {
        newDealerCards[1] = { ...newDealerCards[1], hidden: false };
    }

    let updatedDeck = [...deck];
    
    let dealerScore = calculateScore(newDealerCards.filter(card => !card.hidden));
    

    while (dealerScore <= 17 && updatedDeck.length > 0) {
        const drawnCard = updatedDeck[0]; 
        newDealerCards.push(drawnCard);
        dealerScore = calculateScore(newDealerCards.filter(card => !card.hidden)); 
        

        if (dealerScore > 21) {
            break; 
        }
        
        updatedDeck = updatedDeck.slice(1);
    }

    return { newDealerCards, updatedDeck };
};


export const determineGameResult = (
    playerScore: number,
    dealerScore: number,
    setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>
): string => {
    console.log(`Total Player Value: ${playerScore}`);
    console.log(`Total Dealer Value: ${dealerScore}`);

    if (playerScore > 21) {
        setIsGameLost(true);
        return "Le joueur a perdu !";
    }

    switch (true) {
        case dealerScore > 21:
            return "Le joueur a gagné !";
        case dealerScore > playerScore:
            setIsGameLost(true);
            return "Le croupier a gagné !";
        case playerScore > dealerScore:
            return "Le joueur a gagné !";
        case dealerScore === playerScore:
            return "Égalité !";
            default:
                return "Erreur inattendue !";
        
    }
};
