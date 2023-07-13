import style from './shoppingCart.module.css'
import { connect } from 'react-redux';
import Card from '../../components/Card/Card'; 
import { useEffect } from 'react';

const ShoppingCart = ({ cart}) => {


  const totalPrice = cart.reduce((total, item) => total + item.retail_price_cents, 0);

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>Shopping Cart</h1>
        <div className={style.container}>
          {cart.length === 0 ? (
            <p className={style.mensaje}>Add products to your cart</p>
            ) : (
              <>
                {cart.map(item => (
                    <Card key={item.id} props={item}/>
                    
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
