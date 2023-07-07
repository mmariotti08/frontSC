import { GET_DETAIL, GET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_FAV, ADD_TO_FAV, GET_PRODUCT_NAME, ORDER_BY_PRICE,ORDER_BY_NAME, PAGINATION } from "./actions-type";

const initialState = {
  products: [],
  detail: [],
  cart: [],
  fav: [],
  page: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      }
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
    case ORDER_BY_NAME:
        const sortedShoes = [...state.products];
        const sortOrder = action.payload === 'a-z' ? 1 : -1;
          sortedShoes.sort((shoeA, shoeB) => {
            if (shoeA.name > shoeB.name) {
                return 1 * sortOrder;
            }
            if (shoeB.name > shoeA.name) {
                return -1 * sortOrder;
            }
            return 0;
          });
      return { ...state, products: sortedShoes}

    case ORDER_BY_PRICE:
        const sortedPrice = [...state.products];
        const sortOrd = action.payload === 'asc' ? 1 : -1;
          sortedPrice.sort((priceA, priceB) => {
            if (priceA.retail_price_cents > priceB.retail_price_cents) {
                return 1 * sortOrd;
            }
            if (priceB.retail_price_cents > priceA.retail_price_cents) {
                return -1 * sortOrd;
            }
            return 0;
          });
      return { ...state, products: sortedPrice}

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