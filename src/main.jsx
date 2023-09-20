import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.jsx";
import "./index.css";

const auth0Domain = 'dev-18b-tbha.us.auth0.com';
const auth0ClientId = 'Fzzx7kCJiH4UqO9WQ3qDG6Dgjj5ugxGG';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);
