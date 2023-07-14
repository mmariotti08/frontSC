import style from './shoppingCart.module.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const ShoppingCart = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.retail_price_cents, 0);

  const formatPrice = price => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>Shopping Cart</h1>
      <div className={style.container}>
        {cart.length === 0 ? (
          <p className={style.mensaje}>Add products to your cart</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className={style.product}>
                <img src={item.main_picture_url} alt={item.main_picture_url} className={style.image} />
                <h2>{item.name}</h2>
                <p>{formatPrice(item.retail_price_cents)}</p>
                <h3>talla</h3>
                <p>{item.size}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <h3 className={style.total}>Total Amount: {formatPrice(totalPrice)}</h3>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ShoppingCart);
