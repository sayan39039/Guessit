import { useContext, useState } from 'react';
import { GuessContext } from '../context/Context';
import { MOVIE_API_URL, COLLEAGUE, COMPUTER } from '../context/Constants';
import Loader from '../components/Loader';

const Start = () => {
  const {
    setGuessName,
    setGameType,
    setRandomDetails,
    setIsNotFound,
    setIsUsernamePageVisible,
  } = useContext(GuessContext);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const apiOperations = async (callback: Function) => {
    setIsLoaderVisible(true);
    try {
      const fullDetails = await fetch(MOVIE_API_URL)
        .then((r) => r.json())
        .then((r) => r);
      const name = fullDetails.title
        .toUpperCase()
        .replace(/[^a-zA-Z0-9 ]/g, '');
      setGuessName(name);
      setRandomDetails(fullDetails);
      callback();
    } catch (error) {
      console.error('Error fetching API:', error);
      setIsNotFound(true);
      callback();
    }
  };
  const gameTypeHandler = (type: string) => {
    const postProduction = () => {
      setGameType(type);
      setIsUsernamePageVisible(true);
      setIsLoaderVisible(false);
    };
    type === COMPUTER && apiOperations(postProduction);
    type === COLLEAGUE && postProduction();
  };

  return (
    <div className="start-wrap">
      {isLoaderVisible ? (
        <Loader />
      ) : (
        <>
          <button
            className="start-btns"
            onClick={() => gameTypeHandler(COLLEAGUE)}
          >
            Play with Colleagues
          </button>
          <button
            className="start-btns"
            onClick={() => gameTypeHandler(COMPUTER)}
          >
            Play with Computer
          </button>
        </>
      )}
    </div>
  );
};

export default Start;
