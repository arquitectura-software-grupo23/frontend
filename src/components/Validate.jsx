import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Validate = () => {
const { user, isAuthenticated, getAccessTokenSilently  } = useAuth0();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const validateWebPayment = async () => {
      try {
        const data = await fetch(`${import.meta.env.VITE_API_URL}/validate/${token}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setIsLoading(false);      
        // navigate("/");
      }
    };

    validateWebPayment();
  }, [navigate, token]);

  return (
    <>
      {isLoading ? <h1>Validando datos...</h1> : <h1>Validación completa</h1>}
    </>
  );
};

export default Validate;
