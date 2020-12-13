import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ProductDetail from './pages/ProductDetail';
import { Provider } from 'react-redux';
import store from './redux-store/store';
import UserContextProvider from './context/usercontext';
import CartContextProvider from './context/cartcontext';
// window.onload = function(){
  //if(window.location.pathname==="/pdp-v2.html"){
    
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <UserContextProvider>
             <CartContextProvider>
              <ProductDetail />
             </CartContextProvider>
          </UserContextProvider>
        </Provider>
        </React.StrictMode>,
      document.getElementById('pdp-v2')
    );
  //}
// }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
