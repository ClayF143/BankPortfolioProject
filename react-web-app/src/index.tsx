import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Auth0Provider
      domain="dev-6vmmxbqy66u4zfxt.us.auth0.com"
      clientId="sjZ207dvP45paJabJuoY5IflUlf3421B"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://bank_api.com",
      }}
    >
      <App />
    </Auth0Provider>
);

reportWebVitals();
