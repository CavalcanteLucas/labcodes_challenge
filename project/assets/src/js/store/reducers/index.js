import { combineReducers } from 'redux';

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_IO,
  // FETCH_IO_SUCCESS,
  // FETCH_IO_FAILURE,
} from '../actions';


const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
  log: []
};


const productReducer = (state = initialState, action) => {
  // console.log(action)
  switch(action.type) {

    // case FETCH_IO:
    case FETCH_PRODUCT:
    case FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_IO:
      // console.log('hi')
      // console.log(action.log)
      return{
        ...state,
        isLoading: false,
        log: action.log
      };
    // case FETCH_IO_SUCCESS:
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.response.data
      };

    case FETCH_PRODUCT_SUCCESS:
      // console.log('hi')
      console.log(action.response.data)
      return {
        ...state,
        isLoading: false,
        selectedItem: action.response.data,
        // log: action.response.data.log
      };

    // case FETCH_IO_FAILURE:
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
