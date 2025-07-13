import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, className }) => {
  return (
    <button className={clsx(styles.customButton, className)} onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomButton;
