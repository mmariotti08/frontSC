import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo.png";
import style from "./NavBar.module.css";
import SearchBar from "../../../src/components/searchBar/searchBar";
import { getProductName, getProducts, getUsers } from "../../redux/actions";
import { UserButton, useUser } from "@clerk/clerk-react";
import "./modal.css";
import { useAuth } from "@clerk/clerk-react";

const NavBar = ({ toggleCarousel }) => {
	const dispatch = useDispatch();
	
	const { isSignedIn } = useUser();
	const { signOut } = useAuth();

	const userss = useSelector((state) => state.users);
	const user = useUser(true);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const idUser = userss.length > 0 ? userss.find((item) => item.mail === user.user?.primaryEmailAddress.emailAddress): null;

	const cart = useSelector((state) => state.cart);
	const cartItemCount = cart.length;

	const handleSearch = (name) => {
		if (name.length === 0) {
		dispatch(getProducts());
		} else {
		dispatch(getProductName(name));
		}
	};

	const resetDrivers = () => {
		dispatch(getProducts());
		toggleCarousel(true);
	};

	const [mensaje, setMensaje] = useState("");

	const mensajes = [
		"💳 12 INSTALLMENTS on selected products!",
		"🚚 FREE SHIPPING on selected products!",
		"🛍️ 20% DISCOUNT on selected products!",
	];

	useEffect(() => {
		let index = 0;
		setMensaje(mensajes[0]); // Establecer el primer mensaje como el estado inicial

		const interval = setInterval(() => {
			setMensaje(mensajes[index]);
			index = (index + 1) % mensajes.length;
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const getStyledMessage = () => {
		const halfLength = Math.ceil(mensaje.length / 2.3);
		const firstHalf = mensaje.slice(0, halfLength);
		const secondHalf = mensaje.slice(halfLength);

		return (
			<p className={style.letra}>
				<span className={style.firstHalf}>{firstHalf}</span>
				<span className={style.secondHalf}>{secondHalf}</span>
			</p>
		);
	};

	const handleLogout = async () => {
		await signOut();
	};

	useEffect(() => {
		if (isSignedIn) {
			const unlisten = () => {
				window.location.href = "/";
			};
		return unlisten;
		}
	}, [isSignedIn]);

	const { pathname } = useLocation();

	return (
		<>
			{!pathname.startsWith("/admin") && (
				<>
					<div className={style.navBar}>
						<div className={style.mensajes}>{getStyledMessage()}</div>

						<div className={style.name} onClick={resetDrivers}>
							<Link to="/">
								<img src={logo} alt="logo" className={style.logo} />
								<h1 className={style.word}>ShopConnect</h1>
							</Link>
						</div>

						<div className={style.searchBarContainer}>
							<SearchBar
								onSearch={handleSearch}
								toggleCarousel={toggleCarousel}
								/>
							</div>
							<div className={style.container}>
							<Link to="/favorites" className={style.navLink}>
								<ion-icon name="bookmarks-outline"></ion-icon>
							</Link>

							{isSignedIn ? (
								<div className={style.UserButton}>
								<UserButton onClick={handleLogout} />
								</div>
							) : (
								<Link to="/login" className={style.navLink} >
								<ion-icon name="person-circle-outline"></ion-icon>
								</Link>
							)}
							{isSignedIn && (
								<Link to="/profile" className={style.navLink}>
								<ion-icon name="person-outline"></ion-icon>
								</Link>
							)}

							{isSignedIn && idUser && idUser.administrator === true ? ( // Renderizar el botón de admin solo si el usuario tiene la propiedad "administrator" en true
								<Link to="/admin" className={style.navLink} >
								<ion-icon name="cog-outline"></ion-icon>
								</Link>
							) : null}

							<Link to="/cart" className={style.navLink}>
								<ion-icon name="cart-outline"></ion-icon>
								{cartItemCount > 0 && (
									<span className={style.cartItemCount}>{cartItemCount}</span>
								)}
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default NavBar;
