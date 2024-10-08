import { useContext } from 'react';
import { GuessContext } from '../context/Context';
import {
  MAX_TRIES,
  NUMBERS,
  ROW1,
  ROW2,
  ROW3,
  VOWELS,
} from '../context/Constants';

const RenderLetterRow = (props: { letters: string[] }) => {
  const { letters } = props;
  const {
    usedLetters,
    setUsedLetters,
    gameWon,
    guessName,
    usedCorrectLetters,
    setUsedCorrectLetters,
    numberOfTries,
    setNumberOfTries,
  } = useContext(GuessContext);
  const letterClickHandler = (L: string) => {
    if (guessName?.includes(L))
      setUsedCorrectLetters([L, ...usedCorrectLetters]);
    else {
      setUsedLetters([L, ...usedLetters]);
      setNumberOfTries(numberOfTries + 1);
    }
  };
  const returnElement = letters.map((letter, index) => {
    const isDisabled =
      usedCorrectLetters.includes(letter) ||
      usedLetters.includes(letter) ||
      VOWELS.includes(letter) ||
      numberOfTries === MAX_TRIES;
    return (
      <button
        key={index}
        className={`custom-btn ${(isDisabled || gameWon) && 'disabled'}`}
        onClick={() => {
          !isDisabled && !gameWon && letterClickHandler(letter);
        }}
      >
        {letter}
      </button>
    );
  });
  return <div className="btn-rows">{returnElement}</div>;
};

const Keyboard = () => {
  const { guessName } = useContext(GuessContext);

  const reload_window = () => {
    window.location.reload();
  };

  return guessName ? (
    <div className="keyboard-wrap">
      <RenderLetterRow letters={NUMBERS} />
      <RenderLetterRow letters={ROW1} />
      <RenderLetterRow letters={ROW2} />
      <RenderLetterRow letters={ROW3} />
      <button className="refresh" onClick={reload_window}>
        ↻
      </button>
    </div>
  ) : null;
};
export default Keyboard;
