import { useContext } from 'react';
import { GuessContext } from '../context/Context';
import { API_URL, COLLEAGUE, COMPUTER } from '../context/Constants';

const Start = () => {
  const { gameType, setGuessName, setGameType, setRandomDetails } =
    useContext(GuessContext);
  const apiCall = async () => {
    const fullDetails = await fetch(API_URL)
      .then((r) => r.json())
      .then((r) => r);
    const name = fullDetails.title.toUpperCase().replace(/[^a-zA-Z0-9 ]/g, '');
    setGuessName(name);
    setRandomDetails(fullDetails);
  };
  const gameTypeHandler = (type: String) => {
    setGameType(type);
    type === 'COMPUTER' && apiCall();
  };
  return gameType ? null : (
    <div className="start-wrap">
      <button
        className="start-btns"
        onClick={() => {
          gameTypeHandler(COLLEAGUE);
        }}
      >
        Play with Colleagues
      </button>
      <button
        className="start-btns"
        onClick={() => {
          gameTypeHandler(COMPUTER);
        }}
      >
        Play with Computer
      </button>
    </div>
  );
};

export default Start;
