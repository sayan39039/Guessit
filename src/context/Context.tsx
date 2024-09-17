import { ReactNode, createContext, useState } from 'react';

interface Props {
  children?: ReactNode;
}

interface ContextProps {
  guessName: String | null;
  usedLetters: String[] | any[];
  usedCorrectLetters: String[] | any[];
  numberOfTries: number;
  gameWon: Boolean;
  gameType: String | null;
  randomDetails: any;
  setGuessName: Function;
  setUsedLetters: Function;
  setUsedCorrectLetters: Function;
  setNumberOfTries: Function;
  setGameWon: Function;
  setGameType: Function;
  setRandomDetails: Function;
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
  const returnValues = {
    guessName,
    usedLetters,
    usedCorrectLetters,
    numberOfTries,
    gameWon,
    gameType,
    randomDetails,
    setGuessName,
    setUsedLetters,
    setUsedCorrectLetters,
    setNumberOfTries,
    setGameWon,
    setGameType,
    setRandomDetails,
  };
  return (
    <GuessContext.Provider value={returnValues}>
      {children}
    </GuessContext.Provider>
  );
};
