'use client';

import styles from './global.module.scss';
import InputCombo from '@comp/InputCombo';
import Button from '@comp/Button';
import CustomButton from '@comp/CustomButton';

export default function Home() {
  return (
    <div className={styles.page}>
      <InputCombo onButtonClick={() => {  }} />
      <br />
      <Button text="Create" />
      <br />
      <CustomButton />
    </div>
  );
}
