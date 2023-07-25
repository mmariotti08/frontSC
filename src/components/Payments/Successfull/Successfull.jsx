import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import style from "./successfull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUserId } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

const Successfull = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const externalReference = params.get("external_reference");
  const userId = params.get("external_reference"); 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {

    dispatch(getAllOrders());
    dispatch(getUserId(userId));
  }, [dispatch, userId]);

  // Obtiene la lista de órdenes y usuarios del estado utilizando useSelector
  const allOrders = useSelector((state) => state.all_Orders); 
  const user = useSelector((state) => state.get_user_id);

  // Filtra las órdenes que pertenecen al usuario con el userId dado
  const userOrders = allOrders.filter((order) => order.userId === userId);

  // Obtén solo la última orden del usuario ordenando por createdAt en orden descendente
  const lastOrder = userOrders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];

  const handleGoHome = () => {
    navigate("/");
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
                  <img src={orderProduct.main_picture_url[0]} alt={orderProduct.name} />
                  {/* Agrega otros detalles del OrderProduct */}
                </li>
              ))}
            </ul>
            <h3>Total Amount: {lastOrder.total_amount}</h3>
            <h3>{lastOrder.description}</h3>
          </div>
        </div>
      ) : (
        <p>No se encontró ninguna orden para este usuario.</p>
      )}

      <button onClick={handleGoHome}>Home</button>
    </div>
  );
};

export default Successfull;
