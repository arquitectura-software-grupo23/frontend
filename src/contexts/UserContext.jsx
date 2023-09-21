import React, {
  createContext, useEffect,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`http://localhost:3000/logUser`, {
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
          return response.json();
        })
        .then((_) => {})
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
}
