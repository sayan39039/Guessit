import { useContext } from 'react';
import { GuessContext } from '../context/Context';
import { COMPUTER } from '../context/Constants';

const Loader = () => {
  const { gameType, guessName, isNotFound } = useContext(GuessContext);
  return gameType === COMPUTER && guessName === null && !isNotFound ? (
    <div className="load-wrap">
      <div className="loader"></div>
    </div>
  ) : null;
};
export default Loader;
