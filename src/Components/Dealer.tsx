import { Card } from "./Deck";

interface DealerProps {
    dealerCards: Card[] | null;
    drawCard: () => void;
}

const Dealer: React.FC<DealerProps> = ({ dealerCards }) => {
    return (
        <div>
          <h1>Cartes du croupier</h1>
          {dealerCards ? (
            dealerCards.map((card, index) => (
              <div key={index}>
                {card.hidden ? (
                  <p>Carte cachée</p>
                ) : (
                  <p>Carte : {card.suit} {card.value}</p>
                )}
              </div>
            ))
          ) : (
            <p>Pas encore de cartes distribuées pour le croupier</p>
          )}
        </div>
    );
}

export default Dealer;
