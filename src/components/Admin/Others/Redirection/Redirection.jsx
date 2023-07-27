import styles from "./Redirection.module.css";
 import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/Ai";
import { Link } from "react-router-dom";

const Redirection = () => {
    return (
        <div className={styles.container}>
            <button><AiOutlineArrowLeft /></button>
            <button>icono</button>
            <Link to='/'><button>Home</button></Link>
            <button><AiOutlineArrowRight /></button>
            <button>gdf</button>
        </div>
    );
};

export { Redirection };