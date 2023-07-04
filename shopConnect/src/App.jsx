import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";

import  Home  from "./views/home/home";
import { Footer } from "./components/Footer/Footer";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";

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
		<Route  path="/home"  element={<Home />}/>
       
      </Routes>
	  <Footer/>
    </div>
  );
}

export default App;
