import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import  Login  from "./components/login/Login";
import Detail from "./views/detail/detail";
import  Home  from "./views/home/home";
import { Footer } from "./components/Footer/Footer";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing/Landing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <div>
        {location.pathname === "/" ? null : (
        <NavBar  />
      )}
      <Routes>
        <Route path="/products/:id" element={<Detail/>}/>
        <Route  path="/home"  element={<Home />}/>
        <Route  path="/Login"  element={<Login />}/>
        <Route  path="/Landing"  element={<Landing />}/>


      </Routes>
	  <Footer/>
    </div>
  );
}

export default App;
