import styles from './BackButton.module.css';
import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button className={styles['back-button']} onClick={handleGoBack}>
      Voltar
    </button>
  );
};

export default BackButton;
