import axios from "axios";
import { toast } from "react-toastify";

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
  GET_STOCK,
  GET_STOCK_BY_ID,
  GET_PRODUCT_DRAFT,
  FILTER_BY_ALL,
  GET_USERS,
  GET_USERS_DRAFT,
  GET_ALL_ORDERS,
  GET_USER_ID,
  GET_ORDER_ID,
  UPDATE_ONE_USER,
  LOGIN,
  LOGOUT,
  FETCH_ORDER_SUCCESS,
} from "./actions-type";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`products`);
      return dispatch({ type: GET_PRODUCTS, payload: response.data });
    } catch (error) {
      console.error(error.response.data);
    }
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
    try {
      let response = await axios.post(`user`, userData);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      console.error(error.response.data);
      toast.success(error.response.data);
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

export const addToCart = (item, user) => {
  console.log('userAction',user)
  return async function (dispatch) { 
    try {
      const response = await axios.post('/car', {item, user}); 
      console.log(response.data);

      dispatch({
        type: 'ADD_TO_CART', 
        payload: response.data, 
      });
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };
};
// Acción para remover un elemento del carrito
export const removeFromCart = (id) => {
  console.log('idfront',id)
  return async function (dispatch) { 
    try {
      const response = await axios.delete(`/car/${id}`); 
      console.log(response.data);

      dispatch({
        type: 'REMOVE_FROM_CART', 
        payload: response.data, 
      });
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
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
  return async function (dispatch) {
    try {
      let response = await axios.post(`user/admin`, adminData);
      return dispatch({ type: GET_APPROVAL_ADMIN, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const createProduct = (data, stock) => {
  return async function (dispatch) {
    try {
      await axios.post(`products`, { product: data, stock: stock });
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getStock = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`stocks`);
      return dispatch({ type: GET_STOCK, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getStockID = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`stocks/${id}`);
      return dispatch({ type: GET_STOCK_BY_ID, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const putProducto = (id, product, stock) => {
  return async function (dispatch) {
    try {
      await axios.put(`products/${id}`, { product, stock });
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const putUser = (id, dataUser) => {
  return async function (dispatch) {
    try {
      await axios.put(`user/${id}`, dataUser);
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const updateUser = (id, address) => {
  return async function (dispatch) {
    try {
      await axios.put(`user/${id}`, address);
      return;
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProductDraft = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`products/draft`);
      return dispatch({ type: GET_PRODUCT_DRAFT, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const deleteProduct = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`products/${id}`);
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const deleteUser = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`user/${id}`);
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`user`);
      return dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getUsersDraft = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`user/draft`);
      return dispatch({ type: GET_USERS_DRAFT, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getAllOrders = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`order`);
      return dispatch({ type: GET_ALL_ORDERS, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getUserId = (userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`user/${userId}`);
      return dispatch({ type: GET_USER_ID, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getOrderId = (orderId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`order/${orderId}`);
      return dispatch({ type: GET_ORDER_ID, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const auth_google_Login = (token) => {
	return async function(dispatch) {
		try {
			const response = await axios.post(`/auth/google-login`, token);
			return dispatch({ type: LOGIN, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const auth_mail_Login = (user) => {
	return async function(dispatch) {
		try {
			const response = await axios.post(`/auth/login`, user);
			return dispatch({ type: LOGIN, payload: response.data });
		} catch (error) {
			console.log(error.response.data);
		};
	};
};

export const logout = () => {
	return async function(dispatch) {
		try {
			toast.success("Successful logout")
			return dispatch({ type: LOGOUT });
		} catch (error) {
			console.log(error);
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

export const filterByAll = (response) => {
  if (response === "null") {
    return { type: FILTER_BY_ALL, payload: [] };
  } else {
    return { type: FILTER_BY_ALL, payload: response.data };
  }
};

export const updateOneUser = (id, dataUser) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`user/${id}`, dataUser);
      console.log("15", response.data);
      return dispatch({ type: UPDATE_ONE_USER, payload: response.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const fetchOrderData = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/order?userId=${userId}`);
    const orderData = response.data;
    dispatch({ type: FETCH_ORDER_SUCCESS, payload: orderData });
  } catch (error) {
    // Aquí también podrías manejar un tipo de acción para el caso de error si lo necesitas
  }
};
