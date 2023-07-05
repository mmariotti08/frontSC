import React from "react";
import { Link } from "react-router-dom";

import style from "./NavBar.module.css";
import SearchBar from "../searchBar/searchBar";

const NavBar = () => {
  return (
    <div className={`${style.navBar} navBarStyles`}>
      <div className={style.container}>
        <Link to="/login" className={style.navLink}>
          Iniciar sesión
        </Link>
        <Link to="/carrito" className={style.navLink}>
        
        </Link>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
