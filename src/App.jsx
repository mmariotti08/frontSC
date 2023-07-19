import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import Login from "./components/login/Login";
import Detail from "./views/detail/detail";

import {
  SignIn,
  SignUp,
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Home from "./views/home/home";
import AboutUs from "./components/Footer/AboutUS/AboutUs";
import MeasurSize from "./components/Footer/MeasureSize/MeasureSize";
import ShoppingCart from "./views/shoppingCart/shoppingCart";

import axios from "axios";

import { Footer } from "./components/Footer/Footer";
import Favorites from "./views/favorites/favorites";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Admin } from "./views/admin/Admin";
import FrecuentQuestions from "./components/Footer/FrecuentQuestions/FrecuentQuestions";

import Addreses from "./components/Addreses/Addreses";



const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
// import Landing from "./views/landing/landing";
// axios.defaults.baseURL='https://shopconnect-bj22.onrender.com/'
axios.defaults.baseURL='http://localhost:3001/'


function App() {
  const dispatch = useDispatch();

  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw "Missing Publishable Key";
  }

  const { pathname } = useLocation();

  const [toggle, setToggle] = useState(true);

  const toggleCarousel = (show) => {
    setToggle(show);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      

    <div>
        {!pathname.startsWith("/admin") && <NavBar toggleCarousel={toggleCarousel} />}
       
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route  path="/"  element={<Home toggle={toggle} />}/>
        {/* RUTAS DEL FOOTER */}
        <Route path="/fQuestions" element={<FrecuentQuestions/>}/>
        <Route path="/measureSize" element={<MeasurSize/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/products/:id" element={<Detail/>}/>
        <Route path="/cart" element={<ShoppingCart/>}/>
        {/* <Route path="/landing" element={<Landing/>}/> */}
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="/addAddress" element={<Addreses/>} />
        <Route path="/admin" element={<Admin />} />
        <Route
            path="/sign-up/*"
            element={
              <SignUp
                redirectUrl={"/login"}
                routing="path"
                path="/sign-up"
              />
            }
          />

          <Route
            path="/login"
            element={
              <SignIn
                redirectUrl={"/login"}
                routing="path"
                path="/login"
              />
            }
          />

          <Route
            path="/login"
            element={
              <>
                <SignedIn>
                  <Login />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>

        {!pathname.startsWith("/admin") && <Footer />}
      </div>
    </ClerkProvider>
  );

}

export default App;
