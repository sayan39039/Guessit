import { ReactNode, createContext, useState } from 'react';

interface Props {
  children?: ReactNode;
}

interface ContextProps {
  guessName: string | null;
  usedLetters: string[] | any[];
  usedCorrectLetters: string[] | any[];
  numberOfTries: number;
  gameWon: boolean;
  gameType: string | null;
  randomDetails: any;
  isNotFound: boolean;
  setGuessName: Function;
  setUsedLetters: Function;
  setUsedCorrectLetters: Function;
  setNumberOfTries: Function;
  setGameWon: Function;
  setGameType: Function;
  setRandomDetails: Function;
  setIsNotFound: Function;
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
  const returnValues = {
    guessName,
    usedLetters,
    usedCorrectLetters,
    numberOfTries,
    gameWon,
    gameType,
    randomDetails,
    isNotFound,
    setGuessName,
    setUsedLetters,
    setUsedCorrectLetters,
    setNumberOfTries,
    setGameWon,
    setGameType,
    setRandomDetails,
    setIsNotFound,
  };
  return (
    <GuessContext.Provider value={returnValues}>
      {children}
    </GuessContext.Provider>
  );
};
