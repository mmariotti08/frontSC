import { React, useState } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

const NavBar = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getDriver());
    // }, [dispatch]);
  
  
  
    return (
        <div className={style.container}>
            hola
        </div>
    )
      
          
      
  };
  
  export default NavBar;
  