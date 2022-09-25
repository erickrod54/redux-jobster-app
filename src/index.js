import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { store } from './store';
import { Provider } from 'react-redux';

/**Jobster app - version 5 - index js - Features:
 * 
 *   --> Importing and placing 'store' and 'Provider'
 *       in order to provide the state for the slice
 * 
 * 
 * Note: Remember 'Provider' is from redux and the 'store={store}'
 * as prop will provide the feature. 
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
