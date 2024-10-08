import { useContext, useState } from 'react';
import { GuessContext } from '../context/Context';
import { COMPUTER, MAX_TRIES, UNDERSCORE, VOWELS } from '../context/Constants';

const RenderGuessName: any = (props: {
  infoVisibility: { isInfoVisible: boolean; setIsInfoVisible: Function };
}) => {
  const {
    guessName,
    gameWon,
    setGameWon,
    usedCorrectLetters,
    numberOfTries,
    randomDetails,
  } = useContext(GuessContext);
  const guess_name_ARRAY = guessName?.split('');
  const searchGoogle = (name: string) => {
    window.open(`http://google.com/search?q=${name} movie`);
  };
  let UNDERSCORE_COUNTER =
    0 -
    ((guessName as string)?.length -
      (guessName as string)?.replace(/\s/g, '').length);
  const returnRandomDetailsElement = (
    <div className="random-details-wrap">
      {numberOfTries === MAX_TRIES && randomDetails?.title && (
        <div>
          <strong>Movie: </strong>
          <span
            className="name_display"
            role="button"
            onClick={() => {
              searchGoogle(randomDetails?.title);
            }}
          >
            {randomDetails?.title}
          </span>
        </div>
      )}
      {randomDetails?.released_on && (
        <div>
          <strong>Release Year: </strong>
          {randomDetails?.released_on?.substring(0, 4)}
        </div>
      )}
      {randomDetails?.tagline && (
        <div>
          <strong>Tagline: </strong>
          {randomDetails?.tagline}
        </div>
      )}
      {randomDetails?.runtime && (
        <div>
          <strong>Runtime: </strong>
          {randomDetails?.runtime} minutes
        </div>
      )}
      {randomDetails?.imdb_rating && (
        <div>
          <strong>IMDB rating: </strong>
          {randomDetails?.imdb_rating}
        </div>
      )}
      {randomDetails?.sources && (
        <div>
          <strong>Sources: </strong>
          {randomDetails?.sources[0]}
        </div>
      )}
      {randomDetails?.genres && (
        <div>
          <strong>Genre: </strong>
          {randomDetails?.genres?.join(', ')}
        </div>
      )}
      <button
        className="close"
        onClick={() => {
          props.infoVisibility.setIsInfoVisible(false);
        }}
      >
        ✕
      </button>
    </div>
  );
  const returnElement = (guess_name_ARRAY as string[]).map((letter, index) => {
    const letterDecider =
      VOWELS.includes(letter) || usedCorrectLetters.includes(letter)
        ? letter
        : UNDERSCORE;
    letterDecider === UNDERSCORE && UNDERSCORE_COUNTER++;
    return (
      <div
        key={index}
        className={`guess-letter ${letter === ' ' && 'gap'} ${
          gameWon && 'won'
        } ${numberOfTries === MAX_TRIES && 'lost'}`}
      >
        {letter === ' ' ? <>&nbsp;</> : letterDecider}
      </div>
    );
  });
  if (UNDERSCORE_COUNTER === 0) setGameWon(true);

  return props.infoVisibility.isInfoVisible
    ? returnRandomDetailsElement
    : returnElement;
};

const RenderUsedLetters: any = () => {
  const { usedLetters } = useContext(GuessContext);
  const returnElements = usedLetters.map((letter, index) => {
    return (
      <div className="used-letter" key={index}>
        {letter}
      </div>
    );
  });
  return returnElements;
};

const Guess = () => {
  const { guessName, numberOfTries, gameType } = useContext(GuessContext);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return guessName ? (
    <div className="guess-wrap">
      <div className="guess">
        <RenderGuessName infoVisibility={{ isInfoVisible, setIsInfoVisible }} />
        {gameType === COMPUTER && !isInfoVisible && (
          <button
            className="info"
            onClick={() => {
              setIsInfoVisible(true);
            }}
          >
            ⓘ
          </button>
        )}
      </div>
      <div className="wrong">
        <RenderUsedLetters />
        <div className="tries-indicator">
          Guess(es) left: {MAX_TRIES - numberOfTries}
        </div>
      </div>
    </div>
  ) : null;
};
export default Guess;
