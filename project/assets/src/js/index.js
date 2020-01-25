import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'react-redux-api-tools';

import Routes from './routes';
import rootReducer from './store/reducers';


import 'whatwg-fetch';
import '../scss/index.scss';

import './global.css';

const store = createStore(rootReducer, applyMiddleware(thunk, apiMiddleware));


class App extends React.Component {
  render () {
    return (
      <div id ="react-app">
        <header>
            <h1 className="logo"><a className="logo" href='/'>STATIONERY SHOP</a>⁢</h1>
        </header>
        <main>
        <Provider store={store}>
          <Routes />
        </Provider>
        </main>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
