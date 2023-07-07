import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/actions";
import Login from "./components/login/Login";
import Detail from "./views/detail/detail";
import Home from "./views/home/home";
import ShoppingCart from "./views/shoppingCart/shoppingCart";
import { Footer } from "./components/Footer/Footer";
import Favorites from "./views/favorites/favorites";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
//import Landing from "./views/landing/Landing";
import { Admin } from "./views/admin/Admin";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	});

	const { pathname } = useLocation();

	return (
		<div>
			{!pathname.startsWith("/admin") && <NavBar />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
				<Route path="/products/:id" element={<Detail />} />
				<Route path="/cart" element={<ShoppingCart />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
			{!pathname.startsWith("/admin") && <Footer />}
		</div>
	);
};

export default App;
