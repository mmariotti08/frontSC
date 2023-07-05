import axios from 'axios';
import { GET_PRODUCTS, GET_DETAIL} from './actions-type';

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

export const getDetail = (id)=>{
    return async function(dispatch){
       const response = await axios.get(`http://localhost:3001/products/${id}`);

       dispatch({type: GET_DETAIL, payload: response.data})
    }
}
