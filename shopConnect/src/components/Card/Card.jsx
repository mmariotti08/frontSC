import "./Card.css";
import { Link } from "react-router-dom";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { connect, useSelector } from 'react-redux';
import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';


const Card = ({ props, addToCart, removeFromCart, addToFav, removeFromFav }) => {
  const cart = useSelector((state) => state.cart); // Agrega la selección del estado "cart"
  const fav = useSelector((state) => state.fav);
  const buttonFav = fav.some(item => item.id === props.id);
  const buttonCars = cart.some(item => item.id === props.id);

  const handleButtonFavClick = () => {
    if (buttonFav) {
      removeFromFav(props.id);
    } else {
      addToFav(props);
    }
  };

  const handleButtonCarsClick = () => {
    if (buttonCars) {
      removeFromCart(props.id);
    } else {
      addToCart(props);
    }
  };

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  return (
    <div className="container-card">
      <div className="buttons">
        <a
          className='button-cars'
          onClick={handleButtonCarsClick}
        >
          {buttonCars ? <IoCartSharp/> : <IoCartOutline />}
        </a>

        <a
          className='button-fav'
          onClick={handleButtonFavClick}
        >
          {buttonFav ? <BsBookmarksFill/> : <BsBookmarks />}
        </a>
      </div>

      <Link to={`/products/${props.id}`}>
        <div className="container-img-card">
          <img src={props.main_picture_url} alt="" />
        </div>
        <div className="props-card">
          <div className="container-name">
            <h4>{props.name}</h4>
          </div>
          <div className="price">
            <h3>{formatPrice(props.retail_price_cents)}</h3>
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

export default connect(mapStateToProps, { addToCart, removeFromCart, addToFav, removeFromFav })(Card);
