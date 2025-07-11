import { SNACKBAR_TIMER_IN_SECONDS } from '../context/Constants';

const removeToast = () => {
  const T = document.getElementById('snackbar');
  T?.parentNode?.removeChild(T);
};
const Toast = (Text: string) => {
  const D = document.createElement('div');
  D.classList.add('snackbar');
  D.innerHTML = Text;
  D.id = 'snackbar';
  D.onclick = removeToast;

  const C = document.createElement('div');
  const B = document.createElement('div');
  C.classList.add('container');
  B.classList.add('bar');
  C.appendChild(B);

  const body = document.querySelector('body');
  D.appendChild(C);
  body?.appendChild(D);

  setTimeout(() => {
    const T = document.getElementById('snackbar');
    T?.parentNode?.removeChild(T);
  }, SNACKBAR_TIMER_IN_SECONDS * 1000);
};

export default Toast;
