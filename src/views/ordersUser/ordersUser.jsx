
import { useEffect } from 'react';
import style from './ordersUser.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getUserId } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const OrdersUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtener el ID del usuario actual del estado global de Redux
  const auth_token = useSelector((state) => state.auth_token);
  console.log(auth_token)

  const userId = auth_token.user.id;
  console.log(userId)

  // Obtener todas las órdenes del estado global de Redux
  const orders = useSelector((state) => state.all_Orders);
  console.log(orders)

  // Filtrar las órdenes que pertenecen al usuario actual
  const userOrders = orders.filter((order) => order.userId === userId);
  console.log(userOrders)

  // Obtener las órdenes del usuario actual al cargar el componente
  useEffect(() => {
    dispatch(getUserId()); // Obtener el ID del usuario actual
    dispatch(getAllOrders()); // Obtener todas las órdenes
  }, [dispatch]);

  return (
    <div className={style.componente}>
      <h2>Mis Compras</h2>
      {userOrders.map((order) => (
        <div key={order.id}>
          {/* Renderizar los detalles de cada compra aquí */}
          <p>Id de Compra: {order.id}</p>
          <p>Fecha: {order.date}</p>
          {/* Agregar más detalles según la estructura de tus datos de compras */}
        </div>
      ))}
    </div>
  );
};

export default OrdersUser;