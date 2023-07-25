import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderData, removeFromCart } from '../../../redux/actions';
import style from './successfull.module.css';

const Successfull = ({ orderData, fetchOrderData, removeFromCart }) => {
  const { external_reference } = useParams();
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    // Llama a la acción para obtener los datos del endpoint
    fetchOrderData(external_reference);

    // Elimina el carrito del estado global y del LocalStorage
    clearCart();
  }, [fetchOrderData, external_reference]);

  const clearCart = () => {
    // Elimina los productos del carrito del estado global
    orderData.forEach((item) => removeFromCart(item.productId));

    // Elimina el carrito del LocalStorage
    localStorage.removeItem('cart');

    // Muestra el modal de "compra exitosa"
    setShowModal(true);
  };
  const redirectToHome = () => {
    // Redirecciona a la página de inicio
    window.location.href = '/';
  };
  // Filtra la orden más reciente (la última creada)
  const latestOrder = orderData.length > 0 ? orderData[orderData.length - 1] : null;



  return (
    <div className={style.boton}>
      {latestOrder ? (
        <div>
          <h2>Detalles de la última compra</h2>
          <p>Referencia externa: {external_reference}</p>
          <p>Orden ID: {latestOrder.id}</p>
          <p>Total Amount: {latestOrder.total_amount}</p>
          <p>Talla: {latestOrder.OrderProducts[0].size}</p>
          <p>Cantidad: {latestOrder.OrderProducts[0].quantity}</p>
          {/* Agrega aquí más detalles de la compra que desees mostrar */}
        </div>
      ) : (
        <p>No se encontró ninguna orden para la referencia externa: {external_reference}</p>
      )}

      {/* Modal de "compra exitosa" */}
      {showModal && (
        <div className="modal">
          <h3>¡Compra exitosa!</h3>
          <p>Tu compra se ha realizado correctamente.</p>
          <button onClick={redirectToHome}>Ir a Home</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderData: state.orderData,
});

const mapDispatchToProps = {
  fetchOrderData,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Successfull);
