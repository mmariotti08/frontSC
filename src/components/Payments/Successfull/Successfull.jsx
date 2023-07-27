import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./successfull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUserId, clearCart } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../../redux/actions";



const Successfull = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const externalReference = params.get("external_reference");
  const userId = params.get("external_reference");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth_token);
  const idReview = user.id;

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  

  console.log(idReview);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getUserId(userId));
  }, [dispatch, userId]);

  // Obtiene la lista de órdenes y usuarios del estado utilizando useSelector
  const allOrders = useSelector((state) => state.all_Orders);
  // const user = useSelector((state) => state.get_user_id);

  // Filtra las órdenes que pertenecen al usuario con el userId dado
  const userOrders = allOrders.filter((order) => order.userId === userId);

  // Obtén solo la última orden del usuario ordenando por createdAt en orden descendente
  const lastOrder = userOrders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const handleGoHome = () => {
    navigate("/");
  };
  const productId = lastOrder && lastOrder.OrderProducts.length > 0
  ? lastOrder.OrderProducts[0].productId
  : 1;
  console.log('productid**************'.productId);
  const [form, setForm] = useState({
    rating: '',
    opinion: "",
    UserId: idReview,
    ProductId:`${productId}`
    ,
  });
  console.log('lastUser****************',lastOrder);


  const handleRatingClick = (value) => {
    setForm({ ...form, rating: value });
  };

  const handleOpinionChange = (e) => {
    setForm({ ...form, opinion: e.target.value });
  };
 
  const handleSubmitReview = () => {
      dispatch(createReview (form))
    console.log('aa',form);
  };
  


  return (
    <div className={style.boton}>
      <h1>Successful purchase🎉!</h1>
      {/* <p>External Reference: {externalReference}</p>
      <p>User ID: {userId}</p> */}

      {user && (
        <div>
          <h2>Thank you for your purchase {user.name} !</h2>
          {/* Muestra otros detalles del usuario */}
        </div>
      )}

      {lastOrder ? (
        <div>
          {/* <h2>Última Orden del Usuario:</h2> */}
          <div key={lastOrder.id}>
            <h3>Order ID: {lastOrder.id}</h3>
            <h3>Product(s):</h3>
            <ul>
              {lastOrder.OrderProducts.map((orderProduct) => (
                <li key={orderProduct.id}>
                  <p>Product: {orderProduct.name}</p>
                  <p>Quantity: {orderProduct.quantity}</p>
                  <p>Size: {orderProduct.size}</p>
                  <img
                    src={orderProduct.main_picture_url[0]}
                    alt={orderProduct.name}
                  />
                  {/* Agrega otros detalles del OrderProduct */}
                </li>
              ))}
            </ul>
            <h3>Total Amount: {lastOrder.total_amount}</h3>
            <h3>{lastOrder.description}</h3>
          </div>
          
          <p className={style.p}>
        We would love to hear your opinion! How did you like our
        product/service? Leave us a review so we can keep improving.
      </p>
      <div className={style.stars}>
        {[...Array(5)].map((_, index) => (
          <FaStar
          key={index}
          size={40}
          onClick={() => handleRatingClick(index + 1)}
          color={index < form.rating ? "gold" : "gray"}
          />
          ))}
      </div>
      <textarea
        placeholder="Write your review here..."
        value={form.opinion}
        onChange={handleOpinionChange}
        className={style.input}
        />
        <div>
      <button onClick={handleSubmitReview} className={style.buttonSubmit}>Send</button>

        </div>



          <label htmlFor=""></label>
          <input type="number" value={form.rating} />
        </div>
      ) : (

      <div>
        <p>No se encontró ninguna orden para este usuario.</p>




      </div>
      )}

      <button onClick={handleGoHome}>Home</button>
    </div>
  );
};

export default Successfull;
