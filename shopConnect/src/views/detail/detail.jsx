import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './detail.module.css'
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';
import { Link } from "react-router-dom";


const Detail = () => {
    const dispatch = useDispatch();
    const sneaker = useSelector((state)=>state.detail);
    const cart = useSelector((state) => state.cart); // Agrega la selección del estado "cart"
    const fav = useSelector((state) => state.fav);
    const {id} = useParams();

    const [selectSize, setSelectSize] = useState(null);
    
    useEffect(()=>{
        dispatch(getDetail(id))
        window.scrollTo(0, 0);

    },[dispatch])

    const formatPrice = (price) => {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice}`;
      };

    const handleCart = () => {
        if (cart.some(item => item.id === sneaker.id)) {
            dispatch(removeFromCart(sneaker.id));
        } else {
            dispatch(addToCart(sneaker));
        }
    };
    const handleFav = () => {
        if (fav.some(item => item.id === sneaker.id)) {
            dispatch(removeFromFav(sneaker.id));
        } else {
            dispatch(addToFav(sneaker));
        }
    };
    
  const handleSizeClick = (size) => {
    if (selectSize === size) {
      setSelectSize(null); 
    } else {
      setSelectSize(size);
    }
  };

    return (
        <div className={styles.contDetail}>
            <h1 className={styles.nameh3}>{sneaker.name} </h1>
            <div className={styles.detailz}>
                <img src={sneaker.main_picture_url} alt="background"/> 
                <div className={styles.data}>
                    <h2>Brand:</h2>
                    <h3>{sneaker.brand_name}</h3>
                    <h2>Category:</h2>
                    <h3>{sneaker.category}</h3>
                    <h2>Color:</h2>
                    <h3>{sneaker.color}</h3>
                    
                    
                        <h2>Sizes:</h2>
                    <div className={styles.sizes}>
                    {sneaker.Stocks?.map(s =>(
                       
                       s.quantity > 0 ? <button   className={`${styles.size} ${selectSize === s.size ? styles.select : ''}`}
                       onClick={() => handleSizeClick(s.size)}>
                        { s.size }
                        </button> : <div className={styles.dess}>{s.size}</div>
                    ))}
                    </div>
                  
                    <h1>$ {formatPrice(sneaker.retail_price_cents)}</h1>
                    <div className={styles.buttons}>
                        <button onClick={handleCart} className={`${cart.some(item => item.id === sneaker.id) ? styles.removeC : styles.addC}`}>
                            {cart.some(item => item.id === sneaker.id) ? "REMOVE CART" : "ADD CART"}
                        </button>
                        <button onClick={handleFav} className={`${fav.some(item => item.id === sneaker.id) ? styles.Nfav : styles.fav}`}>
                            {fav.some(item => item.id === sneaker.id) ? <BsBookmarksFill/> : <BsBookmarks/>}
                        </button>
                        
                    </div>
                            <Link className={styles.buyNow}>Buy Now 
                            </Link>
                </div>
            </div>
        </div>
    );
};

export default Detail;