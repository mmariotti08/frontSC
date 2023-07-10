import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import Login from "./components/login/Login";
import Detail from "./views/detail/detail";



import  Home  from "./views/home/home";
import AboutUs from "./components/Footer/AboutUS/AboutUs";
import MeasurSize from "./components/Footer/MeasureSize/MeasureSize";
import ShoppingCart from "./views/shoppingCart/shoppingCart"

import { Footer } from "./components/Footer/Footer";
import Favorites from "./views/favorites/favorites";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

import { Route, Routes, useLocation } from "react-router-dom";
//import Landing from "./views/landing/Landing";
import { Admin } from "./views/admin/Admin";

import Landing from "./views/landing/Landing";
import FrecuentQuestions from "./components/Footer/FrecuentQuestions/FrecuentQuestions";


function App() {
	const dispatch = useDispatch();



	const { pathname } = useLocation();

  const [toggle, setToggle] = useState( true);




  const toggleCarousel = (show) => {
    setToggle(show)
  }


  useEffect(() => {
    dispatch(getProducts());
  },[]);

  return (
    <div>
       <NavBar toggleCarousel={toggleCarousel} />
        {!pathname.startsWith("/admin") && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route  path="/"  element={<Home toggle={toggle} />}/>
        {/* RUTAS DEL FOOTER */}
        <Route path="/fQuestions" element={<FrecuentQuestions/>}/>
        <Route path="/measureSize" element={<MeasurSize/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/products/:id" element={<Detail/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/admin" element={<Admin />} />
       </Routes>
        {!pathname.startsWith("/admin") && <Footer />}

		</div>
	);
};

export default App;
