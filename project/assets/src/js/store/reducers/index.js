import { combineReducers } from 'redux';

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from '../actions';

const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  log: []
};

const productReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_PRODUCT:
    case FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      const { items, total_items_in_stock } = action.response.data
      return {
        ...state,
        isLoading: false,
        items,
        total_items_in_stock
      };

    case FETCH_PRODUCT_SUCCESS:
      const { selectedItem, io_history } = action.response.data
      return {
        ...state,
        isLoading: false,
        selectedItem,
        io_history
      };

    case FETCH_PRODUCT_FAILURE:
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error.data,
        items: []
      };

    default:
      return state;
  }
}

export default combineReducers({ products: productReducer });
