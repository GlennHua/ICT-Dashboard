import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContextProvider } from './AppContextProvider';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
      <AppContextProvider>
        <CssBaseline />
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <App />
        </Auth0Provider>
      </AppContextProvider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById('root')
);