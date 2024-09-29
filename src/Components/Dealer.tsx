import { Card } from "./Deck";

interface DealerProps {
    dealerCards: Card[] | null;
    dealerScore: number;
}

const Dealer: React.FC<DealerProps> = ({ dealerCards, dealerScore }) => {


  if (dealerCards) {
      dealerCards.forEach((card) => {
          if (card.hidden) {
              console.log(` ${card.value}`);
          } else {
              console.log(` ${card.suit} ${card.value}`);
          }
      });
  }


    return (
        <div>
          <h1>Cartes du croupier</h1>
          <p>{dealerScore}</p>
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
