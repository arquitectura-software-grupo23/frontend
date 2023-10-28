import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import ListValidations from "./ListValidations";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [showCompras, setShowCompras] = React.useState(false);
  const [comprasButtonLabel, setComprasButtonLabel] = React.useState("Mostrar compras");
  const [requests, setRequests] = useState([]);
  const [cantidad, setCantidad] = useState('');

 
  const getRequestsWithValidations = async () => {
    const jwtoken = await getAccessTokenSilently();

    const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/requestsWithValidations?user_id=${user.sub}`, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtoken}`,
        },
    });
    const responseAsJson = await response.json();
    setRequests(responseAsJson);
    console.log('responseAsJson:', responseAsJson);
  }


  const handleClose = () => setOpen(false);
  
  const handleComprasClick = () => {
    if (showCompras) {
      setShowCompras(false);
      setComprasButtonLabel("Mostrar compras");
    } else {
      setShowCompras(true);
      setComprasButtonLabel("Ocultar compras");
      getRequestsWithValidations();
    }
  };

 const filterValidatedRequests = (requests) => {
  return requests.filter(requests => requests.validations.length > 0)
  }

  const filterNonValidatedRequests = (requests) => {
    return requests.filter(requests => requests.validations.length == 0)
  }


  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log('User:', user);
  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-background">
            <img
              src="https://e1.pxfuel.com/desktop-wallpaper/127/84/desktop-wallpaper-dark-mode-dark-mode-phone.jpg"
              alt="Background"
            />
          </div>
          <div className="profile-info">
            <div className="profile-image">
              <img src={user.picture} alt={user.name} />
            </div>
            <h2>{user.nickname}</h2>
            <p>{user.name}</p>
            <div style={{ display: 'flex' }}>
              <Button sx={{ color: 'primary.main' }} style={{ marginLeft: '10px' }} onClick={handleComprasClick}>{comprasButtonLabel}</Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
          
                <Box 
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}>
                
                <TextField 
                  id="filled-basic" 
                  label="Cantidad" 
                  variant="filled" 
                  sx={{ marginLeft: 2 }}
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
                </Box>
              </Box>
            </Modal>
          </div>
        </div>
        
        {showCompras && (
          <div className="compras-container">
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras exitosas</h3>
              <ListValidations requests={filterValidatedRequests(requests)}/>
            </div>
          </div>
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras pendientes</h3>
            </div>
            <ListValidations requests={filterNonValidatedRequests(requests)}/>
          </div>
          
        </div>
        )}
      </div>
    )
  );
};

export default Profile;
