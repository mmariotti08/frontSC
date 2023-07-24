import CreateReview from '../Review/CreateReview';
import  styles from './Succes.module.css';

export const Success = () => {
  return (
    
      <div className={styles.container}>
  
        <h1 className={styles.title}>Thanks for your purchase!</h1>
        <div>
  <CreateReview />
  <a href="/" className={styles.button}>
          Back to home
        </a>
  
        </div>
        
        <div>
        
        </div>
      </div>
  )
}


export default Success;
