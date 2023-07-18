
import style from './shoppingCart.module.css';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeFromCart } from '../../redux/actions';
import BuyButton from "../../components/BuyButton/BuyButton";



const ShoppingCart = ({cart}) => {
  const dispatch = useDispatch();
  const [, setCart] = useState([])
  
  const totalPrice = cart.reduce((total, item) => total + item.retail_price_cents, 0);
  const formatPrice = price => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const handleRemove = (productId, size) => {
    const isProductInCart = cart.filter(
      (item) => item.id !== productId || item.size !== size);
      setCart(isProductInCart) 
      dispatch(removeFromCart(productId, size));
    }

  return (
    <div className={style.containerGeneral}>

      <h1 className={style.titule}>Shopping Cart</h1>
      <div className={style.container}>
        {cart.length === 0 ? (
          <p className={style.mensaje}>Add products to your cart</p>
        ) : (
          <>
            {cart.map(( item) => (
              <div key={item.id} className={style.product}>
                <img src={item.main_picture_url} alt={item.main_picture_url} className={style.image} />
                <h3 className={style.name}>{item.name}</h3>
                <h3 className={style.price}>{formatPrice(item.retail_price_cents)}</h3>
                <h3 className={style.size}>Size</h3>
                <h3 className={style.sizeI}>{item.size}</h3>
                <button
              onClick={()=> handleRemove(item.id, item.size)}
              className={style.removeC}
            >REMOVE CART</button>
            
              </div>
            ))}
          </>
        )}

      </div>
      <div className={style.buy}>
      <BuyButton/>
      <h2 className={style.total}>Total Amount: {formatPrice(totalPrice)}</h2>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ShoppingCart);
