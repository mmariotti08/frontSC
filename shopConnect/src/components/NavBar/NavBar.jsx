import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logopng..png";
import style from "./NavBar.module.css";
import SearchBar from "../../../src/components/searchBar/searchBar";

const NavBar = () => {
  const [mensaje, setMensaje] = useState("");
  const mensajes = [
    "3 CUOTAS sin interes con todas las tarjetas!",
    "🚚 ENVIO gratuito en todas tus compras",
    "DESCUENTO del 20% en productos seleccionados",
  ];
  
  useEffect(() => {
    let index = 0;
    setMensaje(mensajes[0]); // Establecer el primer mensaje como el estado inicial

    const interval = setInterval(() => {
      setMensaje(mensajes[index]);
      index = (index + 1) % mensajes.length;
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getStyledMessage = () => {
    const halfLength = Math.ceil(mensaje.length / 5);
    const firstHalf = mensaje.slice(0, halfLength);
    const secondHalf = mensaje.slice(halfLength);

    return (
      <p className={style.letra}>
        <span className={style.firstHalf}>{firstHalf}</span>
        <span className={style.secondHalf}>{secondHalf}</span>
      </p>
    );
  };

  return (
    <>
      <div className={style.navBar}>
        <div className={style.mensajes}>{getStyledMessage()}</div>

        <div className={style.name}>
          <Link to="/">
            <img src={logo} alt="logo" className={style.logo} />
            <h1 className={style.word}>ShopConnect</h1>
          </Link>
        </div>

        <div className={style.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={style.container}>
          <Link to="/favorites" className={style.navLink}>
            <ion-icon name="bookmarks-outline"></ion-icon>
          </Link>
          <Link to="/Login" className={style.navLink}>
            <ion-icon name="person-circle-outline"></ion-icon>
          </Link>
          <Link to="/cart" className={style.navLink}>
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;