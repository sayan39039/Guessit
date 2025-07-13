import React from 'react';
import styles from './page.module.scss';
import Button from '@comp/Button';

const Create = () => {
  return (
    <div className={`${styles.container} ${styles.login}`}>
      <Button text="Create" />
      <Button text="Join" />
    </div>
  );
};
export default Create;
