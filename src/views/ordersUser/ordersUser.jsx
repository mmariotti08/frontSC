import { useEffect } from "react";
import style from "./ordersUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getUserId } from "../../redux/actions";


const OrdersUser = () => {
  const dispatch = useDispatch();

  // Obtener el ID del usuario actual

  const auth_token = useSelector((state) => state.auth_token);

  const userId = auth_token.user.id;


  // Obtener todas las órdenes del estado global 
  const orders = useSelector((state) => state.all_Orders);


  // Filtrar las órdenes que pertenecen al usuario actual
  const userOrders = orders.filter((order) => order.userId === userId);


  // Obtener las órdenes del usuario actual al cargar el componente
  useEffect(() => {
    dispatch(getUserId()); // Obtener el ID del usuario actual
    dispatch(getAllOrders()); // Obtener todas las órdenes
  }, [dispatch]);

  return (
    <div className={style.componente}>
      <h1 className={style.compras}>My Orders</h1>
      {userOrders.length === 0 ? (
        <h2 className={style.mensajeError}>No recent purchases</h2>
      ) : (
        userOrders.map((order) => (
          <div key={order.id} className={style.todo}>
            <div className={style.data}>
              <h2>Order ID: {order.id}</h2>
              <p>Date: {new Date(order.delivery_date).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <p>Payment method: {order.payment_method}</p>
              <p>Product(s)</p>
            </div>
  
            {order.OrderProducts.map((product) => (
              <div key={product.id} className={style.productos}>
                <img
                  src={product.main_picture_url[0]}
                  alt={product.name}
                  className={style.foto}
                />
                <h3> {product.name}</h3>
              </div>
            ))}
            <h4 className={style.total}>
              Total:{" "}
              {order.total_amount.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </h4>
          </div>
        ))
      )}
    </div>
  );
}
export default OrdersUser;
