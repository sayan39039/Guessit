import Entry from './components/Entry';
import Guess from './components/Guess';
import Keyboard from './components/Keyboard';
import Loader from './components/Loader';
import Start from './components/Start';
import { GuessContextProvider } from './context/Context';
import './styles.scss';

const App = () => {
  return (
    <GuessContextProvider>
      <div>
        <Start />
        <Loader />
        <Entry />
        <Guess />
        <Keyboard />
      </div>
    </GuessContextProvider>
  );
};

export default App;
