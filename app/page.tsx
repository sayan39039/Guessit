import styles from './page.module.scss';
import InputCombo from '@/components/InputCombo';
import Button from '@/components/Button';
import CustomButton from '@/components/CustomButton';

export default function Home() {
  return (
    <div className={styles.page}>
      <InputCombo />
      <br />
      <Button />
      <br />
      <CustomButton />
    </div>
  );
}
