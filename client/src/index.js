import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider 
      domain='dev-z0wqn8uf.us.auth0.com'
      clientId='Dcm7TYoMTTOJ46I5hdtSkaTCwvlKNauM'
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
);