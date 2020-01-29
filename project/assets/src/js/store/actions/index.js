import { fetchFromApi } from "react-redux-api-tools";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const FETCH_IO = 'FETCH_IO';
// export const FETCH_IO_SUCCESS = 'FETCH_IO_SUCCESS';
// export const FETCH_IO_FAILURE = 'FETCH_IO_FAILURE';


export const fetchLog = () => dispatch => {
  // console.log('hello')
  fetch("http://127.0.0.1:8000/api/inventory/log/")
    .then(response => response.json())
    .then(data => dispatch({
      type: FETCH_IO,
      log: data
    }))
}

export const fetchProducts = () => {
  return {
    types: {
      request: FETCH_PRODUCTS,
      success: FETCH_PRODUCTS_SUCCESS,
      failure: FETCH_PRODUCTS_FAILURE,
    },
    shouldDispatch: state => !state.products.items || !state.products.items.length,
    apiCallFunction: () => fetchFromApi('/api/inventory/'),
  };
}


export const fetchProduct = (code) => {
  // console.log(code)
  return {
    types: {
      request: FETCH_PRODUCT,
      success: FETCH_PRODUCT_SUCCESS,
      failure: FETCH_PRODUCT_FAILURE,
    },
    // fetchLog: () => {
    //   fetch("http://127.0.0.1:8000/api/inventory/log/")
    //     .then(response.json())
    //     .then(data => this.setState({log: data}) )
    // },
    shouldDispatch: state => !state.products.selectedItem,
    apiCallFunction: () => fetchFromApi(`/api/inventory/${code}/`)
    // apiCallFunction: () => Promise.all([ fetchFromApi(`/api/inventory/${code}/`), fetchLog() ])
  };
}



// export const fetchIO = (product) => {
//   return {
//     types: {
//       request: FETCH_IO, 
//       success: FETCH_IO_SUCCESS,
//       failure: FETCH_IO_FAILURE,
//     },
//     shouldDispatch: state => !state.objects.all,
//     apiCallFunction: () => getIO(product)
//   };
// }

// export const fetchLog = () => {
//   return {
//     types: {
//       request: FETCH_LOG,
//       success: FETCH_LOG_SUCCESS,
//       failure: FETCH_LOG_FAILURE,
//     },
//     shouldDispatch: state => !state.log.items || !state.log.items.length,
//     apiCallFunction: () => fetchFromApi('/api/log/'),
//   };
// }