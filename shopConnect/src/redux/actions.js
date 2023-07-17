import axios from "axios";

import {
  GET_PRODUCTS,
  GET_DETAIL,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  ADD_TO_FAV,
  REMOVE_FROM_FAV,
  ADD_USER,
  GET_PRODUCT_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  PAGINATION,
  GET_APPROVAL_ADMIN,
  FILER_BY_CATEGORY,
  FILTER_BY_GENDER,
  FILTER_BRAND_NAME,
  GET_STOCK,
  GET_STOCK_BY_ID,
  GET_PRODUCT_DRAFT,
  FILTER_BY_ALL,
  GET_USERS,
  GET_USERS_DRAFT
} from "./actions-type";

export const getProducts = () => {
	return async function(dispatch) {
		try {
			let response = await axios.get(`products`);
			return dispatch({type: GET_PRODUCTS, payload: response.data});
		} catch (error) {
			console.error(error.response.data);
		};
	};
};

export const getProductName = (name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`products?name=${name}`);

      return dispatch({ type: GET_PRODUCT_NAME, payload: response.data });
    } catch (error) {
      console.error(error);
      return [];
    }
  };
};

export const addUser = (userData) => {
  return async function (dispatch) {
    console.log(userData);
    try {
      let response = await axios.post(`user`, userData);
      return dispatch({ type: ADD_USER, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`products/${id}`);

    dispatch({ type: GET_DETAIL, payload: response.data });
  };
};

// Acción para agregar un elemento al carrito
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

// Acción para remover un elemento del carrito
export const removeFromCart = (productId, size) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { productId, size },
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
			let response = await axios.post(`user/admin`, adminData);
			return dispatch({ type: GET_APPROVAL_ADMIN, payload: response.data })
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const createProduct = (data, stock) => {
	return async function(dispatch) {
		try {


			await axios.post(`products`, { product: data, stock: stock });

			return;
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const getStock = () => {
	return async function(dispatch) {
		try {
			const response = await axios.get(`stocks`);
			return dispatch({ type: GET_STOCK, payload: response.data });

		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const getStockID = (id) => {
	return async function(dispatch) {
		try {
			const response = await axios.get(`stocks/${id}`);
			return dispatch({ type: GET_STOCK_BY_ID, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const putProducto = (id, product, stock) => {
	return async function(dispatch) {
		try {
			await axios.put(`products/${id}`, { product, stock });
			return;
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const putUser = (id, dataUser) => {
	return async function(dispatch) {
		try {

			await axios.put(`products/${id}`, { id, product });

			return;
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const getProductDraft = () => {
	return async function(dispatch) {
		try {


			const response = await axios.get(`products/draft`);
			console.log(response.data);

			return dispatch({ type: GET_PRODUCT_DRAFT, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const deleteProduct = (id) => {
	return async function(dispatch) {
		try {

			console.log(id);
			await axios.delete(`products/${id}`);

			return;
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const deleteUser = (id) => {
	return async function(dispatch) {
		try {
			await axios.delete(`user/${id}`);
			return;
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const getUsers = () => {
	return async function(dispatch) {
		try {
			const response = await axios.get(`user`);
			return dispatch({ type: GET_USERS, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const getUsersDraft = () => {
	return async function(dispatch) {
		try {
			const response = await axios.get(`user/draft`);
			return dispatch({ type: GET_USERS_DRAFT, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

// ^^^^ ACCIONES ADMIN (NO TOCAR) ^^^^

export const orderByName = (payload) => {
  return { type: ORDER_BY_NAME, payload };
};

export const orderByPrice = (payload) => {
  return { type: ORDER_BY_PRICE, payload };
};

export const paginate = (value) => {
  return function (dispatch) {
    return dispatch({ type: PAGINATION, payload: value });
  };
};

export const filterByCategory = (payload) => {
  return { type: FILER_BY_CATEGORY, payload };
};

export const filterByGender = (payload) => {
  return { type: FILTER_BY_GENDER, payload };
};

export const filterBrandName = (payload) => {
  return { type: FILTER_BRAND_NAME, payload };
};

export const filterByAll = ( brand, category, gender) => {
	return async function(dispatch){
		try {
			const response = await axios.get(`fill?brand=${brand}&category=${category}&gender=${gender}`)
	
		return dispatch({ type: FILTER_BY_ALL, payload: response.data })
		} catch (error) {
			alert("Incorrect filtering information - Reset Products or Apply Filters")
		}
		
	}
 
};
