import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import style from "./NavBar.module.css";
import SearchBar from "../../../src/components/searchBar/searchBar";
import { getProductName, getProducts, getUsers } from "../../redux/actions";
import { Login_v2 } from "../../views/new Login/Login v2";
import { Menu_Login } from "../New Login/Menu Login/Menu Login";
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';

const NavBar = ({ toggleCarousel }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

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
		setMensaje(mensajes[0]);

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

	// TEST LOGIN V2

	const [singIn, setSignIn] = useState(false);
	const [menuOn, setMenuOn] = useState(false);
	const [googleAccessToken, setGoogleAccessToken] = useState(() => {
		const storedAccessToken = localStorage.getItem('googleAccessToken');
		return storedAccessToken ? JSON.parse(storedAccessToken) : null;
	});

	useEffect(() => {
		localStorage.setItem('googleAccessToken', JSON.stringify(googleAccessToken));
	}, [googleAccessToken]);

	const {isAuthenticated, user} = useSelector(state => state.auth_token);

	const handleClick = () => {
		setSignIn(true);
		setMenuOn(!menuOn);
	};

	return (
		<>
			{singIn && !isAuthenticated
				&& <Login_v2
					singIn={singIn}
					setSignIn={setSignIn}
					googleAccessToken={googleAccessToken}
					setGoogleAccessToken={setGoogleAccessToken}
				/>}

			<div className={style.navBar}>
				<div className={style.mensajes}>{getStyledMessage()}</div>

				<div className={style.logo_input_icons}>
					<div className={style.container_logXname} onClick={resetDrivers}>
						<Link to="/">
							<img src={logo} alt="logo" className={style.logo} />
							<span className={style.word}>SHOPCONNECT</span>
						</Link>
					</div>

					<div className={style.searchBarContainer}>
						<SearchBar
							onSearch={handleSearch}
							toggleCarousel={toggleCarousel}
							/>
					</div>

					<div className={style.container_icon}>
						<div id={style.container_menu_login}>
							<a
								onClick={handleClick}
								className={style.navLink}
								>
								{user?.picture
									? <img src={user.picture} alt="" />
									: <BsPerson />
								}
							</a>
							{isAuthenticated && menuOn
								&& <Menu_Login
									singIn={singIn}
									setSignIn={setSignIn}
									googleAccessToken={googleAccessToken}
									setGoogleAccessToken={setGoogleAccessToken}
									setMenuOn={setMenuOn}
								/>}
						</div>

						<Link to="/favorites" className={style.navLink}>
							<AiOutlineHeart />
						</Link>

						<Link to="/cart" className={style.navLink}>
							<AiOutlineShoppingCart />
							{cartItemCount > 0 && (
								<span className={style.cartItemCount}>{cartItemCount}</span>
							)}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
