import React, { createContext, useEffect, useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
  
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
        body: JSON.stringify({ id: user.sub, mail: user.name, userName: user.nickname }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setLogged(true);
          return response.text();
        })
        .then((_) => {})
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (logged) {
      fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/adminCheck?user_id=${user.sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((response) => {
          setIsAdmin(response.isAdmin);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [logged]);

  return (
      <UserContext.Provider value={{user, isAuthenticated, isAdmin}}>
      {children}
      </UserContext.Provider>
  );
}