import React, { createContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
  
const UserContext = createContext();

export default function UserContextProvider({ children }) {
const { user, isAuthenticated } = useAuth0();

useEffect(() => {
  if (isAuthenticated) {
    fetch(`${import.meta.env.VITE_API_URL}/logUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.sub }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();  // Primero obtén el texto de la respuesta
      })
      .then((text) => {
        if (!text) {
          console.log("Respuesta vacía");
          return;
        }
        return JSON.parse(text);  // Luego intenta analizarlo como JSON
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}, [isAuthenticated]);

return (
    <UserContext.Provider value={{user, isAuthenticated}}>
    {children}
    </UserContext.Provider>
);
}