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
    name && window.open(`http://google.com/search?q=${name} movie`);
  };
  let UNDERSCORE_COUNTER =
    0 -
    ((guessName as string)?.length -
      (guessName as string)?.replace(/\s/g, '').length);
  const renderDetail = (label: string, value: React.ReactNode) =>
    value ? (
      <div>
        <strong>{label}: </strong>
        {value}
      </div>
    ) : null;

  const returnRandomDetailsElement = (
    <div className="random-details-wrap">
      {numberOfTries === MAX_TRIES &&
        randomDetails?.title &&
        renderDetail(
          'Movie',
          <span
            className="name_display"
            role="button"
            onClick={() => searchGoogle(randomDetails.title)}
          >
            {randomDetails.title}
          </span>
        )}
      {renderDetail(
        'Release Year',
        randomDetails?.released_on?.substring(0, 4)
      )}
      {renderDetail('Tagline', randomDetails?.tagline)}
      {renderDetail('Runtime', `${randomDetails?.runtime} minutes`)}
      {renderDetail('IMDB rating', randomDetails?.imdb_rating)}
      {renderDetail('Sources', randomDetails?.sources?.[0])}
      {renderDetail('Genre', randomDetails?.genres?.join(', '))}

      <button
        className="close"
        onClick={() => props.infoVisibility.setIsInfoVisible(false)}
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
        onClick={() => {
          gameWon && searchGoogle(guessName as string);
        }}
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
