import {
  GET_DETAIL,
  GET_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAV,
  ADD_TO_FAV,
  GET_PRODUCT_NAME,
  PAGINATION,
  GET_APPROVAL_ADMIN,
  GET_STOCK,
  GET_STOCK_BY_ID,
  GET_PRODUCT_DRAFT,
  ADD_USER,
  GET_USERS,
  GET_USERS_DRAFT,
  GET_ALL_ORDERS,
  GET_USER_ID,
  GET_ORDER_ID,
  UPDATE_ONE_USER,
  LOGIN,
  LOGOUT,
  FETCH_ORDER_SUCCESS,
  FILTER_ORDER,
  ADD_ADDRESS,
  CLEAR_CART,

} from "./actions-type";

const initialState = {
  users: [],
  products: [],
  copyProducts: [],
  detail: [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  getApprovalAdmin: false,
  page: 1,
  get_stock: [],
  get_stock_by_id: [],
  product_draft: [],
  allUsers: [],
  users_draft: [],
  fav: JSON.parse(localStorage.getItem("fav")) || [],
  all_Orders: [],
  get_user_id: [],
  get_order_id: [],
  lastOrder: [],
  auth_token: JSON.parse(localStorage.getItem("auth")) || {
    isAuthenticated: false,
    token: null,
  },
  orderData: [],
  userOrders: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
      };
    case GET_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ADD_TO_CART: {
      const updatedCartAdd = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cart: updatedCartAdd,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case ADD_TO_FAV: {
      const updatedFavAdd = [...state.fav, action.payload];
      localStorage.setItem("fav", JSON.stringify(updatedFavAdd));
      return {
        ...state,
        fav: updatedFavAdd,
      };
    }

    case REMOVE_FROM_FAV: {
      const updatedFavRemove = state.fav.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("fav", JSON.stringify(updatedFavRemove));
      return {
        ...state,
        fav: updatedFavRemove,
      };
    }

    case GET_APPROVAL_ADMIN:
      return {
        ...state,
        getApprovalAdmin: action.payload,
      };
    case GET_STOCK:
      return {
        ...state,
        get_stock: action.payload,
      };
    case GET_STOCK_BY_ID:
      return {
        ...state,
        get_stock_by_id: action.payload,
      };
    case GET_PRODUCT_DRAFT:
      return {
        ...state,
        product_draft: action.payload,
      };
    case GET_USERS_DRAFT:
      return {
        ...state,
        users_draft: action.payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        all_Orders: action.payload,
      };
    case GET_USER_ID:{
      // const getUser = {
      //   ...state.users,
      //   ...action.payload,}
        const updatedUser = {
          ...state.auth_token.user,
          ...action.payload,
        };
      return {
        ...state,
        get_user_id: action.payload,
        // auth_token: {
        //   user: getUser
        // }
        auth_token: {
          ...state.auth_token,
          user: updatedUser,
        },
      }
    }
    case GET_ORDER_ID:
      return {
        ...state,
        get_order_id: action.payload,
        users: action.payload,
      };
    case LOGIN:
      localStorage.setItem("auth", JSON.stringify(action.payload));
      return {
        ...state,
        auth_token: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("auth");
      return {
        ...state,
        auth_token: { isAuthenticated: false, token: null },
      };
    case ADD_ADDRESS:{

      const updatedUser = {
        ...state.auth_token.user,
        ...action.payload,
      };
      return {
        ...state,
        auth_token: {
          ...state.auth_token,
          user: updatedUser,
        },
      };
    }

    case PAGINATION:
      return {
        ...state,
        page: action.payload,
      };

    case FILTER_ORDER: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case UPDATE_ONE_USER: {
          const updatedUser = {
            ...state.auth_token.user,
            ...action.payload,
          };
        return {
          ...state,
          auth_token: {
            ...state.auth_token,
            user: updatedUser,
          },
        }
      }
  
    case FETCH_ORDER_SUCCESS: {
      // Filtrar las órdenes que coinciden con el userId
      const userId = "YOUR_USER_ID"; // Reemplaza "YOUR_USER_ID" con tu identificador de usuario
      const filteredOrders = action.payload.filter(
        (order) => order.userId === userId
      );

      return {
        ...state,
        userOrders: filteredOrders, // Actualizar las órdenes del usuario
        lastOrder: action.payload[action.payload.length - 1], // Actualizar la última compra del usuario
      };
      
    }

    case CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
};

export { reducer };
