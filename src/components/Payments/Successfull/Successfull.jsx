import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchOrderData } from '../../../redux/actions'; // Importa la acción definida anteriormente
import style from './successfull.module.css'

const Successfull = ({ orderData, fetchOrderData }) => {
  const { external_reference } = useParams();       

  useEffect(() => {
    // Llama a la acción para obtener los datos del endpoint
    fetchOrderData(external_reference);
  }, [fetchOrderData, external_reference]);

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
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderData: state.orderData,
});

const mapDispatchToProps = {
  fetchOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Successfull);
