export const VOWELS = ['A', 'E', 'I', 'O', 'U'];
export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const ROW1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
export const ROW2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
export const ROW3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
export const MAX_TRIES = 9;
export const COLLEAGUE = 'COLLEAGUE';
export const COMPUTER = 'COMPUTER';
export const UNDERSCORE = '_';
export const SNACKBAR_TIMER_IN_SECONDS = 3;
export const SOCKET_MESSAGE_TYPE = {
  JOINED: 'JOINED',
  STARTED: 'STARTED',
  GUESSED: 'GUESSED',
};

export const BASE_URL = () => {
  if (process.env.environment === 'DEV') {
    return 'http://localhost:6090';
  } else {
    return 'https://guessit-uoro.onrender.com';
  }
};

export const MOVIE_API_URL = `${BASE_URL()}/movie`;
export const GAMEPLAY_DATA_API_URL = `${BASE_URL()}/currentData`;
export const CLEAN_HOUSE_API_URL = `${BASE_URL()}/cleanHouse`;
