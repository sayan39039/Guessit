import { useEffect } from 'react';
import Entry from './Pages/Entry';
import Console from './Pages/Console';
import Notfound from './Pages/Notfound';
import Start from './Pages/Start';
import Username from './Pages/Username';
import Visibility from './components/Visibility';
import { GuessContextProvider } from './context/Context';
import { socket } from './components/Socket';
import './styles.scss';
import Namechips from './components/Namechips';

const App = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      socket.disconnect();
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const GAME_ELEMENTS = [
    <Start key="start" />,
    <Username key="username" />,
    <Notfound key="notfound" />,
    <Entry key="entry" />,
    <Console key="console" />,
  ];
  return (
    <GuessContextProvider>
      <Namechips />
      <div id="guessItWrap">
        {GAME_ELEMENTS.map((element, index) => (
          <Visibility key={index}>{element}</Visibility>
        ))}
      </div>
    </GuessContextProvider>
  );
};

export default App;
