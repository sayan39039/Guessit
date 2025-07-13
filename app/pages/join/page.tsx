'use client';

import React from 'react';
import styles from './page.module.scss';
import InputCombo from '@comp/InputCombo';

const Login = () => {
  return (
    <div className={styles.container}>
      <InputCombo onButtonClick={() => {}} placeholder='Enter game id' />
    </div>
  );
};
export default Login;
