import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.environment === 'DEV' ? 'http://localhost:6009' : undefined;

export const socket = io(URL, {
  autoConnect: false,
});
