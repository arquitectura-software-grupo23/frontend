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
  width: 500,
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
  const [dinero, setDinero] = useState(0);
  const [requests, setRequests] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const emojiDinero = "💰";
  const [openPredictionsModal, setOpenPredictionsModal] = React.useState(false);

  useEffect(() => {
    
    const fetchMoneyFromUserInfo = async () => {
      console.log('Fetching money from user info', user.sub);

      const jwtoken = await getAccessTokenSilently();
      const data = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/getMoney/${user.sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtoken}`,
        },
      });
      const jsonData = await data.json();
      console.log('Respuesta del servidor:', data, jsonData);
      setDinero(jsonData[0].wallet);
    };
    if (isAuthenticated) {
      fetchMoneyFromUserInfo();
    }
  }, [triggerUpdate, isAuthenticated]); // Añade triggerUpdate como dependencia
  
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
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleComprasClick = () => {
    if (showCompras) {
      setShowCompras(false);
      setComprasButtonLabel("Mostrar compras");
    } else {
      setShowCompras(true);
      setComprasButtonLabel("Ocultar compras");
      getRequestsWithValidations()
    }
  };

  const handleAgregarDinero = async () => {
    try {
      const jwtoken = await getAccessTokenSilently();

      const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/addMoney`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtoken}`,
        },
        body: JSON.stringify({
          id: user.sub,
          amount: cantidad,
        }),
      });
      setCantidad('');
      setTriggerUpdate(!triggerUpdate);
    } catch (error) {
      console.error('Hubo un error al enviar la solicitud:', error);
    }
  };

 

 const filterValidatedRequests = (requests) => {
  return requests.filter(requests => requests.validations.length > 0)
  }

  const filterNonValidatedRequests = (requests) => {
    return requests.filter(requests => requests.validations.length == 0)
  }

  const handleOpenPredictionsModal = () => {
    setOpenPredictionsModal(true);
  };

  const handleClosePredictionsModal = () => {
    setOpenPredictionsModal(false);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div style={{ display: 'flex' }}>
              <Button sx={{ color: 'primary.main' }} className="MuiButton-textPrimary" style={{ marginRight: '10px' }} onClick={handleOpen}>Billetera</Button>
              <Button sx={{ color: 'primary.main' }} style={{ marginLeft: '10px' }} onClick={handleComprasClick}>{comprasButtonLabel}</Button>
              <Button sx={{ color: 'primary.main' }} style={{ marginLeft: '10px' }} onClick={handleOpenPredictionsModal}>Predicciones realizadas</Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Dinero disponible
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tu saldo actual es de: {emojiDinero} ${dinero.toFixed(2)}
                </Typography>
              
                <Box 
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}>
                <Button variant="contained" color="success" onClick={handleAgregarDinero}>
                  Añadir
                </Button>
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

            <Modal
              open={openPredictionsModal}
              onClose={handleClosePredictionsModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Predicciones
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, marginRight: '20px' }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '10px' }}>Predicciones realizadas</Typography>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                  </div>
                  <div style={{ flex: 1, marginLeft: '20px' }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '10px' }}>Predicciones generándose</Typography>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginBottom: '10px', padding: '4px 12px', fontSize: '14px' }}>
                      STOCK al DD-MM-YYYY
                    </Button>
                  </div>
                </div>
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
