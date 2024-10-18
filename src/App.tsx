import Game from './Components/Game';
import { SplitCardsProvider } from './Context/SplitContext';
const App = () => {
    return (
        <SplitCardsProvider>
        <div>
            <h1>Blackjack Game</h1>
            <Game />
        </div>
        </SplitCardsProvider>
    );
};

export default App;
