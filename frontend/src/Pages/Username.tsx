import { useContext, useEffect, useState } from 'react';
import { GuessContext } from '../context/Context';
import {
  COLLEAGUE,
  GAMEPLAY_DATA_API_URL,
  SOCKET_MESSAGE_TYPE,
} from '../context/Constants';
import { socket } from '../components/Socket';
import Loader from '../components/Loader';
import { RANDOM_COLOR_CODE_GENERATOR } from '../utils';

const Username = () => {
  const {
    setGameType,
    setIsUsernamePageVisible,
    isSocketConnected,
    setUserName,
    setIsNotFound,
    setGuessName,
    gameplayData,
    setGameplayData,
  } = useContext(GuessContext);

  const [inputValue, setInputValue] = useState('');
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    socket.connect();
  }, []);

  useEffect(() => {
    if (isButtonClicked) {
      console.log(gameplayData);
      GAMEPLAY_DATA_ANALYSIS(gameplayData);
    }
  }, [gameplayData, isButtonClicked]);

  const GAMEPLAY_DATA_ANALYSIS = (data: any[]) => {
    socket.connect();
    const isAnyoneJoined = data.some(
      (e) => e.type === SOCKET_MESSAGE_TYPE.JOINED
    );
    const didSomeoneStart = data.some(
      (e) => e.type === SOCKET_MESSAGE_TYPE.STARTED
    );
    const response = {
      name: inputValue,
      type: SOCKET_MESSAGE_TYPE.JOINED,
      color: RANDOM_COLOR_CODE_GENERATOR(),
    };
    if (data.length === 0) {
      setIsUsernamePageVisible(false);
      if (isSocketConnected) {
        setUserName(inputValue);
        socket.emit('user-action', response);
      }
    } else if (isAnyoneJoined && !didSomeoneStart) {
      setIsLoaderVisible(true);
    } else if (didSomeoneStart) {
      /* GO STRAIGHT TO GAME CONSOLE */
      if (isSocketConnected) {
        setUserName(inputValue);

        socket.emit('user-action', response);
      }
      const MOVIE = gameplayData.find(
        (elem: { name: string; type: string }) => {
          return elem.type === SOCKET_MESSAGE_TYPE.STARTED;
        }
      );
      setIsUsernamePageVisible(false);
      setGuessName(MOVIE.name);
    }
    setGameType(COLLEAGUE);
  };

  const getGamelayData = async () => {
    setIsLoaderVisible(true);
    try {
      const currentData = await fetch(GAMEPLAY_DATA_API_URL)
        .then((r) => r.json())
        .then((r) => r);
      console.log(currentData);
      setGameplayData(currentData);
      setIsLoaderVisible(false);
      setIsButtonClicked(true);
    } catch (error) {
      setIsNotFound(true);
      console.error('Error fetching API:', error);
    }
  };

  const goClickHandler = () => {
    if (inputValue.length > 0) {
      getGamelayData();
    }
  };

  const inputClickHandler = (e: any) => {
    if (e.keyCode === 13) goClickHandler();
  };

  return (
    <div className="username-wrap">
      {isLoaderVisible ? (
        <Loader />
      ) : (
        <>
          <input
            className="username-inp"
            placeholder="State your name here"
            value={inputValue}
            onKeyDown={inputClickHandler}
            onChange={(e) => {
              setInputValue(
                e.target.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase()
              );
            }}
          />

          <button className="username-btn" onClick={goClickHandler}>
            Let&apos;s go
          </button>
        </>
      )}
    </div>
  );
};

export default Username;
