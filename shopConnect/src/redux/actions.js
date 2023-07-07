import axios from 'axios';
import { GET_PRODUCTS, GET_DETAIL, REMOVE_FROM_CART, ADD_TO_CART, ADD_TO_FAV, REMOVE_FROM_FAV, GET_PRODUCT_NAME, ORDER_BY_NAME, ORDER_BY_PRICE } from './actions-type';

export const getProducts = () => {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/products`);
            
            return dispatch({type: GET_PRODUCTS, payload: response.data});
        } catch (error) {
            console.error(error);
        }
    };
};


export const getProductName = (name) => {
  return async function(dispatch) {
      try {
          let response = await axios.get(`http://localhost:3001/products?name=${name}`);
          
          return dispatch({type: GET_PRODUCT_NAME, payload: response.data});
      } catch (error) {
          console.error(error);
      }
  };
};

export const getDetail = (id)=>{
    return async function(dispatch){
       const response = await axios.get(`http://localhost:3001/products/${id}`);

       dispatch({type: GET_DETAIL, payload: response.data})
    }
}



// Acción para agregar un elemento al carrito
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// Acción para remover un elemento del carrito
export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

// Acción para agregar un elemento al carrito
export const addToFav = (item) => {
  return {
    type: ADD_TO_FAV,
    payload: item,
  };
};

// Acción para remover un elemento del carrito
export const removeFromFav = (itemId) => {
  return {
    type: REMOVE_FROM_FAV,
    payload: itemId,
  };
};


export const orderByName = (payload) => {
  return{ type: ORDER_BY_NAME, payload }
}

export const orderByPrice = (payload) => {
  return{ type: ORDER_BY_PRICE, payload}
}



