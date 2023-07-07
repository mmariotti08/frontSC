import { GET_DETAIL, GET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_FAV, ADD_TO_FAV, GET_APPROVAL_ADMIN, PAGINATION } from "./actions-type";

const initialState = {
  products: [],
  detail: [],
  cart: [],
  fav:[],
  getApprovalAdmin: false,
  page: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case ADD_TO_FAV:
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    case REMOVE_FROM_FAV:
      return {
        ...state,
        fav: state.fav.filter(item => item.id !== action.payload),
      };
    case GET_APPROVAL_ADMIN:
      return {
        ...state,
        getApprovalAdmin: action.payload
      };
    case PAGINATION:
      return {
          ...state,
          page: action.payload
      };
    default:
      return state;
  }
};

export { reducer };