import style from "./shoppingCart.module.css";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions";
import BuyButton from "../../components/BuyButton/BuyButton";
import Addreses from "../../components/Addreses/Addreses";

const ShoppingCart = ({ cart }) => {
  const dispatch = useDispatch();
  console.log(cart);

  const [show, setShow] = useState(false);
  const [showAddreses, setShowAddreses] = useState(false);
  console.log(showAddreses);
  const handleClick = () => {
    setShow(true);
  };

  const [, setCart] = useState([]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.retail_price_cents,
    0
  );
  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = (productId, size) => {
    const isProductInCart = cart.filter(
      (item) => item.id !== productId || item.size !== size
    );
    setCart(isProductInCart);
    dispatch(removeFromCart(productId, size));
  };

  return (
    // <div className={`${
    //   showAddreses ? style.showAddreses : style.containerGeneral
    // }`}>
    <div className={style.containerGeneral
    }>
        <div className={`${
      showAddreses ? style.showAddreses : style.contenedor
    }`}  >

        <div className={style.container }>
        <h1 className={style.titule}>Shopping Cart</h1>
          {cart.length === 0 ? (
            <p className={style.mensaje}>Add products to your cart</p>
            ) : (
            <>
              {cart.map((item) => (
                <div
                key={item.id}
                className={`${
                    showAddreses ? style.showAddresesProduct : style.product
                  }`}>
                  <img
                    src={item.main_picture_url}
                    alt={item.main_picture_url}
                    className={`${
                      showAddreses ? style.showAddresesImage : style.image
                    }`}
                    />
                      <h3 className={style.name}>{item.name}</h3>
                  {showAddreses ? null : (
                    <>
                      <h3 className={style.price}>
                        {formatPrice(item.retail_price_cents)}
                      </h3>
                      <h3 className={style.size}>Size</h3>
                      <h3 className={style.sizeI}>{item.size}</h3>
                  <button
                  onClick={() => handleRemove(item.id, item.size)}
                  className={style.removeC}>
                    REMOVE CART
                  </button>
                    </>
                  )}
                </div>
              ))}
            </>
          )}
          <h2 className={style.total}>Total Amount: {formatPrice(totalPrice)}</h2>
        </div>
          <div>

        {show && <Addreses />}
          </div>
          </div>

        <div  style={{ marginTop: showAddreses ? "-180px": '12px'}} className={style.CButton}>
          {cart.length > 1 ?  (
            <>
              {/* <Link onClick={checkout}  className={style.finalize} >
                Buy Now
              </Link> */}
              {/* <BuyButton/> */}

              {showAddreses ? null : ( 

 <button
                onClick={() => {
                  setShowAddreses(true);
                  handleClick();
                }}
                className={style.finalize}
                type="button">
                Buy Now
              </button>


              )}
               
              

              
            </>
          ) : (
            <h1> ShopConect</h1>
          )}
        </div>
      <div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(ShoppingCart);
