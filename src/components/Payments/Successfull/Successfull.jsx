import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './successfull.module.css';
import { fetchOrders } from '../../../redux/actions';
import { useLocation } from 'react-router-dom';

const Successful = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const userId = useSelector((state) => state.userId);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchOrders()); // Cargar las órdenes cuando el componente se monte
  }, [dispatch]);

  // Obtener los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const externalReference = queryParams.get('external_reference');

  // Filtrar las órdenes por userId y externalReference
  const userOrder = orders.find((order) => order.userId === userId && order.externalReference === externalReference);

  return (
    <div className={style.boton}>
      <h2>Detalles de la Compra</h2>
      {userOrder ? (
        <>
          <p>ID: {userOrder.id}</p>
          <p>Total Amount: {userOrder.total_amount}</p>
          <p>Description: {userOrder.description}</p>
          <p>Status: {userOrder.status}</p>
          <p>Payment Method: {userOrder.payment_method}</p>
          {/* Renderizar más propiedades de la orden si es necesario */}
        </>
      ) : (
        <p>No se encontró información sobre la compra.</p>
      )}
    </div>
  );
};

export default Successful;