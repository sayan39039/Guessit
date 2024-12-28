import Entry from './components/Entry';
import Guess from './components/Guess';
import Keyboard from './components/Keyboard';
import Loader from './components/Loader';
import Notfound from './components/Notfound';
import Start from './components/Start';
import { GuessContextProvider } from './context/Context';
import './styles.scss';

const App = () => {
  return (
    <GuessContextProvider>
      <div id="guessItWrap">
        <Start />
        <Loader />
        <Notfound />
        <Entry />
        <Guess />
        <Keyboard />
      </div>
    </GuessContextProvider>
  );
};

export default App;
