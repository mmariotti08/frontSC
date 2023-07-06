import style from './shoppingCart.module.css'
import { connect } from 'react-redux';
import Card from '../../components/Card/Card'; 


const ShoppingCart = ({ cart }) => {


  const totalPrice = cart.reduce((total, item) => total + item.retail_price_cents, 0);

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };
  return (
    <div className={style.containerGeneral}>
      <h1 className={style.titule}>Carrito de compras</h1>
        <div className={style.container}>
          {cart.length === 0 ? (
            <p className={style.mensaje}>No hay elementos en el carrito</p>
            ) : (
              <div>
              {cart.map(item => (
                <Card key={item.id} props={item}/>
                ))}
            </div>
          )}
        </div>
      <h3>Suma total: {formatPrice(totalPrice)}</h3>
      </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ShoppingCart);
