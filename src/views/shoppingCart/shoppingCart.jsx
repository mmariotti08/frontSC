import style from "./shoppingCart.module.css";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions";

const ShoppingCart = ({ cart }) => {
  const dispatch = useDispatch();
  
  const checkout = async () => {
    const cartDestructuring = cart.map((item) => ({
      idPrice: item.idPrice,
      quantity: 1,
    }));
    console.log(cartDestructuring);
    
    try {
      const response = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartDestructuring }),
      });
      

      if (response.ok) {
        const data = await response.json();
        console.log(data.url);
        if (data.url) {
          window.location.assign(data.url);
        }
      } else {
        console.error("Error en la solicitud fetch:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
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
    <nav className={style.containerGeneral}>
      <div className={style.containerGeneral}>
        <h1 className={style.titule}>Shopping Cart</h1>
        <div className={style.container}>
          {cart.length === 0 ? (
            <p className={style.mensaje}>Add products to your cart</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className={style.product}>
                  <img
                    src={item.main_picture_url}
                    alt={item.main_picture_url}
                    className={style.image}
                  />
                  <h3 className={style.name}>{item.name}</h3>
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
                </div>
              ))}
            </>
          )}
        </div>
        <h2 className={style.total}>Total Amount: {formatPrice(totalPrice)}</h2>
        <div className="modal-footer">
          {cart.length > 0 ? (
            <Link onClick={checkout} className={style.finalize} >
              Buy Now
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(ShoppingCart);
