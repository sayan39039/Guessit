import { useContext, useState } from 'react';
import { GuessContext } from '../context/Context';
import { COLLEAGUE } from '../context/Constants';

const Entry = () => {
  const { guessName, setGuessName, gameType } = useContext(GuessContext);
  const [inputValue, setInputValue] = useState('');
  const arrowClickHandler = async () => {
    setGuessName(inputValue);
  };
  console.log(gameType);
  const inputClickHandler = (e: any) => {
    if (e.keyCode === 13) arrowClickHandler();
  };
  return gameType === COLLEAGUE ? (
    guessName ? null : (
      <div className="entry-wrap">
        <div className="input-wrap">
          <input
            type="text"
            className="input"
            placeholder="Enter name"
            autoFocus
            value={inputValue}
            onKeyDown={inputClickHandler}
            onChange={(e) => {
              setInputValue(
                e.target.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase()
              );
            }}
          />
          <button className="arrow" onClick={arrowClickHandler}>
            →
          </button>
        </div>
      </div>
    )
  ) : null;
};

export default Entry;
