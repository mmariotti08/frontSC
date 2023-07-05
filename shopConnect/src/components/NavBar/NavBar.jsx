import React from "react";
import { Link } from "react-router-dom";

import style from "./NavBar.module.css";
import SearchBar from "../searchBar/searchBar";

const NavBar = () => {
  return (
    <div className={style.navBar}>
      
      <Link to="/" className={style.word}>
          ShopConect
        </Link>

      <div className={style.searchBarContainer}>
        <SearchBar />
      </div>
      <div className={style.container}>
        <Link to="/bookmarks" className={style.navLink}>
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
  );
};

export default NavBar;
