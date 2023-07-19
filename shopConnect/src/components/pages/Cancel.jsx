import { Link } from 'react-router-dom';
import styles from './Cancel.module.css';

function Cancel() {
  return (
    <div className={styles.container}>
      <h1 className={styles.word}>Purchase cancelled!</h1>
      <Link to="/" className={styles.button}>Back to home</Link>
    </div>
  );
}

export default Cancel;
