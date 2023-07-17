import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";

import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';
import Addreses from "../../components/Addreses/Addreses";
import { Route,  Routes } from "react-router-dom";
import BuyButton from "../../components/BuyButton/BuyButton";



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const dispatch = useDispatch();
  const sneaker = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  const fav = useSelector((state) => state.fav);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  useEffect(() => {
    dispatch(getDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    // Actualizar la cantidad disponible cuando se selecciona un tamaño
    if (selectedSize) {
      const selectedStock = sneaker.Stocks.find((s) => s.size === selectedSize);
      setAvailableQuantity(selectedStock ? selectedStock.quantity : 0);
    }
  }, [selectedSize, sneaker.Stocks]);

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `${formattedPrice}`;
  };

  const handleCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);

    const selectedProduct = {
      ...sneaker,
      size: selectedSize,
    };

    const isProductInCart = cart.some(
      (item) =>
        item.id === selectedProduct.id && item.size === selectedProduct.size
    );

    if (isProductInCart) {
      dispatch(removeFromCart(selectedProduct.id, selectedProduct.size));
      toast.error("Shoe Removed😔", {
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
      dispatch(addToCart(selectedProduct));
      toast.success("Shoe Added Successfully👟", {
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

  const handleFav = () => {
    if (fav.some((item) => item.id === sneaker.id)) {
      dispatch(removeFromFav(sneaker.id));
      toast.error("Shoe Removed😔", {
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
      dispatch(addToFav(sneaker));
      toast.success("Shoe Added Successfully👟", {
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

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
    setShowSizeError(false);
  };
  
  

<
  return (
    <div className={styles.contDetail}>
      <h1 className={styles.nameh3}>{sneaker.name}</h1>
      <div className={styles.detailz}>
        <img src={sneaker.main_picture_url} alt="background" />
        <div className={styles.data}>
          <h2>Brand:</h2>
          <h3>{sneaker.brand_name}</h3>
          <h2>Category:</h2>
          <h3>{sneaker.category}</h3>
          <h2>Color:</h2>
          <h3>{sneaker.color}</h3>
          <h2>Sizes:</h2>
          <div className={styles.sizes}>
            {sneaker.Stocks?.map((s, index) =>
              s.quantity > 0 ? (
                <button
                  key={`${s.size}-${index}`}
                  className={`${styles.size} ${
                    selectedSize === s.size ? styles.select : ""
                  }`}
                  onClick={() => handleSizeClick(s.size)}
                >
                  {s.size}
                </button>
              ) : (
                <div key={`${s.size}-${index}`} className={styles.dess}>
                  {s.size}

                </div>
              )
            )}
          </div>
          {showSizeError && (
            <p className={styles.errorMsg}>Please select a size.</p>
          )}
          {selectedSize && (
            <p className={styles.availableQuantity}>
              Available Quantity: {availableQuantity}
            </p>
          )}
          <h1>$ {formatPrice(sneaker.retail_price_cents)}</h1>
          <div className={styles.buttons}>
            <button
              onClick={handleCart}
              className={`${
                cart.some(
                  (item) =>
                    item.id === sneaker.id && item.size === selectedSize
                )
                  ? styles.removeC
                  : styles.addC
              }`}
            >
              {cart.some(
                (item) =>
                  item.id === sneaker.id && item.size === selectedSize
              )
                ? "REMOVE CART"
                : "ADD CART"}
            </button>
            <button
              onClick={handleFav}
              className={`${
                fav.some((item) => item.id === sneaker.id)
                  ? styles.Nfav
                  : styles.fav
              }`}
            >
              {fav.some((item) => item.id === sneaker.id) ? (
                <BsBookmarksFill />
              ) : (
                <BsBookmarks />
              )}
              <ToastContainer />
            </button>
          </div>
          <BuyButton/>
        </div>
      </div>
    </div>
  );
};

export default Detail;
