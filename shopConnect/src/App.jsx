import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import  Login  from "./components/login/Login";
import Detail from "./views/detail/detail";
import  Home  from "./views/home/home";
import AboutUs from "./components/Footer/AboutUS/AboutUs";
import MeasurSize from "./components/Footer/MeasureSize/MeasureSize";
import ShoppingCart from "./views/shoppingCart/shoppingCart"
import { Footer } from "./components/Footer/Footer";
import Favorites from './views/favorites/favorites'
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import FrecuentQuestions from "./components/Footer/FrecuentQuestions/FrecuentQuestions";
//import Landing from "./views/landing/Landing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <div>
       <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route  path="/"  element={<Home />}/>
        {/* RUTAS DEL FOOTER */}
        <Route path="/fQuestions" element={<FrecuentQuestions/>}/>
        <Route path="/measureSize" element={<MeasurSize/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/products/:id" element={<Detail/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        <Route path="/favorites" element={<Favorites/>}/>

      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
