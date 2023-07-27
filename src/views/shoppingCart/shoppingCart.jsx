import style from './shoppingCart.module.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeFromCart } from '../../redux/actions';
import BuyButton from "../../components/BuyButton/BuyButton";


const ShoppingCart = ({ cart }) => {
  const dispatch = useDispatch();
  const [, setCart] = useState([]);

  console.log(cart);

  const formatPrice = price => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  const calculateSubtotal = (quantity, priceCents) => {
    return quantity * priceCents;
  };

  const totalPrice = cart.reduce((total, item) => total + calculateSubtotal(item.quantity, item.retail_price_cents), 0);

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = (carId) => {
    const isProductInCart = cart.filter(
      (item) => item.id !== carId 
    );
    setCart(isProductInCart);
    dispatch(removeFromCart(carId));
  };

  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>Shopping Cart</h1>
      <div className={style.container}>
        {cart.length === 0 ? (
          <p className={style.mensaje}>Add products to your cart</p>
        ) : (
          <>
            {cart.map(item => {
              const subtotal = calculateSubtotal(item.quantity, item.retail_price_cents);
              return (
                <div key={item.id} className={style.product}>
                  <img src={item.main_picture_url[0]} alt={item.main_picture_url[0]} className={style.image} />
                  <h3 className={style.name}>{item.name}</h3>
                  <h3 className={style.sizeI}>Size: {item.size}</h3>
                  <h3 className={style.price}>Unit price: {formatPrice(item.retail_price_cents)}</h3>
                  <h3 className={style.size}>Quantity: {item.quantity}</h3>
                  <h3 className={style.size}>Sub-Total: {formatPrice(subtotal)}</h3>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className={style.removeC}
                  >REMOVE CART</button>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className={style.buy}>
   
      <h2 className={style.total}>Total Amount: {formatPrice(totalPrice)}</h2>

      </div>

      <BuyButton/>

    </div>

  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ShoppingCart);
