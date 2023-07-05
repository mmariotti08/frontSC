import axios from 'axios';
import { GET_PRODUCTS, GET_DETAIL, REMOVE_FROM_CART, ADD_TO_CART} from './actions-type';

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
