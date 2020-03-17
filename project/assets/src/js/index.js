import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'react-redux-api-tools';

import Routes from './routes';
import rootReducer from './store/reducers';

import 'whatwg-fetch';
import '../scss/index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, apiMiddleware))
);


class App extends React.Component {
  render () {
    return (
        <Provider store={store}>
          <Routes />
        </Provider>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));


// <div>
// <header>
//   <div className="brand">
//     <div className="group19">
//       <div className="icon">
//         <a href='/'><img src="https://imgbbb.com/images/2020/01/26/icon.png" alt="Logomark"></img></a>
//       </div>
//       <div className="logomark">
//         <a href='/'>STATIONERY SHOP</a>⁢
//       </div>            
//     </div>
//   </div>
// </header>
// </div>