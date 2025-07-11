import { useContext, useState } from 'react';
import { GuessContext } from '../context/Context';
import { socket } from '../components/Socket';
import { SOCKET_MESSAGE_TYPE } from '../context/Constants';

const Entry = () => {
  const { setGuessName, userName } = useContext(GuessContext);
  const [inputValue, setInputValue] = useState('');
  const arrowClickHandler = async () => {
    setGuessName(inputValue);
    const response = {
      name: userName,
      type: SOCKET_MESSAGE_TYPE.STARTED,
      movie: inputValue,
    };
    socket.emit('user-action', response);
  };
  const inputClickHandler = (e: any) => {
    if (e.keyCode === 13) arrowClickHandler();
  };
  return (
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
  );
};

export default Entry;
