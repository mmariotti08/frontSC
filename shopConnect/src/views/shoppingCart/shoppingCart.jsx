import style from "./shoppingCart.module.css";
import { connect } from "react-redux";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions";


const ShoppingCart = ({ cart }) => {


 const  dispatch = useDispatch();

  const checkout = async () => {
    const cartDestructuring = cart.map((item) => ({
      idPrice: item.idPrice,
      quantity: 1,
      currency: "usd",
    }));


    try {
      
      const response = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartDestructuring }),
      });
      dispatch(createOrder(cartDestructuring))

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


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className={style.containerGeneral}>
        <h1 className={style.titule}>Carrito de compras</h1>
        <div className={style.container}>
          {cart.length === 0 ? (
            <p className={style.mensaje}>No hay elementos en el carrito</p>
          ) : (
            <>
              {cart.map((item) => (
                <Card key={item.id} props={item} />
              ))}
            </>
          )}
        </div>
        <h3 className={style.total}>Suma total: {formatPrice(totalPrice)}</h3>

        <div className="modal-footer">
          {cart.length > 0 ? (
            <Link onClick={checkout} className={style.buyNow}>
              Buy Now
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
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
