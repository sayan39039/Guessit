import { useContext } from 'react';
import { GuessContext } from '../context/Context';
import { COLLEAGUE } from '../context/Constants';

const Visibility = ({ children }: any) => {
  const { guessName, gameType, isUsernamePageVisible, isNotFound } =
    useContext(GuessContext);

  const VISIBILITY_METRICS: { [key: string]: boolean } = {
    Start: !isUsernamePageVisible && !gameType,
    Username: isUsernamePageVisible && gameType === COLLEAGUE && !isNotFound,
    Entry: gameType === COLLEAGUE && !guessName && !isUsernamePageVisible,
    Console: !!guessName,
    Notfound: isNotFound,
  };

  const MASTER_VISIBILITY = VISIBILITY_METRICS[children.type.name];

  return MASTER_VISIBILITY ? <>{children}</> : null;
};

export default Visibility;
