'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';

interface InputComboProps {
  onButtonClick: (inputValue: string) => void;
  placeholder?: string; // Optional placeholder prop
}

const InputCombo: React.FC<InputComboProps> = ({
  onButtonClick,
  placeholder = 'Enter your name',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    onButtonClick(inputValue);
  };

  return (
    <div className={styles.inputWrap}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder} // Use the placeholder prop
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
        id="inputCombo"
      />
      <button className={styles.arrow} onClick={handleButtonClick}>
        →
      </button>
    </div>
  );
};

export default InputCombo;
