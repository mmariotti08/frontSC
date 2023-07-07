import { Link } from "react-router-dom";
import styles from "./Footer.module.css"


const Footer = () => {
    
    return (
        <div className={styles.container}>
            <div>
                 <h1>Members</h1>
                <h3>Matias Mariotti</h3>
                <a href="https://github.com/mmariotti08" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Brayan Anacona</h3>
                <a href="https://github.com/brayan4nacona" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Nicolas Moreno</h3>
                <a href="https://github.com/JNicolasmm" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Jose Orellana</h3>
                <a href="https://github.com/joseaot" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Jose Centeno</h3>
                <a href="https://github.com/JoseMcmW" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Luis Sánchez</h3>
                <a href="https://github.com/luissanchez92" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Maryeris</h3>
                <a href="https://github.com/Marye05" target="_blank">
                    <h4>GITHUB</h4>
                </a>
            </div>
            <div>
                <h3>Mauricio Rubilar</h3>
                <a href="https://github.com/MRubilarRiffo" target="_blank">
                    <h4>GITHUB</h4>
                </a>
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