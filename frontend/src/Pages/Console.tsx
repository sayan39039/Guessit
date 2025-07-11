import { useContext, useState } from 'react';
import html2canvas from 'html2canvas';
import { GuessContext } from '../context/Context';
import Toast from '../components/Toast';
import { socket } from '../components/Socket';
import {
  COMPUTER,
  MAX_TRIES,
  NUMBERS,
  ROW1,
  ROW2,
  ROW3,
  SOCKET_MESSAGE_TYPE,
  UNDERSCORE,
  VOWELS,
} from '../context/Constants';

const RenderGuessName: Function = (props: {
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

const RenderUsedLetters: Function = () => {
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

const RenderLetterRow: Function = (props: { letters: string[] }) => {
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
    userName,
    gameplayData,
  } = useContext(GuessContext);
  const letterClickHandler = (L: string) => {
    const response = {
      name: userName,
      type: SOCKET_MESSAGE_TYPE.GUESSED,
      guessedLetter: L,
    };
    socket.emit('user-action', response);
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
    const clickedBy = gameplayData.filter(
      (el: any) => el?.guessedLetter === letter
    )[0]?.name;
    const clickedByColor = gameplayData.filter(
      (el: any) =>
        el?.name === clickedBy && el?.type === SOCKET_MESSAGE_TYPE.JOINED
    )[0]?.color;
    return (
      <button
        id={clickedBy}
        key={index}
        className={`custom-btn ${(isDisabled || gameWon) && 'disabled'}`}
        onClick={() => {
          !isDisabled && !gameWon && letterClickHandler(letter);
        }}
      >
        {clickedBy && (
          <div
            className="name-indicator"
            style={{ backgroundColor: clickedByColor }}
            title={clickedBy}
          ></div>
        )}
        {letter}
      </button>
    );
  });
  return <div className="btn-rows">{returnElement}</div>;
};

const Guess = () => {
  const { numberOfTries, gameType } = useContext(GuessContext);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
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
  );
};

const Keyboard = () => {
  const reload_window = () => {
    window.location.reload();
  };
  const take_screenshot = async () => {
    const element = document.getElementById('guessItWrap');
    const canvas = await html2canvas(element as HTMLElement);
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob as any,
          }),
        ]);
        Toast('Screenshot taken, now go away');
      } catch (e) {
        Toast('Failed to copy screenshot to clipboard');
      }
    });
  };

  return (
    <div className="keyboard-wrap">
      <RenderLetterRow letters={NUMBERS} />
      <RenderLetterRow letters={ROW1} />
      <RenderLetterRow letters={ROW2} />
      <RenderLetterRow letters={ROW3} />
      <button
        className="absolute-btn refresh"
        onClick={reload_window}
        title="Reload window"
      >
        ↻
      </button>
      <button
        className="absolute-btn screenshot"
        onClick={take_screenshot}
        title="Take screenshot"
      >
        ⎙
      </button>
    </div>
  );
};

const Console = () => {
  return (
    <>
      <Guess />
      <Keyboard />
    </>
  );
};

export default Console;
