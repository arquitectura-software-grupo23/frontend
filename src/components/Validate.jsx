import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from 'react-router-dom';


const Validate = () => {
  const { user, isAuthenticated, getAccessTokenSilently  } = useAuth0();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const validateWebPayment = async () => {
      try {
        const token = searchParams.get('token_ws')

        // const jwtoken = await getAccessTokenSilently();

        const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/validate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${jwtoken}`,
          },
          body: JSON.stringify({
              token
          }),
        });

      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setIsLoading(false);      
        // navigate("/");
      }
    };

    validateWebPayment();
  }, [getAccessTokenSilently, searchParams]);

  return (
    <>
      {isLoading ? <h1>Validando datos...</h1> : <h1>Validación completa</h1>}
    </>
  );
};

export default Validate;
