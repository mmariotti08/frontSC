import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { connect, useSelector } from 'react-redux';
import { addToFav, removeFromFav } from '../../redux/actions';
import { toast } from "react-toastify";

const Card = ({ props, addToFav, removeFromFav }) => {
	const fav = useSelector((state) => state.fav);
	const buttonFav = fav.some(item => item.id === props.id);

	const handleButtonFavClick = () => {
		if (buttonFav) {
			removeFromFav(props.id);
			toast.error('Shoe Removed😔', {
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
			addToFav(props);
			toast.success('Shoe Added Successfully👟', {
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

	const formatPrice = (price) => {
		const formattedPrice = (price / 100).toFixed(2);
		return `$${formattedPrice}`;
	};

	const showAlert = (message) => {
		alert(message);
	};

	return (
		<div className={styles.card}>
			<div className={styles.buttons}>
				<a
					className={styles.button_fav}
					onClick={handleButtonFavClick}
				>
					{buttonFav ? <AiFillHeart/> : <AiOutlineHeart />}
				</a>
			</div>

			<Link to={`/products/${props.id}`}>
				<div className={styles.container_img}>
					<img src={props.main_picture_url[0]} alt="" />
				</div>
				<div className={styles.props_card}>
					<div className={styles.container_name}>
						<h4>{props.brand_name.toUpperCase()}</h4>
					</div>
					<div className={styles.container_name}>
						<h5>{props.name.toUpperCase()}</h5>
					</div>
					<div className={styles.price}>
						<h4>{formatPrice(props.retail_price_cents)}</h4>
					</div>
				</div>
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	cart: state.cart,
	fav: state.fav
});

export default connect(mapStateToProps, { addToFav, removeFromFav })(Card);
