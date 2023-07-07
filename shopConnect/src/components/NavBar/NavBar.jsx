import React from "react";
import { Link } from "react-router-dom";

import style from "./NavBar.module.css";


const NavBar = () => {
  // const dispatch = useDispatch();




// onSearch={handleSearch}
  
  // const handleSearch = (id) => {
  //     dispatch(getDetail(id));
    
  // };

  return (
    <div className={style.navBar}>
      
      <Link to="/" className={style.word}>
          ShopConnect
        </Link>

      <div className={style.searchBarContainer}>
        
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
