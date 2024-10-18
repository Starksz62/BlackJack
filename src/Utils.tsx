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
    playerScores: number[],
    dealerScore: number,
    setIsGameLost: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGameDraw: React.Dispatch<React.SetStateAction<boolean>>
): string => {
    let hasLost = false;
    let hasWon = false;
    let hasDraw = false;

    playerScores.forEach(playerScore => {
        if (playerScore > 21) {
            hasLost = true;
        } else if (dealerScore > 21) {
            hasWon = true;
            setIsGameWon(true);
        } else if (playerScore === dealerScore) {
            hasDraw = true;
        } else if (playerScore > dealerScore) {
            hasWon = true;
            setIsGameWon(true);
        } else {
            hasLost = true;
        }
    });

    if (hasLost) {
        setIsGameLost(true);
    }
    if (hasDraw) {
        setIsGameDraw(true);
    }

    if (hasLost && hasWon) {
        return "Résultat mixte : Le joueur a gagné une main mais perdu une autre.";
    }
    if (hasLost) {
        return "Le joueur a perdu !";
    }
    if (hasWon) {
        return "Le joueur a gagné !";
    }
    if (hasDraw) {
        return "Égalité !";
    }

    return "Erreur de logique !";
};
