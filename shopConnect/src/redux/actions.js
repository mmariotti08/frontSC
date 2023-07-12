import axios from 'axios';
import { GET_PRODUCTS, GET_DETAIL, REMOVE_FROM_CART, ADD_TO_CART, ADD_TO_FAV, REMOVE_FROM_FAV, ADD_USER, ORDER_BY_NAME, ORDER_BY_PRICE, PAGINATION,GET_APPROVAL_ADMIN, FILER_BY_CATEGORY, FILTER_BY_GENDER, FILTER_BRAND_NAME } from './actions-type';



export const getProducts = () => {
		return async function(dispatch) {
				try {
						let response = await axios.get(`products`);
						
						return dispatch({type: GET_PRODUCTS, payload: response.data});
				} catch (error) {
						console.error(error);
				}
		};
};


export const getProductName = (name) => {
  return async function(dispatch) {
      try {
          let response = await axios.get(`products?name=${name}`);
          
          return dispatch({type: GET_PRODUCT_NAME, payload: response.data});
      } catch (error) {
          console.error(error);
      }
  };
};

export const addUser = (userData) => {
	return async function(dispatch) {
		console.log(userData)
		try {
			let response = await axios.post(`http://localhost:3001/user`, userData);
			return dispatch({type: ADD_USER, payload: response.data});
		} catch (error) {
			console.error(error);
		}
	};
  };

export const getDetail = (id)=>{
		return async function(dispatch){
			 const response = await axios.get(`products/${id}`);

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

// ACCIONES ADMIN (NO TOCAR)
export const getApproval = (adminData) => {
	return async function(dispatch) {
		try {
			let response = await axios.post("admin/login", adminData);
			return dispatch({ type: GET_APPROVAL_ADMIN, payload: response.data })
		} catch (error) {
			console.log(error);
			// LÍNEA TEMPORAL. MANTENER MIENSTRAS EL BACK NO ESTÉ LISTO
			return dispatch({ type: GET_APPROVAL_ADMIN, payload: true });
		};
	};
};

export const createProduct = (data, stock) => {
	return async function(dispatch) {
		try {
			await axios.post(`products`, { product: data, stock: stock });
			return
		} catch (error) {
			console.log(error);
		};
	};
};

export const orderByName = (payload) => {
  return{ type: ORDER_BY_NAME, payload }
}

export const orderByPrice = (payload) => {
  return{ type: ORDER_BY_PRICE, payload}
}

export const paginate = (value) => {
  return function(dispatch) {
      return dispatch({type: PAGINATION, payload: value});
  };
};

export const filterByCategory = (payload) => {
  return { type: FILER_BY_CATEGORY, payload }
}

export const filterByGender = (payload) => {
  return { type: FILTER_BY_GENDER, payload }
}

export const filterBrandName = (payload) => {
  return { type: FILTER_BRAND_NAME, payload }
}




