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

import './global.css';

const store = createStore(
  rootReducer,
  compose(  
    applyMiddleware(thunk, apiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


class App extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //         pathname: props.pathname,
  //     };
  // }

  // componentDidMount() {
  //     console.info('App loaded in:', Math.round(performance.now()));
    
  //     history.onChange((pathname) => {
  //         this.setState({pathname});
  //     });
  // }

  render () {
    return (
      <div>
        <header>
          <div className="brand">
            <div className="group19">
              <div className="icon">
                <a href='/'><img src="https://imgbbb.com/images/2020/01/26/icon.png" alt="Logomark"></img></a>
              </div>
              <div className="logomark">
                <a href='/'>STATIONERY SHOP</a>⁢
              </div>            
            </div>
          </div>
        </header>
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
