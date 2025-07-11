import { ReactNode, createContext, useState } from 'react';
import { socket } from '../components/Socket';
import { CLEAN_HOUSE_API_URL } from './Constants';

interface Props {
  children?: ReactNode;
}

interface ContextProps {
  guessName: string | null;
  usedLetters: any[];
  usedCorrectLetters: any[];
  numberOfTries: number;
  gameWon: boolean;
  gameType: string | null;
  randomDetails: any;
  isNotFound: boolean;
  isUsernamePageVisible: boolean;
  isSocketConnected: boolean;
  userName: string | null;
  gameplayData: any;
  setGuessName: Function;
  setUsedLetters: Function;
  setUsedCorrectLetters: Function;
  setNumberOfTries: Function;
  setGameWon: Function;
  setGameType: Function;
  setRandomDetails: Function;
  setIsNotFound: Function;
  setIsUsernamePageVisible: Function;
  setIsSocketConnected: Function;
  setUserName: Function;
  setGameplayData: Function;
  cleanHouse: Function;
}

export const GuessContext = createContext({} as ContextProps);

export const GuessContextProvider = ({ children }: Props) => {
  const [guessName, setGuessName] = useState(null);
  const [usedLetters, setUsedLetters] = useState([]);
  const [usedCorrectLetters, setUsedCorrectLetters] = useState([]);
  const [numberOfTries, setNumberOfTries] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameType, setGameType] = useState(null);
  const [randomDetails, setRandomDetails] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isUsernamePageVisible, setIsUsernamePageVisible] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [gameplayData, setGameplayData] = useState<any>([]);

  const cleanHouse = async () => {
    try {
      const currentData = await fetch(CLEAN_HOUSE_API_URL)
        .then((r) => r.json())
        .then((r) => r);
      console.log(currentData);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };
  const returnValues = {
    guessName,
    usedLetters,
    usedCorrectLetters,
    numberOfTries,
    gameWon,
    gameType,
    randomDetails,
    isNotFound,
    isUsernamePageVisible,
    isSocketConnected,
    userName,
    gameplayData,
    setGuessName,
    setUsedLetters,
    setUsedCorrectLetters,
    setNumberOfTries,
    setGameWon,
    setGameType,
    setRandomDetails,
    setIsNotFound,
    setIsUsernamePageVisible,
    setIsSocketConnected,
    setUserName,
    setGameplayData,
    cleanHouse,
  };

  socket.on('connect', () => {
    setIsSocketConnected(true);
  });
  socket.on('user-action-list', (data: any[]) => {
    setGameplayData([...data]);
  });

  return (
    <GuessContext.Provider value={returnValues}>
      {children}
    </GuessContext.Provider>
  );
};
