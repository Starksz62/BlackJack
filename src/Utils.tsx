import { Card} from './Components/Deck';

export const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let acesCount = 0;

    hand.forEach(card => {
        if (card.value === 'A') {
            acesCount++;
            score += 11;
        } else {
            score += card.valueCard;
        }
    });

    while (score > 21 && acesCount > 0) {
        score -= 10;
        acesCount--;
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
    

    while (dealerScore < 17 && updatedDeck.length > 0) {
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
    setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameDraw: React.Dispatch<React.SetStateAction<boolean>> 
): string => {
    console.log(`Total Player Value: ${playerScore}`);
    console.log(`Total Dealer Value: ${dealerScore}`);

    switch (true) {
        case playerScore > 21:
            setIsGameLost(true);
            return "Le joueur a perdu !";

        case dealerScore > 21:
            setIsGameWon(true);
            return "Le joueur a gagné !";

        case playerScore === dealerScore:
            setIsGameDraw(true);
            return "Égalité !";

        case dealerScore > playerScore:
            setIsGameLost(true);
            return "Le croupier a gagné !";

        case playerScore > dealerScore:
            setIsGameWon(true);
            return "Le joueur a gagné !";

        default:
            return "Erreur de logique !"; 
    }
};
