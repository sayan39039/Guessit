'use client';

import React from 'react';
import styles from './page.module.scss';
import InputCombo from '@comp/InputCombo';

const Set = () => {
  return (
    <div className={styles.container}>
      <div className={styles.set}>
        <InputCombo onButtonClick={() => {}} placeholder="Enter..." />
      </div>
    </div>
  );
};
export default Set;
