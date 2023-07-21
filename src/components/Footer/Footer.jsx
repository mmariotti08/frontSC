import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const Footer = () => {
  return (
    <div className={styles.todo}>
    <div className={styles.container}>

      <div className={styles.containerName}>
        <h1>Members</h1>
        <div className={styles.integrantes}>
          <div className={styles.nombre}>
            <a href="https://github.com/mmariotti08" target="_blank">
              <h3> Matias Mariotti</h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/brayan4nacona" target="_blank">
              <h3> Brayan Anacona</h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/MRubilarRiffo" target="_blank">
              <h3> Mauricio Rubiale</h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/Marye05" target="_blank">
              <h3> Maryeris Orozco </h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/joseaot" target="_blank">
              <h3>Jose Orellana</h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/luissanchez92" target="_blank">
              <h3> Luis Sanchez </h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/JoseMcmW" target="_blank">
              <h3>Jose Centeno</h3>
            </a>
          </div>

          <div className={styles.nombre}>
            <a href="https://github.com/JNicolasmm" target="_blank">
              <h3>Nicolas Moreno</h3>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.help}>
        <Link to="/aboutUs">
          <h3>About Us</h3>
        </Link>
        <Link to="/fQuestions">
          <h3>Frecuent Questions</h3>
        </Link>
        <Link to="/measureSize">
          <h3>How to measure your size?</h3>
        </Link>
      </div>

      <div>
        <ScrollToTopButton />
      </div>

    </div>
      <div className={styles.derechos}>
        <p>
          © Copyright 2023 ShopConnect, TODOS LOS DERECHOS
          RESERVADOS. Las fotos contenidas en este site, el logotipo y las
          marcas son propiedad de ShopConnect y/o de sus respectivos
          titulares. Está prohibida la reproducción total o parcial, sin la
          expresa autorización de la administradora de la tienda virtual.
          ShopConnect, empresa perteneciente al grupo 18 Henry S.A. con domicilio en
          Buenos Aires – Argentina.
        </p>
      </div>
      </div>
  );
};


export { Footer };
