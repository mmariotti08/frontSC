import { GET_DETAIL, GET_PRODUCTS } from "./actions-type";

const initialState = {
    products: [],
    detail: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
              
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return { ...state };
    };
};

export { reducer };