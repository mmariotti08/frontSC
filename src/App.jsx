import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import Detail from "./views/detail/detail";
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
import UserBanned from "./views/userBanned/UserBanner";
import Addreses from "./components/Addreses/Addreses";
import { gapi } from "gapi-script";
import Successfull from "./components/Payments/Successfull/Successfull";
import Failed from "./components/Payments/Failed/Failed";
import Profile from "./views/profile/profile";
import { ToastContainer } from "react-toastify";
import ProductsContainer from "./components/productsContainer/productsContainer";
import { Products } from "./views/products/products";
import "react-multi-carousel/lib/styles.css";

// axios.defaults.baseURL='https://shopconnect-bj22.onrender.com/'

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
	const clientId = "1027048250245-li9gor30unv7ieg8tkk77fpbh78cahbs.apps.googleusercontent.com";
    // TEST LOGIN V2
	useEffect(() => {
		const start = () => {
			gapi.client.init({
				clientId: clientId,
				scope: ""
			});
		};
		gapi.load('client:auth2', start);
	});

	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const [toggle, setToggle] = useState(true);

	const toggleCarousel = (show) => {
		setToggle(show);
	};

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	return (
		<div id="container_app">
			{!pathname.startsWith("/admin") && <NavBar toggleCarousel={toggleCarousel} />}
			<Routes>
				<Route  path="/"  element={<Home toggle={toggle} />}/>
				<Route path="/fQuestions" element={<FrecuentQuestions/>}/>
				<Route path="/measureSize" element={<MeasurSize/>}/>
				<Route path="/aboutUs" element={<AboutUs/>}/>
				<Route path="/products/:id" element={<Detail/>}/>
				<Route path="/cart" element={<ShoppingCart/>}/>
				<Route path="/favorites" element={<Favorites/>}/>
				<Route path="/addAddress" element={<Addreses/>} />
				<Route path="/successfull" element={<Successfull/>} />
				<Route path="/failed" element={<Failed/>} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/products" element={<Products />} />
			</Routes>
				{/* <UserBanned /> */}
			{!pathname.startsWith("/admin") && <Footer />}
			<ToastContainer />
		</div>
	);
};

export default App;
