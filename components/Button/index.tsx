import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, className }) => {
  return <button className={clsx(styles.button, className)}>{text}</button>;
};

export default Button;
