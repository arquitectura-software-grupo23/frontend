import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";

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
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [showCompras, setShowCompras] = React.useState(false);
  const [comprasButtonLabel, setComprasButtonLabel] = React.useState("Mostrar compras");
  const [dinero, setDinero] = useState(0);
  const [cantidad, setCantidad] = useState('');
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const emojiDinero = "💰";

  useEffect(() => {
    const fetchMoneyFromUserInfo = async () => {
      console.log('Fetching money from user info', user.sub);
      const data = await fetch(`${import.meta.env.VITE_API_URL}/getMoney/${user.sub}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await data.json();
      console.log('Respuesta del servidor:', data, jsonData);
      setDinero(jsonData[0].wallet);
    };
  
    fetchMoneyFromUserInfo();
  }, [triggerUpdate]); // Añade triggerUpdate como dependencia
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleComprasClick = () => {
    if (showCompras) {
      setShowCompras(false);
      setComprasButtonLabel("Mostrar compras");
    } else {
      setShowCompras(true);
      setComprasButtonLabel("Ocultar compras");
    }
  };

  const handleAgregarDinero = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/addMoney`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
                  Tu saldo actual es de: {emojiDinero} ${dinero}
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
          </div>
        </div>
        
        {showCompras && (
          <div className="compras-container">
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras exitosas</h3>
            </div>
          </div>
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras pendientes</h3>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  );
};

export default Profile;
