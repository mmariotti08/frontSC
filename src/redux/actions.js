import axios from 'axios';
import { GET_PRODUCTS } from './actions-type';

export const getProducts = () => {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/products`);
            return dispatch({type: GET_PRODUCTS, payload: response.data});
        } catch (error) {
            console.error(error);
        };
    };
};