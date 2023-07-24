import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';
import Addreses from "../../components/Addreses/Addreses";
import { Route,  Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { log } from "console";

const Detail = () => {
  const dispatch = useDispatch();
  const sneaker = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  const fav = useSelector((state) => state.fav);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Initialize selectedQuantity with 1
  const [availableQuantity, setAvailableQuantity] = useState(0); // New state for available quantity

  useEffect(() => {
    dispatch(getDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    // Update available quantity when a size is selected
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
    if (!selectedSize || selectedQuantity < 1 || selectedQuantity > availableQuantity) {
      setShowSizeError(true);
      console.log(setShowSizeError);
      return;
    }
    setShowSizeError(false);

    const selectedProduct = {
      ...sneaker,
      size: selectedSize,
      quantity: selectedQuantity,
    };

    const isProductInCart = cart.some(
      (item) => item.id === selectedProduct.id && item.size === selectedProduct.size
    );

    if (isProductInCart) {
      dispatch(removeFromCart(selectedProduct.id, selectedProduct.size));
      setSelectedQuantity((prevQuantity) => prevQuantity + selectedProduct.quantity);
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
      setSelectedQuantity((prevQuantity) => prevQuantity - selectedQuantity);
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
      setSelectedQuantity(1); // Reset selectedQuantity to 1 when size is deselected
    } else {
      setSelectedSize(size);
      const selectedStock = sneaker.Stocks.find((s) => s.size === size);
      setAvailableQuantity(selectedStock ? selectedStock.quantity : 0);
      setSelectedQuantity(1); // Reset selectedQuantity to 1 when size is selected
    }
    setShowSizeError(false);
  };

  const handleIncreaseQuantity = () => {
    if (selectedQuantity < availableQuantity) {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={styles.contDetail}>
      <ToastContainer/>
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
                <div
                  key={`${s.size}-${index}`}
                  className={`${styles.size} ${
                    selectedSize === s.size ? styles.select : ""
                  }`}
                  onClick={() => handleSizeClick(s.size)}
                >
                  {s.size}
                </div>
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
            <div className={styles.quantityContainer}>
              <p>Available Quantity: {availableQuantity}</p>
              <div className={styles.quantityButtons}>
                <button onClick={handleDecreaseQuantity} disabled={selectedQuantity <= 1}>
                  -
                </button>
                <input
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setSelectedQuantity(
                      isNaN(newQuantity) ? 0 : Math.min(newQuantity, availableQuantity)
                    );
                  }}
                />
                <button onClick={handleIncreaseQuantity} disabled={selectedQuantity >= availableQuantity}>
                  +
                </button>
              </div>
            </div>
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
