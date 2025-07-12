import React from 'react';
import styles from './styles.module.scss';

const InputCombo = () => {
  return (
    <div>
      <div className={styles.inputWrap}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter your name"
          autoFocus
          // value={inputValue}
          // onKeyDown={inputClickHandler}
          // onChange={(e) => {
          //   setInputValue(
          //     e.target.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase()
          //   );
          // }}
        />
        <button className={styles.arrow}>→</button>
      </div>
    </div>
  );
};

export default InputCombo;
