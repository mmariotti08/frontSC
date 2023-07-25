import "./Card.css";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/Ai';
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
    <div className="container-card">
      <div className="buttons">
        <a
          className='button-fav'
          onClick={handleButtonFavClick}
        >
          {buttonFav ? <AiFillHeart/> : <AiOutlineHeart />}
        </a>
      </div>

      <Link to={`/products/${props.id}`}>
        <div className="container-img-card">
          <img src={props.main_picture_url[0]} alt="" />
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

export default connect(mapStateToProps, { addToFav, removeFromFav })(Card);
