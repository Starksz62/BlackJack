import { createContext, useContext, useState } from 'react';
import { Card } from '../Components/Deck';

interface SplitCardsContextType {
    splitCards: Card[][] | null;
    setSplitCards: (cards: Card[][] | null) => void;
    activeHand: number;
    setActiveHand: (handIndex: number) => void;
}

const SplitCardsContext = createContext<SplitCardsContextType | undefined>(undefined);

export const useSplitCards = () => {
    const context = useContext(SplitCardsContext);
    if (!context) {
        throw new Error("useSplitCards must be used within a SplitCardsProvider");
    }
    return context;
};

export const SplitCardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [splitCards, setSplitCards] = useState<Card[][] | null>(null);
    const [activeHand, setActiveHand] = useState<number>(0);

    return (
        <SplitCardsContext.Provider value={{ splitCards, setSplitCards, activeHand, setActiveHand }}>
            {children}
        </SplitCardsContext.Provider>
    );
};