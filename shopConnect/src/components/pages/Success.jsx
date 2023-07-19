import  styles from './Succes.module.css';


function Success() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thanks for your purchase!</h1>
      <a href="/" className={styles.button}>
        Back to home
      </a>
    </div>
  );
}

export default Success;
