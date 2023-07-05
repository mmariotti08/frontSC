import React from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card'; // Ruta correcta al componente Card

const ShoppingCart = ({ cart }) => {
  return (
    <div>
      <h1>Carrito de compras</h1>
      {cart.length === 0 ? (
        <p>No hay elementos en el carrito</p>
      ) : (
        <div>
          {cart.map(item => (
            <Card key={item.id} props={item} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(ShoppingCart);
