import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
  
const UserContext = createContext();

export default function UserContextProvider({ children }) {
const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
const [token, setToken] = useState(null);

useEffect(() => {
  if (isAuthenticated) {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
      } catch (error) {
        console.error('Error getting token:', error);
      }
    })();
  }
}, [isAuthenticated]);

useEffect(() => {
  if (token) {
    fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/logUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id: user.sub, mail: user.email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((_) => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}, [token]);

return (
    <UserContext.Provider value={{user, isAuthenticated}}>
    {children}
    </UserContext.Provider>
);
}