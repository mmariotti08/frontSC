import { Link } from "react-router-dom";
import styles from "./Footer.module.css"
import github from '../../../public/github-mark-white.png'


const Footer = () => {
    
    return (
        <div className={styles.container}>
              <div className={styles.integrantes}>
                    <h1>Members</h1>
                    <div className={styles.nombre}>
                        <h3 className={styles.mati}>Matias Mariotti </h3>
                        <h3 className={styles.mati}> Brayan Anacona</h3>
                    </div>
                    <div className={styles.link}>
                        <a href="https://github.com/mmariotti08" target="_blank"><h4>GITHUB</h4></a>
                        <a href="https://github.com/brayan4nacona" target="_blank"><h4>GITHUB</h4></a>
                    </div>
                    <div className={styles.nombre}>
                        <h3 className={styles.mati}>Mauricio Rubiale</h3>
                        <h3 className={styles.mati}> Maryelys Orozco </h3>
                    </div>
                    <div className={styles.link}>
                        <a href="https://github.com/MRubilarRiffo" target="_blank"><h4>GITHUB</h4></a>
                        <a href="https://github.com/Marye05" target="_blank"><h4>GITHUB</h4></a>
                    </div>
                    <div className={styles.nombre}>
                        <h3 className={styles.mati}>Jose Orellana</h3>
                        <h3 className={styles.mati}> Luis Sanchez </h3>
                    </div>
                    <div className={styles.link}>
                        <a href="https://github.com/joseaot" target="_blank"><h4>GITHUB</h4></a>
                        <a href="https://github.com/luissanchez92" target="_blank"><h4>GITHUB</h4></a>
                    </div>
                    <div className={styles.nombre}>
                        <h3 className={styles.mati}>Jose Centeno</h3>
                        <h3 className={styles.mati}> Nicolas Moreno</h3>
                    </div>
                    <div className={styles.link}>
                        <a href="https://github.com/JoseMcmW" target="_blank"><h4>GITHUB</h4></a>
                        <a href="https://github.com/JNicolasmm" target="_blank"><h4>GITHUB</h4></a>
                    </div>
                </div>
           
            <div>
                <h1>Help</h1>
                <Link to="/fQuestions">
                    <h3>Frecuent Questions</h3>
                </Link>
                <Link to='/measureSize'>
                    <h3>How to measure your size?</h3>
                </Link>
                
            </div>
            <div>
                <Link to='/aboutUs'><h1>ABOUT US</h1></Link>
            </div>
        </div>
    );
};

export { Footer };