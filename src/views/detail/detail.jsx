import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';
import { toast } from "react-toastify";
import { CgMathPlus, CgMathMinus } from 'react-icons/cg';
import Opinions from './Opinions';

const Detail = () => {
	const dispatch = useDispatch();
	const sneaker = useSelector((state) => state.detail);
	const cart = useSelector((state) => state.cart);
	const fav = useSelector((state) => state.fav);
	const { id } = useParams();
	const [selectedSize, setSelectedSize] = useState(null);
	const [showSizeError, setShowSizeError] = useState(false);
	const [selectedQuantity, setSelectedQuantity] = useState(1); // Initialize selectedQuantity with 1
	const [availableQuantity, setAvailableQuantity] = useState(0); // New state for available quantity

	const { user, isAuthenticated } = useSelector(state => state.auth_token);

	useEffect(() => {
		dispatch(getDetail(id));
		window.scrollTo(0, 0);
	}, [dispatch, id]);

	useEffect(() => {
		// Update available quantity when a size is selected
		if (selectedSize) {
			const selectedStock = sneaker.Stocks.find((s) => s.size === selectedSize);
			setAvailableQuantity(selectedStock ? selectedStock.quantity : 0);
		}
	}, [selectedSize, sneaker.Stocks]);

	const formatPrice = (price) => {
		const formattedPrice = (price / 100).toFixed(2);
		return `${formattedPrice}`;
	};

	const handleCart = () => {
		if (!selectedSize || selectedQuantity < 1 || selectedQuantity > availableQuantity) {
			setShowSizeError(true);
			return;
		}
		setShowSizeError(false);

		const selectedProduct = {
			...sneaker,
			size: selectedSize,
			quantity: selectedQuantity,
		};

		const isProductInCart = cart.some(
			(item) => item.id === selectedProduct.id && item.size === selectedProduct.size
		);

		if (isProductInCart) {
			dispatch(removeFromCart(selectedProduct.id, selectedProduct.size));
			setSelectedQuantity((prevQuantity) => prevQuantity + selectedProduct.quantity);
			toast.error("Shoe Removed😔", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} if(!isAuthenticated) {
			toast.error("Log In before");
		} else {
			setSelectedQuantity((prevQuantity) => prevQuantity - selectedQuantity);
			dispatch(addToCart(selectedProduct, user));
			toast.success("Shoe Added Successfully👟", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const handleFav = () => {
		if (fav.some((item) => item.id === sneaker.id)) {
			dispatch(removeFromFav(sneaker.id));
			toast.error("Shoe Removed😔", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else {
			dispatch(addToFav(sneaker));
			toast.success("Shoe Added Successfully👟", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const [focusSize, setFocusSize] = useState("");

	const handleSizeClick = (size) => {
		if (selectedSize === size) {
			setSelectedSize(null);
			setSelectedQuantity(1); // Reset selectedQuantity to 1 when size is deselected
		} else {
			setSelectedSize(size);
			const selectedStock = sneaker.Stocks.find((s) => s.size === size);
			setAvailableQuantity(selectedStock ? selectedStock.quantity : 0);
			setSelectedQuantity(1); // Reset selectedQuantity to 1 when size is selected
		}
		setShowSizeError(false);
		if(focusSize === size) {
			setFocusSize("");
		} else {
			setFocusSize(size);
		}
	};

	const handleIncreaseQuantity = () => {
		if (selectedQuantity < availableQuantity) {
			setSelectedQuantity((prevQuantity) => prevQuantity + 1);
		}
	};

	const handleDecreaseQuantity = () => {
		if (selectedQuantity > 1) {
			setSelectedQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	

	// useEffect(() => {
	// 	dispatch()
	// }, []);

    const users = useSelector(state => state.allUsers)
  	const opinionsArray =   users.map(user => ({ name: user.name, opinion: user.Reviews.opinion }));

	return (
		<div id={styles.contDetail}>
			{/* IMG */}
			<div className={styles.container_img}>
				{sneaker.main_picture_url &&
					sneaker.main_picture_url.map((c, i) => (
						<img key={i} src={c} alt="background" />
				))}
			</div>
			{/* PROPS */}
			<div className={styles.container_props}>
				{/* name */}
				<div>
					<h3>{sneaker.name?.toUpperCase()}</h3>
				</div>
				<hr />
				{/* BUTTON FAV */}
				<div id={styles.button_fav}>
					<button
						onClick={handleFav}
						className={`${fav.some((item) => item.id === sneaker.id) ? styles.Nfav : styles.fav}`}
						>
						{fav.some((item) => item.id === sneaker.id)
							? <AiFillHeart />
							: <AiOutlineHeart />}
					</button>
				</div>
				{/* PRICE */}
				<div>
					<h4>${formatPrice(sneaker.retail_price_cents)}</h4>
				</div>
				{/* OTHERS */}
				<div id={styles.container_others}>
					<h3>BRAND: <p>{sneaker.brand_name?.toUpperCase()}</p></h3>
					<h3>CATEGORY: <p>{sneaker.category?.join(" - ").toUpperCase()}</p></h3>
					<h3>COLOR: <p>{sneaker.color?.toUpperCase()}</p></h3>
				</div>
				{/* SIZES */}
				<div>
					<h3>CHOOSE YOUR SIZE:</h3>
					<div className={styles.sizes}>
						{sneaker.Stocks?.map((s, index) =>
							s.quantity > 0 ? (
								<div
									key={`${s.size}-${index}`}
									className={s.size === focusSize ? styles.size_focus : styles.size}
									onClick={() => handleSizeClick(s.size)}
								>
									{`${s.size} US`}
								</div>
							) : (
								<div key={`${s.size}-${index}`} className={styles.dess}>
									{`${s.size} US`}
								</div>
							)
						)}
					</div>
				</div>
				<div className={styles.button_cart_input}>
					{/* BUTTON CART */}
					<div id={styles.errorMsg}>
						<p>{availableQuantity === 1 ? `${availableQuantity} UNIT AVAILABLE` : `${availableQuantity} UNIT AVAILABLE`}</p>
						{showSizeError && <p>SELECT A SIZE</p>}
					</div>
					<div id={styles.cart}>
						<button
							onClick={handleCart}
							className={styles.button_cart}
							>
							{cart.some(item => item.id === sneaker.id && item.size === selectedSize)
								? "REMOVE CART"
								: "ADD CART"}
						</button>
						{/* QUANTITY */}
						{selectedSize && (
								<div className={styles.quantityContainer}>
									<button onClick={handleDecreaseQuantity} disabled={selectedQuantity <= 1}>
										<CgMathMinus />
									</button>
									<input
										type="number"
										value={selectedQuantity}
										onChange={(e) => {
											const newQuantity = parseInt(e.target.value);
											setSelectedQuantity(
												isNaN(newQuantity) ? 0 : Math.min(newQuantity, availableQuantity)
											);
										}}
									/>
									<button onClick={handleIncreaseQuantity} disabled={selectedQuantity >= availableQuantity}>
										<CgMathPlus />
									</button>
								</div>
							)}
					</div>
				</div>
      <Opinions opinions={opinionsArray} />
			</div>
		</div>
	);
};

export default Detail;
