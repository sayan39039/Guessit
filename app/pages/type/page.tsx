import React from 'react';
import styles from './page.module.scss';
import Button from '@comp/Button';

const Create = () => {
  return (
    <div className={`${styles.container} ${styles.type}`}>
      <Button text="Play with Colleagues" className={styles.button} />
      <Button text="Play with Computer" className={styles.button} />
    </div>
  );
};
export default Create;
